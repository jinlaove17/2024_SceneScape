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
@RequestMapping("/user")
public class UserController {
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	private ResponseEntity<Map<String, Object>> getUsers() {
		Map<String, Object> response = new HashMap<>();
		response.put("users", userService.getUsers());
		return ResponseEntity.ok(response);
	}

	@PostMapping
	private ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserDTO user) {
		String resultMsg = userService.registerUser(user.getId(), user.getPwd(), user.getNickname(), user.getEmail());

		if (resultMsg.equals("")) {
			return ResponseEntity.ok(null);
		}

		Map<String, Object> response = new HashMap<>();
		response.put("errorMsg", resultMsg);
		return ResponseEntity.badRequest().body(response);
	}

	@PostMapping("/login")
	private ResponseEntity<Map<String, Object>> loginUser(@RequestBody UserDTO user, HttpSession session) {
		UserDTO userDto = userService.loginUser(user.getId(), user.getPwd());

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);
			
			Map<String, Object> response = new HashMap<>();
			response.put("userInfo", userDto);
			return ResponseEntity.ok(response);
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/logout")
	private ResponseEntity<Map<String, Object>> logoutUser(HttpSession session, Model model) {
		UserDTO user = (UserDTO) session.getAttribute("userInfo");

		if (user != null) {
			session.invalidate();
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping
	private ResponseEntity<Map<String, Object>> updateUser(@RequestBody UserDTO user, HttpSession session) {
		UserDTO userDto = userService.updateUser(user.getId(), user.getPwd(), user.getNickname(), user.getEmail());

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	private ResponseEntity<Map<String, Object>> deleteUser(@PathVariable("id") String id) {
		if (userService.deleteUser(id)) {
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/find-password")
	private ResponseEntity<Map<String, Object>> findPassword(@RequestBody UserDTO user) {
		UserDTO userDto = userService.findPassword(user.getId(), user.getEmail());

		if (userDto != null) {
			Map<String, Object> response = new HashMap<>();
			response.put("tmpPwd", userDto.getPwd());
			return ResponseEntity.ok(response);
		}

		return ResponseEntity.notFound().build();
	}
}
