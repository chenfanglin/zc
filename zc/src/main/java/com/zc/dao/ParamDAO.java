package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.model.KeyValue;
import com.zc.req.ParamRequest;

@Repository
public interface ParamDAO {

	public List<KeyValue> queryKeyValues(ParamRequest paramRequest);
	
	public void updateParams(ParamRequest paramRequest);
}
