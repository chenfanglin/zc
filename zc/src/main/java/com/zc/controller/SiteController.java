package com.zc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.dao.SiteDAO;
import com.zc.exception.ServerException;
import com.zc.model.ConfigManager;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class SiteController {

	@Autowired
	private SiteDAO siteDAO;
	
	@RequestMapping("/admin/query_lables")
	public Object queryLables(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		List<ConfigManager> list = siteDAO.queryLables();
		return list;
	}
}
