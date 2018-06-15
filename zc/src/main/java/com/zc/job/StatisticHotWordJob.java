package com.zc.job;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

public class StatisticHotWordJob {

	private static final ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(4);
	
	@PostConstruct
	public void start() {
		scheduledExecutorService.scheduleAtFixedRate(new Runnable() {
			
			@Override
			public void run() {
				
			}
		}, 1, 1000, TimeUnit.SECONDS);
	}
}
