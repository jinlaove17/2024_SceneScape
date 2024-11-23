package com.ssafy.enjoytrip.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "하위 지역 정보를 나타내는 DTO")
public class SubAreaDTO {
	
    @Schema(description = "하위 지역 코드", example = "1", required = true)
	private int subAreaCode;
    
    @Schema(description = "하위 지역 이름", example = "강남구", required = true)
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
