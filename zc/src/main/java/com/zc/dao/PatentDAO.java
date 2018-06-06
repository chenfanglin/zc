package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.exception.ServerException;
import com.zc.model.PatentModel;
import com.zc.req.BaseRequest;

@Repository
public interface PatentDAO {

	public List<PatentModel> queryPatentList(BaseRequest baseRequest) throws ServerException;
	
	public int queryPatentCount(BaseRequest baseRequest) throws ServerException;
	
	public void insertParent(PatentModel patentModel) throws ServerException;
	
}
