package com.zc.common;

import java.util.Enumeration;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ResourceHandler {

	private static final Logger logger = LoggerFactory.getLogger(ResourceHandler.class);

	private static Map<String, String> map = new ConcurrentHashMap<String, String>();

	public static synchronized void reloadConfig() {
		Properties properties = new Properties();
		try {
			properties.load(ResourceHandler.class.getClassLoader().getResourceAsStream("config.properties"));
			Enumeration<?> kvs = properties.propertyNames();// 得到配置文件的名字
			while (kvs.hasMoreElements()) {
				String k = (String) kvs.nextElement();
				String v = properties.getProperty(k);
				map.put(k, v);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.info("load config:" + map);
	}
	
	public static String get(Object key) {
		return map.get(key);
	}

}
