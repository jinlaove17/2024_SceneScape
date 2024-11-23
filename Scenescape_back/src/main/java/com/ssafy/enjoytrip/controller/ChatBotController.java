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
import com.ssafy.enjoytrip.model.dto.ChatBotRecommendationDTO;
import com.ssafy.enjoytrip.service.AttractionService;
import com.ssafy.enjoytrip.service.ChatBotService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/chats")
@Tag(name = "ChatBot API", description = "ChatBot 추천 관련 API")
public class ChatBotController {
	private ChatBotService chatBotService;
	private AttractionService attractionService;
	
	@Autowired
	public ChatBotController(ChatBotService chatBotService, AttractionService attractionService) {
		this.chatBotService = chatBotService;
		this.attractionService = attractionService;
	};
	
	@GetMapping
	@Operation(
	    summary = "ChatBot 추천 결과 조회",
	    description = "ChatBot을 사용하여 드라마/영화 제목(sceneTitle)과 지역(region)을 기반으로 추천 결과를 제공합니다."
	)
	@ApiResponses({
	    @ApiResponse(responseCode = "200", description = "추천 결과 조회 성공", 
	        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChatBotRecommendationDTO.class))),
	    @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
	    @ApiResponse(responseCode = "500", description = "서버 오류")
	})
	public ResponseEntity<ChatBotRecommendationDTO> getChatBotRecommendation(
	    @Parameter(description = "드라마/영화 제목", required = true, example = "이태원 클라쓰")
	    @RequestParam String sceneTitle,
	    
	    @Parameter(description = "추천 지역", required = true, example = "서울")
	    @RequestParam String region
	) {
	    ChatBotRecommendationDTO result = new ChatBotRecommendationDTO();
	    Map<String, Object> filter = new HashMap<>();
	    filter.put("sceneTitle", sceneTitle);
	    List<AttractionDTO> attractions = attractionService.searchAll(filter);
	    
	    String recommend = chatBotService.getRecommendation(sceneTitle, region, attractions);
	    result.setRecommend(recommend);
	    return ResponseEntity.ok(result);
	}
}
