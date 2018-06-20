<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DataEye-配置管理</title>
<%@ include file="../includes/head.jsp"%>
</head>
<body>
	<div id="wrapper">
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<%@ include file="../includes/header.jsp"%>
			<%@ include file="../includes/menu.jsp"%>
		</nav>
		<div class="tab-padding">
			<ul class="nav nav-tabs nav-pills" id="siteTags">
			</ul>
		</div>
		<div class="tab-content" id="tagsContent">
		</div>
	</div>
	<div class="modal bs-example-modal-lg" id="createTagModal"
		tabindex="0" role="dialog" aria-labelledby="createTagLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="createTagLabel">新建</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label id="labelText" class="col-sm-3 control-label"></label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="inputText">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="insertTag" class="btn btn-primary">保存</button>
						<button type="button" id="updateTag" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="../includes/updatePwd.jsp"%>
	<%@ include file="../includes/footer.jsp"%>
	<input type="hidden" class="form-control" id="inputParamType">
	<input type="hidden" class="form-control" id="inputParamId">
	<script src="../assets/script/site.min.js"></script>
</body>

</html>
