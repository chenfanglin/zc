<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!-- 修改密码 -->
<div class="modal bs-example-modal-lg" id="updatePwdModal"
		tabindex="0" role="dialog" aria-labelledby="updatePwdLabel"
		aria-hidden="true">
		<div class="modal-dialog" style="width: 50%">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="updatePwdLabel">修改密码</h5>
				</div>
				<div class="modal-body">
					<div class="check-error"></div>
					<form class="form-horizontal">
						<div class="form-group">
							<label for="oldPassword" class="col-sm-3 control-label">原密码:</label>
							<div class="col-sm-6">
								<input type="password" class="form-control" id="inputoldPassword"
									placeholder="原密码">
							</div>
						</div>
						<div class="form-group">
							<label for="newPassword" class="col-sm-3 control-label">新密码:</label>
							<div class="col-sm-6">
								<input type="password" class="form-control" id="inputnewPassword"
									placeholder="新密码">
							</div>
						</div>
						<div class="form-group">
							<label for="confirmPassword" class="col-sm-3 control-label">确认密码:</label>
							<div class="col-sm-6">
								<input type="password" class="form-control" id="inputconfirmPassword"
									placeholder="确认密码">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" onclick="updatePassword()" id="confirmUpdate" class="btn btn-primary">确认修改</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>