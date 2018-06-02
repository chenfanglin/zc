package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.model.PatentModel;

@Repository
public interface PatentDAO {

	public List<PatentModel> queryPatentList();
}
