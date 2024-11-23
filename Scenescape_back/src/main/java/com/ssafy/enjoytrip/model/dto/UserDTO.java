package com.ssafy.enjoytrip.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "사용자 정보를 나타내는 객체")
public class UserDTO {
	
    @Schema(description = "사용자 ID", example = "user123")
	private String id;
    
    @Schema(description = "사용자 비밀번호", example = "password123")
	private String pwd;
    
    @Schema(description = "사용자 닉네임", example = "JohnDoe")
	private String nickname;
    
    @Schema(description = "사용자 이메일 주소", example = "johndoe@example.com")
	private String email;
	
	public UserDTO() {
		super();
	}

	public UserDTO(String id, String pwd, String nickname, String email) {
		super();
		this.id = id;
		this.pwd = pwd;
		this.nickname = nickname;
		this.email = email;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", pwd=" + pwd + ", nickname=" + nickname + ", email=" + email + "]";
	}
}
