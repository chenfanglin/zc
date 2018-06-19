package com.zc.service;

import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tk.mybatis.mapper.util.StringUtil;

@Service
public class HotWordQueueService {
	
	private static final Logger logger = LoggerFactory.getLogger(HotWordQueueService.class);
	
	private static final ScheduledExecutorService SCHEDULED_EXECUTOR_SERVICE = Executors.newScheduledThreadPool(1);

	private static final LinkedBlockingQueue<String> HOT_WORD_QUEUE = new LinkedBlockingQueue<>();
	
	@Autowired
	private HotWordService hotWordService;
	
	public void putToQueue(String hotWord) {
		try {
			HOT_WORD_QUEUE.put(hotWord);
		} catch (InterruptedException e) {
			logger.error("保存到队列异常:" + e);
		}
	}
	
	@PostConstruct
	public void start() {
		SCHEDULED_EXECUTOR_SERVICE.scheduleAtFixedRate(new Runnable() {
			
			@Override
			public void run() {
				processMsg();
			}
		}, 100, 200, TimeUnit.MILLISECONDS);
	}
	
	private void processMsg() {
		if (HOT_WORD_QUEUE.size() > 0) {
			try {
				String hotWord = HOT_WORD_QUEUE.poll(3, TimeUnit.SECONDS);
				if (StringUtil.isNotEmpty(hotWord)) {
					hotWordService.parseHotWord(hotWord);
				}
			} catch (InterruptedException e) {
				logger.error("消费队列数据异常:" + e);
			}
		}
	}
}
