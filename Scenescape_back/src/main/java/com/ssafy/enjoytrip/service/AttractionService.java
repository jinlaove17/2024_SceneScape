package com.ssafy.enjoytrip.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.AttractionDAO;
import com.ssafy.enjoytrip.model.dto.AttractionDTO;

@Service
public class AttractionService {
	private AttractionDAO attractionDao;

	@Autowired
	private AttractionService(AttractionDAO attractionDao) {
		this.attractionDao = attractionDao;
	}

	public boolean register(AttractionDTO data) {
		if (attractionDao.insert(data) == 1) {
			return true;
		}

		return false;
	}

	public boolean modify(AttractionDTO data) {
		if (attractionDao.update(data) > 0) {
			return true;
		}
		return false;
	}

	public boolean remove(Integer no) {
		if (attractionDao.delete(no) > 0) {
			return true;
		}
		return false;
	}

	public AttractionDTO searchByNo(Integer no) {
		if (no == null) {
			return null;
		}

		AttractionDTO attraction = attractionDao.select(no);
		return attraction;
	}

	public int countAll(Map<String, Object> filter) {
		return attractionDao.countAll(filter);
	}

	public List<AttractionDTO> searchAll(Map<String, Object> filter) {
		List<AttractionDTO> attractions = attractionDao.selectAll(filter);
		return attractions;
	}

	public List<String> getSceneTitles() {
		return attractionDao.selectSceneTitles();
	}

	public List<AttractionDTO> searchBySceneTitle(String title) {
		return attractionDao.selectBySceneTitle(title);
	}

	public int updateLikeCount(Map<String, Object> filter) {
		return attractionDao.updateLikeCount(filter);
	}
}
