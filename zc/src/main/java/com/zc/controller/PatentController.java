package com.zc.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.dao.PatentDAO;
import com.zc.model.PatentModel;

@Controller
public class PatentController {

	private static final Logger logger = LoggerFactory.getLogger(PatentController.class);
	@Autowired
	private PatentDAO patentDao;

	@RequestMapping("/query_patent_list")
	public Object test(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String patent_type = request.getParameter("patent_type");
		Map<String, String[]> map = request.getParameterMap();
		logger.info("patent_type:" + patent_type);
		for (Map.Entry<String, String[]> entry : map.entrySet()) {
			logger.info(entry.getKey());
			logger.info(entry.getValue()[0]);
		}
		List<PatentModel> list = patentDao.queryPatentList();
		return list;
	}
}
