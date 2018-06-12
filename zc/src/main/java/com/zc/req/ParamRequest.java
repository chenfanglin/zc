package com.zc.req;

public class ParamRequest extends BaseRequest{

	private Integer paramType;
	
	private String paramName;

	public Integer getParamType() {
		return paramType;
	}

	public void setParamType(Integer paramType) {
		this.paramType = paramType;
	}

	public String getParamName() {
		return paramName;
	}

	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	
	
}
