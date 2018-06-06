<%@ page language="java" contentType="text/html; charset=utf-8"%>
<div class="filterpanel" id="visitfilter" style="display: none;">
	<form class="form-horizontal">
		<div class="form-group form-group-sm">
			<label class="col-sm-2 control-label">运营人员:</label>
			<div class="col-sm-4">
				<select class="form-control" id="operationsfilter1"></select>
			</div>
			<label class="col-sm-2 control-label">客户状态:</label>
			<div class="col-sm-4">
				<select class="form-control" id="customerStatusfilter"></select>
			</div>
		</div>
		<div class="form-group form-group-sm">
			<div class="col-sm-offset-9 ">
				<button id="confirmVisit" type="button"
					class="btn btn-primary btn-sm">确定</button>
				<button id="visitcancel" type="button" class="btn btn-info btn-sm">取消</button>
			</div>
		</div>
	</form>
</div>
