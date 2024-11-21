package com.ssafy.enjoytrip.model.dto;

public class UserDTO {
	private String id;
	private String pwd;
	private String nickname;
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
