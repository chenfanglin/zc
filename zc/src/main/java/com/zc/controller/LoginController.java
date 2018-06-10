package com.zc.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.constant.StatusCode;
import com.zc.dao.MenuDAO;
import com.zc.dao.UserDAO;
import com.zc.exception.ServerException;
import com.zc.model.MenuModel;
import com.zc.model.UserModel;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoginController {

	@Autowired
	private UserDAO userDAO;

	@Autowired
	private MenuDAO menuDAO;

	@RequestMapping("/admin/login")
	public Object adminLogin(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		String userName = request.getParameter("user_name");
		String password = request.getParameter("password");
		UserModel userModel = new UserModel(userName, password);
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

	@RequestMapping("/admin/update_pwd")
	public Object updatePwd(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		HttpSession session = request.getSession();
		UserModel user = (UserModel) session.getAttribute("currentUser");
		if (user != null) {
			if (user.getPassword().equals(request.getParameter("old_password"))) {
				String password = request.getParameter("password");
				UserModel userModel = new UserModel(user.getUserName(), password);
				userDAO.updatePwd(userModel);
				session.setAttribute("currentUser", userModel);
				return "success";
			} else {
				throw new ServerException(StatusCode.PASSWORD_ERROE);
			}
		} else {
			throw new ServerException(StatusCode.NOT_LOGIN);
		}
	}

	@RequestMapping("/admin/loginout.do")
	public Object loginout(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		HttpSession session = request.getSession();
		session.invalidate();
		try {
			response.sendRedirect("login.jsp");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "success";
	}

}
