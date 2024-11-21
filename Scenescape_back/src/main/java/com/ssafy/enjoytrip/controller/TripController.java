package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.TripDTO;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.TripService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/trips")
public class TripController {
	private TripService tripService;
	
	@Autowired
	public TripController(TripService tripService) {
		this.tripService = tripService;
	}
	
	@GetMapping
	public ResponseEntity<Map<String, Object>> getTrips(HttpSession session) {
		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		Map<String, Object> response = new HashMap<>();
		
		if(userInfo == null) {
			response.put("errorMsg", "로그인이 필요한 서비스입니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
		
		String userId = userInfo.getId();
		List<TripDTO> trips = tripService.selectTrips(userId);
		
		response.put("trips", trips);
		
		return ResponseEntity.ok(response);
	}
}
