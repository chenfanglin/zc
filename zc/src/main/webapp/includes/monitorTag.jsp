<%@ page language="java" contentType="text/html; charset=utf-8"%>
<div class="modal bs-example-modal-lg" id="monitorModal" tabindex="-1"
	role="dialog" aria-labelledby="monitorLabel" aria-hidden="true">
	<div class="modal-dialog" style="width: 62%">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h5 class="modal-title" id="monitorLabel">游戏题材</h5>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" id="monitortags">
				</form>
			</div>
			<div class="modal-footer">
				<div class="col-sm-offset-2 col-sm-10">
					<button type="button" id="saveArt" class="btn btn-primary">确定</button>
					<button type="button" id="savePlay" class="btn btn-primary" style="display: none;">确定</button>
					<button type="button" id="saveTheme" class="btn btn-primary" style="display: none;">确定</button>
					<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>


