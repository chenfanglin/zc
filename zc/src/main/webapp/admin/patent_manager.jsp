<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>江西集睿-专利管理</title>
<%@ include file="../includes/head.jsp"%>
<link href="../assets/bootstrap/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<link href="../assets/bootstrap/css/fileinput.css" rel="stylesheet">
</head>
<body>
	<div id="wrapper">
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<%@ include file="../includes/header.jsp"%>
			<%@ include file="../includes/menu.jsp"%>
		</nav>
		<div class="filterwrapper">
			<button type="button" onclick="controlfilter()"
				class="btn btn-default filterbtnborder" id="filterBtn">
				筛选过滤&nbsp;&nbsp; <span id="iconbtn" class="up-icon"></span>
			</button>
<!-- 			<div class="ta_date filterbtnmenu" id="div_date_value"> -->
<!-- 				<span class="date_title" id="datevalue"></span> <a class="opt_sel" -->
<!-- 					id="datetrigger" href="javascript:void(0)"> <i -->
<!-- 					class="glyphicon glyphicon-calendar"></i> -->
<!-- 				</a> -->
<!-- 			</div> -->
			<div class="filterpanel" style="width: 78%">
				<form class="form-horizontal">
					<div class="form-group  form-group-sm">
						<label class="col-sm-1 control-label">专利类型</label>
						<div class="col-sm-3">
							<select class="form-control" id="patentTypeFilter">
								<option value="">全部</option>
								<option value="0">发明</option>
								<option value="1">实用</option>
								<option value="2">外观</option>
							</select>
						</div>
						<label class="col-sm-1 control-label">专利状态</label>
						<div class="col-sm-3">
							<select class="form-control" id="patentStatusFilter">
								<option value="">全部</option>
								<option value="0">未下证</option>
								<option value="1">下证</option>
								<option value="2">未授权</option>
							</select>
						</div>
						<label class="col-sm-1 control-label">是否批量</label>
						<div class="col-sm-3">
							<select class="form-control" id="isBatchFilter">
								<option value="">全部</option>
								<option value="0">批量</option>
								<option value="1">不批量</option>
							</select>
						</div>
					</div>
				</form>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="confirm" class="btn btn-primary">确定</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
			<div class="pull-right search btngroup-right-padding">
				<input id="serachPatents" class="form-control" type="text"
					placeholder="搜索专利名称">
			</div>
			<div class="pull-right btngroup-right-padding">
				<button type="button" id="createPatent" class="btn btn-success">
					<span class="glyphicon glyphicon-plus">新增专利</span>
				</button>
			</div>
			<div class="pull-right btngroup-right-padding">
				<button type="button" id="uploadPatent" class="btn btn-success">
					<span class="glyphicon glyphicon-plus">批量上传</span>
				</button>
			</div>
		</div>
		<div id="page-wrapper">
			<div class="container-fluid">
				<div class="col-lg-12">
					<table id="patentData">
						<thead>
							<tr>
								<th data-sortable="false" data-width="5%"
									data-field="patentId">专利号</th>
								<th data-sortable="false" data-width="7%" data-field="patentName">专利名称</th>
								<th data-sortable="false" data-width="5%"
									data-field="patentTypeName">专利类型</th>
								<th data-sortable="false" data-width="5%" data-field="patentStatusName">专利状态</th>
								<th data-sortable="false" data-width="5%" data-field="patentPrice">专利价格</th>
								<th data-sortable="false" data-width="5%"
									data-field="industryName">行业</th>
								<th data-sortable="false" data-width="5%"
									data-field="isBatchName">是否批量</th>
								<th data-sortable="false" data-width="5%"
									data-field="publishYear">年份</th>
								<th data-sortable="false" data-width="5%"
									data-field="publishTime">发布时间</th>
								<th data-sortable="false" data-width="5%"
									data-field="patentee">专利权人</th>
								<th data-sortable="false" data-width="5%"
									data-field="salesStatus">销售状态</th>
								<th data-sortable="false" data-width="5%"
									data-field="userQQ">联系QQ</th>
									<th data-sortable="false" data-width="5%"
									data-field="userWX">联系微信</th>
								<th data-sortable="false" data-align="center" data-width="5%"
									data-formatter="formatterSwitch" data-events="showEvents">专利显示状态</th>
								<th data-sortable="false" data-align="center" data-width="5%"
									data-formatter="formatterEdit" data-events="patentEvents">操作</th>
									
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- 新增专利-->
	<div class="modal bs-example-modal-lg" id="addPatentModal" tabindex="-1"
		role="dialog" aria-labelledby="addPatentLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="addPatentLabel">新增专利</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label">发布时间:</label>
							<div class="col-sm-4 input-append date"
								data-date-format="yyyy-MM-dd HH:mm:ss">
								<input id="publishTime" type="text" class="form-control">
							</div>
							<label for="inputPatentId" class="col-sm-2 control-label">专利号:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentId"
									placeholder="专利号">
							</div>
						</div>
						<div class="form-group">
							<label for="inputPatentName" class="col-sm-2 control-label">专利名称:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentName"
									placeholder="专利名称">
							</div>
							<label class="col-sm-2 control-label">专利类型:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputPatentType">
									<option value="-1">请选择</option>
									<option value="0">发明</option>
									<option value="1">实用</option>
									<option value="2">外观</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="inputPatentPrice" class="col-sm-2 control-label">专利价格:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentPrice"
									placeholder="专利价格">
							</div>
							<label class="col-sm-2 control-label">专利状态:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputPatentStatus">
									<option value="-1">请选择</option>
									<option value="0">未下证</option>
									<option value="1">下证</option>
									<option value="2">未授权</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">是否批量:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputIsBatch">
									<option value="-1">请选择</option>
									<option value="0">批量</option>
									<option value="1">不批量</option>
								</select>
							</div>
							<label class="col-sm-2 control-label">行业:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputIndustry">
									<option value="-1">请选择</option>
									<option value="0">计算机</option>
									<option value="1">智能AI</option>
									<option value="2">教育</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="inputQQ" class="col-sm-2 control-label">QQ:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputQQ"
									placeholder="QQ">
							</div>
							<label for="inputWX" class="col-sm-2 control-label">微信:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputWX"
									placeholder="微信">
							</div>
						</div>
						<div class="form-group">
							<label for="inputPublishYear" class="col-sm-2 control-label">年份:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPublishYear"
									placeholder="年份">
							</div>
							<label for="inputPatentUrl" class="col-sm-2 control-label">跳转链接:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentUrl"
									placeholder="跳转链接">
							</div>
						</div>
						
						<div class="form-group">
							<label for="inputPatentee" class="col-sm-2 control-label">专利权人:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentee"
									placeholder="专利权人">
							</div>
							<label for="inputSalesStatus" class="col-sm-2 control-label">销售状态:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputSalesStatus"
									placeholder="销售状态">
							</div>
						</div>
						<div class="form-group">
							<label for="inputSellerContact" class="col-sm-2 control-label">卖家联系人:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputSellerContact"
									placeholder="卖家联系人">
							</div>
							<label for="inputContact" class="col-sm-2 control-label">联系人:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputContact"
									placeholder="联系人">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="addPatent" class="btn btn-primary">确定</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改专利-->
	<div class="modal bs-example-modal-lg" id="updatePatentModal" tabindex="-1"
		role="dialog" aria-labelledby="updatePatentLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="updatePatentLabel">编辑专利</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label">发布时间:</label>
							<div class="col-sm-4 input-append date"
								data-date-format="yyyy-MM-dd HH:mm:ss">
								<input id="publishTime1" type="text" class="form-control">
							</div>
							<label for="inputPatentId1" class="col-sm-2 control-label">专利号:</label>
							<div class="col-sm-4">
								<input type="text" readonly="readonly" required="required" class="form-control" id="inputPatentId1"
									placeholder="专利号">
							</div>
						</div>
						<div class="form-group">
							<label for="inputPatentName1" class="col-sm-2 control-label">专利名称:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentName1"
									placeholder="专利名称">
							</div>
							<label class="col-sm-2 control-label">专利类型:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputPatentType1">
									<option value="-1">请选择</option>
									<option value="0">发明</option>
									<option value="1">实用</option>
									<option value="2">外观</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="inputPatentPrice1" class="col-sm-2 control-label">专利价格:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentPrice1"
									placeholder="专利价格">
							</div>
							<label class="col-sm-2 control-label">专利状态:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputPatentStatus1">
									<option value="-1">请选择</option>
									<option value="0">未下证</option>
									<option value="1">下证</option>
									<option value="2">未授权</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">是否批量:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputIsBatch1">
									<option value="-1">请选择</option>
									<option value="0">批量</option>
									<option value="1">不批量</option>
								</select>
							</div>
							<label class="col-sm-2 control-label">行业:</label>
							<div class="col-sm-4">
								<select class="form-control" id="inputIndustry1">
									<option value="-1">请选择</option>
									<option value="0">计算机</option>
									<option value="1">智能AI</option>
									<option value="2">教育</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="inputQQ1" class="col-sm-2 control-label">QQ:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputQQ1"
									placeholder="QQ">
							</div>
							<label for="inputWX1" class="col-sm-2 control-label">微信:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputWX1"
									placeholder="微信">
							</div>
						</div>
						<div class="form-group">
							<label for="inputPublishYear1" class="col-sm-2 control-label">年份:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPublishYear1"
									placeholder="年份">
							</div>
							<label for="inputPatentUrl1" class="col-sm-2 control-label">跳转链接:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentUrl1"
									placeholder="跳转链接">
							</div>
						</div>
						
						<div class="form-group">
							<label for="inputPatentee1" class="col-sm-2 control-label">专利权人:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputPatentee1"
									placeholder="专利权人">
							</div>
							<label for="inputSalesStatus1" class="col-sm-2 control-label">销售状态:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputSalesStatus1"
									placeholder="销售状态">
							</div>
						</div>
						<div class="form-group">
							<label for="inputSellerContact1" class="col-sm-2 control-label">卖家联系人:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputSellerContact1"
									placeholder="卖家联系人">
							</div>
							<label for="inputContact1" class="col-sm-2 control-label">联系人:</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputContact1"
									placeholder="联系人">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="updatePatent" class="btn btn-primary">确定</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 批量上传-->
	<div class="modal bs-example-modal-lg" id="uploadPatentModal" tabindex="-1"
		role="dialog" aria-labelledby="uploadPatentLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="uploadPatentLabel">批量上传</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<div style="margin-left: 6%">
								<div class="col-sm-6">
									<input id="uploadPatents" type="file" class="file-loading"
										name="uploadPatents">
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<%@ include file="../includes/updatePwd.jsp"%>
	<%@ include file="../includes/footer.jsp"%>
	<script src="../assets/bootstrap/js/bootstrap-datetimepicker.min.js"></script>
	<script src="../assets/bootstrap/js/fileinput.js"></script>
	<script src="../assets/script/patent_manager.js?v=20180613001"></script>
</body>

</html>
