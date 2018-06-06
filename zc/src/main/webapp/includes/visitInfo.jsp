<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!-- 回访详情 -->
<div class="modal bs-example-modal-lg" id="editVisit" tabindex="-1"
	role="dialog" aria-labelledby="visitLabel" aria-hidden="true">
	<div class="modal-dialog" style="width: 50%">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h5 class="modal-title" id="visitLabel">编辑回访详情</h5>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label for="inputcompanyName" class="col-sm-2 control-label">客户名称</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputcompanyName"
								placeholder="客户名称" readonly="readonly"> <input
								type="hidden" class="form-control" id="inputvisitID"> <input
								type="hidden" class="form-control" id="inputcustomerID">
						</div>
						<label class="col-sm-2 control-label">客户状态</label>
						<div class="col-sm-4">
							<select class="form-control" id="customerStatusSelect"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">问题详情</label>
						<div class="col-sm-10">
							<textarea class="form-control" rows="4" id="visitDetail"></textarea>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<div class="col-sm-offset-2 col-sm-10">
					<button type="button" id="saveVisitInfo" class="btn btn-primary">确定</button>
					<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>