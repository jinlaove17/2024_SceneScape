package com.ssafy.enjoytrip.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.PostDTO;

@Mapper
public interface BoardDAO {
	int insert(PostDTO post);
	int update(PostDTO post);
	int delete(long no);
	PostDTO select(long no);
	List<PostDTO> selectAll(Map<String, Object> filter);
	int countAll(Map<String, Object> filter);
	int setThumbnail(Map<String, Object> params);
	List<String> getSceneTitles();
}
