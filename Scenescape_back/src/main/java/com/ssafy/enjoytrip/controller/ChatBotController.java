package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.AttractionDTO;
import com.ssafy.enjoytrip.service.AttractionService;
import com.ssafy.enjoytrip.service.ChatBotService;

@RequestMapping("/chats")
@RestController
public class ChatBotController {
	private ChatBotService chatBotService;
	private AttractionService attractionService;
	
	@Autowired
	public ChatBotController(ChatBotService chatBotService, AttractionService attractionService) {
		this.chatBotService = chatBotService;
		this.attractionService = attractionService;
	};
	
	@GetMapping
	public ResponseEntity<Map<String, Object> >getRecommendFromChatBot(@RequestParam String sceneTitle, @RequestParam String region){
		Map<String, Object> response = new HashMap<>();
		Map<String, Object> filter = new HashMap<>();
		filter.put("sceneTitle", sceneTitle);
		List<AttractionDTO> attractions = attractionService.searchAll(filter);
		
		String recommend = chatBotService.getRecommendation(sceneTitle, region, attractions);
		
		response.put("recommend", recommend);
		return ResponseEntity.ok(response);
	}
}
