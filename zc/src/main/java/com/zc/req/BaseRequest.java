package com.zc.req;

public class BaseRequest {

	protected String sort;

	protected String order;

	protected Integer pageIndex = 0;

	protected Integer pageSize = 50;

	public BaseRequest(String sort, String order, Integer pageIndex, Integer pageSize) {
		this.sort = sort;
		this.order = order;
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}

	public BaseRequest() {

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

	@Override
	public String toString() {
		return "BaseRequest [sort=" + sort + ", order=" + order + ", pageIndex=" + pageIndex + ", pageSize=" + pageSize
				+ "]";
	}


}
