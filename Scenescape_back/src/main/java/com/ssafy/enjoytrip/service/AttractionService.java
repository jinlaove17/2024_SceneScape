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
		if(attractionDao.insert(data) == 1) {
			return true;
		}
		
		return false;
	}

	public boolean modify(AttractionDTO data) {
		if(attractionDao.update(data) > 0) {
			return true;
		}
		
		return false;
	}

	public boolean remove(Integer no) {
		if(attractionDao.delete(no) > 0) {
			return true;
		}
		return false;
	}

	public AttractionDTO searchByNo(Integer no) {
		if (no == null) {
			return null;
		}

		// 조회수 증가
		AttractionDTO attraction = attractionDao.select(no);
		attraction.increaseViewCount();

		return attraction;
	}
	
	public int countAll(Map<String, Object> filter) {
		return attractionDao.countAll(filter);
	}

	public List<AttractionDTO> searchAll(Map<String, Object> filter, String sortOrder, int pageNum) {
		// 조건 없이 전체 데이터를 가져옴 (페이지네이션 적용 X)
		List<AttractionDTO> attractions = attractionDao.selectAll(filter);
		
		return attractions;
	}
	
	public List<String> getSceneTitles() {
		return attractionDao.selectSceneTitles();
	}
	
	public List<AttractionDTO> searchBySceneTitle(String title) {
		return attractionDao.selectBySceneTitle(title);
	}
}
