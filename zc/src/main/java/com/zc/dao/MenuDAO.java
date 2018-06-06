package com.zc.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zc.model.MenuModel;

@Repository
public interface MenuDAO {

	public List<MenuModel> queryMenuList();
}
