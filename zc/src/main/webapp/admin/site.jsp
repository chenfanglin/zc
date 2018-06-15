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
						<button type="button" id="insertProblemType" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" id="updateProblemType" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" id="insertGameType" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" id="updateGameTag" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" id="updateGameTheme" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" id="updateNewGameTags" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" id="updateNewGameTypes" class="btn btn-primary"
							style="display: none;">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal bs-example-modal-lg" id="gameTypeModal"
		tabindex="0" role="dialog" aria-labelledby="gameTypeLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="gameTypeLabel">修改</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-3 control-label">游戏类型</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="inputGameType">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="updateGameType" class="btn btn-primary">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 游戏标签 -->
	<div class="modal bs-example-modal-lg" id="gameTagModal"
		tabindex="0" role="dialog" aria-labelledby="gameTagLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="gameTagLabel">添加</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-3 control-label">游戏子标签</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="inputGameTag">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="insertGameTag" class="btn btn-primary">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 游戏题材 -->
	<div class="modal bs-example-modal-lg" id="gameThemeModal"
		tabindex="0" role="dialog" aria-labelledby="gameThemeLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="gameThemeLabel">添加</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label id="labelTheme" class="col-sm-3 control-label">游戏二级题材</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="inputGameTheme">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="insertGameTheme" class="btn btn-primary">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 新品游戏子标签 -->
	<div class="modal bs-example-modal-lg" id="newGameTagModal"
		tabindex="0" role="dialog" aria-labelledby="newGameTagLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="newGameTagLabel">添加</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-3 control-label">游戏子标签</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="inputChildGameTag">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="insertChildGameTag" class="btn btn-primary">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 新品游戏类型 -->
	<div class="modal bs-example-modal-lg" id="newGameTypeModal"
		tabindex="0" role="dialog" aria-labelledby="newGameTypeLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="newGameTypeLabel">添加</h5>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-3 control-label">游戏类型</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="inputNewGameType">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" id="insertNewGameType" class="btn btn-primary">保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<input type="hidden" class="form-control" id="inputenumTypeID">
	<input type="hidden" class="form-control" id="inputenumID">
	<input type="hidden" class="form-control" id="inpuTypeID">
	<%@ include file="../includes/footer.jsp"%>
	<script src="../assets/script/site.js?v=20160223"></script>
</body>

</html>
