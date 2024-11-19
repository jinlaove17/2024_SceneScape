package com.ssafy.enjoytrip.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.PostLikeDAO;
import com.ssafy.enjoytrip.model.dto.PostLikeDTO;

@Service
public class PostLikeService {
	private PostLikeDAO postLikeDao;
	
	@Autowired
	public PostLikeService(PostLikeDAO postLikeDao) {
		this.postLikeDao = postLikeDao;
	}
	
	public int like(PostLikeDTO postLike) {
		postLikeDao.insert(postLike);
		return postLike.isLike()?1:-1;
	}
	
	public Integer getLikeStatus(PostLikeDTO postLike) {
		return postLikeDao.select(postLike);
	}
}
