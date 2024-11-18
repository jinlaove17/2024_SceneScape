package com.ssafy.enjoytrip.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.CommentDTO;

@Mapper
public interface CommentDAO {
	int insert(CommentDTO comment);
	int update(CommentDTO comment);
	int delete(int no);
	List<CommentDTO> selectAll(int postNo);
}
