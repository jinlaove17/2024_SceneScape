package com.ssafy.enjoytrip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.CommentDAO;
import com.ssafy.enjoytrip.model.dto.CommentDTO;

@Service
public class CommentService {
	CommentDAO commentDao;
	
	@Autowired
	public CommentService(CommentDAO commentDao) {
		this.commentDao = commentDao;
	}

	public int create(CommentDTO comment) {
		commentDao.insert(comment);
		return comment.getNo();
	}
	
	public int modify(CommentDTO comment) {
		commentDao.update(comment);
		return comment.getNo();
	}
	
	public int remove(int no) {
		commentDao.delete(no);
		return no;
	}
	
	public List<CommentDTO> searchAll(int postNo) {
		List<CommentDTO> comments = commentDao.selectAll(postNo);
		return comments;
	}
}
