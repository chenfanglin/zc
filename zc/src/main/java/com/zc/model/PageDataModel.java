package com.zc.model;

/**
 * 分页模型
 * 
 * @author Administrator
 *
 */
public class PageDataModel {

	private int totalRecord;

	private Object data;

	public int getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
