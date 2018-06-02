package com.zc.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

public class ServerUtil {

	private static final String CONTENT_TYPE_JSON = "application/json; charset=utf-8";
	
	public static void writeToResponse(HttpServletResponse response, int httpStatusCode, String body) {
		response.setContentType(CONTENT_TYPE_JSON);
		response.setStatus(httpStatusCode);
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			writer.write(body);
			writer.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (writer != null) {
				writer.close();
			}
		}
	}
}
