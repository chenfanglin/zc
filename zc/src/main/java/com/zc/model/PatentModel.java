package com.zc.model;

import java.text.SimpleDateFormat;

public class PatentModel {

	private String patentId;

	private String patentName;

	private String patentUrl;

	private Integer patentType;

	private String patentTypeName;

	private String patentStatus;

	private String patentStatusName;

	private String patentPrice;

	private String industry;

	private String industryName;

	private Integer isBatch;

	private String isBatchName;

	private String publishYear;

	private String publishTime;

	private String userQQ;

	private String userWX;

	private String sellerContact;

	private String patentee;

	private String salesStatus;

	private String contact;

	private Integer isShow;
	
	private Integer isTop;

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
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			return sdf.format(sdf.parse(publishTime));
		} catch (Exception e) {
			e.printStackTrace();
		}
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

	public PatentModel() {
	}

	public String getPatentUrl() {
		return patentUrl;
	}

	public void setPatentUrl(String patentUrl) {
		this.patentUrl = patentUrl;
	}

	public String getPatentTypeName() {
		return patentTypeName;
	}

	public void setPatentTypeName(String patentTypeName) {
		this.patentTypeName = patentTypeName;
	}

	public String getPatentStatusName() {
		return patentStatusName;
	}

	public void setPatentStatusName(String patentStatusName) {
		this.patentStatusName = patentStatusName;
	}

	public String getIsBatchName() {
		return isBatchName;
	}

	public void setIsBatchName(String isBatchName) {
		this.isBatchName = isBatchName;
	}


	@Override
	public String toString() {
		return "PatentModel [patentId=" + patentId + ", patentName=" + patentName + ", patentUrl=" + patentUrl
				+ ", patentType=" + patentType + ", patentTypeName=" + patentTypeName + ", patentStatus=" + patentStatus
				+ ", patentStatusName=" + patentStatusName + ", patentPrice=" + patentPrice + ", industry=" + industry
				+ ", industryName=" + industryName + ", isBatch=" + isBatch + ", isBatchName=" + isBatchName
				+ ", publishYear=" + publishYear + ", publishTime=" + publishTime + ", userQQ=" + userQQ + ", userWX="
				+ userWX + ", sellerContact=" + sellerContact + ", patentee=" + patentee + ", salesStatus="
				+ salesStatus + ", contact=" + contact + ", isShow=" + isShow + "]";
	}

	public PatentModel(String patentId, String patentName, String patentUrl, Integer patentType, String patentTypeName,
			String patentStatus, String patentStatusName, String patentPrice, String industry, String industryName,
			Integer isBatch, String isBatchName, String publishYear, String publishTime, String userQQ, String userWX) {
		this.patentId = patentId;
		this.patentName = patentName;
		this.patentUrl = patentUrl;
		this.patentType = patentType;
		this.patentTypeName = patentTypeName;
		this.patentStatus = patentStatus;
		this.patentStatusName = patentStatusName;
		this.patentPrice = patentPrice;
		this.industry = industry;
		this.industryName = industryName;
		this.isBatch = isBatch;
		this.isBatchName = isBatchName;
		this.publishYear = publishYear;
		this.publishTime = publishTime;
		this.userQQ = userQQ;
		this.userWX = userWX;
	}

	public PatentModel(String patentId, String patentName, String patentUrl, Integer patentType, String patentTypeName,
			String patentStatus, String patentStatusName, String patentPrice, String industry, String industryName,
			Integer isBatch, String isBatchName, String publishYear, String publishTime, String userQQ, String userWX,
			String sellerContact, String patentee, String salesStatus, String contact) {
		this(patentId, patentName, patentUrl, patentType, patentTypeName, patentStatus, patentStatusName, patentPrice,
				industry, industryName, isBatch, isBatchName, publishYear, publishTime, userQQ, userWX);
		this.sellerContact = sellerContact;
		this.patentee = patentee;
		this.salesStatus = salesStatus;
		this.contact = contact;
	}

	public PatentModel(String patentId, String patentName, Integer patentType, String patentTypeName,
			String patentStatus, String patentStatusName, String patentPrice, String publishYear, String publishTime,
			String sellerContact, String patentee, String salesStatus, String contact) {
		this.patentId = patentId;
		this.patentName = patentName;
		this.patentType = patentType;
		this.patentTypeName = patentTypeName;
		this.patentStatus = patentStatus;
		this.patentStatusName = patentStatusName;
		this.patentPrice = patentPrice;
		this.publishYear = publishYear;
		this.publishTime = publishTime;
		this.sellerContact = sellerContact;
		this.patentee = patentee;
		this.salesStatus = salesStatus;
		this.contact = contact;
	}

	public String getSellerContact() {
		return sellerContact;
	}

	public void setSellerContact(String sellerContact) {
		this.sellerContact = sellerContact;
	}

	public String getPatentee() {
		return patentee;
	}

	public void setPatentee(String patentee) {
		this.patentee = patentee;
	}

	public String getSalesStatus() {
		return salesStatus;
	}

	public void setSalesStatus(String salesStatus) {
		this.salesStatus = salesStatus;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public Integer getIsShow() {
		return isShow;
	}

	public void setIsShow(Integer isShow) {
		this.isShow = isShow;
	}

	public Integer getIsTop() {
		return isTop;
	}

	public void setIsTop(Integer isTop) {
		this.isTop = isTop;
	}

}
