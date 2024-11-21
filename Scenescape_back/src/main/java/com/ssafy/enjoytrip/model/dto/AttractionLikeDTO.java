package com.ssafy.enjoytrip.model.dto;

public class AttractionLikeDTO {
	private int no;
	private String userId;
	private int attractionNo;
	
	public AttractionLikeDTO(int no, String userId, int attractionNo) {
		super();
		this.no = no;
		this.userId = userId;
		this.attractionNo = attractionNo;
	}

	public AttractionLikeDTO(String userId, int attractionNo) {
		super();
		this.userId = userId;
		this.attractionNo = attractionNo;
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

	public int getAttractionNo() {
		return attractionNo;
	}

	public void setAttractionNo(int attractionNo) {
		this.attractionNo = attractionNo;
	}

	@Override
	public String toString() {
		return "AttractionLikeDTO [no=" + no + ", userId=" + userId + ", attractionNo=" + attractionNo + "]";
	}
}
