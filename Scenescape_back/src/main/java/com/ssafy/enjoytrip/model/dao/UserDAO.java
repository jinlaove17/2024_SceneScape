package com.ssafy.enjoytrip.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.dto.UserDTO;

@Mapper
public interface UserDAO {
	// insert into user(id, pwd, nickname, email) values(?, ?, ?, ?)
	int insert(UserDTO user); 

	// update user set id=?, pwd = ?, nickname = ?, email = ? where no = ?
	int update(UserDTO user);
	
	// delete from user where no = ?
	int delete(String userId); 

	// select * from user where id = " + "\"" + id + "\"
	// select * from user where nickname = " + "\"" + nickname + "\"
	UserDTO select(Map<String, Object> params);
	
	List<UserDTO> selectAll();
}
