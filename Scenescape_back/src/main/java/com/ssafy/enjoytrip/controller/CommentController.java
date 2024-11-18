package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.enjoytrip.model.dto.CommentDTO;
import com.ssafy.enjoytrip.service.CommentService;

@RequestMapping("/comment")
@Controller
public class CommentController {
	CommentService commentService;
	
	@Autowired
	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}
	
	@PostMapping("/create.do")
	public ResponseEntity<Map<String, Object>> createComment(@RequestParam("postNo") int postNo, @RequestParam("userId") String userId, @RequestParam("content") String content, @RequestParam(value = "parentNo", required=false) Integer parentNo) {
		int no = commentService.create(new CommentDTO(postNo, userId, content, parentNo));
		Map<String, Object> response = new HashMap<>();
		response.put("no", no);
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/modify.do")
	public ResponseEntity<Map<String, Object>> modifyComment(@RequestParam("no") int no, @RequestParam("Content") String content){
		commentService.modify(new CommentDTO(no, content));
		Map<String, Object> response = new HashMap<>();
		response.put("no", no);
		response.put("content", content);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/remove.do")
	public ResponseEntity<Map<String, Object>> removeComment(@RequestParam("no") int no) {
		commentService.remove(no);
		
		Map<String, Object> response = new HashMap<>();
		response.put("no", no);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/list.do")
	public ResponseEntity<Map<String, Object>> listCommnet(@RequestParam("postNo") int postNo) {
		List<CommentDTO> comments = commentService.searchAll(postNo);
		
		Map<String, Object> response = new HashMap<>();
		response.put("comments", comments);
		
		return ResponseEntity.ok(response);
	}
}
