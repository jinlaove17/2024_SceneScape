package com.ssafy.enjoytrip.controller;

import java.util.List;

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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/trips")
@Tag(name = "Trip API", description = "사용사의 여행 일정과 관련된 API")
public class TripController {

    private final TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    @Operation(summary = "사용자의 여행 일정 목록 조회", description = "로그인한 사용자의 모든 여행 일정을 조회합니다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "조회 성공"),
        @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자")
    })
    public ResponseEntity<List<TripDTO>> getTrips(HttpSession session) {
        UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<TripDTO> trips = tripService.selectTrips(userInfo.getId());
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{no}")
    @Operation(summary = "특정 여행 일정 조회", description = "특정 여행 일정을 조회합니다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "조회 성공"),
        @ApiResponse(responseCode = "404", description = "일정을 찾을 수 없음")
    })
    public ResponseEntity<TripDTO> getTrip(@PathVariable("no") int tripNo, HttpSession session) {
        UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TripDTO trip = tripService.selectTrip(tripNo);
        if (trip == null || !trip.getUserId().equals(userInfo.getId())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(trip);
    }

    @Transactional
    @PostMapping
    @Operation(summary = "새로운 여행 일정 생성", description = "새로운 여행 일정을 생성합니다.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "생성 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    public ResponseEntity<TripDTO> createTrip(@RequestBody TripDTO request, HttpSession session) {
        UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        request.setUserId(userInfo.getId());
        int no = tripService.createTrip(request);
        request.setNo(no);
        return ResponseEntity.status(HttpStatus.CREATED).body(request);
    }

    @Transactional
    @PutMapping("/{no}")
    @Operation(summary = "여행 일정 수정", description = "특정 여행 일정을 수정합니다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "수정 성공"),
        @ApiResponse(responseCode = "404", description = "일정을 찾을 수 없음")
    })
    public ResponseEntity<TripDTO> modifyTrip(@PathVariable("no") int tripNo, @RequestBody TripDTO request, HttpSession session) {
        UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TripDTO trip = tripService.selectTrip(tripNo);
        if (trip == null || !trip.getUserId().equals(userInfo.getId())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        tripService.modifyTrip(request);
        return ResponseEntity.ok(request);
    }

    @Transactional
    @DeleteMapping("/{no}")
    @Operation(summary = "여행 일정 삭제", description = "특정 여행 일정을 삭제합니다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "삭제 성공"),
        @ApiResponse(responseCode = "404", description = "일정을 찾을 수 없음")
    })
    public ResponseEntity<Void> removeTrip(@PathVariable("no") int tripNo, HttpSession session) {
        UserDTO userInfo = (UserDTO) session.getAttribute("userInfo");
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TripDTO trip = tripService.selectTrip(tripNo);
        if (trip == null || !trip.getUserId().equals(userInfo.getId())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        tripService.removeTrip(tripNo);
        return ResponseEntity.ok().build();
    }
}