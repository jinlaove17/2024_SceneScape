package com.ssafy.enjoytrip.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.TripAttractionDTO;
import com.ssafy.enjoytrip.model.dto.TripDTO;

@Mapper
public interface TripDAO {
	List<TripDTO> selectTrips(String userId);
	TripDTO selectTrip(int no);
	int insertTrip(TripDTO trip);
	int updateTrip(TripDTO trip);
	int deleteTrip(int no);
	int insertTripAttraction(TripAttractionDTO tripAttraction);
    int deleteTripAttraction(TripAttractionDTO tripAttraction);
    List<Integer> selectTripAttractions(int tripNo);
	int updateTripAttractionSequence(TripAttractionDTO tripAttraction);
}
