package com.ssafy.enjoytrip.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.SubAreaDTO;

@Mapper
public interface AreaDAO {
	List<SubAreaDTO> select(int areaCode);
}
