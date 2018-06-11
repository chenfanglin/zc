package com.zc.controller;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zc.common.ResourceHandler;
import com.zc.constant.StatusCode;
import com.zc.exception.ServerException;
import com.zc.service.UploadService;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class UploadController {

	private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

	@Autowired
	private UploadService uploadService;
	
	@RequestMapping("/admin/upload_patents")
	public Object batchUploadPatents(HttpServletRequest request, HttpServletResponse response) throws ServerException {
		MultipartHttpServletRequest r = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = r.getFileMap();
		for (Map.Entry<String, MultipartFile> entry : fileMap.entrySet()) {
			MultipartFile myfile = entry.getValue();
			// 如果用的是Tomcat服务器，则文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\WEB-INF\\upload\\文件夹中
			String realPath = request.getSession().getServletContext().getRealPath("//upload").replace("\\", "/");
			// 这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的
			try {
				FileUtils.copyInputStreamToFile(myfile.getInputStream(),
						new File(realPath, myfile.getOriginalFilename()));
				logger.info("文件存储目录:" + realPath);
				uploadService.parseUploadData(realPath);
			} catch (IOException e) {
				logger.info("专利列表上传异常:" + e);
			}
		}
		return ResourceHandler.get(String.valueOf(StatusCode.READY_UPLOAD));
	}
}
