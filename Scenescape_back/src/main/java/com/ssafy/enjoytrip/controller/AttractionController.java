package com.ssafy.enjoytrip.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.AttractionDTO;
import com.ssafy.enjoytrip.model.dto.AttractionLikeDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.AttractionLikeService;
import com.ssafy.enjoytrip.service.AttractionService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/attractions")
public class AttractionController {
	private final AttractionService attractionService;
	private final AttractionLikeService attractionLikeService;

	@Autowired
	public AttractionController(AttractionService attractionService, AttractionLikeService attractionLikeService) {
		this.attractionService = attractionService;
		this.attractionLikeService = attractionLikeService;
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAttractions(
			@RequestParam(value = "area", required = false) String area,
			@RequestParam(value = "subArea", required = false) String subArea,
			@RequestParam(value = "contents", required = false) String[] contents,
			@RequestParam(value = "sceneTitle", required = false) String sceneTitle,
			@RequestParam(value = "sortType", required = false) String sortType,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "pageSize", defaultValue = "6") int pageSize) {
		Map<String, Object> filter = new HashMap<>();
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

		Map<String, Object> response = new HashMap<>();
		response.put("totalCount", totalCount); // 전체 결과 수
		response.put("page", page);
		response.put("items", attractions);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/titles")
	public ResponseEntity<List<Map<String, Object>>> getSceneTitles() {
		List<Map<String, Object>> response = new ArrayList<>();
		List<String> titles = attractionService.getSceneTitles();

		for (String t : titles) {
			Map<String, Object> title = new HashMap<>();

			title.put("title", t);
			response.add(title);
		}

		return ResponseEntity.ok(response);
	}

	@PostMapping("/like/{attractionNo}")
	public ResponseEntity<Integer> updateLikeCount(@PathVariable("attractionNo") int attractionNo, HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		System.out.println(userInfo);
		if (userInfo == null) {
			return ResponseEntity.badRequest().build();
		}
		
		String userId = userInfo.getId();
		int response = attractionLikeService.updateLikeCount(new AttractionLikeDTO(userId, attractionNo));

		if (response != 0) {
			// 관계 테이블을 만드는데 성공했으면, attraction의 likeCount를 1 증가시킨다
			// 관계 테이블을 삭제하는데 성공했으면, attraction의 likeCount를 1 감소시킨다.
			Map<String, Object> filter = new HashMap<>();
			filter.put("userId", userId);
			filter.put("attractionNo", attractionNo);
			filter.put("shift", response);
			attractionService.updateLikeCount(filter);
			return ResponseEntity.ok(response);
		}

		return ResponseEntity.badRequest().body(response);
	}
}
