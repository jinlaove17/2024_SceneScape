package com.ssafy.enjoytrip.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

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
import com.ssafy.enjoytrip.service.EmailService;
import com.ssafy.enjoytrip.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
@Tag(name = "User API", description = "사용자 관리와 관련된 API")
public class UserController {
	private final UserService userService;
	private final EmailService emailService;

	@Autowired
	public UserController(UserService userService, EmailService emailService) {
		this.userService = userService;
		this.emailService = emailService;
	}

	@GetMapping
	@Operation(
		summary = "사용자 목록 조회",
		description = "모든 사용자 정보를 조회합니다."
	)
	private ResponseEntity<Map<String, Object>> getUsers() {
		Map<String, Object> response = new HashMap<>();
		response.put("users", userService.getUsers());
		return ResponseEntity.ok(response);
	}

	@PostMapping
	@Operation(
		summary = "사용자 등록",
		description = "새로운 사용자를 등록합니다."
	)
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "사용자 등록 성공"),
		@ApiResponse(responseCode = "400", description = "잘못된 요청 데이터")
	})
	private ResponseEntity<Map<String, Object>> registerUser(
		@Parameter(description = "등록할 사용자 정보", required = true)
		@RequestBody(required = true) UserDTO user
	) {
		String resultMsg = userService.registerUser(user.getId(), user.getPwd(), user.getEmail());
		if (resultMsg.equals("")) {
			return ResponseEntity.ok(null);
		}

		Map<String, Object> response = new HashMap<>();
		response.put("errorMsg", resultMsg);
		return ResponseEntity.badRequest().body(response);
	}

	@PostMapping("/login")
	@Operation(
		summary = "사용자 로그인",
		description = "사용자 ID와 비밀번호를 통해 로그인을 수행합니다."
	)
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "로그인 성공"),
		@ApiResponse(responseCode = "404", description = "사용자 정보를 찾을 수 없음")
	})
	private ResponseEntity<Map<String, Object>> loginUser(
		@Parameter(description = "로그인 정보 (ID와 비밀번호)", required = true)
		@RequestBody UserDTO user,
		@Parameter(description = "HTTP 세션 정보", required = false)
		HttpSession session
	) {
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
	@Operation(
		summary = "사용자 로그아웃",
		description = "현재 사용자 세션을 종료합니다."
	)
	private ResponseEntity<Map<String, Object>> logoutUser(
		@Parameter(description = "HTTP 세션 정보", required = true) HttpSession session,
		@Parameter(description = "Spring Model 객체", required = false) Model model
	) {
		UserDTO user = (UserDTO) session.getAttribute("userInfo");
		if (user != null) {
			session.invalidate();
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping
	@Operation(
		summary = "사용자 정보 수정",
		description = "사용자의 정보를 수정합니다."
	)
	private ResponseEntity<Map<String, Object>> updateUser(
		@Parameter(description = "수정할 사용자 정보", required = true)
		@RequestBody UserDTO user,
		@Parameter(description = "HTTP 세션 정보", required = true)
		HttpSession session
	) {
		UserDTO userDto = userService.updateUser(user);
		if (userDto != null) {
			session.setAttribute("userInfo", userDto);
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	@Operation(
		summary = "사용자 삭제",
		description = "사용자의 정보를 삭제합니다."
	)
	private ResponseEntity<Map<String, Object>> deleteUser(
		@Parameter(description = "삭제할 사용자 ID", required = true)
		@PathVariable("id") String id
	) {
		if (userService.deleteUser(id)) {
			return ResponseEntity.ok(null);
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/find-password")
	@Operation(
		summary = "비밀번호 찾기",
		description = "사용자 ID와 이메일을 사용하여 임시 비밀번호를 발급합니다."
	)
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "임시 비밀번호 발급 성공"),
		@ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
	})
	private ResponseEntity<String> findPassword(
		@Parameter(description = "사용자 정보 (ID와 이메일)", required = true)
		@RequestBody UserDTO user
	) {
		if(user.getId() == null || user.getId().equals("") || user.getEmail() == null || user.getEmail().equals("")) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		UserDTO existingUser = userService.getUser(user.getId());
		if(existingUser == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
		if(!existingUser.getEmail().equals(user.getEmail())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일을 확인해주세요.");
		}
		
        String tempPwd = UUID.randomUUID().toString().substring(0, 8);
        existingUser.setPwd(tempPwd);
        
        String body = "Your temporary password is: " + tempPwd + "\nPlease reset your password after logging in.";
        emailService.sendEmail(user.getEmail(), tempPwd, body);
        
        // DB에 encrypt된 tempPwd를 저장
        if(userService.updateUser(existingUser) == null) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        
		return ResponseEntity.status(HttpStatus.OK).build();
	}
}