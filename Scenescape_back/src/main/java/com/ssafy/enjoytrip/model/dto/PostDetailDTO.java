package com.ssafy.enjoytrip.model.dto;

import java.util.List;

public class PostDetailDTO {
    private PostDTO post;
    private List<CommentDTO> comments;
    private int likeStatus; // 1: 좋아요, -1: 싫어요, 0: 아무것도 없음

    public PostDetailDTO(PostDTO post, List<CommentDTO> comments, int likeStatus) {
        this.post = post;
        this.comments = comments;
        this.likeStatus = likeStatus;
    }

    // Getters and Setters
    public PostDTO getPost() {
        return post;
    }

    public void setPost(PostDTO post) {
        this.post = post;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }

    public int getLikeStatus() {
        return likeStatus;
    }

    public void setLikeStatus(int likeStatus) {
        this.likeStatus = likeStatus;
    }
}