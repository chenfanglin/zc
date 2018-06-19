package com.zc.model;

import java.util.List;

public class IDataModel {

	private List<HotWord> wordList;

	private String dataType;

	private String appCode;

	private String version;

	public List<HotWord> getWordList() {
		return wordList;
	}

	public void setWordList(List<HotWord> wordList) {
		this.wordList = wordList;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getAppCode() {
		return appCode;
	}

	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

}
