package com.ssafy.enjoytrip.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.AttractionLikeDAO;
import com.ssafy.enjoytrip.model.dao.PostLikeDAO;
import com.ssafy.enjoytrip.model.dto.AttractionLikeDTO;
import com.ssafy.enjoytrip.model.dto.PostLikeDTO;

@Service
public class AttractionLikeService {
	private final AttractionLikeDAO attactionLikeDAO;
	
	@Autowired
	public AttractionLikeService(AttractionLikeDAO attractionLikeDAO) {
		this.attactionLikeDAO = attractionLikeDAO;
	}
	
	public int likeAttraction(AttractionLikeDTO attractionLikeDTO) {
		return attactionLikeDAO.insert(attractionLikeDTO);
	}
	
	public boolean getLikeStatus(AttractionLikeDTO attractionLikeDTO) {
		return attactionLikeDAO.select(attractionLikeDTO);
	}
}
