package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.enjoytrip.model.dto.CommentDTO;
import com.ssafy.enjoytrip.model.dto.PostDTO;
import com.ssafy.enjoytrip.model.dto.PostLikeDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.BoardService;
import com.ssafy.enjoytrip.service.CommentService;
import com.ssafy.enjoytrip.service.ImageService;
import com.ssafy.enjoytrip.service.PostLikeService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/board")
@Controller
public class BoardController {
	private BoardService boardService;
	private ImageService imageService;
	private CommentService commentService;
	private PostLikeService postLikeService;

	@Autowired
	public BoardController(BoardService boardService, ImageService imageService, CommentService commentService,
			PostLikeService postLikeService) {
		this.boardService = boardService;
		this.imageService = imageService;
		this.commentService = commentService;
		this.postLikeService = postLikeService;
	}

	@Transactional
	@GetMapping("/post.do")
	public ResponseEntity<Map<String, Object>> getPost(@RequestParam("postNo") int postNo, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		boardService.updateViewCount(postNo);

//		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
//		String userId = null;
		int likeStatus = 0;
//
//		
//		if (userInfo != null) {
//			System.out.println(userInfo.toString());
//			userId = userInfo.getId();
//			likeStatus = postLikeService.getLikeStatus(new PostLikeDTO(userId, postNo));
//		}
//
		PostDTO post = boardService.getPost(postNo);
		List<CommentDTO> comments = commentService.searchAll(postNo);

		response.put("post", post);
		response.put("comments", comments);
//		response.put("likeStatus", likeStatus);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/posts.do")
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
	public ResponseEntity<Map<String, Long>> createTempPost(HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		String userId = "ssafy";
		if (userInfo != null) {
			userId = userInfo.getId();
		}
		long postNo = boardService.createPost(new PostDTO(null, null, userId, null, null));

		System.out.println("boardController.createTempPost: new PostNo " + postNo);

		Map<String, Long> response = new HashMap<>();
		response.put("postNo", postNo);

		return ResponseEntity.ok(response);
	}

	@Transactional
	@PostMapping("/createScenePost.do")
	public ResponseEntity<Map<String, Object>> createScenePost(@RequestBody Map<String, Object> payload, // JSON 데이터를
																											// Map으로 받음
			HttpSession session) {

		Long postNo = Long.valueOf(payload.get("postNo").toString());
		String title = payload.get("title").toString();
		String content = payload.get("content").toString();
		String thumbnailUrl = payload.get("imageUrl").toString();
		String sceneTitle = payload.get("sceneTitle").toString();

		System.out.println("title: " + title);
		System.out.println("content: " + content);
		System.out.println("새 게시글 번호: " + postNo);

		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		String userId = (userInfo != null) ? userInfo.getId() : "ssafy";

		boardService.updatePost(new PostDTO(postNo, title, content, thumbnailUrl, "SCENE", sceneTitle));

		// JSON 응답으로 반환할 데이터 구성
		Map<String, Object> response = new HashMap<>();
		response.put("message", "게시글이 성공적으로 생성되었습니다.");
		response.put("title", title);
		response.put("content", content);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/createPost.do")
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

		if (postNo == null || postNo.equals("")) {
			postNo = String.valueOf(boardService.createPost(new PostDTO(title, content, userId, category, sceneTitle)));
		} else {
			boardService.updatePost(
					new PostDTO(Long.parseLong(postNo), title, content, category, sceneTitle, thumbnailUrl));
		}

		Map<String, Object> response = new HashMap<>();
		response.put("postNo", postNo);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/updatePost.do")
	public ResponseEntity<Map<String, Object>> updatePost(@RequestBody Map<String, Object> payload,
			HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		Map<String, Object> response = new HashMap<>();

		// 세션 유효성 확인
//		if (userInfo == null) {
//			response.put("errorMsg", "로그인 정보가 없습니다.");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
//
//		String userId = userInfo.getId();

		String userId = "ssafy";

		// postNo 유효성 확인
		if (!payload.containsKey("postNo") || payload.get("postNo") == null) {
			response.put("errorMsg", "유효하지 않은 게시글 번호입니다.");
			return ResponseEntity.badRequest().body(response);
		}

		long postNo;
		try {
			postNo = Long.parseLong(payload.get("postNo").toString());
		} catch (NumberFormatException e) {
			response.put("errorMsg", "게시글 번호는 숫자여야 합니다.");
			return ResponseEntity.badRequest().body(response);
		}

		// 게시글 가져오기
		PostDTO post = boardService.getPost(postNo);
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

		boardService.updatePost(updatedPost);
		response.put("postNo", postNo);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/deletePost.do")
	public ResponseEntity<Map<String, Object>> deletePost(@RequestBody Map<String, Object> payload,
			HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		Map<String, Object> response = new HashMap<>();

		// 세션 유효성 확인
//		if (userInfo == null) {
//			response.put("errorMsg", "로그인 정보가 없습니다.");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
//
//		String userId = userInfo.getId();

		String userId = "ssafy";

		// postNo 유효성 확인
		if (!payload.containsKey("postNo") || payload.get("postNo") == null) {
			response.put("errorMsg", "유효하지 않은 게시글 번호입니다.");
			return ResponseEntity.badRequest().body(response);
		}

		long postNo;
		try {
			postNo = Long.parseLong(payload.get("postNo").toString());
		} catch (NumberFormatException e) {
			response.put("errorMsg", "게시글 번호는 숫자여야 합니다.");
			return ResponseEntity.badRequest().body(response);
		}

		// 게시글 가져오기
		PostDTO post = boardService.getPost(postNo);
		if (post == null) {
			response.put("errorMsg", "게시글을 찾을 수 없습니다.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		// 작성자 확인
		if (post.getUserId() == null || !userId.equals(post.getUserId())) {
			response.put("errorMsg", "게시글의 작성자가 아닙니다.");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		}

		boardService.deletePost(postNo);

		return ResponseEntity.ok(response);
	}

	// 트랜잭션이 완료되지 않은 상태에서도 변경된 데이터를 다른 트랜잭션에서 볼 수 있음
	@Transactional(isolation = Isolation.READ_COMMITTED)
	@PutMapping("/updateViewCount.do")
	public ResponseEntity<Integer> updateViewCount(long postNo) {
		return ResponseEntity.ok(boardService.updateViewCount(postNo));
	}

	@PutMapping("/updateLikeCount.do")
	public ResponseEntity<Integer> updateLikeCount(long postNo) {
		return ResponseEntity.ok(boardService.updateLikeCount(postNo));
	}
}
