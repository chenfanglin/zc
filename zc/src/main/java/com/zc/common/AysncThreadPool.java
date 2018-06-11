package com.zc.common;

import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

@Component
@EnableAsync
public class AysncThreadPool {

	@Bean(name = "uploadThreadPool")
	public ThreadPoolTaskExecutor getAsyncHttpThreadPool() {
		ThreadPoolTaskExecutor threadPoolTaskExecutor = new ThreadPoolTaskExecutor();
		threadPoolTaskExecutor.setCorePoolSize(Runtime.getRuntime().availableProcessors() * 4);
		threadPoolTaskExecutor.setMaxPoolSize(Runtime.getRuntime().availableProcessors() * 4);
		threadPoolTaskExecutor.setQueueCapacity(1024);
		return threadPoolTaskExecutor;
	}

}
