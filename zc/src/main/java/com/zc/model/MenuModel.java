package com.zc.model;

import java.io.Serializable;

public class MenuModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer menuID;

	private String menuLogo;

	private String menuName;

	private String menuPath;

	public Integer getMenuID() {
		return menuID;
	}

	public void setMenuID(Integer menuID) {
		this.menuID = menuID;
	}

	public String getMenuLogo() {
		return menuLogo;
	}

	public void setMenuLogo(String menuLogo) {
		this.menuLogo = menuLogo;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getMenuPath() {
		return menuPath;
	}

	public void setMenuPath(String menuPath) {
		this.menuPath = menuPath;
	}

}
