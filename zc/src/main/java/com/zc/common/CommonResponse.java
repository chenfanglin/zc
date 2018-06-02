package com.zc.common;

import com.zc.constant.StatusCode;

public class CommonResponse {

	private int statusCode;
	
	private Object content;
	
	public CommonResponse () {
		this.statusCode = StatusCode.SUCCESS;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public Object getContent() {
		return content;
	}

	public void setContent(Object content) {
		this.content = content;
	}
	
	
}
