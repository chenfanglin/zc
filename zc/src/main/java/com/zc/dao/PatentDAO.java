package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.exception.ServerException;
import com.zc.model.PatentModel;
import com.zc.req.PatentParam;

@Repository
public interface PatentDAO {

	public List<PatentModel> queryPatentList(PatentParam baseRequest) throws ServerException;
	
	public int queryPatentCount(PatentParam patentParam) throws ServerException;
	
	public void insertPatent(PatentModel patentModel) throws ServerException;
	
	public void delPatent(PatentModel model) throws ServerException;
	
	public void updatePatent(PatentModel patentModel) throws ServerException;
	
	public void savePatents(PatentModel patentModel) throws ServerException;
	
	public List<String> getAllPatentName();
}
