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
		url : 'queryLabels.do',
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 402) {
				$.messager.popup('您没有权限，请先联系系统管理员');
			} else if (data.statusCode == 4) {
				window.open("login.jsp");
			} else {
				var respData = data.content;
				setTags(respData);
			}
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
											+ '"><thead><tr><th data-field="text" data-align="center">'
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
											+ '"><thead><tr><th data-field="text" data-align="center">'
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
											pageSize: 100,
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
	$('#inputenumTypeID').val(enumTypeID);
	$('#createTagLabel').text('新建');
	$('#inputText').val('');
	$('#labelText').text(getCurrentTabs());
	$('#updateTag').hide();
	$('#insertGameType').hide();
	$('#insertProblemType').hide();
	$('#updateProblemType').hide();
	$('#updateGameTag').hide();
	$('#updateGameTheme').hide();
	$('#updateNewGameTags').hide();
	$('#updateNewGameTypes').hide();
	$('#insertTag').show();
	$('#createTagModal').modal({
		backdrop : 'static',
		keyboard : false
	});

}

// 绑定事件
function bindEvent() {
	window.industrialEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};
	window.customerRankEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};
	window.clueEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};
	window.dataEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};
	window.roleEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};
	window.customerStatusEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delEnumData(row);
		}
	};
	window.problemTypeEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
//			delEnumData(row);
		}
	};
	window.gameTypeEvent = {
		'click .edit' : function(e, value, row, index) {
			openGameTypeModal(row);
		},
		'click .remove' : function(e, value, row, index) {
            delGameType(row);
		}
	}
	window.gameTagEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delGameTag(row);
		}
	}
	window.gameThemeEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
//			delGameTheme(row);
		}
	}
	window.artTagEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delNewGameTags(row);
		}
	};
	window.playTagEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delNewGameTags(row);
		}
	};
	window.themeTagEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delNewGameTags(row);
		}
	};
	window.newGameTypeEvent = {
		'click .edit' : function(e, value, row, index) {
			openEditModal(row);
		},
		'click .remove' : function(e, value, row, index) {
			delNewGameType(row);
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
	$('#insertProblemType').click(function() {
		insertProblemType();
	});
	$('#updateProblemType').click(function() {
		updateProblemType();
	});
	// 新增游戏类型
	$('#insertGameType').click(function() {
		insertGameType();
	});
	// 修改游戏类型
	$('#updateGameType').click(function() {
		updateGameType();
	});
	$('#insertGameTag').click(function() {
		insertGameTag();
	});
	$('#updateGameTag').click(function() {
		updateGameTag();
	});
	$('#insertGameTheme').click(function() {
		insertGameTheme();
	});
	$('#updateGameTheme').click(function() {
		updateGameTheme();
	});
	$('#insertChildGameTag').click(function() {
		insertChildGameTag();
	});
	$('#updateNewGameTags').click(function() {
		updateNewGameTags();
	});

	$('#insertNewGameType').click(function() {
		insertChildNewGameTypes();
	});
	$('#updateNewGameTypes').click(function() {
		updateNewGameTypes();
	});
}

// 打开修改窗口
function openEditModal(row) {
	if (row.value.length == 8) {
		$('#inputenumTypeID').val(row.enumTypeID);
		$('#inputenumID').val(row.value);
		$('#labelText').text(row.enumTypeName);
		$('#inputText').val(row.text);
		if (row.text.indexOf('<') > -1) {
			$('#inputText').val(row.text.substr(0, row.text.indexOf('<')));
		}
		$('#createTagLabel').text('修改');
		$('#updateTag').show();
		$('#insertGameType').hide();
		$('#insertProblemType').hide();
		$('#updateProblemType').hide();
		$('#updateGameTag').hide();
		$('#updateGameTheme').hide();
		$('#insertTag').hide();
		$('#updateNewGameTags').hide();
		$('#updateNewGameTypes').hide();
	} else {
		if (getCurrentTabs() == '问题类型') {
			$('#inputenumID').val(row.value);
			$('#labelText').text("细分类型");
			$('#inputText').val($(row.text)[0].innerText);
			$('#createTagLabel').text('修改');
			$('#updateTag').hide();
			$('#insertGameType').hide();
			$('#insertProblemType').hide();
			$('#updateGameTag').hide();
			$('#updateGameTheme').hide();
			$('#updateProblemType').show();
			$('#insertTag').hide();
			$('#updateNewGameTags').hide();
			$('#updateNewGameTypes').hide();
		} else if (getCurrentTabs() == '游戏标签') {
			$('#inputenumID').val(row.value);
			$('#labelText').text("游戏子标签");
			$('#inputText').val($(row.text)[0].innerText);
			$('#createTagLabel').text('修改');
			$('#updateTag').hide();
			$('#insertGameType').hide();
			$('#insertProblemType').hide();
			$('#updateProblemType').hide();
			$('#updateGameTag').show();
			$('#updateGameTheme').hide();
			$('#insertTag').hide();
			$('#updateNewGameTags').hide();
			$('#updateNewGameTypes').hide();
		} else if (getCurrentTabs() == '游戏题材') {
			$('#inputenumID').val(row.value);
			$('#createTagLabel').text('修改');
			$('#updateTag').hide();
			$('#insertGameType').hide();
			$('#insertProblemType').hide();
			$('#updateProblemType').hide();
			$('#updateGameTag').hide();
			$('#insertTag').hide();
			$('#updateGameTheme').show();
			$('#inputText').val($(row.text)[0].innerText);
			$('#updateNewGameTags').hide();
			$('#updateNewGameTypes').hide();
			if ($(row.text).length == 2) {
				// 二级
				$('#labelText').text("游戏二级题材");
			} else {
				// 三级
				$('#labelText').text("游戏三级题材");
			}
		} else if (getCurrentTabs() == '美术及定位标签' || getCurrentTabs() == '玩法标签'
				|| getCurrentTabs() == '题材标签') {
			$('#inputenumID').val(row.value);
			$('#labelText').text("游戏子标签");
			$('#inputText').val($(row.text)[0].innerText);
			$('#createTagLabel').text('修改');
			$('#updateTag').hide();
			$('#insertGameType').hide();
			$('#insertProblemType').hide();
			$('#updateProblemType').hide();
			$('#updateGameTag').hide();
			$('#updateGameTheme').hide();
			$('#insertTag').hide();
			$('#updateNewGameTags').show();
			$('#updateNewGameTypes').hide();
		} else if (getCurrentTabs() == '游戏类型(新品)') {
			$('#inputenumID').val(row.value);
			$('#labelText').text("游戏类型");
			$('#inputText').val($(row.text)[0].innerText);
			$('#createTagLabel').text('修改');
			$('#updateTag').hide();
			$('#insertGameType').hide();
			$('#insertProblemType').hide();
			$('#updateProblemType').hide();
			$('#updateGameTag').hide();
			$('#updateGameTheme').hide();
			$('#insertTag').hide();
			$('#updateNewGameTags').hide();
			$('#updateNewGameTypes').show();
		}
	}
	$('#createTagModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}

// 修改游戏类型窗口
function openGameTypeModal(rowData) {
	$('#inputenumID').val(rowData.value);
	if (rowData.text.indexOf('<') == 0) {
		$('#inputGameType').val($(rowData.text)[0].innerText);
	} else {
		$('#inputGameType').val(
				rowData.text.substr(0, rowData.text.indexOf('<')));
	}
	$('#gameTypeModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}
// 创建
function insertTag() {
	var enumTypeName;
	for (var i = 0; i < $("#siteTags > li").length; i++) {
		if ($($("#siteTags > li")[i]).hasClass('active')) {
			enumTypeName = $($("#siteTags > li")[i]).text();
		}
	}
	var enumTypeID = $('#inputenumTypeID').val();
	var enumValue = $('#inputText').val();
	if (enumTypeID == 0) {
		if (getCurrentTabs() == '美术及定位标签') {
			insertNewGameTags();
		} else if (getCurrentTabs() == '游戏类型(新品)') {
			insertNewGameTypes();
		} else {
			var gameTypes = {
				'typeName' : enumValue,
				'parentTypeID' : 0
			};
			$.ajax({
				url : 'addGameType.do',
				data : {
					'gameTypes' : JSON.stringify(gameTypes)
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

	} else if (enumTypeID == 1) {
		insertNewGameTags();
	} else if (enumTypeID == 2) {
		insertNewGameTags();
	} else {
		var enumCRM = {
			'enumTypeID' : enumTypeID,
			'enumTypeName' : enumTypeName,
			'text' : enumValue
		};
		$.ajax({
			url : 'insertEnumValue.do',
			data : {
				'enumCRM' : JSON.stringify(enumCRM)
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

}
// 修改
function updateTag() {
	var enumTypeID = $('#inputenumTypeID').val();
	var value = $('#inputenumID').val();
	var enumValue = $('#inputText').val();
	var enumCRM = {
		'enumTypeID' : enumTypeID,
		'value' : value,
		'text' : enumValue
	};
	$.ajax({
		url : 'updateEnumValue.do',
		data : {
			'enumCRM' : JSON.stringify(enumCRM)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#createTagModal").modal('hide');
			refreshTag();
		}
	});
}
// 添加细分类型
function insertProblemType() {
	var enumID = $('#inputenumID').val();
	var typeName = $('#inputText').val();
	var subdivisionType = {
		'typeName' : typeName,
		'category' : enumID
	};
	$.ajax({
		url : 'insertSubdivisionType.do',
		data : {
			'subdivisionType' : JSON.stringify(subdivisionType)
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
// 修改细分类型
function updateProblemType() {
	var typeID = $('#inputenumID').val();
	var typeName = $('#inputText').val();
	var subdivisionType = {
		'typeName' : typeName,
		'typeID' : typeID
	};
	$.ajax({
		url : 'updateSubdivisionType.do',
		data : {
			'subdivisionType' : JSON.stringify(subdivisionType)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#createTagModal").modal('hide');
			refreshTag();
		}
	});
}
// 添加游戏子类型
function insertGameType() {
	var enumValue = $('#inputText').val();
	var parentTypeID = $('#inputenumID').val();
	var gameTypes = {
		'typeName' : enumValue,
		'parentTypeID' : parentTypeID
	};
	$.ajax({
		url : 'addGameType.do',
		data : {
			'gameTypes' : JSON.stringify(gameTypes)
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
// 修改游戏子类型
function updateGameType() {
	var typeID = $('#inputenumID').val();
	var typeName = $('#inputGameType').val();
	var gameTypes = {
		'typeName' : typeName,
		'typeID' : typeID
	};
	$.ajax({
		url : 'updateGameType.do',
		data : {
			'gameTypes' : JSON.stringify(gameTypes)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#gameTypeModal").modal('hide');
			refreshTag();
		}
	});
}
// 添加游戏子标签
function insertGameTag() {
	var tagName = $('#inputGameTag').val();
	var parentTag = $('#inputenumID').val();
	var gameTag = {
		'tagName' : tagName,
		'parentTag' : parentTag
	};
	$.ajax({
		url : 'addGameTag.do',
		data : {
			'gameTag' : JSON.stringify(gameTag)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#gameTagModal").modal('hide');
			refreshTag();
		}
	});
}
// 修改游戏子标签
function updateGameTag() {
	var tagID = $('#inputenumID').val();
	var tagName = $('#inputText').val();
	var gameTag = {
		'tagName' : tagName,
		'tagID' : tagID
	};
	$.ajax({
		url : 'updateGameTag.do',
		data : {
			'gameTag' : JSON.stringify(gameTag)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#createTagModal").modal('hide');
			refreshTag();
		}
	});
}
// 添加游戏题材
function insertGameTheme() {
	var parentID = $('#inputenumID').val();
	var themeName = $('#inputGameTheme').val();
	var gameTheme = {};
	if (parentID && parentID.length == 8) {
		// 添加二级标签
		gameTheme = {
			'themeName' : themeName,
			'parentID' : parentID,
			'parentID2' : 0
		};
	} else {
		// 添加三级标签
		gameTheme = {
			'themeName' : themeName,
			'parentID' : '',
			'parentID2' : parentID
		};
	}
	$.ajax({
		url : 'addGameTheme.do',
		data : {
			'gameTheme' : JSON.stringify(gameTheme)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#gameThemeModal").modal('hide');
			refreshTag();
		}
	});
}
// 修改游戏题材
function updateGameTheme() {
	var themeID = $('#inputenumID').val();
	var themeName = $('#inputText').val();
	var gameTheme = {
		'themeName' : themeName,
		'themeID' : themeID
	};
	$.ajax({
		url : 'updateGameTheme.do',
		data : {
			'gameTheme' : JSON.stringify(gameTheme)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#createTagModal").modal('hide');
			refreshTag();
		}
	});
}

// 添加新品游戏标签
function insertNewGameTags() {
	var enumTypeID = $('#inputenumTypeID').val();
	var tagName = $('#inputText').val();
	var gameTag = {
		'tagID' : enumTypeID,
		'tagName' : tagName,
		'parentTag' : 0
	};
	$.ajax({
		url : 'insertNewGameTags.do',
		data : {
			'gameTag' : JSON.stringify(gameTag)
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
// 添加新品监控子标签
function insertChildGameTag() {
	var enumTypeID;
	if (getCurrentTabs() == '美术及定位标签') {
		enumTypeID = 0;
	} else if (getCurrentTabs() == '玩法标签') {
		enumTypeID = 1;
	} else if (getCurrentTabs() == '题材标签') {
		enumTypeID = 2;
	}
	var parentID = $('#inputenumID').val();
	var tagName = $('#inputChildGameTag').val();
	var gameTag = {
		'tagID' : enumTypeID,
		'tagName' : tagName,
		'parentTag' : parentID
	};
	$.ajax({
		url : 'insertNewGameTags.do',
		data : {
			'gameTag' : JSON.stringify(gameTag)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#newGameTagModal").modal('hide');
			refreshTag();
		}
	});
}
// 添加新品监控子类型
function insertChildNewGameTypes() {
	var typeID = $('#inpuTypeID').val();
	var parentID = $('#inputenumID').val();
	var typeName = $('#inputNewGameType').val();
	var gameTypes = {
		'typeID' : typeID,
		'typeName' : typeName,
		'parentTypeID' : parentID
	};
	$.ajax({
		url : 'insertNewGameTypes.do',
		data : {
			'gameTypes' : JSON.stringify(gameTypes)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#newGameTypeModal").modal('hide');
			refreshTag();
		}
	});
}

// 修改新品游戏标签
function updateNewGameTags() {
	var tagID = $('#inputenumID').val();
	var tagName = $('#inputText').val();
	var gameTag = {
		'tagName' : tagName,
		'tagID' : tagID
	};
	$.ajax({
		url : 'updateNewGameTags.do',
		data : {
			'gameTag' : JSON.stringify(gameTag)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#createTagModal").modal('hide');
			refreshTag();
		}
	});
}
// 修改新品游戏类型
function updateNewGameTypes() {
	var typeID = $('#inputenumID').val();
	var typeName = $('#inputText').val();
	var gameTypes = {
		'typeName' : typeName,
		'typeID' : typeID
	};
	$.ajax({
		url : 'updateNewGameTypes.do',
		data : {
			'gameTypes' : JSON.stringify(gameTypes)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#createTagModal").modal('hide');
			refreshTag();
		}
	});
}

// 创建新品游戏类型
function insertNewGameTypes() {
	var enumTypeID = $('#inputenumTypeID').val();
	var typeName = $('#inputText').val();
	var gameTypes = {
		'typeID' : enumTypeID,
		'typeName' : typeName,
		'parentTypeID' : 0
	};
	$.ajax({
		url : 'insertNewGameTypes.do',
		data : {
			'gameTypes' : JSON.stringify(gameTypes)
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
// 新增细分类型（新品）
function addNewGameDetailType(enumID) {
	$('#inputenumID').val(enumID);
	$('#inpuTypeID').val(1);
	$('#newGameTypeModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}

// 新增同质化（新品）
function addNewGameTzh(enumID) {
	$('#inputenumID').val(enumID);
	$('#inpuTypeID').val(2);
	$('#newGameTypeModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}

//删除
function delEnumData(rowData) {
	$.messager.confirm("", "确定删除该条记录？", function() {
		var enumCRM = {
				'enumTypeID' : rowData.enumTypeID,
				'value' : rowData.value
		};
		$.ajax({
			url : 'delEnums.do',
			data : {
				'enumCRM' : JSON.stringify(enumCRM)
			},
			method : "post",
			async : true,
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 4) {
					window.open("login.jsp");
				} else {
					$.messager.popup("删除成功");
					refreshTag();
				}
			}
		});
	});
}

// 删除游戏标签
function delGameTag(rowData){
	$.messager.confirm("", "确定删除该条记录？", function() {
		var Seqno = rowData.value;
		$.ajax({
			url : 'delGameTags.do',
			data : {
				'Seqno' : Seqno
			},
			method : "post",
			async : true,
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 4) {
					window.open("login.jsp");
				} else {
					$.messager.popup("删除成功");
					refreshTag();
				}
			}
		});
	});
}

// 删除游戏类型
function delGameType(rowData){
	$.messager.confirm("", "确定删除该条记录？", function() {
		var Seqno = rowData.value;
		$.ajax({
			url : 'delGameType.do',
			data : {
				'Seqno' : Seqno
			},
			method : "post",
			async : true,
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 4) {
					window.open("login.jsp");
				} else {
					$.messager.popup("删除成功");
					refreshTag();
				}
			}
		});
	});
}

// 删除游戏题材
//function delGameTheme(rowData){
//	$.messager.confirm("", "确定删除该条记录？", function() {
//		var Seqno = rowData.value;
//		$.ajax({
//			url : 'delGameTheme.do',
//			data : {
//				'Seqno' : rowData.tagID
//			},
//			method : "post",
//			async : true,
//			success : function(data) {
//				if (data.statusCode == 504) {
//					$.messager.popup("系统错误，错误代码504。");
//				} else if (data.statusCode == 4) {
//					window.open("login.jsp");
//				} else {
//					$.messager.popup("删除成功");
//					refreshTag();
//				}
//			}
//		});
//	});
//}

// 删除新品监控游戏标签
function delNewGameTags(rowData){
	$.messager.confirm("", "确定删除该条记录？", function() {
		var Seqno = rowData.value;
		$.ajax({
			url : 'delNewGameTags.do',
			data : {
				'Seqno' : Seqno
			},
			method : "post",
			async : true,
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 4) {
					window.open("login.jsp");
				} else {
					$.messager.popup("删除成功");
					refreshTag();
				}
			}
		});
	});
}

// 删除新品游戏类型
function delNewGameType(rowData){
	$.messager.confirm("", "确定删除该条记录？", function() {
		var Seqno = rowData.value;
		$.ajax({
			url : 'delNewGameType.do',
			data : {
				'Seqno' : JSON.stringify(Seqno)
			},
			method : "post",
			async : true,
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 4) {
					window.open("login.jsp");
				} else {
					$.messager.popup("删除成功");
					refreshTag();
				}
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
// 添加问题类型
function addType(enumID) {
	$('#inputText').val('');
	if (enumID && enumID.length == 8) {
		$('#insertGameType').hide();
		$('#insertProblemType').show();
		$('#updateProblemType').hide();
		$('#insertTag').hide();
		$('#updateTag').hide();
		$('#updateGameTag').hide();
		$('#updateGameTheme').hide();
		$('#updateNewGameTags').hide();
		$('#updateNewGameTypes').hide();
		$('#inputenumID').val(enumID);
		$('#createTagLabel').text('添加细分类型');
		$('#labelText').text('细分类型');
	} else {
		$('#insertGameType').show();
		$('#insertProblemType').hide();
		$('#updateProblemType').hide();
		$('#insertTag').hide();
		$('#updateTag').hide();
		$('#updateGameTag').hide();
		$('#updateGameTheme').hide();
		$('#updateNewGameTags').hide();
		$('#updateNewGameTypes').hide();
		$('#inputenumID').val(enumID);
		$('#createTagLabel').text('添加游戏类型');
		$('#labelText').text('游戏子类型');
	}
	$('#createTagModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}

// 添加游戏子标签
function addTag(enumID) {
	$('#inputenumID').val(enumID);
	$('#gameTagModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}
// 添加游戏题材
function addTheme(enumID) {
	$('#inputenumID').val(enumID);
	if (enumID && enumID.length == 8) {
		$('#labelTheme').text('游戏二级题材');
	} else {
		$('#labelTheme').text('游戏三级题材');
	}
	$('#gameThemeModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}
// 添加新品游戏子标签
function addNewGameTag(enumID) {
	$('#inputenumID').val(enumID);
	$('#newGameTagModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}

// 获取当前选中的页签
function getCurrentTabs() {
	for (var i = 0; i < $("#siteTags > li").length; i++) {
		if ($($("#siteTags > li")[i]).hasClass('active')) {
			return enumTypeName = $($("#siteTags > li")[i]).text();
		}
	}
}