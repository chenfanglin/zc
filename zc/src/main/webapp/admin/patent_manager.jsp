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
			<div class="ta_date filterbtnmenu" id="div_date_value">
				<span class="date_title" id="datevalue"></span> <a class="opt_sel"
					id="datetrigger" href="javascript:void(0)"> <i
					class="glyphicon glyphicon-calendar"></i>
				</a>
			</div>
			<div class="filterpanel" style="width: 78%">
				<form class="form-horizontal">
					<div class="form-group  form-group-sm">
						<label class="col-sm-1 control-label">设备系统</label>
						<div class="col-sm-3">
							<select class="form-control" id="deviceFilter">
								<option value="-1">全部</option>
								<option value="0">Android</option>
								<option value="1">IOS</option>
								<option value="2">Android,IOS</option>
								<option value="3">WP</option>
								<option value="4">H5</option>
							</select>
						</div>
						<label class="col-sm-1 control-label">联网方式</label>
						<div class="col-sm-3">
							<select class="form-control" id="networkFilter">
								<option value="-1">全部</option>
								<option value="1">单机</option>
								<option value="2">网游</option>
							</select>
						</div>
						<label class="col-sm-1 control-label">游戏来源</label>
						<div class="col-sm-3">
							<select class="form-control" id="gameSourceSelect"></select>
						</div>
					</div>
					<div class="form-group  form-group-sm">
						<label class="col-sm-1 control-label">游戏评级</label>
						<div class="col-sm-3">
							<select class="form-control" id="gameRankFilter">
								<option value="-1">全部</option>
								<option value="1">S</option>
								<option value="2">A</option>
								<option value="3">B+</option>
								<option value="4">B</option>
								<option value="5">C+</option>
								<option value="6">C</option>
								<option value="7">D</option>
							</select>
						</div>
						<label class="col-sm-1 control-label">游戏类型</label>
						<div class="col-sm-3">
							<select class="form-control" id="gameTypeSelect"></select>
						</div>
						<label class="col-sm-1 control-label">画面类型</label>
						<div class="col-sm-3">
							<select class="form-control" id="screenTypeFilter">
								<option value="-1">全部</option>
								<option value="1">2D</option>
								<option value="2">3D</option>
							</select>
						</div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-1 control-label">游戏题材</label>
						<div class="col-sm-3">
							<select class="form-control" id="gameThemeFilter">
								<option value="-1">全部</option>
								<option value="1">IP-历史名著-三国</option>
								<option value="2">IP-历史名著-隋唐</option>
								<option value="3">IP-历史名著-其他</option>
								<option value="4">IP-传统文学-武侠</option>
								<option value="5">IP-传统文学-西游</option>
								<option value="6">IP-传统文学-封神</option>
								<option value="7">IP-传统文学-水浒</option>
								<option value="8">IP-传统文学-童话</option>
								<option value="9">IP-传统文学-其他</option>
								<option value="10">IP-网络文学</option>
								<option value="11">IP-动漫作品-动画</option>
								<option value="12">IP-动漫作品-漫画</option>
								<option value="13">IP-动漫作品-虚拟形象</option>
								<option value="14">IP-经典游戏-背景改编</option>
								<option value="15">IP-经典游戏-跨平台移</option>
								<option value="16">IP-经典游戏-迭代续作</option>
								<option value="17">IP-经典游戏-玩偶形象</option>
								<option value="18">IP-影视作品-电影</option>
								<option value="19">IP-影视作品-电视剧</option>
								<option value="20">IP-影视作品-网络剧</option>
								<option value="21">IP-影视作品-人物肖像</option>
								<option value="22">IP-娱乐综艺</option>
								<option value="23">IP-体育赛事</option>
								<option value="24">东方玄奇-仙侠</option>
								<option value="25">东方玄奇-玄幻</option>
								<option value="26">东方玄奇-神话</option>
								<option value="27">东方玄奇-武侠</option>
								<option value="28">西方幻想-西方神话</option>
								<option value="29">西方幻想-西方魔幻</option>
								<option value="30">日式幻想-泛幻想</option>
								<option value="31">日式幻想-蒸汽幻想</option>
								<option value="32">战争军事-二战军事</option>
								<option value="33">战争军事-现代战争</option>
								<option value="34">科幻-生化</option>
								<option value="35">科幻-星际</option>
								<option value="36">科幻-末世</option>
								<option value="37">科幻-未来</option>
								<option value="38">体育-足球</option>
								<option value="39">体育-篮球</option>
								<option value="40">体育-其他</option>
								<option value="41">都市-商战</option>
								<option value="42">都市-现代生活</option>
								<option value="43">历史-远古时期</option>
								<option value="44">历史-春秋战国</option>
								<option value="45">历史-秦汉</option>
								<option value="46">历史-隋唐</option>
								<option value="47">历史-元明清</option>
								<option value="48">历史-中国近代</option>
								<option value="49">历史-日本战国</option>
								<option value="50">历史-西方古代史</option>
								<option value="51">历史-欧洲中世纪</option>
								<option value="52">历史-大航海时期</option>
								<option value="53">历史-美国西部</option>
								<option value="54">历史-其他</option>
								<option value="55">复合-历史</option>
								<option value="56">复合-游戏</option>
								<option value="57">复合-神话</option>
								<option value="58">复合-动漫</option>
								<option value="59">复合-影视</option>
							</select>
						</div>
						<label class="col-sm-1 control-label">风格区域:</label>
						<div class="col-sm-3">
							<select class="form-control" id="styleAreaFilter">
								<option value="-1">全部</option>
								<option value="1">中国</option>
								<option value="2">日式</option>
								<option value="3">韩式</option>
								<option value="4">欧式</option>
								<option value="5">美式</option>
								<option value="6">其他</option>
							</select>
						</div>
						<div class="col-sm-offset-10 ">
							<button id="confirm" type="button" class="btn btn-primary btn-sm">确定</button>
							<button onclick="cancel()" type="button"
								class="btn btn-info btn-sm">取消</button>
						</div>
					</div>
				</form>
			</div>
			<div class="pull-right search btngroup-right-padding">
				<input id="serachGames" class="form-control" type="text"
					placeholder="搜索">
			</div>
			<div class="pull-right btngroup-right-padding">
				<button type="button" id="createPatent" class="btn btn-success">
					<span class="glyphicon glyphicon-plus">新增专利</span>
				</button>
			</div>
		</div>
		<div id="page-wrapper">
			<div class="container-fluid">
				<div class="col-lg-12">
					<table id="patentData">
						<thead>
							<tr>
								<th data-sortable="true" data-width="6%"
									data-field="patentId">专利号</th>
								<th data-sortable="false" data-width="8%" data-field="patentName">专利名称</th>
								<th data-sortable="false" data-width="11%"
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
								<th data-sortable="true" data-width="5%"
									data-field="userQQ">联系QQ</th>
									<th data-sortable="true" data-width="5%"
									data-field="userWX">联系微信</th>
								<th data-sortable="false" data-align="center" data-width="5%"
									data-formatter="formatterCUD" data-events="patentEvents">操作</th>
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
					<h5 class="modal-title" id="addGameLabel">新增专利</h5>
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

	<input type="hidden" class="form-control" id="inputGameID">
	<input type="hidden" class="form-control" id="inputflag">
	<%@ include file="../includes/updatePwd.jsp"%>
	<%@ include file="../includes/footer.jsp"%>
	<script src="../assets/bootstrap/js/bootstrap-datetimepicker.min.js"></script>
	<script src="../assets/bootstrap/js/fileinput.js"></script>
	<script src="../assets/script/patent_manager.js"></script>
</body>

</html>
