package com.ssafy.enjoytrip.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

	public List<AreaDTO> selectAll() {
		List<Map<String, Object>> list = areaDao.selectAll();
		List<AreaDTO> areas = new ArrayList<>();
		int size = list.size();
		
		for (int i = 0; i < size; ++i) {
			Map<String, Object> firstItem = list.get(i);
			
			AreaDTO areaDTO = new AreaDTO();
			areaDTO.setAreaCode((int) firstItem.get("areaCode"));
			areaDTO.setAreaName((String) firstItem.get("areaName"));
			
			List<SubAreaDTO> subAreas = new ArrayList<>();
			subAreas.add(new SubAreaDTO((int) firstItem.get("subAreaCode"), (String) firstItem.get("subAreaName")));
			
			int j = 0;
			
			for (j = i + 1; j < size; ++j) {
				Map<String, Object> item = list.get(j);
				int areaCode = (int) item.get("areaCode");
							
				if (areaCode != areaDTO.getAreaCode()) {
					break;
				}
				
				subAreas.add(new SubAreaDTO((int) item.get("subAreaCode"), (String) item.get("subAreaName")));
			}
			
			areaDTO.setSubAreas(subAreas);
			areas.add(areaDTO);
			i = j - 1;
		}
		
//		for (int i = 0; i < areas.size(); ++i) {
//			System.out.println(areas.get(i).getAreaName() + ": ");
//			
//			for (int j = 0; j < areas.get(i).getSubAreas().size(); ++j) {
//				System.out.print(areas.get(i).getSubAreas().get(j).getSubAreaName() + " "); 
//			}
//			
//			System.out.println();
//		}
		
		return areas;
	}
}
