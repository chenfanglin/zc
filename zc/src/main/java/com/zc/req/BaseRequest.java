package com.zc.req;

public class BaseRequest {

	private Integer patentType;

	private String patentStatus;

	private String minPatentPrice;

	private String maxPatentPrice;

	private String industry;

	private Integer isBatch;

	private String publishYear;

	private String keyword;

	private String sort;

	private String order;

	private Integer pageIndex = 0;

	private Integer pageSize = 50;

	public BaseRequest(Integer patentType, String patentStatus, String minPatentPrice, String maxPatentPrice,
			String industry, Integer isBatch, String publishYear, String keyword, String sort, String order,
			Integer pageIndex, Integer pageSize) {
		super();
		this.patentType = patentType;
		this.patentStatus = patentStatus;
		this.minPatentPrice = minPatentPrice;
		this.maxPatentPrice = maxPatentPrice;
		this.industry = industry;
		this.isBatch = isBatch;
		this.publishYear = publishYear;
		this.keyword = keyword;
		this.sort = sort;
		this.order = order;
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}

	public BaseRequest() {

	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
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

	public int getIsBatch() {
		return isBatch;
	}

	public void setIsBatch(int isBatch) {
		this.isBatch = isBatch;
	}

	public String getPublishYear() {
		return publishYear;
	}

	public void setPublishYear(String publishYear) {
		this.publishYear = publishYear;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public Integer getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public void setPatentType(Integer patentType) {
		this.patentType = patentType;
	}

	public void setIsBatch(Integer isBatch) {
		this.isBatch = isBatch;
	}

	@Override
	public String toString() {
		return "BaseRequest [patentType=" + patentType + ", patentStatus=" + patentStatus + ", minPatentPrice="
				+ minPatentPrice + ", maxPatentPrice=" + maxPatentPrice + ", industry=" + industry + ", isBatch="
				+ isBatch + ", publishYear=" + publishYear + ", keyword=" + keyword + ", sort=" + sort + ", order="
				+ order + ", pageIndex=" + pageIndex + ", pageSize=" + pageSize + "]";
	}
}
