package com.zc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.constant.Constant;
import com.zc.constant.StatusCode;
import com.zc.dao.ParamDAO;
import com.zc.exception.ServerException;
import com.zc.model.KeyValue;
import com.zc.req.ParamRequest;

import tk.mybatis.mapper.util.StringUtil;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class ParamController {

	@Autowired
	private ParamDAO paramDAO;
	
	@RequestMapping("/get_publish_year_list")
	public Object getPublishYearList(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		ParamRequest param = new ParamRequest();
		param.setParamType(Constant.PUBLISH_YEAR_TYPE);
		param.setSort("param_name");
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

	@RequestMapping("/del_param")
	public Object delParam(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		String paramId = request.getParameter("param_id");
		if (StringUtil.isEmpty(paramId)) {
			throw new ServerException(StatusCode.PARAM_ERROR);
		}
		paramDAO.delParam(Integer.parseInt(paramId));
		return "success";
	}

	@RequestMapping("/update_param")
	public Object updateParam(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		String paramId = request.getParameter("param_id");
		if (StringUtil.isEmpty(paramId)) {
			throw new ServerException(StatusCode.PARAM_ERROR);
		}
		String paramName = request.getParameter("param_name");
		ParamRequest param = new ParamRequest(); 
		param.setParamId(Integer.parseInt(paramId));
		param.setParamName(paramName);
		paramDAO.updateParam(param);
		return "success";
	}
	
	@RequestMapping("/add_param")
	public Object addParam(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		String paramType = request.getParameter("param_type");
		if (StringUtil.isEmpty(paramType)) {
			throw new ServerException(StatusCode.PARAM_ERROR);
		}
		String paramName = request.getParameter("param_name");
		ParamRequest param = new ParamRequest(); 
		param.setParamType(Integer.parseInt(paramType));
		param.setParamName(paramName);
		paramDAO.updateParams(param);
		return "success";
	}
	
}
