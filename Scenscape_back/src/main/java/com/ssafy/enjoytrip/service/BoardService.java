package com.ssafy.enjoytrip.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.BoardDAO;
import com.ssafy.enjoytrip.model.dto.PostDTO;

@Service
public class BoardService {
	BoardDAO boardDao;
	
	@Autowired
	public BoardService (BoardDAO boardDao) {
		this.boardDao = boardDao;
	}
	
	public PostDTO getPost(int postNo) {
		PostDTO post = boardDao.select(postNo);
		
		return post;
	}
	
	public List<PostDTO> getPostsByFilter(Map<String, Object> filter) {
		List<PostDTO> posts = boardDao.selectAll(filter);
		
		return posts;
	}
	
	public long createPost(PostDTO post) {
		boardDao.insert(post);
		return post.getNo();
	}
	
	public int deletePost(int postNo) {
		return boardDao.delete(postNo);
	}
	
	public int updatePost(PostDTO post) {
		return boardDao.update(post);
	}
	
	public int countByFilter(Map<String, Object> filter) {
		return boardDao.countAll(filter);
	}
	
	public int setPostThumbnail(int postNo, String fileName) {
		Map<String, Object> params = new HashMap<>();
		params.put("no", postNo);
		params.put("fileName", fileName);
		return boardDao.setThumbnail(params);
	}
}