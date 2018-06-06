package com.zc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.constant.StatusCode;
import com.zc.dao.MenuDAO;
import com.zc.dao.UserDAO;
import com.zc.exception.ServerException;
import com.zc.model.MenuModel;
import com.zc.model.UserModel;

@Controller
public class LoginController {

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private MenuDAO menuDAO;
	
	@RequestMapping("/admin/login")
	public Object adminLogin(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		String userName = request.getParameter("user_name");
		String password = request.getParameter("password");
		UserModel userModel = new UserModel(userName,password);
		UserModel result = userDAO.queryUserInfo(userModel);
		if (result != null) {
			if (password.equals(result.getPassword())) {
				request.getSession().setAttribute("currentUser", result);
				List<MenuModel> menulist = menuDAO.queryMenuList();
				request.getSession().setAttribute("menulist", menulist);
				return result;
			} else {
				throw new ServerException(StatusCode.PASSWORD_ERROE);
			}
		} else {
			throw new ServerException(StatusCode.USER_NOT_EXIST);
		}
		
	}
}
