$(function() {
	initPages();
	bindEvent();
})

// 初始化页面
function initPages() {
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#feedbackData').bootstrapTable({
		cardView : cardView,
		undefinedText : "",
		cache : false,
		height : heightWin,
		striped : true,
		pagination : true,
		pageSize : 50,
		pageList : [ 10, 25, 50, 100, 200 ],
		sidePagination : "server",
		onPageChange : function(pageNumber, pageSize) {
			var options = $("#feedbackData").bootstrapTable('getOptions');
			var name = options.sortName;
			var order = options.sortOrder;
			getData(pageNumber, pageSize, name, order);
		},
		onSort : function(name, order) {
			var options = $("#feedbackData").bootstrapTable('getOptions');
			var pageNumber = options.pageNumber;
			var pageSize = options.pageSize;
			getData(pageNumber, pageSize, name, order);
		},
        rowStyle: function(row, index) {
        	if (index % 2 == 0) {
        		return {classes: "odd_row"};
        	} else {
        		return {classes: "even_row"};
        	}
        }
	});
	getData(1, 50);
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber, pageSize, sortName, order) {
	var status = $('#dropdownBtn').find('input').val();
	var queryParam = {
		'status' : status,
		'pageNumber' : pageNumber,
		'pageSize' : pageSize,
		'sortName' : sortName,
		'order' : order
	};
	$('#feedbackData').bootstrapTable("showLoading");
	$.ajax({
		url : 'queryFeedbacklist.do',
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else {
				var datasource = {
					total : data.content.totalRecord,
					rows : data.content.feedback
				};
				$('#feedbackData').bootstrapTable("hideLoading");
				$('#feedbackData').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

// 绑定事件
function bindEvent() {
	window.dealwithEvents = {
		'click button' : function(e, value, row, index) {
			dealwithOpinion(row);
		}
	};
	// 按钮下拉菜单
	$('#btnMenu').click(function(e){
		queryByMenu(e);
	});
	$('#feedConfirm').click(function(){
		feedConfirm();
	});
}
// 按钮下拉菜单
function queryByMenu(e){
	var value = $(e.target).text();
	var status = $(e.target).find('input').val();
	$('#dropdownBtn').text(value).append('<span class="caret"><input type="hidden" value="'+status+'"/>');
	query();
}

//查询
function query(){
	getData(1,50);
}

function feedConfirm(){
	var ext = $('#solutionText').val().replace(new RegExp("\n","gm"),"<br>");
	var email = $('#inputemail').val();
	var Seqno = $('#inputSeqno').val();
	if (ext && ext.length == 0) {
		$.messager.popup("请填写解决方案。");
		return;
	}
	var feedback = {
			'email' : email,
			'ext' : ext,
			'Seqno' : Seqno
	};
	$.ajax({
		url : 'dealwithOpinion.do',
		data : {
			'feedback' : JSON.stringify(feedback)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 10) {
				$.messager.popup("反馈邮件发送失败");
			} else {
				$.messager.popup("处理成功");
				refreshTable($('#feedbackData'));
			}
			$("#feedModal").modal('hide');
		}
	});
}

//处理反馈意见
function dealwithOpinion(rowData){
	$('#inputemail').val(rowData.userID);
	$('#inputSeqno').val(rowData.Seqno);
	$("#feedModal").modal({backdrop: 'static', keyboard: false});
	
}
