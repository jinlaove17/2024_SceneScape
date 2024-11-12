package com.ssafy.enjoytrip.model.dto;

import java.util.List;

public class AreaDTO {
	private int areaCode;
	private String areaName;
	List<SubAreaDTO> subAreas;
	
	public AreaDTO() {
		super();
	}

	public AreaDTO(int areaCode, String areaName, List<SubAreaDTO> subAreas) {
		super();
		this.areaCode = areaCode;
		this.areaName = areaName;
		this.subAreas = subAreas;
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

	public List<SubAreaDTO> getSubAreas() {
		return subAreas;
	}

	public void setSubAreas(List<SubAreaDTO> subAreas) {
		this.subAreas = subAreas;
	}
}
