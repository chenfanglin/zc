package com.zc.service;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.zc.common.MailTemplate;
import com.zc.common.ResourceHandler;
import com.zc.constant.Constant;
import com.zc.dao.ParamDAO;
import com.zc.dao.PatentDAO;
import com.zc.exception.ServerException;
import com.zc.model.PatentModel;
import com.zc.req.ParamRequest;
import com.zc.util.ExcelUtil;

import tk.mybatis.mapper.util.StringUtil;

@Service
public class UploadService {

	private static final Logger logger = LoggerFactory.getLogger(UploadService.class);

	@Resource(name = "mailTemplate")
	private MailTemplate mailTemplate;

	@Autowired
	private PatentDAO patentDAO;
	
	@Autowired
	private ParamDAO paramDAO;
	
	@Autowired
	private HotWordQueueService hotWordQueueService;
	
	/**
	 * 异步解析excel数据
	 * 
	 * @param realPath
	 * @throws ServerException
	 */
	@Async("uploadThreadPool")
	public void parseUploadData(String realPath) throws ServerException {
		long start = System.currentTimeMillis();
		logger.info("开始解析excel数据:" + realPath);
		List<Map<String, String>> datalist = ExcelUtil.readExcelData(realPath);
		logger.info("解析excel数据完毕,总记录数={},耗时={}",datalist.size(),(System.currentTimeMillis()-start));
		start = System.currentTimeMillis();
		logger.info("excel数据开始入库......");
		for (Map<String, String> map : datalist) {
			String patentId = map.get(Constant.PATENT_ID);
			String patentName = map.get(Constant.PATENT_NAME) == null ? "" : map.get(Constant.PATENT_NAME);
			String patentStatusName = map.get(Constant.PATENT_STATUS) == null ? "" : map.get(Constant.PATENT_STATUS);
			String patentPrice = map.get(Constant.PATENT_PRICE) == null ? "" : map.get(Constant.PATENT_PRICE);
			String sellerContact = map.get(Constant.SELLER_CONTACT) == null ? "" : map.get(Constant.SELLER_CONTACT);
			String patentTypeName = map.get(Constant.PATENT_TYPE) == null ? "" : map.get(Constant.PATENT_TYPE);
			String publishTime = map.get(Constant.PUBLISH_TIME) == null ? "" : map.get(Constant.PUBLISH_TIME);
			String patentee = map.get(Constant.PATENTEE) == null ? "" : map.get(Constant.PATENTEE);
			String salesStatus = map.get(Constant.SALES_STATUS) == null ? "" : map.get(Constant.SALES_STATUS);
			String contact = map.get(Constant.CONTACT) == null ? "" : map.get(Constant.CONTACT);

			try {
				String publishYear = getPublishYearByPatentId(patentId);
				String patentStatus = getPatentStatus(patentStatusName);
				Integer patentType = getPatentType(patentTypeName.trim());
				String price = getPatentPrice(patentPrice).trim();
				if ("000".equals(price.trim()) || StringUtil.isEmpty(price.trim())) {
					price = "0";
				} else {
					price = price.replaceAll(".", "").replaceAll("裸", "").replaceAll("w", "").replaceAll("（）", "");
					price = price.replace("（）", "").replace("裸", "").replace("w", "");
				}
				try {
					price = String.valueOf(Integer.parseInt(price));
				} catch (Exception e) {
					price = "0";
				}
				if (StringUtil.isNotEmpty(patentId)) {
					PatentModel patentModel = new PatentModel(patentId, patentName, patentType, patentTypeName.trim(), patentStatus,
							patentStatusName, price, publishYear, publishTime, ResourceHandler.get("user_qq"),ResourceHandler.get("user_wx"),sellerContact, patentee, salesStatus, contact);
					logger.info("清洗过后的专利数据:" + patentModel);
					patentDAO.savePatents(patentModel);
					try {
						int year = Integer.parseInt(publishYear);
						Calendar calendar = Calendar.getInstance();
						int currentYear = calendar.get(Calendar.YEAR);
						if (year <= currentYear && year >= 1970) {
							ParamRequest paramRequest = new ParamRequest();
							paramRequest.setParamType(Constant.PUBLISH_YEAR_TYPE);
							paramRequest.setParamName(publishYear);
							paramDAO.updateParams(paramRequest);
						}
					} catch (Exception e) {
						logger.error("垃圾数据不入库:"+e);
					}
					hotWordQueueService.putToQueue(patentName);
				}
			} catch (Exception e) {
				logger.error("数据导入异常:"+e);
			}
		}
		logger.info("excel数据开始入库完成,耗时={}",(System.currentTimeMillis()-start));
		try {
			String[] adminEmails = StringUtils.commaDelimitedListToStringArray(ResourceHandler.get("admin_email"));
			mailTemplate.sendTextMail(adminEmails, "江西集睿系统邮件", "数据已经导入完成.");
			logger.info("系统通知邮件发送成功{}", adminEmails.toString());
		} catch (Exception e) {
			logger.error("系统通知邮件发送失败:" + e);
		}
		
	}

	/**
	 * 
	 * @param patentPrice
	 * @return
	 */
	private String getPatentPrice(String patentPrice) {
		if (StringUtil.isNotEmpty(patentPrice)) {
			patentPrice = patentPrice.trim();
			if (patentPrice.contains("万")) {
				patentPrice = patentPrice.replace("万", "0000");
				if (patentPrice.indexOf(".") > -1) {
					patentPrice = patentPrice.replaceAll(".", "");
				}
				return patentPrice.replaceAll("裸价", "");
			} else if (patentPrice.contains("裸价")) {
				patentPrice = patentPrice.replaceAll("裸价", "");
				if (patentPrice.indexOf("w") > -1) {
					patentPrice = patentPrice.replaceAll("w", "0000");
				} else {
					patentPrice = patentPrice.replaceAll("W", "0000");
				}
				if (patentPrice.indexOf(".") > -1) {
					patentPrice = patentPrice.replaceAll(".", "");
				}
				return patentPrice;
			} else if (patentPrice.contains("w") || patentPrice.contains("W")) {
				if (patentPrice.indexOf("w") > -1) {
					patentPrice = patentPrice.replaceAll("w", "0000");
				} else {
					patentPrice = patentPrice.replaceAll("W", "0000");
				}
				if (patentPrice.indexOf(".") > -1) {
					patentPrice = patentPrice.replaceAll(".", "");
				}
				if (patentPrice.indexOf("裸") > -1) {
					patentPrice = patentPrice.replaceAll("裸", "");
				}
				return patentPrice;
			} else if (patentPrice.contains("(") || patentPrice.contains("（")) {
				int startIndex = patentPrice.indexOf("(");
				if (startIndex > -1) {
					patentPrice = patentPrice.substring(0, startIndex);
				} else {
					startIndex = patentPrice.indexOf("（");
					patentPrice = patentPrice.substring(0, startIndex);
				}
				if (patentPrice.indexOf(".") > -1) {
					patentPrice = patentPrice.replaceAll(".", "");
				}
				return patentPrice;
			} else if (patentPrice.contains("元")) {
				if (patentPrice.indexOf(".") > -1) {
					patentPrice = patentPrice.replaceAll(".", "");
				}
				return patentPrice.replaceAll("元", "");
			} else if (patentPrice.contains("裸")) {
				if (patentPrice.indexOf(".") > -1) {
					patentPrice = patentPrice.replaceAll(".", "");
				}
				return patentPrice.replaceAll("裸", "");
			} else if (patentPrice.contains("包恢复")) {
				if (patentPrice.indexOf(".") > -1) {
					patentPrice = patentPrice.replaceAll(".", "");
				}
				return patentPrice.replaceAll("包恢复", "");
			} else if (patentPrice.indexOf(".") > -1) {
				patentPrice = patentPrice.replaceAll(".", "")+"000";
				return patentPrice;
			} else {
				return "0";
			}
		} else {
			return "0";
		}
	}

	/**
	 * 发布年份
	 * 
	 * @param patentId
	 * @return
	 */
	private String getPublishYearByPatentId(String patentId) {
		return patentId.trim().substring(0, 4);
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
	private Integer getPatentType(String patentTypeName) {
		if ("发明".equals(patentTypeName)) {
			return 0;
		} else if ("实用".equals(patentTypeName)) {
			return 1;
		} else {
			return 2;
		}
	}

}
