package com.ssafy.enjoytrip.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.enjoytrip.model.dao.TripDAO;
import com.ssafy.enjoytrip.model.dto.TripAttractionDTO;
import com.ssafy.enjoytrip.model.dto.TripDTO;

@Service
public class TripService {
	private TripDAO tripDao;
	
	@Autowired
	public TripService(TripDAO tripDao) {
		this.tripDao = tripDao;
	}
	
	public List<TripDTO> selectTrips(String userId) {
		return tripDao.selectTrips(userId);
	}
	
	public TripDTO selectTrip(int tripNo) {
		return tripDao.selectTrip(tripNo);
	}
	
	@Transactional
    public int createTrip(TripDTO trip) {
        // 1. trips 테이블에 데이터 삽입
        int tripNo = tripDao.insertTrip(trip);

        // 2. trip_attractions 테이블에 데이터 삽입
        List<Object> attractions = trip.getAttractions();
        if (attractions != null && !attractions.isEmpty()) {
            for (int i = 0; i < attractions.size(); i++) {
                tripDao.insertTripAttraction(new TripAttractionDTO(trip.getNo(), (int)attractions.get(i), i+1));
            }
        }

        return tripNo;
    }
	
	@Transactional
	public int modifyTrip(TripDTO trip) {
	    // 1. trips 테이블 업데이트
		System.out.println(trip.getTitle());
		System.out.println("고쳐주세요");
		System.out.println(trip.getNo());
	    int result = tripDao.updateTrip(trip);
	    System.out.println("null");
	    System.out.println(trip.getNo());

	    // 2. 기존 trip_attractions 데이터 조회
	    List<Integer> existingAttractions = tripDao.selectTripAttractions(trip.getNo());

	    // 3. 새로 전달된 데이터와 비교
	    // TripDTO의 attractions는 List<Object>라서 요소를 순회하면서 Integer로 형변환 후 newAttractions에 담아줌
	    List<Integer> newAttractions = trip.getAttractions().stream()
	            .map(obj -> (Integer) obj) // 각 요소를 Integer로 변환
	            .collect(Collectors.toList());

	    // 3.1 삭제할 데이터
	    Set<Integer> attractionsToDelete = new HashSet<>(existingAttractions);
	    attractionsToDelete.removeAll(newAttractions);

	    // 3.2 추가할 데이터
	    Set<Integer> attractionsToAdd = new HashSet<>(newAttractions);
	    attractionsToAdd.removeAll(existingAttractions);

	    // 4. 데이터 변경 처리
	    // 4.1 삭제 처리
	    if (!attractionsToDelete.isEmpty()) {
	        for (Integer attractionId : attractionsToDelete) {
	            tripDao.deleteTripAttraction(new TripAttractionDTO(trip.getNo(), attractionId));
	        }
	    }

	    // 4.2 추가 처리
	    if (!attractionsToAdd.isEmpty()) {
	        for (int i = 0; i < newAttractions.size(); i++) {
	            int attractionNo = (int) newAttractions.get(i);
	            if (attractionsToAdd.contains(attractionNo)) {
	                tripDao.insertTripAttraction(new TripAttractionDTO(trip.getNo(), attractionNo, i + 1));
	            }
	        }
	    }

	    // 4.3 수정 처리 (sequence 변경)
	    for (int i = 0; i < newAttractions.size(); i++) {
	        int attractionNo = (int) newAttractions.get(i);
	        if (existingAttractions.contains(attractionNo)) {
	            tripDao.updateTripAttractionSequence(new TripAttractionDTO(trip.getNo(), attractionNo, i + 1));
	        }
	    }

	    return result;
	}
	
	public int removeTrip(int tripNo) {
		return tripDao.logicalDeleteTrip(tripNo);
	}
}
