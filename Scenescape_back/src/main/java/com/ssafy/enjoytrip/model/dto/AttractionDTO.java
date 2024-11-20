package com.ssafy.enjoytrip.model.dto;

public class AttractionDTO {
	private Integer no;
	private String title;
	private String sceneTitle;
	private Integer contentTypeID;
	private Integer areaCode;
	private Integer sigunguCode;
	private String address;
	private Double latitude;
	private Double longitude;
	private String overview;
	private String img;
	private String tel;
	private Integer likeCount;

	public AttractionDTO() {
		super();
	}

	public AttractionDTO(Integer no, String title, String sceneTitle, Integer contentTypeID, Integer areaCode,
			Integer sigunguCode, String address, Double latitude, Double longitude, String overview, String img,
			String tel, Integer likeCount) {
		super();
		this.no = no;
		this.title = title;
		this.sceneTitle = sceneTitle;
		this.contentTypeID = contentTypeID;
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

	public Integer getContentTypeID() {
		return contentTypeID;
	}

	public void setContentTypeID(Integer contentTypeID) {
		this.contentTypeID = contentTypeID;
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
