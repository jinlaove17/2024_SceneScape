package com.ssafy.enjoytrip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.TripDAO;
import com.ssafy.enjoytrip.model.dto.TripDTO;

@Service
public class TripService {
	private TripDAO tripDao;
	
	@Autowired
	public TripService(TripDAO tripDao) {
		this.tripDao = tripDao;
	}
	
	public List<TripDTO> selectTrips(String userId) {
		return tripDao.selectAll(userId);
	}
	
}
