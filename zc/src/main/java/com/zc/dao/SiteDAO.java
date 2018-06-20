package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.model.ConfigManager;

@Repository
public interface SiteDAO {
	
	public List<ConfigManager> queryLables();

}
