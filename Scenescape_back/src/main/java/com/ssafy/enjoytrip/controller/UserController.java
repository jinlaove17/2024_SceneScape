package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/users")
public class UserController {
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/")
	private ResponseEntity<Map<String, Object>> getUsers() {
		Map<String, Object> response = new HashMap<>();
		response.put("users", userService.getUsers());
		return ResponseEntity.ok(response);
	}

	@PostMapping("/join")
	private ResponseEntity<Map<String, Object>> join(@RequestBody UserDTO user) {
		Map<String, Object> response = new HashMap<>();
		boolean isSuccess = userService.join(user.getId(), user.getPwd(), user.getNickname(), user.getEmail());

		if (isSuccess) {
			return ResponseEntity.ok(null);
		}

		response.put("errorMsg", "회원가입 실패");
		return ResponseEntity.badRequest().body(response);
	}

	@PostMapping("/login")
	private ResponseEntity<Map<String, Object>> login(@RequestBody UserDTO user, HttpSession session) {
		UserDTO userDto = userService.login(user.getId(), user.getPwd());

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/logout")
	private ResponseEntity<Map<String, Object>> logout(HttpSession session, Model model) {
		// 회원탈퇴 후 로그아웃으로 redirect 하는 경우가 있으므로, 유저가 존재할 때만 로그아웃 알림창을 띄운다.
		UserDTO user = (UserDTO) session.getAttribute("userInfo");

		if (user != null) {
			if (userService.isExist(user.getId())) {
				// 세션에서 모든 속성 삭제 후 비우기
				session.invalidate();
				return ResponseEntity.ok(null);
			}
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/modify")
	private ResponseEntity<Map<String, Object>> modify(@RequestBody UserDTO user, HttpSession session) {
		UserDTO userDto = userService.updateAccount(user.getId(), user.getPwd(), user.getNickname(), user.getEmail());

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/delete/{id}")
	private ResponseEntity<Map<String, Object>> delete(@PathVariable("id") String userId) {
		if (userService.cancelAccount(userId)) {
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/find-pwd")
	private ResponseEntity<Map<String, Object>> find(@RequestBody UserDTO user) {
		Map<String, Object> response = new HashMap<>();
		UserDTO userDto = userService.findPassword(user.getId(), user.getEmail());

		if (userDto != null) {
			response.put("tempPwd", userDto.getPwd());
			return ResponseEntity.ok(response);
		}

		return ResponseEntity.notFound().build();
	}
}
