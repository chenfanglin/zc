package com.zc.common;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

@SuppressWarnings("rawtypes")
@Service
public class ApplicationLauch implements ApplicationListener {

	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		// 容器启动完成以后
		if (event instanceof ContextRefreshedEvent) {

			ContextRefreshedEvent refreshedEvent = (ContextRefreshedEvent) event;
			// root application context
			if (refreshedEvent.getApplicationContext().getParent() != null) {
				try {
					ResourceHandler.reloadConfig();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

}
