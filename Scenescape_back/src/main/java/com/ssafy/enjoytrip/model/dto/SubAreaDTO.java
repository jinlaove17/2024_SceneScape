package com.ssafy.enjoytrip.model.dto;

public class SubAreaDTO {
	private int subAreaCode;
	private String subAreaName;

	public SubAreaDTO() {
		super();
	}

	public SubAreaDTO(int subAreaCode, String subAreaName) {
		super();
		this.subAreaCode = subAreaCode;
		this.subAreaName = subAreaName;
	}

	public int getSubAreaCode() {
		return subAreaCode;
	}

	public void setSubAreaCode(int subAreaCode) {
		this.subAreaCode = subAreaCode;
	}

	public String getSubAreaName() {
		return subAreaName;
	}

	public void setSubAreaName(String subAreaName) {
		this.subAreaName = subAreaName;
	}
}
