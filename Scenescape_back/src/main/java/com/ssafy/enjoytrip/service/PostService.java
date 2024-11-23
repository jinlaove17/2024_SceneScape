package com.ssafy.enjoytrip.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.PostDAO;
import com.ssafy.enjoytrip.model.dto.PostDTO;

@Service
public class PostService {
	PostDAO postDao;
	
	@Autowired
	public PostService (PostDAO postDao) {
		this.postDao = postDao;
	}
	
	public PostDTO getPost(long postNo) {
		PostDTO post = postDao.select(postNo);
		
		return post;
	}
	
	public List<PostDTO> getPostsByFilter(Map<String, Object> filter) {
		List<PostDTO> posts = postDao.selectAll(filter);

		return posts;
	}
	
	public int createPost(PostDTO post) {
		postDao.insert(post);
		return post.getNo();
	}
	
	public long deletePost(long postNo) {
		return postDao.logicalDelete(postNo);
	}
	
	public long updatePost(PostDTO post) {
		return postDao.update(post);
	}
	
	public int countByFilter(Map<String, Object> filter) {
		return postDao.countAll(filter);
	}
	
	public int setPostThumbnail(long postNo, String fileName) {
		Map<String, Object> params = new HashMap<>();
		params.put("no", postNo);
		params.put("fileName", fileName);
		return postDao.setThumbnail(params);
	}
	
	public int updateViewCount(long postNo) {
		return postDao.updateViewCount(postNo);
	}
	
	public int updateLikeCount(long postNo, int likeStatus) {
		return postDao.updateLikeCount(postNo, (likeStatus == 1));
	}
}
