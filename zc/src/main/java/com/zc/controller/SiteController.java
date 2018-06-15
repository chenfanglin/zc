package com.zc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.exception.ServerException;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class SiteController {

	@RequestMapping("/admin/query_lables")
	public Object queryLables(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		
		return "";
	}
}
