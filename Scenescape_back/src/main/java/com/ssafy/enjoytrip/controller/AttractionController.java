package com.ssafy.enjoytrip.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.AttractionDTO;
import com.ssafy.enjoytrip.model.dto.AttractionLikeDTO;
import com.ssafy.enjoytrip.model.dto.PagenatedAttractionDTO;
import com.ssafy.enjoytrip.model.dto.SceneTitleDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.AttractionLikeService;
import com.ssafy.enjoytrip.service.AttractionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/attractions")
@Tag(name = "Attraction API", description = "관광지 관리와 관련된 API")
public class AttractionController {
	private final AttractionService attractionService;
	private final AttractionLikeService attractionLikeService;

	@Autowired
	public AttractionController(AttractionService attractionService, AttractionLikeService attractionLikeService) {
		this.attractionService = attractionService;
		this.attractionLikeService = attractionLikeService;
	}

	@GetMapping
	@Operation(summary = "관광지 목록 조회", description = "검색 필터와 페이지네이션 옵션을 사용해 관광지 목록을 조회합니다.")
	@ApiResponses({ @ApiResponse(responseCode = "200", description = "관광지 목록 조회 성공"),
			@ApiResponse(responseCode = "400", description = "잘못된 요청"),
			@ApiResponse(responseCode = "500", description = "서버 오류") })
	public ResponseEntity<PagenatedAttractionDTO> getAttractions(
			@Parameter(description = "검색어", required = false) @RequestParam(value = "searchTerm", required = false) String searchTerm,
			@Parameter(description = "지역 이름", required = false) @RequestParam(value = "area", required = false) String area,
			@Parameter(description = "하위 지역 이름", required = false) @RequestParam(value = "subArea", required = false) String subArea,
			@Parameter(description = "콘텐츠 유형 (복수 선택 가능)", required = false) @RequestParam(value = "contents", required = false) String[] contents,
			@Parameter(description = "드라마/영화 이름", required = false) @RequestParam(value = "sceneTitle", required = false) String sceneTitle,
			@Parameter(description = "정렬 방식", required = false) @RequestParam(value = "sortType", required = false) String sortType,
			@Parameter(description = "페이지 번호", example = "1") @RequestParam(value = "page", defaultValue = "1") int page,
			@Parameter(description = "페이지 크기", example = "6") @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
			HttpSession session) {
		Map<String, Object> filter = new HashMap<>();
		filter.put("searchTerm", searchTerm);
		filter.put("area", area);
		filter.put("subArea", subArea);
		filter.put("contents", contents);
		filter.put("sceneTitle", sceneTitle);
		filter.put("sortType", sortType);
		filter.put("page", page);
		filter.put("pageSize", pageSize);

		// 페이지네이션을 위한 offset 계산
		int offset = (page - 1) * pageSize;
		filter.put("offset", offset);

		int totalCount = attractionService.countAll(filter);
		List<AttractionDTO> attractions = attractionService.searchAll(filter);

		PagenatedAttractionDTO result = new PagenatedAttractionDTO();
		result.setTotalCount(totalCount);
		result.setPage(page);
		result.setItems(attractions);

		// 로그인 된 상태라면 좋아요 관련 데이터를 가져온다.
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");

		if (userInfo != null) {
			int[] attractionNoList = new int[attractions.size()];

			for (int i = 0; i < attractions.size(); ++i) {
				attractionNoList[i] = attractions.get(i).getNo();
			}

			filter.put("userId", userInfo.getId());
			filter.put("attractionNoList", attractionNoList);

			List<Integer> likeAttractionNoList = attractionLikeService.getLikeAttractionNoList(filter);
			result.setLikes(likeAttractionNoList);
		}

		return ResponseEntity.ok(result);
	}

	@GetMapping("/titles")
	@Operation(summary = "관광지 제목 목록 조회", description = "모든 관광지 제목 목록을 조회합니다.")
	@ApiResponses({ @ApiResponse(responseCode = "200", description = "관광지 제목 목록 조회 성공"),
			@ApiResponse(responseCode = "500", description = "서버 오류") })
	public ResponseEntity<List<SceneTitleDTO>> getSceneTitles() {
		List<SceneTitleDTO> result = new ArrayList<>();
		List<String> titles = attractionService.getSceneTitles();

		for (String t : titles) {
			SceneTitleDTO title = new SceneTitleDTO();

			title.setTitle(t);
			result.add(title);
		}

		return ResponseEntity.ok(result);
	}

	@Transactional
	@PostMapping("/like/{attractionNo}")
	@Operation(summary = "관광지 좋아요 업데이트", description = "특정 관광지의 좋아요 상태를 업데이트합니다.")
	@ApiResponses({ @ApiResponse(responseCode = "200", description = "좋아요 업데이트 성공"),
			@ApiResponse(responseCode = "400", description = "잘못된 요청"),
			@ApiResponse(responseCode = "500", description = "서버 오류") })
	public ResponseEntity<Integer> updateLikeCount(
			@Parameter(description = "관광지 번호", required = true) @PathVariable("attractionNo") int attractionNo,
			HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		if (userInfo == null) {
			return ResponseEntity.badRequest().build();
		}

		String userId = userInfo.getId();
		int result = attractionLikeService.updateLikeCount(new AttractionLikeDTO(userId, attractionNo));

		if (result != 0) {
			// 관계 테이블을 만드는데 성공했으면, attraction의 likeCount를 1 증가시킨다
			// 관계 테이블을 삭제하는데 성공했으면, attraction의 likeCount를 1 감소시킨다.
			Map<String, Object> filter = new HashMap<>();
			filter.put("userId", userId);
			filter.put("attractionNo", attractionNo);
			filter.put("shift", result);
			attractionService.updateLikeCount(filter);
			return ResponseEntity.ok(result);
		}

		return ResponseEntity.badRequest().build();
	}

	@Transactional
	@GetMapping("/likes")
	@Operation(summary = "좋아요 누른 관광지 조회", description = "좋아요를 누른 관광지 전체 리스트를 조회합니다.")
	public ResponseEntity<PagenatedAttractionDTO> getLikeAttractions(
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "pageSize", defaultValue = "6") int pageSize, HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");

		if (userInfo == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		int totalCount = attractionLikeService.countLikeAttractions(userInfo.getId());
		int offset = (page - 1) * pageSize;
		
		Map<String, Object> filter = new HashMap<>();
		filter.put("userId", userInfo.getId());
		filter.put("userId", "jj");
		filter.put("pageSize", pageSize);
		filter.put("offset", offset);
		
		List<AttractionDTO> attractions = attractionLikeService.getLikeAttractions(filter);
		PagenatedAttractionDTO result = new PagenatedAttractionDTO();
		
		result.setTotalCount(totalCount);
		result.setPage(page);
		result.setItems(attractions);
		
		return ResponseEntity.ok(result);
	}
}
