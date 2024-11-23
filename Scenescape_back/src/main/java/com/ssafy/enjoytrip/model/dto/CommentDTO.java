package com.ssafy.enjoytrip.model.dto;

import java.sql.Timestamp;

import io.swagger.v3.oas.annotations.media.Schema;


@Schema(description = "댓글 정보를 담는 객체")
public class CommentDTO {

    @Schema(description = "댓글 번호", example = "1")
    private int no;

    @Schema(description = "댓글 내용", example = "이곳은 정말 멋진 장소입니다.")
    private String content;

    @Schema(description = "작성자 ID", example = "user123")
    private String userId;

    @Schema(description = "게시글 번호", example = "100")
    private int postNo;

    @Schema(description = "상위 댓글 번호", example = "0")
    private Integer parentNo;

    @Schema(description = "생성 시간", example = "2024-11-23T12:34:56.789+09:00")
    private Timestamp created;

    @Schema(description = "수정 시간", example = "2024-11-23T12:34:56.789+09:00")
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