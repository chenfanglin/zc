$(function() {
	initPages();
	bindEvent();
})

// 初始化页面
function initPages() {
	// 初始化日期控件
	initDateSelect();
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
	var problemType = $('#problemTypeBtn').find('input').val();
	var status = $('#statusBtn').find('input').val();
	var keyValue = $('#searchProblem').val();
	var queryParam = {
		'problemType' : problemType,
		'status' : status,
		'pageNumber' : pageNumber,
		'pageSize' : pageSize,
		'sortName' : sortName,
		'order' : order,
		'keyValue' : keyValue
	};
	$('#feedbackData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getFeedbackList.do',
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
					rows : data.content.feedbackList
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
	/**
	 * 格式化列，点击列中按钮的事件
	 */
	window.statusEvent = {
		'click button': function (e, value, row, index) {
			viewProblem(row);
		}
	};
	// 按钮下拉菜单
	$('#problemTypeMenu').click(function(e){
		queryByType(e);
	});
	$('#statusMenu').click(function(e){
		queryByStatus(e);
	});
	// 搜索
	$('#searchProblem').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	keySearch(); 
        } 
    });
	$('#img').click(function(){
		$(this).toggleClass('min');
		$(this).toggleClass('max');
	});
}

function viewProblem(rowData){
	$("#viewProblem").modal({backdrop: 'static', keyboard: false});
}

//查询按钮
function queryByType(e){
	var value = $(e.target).text();
	var status = $(e.target).find('input').val();
	$('#problemTypeBtn').text(value).append('<span class="caret"><input type="hidden" value="'+status+'"/>');
	query();
}
//查询按钮
function queryByStatus(e){
	var value = $(e.target).text();
	var status = $(e.target).find('input').val();
	$('#statusBtn').text(value).append('<span class="caret"><input type="hidden" value="'+status+'"/>');
	query();
}
//查询
function query(){
	getData(1,50);
}

function keySearch() {
	var options = $("#feedbackData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	getData(1,50,name,order);
}