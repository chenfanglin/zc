package com.zc.common;

import java.util.Collections;

import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.zc.constant.StatusCode;
import com.zc.util.JsonUtils;
import com.zc.util.ServerUtil;

@Component
@Aspect
public class MainAspect {

	@Around(value = "execution(public java.lang.Object com.zc.controller..*.*(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse) throws java.lang.Exception)")
	public void aroundMethod(ProceedingJoinPoint jp) throws Throwable {
		CommonResponse commonResponse = new CommonResponse();
		HttpServletResponse response = (HttpServletResponse) jp.getArgs()[1];
		try {
			Object obj = jp.proceed();
			obj = obj == null ? Collections.EMPTY_LIST : obj;
			commonResponse.setContent(obj);
		} catch (Exception e) {
			commonResponse.setStatusCode(StatusCode.SERVER_ERROR);
			commonResponse.setContent("服务器繁忙,请稍后再试。");
		} finally {
			String responseJson = JsonUtils.objectToJson(commonResponse);
			ServerUtil.writeToResponse(response, commonResponse.getStatusCode(), responseJson);
		}
	}
}
