package com.zc.exception;

public class ServerException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/** 描述一个异常的错误码 */
	private int statusCode;

	public ServerException(int statusCode) {
		this.statusCode = statusCode;
	}

	public ServerException(int statusCode, String message) {
		super(message);
		this.statusCode = statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public int getStatusCode() {
		return statusCode;
	}
}
