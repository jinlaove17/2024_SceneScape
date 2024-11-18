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

	public boolean isExist(String userId) {
		Map<String, Object> params = new HashMap<>();

		params.put("id", userId);

		return userDao.select(params) != null;
	}

	public List<UserDTO> getUsers() {
		return userDao.selectAll();
	}
	
	public boolean join(String userId, String userPwd, String nickname, String email) {
		Map<String, Object> params = new HashMap<>();

		params.put("id", userId);

		// 가입된 유저가 없으면 userService에서 register 수행
		UserDTO user = userDao.select(params);

		if (user == null) {
			// 비밀번호 암호화
			String encryptPwd = encryptPassword(userPwd);

			if (userDao.insert(new UserDTO(userId, encryptPwd, nickname, email)) != 0) {
				return true;
			}
		}

		return false;
	}

	public UserDTO login(String userId, String userPwd) {
		Map<String, Object> params = new HashMap<>();

		params.put("id", userId);
		params.put("pwd", userPwd);

		// userService에서 유저 정보 찾아와서 password 비교
		UserDTO userDto = userDao.select(params);

		if (userDto != null) {
			if (isMatch(userPwd, userDto.getPwd())) {
				return userDto;
			}
		}

		return null;
	}

	public UserDTO updateAccount(String userId, String newPwd, String newNickName, String newEmail) {
		// 비밀번호 암호화
		UserDTO userDto = new UserDTO(userId, encryptPassword(newPwd), newNickName, newEmail);
		
		if (userDao.update(userDto) != 0) {
			return userDto;
		}

		return null;
	}

	public boolean cancelAccount(String userId) {
		return userDao.delete(userId) != 0;
	}

	public UserDTO findPassword(String userId, String email) {
		Map<String, Object> params = new HashMap<>();

		params.put("id", userId);
		
		UserDTO userDto = userDao.select(params);

		if ((userDto != null) && (email.equals(userDto.getEmail()))) {
			// 8자리 난수 임시 비밀번호 생성
			StringBuilder tmpPwd = new StringBuilder();
			Random random = new Random();

			for (int len = 0; len < 8; ++len) {
				int rnd = random.nextInt(26); // 0 ~ 25 사이의 난수 생성
				int type = random.nextInt(3); // 0 ~ 2 사이의 난수 발생

				switch (type) {
				case 0:
					tmpPwd.append((char) ('A' + rnd));
					break;
				case 1:
					tmpPwd.append((char) ('a' + rnd));
					break;
				case 2:
					tmpPwd.append(rnd % 10);
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

	private String encryptPassword(String userPwd) {
		return BCrypt.hashpw(userPwd, BCrypt.gensalt());
	}

	private boolean isMatch(String userPwd, String encryptedPassword) {
		return BCrypt.checkpw(userPwd, encryptedPassword);
	}
}
