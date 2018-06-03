package com.zc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.dao.UserDAO;
import com.zc.model.UserModel;

@Controller
public class LoginController {

	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping("/admin/login")
	public Object adminLogin(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userName = request.getParameter("user_name");
		String password = request.getParameter("password");
		UserModel userModel = new UserModel(userName,password);
		UserModel result = userDAO.queryUserInfo(userModel);
		if (result != null) {
			if (password.equals(result.getPassword())) {
				request.getSession().setAttribute("currentUser", result);
				return result;
			} else {
				return "密码错误";
			}
		} else {
			return "用户不存在";
		}
		
	}
}
