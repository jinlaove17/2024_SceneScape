package com.ssafy.enjoytrip.controller;

import java.util.List;

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

import com.ssafy.enjoytrip.model.dto.ApiResponse;
import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/userRest")
public class UserRestController {
	private UserService userService;

	@Autowired
	public UserRestController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/")
	private ResponseEntity<ApiResponse<List<UserDTO>>> getUsers() {
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<List<UserDTO>>(HttpStatus.OK, userService.getUsers()));
	}
	
	@PostMapping("/join.do")
	private ResponseEntity<ApiResponse<String>> join(@RequestBody UserDTO user) {
		boolean isSuccess = userService.join(user.getId(), user.getPwd(), user.getNickname(), user.getEmail());
		
		if (isSuccess)
		{
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<String>(HttpStatus.OK, "회원가입 성공"));
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, "회원가입 실패"));
	}

	@PostMapping("/login.do")
	private ResponseEntity<ApiResponse<UserDTO>> login(@RequestBody UserDTO user, HttpSession session) {
		UserDTO userDto = userService.login(user.getId(), user.getPwd());

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);
			
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<UserDTO>(HttpStatus.OK, userDto));
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<UserDTO>(HttpStatus.NOT_FOUND, userDto));
	}

	@PostMapping("/logout.do")
	private ResponseEntity<ApiResponse<String>> logout(HttpSession session, Model model) {
		// 회원탈퇴 후 로그아웃으로 redirect 하는 경우가 있으므로, 유저가 존재할 때만 로그아웃 알림창을 띄운다.
		UserDTO user = (UserDTO) session.getAttribute("userInfo");
		
		if (user != null) {
			if (userService.isExist(user.getId())) {
				// 세션에서 모든 속성 삭제 후 비우기
				session.invalidate();
				
				return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<String>(HttpStatus.OK, "로그아웃 성공"));
			}
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, "로그아웃 실패"));
	}

	@PutMapping("/modify.do")
	private ResponseEntity<ApiResponse<UserDTO>> modify(@RequestBody UserDTO user, HttpSession session) {
		UserDTO userDto = userService.updateAccount(user.getId(), user.getPwd(), user.getNickname(), user.getEmail());

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);

			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<UserDTO>(HttpStatus.OK, userDto));
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<UserDTO>(HttpStatus.NOT_FOUND, userDto));
	}

	@DeleteMapping("/delete.do/{id}")
	private ResponseEntity<ApiResponse<String>>  delete(@PathVariable("id") String userId) {
		if (userService.cancelAccount(userId)) {
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<String>(HttpStatus.OK, "회원삭제 성공"));
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<String>(HttpStatus.NOT_FOUND, "회원삭제 실패"));
	}

	@PostMapping("/find.do")
	private ResponseEntity<ApiResponse<UserDTO>> find(@RequestBody UserDTO user) {
		UserDTO userDto = userService.findPassword(user.getId(), user.getEmail());

		if (userDto != null) {
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<UserDTO>(HttpStatus.OK, userDto));
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<UserDTO>(HttpStatus.NOT_FOUND, userDto));
	}
}
