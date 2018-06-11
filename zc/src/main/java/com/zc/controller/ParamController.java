package com.zc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.constant.Constant;
import com.zc.dao.ParamDAO;
import com.zc.exception.ServerException;
import com.zc.model.KeyValue;
import com.zc.req.ParamRequest;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class ParamController {

	@Autowired
	private ParamDAO paramDAO;

	@RequestMapping("/get_publish_year_list")
	public Object getPublishYearList(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		ParamRequest param = new ParamRequest();
		param.setParamType(Constant.PUBLISH_YEAR_TYPE);
		param.setSort("create_time");
		param.setOrder("desc");
		List<KeyValue> list = paramDAO.queryKeyValues(param);
		return list;
	}

	@RequestMapping("/get_industry_list")
	public Object getIndustryList(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		ParamRequest param = new ParamRequest();
		param.setParamType(Constant.INDUSTRY_TYPE);
		List<KeyValue> list = paramDAO.queryKeyValues(param);
		return list;
	}

}
