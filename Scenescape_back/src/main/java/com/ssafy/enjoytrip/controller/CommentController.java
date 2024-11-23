package com.ssafy.enjoytrip.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.enjoytrip.model.dto.CommentDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.CommentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/comments")
@Controller
@Tag(name = "Comment API", description = "댓글 관리와 관련된 API")
public class CommentController {
	CommentService commentService;
	
	@Autowired
	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}
	
	@PostMapping
	@Operation(
	    summary = "댓글 생성",
	    description = "새로운 댓글을 생성합니다."
	)
	@ApiResponses({
	    @ApiResponse(responseCode = "200", description = "댓글 생성 성공", 
	        content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDTO.class))),
	    @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
	    @ApiResponse(responseCode = "500", description = "서버 오류")
	})
	public ResponseEntity<CommentDTO> createComment(
		    @io.swagger.v3.oas.annotations.parameters.RequestBody(
		        description = "생성할 댓글 정보", required = true
		    ) @RequestBody CommentDTO comment,
		    HttpSession session
		) {		
		
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		if(userInfo == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		String userId = userInfo.getId();
		comment.setUserId(userId);
		
		int no = commentService.create(comment);
		
		comment.setNo(no);
		comment.setCreated(new Timestamp(System.currentTimeMillis()));
		
		System.out.println(comment.getNo()+" "+comment.getPostNo()+" "+comment.getContent()+" "+comment.getParentNo()+" "+comment.getCreated());
		
		return ResponseEntity.ok(comment);
	}
	
	@PutMapping
	@Operation(
	    summary = "댓글 수정",
	    description = "기존 댓글의 내용을 수정합니다."
	)
	@ApiResponses({
	    @ApiResponse(responseCode = "200", description = "댓글 수정 성공", 
	        content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDTO.class))),
	    @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없음"),
	    @ApiResponse(responseCode = "500", description = "서버 오류")
	})
	public ResponseEntity<CommentDTO> modifyComment(
	    @Parameter(description = "수정할 댓글 번호", required = true, example = "1")
	    @RequestParam("no") int no,
	    
	    @Parameter(description = "수정할 댓글 내용", required = true, example = "수정된 댓글 내용")
	    @RequestParam("Content") String content
	) {
		commentService.modify(new CommentDTO(no, content));
		CommentDTO result = new CommentDTO();
		result.setNo(no);
		result.setContent(content);
		result.setUpdated(new Timestamp(System.currentTimeMillis()));
		
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping("/{no}")
	@Operation(
	    summary = "댓글 삭제",
	    description = "특정 댓글을 삭제합니다."
	)
	@ApiResponses({
	    @ApiResponse(responseCode = "200", description = "댓글 삭제 성공", 
	        content = @Content(mediaType = "application/json", schema = @Schema(implementation = Integer.class))),
	    @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없음"),
	    @ApiResponse(responseCode = "500", description = "서버 오류")
	})
	public ResponseEntity<Integer> removeComment(
	    @Parameter(description = "삭제할 댓글 번호", required = true, example = "1")
	    @PathVariable("no") int no
	) {
		commentService.remove(no);
		
		return ResponseEntity.ok(no);
	}
	
	@GetMapping
	@Operation(
	    summary = "댓글 목록 조회",
	    description = "특정 게시물에 대한 모든 댓글을 조회합니다."
	)
	@ApiResponses({
	    @ApiResponse(responseCode = "200", description = "댓글 목록 조회 성공", 
	        content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDTO.class))),
	    @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없음"),
	    @ApiResponse(responseCode = "500", description = "서버 오류")
	})
	public ResponseEntity<List<CommentDTO>> listComment(
	    @Parameter(description = "조회할 게시물 번호", required = true, example = "100")
	    @RequestParam("postNo") int postNo
	) {
		List<CommentDTO> comments = commentService.searchAll(postNo);
		
		return ResponseEntity.ok(comments);
	}
}
