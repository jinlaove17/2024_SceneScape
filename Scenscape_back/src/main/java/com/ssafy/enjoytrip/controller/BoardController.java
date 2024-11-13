package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.enjoytrip.model.dto.PostCategory;
import com.ssafy.enjoytrip.model.dto.PostDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.BoardService;
import com.ssafy.enjoytrip.service.ImageService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/board")
@Controller
public class BoardController {
	private BoardService boardService;
	private ImageService imageService;
	
	@Autowired
	public BoardController(BoardService boardService, ImageService imageService) {
		this.boardService = boardService;
		this.imageService = imageService;
	}
	
	@GetMapping("/post.do")
	public ResponseEntity<Map<String, Object>> getPost(@RequestParam("postNo") int postNo) {
		Map<String, Object> response = new HashMap<>();
		PostDTO post = boardService.getPost(postNo);
		response.put("result", post);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/posts.do")
	public ResponseEntity<Map<String, Object>> getPostsByFilter(
			@RequestParam(value = "searchType", required = false) String searchType,
			@RequestParam(value = "searchKeyword", required = false) String searchKeyword,
			@RequestParam(value = "page", defaultValue = "1") String page,
			@RequestParam(value = "pageSize", defaultValue = "20") String pageSize){
		Map<String, Object> filter = new HashMap<>();
		filter.put("searchType", searchType);
		filter.put("searchKeyword", searchKeyword);
		filter.put("page", page);
		filter.put("pageSize", pageSize);
		
        // 페이지네이션을 위한 offset 계산
        int offset = (Integer.parseInt(page) - 1) * Integer.parseInt(pageSize);
        filter.put("offset", offset);
		
		int totalResults = boardService.countByFilter(filter);
		List<PostDTO> posts = boardService.getPostsByFilter(filter);
		
		Map<String, Object> response = new HashMap<>();
		response.put("totalResults", totalResults);
		response.put("page", page);
		response.put("pageSize", pageSize);
		response.put("resultsInCurrentPage", posts.size());
		response.put("results", posts);
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/createTempPost.do")
	public ResponseEntity<Map<String, Integer>> createTempPost(HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		String userId = "ssafy";
		if(userInfo != null) {
			userId = userInfo.getId();
		}
		int postNo = boardService.createPost(new PostDTO(null, null, userId, null));
		
		System.out.println("boardController.createTempPost: new PostNo " + postNo);
		
		Map<String, Integer> response = new HashMap<>();
		response.put("postNo", postNo);
		
		return ResponseEntity.ok(response);
	}
	
	@Transactional
	@PostMapping("/createScenePost.do")
	public ResponseEntity<Map<String, Object>> createScenePost(
			@RequestParam("postNo") Long postNo,
	        @RequestParam("title") String title,
	        @RequestParam("content") String content,
	        HttpSession session) {
	    
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		String userId = userInfo.getId();
		
		if(userId == null) {
			userId = "ssafy";
		}
		
	    System.out.println("title: " + title);
	    System.out.println("content: " + content);
	    
	    System.out.println("새 게시글 번호: "+postNo);
	    boardService.updatePost(new PostDTO(postNo, title, content));
	    
	    // JSON 응답으로 반환할 데이터 구성
	    Map<String, Object> response = new HashMap<>();
	    response.put("message", "게시글이 성공적으로 생성되었습니다.");
	    response.put("title", title);
	    response.put("content", content);

	    return ResponseEntity.ok(response);
	}
}
