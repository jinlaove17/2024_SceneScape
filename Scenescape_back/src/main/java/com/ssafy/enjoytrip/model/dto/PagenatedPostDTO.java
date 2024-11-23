package com.ssafy.enjoytrip.model.dto;

import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페이지네이션된 게시글 목록")
public class PagenatedPostDTO {

    @Schema(description = "전체 결과 수", example = "100")
    private int totalResults;

    @Schema(description = "현재 페이지 번호", example = "1")
    private int page;

    @Schema(description = "페이지 크기", example = "20")
    private int pageSize;

    @Schema(description = "현재 페이지의 결과 수", example = "10")
    private int resultsInCurrentPage;

    @Schema(description = "게시글 목록")
    private List<PostDTO> results;

    // Getters and Setters
    public int getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(int totalResults) {
        this.totalResults = totalResults;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getResultsInCurrentPage() {
        return resultsInCurrentPage;
    }

    public void setResultsInCurrentPage(int resultsInCurrentPage) {
        this.resultsInCurrentPage = resultsInCurrentPage;
    }

    public List<PostDTO> getResults() {
        return results;
    }

    public void setResults(List<PostDTO> results) {
        this.results = results;
    }
}