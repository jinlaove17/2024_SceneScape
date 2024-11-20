package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.AreaDTO;
import com.ssafy.enjoytrip.service.AreaService;

@RestController
@RequestMapping("/areas")
public class AreaController {
	private AreaService areaService;

	@Autowired
	public AreaController(AreaService areaService) {
		this.areaService = areaService;
	}

	@GetMapping
	private ResponseEntity<Map<String, Object>> getAreas() {
		List<AreaDTO> areas = areaService.selectAll();

		if (areas != null) {
			Map<String, Object> response = new HashMap<>();
			response.put("areas", areas);
			return ResponseEntity.ok(response);
		}

		return ResponseEntity.notFound().build();
	}
}
