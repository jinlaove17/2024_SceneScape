package com.ssafy.enjoytrip.model.dto;

import org.springframework.http.HttpStatus;

import io.micrometer.common.lang.Nullable;

public class ApiResponse<T> {
	private HttpStatus status;
	
	@Nullable
	private T data;
	
	public ApiResponse(HttpStatus status, T data) {
		this.status = status;
		this.data = data;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
