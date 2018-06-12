package com.zc.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.eclipse.jdt.internal.compiler.batch.Main;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.zc.common.MailTemplate;
import com.zc.constant.Constant;
import com.zc.controller.UploadController;
import com.zc.dao.PatentDAO;
import com.zc.exception.ServerException;
import com.zc.model.PatentModel;
import com.zc.util.ExcelUtil;

@Service
public class UploadService {

	private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

	@Resource(name = "mailTemplate")
	private MailTemplate mailTemplate;

	@Autowired
	private PatentDAO patentDAO;

	/**
	 * 异步解析excel数据
	 * 
	 * @param realPath
	 * @throws ServerException 
	 */
	@Async("uploadThreadPool")
	public void parseUploadData(String realPath) throws ServerException {
		List<Map<String, String>> datalist = ExcelUtil.readExcelData(realPath);
		for (Map<String, String> map : datalist) {
			String patentId = map.get(Constant.PATENT_ID);
			String patentName = map.get(Constant.PATENT_NAME);
			String patentStatusName = map.get(Constant.PATENT_STATUS);
			String patentPrice = map.get(Constant.PATENT_PRICE);
			String sellerContact = map.get(Constant.SELLER_CONTACT);
			String patentTypeName = map.get(Constant.PATENT_TYPE);
			String publishTime = map.get(Constant.PUBLISH_TIME);
			String patentee = map.get(Constant.PATENTEE);
			String salesStatus = map.get(Constant.SALES_STATUS);
			String contact = map.get(Constant.CONTACT);
			
			patent_id,patent_name,patent_type,patent_type_name,patent_status,patent_status_name,patent_price,
			publish_year,publish_time,seller_contact,`patentee`,sales_status,`contact`
			
			PatentModel patentModel = new PatentModel(patentId,patentName,);
			
			String publishYear = getPublishYearByPatentId(patentId);
			String patentStatus = getPatentStatus(patentStatusName);
			String patentType = getPatentType(patentTypeName);
			patentDAO.savePatents(patentModel);
		}
	}

	private String getPublishYearByPatentId(String patentId) {
		return patentId.substring(0, 4);
	}

	/**
	 * 0未下证、1下证、2未授权
	 * 
	 * @param patentStatusName
	 * @return
	 */
	private String getPatentStatus(String patentStatusName) {
		if ("未下证".equals(patentStatusName)) {
			return "0";
		} else if ("下证".equals(patentStatusName)) {
			return "1";
		} else {
			return "2";
		}
	}

	/**
	 * 0发明、1实用、2外观
	 * 
	 * @return
	 */
	private String getPatentType(String patentTypeName) {
		if ("发明".equals(patentTypeName)) {
			return "0";
		} else if ("实用".equals(patentTypeName)) {
			return "1";
		} else {
			return "2";
		}
	}

}
