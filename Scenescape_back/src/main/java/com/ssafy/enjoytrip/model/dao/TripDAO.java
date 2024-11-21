package com.ssafy.enjoytrip.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.TripDTO;

@Mapper
public interface TripDAO {
	List<TripDTO> selectAll(String userId);
	TripDTO select(int no);
	int insert(TripDTO trip);
	int delete(int no);
	int update(TripDTO trip);
}
