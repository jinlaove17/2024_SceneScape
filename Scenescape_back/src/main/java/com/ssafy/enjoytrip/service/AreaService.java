package com.ssafy.enjoytrip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.AreaDAO;
import com.ssafy.enjoytrip.model.dto.AreaDTO;
import com.ssafy.enjoytrip.model.dto.SubAreaDTO;

@Service
public class AreaService {
	private AreaDAO areaDao;
	
	@Autowired
	private AreaService(AreaDAO areaDao) {
		this.areaDao = areaDao;
	}
	
	public AreaDTO select(int areaCode) {
		List<SubAreaDTO> list = areaDao.select(areaCode);
		AreaDTO areaDto = new AreaDTO();
		
		if(list.size() != 0) {
			areaDto.setAreaCode(areaCode);
			areaDto.setAreaName(list.get(0).getAreaName());
			areaDto.setSubAreas(list);
			
			return areaDto;
		}
		
		return null;
	}
}
