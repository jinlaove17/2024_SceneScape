package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.enjoytrip.model.dto.CommentDTO;
import com.ssafy.enjoytrip.model.dto.PostDTO;
import com.ssafy.enjoytrip.model.dto.PostLikeDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.CommentService;
import com.ssafy.enjoytrip.service.ImageService;
import com.ssafy.enjoytrip.service.PostLikeService;
import com.ssafy.enjoytrip.service.PostService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/posts")
@Controller
public class PostController {
	private PostService postService;
	private ImageService imageService;
	private CommentService commentService;
	private PostLikeService postLikeService;

	@Autowired
	public PostController(PostService postService, ImageService imageService, CommentService commentService, PostLikeService postLikeService) {
		this.postService = postService;
		this.imageService = imageService;
		this.commentService = commentService;
		this.postLikeService = postLikeService;
	}

	@Transactional
	@GetMapping("/{no}")
	public ResponseEntity<Map<String, Object>> getPost(@PathVariable("no") int postNo, HttpSession session) {
		Map<String, Object> response = new HashMap<>();

		// 조회 수 증가
		postService.updateViewCount(postNo);
		
		UserDTO userInfo = (UserDTO)session.getAttribute("userInfo");
		String userId = null;
		int likeStatus = 0;
		
		// 사용자가 이미 게시글에 좋아요 혹은 싫어요를 남겼는지 확인
		if (userInfo != null) {
		    System.out.println(userInfo);
		    userId = userInfo.getId();
		    
		    // getLikeStatus returns: 1 -> 좋아요, -1 -> 싫어요, null -> 아무것도 누르지 않음.
		    likeStatus = Optional.ofNullable(postLikeService.getLikeStatus(new PostLikeDTO(userId, postNo)))
		                         .orElse(0);
		}

		PostDTO post = postService.getPost(postNo);
		List<CommentDTO> comments = commentService.searchAll(postNo);

		response.put("post", post);
		response.put("comments", comments);
		response.put("likeStatus", likeStatus);
		return ResponseEntity.ok(response);
	}

	// searchType : title, userId, sceneTitle
	@GetMapping
	public ResponseEntity<Map<String, Object>> getPostsByFilter(
			@RequestParam(value = "searchType", required = false) String searchType,
			@RequestParam(value = "searchKeyword", required = false) String searchKeyword,
			@RequestParam(value = "category", defaultValue = "SCENE") String category,
			@RequestParam(value = "sortType", required = false) String sortType,
			@RequestParam(value = "page", defaultValue = "1") String page,
			@RequestParam(value = "pageSize", defaultValue = "20") String pageSize) {
		Map<String, Object> filter = new HashMap<>();
		filter.put("searchType", searchType);
		filter.put("searchKeyword", searchKeyword);
		filter.put("category", category);
		filter.put("page", Integer.parseInt(page));
		filter.put("pageSize", Integer.parseInt(pageSize));

		// 페이지네이션을 위한 offset 계산
		int offset = (Integer.parseInt(page) - 1) * Integer.parseInt(pageSize);
		filter.put("offset", offset);

		int totalResults = postService.countByFilter(filter);
		List<PostDTO> posts = postService.getPostsByFilter(filter);

		Map<String, Object> response = new HashMap<>();
		response.put("totalResults", totalResults);
		response.put("page", page);
		response.put("pageSize", pageSize);
		response.put("resultsInCurrentPage", posts.size());
		response.put("results", posts);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/temp")
	public ResponseEntity<Map<String, Long>> createTempPost(HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		String userId = "ssafy";
		if (userInfo != null) {
			userId = userInfo.getId();
		}
		long postNo = postService.createPost(new PostDTO(null, null, userId, null, null));

		System.out.println("boardController.createTempPost: new PostNo " + postNo);

		Map<String, Long> response = new HashMap<>();
		response.put("postNo", postNo);

		return ResponseEntity.ok(response);
	}

	@Transactional
	@PostMapping
	public ResponseEntity<Map<String, Object>> createPost(@RequestBody Map<String, Object> payload,
			HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");

		String userId = userInfo.getId();
		// boolean isAdmin = userInfo.getIsAdmin();
		String postNo = payload.get("postNo").toString();
		String title = payload.get("title").toString();
		String content = payload.get("content").toString();
		String category = payload.get("category").toString();
		String sceneTitle = payload.get("sceneTitle").toString();
		String thumbnailUrl = payload.get("thumbnailUrl").toString();

		System.out.println("boardController.createPost: ");
		System.out.println("received postNo:" + postNo);

		if(postNo == null || postNo.equals("")) {
			postNo = String.valueOf(postService.createPost(new PostDTO(title, content, userId, category, sceneTitle)));
		} else {
			postService.updatePost(new PostDTO(Long.parseLong(postNo), title, content, category, sceneTitle, thumbnailUrl));
		}

		Map<String, Object> response = new HashMap<>();
		response.put("postNo", postNo);

		return ResponseEntity.ok(response);
	}

	@PutMapping("/{no}")
	public ResponseEntity<Map<String, Object>> updatePost(@PathVariable("no") int postNo, @RequestBody Map<String, Object> payload,
			HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		Map<String, Object> response = new HashMap<>();

		// 세션 유효성 확인
		if (userInfo == null) {
			response.put("errorMsg", "로그인 정보가 없습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}

		String userId = userInfo.getId();

		// 게시글 가져오기
		PostDTO post = postService.getPost(postNo);
		if (post == null) {
			response.put("errorMsg", "게시글을 찾을 수 없습니다.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		// 작성자 확인
		if (post.getUserId() == null || !userId.equals(post.getUserId())) {
			response.put("errorMsg", "게시글의 작성자가 아닙니다.");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		}

		// payload 데이터 추출
		String title = payload.get("title") != null ? payload.get("title").toString() : null;
		String content = payload.get("content") != null ? payload.get("content").toString() : null;

		if (title == null || content == null) {
			response.put("errorMsg", "제목과 내용을 모두 입력해야 합니다.");
			return ResponseEntity.badRequest().body(response);
		}

		// 게시글 업데이트
		PostDTO updatedPost = new PostDTO();
		updatedPost.setNo(postNo);
		updatedPost.setTitle(title);
		updatedPost.setContent(content);
		updatedPost.setUserId(userId);

		postService.updatePost(updatedPost);
		response.put("postNo", postNo);

		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{no}")
	public ResponseEntity<Map<String, Object>> deletePost(@PathVariable("no") int postNo,
			HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		Map<String, Object> response = new HashMap<>();

		// 세션 유효성 확인
		if (userInfo == null) {
			response.put("errorMsg", "로그인 정보가 없습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}

		String userId = userInfo.getId();
		
		// 게시글 가져오기
		PostDTO post = postService.getPost(postNo);
		if (post == null) {
			response.put("errorMsg", "게시글을 찾을 수 없습니다.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		// 작성자 확인
		if (post.getUserId() == null || !userId.equals(post.getUserId())) {
			response.put("errorMsg", "게시글의 작성자가 아닙니다.");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		}

		postService.deletePost(postNo);
		
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/like/{no}")
	public ResponseEntity<Map<String, Object>> updateLikeCount(@PathVariable("no") int postNo, @RequestBody Map<String, Object> payload, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		// 세션 유효성 확인
		if (userInfo == null) {
			response.put("errorMsg", "로그인 정보가 없습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
		
		int likeStatus = (int) payload.get("likeStatus");
		postLikeService.like(new PostLikeDTO(userInfo.getId(), postNo, likeStatus));
		
		int result = postService.updateLikeCount(postNo, likeStatus); 
		
		if (result == 1) {
			return ResponseEntity.ok(null);
		}
		
		return ResponseEntity.badRequest().build();
	}
}
