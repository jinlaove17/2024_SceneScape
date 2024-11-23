package com.ssafy.enjoytrip.model.dto;

public class ImageDTO {
	private int no;
	private long postNo;
	private String url;
	private String mediaType;
	private String altText;
	
	public ImageDTO() {
		super();
	}

	public ImageDTO(long postNo, String url, String mediaType, String altText) {
		super();
		this.postNo = postNo;
		this.url = url;
		this.mediaType = mediaType;
		this.altText = altText;
	}

	public ImageDTO(int no, long postNo, String url, String mediaType, String altText) {
		super();
		this.no = no;
		this.postNo = postNo;
		this.url = url;
		this.mediaType = mediaType;
		this.altText = altText;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public long getPostNo() {
		return postNo;
	}

	public void setPostNo(long postNo) {
		this.postNo = postNo;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public String getAltText() {
		return altText;
	}

	public void setAltText(String altText) {
		this.altText = altText;
	}
}
