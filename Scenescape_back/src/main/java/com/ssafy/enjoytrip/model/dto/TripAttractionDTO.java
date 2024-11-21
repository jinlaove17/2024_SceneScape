package com.ssafy.enjoytrip.model.dto;

public class TripAttractionDTO {
	private int no;
	private int tripNo;
	private int attractionNo;
	private int sequence;
	
	public TripAttractionDTO() {
		super();
	}
	
	public TripAttractionDTO(int tripNo, int attractionNo) {
		this.tripNo = tripNo;
		this.attractionNo = attractionNo;
	}

	public TripAttractionDTO(int tripNo, int attractionNo, int sequence) {
		this.tripNo = tripNo;
		this.attractionNo = attractionNo;
		this.sequence = sequence;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getTripNo() {
		return tripNo;
	}

	public void setTripNo(int tripNo) {
		this.tripNo = tripNo;
	}

	public int getAttractionNo() {
		return attractionNo;
	}

	public void setAttractionNo(int attractionNo) {
		this.attractionNo = attractionNo;
	}

	public int getSequence() {
		return sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
}
