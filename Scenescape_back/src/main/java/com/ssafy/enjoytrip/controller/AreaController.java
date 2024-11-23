package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.AreaDTO;
import com.ssafy.enjoytrip.service.AreaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/areas")
@Tag(name = "Area API", description = "지역 정보 API")
public class AreaController {
	private AreaService areaService;

	@Autowired
	public AreaController(AreaService areaService) {
		this.areaService = areaService;
	}

	@GetMapping
	@Operation(
	    summary = "지역 목록 조회",
	    description = "모든 지역 정보와 하위 지역 정보를 조회합니다."
	)
	@ApiResponses({
	    @ApiResponse(responseCode = "200", description = "지역 목록 조회 성공"),
	    @ApiResponse(responseCode = "404", description = "지역 정보를 찾을 수 없음")
	})
	private ResponseEntity<List<AreaDTO>> getAreas() {
		List<AreaDTO> areas = areaService.selectAll();

		if (areas != null) {
			return ResponseEntity.ok(areas);
		}
		return ResponseEntity.notFound().build();
	}
}
