package com.ssafy.enjoytrip.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.AttractionLikeDAO;
import com.ssafy.enjoytrip.model.dao.PostLikeDAO;
import com.ssafy.enjoytrip.model.dto.AttractionLikeDTO;
import com.ssafy.enjoytrip.model.dto.PostLikeDTO;

@Service
public class AttractionLikeService {
	private final AttractionLikeDAO attractionLikeDAO;
	
	@Autowired
	public AttractionLikeService(AttractionLikeDAO attractionLikeDAO) {
		this.attractionLikeDAO = attractionLikeDAO;
	}
	
	public int updateLikeCount(AttractionLikeDTO attractionLikeDTO) {
		int isFound = attractionLikeDAO.select(attractionLikeDTO);
		
		// 해당 유저의 관계 테이블이 없다면 새롭게 생성한다.
		if (isFound == 0) {
			return attractionLikeDAO.insert(attractionLikeDTO);
		}
		
		// 이미 있다면, 좋아요를 취소한 것이므로 삭제한다.
		return -attractionLikeDAO.delete(attractionLikeDTO);
	}
}
