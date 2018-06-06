<%@ page language="java" contentType="text/html; charset=utf-8"%>
<div class="filterpanel" id="cpProblem">
	<form class="form-horizontal">
		<div class="form-group form-group-sm">
			<label class="col-sm-2 control-label">运营人员:</label>
			<div class="col-sm-4">
				<select class="form-control" id="operationsfilter"></select>
			</div>
			<label class="col-sm-2 control-label">技术人员:</label>
			<div class="col-sm-4">
				<select class="form-control" id="technicalersfilter"></select>
			</div>
		</div>
		<div class="form-group form-group-sm">
			<label class="col-sm-2 control-label">问题类型:</label>
			<div class="col-sm-4">
				<select class="form-control" id="problemTypefilter"></select>
			</div>
			<label class="col-sm-2 control-label">细分类型:</label>
			<div class="col-sm-4">
				<select class="form-control" id="subdivisionTypefilter"></select>
			</div>
		</div>
		<div class="form-group form-group-sm">
			<label class="col-sm-2 control-label">问题状态:</label>
			<div class="col-sm-4">
				<select class="form-control" id="problemStatusfilter"></select>
			</div>
			<label class="col-sm-2 control-label">产品平台:</label>
			<div class="col-sm-4">
				<select class="form-control" id="platformfilter"></select>
			</div>
		</div>
		<div class="form-group form-group-sm">
			<div class="col-sm-offset-9 ">
				<button id="confirm" type="button" class="btn btn-primary btn-sm">确定</button>
				<button id="problemcancel" type="button" class="btn btn-info btn-sm">取消</button>
			</div>
		</div>
	</form>
</div>
<div class="pull-right btngroup-right-padding">
	<input id="serachVisit" class="form-control" type="text" placeholder="搜索" style="display: none;">
</div>
<div class="pull-right btngroup-right-padding">
	<button type="button" id="exportExcel" class="btn btn-default">
		<span class="glyphicon glyphicon-share btn-important-highlight">导出Excel</span>
	</button>
	<button type="button" id="makeReport" class="btn btn-default">
		<span class="glyphicon glyphicon-stats btn-important-highlight">生成图表</span>
	</button>
</div>
