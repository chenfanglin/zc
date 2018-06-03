package com.zc.model;

public class UserModel {

	private Integer userId;

	private String userName;

	private String password;

	@Override
	public String toString() {
		return "UserModel [userId=" + userId + ", userName=" + userName + ", password=" + password + "]";
	}

	public UserModel() {
	}

	public UserModel(String userName2, String password2) {
		this.userName = userName2;
		this.password = password2;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
