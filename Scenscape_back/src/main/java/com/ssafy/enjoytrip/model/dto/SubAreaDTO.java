package com.ssafy.enjoytrip.model.dto;

public class SubAreaDTO {
	private int areaCode;
	private String areaName;
	private int subAreaCode;
	private String subAreaName;

	public SubAreaDTO() {
		super();
	}

	public SubAreaDTO(int areaCode, String areaName, int subAreaCode, String subAreaName) {
		super();
		this.areaCode = areaCode;
		this.areaName = areaName;
		this.subAreaCode = subAreaCode;
		this.subAreaName = subAreaName;
	}

	public int getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(int areaCode) {
		this.areaCode = areaCode;
	}
	

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
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
