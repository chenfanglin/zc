package com.zc.req;

public class PatentParam extends BaseRequest {

	private Integer patentType;

	private String patentStatus;

	private String minPatentPrice;

	private String maxPatentPrice;

	private String industry;

	private Integer isBatch;

	private String publishYear;

	private String keyword;

	private String flag;

	public PatentParam() {
	}

	public PatentParam(Integer patentType, String patentStatus, String minPatentPrice, String maxPatentPrice,
			String industry, Integer isBatch, String publishYear, String keyword, String flag, String sort,
			String order, Integer pageIndex, Integer pageSize) {
		this.patentType = patentType;
		this.patentStatus = patentStatus;
		this.minPatentPrice = minPatentPrice;
		this.maxPatentPrice = maxPatentPrice;
		this.industry = industry;
		this.isBatch = isBatch;
		this.publishYear = publishYear;
		this.keyword = keyword;
		this.flag = flag;
		this.sort = sort;
		this.order = order;
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}

	public Integer getPatentType() {
		return patentType;
	}

	public void setPatentType(Integer patentType) {
		this.patentType = patentType;
	}

	public String getPatentStatus() {
		return patentStatus;
	}

	public void setPatentStatus(String patentStatus) {
		this.patentStatus = patentStatus;
	}

	public String getMinPatentPrice() {
		return minPatentPrice;
	}

	public void setMinPatentPrice(String minPatentPrice) {
		this.minPatentPrice = minPatentPrice;
	}

	public String getMaxPatentPrice() {
		return maxPatentPrice;
	}

	public void setMaxPatentPrice(String maxPatentPrice) {
		this.maxPatentPrice = maxPatentPrice;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public Integer getIsBatch() {
		return isBatch;
	}

	public void setIsBatch(Integer isBatch) {
		this.isBatch = isBatch;
	}

	public String getPublishYear() {
		return publishYear;
	}

	public void setPublishYear(String publishYear) {
		this.publishYear = publishYear;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

}
