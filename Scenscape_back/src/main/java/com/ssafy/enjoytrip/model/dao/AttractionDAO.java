package com.ssafy.enjoytrip.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import com.ssafy.enjoytrip.model.dto.AttractionDTO;

@Mapper
public interface AttractionDAO {
	int insert(AttractionDTO attraction);
	int update(AttractionDTO attraction);
	int delete(int no);
	AttractionDTO select(int no);
	int countAll(Map<String, Object> filter);
	List<AttractionDTO> selectAll(Map<String, Object> filter);
}