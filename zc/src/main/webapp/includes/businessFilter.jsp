<%@ page language="java" contentType="text/html; charset=utf-8"%>
<div class="filterpanel" id="cpBusiness">
	<form class="form-horizontal">
		<div class="form-group form-group-sm">
			<label class="col-sm-2 control-label">商务人员:</label>
			<div class="col-sm-4">
				<select class="form-control" id="businesserfilter"></select>
			</div>
			<label class="col-sm-2 control-label">城市:</label>
			<div class="col-sm-4">
				<select class="form-control" id="cityfilter"></select>
			</div>
		</div>
		<div class="form-group form-group-sm">
			<label class="col-sm-2 control-label">线索状态:</label>
			<div class="col-sm-4">
				<select class="form-control" id="cluefilter"></select>
			</div>
			<label class="col-sm-2 control-label">数据状态:</label>
			<div class="col-sm-4">
				<select class="form-control" id="datafilter"></select>
			</div>
		</div>
		<div class="form-group form-group-sm">
			<div class="col-sm-offset-9 ">
				<button id="confirm" type="button" class="btn btn-primary btn-sm">确定</button>
				<button id="businesscancel"  type="button" class="btn btn-info btn-sm">取消</button>
			</div>
		</div>
	</form>
</div>
