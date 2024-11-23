package com.ssafy.enjoytrip.model.dto;

import java.sql.Timestamp;

public class PostDTO {
    private long no;
    private String title;
    private String content;
    private String userId;
    private int viewCount;
    private int likeCount;
    private int dislikeCount;
    private Timestamp created;
    private Timestamp updated;
    private String thumbnailUrl;
    private String category;
    private String sceneTitle;
    private Integer attractionNo;
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
	

	public PostDTO(long no, String title, String content, String thumbnailUrl, String sceneTitle, Integer attractionNo, String attractionTitle) {
		super();
		this.no = no;
		this.title = title;
		this.content = content;
		this.thumbnailUrl = thumbnailUrl;
		this.sceneTitle = sceneTitle;
		this.attractionNo = attractionNo;
		this.attractionTitle = attractionTitle;
	}

	public long getNo() {
		return no;
	}

	public void setNo(long no) {
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