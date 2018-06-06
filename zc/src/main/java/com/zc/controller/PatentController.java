package com.zc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.constant.StatusCode;
import com.zc.dao.PatentDAO;
import com.zc.exception.ServerException;
import com.zc.model.PageDataModel;
import com.zc.model.PatentModel;
import com.zc.req.BaseRequest;

import tk.mybatis.mapper.util.StringUtil;

@Controller
public class PatentController {

	private static final Logger logger = LoggerFactory.getLogger(PatentController.class);
	@Autowired
	private PatentDAO patentDAO;

	/**
	 * 查询专利列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/query_patent_list")
	public Object queryPatentList(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		BaseRequest baseRequest = buildPatentParameter(request);
		logger.info("查询专利列表:" + baseRequest);
		PageDataModel pageDataModel = new PageDataModel();
		List<PatentModel> list = patentDAO.queryPatentList(baseRequest);
		int totalRecord = patentDAO.queryPatentCount(baseRequest);
		pageDataModel.setTotalRecord(totalRecord);
		pageDataModel.setData(list);
		return pageDataModel;
	}

	/**
	 * 录入专利
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/add_patent")
	public Object addPatent(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		String patentId = request.getParameter("patent_id");
		String patentName = request.getParameter("patent_name");
		String patentType = request.getParameter("patent_type");
		String patentStatus = request.getParameter("patent_status");
		String patentPrice = request.getParameter("patent_price");
		String publishYear = request.getParameter("publish_year");
		String publishTime = request.getParameter("publish_time");
		String industry = request.getParameter("industry");
		String industryName = request.getParameter("industry_name");
		String isBatch = request.getParameter("is_batch");
		String userQQ = request.getParameter("user_qq");
		String userWX = request.getParameter("user_wx");
		PatentModel patentModel = new PatentModel(patentId, patentName, Integer.parseInt(patentType), patentStatus,
				patentPrice, industry, industryName, Integer.parseInt(isBatch), publishYear, publishTime, userQQ,
				userWX);
		patentDAO.insertParent(patentModel);
		return "success";
	}

	@RequestMapping("/upload_patent")
	public Object uploadPatentExcel(HttpServletRequest request, HttpServletResponse response) throws ServerException {

		return "";
	}

	/**
	 * 组装请求参数
	 * 
	 * @param request
	 * @return
	 */
	private BaseRequest buildPatentParameter(HttpServletRequest request) throws ServerException{
		try {
			String patentType = request.getParameter("patent_type");
			String patentStatus = request.getParameter("patent_status");
			String minPatentPrice = request.getParameter("min_patent_price");
			String maxPatentPrice = request.getParameter("max_patent_price");
			String publishYear = request.getParameter("publish_year");
			String industry = request.getParameter("industry");
			String isBatch = request.getParameter("is_batch");
			String keyword = request.getParameter("keyword");
			String sort = request.getParameter("sort");
			String order = request.getParameter("order");
			String pageNum = request.getParameter("page_num");
			String pageSize = request.getParameter("page_size");
			sort = StringUtil.isEmpty(sort) ? "publish_time" :  sort;
			order = StringUtil.isEmpty(order) ? "desc" :  order;
			int num = StringUtil.isEmpty(pageNum) || "0".equals(pageNum) ? 1 : Integer.parseInt(pageNum);
			int size = StringUtil.isEmpty(pageSize) ? 50 : Integer.parseInt(pageSize);
			int pageIndex = (num - 1) * size < 0 ? 0 : (num - 1) * size;
			BaseRequest baseRequest = new BaseRequest(StringUtil.isEmpty(patentType) ? null : Integer.parseInt(patentType), patentStatus, minPatentPrice,
					maxPatentPrice, industry, StringUtil.isEmpty(isBatch) ? null : Integer.parseInt(isBatch), publishYear, keyword, sort, order, pageIndex,
					size);
			return baseRequest;
		} catch (Exception e) {
			throw new ServerException(StatusCode.PARAM_ERROR);
		}
		
	}
}
