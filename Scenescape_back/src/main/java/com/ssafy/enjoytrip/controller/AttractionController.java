package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.AttractionDTO;
import com.ssafy.enjoytrip.service.AttractionService;

@RestController
@RequestMapping("/attractions")
public class AttractionController {
	private AttractionService attractionService;

	@Autowired
	public AttractionController(AttractionService attractionService) {
		this.attractionService = attractionService;
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAttractions(
	        @RequestParam(value = "page", defaultValue = "1") int page,
	        @RequestParam(value = "area", required = false) String area,
	        @RequestParam(value = "subArea", required = false) String subArea,
	        @RequestParam(value = "contents", required = false) String[] contents,
	        @RequestParam(value = "sceneTitle", required = false) String sceneTitle,
	        @RequestParam(value = "sortType", required = false) String sortType,
	        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
	    Map<String, Object> filter = new HashMap<>();
	    filter.put("area", area);
	    filter.put("subArea", subArea);
	    filter.put("contents", contents);
	    filter.put("sceneTitle", sceneTitle);
	    filter.put("sortType", sortType);
	    filter.put("page", page);
	    filter.put("pageSize", pageSize);
	    
	    System.out.println(sceneTitle);

	    // 페이지네이션을 위한 offset 계산
	    int offset = (page - 1) * pageSize;
	    filter.put("offset", offset);

	    int totalResults = attractionService.countAll(filter);
	    List<AttractionDTO> attractions = attractionService.searchAll(filter, sortType, page);

	    Map<String, Object> response = new HashMap<>();
	    response.put("totalResults", totalResults); // 전체 결과 수
	    response.put("page", page);
	    response.put("pageSize", pageSize);
	    response.put("resultsInCurrentPage", attractions.size());
	    response.put("results", attractions);

	    return ResponseEntity.ok(response);
	}

	@GetMapping("/titles")
	public ResponseEntity<List<String>> getSceneTitles() {
		List<String> titles = attractionService.getSceneTitles();
		return ResponseEntity.ok(titles);
	}
}
