package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.exception.ServerException;
import com.zc.model.PatentModel;
import com.zc.req.PatentParam;

@Repository
public interface PatentDAO {

	public List<PatentModel> queryPatentList(PatentParam baseRequest) throws ServerException;
	
	public int queryPatentCount() throws ServerException;
	
	public void insertParent(PatentModel patentModel) throws ServerException;
	
	public void delParent(PatentModel model) throws ServerException;
	
	public void updateParent(PatentModel patentModel) throws ServerException;
}
