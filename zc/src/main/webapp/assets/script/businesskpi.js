$(function() {
	initPages();
	bindEvent();
})

/**
 * 初始化页面
 */
function initPages(){
	// 初始化日期控件
	initDateMonthSelect();
	initDateDynamicSelect();
//	initTodayBtn($('#jzDate'));
	initKpiFilter();
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#businessKPI').bootstrapTable({
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
        	var options = $("#businessKPI").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getData(pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = $("#businessKPI").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getData(pageNumber,pageSize,name,order);
        }
    });
	var roleType = $('#roleinput').val();
	if (roleType == '00000003') {
		$('#businessKPI').bootstrapTable('hideColumn', 'newEquipNum');
	} else {
		$('#businessKPI').bootstrapTable('showColumn', 'newEquipNum');
	}
	getData(1,50);
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber,pageSize,sortName,order){
	var queryParam = buildCondition(pageNumber,pageSize,sortName,order);
	$('#businessKPI').bootstrapTable("showLoading");
	$.ajax({
		url : 'getbusinessKPIDatas.do',
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504");
			} else {
				var datasource = {
						total : data.content.totalRecord,
						rows : data.content.businessKPI
					};
				$('#businessKPI').bootstrapTable("hideLoading");
				$('#businessKPI').bootstrapTable('load', datasource);
				$('.channelSwitch').bootstrapSwitch('size','small');
				addActiveClass();
			}
		}
	});
}

// 初始化KPI过滤
function initKpiFilter(){
	$.ajax({
		url : 'getKpiSelect.do',
		method : "post",
		async : false,
		success : function(data) {
			var businesser = data.content.businesser;
			var platformType = data.content.platformType;
			var option = setOption(businesser);
			$("#businesserfilter").html(option.join(""));
			option = setOption(platformType);
			$("#platformTypefilter").html(option.join(""));
		}
	});
		
}

/**
 * 绑定事件
 */
function bindEvent(){
	// 查询
	$('#confirm').click(function(){
		query();
		cancel();
	});
	$("input[name=radioName]").click(function(){
		query();
	 });
	$('#exportExcel').click(function(){
		exportExcel();
	});
	window.viewCustomerInfo = {
			'click .customerName': function (e, value, row, index) {
				window.location.href = "customerInfo.jsp?menuID=2&customerID="+row.customerID;
			}
		};
//	// 是否发放奖励
//	window.rewardEvents = {
//		'switchChange.bootstrapSwitch .channelSwitch': function (e, value, row, index) {
//			if (e.target.checked == true) {
//				// 发放奖励
//				changeRewardStatus(row.customerID,1,'奖励状态切换为“已发放”');
//			} else {
//				// 不发放奖励
//				changeRewardStatus(row.customerID,0,'奖励状态切换为“未发放”');
//			}
//		}
//	};
}

// 切换奖励状态
function changeRewardStatus(customerID,flag,message){
	$.ajax({
		url : 'saveRewardStatus.do',
		data : {
			'customerID' : customerID,
			'flag' : flag
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup(message);
		}
	});
}

// 查询
function query(){
	var options = $("#businessKPI").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	getData(pageNumber,pageSize,name,order);
}

//导出Excel
function exportExcel(){
	var options = $("#businessKPI").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var queryParam = buildCondition(1, 50, name, order);
	window.location = "exportKpi.do?queryParam="+JSON.stringify(queryParam);
}
//构造查询条件
function buildCondition(pageNumber,pageSize,sortName,order){
	var startDate = dateMonthRange.getCurrentDate().startDate;
	var endDate = dateMonthRange.getCurrentDate().endDate;
	// 设备激活过滤日期
	var startTime = dynamicRange.getCurrentDate().startDate;
	var endTime = dynamicRange.getCurrentDate().endDate;
//	var jzDate = $('#jzDate').val();
//	var rewardStatus = $('#rewardStatusfilter').val();
//	if (rewardStatus == -1) {
//		rewardStatus = '';
//	}
	var platform = $('#platformTypefilter').val();
	if (platform == -1) {
		platform = '';
	}
	var businesser = $('#businesserfilter').val();
	if (businesser == -1) {
		businesser = '';
	}
	var flag = $('input[name="radioName"]:checked').val();
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'startTime' : startTime,
			'endTime' : endTime,
//			'jzDate' : jzDate,
//			'rewardStatus' : rewardStatus,
			'platform' : platform,
			'businesser' : businesser,
			'pageNumber' : pageNumber,
			"pageSize" : pageSize,
			'sortName' : sortName,
			'order' : order,
			'flag' : flag
		};
	return queryParam;
}