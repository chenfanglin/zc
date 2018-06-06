<%@ page language="java" contentType="text/html; charset=utf-8"%>
<div class="modal bs-example-modal-lg" id="createContactModal"
	tabindex="0" role="dialog" aria-labelledby="createContactLabel"
	aria-hidden="true">
	<div class="modal-dialog" style="width: 50%">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h5 class="modal-title" id="createContactLabel">新建联系人信息</h5>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<input type="hidden" class="form-control" id="inputcontactID">
						<label for="inputCustomer" class="col-sm-2 control-label">所属公司</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputCustomer"
								placeholder="所属公司" readonly="readonly">
						</div>
						<label for="inputContactName" class="col-sm-2 control-label">联系人</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputContactName"
								placeholder="联系人">
						</div>

					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">角色</label>
						<div class="col-sm-4">
							<select class="form-control" id="roleSelect"></select>
						</div>
						<label for="inputoffice" class="col-sm-2 control-label">所在职位</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputoffice"
								placeholder="所在职位">
						</div>
					</div>
					<div class="form-group">
						<label for="inputmobileNumber" class="col-sm-2 control-label">手机号码</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputmobileNumber"
								placeholder="手机号码">
						</div>
						<label for="inputlandlineNumber" class="col-sm-2 control-label">座机号码</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputlandlineNumber"
								placeholder="座机号码">
						</div>
					</div>
					<div class="form-group">
						<label for="inputqq" class="col-sm-2 control-label">QQ</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputContactQQ"
								placeholder="QQ">
						</div>
						<label for="inputweixin" class="col-sm-2 control-label">微信</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputweixin"
								placeholder="微信">
						</div>
					</div>
					<div class="form-group">
						<label for="inputemail" class="col-sm-2 control-label">邮箱</label>
						<div class="col-sm-4">
							<input type="email" class="form-control" id="inputContactEmail"
								placeholder="邮箱">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">公司地址</label>
						<div class="col-sm-10">
							<textarea class="form-control" rows="4" id="companyAddr"></textarea>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<div class="col-sm-offset-2 col-sm-10">
					<button type="button" id="insertContacts" class="btn btn-primary">保存</button>
					<button type="button" id="updateContacts" class="btn btn-primary"
						style="display: none;">保存</button>
					<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>