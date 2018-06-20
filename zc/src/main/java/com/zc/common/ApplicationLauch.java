package com.zc.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

import com.zc.dao.PatentDAO;
import com.zc.service.HotWordQueueService;

@SuppressWarnings("rawtypes")
@Service
public class ApplicationLauch implements ApplicationListener {

	@Autowired
	private PatentDAO patentDAO;
	
	@Autowired
	private HotWordQueueService hotWordQueueService;
	
	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		// 容器启动完成以后
		if (event instanceof ContextRefreshedEvent) {

			ContextRefreshedEvent refreshedEvent = (ContextRefreshedEvent) event;
			// root application context
			if (refreshedEvent.getApplicationContext().getParent() != null) {
				try {
					ResourceHandler.reloadConfig();
//					new Thread() {
//						@Override
//						public void run() {
//							List<String> list = patentDAO.getAllPatentName();
//							for (String patentName : list) {
//								hotWordQueueService.putToQueue(patentName);
//								try {
//									Thread.sleep(3000);
//								} catch (InterruptedException e) {
//									e.printStackTrace();
//								}
//							}
//						}
//					}.start();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	

}
