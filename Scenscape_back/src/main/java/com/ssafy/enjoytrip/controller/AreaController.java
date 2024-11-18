package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssafy.enjoytrip.model.dto.AreaDTO;
import com.ssafy.enjoytrip.service.AreaService;

@Controller
@RequestMapping("/area")
public class AreaController {
	private AreaService areaService;
	
	@Autowired
	public AreaController(AreaService areaService) {
		this.areaService = areaService;
	}
	
	@GetMapping("/subArea.do")
	@ResponseBody
	private ResponseEntity<Map<String, Object>> getSubAreas(@RequestParam(value = "areaCode") int areaCode) {
		Map<String, Object> response = new HashMap<>();
		AreaDTO area = areaService.select(areaCode);
		
		if(area != null) {
			response.put("areaCode", area.getAreaCode());
			response.put("areaName", area.getAreaName());
			response.put("subAreas", area.getSubAreas());
		}
		return ResponseEntity.ok(response);
	}
}
