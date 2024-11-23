package com.ssafy.enjoytrip.model.dto;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "관광지 응답 정보를 담는 객체")
public class PagenatedAttractionDTO {

    @Schema(description = "전체 결과 수", example = "100", required = true)
    private int totalCount;

    @Schema(description = "현재 페이지 번호", example = "1", required = true)
    private int page;

    @Schema(description = "관광지 리스트", required = true)
    private List<AttractionDTO> items;

    @Schema(description = "좋아요한 관광지 번호 리스트 (로그인 사용자만 포함)", example = "[1, 2, 3]")
    private List<Integer> likes;
    
    public PagenatedAttractionDTO() {
    	super();
    }

    public PagenatedAttractionDTO(int totalCount, int page, List<AttractionDTO> items, List<Integer> likes) {
        this.totalCount = totalCount;
        this.page = page;
        this.items = items;
        this.likes = likes;
    }

    // Getters and Setters
    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public List<AttractionDTO> getItems() {
        return items;
    }

    public void setItems(List<AttractionDTO> items) {
        this.items = items;
    }

    public List<Integer> getLikes() {
        return likes;
    }

    public void setLikes(List<Integer> likes) {
        this.likes = likes;
    }
}