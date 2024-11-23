package com.ssafy.enjoytrip.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "관광지 제목 정보를 나타내는 객체")
public class SceneTitleDTO {

    @Schema(description = "관광지 제목", example = "서울타워", required = true)
    private String title;

    // 기본 생성자
    public SceneTitleDTO() {}

    // 필드를 초기화하는 생성자
    public SceneTitleDTO(String title) {
        this.title = title;
    }

    // Getter와 Setter
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}