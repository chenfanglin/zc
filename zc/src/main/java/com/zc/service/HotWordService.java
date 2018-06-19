package com.zc.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zc.cache.ConcurrentLRUHashMap;
import com.zc.common.ResourceHandler;
import com.zc.httpclient.HttpClientService;
import com.zc.httpclient.HttpResult;
import com.zc.model.HotWord;
import com.zc.model.IDataModel;
import com.zc.util.JsonUtils;

@Service
public class HotWordService {

	private static final Logger logger = LoggerFactory.getLogger(HotWordService.class);
	
	@Autowired
	private HttpClientService httpClientService;

	private static final ConcurrentLRUHashMap<String, Integer> LRU_MAP = new ConcurrentLRUHashMap<String, Integer>();

	/**
	 * 解析出分词
	 * @param text
	 */
	public void parseHotWord(String text) {
		Map<String, String> map = new HashMap<>();
		map.put("text", text);
		try {
			HttpResult result = httpClientService.doPost(ResourceHandler.get("hot_word_url"), map);
			if (result.getStatus().intValue() == 200) {
				logger.info("result:" + result);
				if (result != null && result.getData() != null) {
					IDataModel iDataModel = JsonUtils.jsonToObject(result.getData(), IDataModel.class);
					List<HotWord> wordList = iDataModel.getWordList();
					for (HotWord hotWord : wordList) {
						try {
							if (hotWord.getLength().intValue() == 2 || hotWord.getLength().intValue() == 3) {
								String word = hotWord.getWord();
								Integer count = LRU_MAP.get(word);
								if (count != null) {
									LRU_MAP.put(word, ++count);
								} else {
									LRU_MAP.put(word, 1);
								}
							}
						} catch (Exception e) {
							logger.error("解析热门词汇{}异常{}" , hotWord,e);
						}
						
					}
				}
			}
		} catch (Exception e) {
			logger.error("获取热门词汇异常:" + e);
		}
	}
	
	/**
	 * 获取热门词汇
	 * @return
	 */
	public Set<String> getHotWords() {
		Set<String> sets = new HashSet<>(100);
		int i = 0;
		for (Map.Entry<String, Integer> entry : LRU_MAP.entrySet()) {
			if (i == 100) {
				break;
			} else {
				sets.add(entry.getKey());
				i++;
			}
		}
		return sets;
	}
	
}
