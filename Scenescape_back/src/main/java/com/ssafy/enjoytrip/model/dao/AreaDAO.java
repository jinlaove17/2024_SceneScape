package com.ssafy.enjoytrip.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AreaDAO {
	List<Map<String, Object>> selectAll();
}
