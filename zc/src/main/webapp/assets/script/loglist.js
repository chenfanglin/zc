$(function() {
	initPages();
	bindEvent();
})

/**
 * 初始化页面
 */
function initPages(){
	initDateSelect();
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#loglist').bootstrapTable({
		cardView:cardView,
		undefinedText:"",
        cache: false,
        height: heightWin,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        sidePagination: "server",
        onPageChange: function (pageNumber,pageSize) {
        	getData(pageNumber,pageSize);
        },
        onSort : function (name,order) {
        	getData(1,50);
        }
    });
	getData(1,50);
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber,pageSize){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'pageNumber' : pageNumber,
			'pageSize' : pageSize,
		};
	$('#loglist').bootstrapTable("showLoading");
	$.ajax({
		url : 'getOperationLogs.do',
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
						rows : data.content.logs
					};
				$('#loglist').bootstrapTable("hideLoading");
				$('#loglist').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

/**
 * 绑定事件
 */
function bindEvent(){
	
}

