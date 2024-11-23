package com.ssafy.enjoytrip.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "관광지 정보를 나타내는 객체")
public class AttractionDTO {

    @Schema(description = "관광지 번호", example = "1")
    private Integer no;

    @Schema(description = "관광지 제목", example = "서울타워")
    private String title;

    @Schema(description = "드라마/영화 촬영지 제목", example = "이태원 클라쓰")
    private String sceneTitle;

    @Schema(description = "콘텐츠 유형 ID", example = "12")
    private Integer contentTypeId;

    @Schema(description = "지역 코드", example = "1")
    private Integer areaCode;

    @Schema(description = "시군구 코드", example = "101")
    private Integer sigunguCode;

    @Schema(description = "주소", example = "서울특별시 용산구 남산공원길 105")
    private String address;

    @Schema(description = "위도", example = "37.5511694")
    private Double latitude;

    @Schema(description = "경도", example = "126.9882266")
    private Double longitude;

    @Schema(description = "개요", example = "서울타워는 서울의 상징적인 타워로, 많은 관광객이 방문하는 명소입니다.")
    private String overview;

    @Schema(description = "이미지 URL", example = "http://example.com/image.jpg")
    private String img;

    @Schema(description = "연락처", example = "02-123-4567")
    private String tel;

    @Schema(description = "좋아요 수", example = "123")
    private Integer likeCount;

	public AttractionDTO() {
		super();
	}

	public AttractionDTO(Integer no, String title, String sceneTitle, Integer contentTypeId, Integer areaCode,
			Integer sigunguCode, String address, Double latitude, Double longitude, String overview, String img,
			String tel, Integer likeCount) {
		super();
		this.no = no;
		this.title = title;
		this.sceneTitle = sceneTitle;
		this.contentTypeId = contentTypeId;
		this.areaCode = areaCode;
		this.sigunguCode = sigunguCode;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.overview = overview;
		this.img = img;
		this.tel = tel;
		this.likeCount = likeCount;
	}

	public Integer getNo() {
		return no;
	}

	public void setNo(Integer no) {
		this.no = no;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSceneTitle() {
		return sceneTitle;
	}

	public void setSceneTitle(String sceneTitle) {
		this.sceneTitle = sceneTitle;
	}

	public Integer getContentTypeId() {
		return contentTypeId;
	}

	public void setContentTypeID(Integer contentTypeId) {
		this.contentTypeId = contentTypeId;
	}

	public Integer getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(Integer areaCode) {
		this.areaCode = areaCode;
	}

	public Integer getSigunguCode() {
		return sigunguCode;
	}

	public void setSigunguCode(Integer sigunguCode) {
		this.sigunguCode = sigunguCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}
	
	public Integer getLikeCount() {
		return likeCount;
	}

	public void setLikeCount(Integer likeCount) {
		this.likeCount = likeCount;
	}
	
}
