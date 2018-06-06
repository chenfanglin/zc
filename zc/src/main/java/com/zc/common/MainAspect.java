package com.zc.common;

import java.util.Collections;

import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.zc.constant.StatusCode;
import com.zc.exception.ServerException;
import com.zc.util.JsonUtils;
import com.zc.util.ServerUtil;

@Component
@Aspect
public class MainAspect {

	
	@Around(value = "execution(public java.lang.Object com.zc.controller..*.*(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse) throws com.zc.exception.ServerException)")
	public void aroundMethod(ProceedingJoinPoint jp) throws Throwable {
		int httpStatusCode = StatusCode.SUCCESS;
		CommonResponse commonResponse = new CommonResponse();
		HttpServletResponse response = (HttpServletResponse) jp.getArgs()[1];
		try {
			Object obj = jp.proceed();
			obj = obj == null ? Collections.EMPTY_LIST : obj;
			commonResponse.setContent(obj);
		} catch (ServerException e) {
			commonResponse.setStatusCode(e.getStatusCode());
			commonResponse.setContent(ResourceHandler.get(String.valueOf(e.getStatusCode())));
			e.printStackTrace();
		} catch (Exception e) {
			commonResponse.setStatusCode(StatusCode.SERVER_ERROR);
			commonResponse.setContent("服务器繁忙,请稍后再试。");
			httpStatusCode = StatusCode.SERVER_ERROR;
			e.printStackTrace();
		} finally {
			String responseJson = JsonUtils.objectToJson(commonResponse);
			ServerUtil.writeToResponse(response, httpStatusCode, responseJson);
		}
	}
}
