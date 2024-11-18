package com.ssafy.enjoytrip.model.dto;

public class PostLikeDTO {
	private int no;
	private String userId;
	private int postNo;
	private boolean isLike;
	
	public PostLikeDTO() {
		super();
	}
	
	public PostLikeDTO(int no, String userId, int postNo, boolean isLike) {
		super();
		this.no = no;
		this.userId = userId;
		this.postNo = postNo;
		this.isLike = isLike;
	}
	
	public PostLikeDTO(String userId, int postNo) {
		super();
		this.userId = userId;
		this.postNo = postNo;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getPostNo() {
		return postNo;
	}

	public void setPostNo(int postNo) {
		this.postNo = postNo;
	}

	public boolean isLike() {
		return isLike;
	}

	public void setLike(boolean isLike) {
		this.isLike = isLike;
	}
}
