package com.zc.dao;

import org.springframework.stereotype.Repository;

import com.zc.model.UserModel;

@Repository
public interface UserDAO {

	public UserModel queryUserInfo(UserModel userModel);

}
