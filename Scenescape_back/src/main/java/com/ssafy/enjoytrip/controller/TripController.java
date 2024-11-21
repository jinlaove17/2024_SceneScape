package com.ssafy.enjoytrip.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
		
		// postman으로 테스트 하기 위해 주석
//		if(userInfo == null) {
//			response.put("errorMsg", "로그인이 필요한 서비스입니다.");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
//		
//		String userId = userInfo.getId();
		List<TripDTO> trips = tripService.selectTrips("ssafy");
		
		response.put("trips", trips);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{no}")
	public ResponseEntity<Map<String, Object>> getTrip(@PathVariable("no") int tripNo, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		
//		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
//		if(userInfo == null) {
//			response.put("errorMsg", "로그인이 필요한 서비스 입니다.");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
		
		TripDTO trip = tripService.selectTrip(tripNo);
		
		if(trip == null) {
			response.put("errorMsg", "해당 일정을 찾을 수 없습니다.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
		
//		if(!trip.getUserId().equals(userInfo.getId())) {
//			response.put("errorMsg", "작성자만 접근 가능합니다.");
//			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
//		}
		
		response.put("trip", trip);
		return ResponseEntity.ok(response);
	}
	
	@Transactional
	@PostMapping
	public ResponseEntity<Map<String, Object>> createTrip(@RequestBody TripDTO request, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		
//		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
		
//		String userId = (String) payload.get("userId");
//		String title = (String) payload.get("title");
//		String description = (String) payload.get("description");
//		LocalDate startDate = (LocalDate) payload.get("startDate");
//		LocalDate endDate = (LocalDate) payload.get("endDate");
//		List<Object> attractions = (List<Object>) payload.get("attractions"); 
		
//		if(!userInfo.getId().equals(userId)) {
//			response.put("errorMsg", "로그인 정보가 일치하지 않습니다.");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
		
//		TripDTO trip = new TripDTO(userId, title, description, startDate, endDate);
//		int no = tripService.createTrip(trip);
//		trip.setNo(no);
//		response.put("trip", trip);
//		return ResponseEntity.status(HttpStatus.CREATED).body(response);
		
		request.setUserId("ssafy");
		int no = tripService.createTrip(request);
		request.setNo(no);
		response.put("trip", request);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@Transactional
	@PutMapping("/{no}")
	public ResponseEntity<Map<String, Object>> modifyTrip(@PathVariable("no") int tripNo, @RequestBody TripDTO request, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		
//		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
//		if(userInfo == null) {
//			response.put("errorMsg", "로그인이 필요한 서비스 입니다.");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
		
		TripDTO trip = tripService.selectTrip(tripNo);
//		if(trip == null) {
//			response.put("errorMsg", "해당 여행 일정을 찾을 수 없습니다.");
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//		}
//		
//		if(!trip.getUserId().equals(userInfo.getId())) {
//			response.put("errorMsg", "작성자만 접근 가능합니다.");
//			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
//		}

		tripService.modifyTrip(request);
		response.put("updated", request);
		return ResponseEntity.ok(response);
	}
	
	@Transactional
	@DeleteMapping("/{no}")
	public ResponseEntity<Map<String, Object>> removeTrip(@PathVariable("no") int tripNo, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		
//		UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
//		if(userInfo == null) {
//			response.put("errorMsg", "로그인이 필요한 서비스 입니다.");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
		
		TripDTO trip = tripService.selectTrip(tripNo);
//		if(trip == null) {
//			response.put("errorMsg", "해당 여행 일정을 찾을 수 없습니다.");
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//		}
//		
//		if(!trip.getUserId().equals(userInfo.getId())) {
//			response.put("errorMsg", "작성자만 접근 가능합니다.");
//			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
//		}
		
		tripService.removeTrip(tripNo);
		
		response.put("no", tripNo);
		return ResponseEntity.ok(response);
	}
}
