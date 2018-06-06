<%@ page language="java" contentType="text/html; charset=utf-8"%>
<div class="modal bs-example-modal-lg" id="commonInfo" tabindex="-1"
	role="dialog" aria-labelledby="infoLabel" aria-hidden="true">
	<div class="modal-dialog" style="width: 80%">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h5 class="modal-title" id="infoLabel">客户信息</h5>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label for="inputcustomerName" class="col-sm-2 control-label">客户名称</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputcustomerInfoName"
								placeholder="客户名称">
						</div>
						<label class="col-sm-2 control-label">注册公司</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="inputregCompanyName"
								placeholder="注册公司" readonly="readonly">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">商务</label>
						<div class="col-sm-4">
							<select class="form-control" id="businessInfoSelect"></select>
						</div>
						<label class="col-sm-2 control-label">运营</label>
						<div class="col-sm-4">
							<select class="form-control" id="operationInfoSelect"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-1 control-label">产业链</label>
						<div class="col-sm-3">
							<select class="form-control" id="industrialInfoSelect"></select>
						</div>
						<label class="col-sm-1 control-label">客户等级</label>
						<div class="col-sm-3">
							<select class="form-control" id="customerRankInfoSelect"></select>
						</div>
						<label class="col-sm-1 control-label">客户状态</label>
						<div class="col-sm-3">
						<input type="text" class="form-control" id="customerStatusInfoSelect"
								placeholder="客户状态" readonly="readonly">
						</div>
					</div>
					<div class="form-group">
						<label  class="col-sm-1 control-label">国家</label>
						<div class="col-sm-3">
							<select class="form-control" id="countryInfoSelect"></select>
						</div>
						<label  class="col-sm-1 control-label">地区</label>
						<div class="col-sm-3">
							<select class="form-control" id="areaInfoSelect"></select>
						</div>
						<label  class="col-sm-1 control-label">城市</label>
						<div class="col-sm-3">
							<select class="form-control" id="cityInfoSelect"></select>
						</div>
					</div>
					<div class="form-group">
						<label  class="col-sm-1 control-label">接入平台</label>
						<div class="col-sm-3">
							<input type="text" class="form-control" id="platformInfo"
								placeholder="接入平台" readonly="readonly">
						</div>
						<label  class="col-sm-1 control-label">回传日期</label>
						<div class="col-sm-3">
							<input type="text" class="form-control" id="uploadDateInfo"
								placeholder="回传日期" readonly="readonly">
						</div>
						<label  class="col-sm-1 control-label">注册日期</label>
						<div class="col-sm-3">
							<input type="text" class="form-control" id="regDateInfo"
								placeholder="注册日期" readonly="readonly">
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<div class="col-sm-offset-2 col-sm-10">
					<button type="button" id="saveCustomerInfoInfo" class="btn btn-primary">确定</button>
					<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>