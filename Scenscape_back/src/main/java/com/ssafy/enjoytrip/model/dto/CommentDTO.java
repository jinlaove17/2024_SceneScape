package com.ssafy.enjoytrip.model.dto;

import java.sql.Timestamp;

public class CommentDTO {
	private int no;
	private int postNo;
	private String userId;
	private String content;
	private Integer parentNo;
	private Timestamp created;
	private Timestamp updated;
	
	public CommentDTO() {
		super();
	}
	
	public CommentDTO(int no, String content) {
		super();
		this.no = no;
		this.content = content;
	}

	public CommentDTO(int postNo, String userId, String content, Integer parentNo) {
		super();
		this.postNo = postNo;
		this.userId = userId;
		this.content = content;
		this.parentNo = parentNo;
	}

	public CommentDTO(int no, int postNo, String userId, String content, Integer parentNo, Timestamp created,
			Timestamp updated) {
		super();
		this.no = no;
		this.postNo = postNo;
		this.userId = userId;
		this.content = content;
		this.parentNo = parentNo;
		this.created = created;
		this.updated = updated;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getPostNo() {
		return postNo;
	}

	public void setPostNo(int postNo) {
		this.postNo = postNo;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getParentNo() {
		return parentNo;
	}

	public void setParentNo(Integer parentNo) {
		this.parentNo = parentNo;
	}

	public Timestamp getCreated() {
		return created;
	}

	public void setCreated(Timestamp created) {
		this.created = created;
	}

	public Timestamp getUpdated() {
		return updated;
	}

	public void setUpdated(Timestamp updated) {
		this.updated = updated;
	}
}