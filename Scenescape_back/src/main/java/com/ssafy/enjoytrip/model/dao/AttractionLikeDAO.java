package com.ssafy.enjoytrip.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.AttractionLikeDTO;

@Mapper
public interface AttractionLikeDAO {
	int insert(AttractionLikeDTO attractionLikeDTO);

	int delete(AttractionLikeDTO attractionLikeDTO);
	
	int select(AttractionLikeDTO attractionLikeDTO);
	
	List<Integer> getLikeAttractionNoList(Map<String, Object> filter);
}