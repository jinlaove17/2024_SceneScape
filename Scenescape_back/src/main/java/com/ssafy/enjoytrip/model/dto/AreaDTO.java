package com.ssafy.enjoytrip.model.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "지역 정보를 나타내는 DTO")
public class AreaDTO {
	@Schema(description = "지역 코드", example = "1")
	private int areaCode;
	
	@Schema(description = "지역 이름", example = "서울")
	private String areaName;
	
	@Schema(description = "하위 지역 목록")
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
