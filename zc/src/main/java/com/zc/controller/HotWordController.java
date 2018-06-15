package com.zc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.exception.ServerException;

/**
 * 热搜词汇
 *
 */
@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class HotWordController {

	private static final Logger logger = LoggerFactory.getLogger(HotWordController.class);
	
	
	@RequestMapping("/get_hot_words")
	public Object getHotWords(HttpServletRequest request, HttpServletResponse response) throws ServerException{
		
		return "";
	}
}
