package com.zc.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.zc.common.MailTemplate;
import com.zc.controller.UploadController;
import com.zc.dao.PatentDAO;
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
	 */
	@Async("uploadThreadPool")
	public void parseUploadData(String realPath) {
		List<Map<String, String>> datalist = ExcelUtil.readExcelData(realPath);
		System.out.println(datalist);
	}
}
