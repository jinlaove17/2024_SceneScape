package com.ssafy.enjoytrip.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.dao.UserDAO;
import com.ssafy.enjoytrip.model.dto.UserDTO;

@Service
public class UserService {
	private UserDAO userDao;

	@Autowired
	private UserService(UserDAO userDao) {
		this.userDao = userDao;
	}

	public List<UserDTO> getUsers() {
		return userDao.selectAll();
	}

	public String registerUser(String id, String pwd, String nickname, String email) {
		// 아이디 중복 검사
		if (userDao.countById(id) != 0) {
			return "이미 존재하는 아이디입니다.";
		}

		// 닉네임 중복 검사
		if (userDao.countByNickname(nickname) != 0) {
			return "이미 존재하는 닉네임입니다.";
		}

		// 비밀번호 암호화
		String encryptedPwd = encryptPassword(pwd);
		UserDTO userDto = new UserDTO(id, encryptedPwd, nickname, email);

		if (userDao.insert(userDto) != 0) {
			return "";
		}

		return "회원가입에 실패했습니다.";
	}

	public UserDTO loginUser(String id, String pwd) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);

		UserDTO userDto = userDao.select(params);
		if (userDto != null) {
			if (isMatch(pwd, userDto.getPwd())) {
				return userDto;
			}
		}

		return null;
	}

	public UserDTO updateUser(String id, String pwd, String nickname, String email) {
		UserDTO userDto = new UserDTO(id, encryptPassword(pwd), nickname, email);
		if (userDao.update(userDto) != 0) {
			return userDto;
		}

		return null;
	}

	public boolean deleteUser(String id) {
		return userDao.logicallyDelete(id) != 0;
	}

	public UserDTO findPassword(String id, String email) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		params.put("email", email);

		UserDTO userDto = userDao.select(params);

		if (userDto != null) {
			// 8자리 난수 임시 비밀번호 생성
			StringBuilder tmpPwd = new StringBuilder();
			Random random = new Random();

			for (int len = 0; len < 8; ++len) {
				int type = random.nextInt(3); // 0 ~ 2 사이의 난수 발생
				int rand = random.nextInt(26); // 0 ~ 25 사이의 난수 생성
				
				switch (type) {
				case 0:
					tmpPwd.append((char) ('A' + rand));
					break;
				case 1:
					tmpPwd.append((char) ('a' + rand));
					break;
				case 2:
					tmpPwd.append(rand % 10);
					break;
				}
			}

			userDto.setPwd(encryptPassword(tmpPwd.toString()));

			if (userDao.update(userDto) != 0) {
				// 화면 출력은 암호화되지 않은 비밀번호로 해야한다.
				userDto.setPwd(tmpPwd.toString());
				return userDto;
			}
		}

		return null;
	}

	private String encryptPassword(String pwd) {
		return BCrypt.hashpw(pwd, BCrypt.gensalt());
	}

	private boolean isMatch(String pwd, String encryptedPwd) {
		return BCrypt.checkpw(pwd, encryptedPwd);
	}
}
