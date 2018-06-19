package com.zc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.exception.ServerException;
import com.zc.service.HotWordService;

/**
 * 热搜词汇
 *
 */
@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class HotWordController {

	@Autowired
	private HotWordService hotWordService; 
	
	@RequestMapping("/get_hot_words")
	public Object getHotWords(HttpServletRequest request, HttpServletResponse response) throws ServerException{
		return hotWordService.getHotWords();
	}
}
