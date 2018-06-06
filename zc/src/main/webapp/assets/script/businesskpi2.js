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
	//initKpiFilter();
	initJoinData();
	$("#exportKPIExcel").hide();
}

function initJoinData(){
    var heightWin = $(window).height() - 150;
    var cardView = false;
    if ($(window).width() <= 768) {
        cardView = true;
    }
    $('#joinCountData').bootstrapTable({
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
            var options = $("#joinCountData").bootstrapTable('getOptions');
            var name = options.sortName;
            var order = options.sortOrder;
            var keyValue = $('#searchKpi').val();
            getJoinData(pageNumber,pageSize,name,order,keyValue);
        },
        onSort : function (name,order) {
            var options = $("#joinCountData").bootstrapTable('getOptions');
            var pageNumber = options.pageNumber;
            var pageSize = options.pageSize;
            var keyValue = $('#searchKpi').val();
            getJoinData(pageNumber,pageSize,name,order,keyValue);
        }
    });
    getJoinData(1,50);
}

function initDeviceData(){
    var heightWin = $(window).height() - 150;
    var cardView = false;
    if ($(window).width() <= 768) {
        cardView = true;
    }
    $('#deviceCountData').bootstrapTable({
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
            var options = $("#deviceCountData").bootstrapTable('getOptions');
            var name = options.sortName;
            var order = options.sortOrder;
            var keyValue = $('#searchKpi').val();
            getDeviceData(pageNumber,pageSize,name,order,keyValue);
        },
        onSort : function (name,order) {
            var options = $("#deviceCountData").bootstrapTable('getOptions');
            var pageNumber = options.pageNumber;
            var pageSize = options.pageSize;
            var keyValue = $('#searchKpi').val();
            getDeviceData(pageNumber,pageSize,name,order,keyValue);
        }
    });
    var roleType = $('#roleinput').val();
    if (roleType == '00000003') {
        $('#deviceCountData').bootstrapTable('hideColumn', 'activeEquipment');
        $('#deviceCountData').bootstrapTable('hideColumn', 'allActiveEquipment');
    } else {
        $('#deviceCountData').bootstrapTable('showColumn', 'activeEquipment');
        $('#deviceCountData').bootstrapTable('showColumn', 'allActiveEquipment');
    }
    getDeviceData(1,50);
}


function getJoinData(pageNumber,pageSize,sortName,order,keyValue){
	var queryParam = buildCondition(pageNumber,pageSize,sortName,order,keyValue);
	$('#joinCountData').bootstrapTable("showLoading");
	$.ajax({
		url : 'queryJoinExamineOfKPI.do',
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
						rows : data.content.content
					};
				$('#joinCountData').bootstrapTable("hideLoading");
				$('#joinCountData').bootstrapTable('load', datasource);
				$('.channelSwitch').bootstrapSwitch('size','small');
				addActiveClass();
			}
		}
	});
}


function getDeviceData(pageNumber,pageSize,sortName,order,keyValue){
	var queryParam = buildCondition(pageNumber,pageSize,sortName,order,keyValue);
	$('#deviceCountData').bootstrapTable("showLoading");
	$.ajax({
		url : 'queryDeviceExamineOfKPI.do',
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
						rows : data.content.content
					};
				$('#deviceCountData').bootstrapTable("hideLoading");
				$('#deviceCountData').bootstrapTable('load', datasource);
				$('.channelSwitch').bootstrapSwitch('size','small');
				addActiveClass();
			}
		}
	});
}



/**
 * 绑定事件
 */
function bindEvent(){

	$('#exportKPIExcel').click(function(){
		exportExcel();
	});
	window.viewCustomerInfo = {
			'click .customerName': function (e, value, row, index) {
				window.location.href = "customerInfo.jsp?menuID=2&customerID="+row.companyId;
			}
    };


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          toggleTab(e);
    });

    // 搜索
    $('#searchKpi').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
            var keyValue = $('#searchKpi').val();
            keySearch(keyValue);
        }
    });
}

function keySearch(keyValue) {
	var options = $("#searchKpi").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;

	for (var i = 0;i < $("#kpiTab > li").length;i++) {
        if ($($("#kpiTab > li")[i]).hasClass('active')) {
            var tabName = $($("#kpiTab > li")[i]).text();
            if (tabName == "接入数考核") {
                getJoinData(1,50,name,order,keyValue);
            } else if (tabName == "设备数考核"){
                getDeviceData(1,50,name,order,keyValue);
            }
        }
    }

}


function toggleTab(e) {
    var activeTab = $(e.target).text();
    if ($(e.target)[0].title) {
      activeTab = $(e.target)[0].title;
    }

    if (activeTab == "接入数考核") {
    	$("#exportKPIExcel").hide();
    	initJoinData();
    } else if (activeTab == "设备数考核"){
      $("#exportKPIExcel").show();
      initDeviceData();
    }
}


function query(){
	for (var i = 0;i < $("#kpiTab > li").length;i++) {
		if ($($("#kpiTab > li")[i]).hasClass('active')) {
			var tabName = $($("#kpiTab > li")[i]).text();
			if (tabName == "接入数考核") {
				getJoinData(1,50);
			} else if (tabName == "设备数考核"){
				getDeviceData(1,50);
			}
		}
	}
}




//构造查询条件
function buildCondition(pageNumber,pageSize,sortName,order,keyValue){
	var startDate = dateMonthRange.getCurrentDate().startDate;
	var endDate = dateMonthRange.getCurrentDate().endDate;

	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'pageNumber' : pageNumber,
			"pageSize" : pageSize,
			'sortName' : sortName,
			'order' : order,
			'keyValue' : keyValue
		};
	return queryParam;
}

//导出Excel
function exportExcel(){
	var options = $("#deviceCountData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var queryParam = buildCondition(1, 50, name, order);
	window.location = "exportDeviceKPI.do?queryParam="+JSON.stringify(queryParam);
}