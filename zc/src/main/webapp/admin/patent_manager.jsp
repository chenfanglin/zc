<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DataEye-客户信息</title>
<%@ include file="../includes/head.jsp"%>
<link href="../assets/bootstrap/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
</head>
<body>
	<div id="wrapper">
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<%@ include file="../includes/header.jsp"%>
			<%@ include file="../includes/menu.jsp"%>
		</nav>
		<div class="btngroup-left-padding">
			<button type="button" class="btn btn-default" id="allbtn">
				<span class="glyphicon glyphicon-menu-hamburger btn-all-highlight">全部信息</span>
				<!-- #6A6AFF -->
			</button>
			<button type="button" class="btn btn-default" id="focusbtn">
				<span class="glyphicon glyphicon-star btn-grayed">重点关注</span>
				<!-- #73BF00 -->
			</button>
			<div class="pull-right search btngroup-right-padding">
				<input id="serachCustomer" class="form-control" type="text"
					placeholder="搜索">
			</div>
		</div>
		<div id="page-wrapper">
			<div class="container-fluid">
				<div class="col-lg-12">
					<table id="customerData">
						<thead>
							<tr>
								<th data-sortable="true" data-width="12%"
									data-field="customerName" data-formatter="formatterCustomer"
									data-events="customerNameEvents">客户名称</th>
								<th data-sortable="false" data-field="personID"
									data-formatter="formatterFocus"></th>
								<th data-sortable="true" data-field="industrialName">产业链</th>
								<th data-sortable="true" data-field="customerRankName">客户等级</th>
								<th data-sortable="true" data-field="customerStatusName">客户状态</th>
								<th data-sortable="true" data-field="countryName">国家</th>
								<th data-sortable="true" data-field="areaName">区域</th>
								<th data-sortable="true" data-field="cityName">城市</th>
								<th data-sortable="false" data-align="center"
									data-formatter="formatterDetail" data-events="detailEvents">联系信息</th>
								<th data-sortable="true" data-field="regcompany">注册公司</th>
								<th data-sortable="true" data-field="platform">接入平台</th>
								<th data-sortable="true" data-field="returnDate">回传日期</th>
								<th data-sortable="true" data-field="createDate">注册日期</th>
								<th data-sortable="true" data-field="businessName"
									data-formatter="formatterBusiness" data-events="businessEvents">商务</th>
								<th data-sortable="true" data-field="operationName"
									data-formatter="formatterOperation"
									data-events="operationEvents">运营</th>
								<th data-sortable="false" data-align="center" data-width="5%"
									data-formatter="formatterCUD" data-events="customerEvents">操作</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="modal bs-example-modal-lg" id="editCustomer" tabindex="-1"
		role="dialog" aria-labelledby="customerLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="customerLabel">编辑客户信息</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label for="inputcustomerName" class="col-sm-2 control-label">客户名称</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputcustomerName"
									placeholder="客户名称">
							</div>
							<label class="col-sm-2 control-label">产业链</label>
							<div class="col-sm-4">
								<select class="form-control" id="industrialSelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">客户等级</label>
							<div class="col-sm-4">
								<select class="form-control" id="customerRankSelect"></select>
							</div>
							<label class="col-sm-2 control-label">国家</label>
							<div class="col-sm-4">
								<select class="form-control" id="countrySelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label for="inputdepartment" class="col-sm-2 control-label">地区</label>
							<div class="col-sm-4">
								<select class="form-control" id="areaSelect"></select>
							</div>
							<label for="inputdepartment" class="col-sm-2 control-label">城市</label>
							<div class="col-sm-4">
								<select class="form-control" id="citySelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">商务</label>
							<div class="col-sm-4">
								<select class="form-control" id="businessSelect"></select>
							</div>
							<label class="col-sm-2 control-label">运营</label>
							<div class="col-sm-4">
								<select class="form-control" id="operationSelect"></select>
							</div>
						</div>
						<div class="form-group">
                            <label class="col-sm-2 control-label">客户状态</label>
                            <div class="col-sm-4">
                                <select class="form-control" id="customerStatusSelect"></select>
                            </div>
                        </div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="saveCustomerInfo"
							class="btn btn-primary">确定</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 注册信息 -->
	<div class="modal bs-example-modal-lg" id="editRegInfo" tabindex="-1"
		role="dialog" aria-labelledby="regLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="regLabel">公司信息</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label text-right">公司注册信息</label>
						</div>
						<div class="form-group">
							<label for="inputcompanyName" class="col-sm-2 control-label">公司</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputcompanyName"
									placeholder="公司">
							</div>
							<label for="inputemail" class="col-sm-2 control-label">邮箱</label>
							<div class="col-sm-4">
								<input type="email" class="form-control" id="inputemail"
									placeholder="邮箱">
							</div>
						</div>
						<div class="form-group">
							<label for="inputname" class="col-sm-2 control-label">姓名</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputname"
									placeholder="姓名">
							</div>
							<label for="inputphoneNumber" class="col-sm-2 control-label">电话</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputphoneNumber"
									placeholder="电话">
							</div>
						</div>
						<div class="form-group">
							<label for="inputqq" class="col-sm-2 control-label">QQ</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputqq"
									placeholder="QQ">
							</div>
							<label for="inputregDate" class="col-sm-2 control-label">日期</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputregDate"
									placeholder="日期" readonly="readonly">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label text-right">业务设置</label>
						</div>
						<div class="form-group">
							<label for="inputgameNumber" class="col-sm-2 control-label">游戏个数</label>
							<div class="col-sm-4">
								<input type="text" class="form-control" id="inputgameNumber"
									placeholder="游戏个数">
							</div>
							<label class="col-sm-2 control-label">插件中心:</label>
							<div class="col-sm-4">
								<div class="switch">
									<input id="pluginswitch" type="checkbox" />
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="updateUser" class="btn btn-primary">确定</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 联系信息 -->
	<div class="modal bs-example-modal-lg" id="viewDetail" tabindex="0"
		role="dialog" aria-labelledby="detailLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 68%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="detailLabel">联系信息</h5>
				</div>
				<div class="modal-body">
					<table id="contactData">
						<thead>
							<tr>
								<th data-sortable="true" data-field="contactID">ID</th>
								<th data-sortable="true" data-field="name">联系人</th>
								<th data-sortable="true" data-field="office">所在职位</th>
								<th data-sortable="false" data-field="mobileNumber">手机号码</th>
								<th data-sortable="false" data-field="landlineNumber">座机号码</th>
								<th data-sortable="false" data-field="qq">QQ</th>
								<th data-sortable="false" data-field="weixin">微信</th>
								<th data-sortable="false" data-field="email">邮箱</th>
								<th data-sortable="false" data-align="center" data-width="5%"
									data-formatter="formatterCUD" data-events="contactsEvents">&nbsp;操作&nbsp;</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 新建联系人信息 -->
	<%@ include file="../includes/contactInfo.jsp"%>
	<!-- 现有联系人 -->
	<div class="modal bs-example-modal-lg" id="currentContacts" tabindex="0"
		role="dialog" aria-labelledby="currentLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 55%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="currentLabel">现有联系人</h5>
				</div>
				<div class="modal-body">
				<button type="button" style="margin-left: 8px" id="checkUser" class="btn btn-success"><i class="glyphicon glyphicon-ok"></i>添加</button>
			<div class="pull-right search btngroup-right-padding">
				<input id="serachContact" class="form-control" type="text"
					placeholder="搜索">
			</div>
					<table id="currentUsers">
						<thead>
							<tr>
								<th data-field="state" data-sortable="false" data-checkbox="true"></th>
								<th data-sortable="true" data-field="addTime">录入时间</th>
								<th data-sortable="true" data-field="name">联系人</th>
								<th data-sortable="true" data-field="customerName">所属公司</th>
								<th data-sortable="true" data-field="roleName">角色</th>
								<th data-sortable="true" data-field="office">职位</th>
								<th data-sortable="false" data-field="mobileNumber">手机</th>
								<th data-sortable="false" data-field="landlineNumber">座机</th>
								<th data-sortable="false" data-field="qq">QQ</th>
								<th data-sortable="false" data-field="weixin">微信</th>
								<th data-sortable="false" data-field="email">邮箱</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 游戏信息 -->
	<div class="modal bs-example-modal-lg" id="viewGameinfo" tabindex="-1"
		role="dialog" aria-labelledby="gameLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 64%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="gameLabel">游戏列表</h5>
				</div>
				<div class="modal-body">
					<table id="gameData">
						<thead>
							<tr>
								<th data-sortable="true" data-field="gameName">游戏名称</th>
								<th data-sortable="true" data-field="gameType">游戏类型</th>
								<th data-sortable="true" data-field="platformType">平台类型</th>
								<th data-sortable="false" data-field="sdkVersion">SDK版本</th>
								<th data-sortable="false" data-field="appID">APPID</th>
								<th data-sortable="true" data-field="createDate">创建时间</th>
								<th data-sortable="true" data-field="returnDate">回传日期</th>
								<th data-sortable="false" data-field="flag" data-width="8%"
									data-formatter="formatterSwitch" data-events="channelEvents">实时分渠道</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 渠道分析平台 -->
	<div class="modal bs-example-modal-lg" id="viewChannelinfo"
		tabindex="-1" role="dialog" aria-labelledby="channelLabel"
		aria-hidden="true">
		<div class="modal-dialog" style="width: 64%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="channelLabel">渠道分析平台</h5>
				</div>
				<div class="modal-body">
					<table id="channelData" data-toggle="table" data-search="true"
						data-show-columns="true" data-show-toggle="true">
						<thead>
							<tr>
								<th data-sortable="true" data-field="gameName">产品名称</th>
								<th data-sortable="true" data-field="platformType">平台类型</th>
								<th data-sortable="false" data-field="appID">APPID</th>
								<th data-sortable="true" data-field="createDate">创建时间</th>
								<th data-sortable="true" data-field="returnDate">回传日期</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- H52.0 -->
	<div class="modal bs-example-modal-lg" id="viewH5info"
		tabindex="-1" role="dialog" aria-labelledby="h5Label"
		aria-hidden="true">
		<div class="modal-dialog" style="width: 64%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="h5Label">H5游戏分析平台2.0</h5>
				</div>
				<div class="modal-body">
					<table id="h5Data" data-toggle="table" data-search="true"
						data-show-columns="true" data-show-toggle="true">
						<thead>
							<tr>
								<th data-sortable="true" data-field="gameName">游戏名称</th>
								<th data-sortable="true" data-field="gameType">游戏类型</th>
								<th data-sortable="false" data-field="appID">APPID</th>
								<th data-sortable="true" data-field="createDate">创建时间</th>
								<th data-sortable="true" data-field="returnDate">回传日期</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 商务跟进 -->
	<div class="modal bs-example-modal-lg" id="viewBusiness" tabindex="-1"
		role="dialog" aria-labelledby="businessLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 55%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="businessLabel">商务跟进详情</h5>
				</div>
				<div class="modal-body">
					<table id="businessData">
						<thead>
							<tr>
								<th data-sortable="true" data-field="businessID">ID</th>
								<th data-sortable="true" data-field="createDate">开始日期</th>
								<th data-sortable="true" data-field="cityValue">城市</th>
								<th data-sortable="true" data-field="clueValue">线索状态</th>
								<th data-sortable="true" data-field="dataStatusValue">数据状态</th>
								<th data-sortable="false" data-field="communicateStatus">沟通状态</th>
								<th data-sortable="false" data-field="operate"
									data-formatter="formatterCUD" data-events="businessInfoEvents">&nbsp;操作&nbsp;</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 运营跟进 -->
	<div class="modal bs-example-modal-lg" id="viewOperation" tabindex="-1"
		role="dialog" aria-labelledby="operationLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 68%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="operationLabel">运营跟进详情</h5>
				</div>
				<div class="modal-body">
					<table id="operationData">
						<thead>
							<tr>
								<th data-sortable="true" data-field="problemID">ID</th>
								<th data-sortable="true" data-field="createTime">开始日期</th>
								<th data-sortable="true" data-field="communicateName">沟通方式</th>
								<th data-sortable="true" data-field="statusName">反馈状态</th>
								<th data-sortable="true" data-field="platformName">产品平台</th>
								<th data-sortable="true" data-field="problemTypeName">问题类型</th>
								<th data-sortable="true" data-field="typeName">细分类型</th>
								<th data-sortable="false" data-width="12%" data-field="detailProblem">&nbsp;问题详情&nbsp;</th>
								<th data-sortable="false" data-field="solution">解决方式</th>
								<th data-sortable="true" data-field="technicalersName">技术</th>
								<th data-sortable="true" data-field="problemStatusName">解决状态</th>
								<th data-sortable="true" data-field="solveTime">解决日期</th>
								<th data-sortable="true" data-field="screenshotID">问题截图</th>
								<th data-sortable="true" data-field="operationsName">运营</th>
								<th data-sortable="false" data-field="operate" data-width="5%"
									data-formatter="formatterCUD" data-events="operationInfoEvents">&nbsp;操作&nbsp;</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 新建商务跟进信息 -->
	<div class="modal bs-example-modal-lg" id="createBusinessModal"
		tabindex="0" role="dialog" aria-labelledby="createBusinessLabel"
		aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="createBusinessLabel">新建跟进信息</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label">城市</label>
							<div class="col-sm-4">
								<select class="form-control" id="businessCitySelect"></select>
							</div>
							<label class="col-sm-2 control-label">线索状态</label>
							<div class="col-sm-4">
								<select class="form-control" id="clueStatusSelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">数据状态</label>
							<div class="col-sm-4">
								<select class="form-control" id="dataStatusSelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">沟通状态</label>
							<div class="col-sm-10">
								<textarea class="form-control" rows="4" id="communicateStatus"></textarea>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="insertBusiness" class="btn btn-primary">保存</button>
						<button type="button" id="updateBusiness" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 新建运营跟进信息 -->
	<div class="modal bs-example-modal-lg" id="createOperation"
		tabindex="-1" role="dialog" aria-labelledby="createOperationLabel"
		aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="createOperationLabel">新建跟进信息</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label">沟通方式</label>
							<div class="col-sm-4">
								<select class="form-control" id="communicateSelect"></select>
							</div>
							<label class="col-sm-2 control-label">反馈状态</label>
							<div class="col-sm-4">
								<select class="form-control" id="statusSelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">产品平台</label>
							<div class="col-sm-4">
								<select class="form-control" id="platformSelect"></select>
							</div>
							<label class="col-sm-2 control-label">技术</label>
							<div class="col-sm-4">
								<select class="form-control" id="technicalersSelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">问题类型</label>
							<div class="col-sm-4">
								<select class="form-control" id="problemTypeSelect"></select>
							</div>
							<label class="col-sm-2 control-label">细分类型</label>
							<div class="col-sm-4">
								<select class="form-control" id="typeNameSelect"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">解决状态</label>
							<div class="col-sm-4">
								<select class="form-control" id="problemStatusSelect"></select>
							</div>
							<label class="col-sm-2 control-label">解决日期</label>
							<div class="col-sm-4 input-append date"
								data-date-format="yyyy-mm-dd">
								<input id="solovetime" type="text" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">问题详情</label>
							<div class="col-sm-10">
								<textarea class="form-control" rows="4" id="detailProblem"></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">解决方式</label>
							<div class="col-sm-10">
								<textarea class="form-control" rows="4" id="soloveWay"></textarea>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="insertProblem" class="btn btn-primary">保存</button>
						<button type="button" id="updateProblem" class="btn btn-primary"
							style="display: none">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Tracker Information -->
    <div class="modal bs-example-modal-lg" id="viewTrackerInfo" tabindex="-1"
        role="dialog" aria-labelledby="trackerLabel" aria-hidden="true">
        <div class="modal-dialog" style="width: 64%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <h5 class="modal-title" id="gameLabel">游戏列表</h5>
                </div>
                <div class="modal-body">
                    <table id="trackerData">
                        <thead>
                            <tr>
                                <th data-sortable="true" data-field="gameName">游戏名称</th>
                                <th data-sortable="true" data-field="appId">AppID</th>
                                <th data-sortable="true" data-field="naturalActiveFirstDay">回传日期</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="modal-footer">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<%@ include file="../includes/updatePwd.jsp"%>
	<input type="hidden" class="form-control" id="inputcustomerID">
	<input type="hidden" class="form-control" id="inputbusiness">
	<input type="hidden" class="form-control" id="inputoperationID">
	<input type="hidden" class="form-control" id="inputoperationName">
	<input type="hidden" class="form-control" id="inputproblemID">
	<input type="hidden" class="form-control" id="inputbusinessID">
	<%@ include file="../includes/footer.jsp"%>
	<script src="../assets/bootstrap/js/bootstrap-datetimepicker.min.js"></script>
	<script src="../assets/script/customerInfo.js"></script>
</body>

</html>
