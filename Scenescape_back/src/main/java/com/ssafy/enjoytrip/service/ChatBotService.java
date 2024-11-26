package com.ssafy.enjoytrip.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dto.AttractionDTO;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;

@Service
public class ChatBotService {

    private final OpenAiService chatBotService;

    public ChatBotService(@Value("${openai.api.key}") String openaiApiKey) {
        this.chatBotService = new OpenAiService(openaiApiKey);
    }

    public String getRecommendation(String contentTitle, String region, List<AttractionDTO> attractions) {
        String systemMessageContent = "당신은 전문적인 여행 가이드입니다.";

        StringBuilder userPrompt = new StringBuilder();
        userPrompt
            .append("사용자가 감명 깊게 감상한 영상 컨텐츠(드라마, 예능 등)와 방문 희망 지역을 바탕으로 관광지를 추천해 주세요.\n")
            .append("제목: ").append(contentTitle).append("\n")
            .append("방문 희망 지역: ").append(region).append("\n")
            .append("아래는 '").append(contentTitle).append("'의 촬영지로 사용된 관광지 정보입니다.\n");
        
        for (AttractionDTO attraction : attractions) {
            userPrompt
                .append("이름: ").append(attraction.getTitle()).append("\n")
                .append("주소: ").append(attraction.getAddress()).append("\n")
                .append("설명: ").append(attraction.getOverview()).append("\n")
                .append("좋아요 수: ").append(attraction.getLikeCount()).append("\n")
                .append("\n");
        }

        List<ChatMessage> messages = new ArrayList<>();
        messages.add(new ChatMessage("system", systemMessageContent));
        messages.add(new ChatMessage("user", userPrompt.toString()));

        ChatCompletionRequest request = ChatCompletionRequest.builder()
            .model("gpt-3.5-turbo") // 또는 gpt-4
            .messages(messages)
            .maxTokens(1000)
            .build();

        return chatBotService.createChatCompletion(request)
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}