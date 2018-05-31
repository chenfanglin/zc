package com.zc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.druid.support.json.JSONUtils;
import com.zc.dao.PatentDao;
import com.zc.model.PatentModel;

@Controller
public class PatentController {

	@Autowired
	private PatentDao patentDao;

	@RequestMapping("/query_patent_list")
	@ResponseBody
	public Object test(HttpServletRequest request, HttpServletResponse response) {
		List<PatentModel> list = patentDao.queryPatentList();
		return JSONUtils.toJSONString(list);
	}
}
