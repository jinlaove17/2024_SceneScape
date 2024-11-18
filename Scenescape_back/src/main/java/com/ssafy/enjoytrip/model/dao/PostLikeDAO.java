package com.ssafy.enjoytrip.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.PostLikeDTO;

@Mapper
public interface PostLikeDAO {
	int insert(PostLikeDTO postLike);
	int select(PostLikeDTO postLike); 
}
