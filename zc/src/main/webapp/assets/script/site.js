$(function() {
	initPages();
	bindEvent();
})

// 初始化页面
function initPages() {
	initTags();
	addActiveClass();
}

// 初始化页签
function initTags() {
	$.ajax({
		url : 'query_lables.do',
		method : "post",
		async : true,
		success : function(data) {
			var respData = data.content;
			setTags(respData);
		}
	});
}

// 设置页签数据
function setTags(respData) {
	var tagsDIV = [];
	var contentDIV = [];
	$
			.each(
					respData,
					function(i, v) {
						if (i == 0) {
							tagsDIV
									.push('<li role="presentation" class="active"><a href="#'
											+ v.labelID
											+ '" data-toggle="tab" class="tab-size">'
											+ v.labelName + '</a></li>');
							contentDIV
									.push('<div role="tabpanel" class="tab-pane active" id="'
											+ v.labelID
											+ '"><div id="page-wrapper"><div class="container-fluid">'
											+ '<div class="col-lg-12"><table id="'
											+ v.labelTableID
											+ '"><thead><tr><th data-field="value" data-align="center">'
											+ v.labelName
											+ '</th>'
											+ '<th data-sortable="false" data-align="center" data-formatter="formatterCUD" data-events="'
											+ v.event
											+ '">操作</th>'
											+ '</tr></thead></table></div></div></div></div>');
						} else {
							tagsDIV.push('<li role="presentation"><a href="#'
									+ v.labelID
									+ '" data-toggle="tab" class="tab-size">'
									+ v.labelName + '</a></li>');
							contentDIV
									.push('<div role="tabpanel" class="tab-pane" id="'
											+ v.labelID
											+ '"><div id="page-wrapper"><div class="container-fluid">'
											+ '<div class="col-lg-12"><table id="'
											+ v.labelTableID
											+ '"><thead><tr><th data-field="value" data-align="center">'
											+ v.labelName
											+ '</th>'
											+ '<th data-sortable="false" data-align="center" data-formatter="formatterCUD" data-events="'
											+ v.event
											+ '">操作</th>'
											+ '</tr></thead></table></div></div></div></div>');
						}
					});
	$('#siteTags').html(tagsDIV.join(""));
	$('#tagsContent').html(contentDIV.join(""));
	initTables(respData);
}

// 初始化表格
function initTables(respData) {
	var heightWin = $(window).height() - 120;
	$
			.each(
					respData,
					function(i, v) {
						$('#' + v.labelTableID)
								.bootstrapTable(
										{
											url : v.url,
											undefinedText : "",
											height : heightWin,
											striped : true,
											search : true,
											pagination : true,
											showColumns : true,
											showToggle : true,
											pageSize : 50,
											showRefresh : true,
											queryParams : {
												'enumTypeID' : v.enumTypeID
											},
											responseHandler : function(data) {
												if ($(
														'#'
																+ v.labelID
																+ ' .fixed-table-toolbar')
														.find('div')
														.hasClass(
																'columns pull-left') == false) {
													$(
															'#'
																	+ v.labelID
																	+ ' .fixed-table-toolbar')
															.append(
																	'<div class="columns pull-left"><button onclick="createTag('
																			+ v.enumTypeID
																			+ ')" class="btn btn-success" type="button">'
																			+ '<i class="glyphicon glyphicon-plus"></i>创建</button></div>');
												}
												return data.content;
											}
										});
					});
}
// 创建
function createTag(enumTypeID) {
	$('#inputParamType').val(enumTypeID);
	$('#createTagLabel').text('新建');
	$('#inputText').val('');
	$('#labelText').text(getCurrentTabs() + ":");
	$('#updateTag').hide();
	$('#insertTag').show();
	$('#createTagModal').modal({
		backdrop : 'static',
		keyboard : false
	});

}

// 绑定事件
function bindEvent() {
	window.industry_event = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};
	window.publish_year_event = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};

	// 新建
	$('#insertTag').click(function() {
		insertTag();
	});
	// 修改
	$('#updateTag').click(function() {
		updateTag();
	});
}

// 打开修改窗口
function openEditModal(row) {
	if (getCurrentTabs() == '年份管理') {
		$('#inputParamType').val('10000');
		$('#inputParamId').val(row.key);
		$('#labelText').text('年份:');
		$('#inputText').val(row.value);
	} else {
		$('#inputParamType').val('10001');
		$('#inputParamId').val(row.key);
		$('#labelText').text('行业:');
		$('#inputText').val(row.value);
	}
	$('#createTagLabel').text('修改');
	$('#updateTag').show();
	$('#insertTag').hide();
	$('#createTagModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}
// 创建
function insertTag() {
	var paramType = $('#inputParamType').val();
	var paramName = $('#inputText').val();
	$.ajax({
		url : '../add_param.do',
		data : {
			'param_type' : paramType,
			'param_name' : paramName
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#createTagModal").modal('hide');
			refreshTag();
		}
	});
}
// 修改
function updateTag() {
	var paramId = $('#inputParamId').val();
	var paramName = $('#inputText').val();
	$.ajax({
		url : '../update_param.do',
		data : {
			'param_id' : paramId,
			'param_name' : paramName
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode != 200) {
				$.messager.popup('系统异常,请稍后再试.');
			} else {
				$.messager.popup('修改成功');
				$("#createTagModal").modal('hide');
				refreshTag();
			}
		}
	});
}

// 删除
function delEnumData(rowData) {
	$.messager.confirm("", "确定删除该条记录？", function() {
		$.ajax({
			url : '../del_param.do',
			data : {
				'param_id' : rowData.key
			},
			method : "post",
			async : true,
			success : function(data) {
				$.messager.popup("删除成功");
				refreshTag();
			}
		});
	});
}

// 刷新
function refreshTag() {
	for (var i = 0; i < $("#siteTags > li").length; i++) {
		if ($($("#siteTags > li")[i]).hasClass('active')) {
			$($($($("#siteTags > li")[i]).find('a')[0].hash).find('table')[1])
					.bootstrapTable('refresh');
		}
	}
}

// 获取当前选中的页签
function getCurrentTabs() {
	for (var i = 0; i < $("#siteTags > li").length; i++) {
		if ($($("#siteTags > li")[i]).hasClass('active')) {
			return enumTypeName = $($("#siteTags > li")[i]).text();
		}
	}
}