package com.zc.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zc.constant.StatusCode;
import com.zc.dao.PatentDAO;
import com.zc.exception.ServerException;
import com.zc.model.PageDataModel;
import com.zc.model.PatentModel;
import com.zc.req.BaseRequest;
import com.zc.req.PatentParam;

import tk.mybatis.mapper.util.StringUtil;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
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
		PatentParam baseRequest = buildPatentParameter(request);
		logger.info("查询专利列表:" + baseRequest);
		PageDataModel pageDataModel = new PageDataModel();
		List<PatentModel> list = patentDAO.queryPatentList(baseRequest);
		int totalRecord = patentDAO.queryPatentCount();
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
		PatentModel patentModel = buildPatentModel(request);
		logger.info("录入专利:" + patentModel);
		patentDAO.insertParent(patentModel);
		return "success";
	}

	/**
	 * 删除专利
	 * @param request
	 * @param response
	 * @return
	 * @throws ServerException
	 */
	@RequestMapping("/del_patent")
	public Object delPatent(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		String patentId = request.getParameter("patent_id");
		String isShow = request.getParameter("is_show");
		PatentModel model = new PatentModel();
		model.setPatentId(patentId);
		model.setIsShow(Integer.parseInt(isShow));
		patentDAO.delParent(model);
		return "success";
	}
	
	/**
	 * 修改专利
	 * @param request
	 * @param response
	 * @return
	 * @throws ServerException
	 */
	@RequestMapping("/update_patent")
	public Object updatePatent(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		PatentModel patentModel = buildPatentModel(request);
		logger.info("修改专利:" + patentModel);
		patentDAO.updateParent(patentModel);
		return "success";
	}
	
	/**
	 * 参数组装
	 * @param request
	 * @return
	 * @throws ServerException
	 */
	private PatentModel buildPatentModel(HttpServletRequest request) throws ServerException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currentDate = sdf.format(new Date());
		String patentId = request.getParameter("patent_id");
		String patentName = StringUtil.isEmpty(request.getParameter("patent_name")) ? ""
				: request.getParameter("patent_name");
		String patentType = request.getParameter("patent_type");
		String patentTypeName = request.getParameter("patent_type_name");
		String patentUrl = request.getParameter("patent_url");
		String patentStatus = StringUtil.isEmpty(request.getParameter("patent_status")) ? "0"
				: request.getParameter("patent_status");
		String patentStatusName = StringUtil.isEmpty(request.getParameter("patent_status_name")) ? "0"
				: request.getParameter("patent_status_name");
		String patentPrice = StringUtil.isEmpty(request.getParameter("patent_price")) ? "0"
				: request.getParameter("patent_price");
		String publishYear = StringUtil.isEmpty(request.getParameter("publish_year")) ? "2018"
				: request.getParameter("publish_year");
		String publishTime = StringUtil.isEmpty(request.getParameter("publish_time")) ? currentDate
				: request.getParameter("publish_time");
		String industry = StringUtil.isEmpty(request.getParameter("industry")) ? "0" : request.getParameter("industry");
		String industryName = StringUtil.isEmpty(request.getParameter("industry_name")) ? ""
				: request.getParameter("industry_name");
		String isBatch = request.getParameter("is_batch");
		String isBatchName = request.getParameter("is_batch_name");
		String userQQ = StringUtil.isEmpty(request.getParameter("user_qq")) ? "0" : request.getParameter("user_qq");
		String userWX = StringUtil.isEmpty(request.getParameter("user_wx")) ? "" : request.getParameter("user_wx");
		if (StringUtil.isEmpty(patentId) || StringUtil.isEmpty(patentType) || StringUtil.isEmpty(isBatch) || StringUtil.isEmpty(patentUrl)) {
			throw new ServerException(StatusCode.PARAM_ERROR);
		}
		PatentModel patentModel = new PatentModel(patentId, patentName,patentUrl, Integer.parseInt(patentType),patentTypeName, patentStatus,patentStatusName,
				patentPrice, industry, industryName, Integer.parseInt(isBatch), isBatchName, publishYear, publishTime, userQQ,
				userWX);
		return patentModel;
	}

	/**
	 * 组装请求参数
	 * 
	 * @param request
	 * @return
	 */
	private PatentParam buildPatentParameter(HttpServletRequest request) throws ServerException {
		try {
			String patentType = request.getParameter("patent_type");
			String patentStatus = request.getParameter("patent_status");
			String minPatentPrice = request.getParameter("min_patent_price");
			String maxPatentPrice = request.getParameter("max_patent_price");
			String publishYear = request.getParameter("publish_year");
			String industry = request.getParameter("industry");
			String isBatch = request.getParameter("is_batch");
			String keyword = StringUtil.isEmpty(request.getParameter("keyword")) ? null : request.getParameter("keyword");
			String flag = request.getParameter("flag");
			String sort = request.getParameter("sort");
			String order = request.getParameter("order");
			String pageNum = request.getParameter("page_num");
			String pageSize = request.getParameter("page_size");
			sort = StringUtil.isEmpty(sort) ? "publish_time" : sort;
			order = StringUtil.isEmpty(order) ? "desc" : order;
			int num = StringUtil.isEmpty(pageNum) || "0".equals(pageNum) ? 1 : Integer.parseInt(pageNum);
			int size = StringUtil.isEmpty(pageSize) ? 50 : Integer.parseInt(pageSize);
			int pageIndex = (num - 1) * size < 0 ? 0 : (num - 1) * size;
			PatentParam baseRequest = new PatentParam(
					StringUtil.isEmpty(patentType) ? null : Integer.parseInt(patentType), StringUtil.isEmpty(patentStatus) ? null : patentStatus, minPatentPrice,
					maxPatentPrice, industry, StringUtil.isEmpty(isBatch) ? null : Integer.parseInt(isBatch),
					publishYear, keyword, flag, sort, order, pageIndex, size);
			return baseRequest;
		} catch (Exception e) {
			throw new ServerException(StatusCode.PARAM_ERROR);
		}

	}
}
