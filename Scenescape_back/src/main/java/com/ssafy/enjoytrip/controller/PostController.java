package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.enjoytrip.model.dto.CommentDTO;
import com.ssafy.enjoytrip.model.dto.PagenatedPostDTO;
import com.ssafy.enjoytrip.model.dto.PostDTO;
import com.ssafy.enjoytrip.model.dto.PostDetailDTO;
import com.ssafy.enjoytrip.model.dto.PostLikeDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.CommentService;
import com.ssafy.enjoytrip.service.PostLikeService;
import com.ssafy.enjoytrip.service.PostService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/posts")
@Controller
public class PostController {
	private PostService postService;
	private CommentService commentService;
	private PostLikeService postLikeService;

	@Autowired
	public PostController(PostService postService, CommentService commentService, PostLikeService postLikeService) {
		this.postService = postService;
		this.commentService = commentService;
		this.postLikeService = postLikeService;
	}

    @Transactional
    @GetMapping("/{no}")
    public ResponseEntity<PostDetailDTO> getPost(@PathVariable("no") int postNo, HttpSession session) {
        // 조회 수 증가
        postService.updateViewCount(postNo);

        // 게시글 및 댓글 조회
        PostDTO post = postService.getPost(postNo);
        List<CommentDTO> comments = commentService.searchAll(postNo);

        // 좋아요 상태 조회
        UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
        int likeStatus = (userInfo != null) ? postLikeService.getLikeStatus(new PostLikeDTO(userInfo.getId(), postNo)) : 0;

        // 응답 생성
        PostDetailDTO response = new PostDetailDTO(post, comments, likeStatus);
        return ResponseEntity.ok(response);
    }

	// searchType : title, userId, sceneTitle, attractionTitle
    @GetMapping
    @Operation(
        summary = "게시글 필터 조회",
        description = "검색 필터와 페이지네이션 옵션을 사용하여 게시글 목록을 조회합니다."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "게시글 목록 조회 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청"),
        @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<PagenatedPostDTO> getPostsByFilter(
            @Parameter(description = "검색 유형", required = false) @RequestParam(value = "searchType", required = false) List<String> searchType,
            @Parameter(description = "검색 키워드", required = false) @RequestParam(value = "searchKeyword", required = false) List<String> searchKeyword,
            @Parameter(description = "게시글 카테고리", example = "SCENE") @RequestParam(value = "category", defaultValue = "SCENE") String category,
            @Parameter(description = "정렬 방식", required = false) @RequestParam(value = "sortType", required = false) String sortType,
            @Parameter(description = "페이지 번호", example = "1") @RequestParam(value = "page", defaultValue = "1") int page,
            @Parameter(description = "페이지 크기", example = "10") @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
    	
    	if(searchType.size() != searchKeyword.size()) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    	}
    	
    	System.out.println(searchType);
    	System.out.println(searchKeyword);
    	
        // 필터링 및 페이지네이션 데이터 생성
        Map<String, Object> filter = new HashMap<>();
        filter.put("searchType", searchType);
        filter.put("searchKeyword", searchKeyword);
        filter.put("sortType", sortType);
        filter.put("category", category);
        filter.put("page", page);
        filter.put("pageSize", pageSize);

        // 페이지네이션을 위한 offset 계산
        int offset = (page - 1) * pageSize;
        filter.put("offset", offset);

        // 게시글 조회
        int totalResults = postService.countByFilter(filter);
        List<PostDTO> posts = postService.getPostsByFilter(filter);

        // DTO 생성 및 데이터 설정
        PagenatedPostDTO result = new PagenatedPostDTO();
        result.setTotalResults(totalResults);
        result.setPage(page);
        result.setPageSize(pageSize);
        result.setResultsInCurrentPage(posts.size());
        result.setResults(posts);

        return ResponseEntity.ok(result);
    }

	@PostMapping("/temp")
	public ResponseEntity<Integer> createTempPost(HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		String userId = "ssafy";
		if (userInfo != null) {
			userId = userInfo.getId();
		}
		int postNo = postService.createPost(new PostDTO(null, null, userId, "SCENE"));

		System.out.println("boardController.createTempPost: new PostNo " + postNo);

		return ResponseEntity.ok(postNo);
	}

	@Transactional
	@PostMapping
	public ResponseEntity<Integer> createPost(@RequestBody PostDTO postDTO, HttpSession session) {
	    
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
	    
	    if(userInfo == null) {
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	    
	    // 사용자 정보 가져오기
	    String userId = userInfo.getId();
	    postDTO.setUserId(userId); // DTO에 사용자 ID 설정

	    // 게시글 번호가 없으면 새로 생성, 있으면 업데이트
	    System.out.println("게시글 번호: ");
	    System.out.println(postDTO.getNo());
	    if (postDTO.getNo() == 0) {
	    	int postNo = postService.createPost(postDTO);
	        postDTO.setNo(postNo);
	    } else {
	        postService.updatePost(postDTO);
	    }

	    return ResponseEntity.ok(postDTO.getNo());
	}

	@PutMapping("/{no}")
	public ResponseEntity<Integer> updatePost(@PathVariable("no") int postNo, @RequestBody PostDTO newPost,
			HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");

		// 세션 유효성 확인
		if (userInfo == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		String userId = userInfo.getId();

		// 게시글 가져오기
		PostDTO oldPost = postService.getPost(postNo);
		if (oldPost == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		// 작성자 확인
		if (oldPost.getUserId() == null || !userId.equals(oldPost.getUserId())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}

		String title = newPost.getTitle() != null ? newPost.getTitle().toString() : null;
		String content = newPost.getContent() != null ? newPost.getContent().toString() : null;

		if (title == null || content == null) {
			return ResponseEntity.badRequest().build();
		}
		
		System.out.println(newPost.getNo()+ " " + newPost.getContent() + " " + newPost.getSceneTitle() + "\n");
		System.out.println(newPost.getAttractionTitle() + " " + newPost.getCategory()+ " " + newPost.getThumbnailUrl());

		postService.updatePost(newPost);

		return ResponseEntity.ok(postNo);
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
