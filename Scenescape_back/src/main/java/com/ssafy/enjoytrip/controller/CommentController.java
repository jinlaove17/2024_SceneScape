package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.ssafy.enjoytrip.service.CommentService;

@RequestMapping("/comments")
@Controller
public class CommentController {
	CommentService commentService;
	
	@Autowired
	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}
	
	@PostMapping
	public ResponseEntity<Map<String, Object>> createComment(@RequestBody CommentDTO comment) {		
		// todo: 세션에 저장된 userInfo의 아이디와 comment의 userId가 같은지 확인

		System.out.println(comment.getPostNo() + " " + comment.getUserId()+" "+comment.getContent());
		int no = commentService.create(comment);
		
		Map<String, Object> response = new HashMap<>();
		comment.setNo(no);
		response.put("comment", comment);
		
		return ResponseEntity.ok(response);
	}
	
	@PutMapping
	public ResponseEntity<Map<String, Object>> modifyComment(@RequestParam("no") int no, @RequestParam("Content") String content){
		commentService.modify(new CommentDTO(no, content));
		Map<String, Object> response = new HashMap<>();
		response.put("no", no);
		response.put("content", content);
		
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{no}")
	public ResponseEntity<Map<String, Object>> removeComment(@PathVariable("no") int no) {
		commentService.remove(no);
		
		Map<String, Object> response = new HashMap<>();
		response.put("no", no);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping
	public ResponseEntity<Map<String, Object>> listComment(@RequestParam("postNo") int postNo) {
		List<CommentDTO> comments = commentService.searchAll(postNo);
		
		Map<String, Object> response = new HashMap<>();
		response.put("comments", comments);
		
		return ResponseEntity.ok(response);
	}
}
