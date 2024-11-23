package com.ssafy.enjoytrip.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "관광지 좋아요 정보를 담는 객체")
public class AttractionLikeDTO {

    @Schema(description = "좋아요 ID", example = "1")
    private int no;

    @Schema(description = "사용자 ID", example = "user123")
    private String userId;

    @Schema(description = "관광지 번호", example = "1001")
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
