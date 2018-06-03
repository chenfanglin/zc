package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.model.PatentModel;
import com.zc.req.BaseRequest;

@Repository
public interface PatentDAO {

	public List<PatentModel> queryPatentList(BaseRequest baseRequest);
	
	public int queryPatentCount(BaseRequest baseRequest);
	
	public void insertParent(PatentModel patentModel);
	
}
