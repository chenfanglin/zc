package com.zc.model;

public class PatentModel {

	private String patentId;

	private String patentName;

	private String patentUrl;

	private Integer patentType;

	private String patentStatus;

	private String patentPrice;

	private String industry;

	private String industryName;

	private Integer isBatch;

	private String publishYear;

	private String publishTime;

	private String userQQ;

	private String userWX;

	public String getPatentId() {
		return patentId;
	}

	public void setPatentId(String patentId) {
		this.patentId = patentId;
	}

	public String getPatentName() {
		return patentName;
	}

	public void setPatentName(String patentName) {
		this.patentName = patentName;
	}

	public int getPatentType() {
		return patentType;
	}

	public void setPatentType(int patentType) {
		this.patentType = patentType;
	}

	public String getPatentStatus() {
		return patentStatus;
	}

	public void setPatentStatus(String patentStatus) {
		this.patentStatus = patentStatus;
	}

	public String getPatentPrice() {
		return patentPrice;
	}

	public void setPatentPrice(String patentPrice) {
		this.patentPrice = patentPrice;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getIndustryName() {
		return industryName;
	}

	public void setIndustryName(String industryName) {
		this.industryName = industryName;
	}

	public String getPublishYear() {
		return publishYear;
	}

	public void setPublishYear(String publishYear) {
		this.publishYear = publishYear;
	}

	public String getPublishTime() {
		return publishTime;
	}

	public void setPublishTime(String publishTime) {
		this.publishTime = publishTime;
	}

	public String getUserQQ() {
		return userQQ;
	}

	public void setUserQQ(String userQQ) {
		this.userQQ = userQQ;
	}

	public String getUserWX() {
		return userWX;
	}

	public void setUserWX(String userWX) {
		this.userWX = userWX;
	}

	public Integer getIsBatch() {
		return isBatch;
	}

	public void setIsBatch(Integer isBatch) {
		this.isBatch = isBatch;
	}

	public void setPatentType(Integer patentType) {
		this.patentType = patentType;
	}

	public PatentModel(String patentId, String patentName, String patentUrl, Integer patentType, String patentStatus,
			String patentPrice, String industry, String industryName, Integer isBatch, String publishYear,
			String publishTime, String userQQ, String userWX) {
		super();
		this.patentId = patentId;
		this.patentName = patentName;
		this.patentUrl = patentUrl;
		this.patentType = patentType;
		this.patentStatus = patentStatus;
		this.patentPrice = patentPrice;
		this.industry = industry;
		this.industryName = industryName;
		this.isBatch = isBatch;
		this.publishYear = publishYear;
		this.publishTime = publishTime;
		this.userQQ = userQQ;
		this.userWX = userWX;
	}

	public PatentModel() {
	}

	public String getPatentUrl() {
		return patentUrl;
	}

	public void setPatentUrl(String patentUrl) {
		this.patentUrl = patentUrl;
	}

	@Override
	public String toString() {
		return "PatentModel [patentId=" + patentId + ", patentName=" + patentName + ", patentUrl=" + patentUrl
				+ ", patentType=" + patentType + ", patentStatus=" + patentStatus + ", patentPrice=" + patentPrice
				+ ", industry=" + industry + ", industryName=" + industryName + ", isBatch=" + isBatch
				+ ", publishYear=" + publishYear + ", publishTime=" + publishTime + ", userQQ=" + userQQ + ", userWX="
				+ userWX + "]";
	}

}
