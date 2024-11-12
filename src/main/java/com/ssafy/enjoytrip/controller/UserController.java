package com.ssafy.enjoytrip.controller;

import com.ssafy.enjoytrip.model.dto.UserDTO;
import com.ssafy.enjoytrip.service.UserService;

import jakarta.servlet.http.HttpSession;

import java.lang.ProcessBuilder.Redirect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/user")
public class UserController {
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/login.do")
	private String loginPage() {
		return "login";
	}

	@GetMapping("/join.do")
	private String joinPage() {
		return "join";
	}

	@GetMapping("/myPage.do")
	private String myPage() {
		return "myPage";
	}

	@GetMapping("/find.do")
	private String findPage() {
		return "find";
	}

	@GetMapping("/result.do")
	private String resultPage(@ModelAttribute("findPwd") String pwd) {
		return "result";
	}

	@PostMapping("/join.do")
	private String join(
			@RequestParam("userId") String userId,
			@RequestParam("userPwd") String userPwd,
			@RequestParam("nickname") String nickname,
			@RequestParam("email") String email,
			Model model) {
		if (userService.join(userId, userPwd, nickname, email)) {
			model.addAttribute("msg", "회원가입 되었습니다.");
		} else {
			model.addAttribute("msg", "알 수 없는 오류가 발생했습니다.");
		}

		return "login";
	}

	@PostMapping("/login.do")
	private String login(
			@RequestParam("userId") String userId,
			@RequestParam("userPwd") String userPwd,
			HttpSession session,
			Model model) {
		UserDTO userDto = userService.login(userId, userPwd);

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);

			return "index";
		}

		model.addAttribute("msg", "아이디 혹은 비밀번호를 확인하세요.");

		return "login";
	}

	@GetMapping("/logout.do")
	private String logout(
			@ModelAttribute("msg") String msg,
			HttpSession session,
			Model model) {
		// 회원탈퇴 후 로그아웃으로 redirect 하는 경우가 있으므로, 유저가 존재할 때만 로그아웃 알림창을 띄운다.
		UserDTO user = (UserDTO) session.getAttribute("userInfo");

		if (user != null) {
			if (userService.isExist(user.getId())) {
				// 회원탈퇴가 아닌 경우 msg 추가
				if (msg.equals("")) {
					model.addAttribute("msg", "로그아웃 되었습니다.");
				}

				// 세션에서 모든 속성 삭제 후 비우기
				session.invalidate();
			}
		}

		// 다시 로그인 페이지로 이동
		return "login";
	}

	@PostMapping("/modify.do")
	private String modify(
			@RequestParam("userId") String userId,
			@RequestParam("userPwd") String newPwd,
			@RequestParam("nickname") String newNickname,
			@RequestParam("email") String newEmail,
			HttpSession session) {
		UserDTO userDto = userService.updateAccount(userId, newPwd, newNickname, newEmail);

		if (userDto != null) {
			session.setAttribute("userInfo", userDto);

			return "index";
		}

		return "myPage";
	}

	@PostMapping("/delete.do")
	private String delete(@RequestParam("userId") String userId, RedirectAttributes redirectAttributes) {
		if (userService.cancelAccount(userId)) {
			redirectAttributes.addFlashAttribute("msg", "회원탈퇴가 완료되었습니다.");
		} else {
			redirectAttributes.addFlashAttribute("msg", "알 수 없는 오류가 발생했습니다.");
		}

		return "redirect:/user/logout.do";
	}

	@PostMapping("/find.do")
	private String find(
			@RequestParam("userId") String userId,
			@RequestParam("email") String email, 
			RedirectAttributes redirectAttributes) {
		UserDTO userDto = userService.findPassword(userId, email);

		if (userDto != null) {
			redirectAttributes.addFlashAttribute("findPwd", userDto.getPwd());
			
			return "redirect:/user/result.do";
		}

		return "find";
	}
}
