package com.ssafy.enjoytrip.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.UserDTO;

@Mapper
public interface UserDAO {
	int insert(UserDTO user);

	int update(UserDTO user);

	int logicalDelete(String userId);

	int countById(String userId);
	
	int countByNickname(String userNickname);
	
	UserDTO select(Map<String, Object> params);

	List<UserDTO> selectAll();
}
