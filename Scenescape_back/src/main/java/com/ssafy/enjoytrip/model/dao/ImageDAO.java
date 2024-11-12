package com.ssafy.enjoytrip.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.ImageDTO;

@Mapper
public interface ImageDAO {
	int insert(ImageDTO image);
}
