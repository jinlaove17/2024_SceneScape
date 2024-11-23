package com.ssafy.enjoytrip.model.dto;

import java.sql.Timestamp;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 정보를 담는 DTO")
public class PostDTO {

    @Schema(description = "게시글 번호", example = "1")
    private int no;

    @Schema(description = "게시글 제목", example = "서울의 멋진 풍경")
    private String title;

    @Schema(description = "게시글 내용", example = "서울의 멋진 풍경을 소개합니다.")
    private String content;

    @Schema(description = "작성자 ID", example = "user123")
    private String userId;

    @Schema(description = "조회수", example = "100")
    private int viewCount;

    @Schema(description = "좋아요 수", example = "50")
    private int likeCount;

    @Schema(description = "싫어요 수", example = "2")
    private int dislikeCount;

    @Schema(description = "작성 시간", example = "2024-11-23T12:34:56.789+09:00")
    private Timestamp created;

    @Schema(description = "수정 시간", example = "2024-11-24T15:12:34.567+09:00")
    private Timestamp updated;

    @Schema(description = "썸네일 URL", example = "https://example.com/image.jpg")
    private String thumbnailUrl;

    @Schema(description = "게시글 카테고리", example = "SCENE")
    private String category;

    @Schema(description = "관련 드라마/영화 제목", example = "도깨비")
    private String sceneTitle;

    @Schema(description = "관련 관광지 번호", example = "123")
    private Integer attractionNo;

    @Schema(description = "관련 관광지 제목", example = "남산타워")
    private String attractionTitle;

    public PostDTO() {
        super();
    }
	
	public PostDTO(String title, String content, String userId, String category) {
		super();
		this.title = title;
		this.content = content;
		this.userId = userId;
		this.category = category;
	}
	

	public PostDTO(int no, String title, String content, String thumbnailUrl, String sceneTitle, Integer attractionNo, String attractionTitle) {
		super();
		this.no = no;
		this.title = title;
		this.content = content;
		this.thumbnailUrl = thumbnailUrl;
		this.sceneTitle = sceneTitle;
		this.attractionNo = attractionNo;
		this.attractionTitle = attractionTitle;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getViewCount() {
		return viewCount;
	}

	public void setViewCount(int viewCount) {
		this.viewCount = viewCount;
	}

	public int getLikeCount() {
		return likeCount;
	}

	public void setLikeCount(int likeCount) {
		this.likeCount = likeCount;
	}

	public int getDislikeCount() {
		return dislikeCount;
	}

	public void setDislikeCount(int dislikeCount) {
		this.dislikeCount = dislikeCount;
	}

	public Timestamp getCreated() {
		return created;
	}

	public void setCreated(Timestamp created) {
		this.created = created;
	}

	public Timestamp getUpdated() {
		return updated;
	}

	public void setUpdated(Timestamp updated) {
		this.updated = updated;
	}

	public String getThumbnailUrl() {
		return thumbnailUrl;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSceneTitle() {
		return sceneTitle;
	}

	public void setSceneTitle(String sceneTitle) {
		this.sceneTitle = sceneTitle;
	}

	public Integer getAttractionNo() {
		return attractionNo;
	}

	public void setAttractionNo(Integer attractionNo) {
		this.attractionNo = attractionNo;
	}

	public String getAttractionTitle() {
		return attractionTitle;
	}

	public void setAttractionTitle(String attractionTitle) {
		this.attractionTitle = attractionTitle;
	}
}