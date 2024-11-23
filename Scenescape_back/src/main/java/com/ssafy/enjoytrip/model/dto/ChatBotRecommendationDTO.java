package com.ssafy.enjoytrip.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "ChatBot 추천 응답 정보를 담는 객체")
public class ChatBotRecommendationDTO {

    @Schema(description = "추천 결과 메시지", example = "강릉의 해변과 촬영지를 방문해보세요!")
    private String recommend;

    // 기본 생성자
    public ChatBotRecommendationDTO() {}

    // 필드 초기화 생성자
    public ChatBotRecommendationDTO(String recommend) {
        this.recommend = recommend;
    }

    // Getter와 Setter
    public String getRecommend() {
        return recommend;
    }

    public void setRecommend(String recommend) {
        this.recommend = recommend;
    }
}