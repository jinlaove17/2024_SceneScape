package com.ssafy.enjoytrip.model.dto;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Map;

public class TripDTO {
	int no;
	String userId;
	String title;
	String description;
	LocalDate startDate;
	LocalDate endDate;
	Timestamp created;
	Timestamp updated;
	Map<String, Object> attractions;
	
	public TripDTO() {
		super();
	}
	
	public TripDTO(String title, String description, LocalDate startDate, LocalDate endDate) {
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	public TripDTO(String title, String description, LocalDate startDate, LocalDate endDate, Timestamp created, Timestamp updated) {
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.created = created;
		this.updated = updated;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
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
