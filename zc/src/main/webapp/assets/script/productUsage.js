$(function() {
	initPages();
	bindEvent();
})

/**
 * 初始化页面
 */
function initPages(){
	// 初始化日期控件
	initDateSelect();
	initNewUserAnalysis($('#newUserData'),'newUserAnalysis.do');
//	initCountTable($('#loginCount'),'logincount.do',0); // 默认显示登陆次数
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getCountData(url,jqcon,pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
	var keyValue = $('#searchCompany').val();
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'platform':platform,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order,
			'keyValue' : keyValue
		};
	jqcon.bootstrapTable("showLoading");
	$.ajax({
		url : url,
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
						rows : data.content.dynamicObject
					};
				jqcon.bootstrapTable("hideLoading");
				jqcon.bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getLoginData(jqcon,url,pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var keyValue = $('#searchCompany').val();
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order,
			'keyValue' : keyValue
		};
	jqcon.bootstrapTable("showLoading");
	$.ajax({
		url : url,
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
						rows : data.content.customer
					};
				jqcon.bootstrapTable("hideLoading");
				jqcon.bootstrapTable('load', datasource);
			}
		}
	});
}

function getAnalysisData(url,jqcon,pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
	if ("游戏分析平台1.0" == platform) {
		platform = "g";
	} else if ("H5游戏分析平台2.0" == platform) {
		platform = "hh5";
	} else if ("移动应用统计分析平台" == platform) {
		platform = "store";
	} else if ("广告效果监测平台" == platform) {
		platform = "tracker";
	} else {
		platform = "";
	}
	var keyValue = $('#searchCompany').val();
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order,
			'platform':platform,
			'keyValue' : keyValue
		};
	jqcon.bootstrapTable("showLoading");
	$.ajax({
		url : url,
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
						rows : data.content.content
					};
				$('#oldaccountCount').text(data.content.distinctCount);
				jqcon.bootstrapTable("hideLoading");
				jqcon.bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

// 新用户分析
function initNewUserAnalysis(jqcon,url){
	var heightWin = $(window).height() - 190;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	jqcon.bootstrapTable({
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
        	var options = jqcon.bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getAnalysisData(url,jqcon,pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = jqcon.bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getAnalysisData(url,jqcon,pageNumber,pageSize,name,order);
        },
        rowStyle: function(row, index) {
        	if (index % 2 == 0) {
        		return {classes: "odd_row"};
        	} else {
        		return {classes: "even_row"};
        	}
        }
    });
	var roleType = $('#roleinput').val();
    var department = $('#deparmentinput').val();
    if (roleType == '00000003' && department == '3') {
        $('#newUserData').bootstrapTable('hideColumn', 'newEquipNum');
        $('#oldUserData').bootstrapTable('hideColumn', 'newEquipNum');
        $('#gameData').bootstrapTable('hideColumn', 'newEquipNum');
    } else {
         $('#newUserData').bootstrapTable('showColumn', 'newEquipNum');
         $('#oldUserData').bootstrapTable('showColumn', 'newEquipNum');
         $('#gameData').bootstrapTable('showColumn', 'newEquipNum');
    }
	getAnalysisData(url,jqcon,1,50);
}

// 初始化登陆次数
function initCountTable(jqcon,url){
	jqcon.bootstrapTable('destroy');
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
	if ("游戏分析平台1.0" == platform) {
		platform = "g";
	} else if ("H5游戏分析平台2.0" == platform) {
		platform = "hh5";
	} else if ("移动应用统计分析平台" == platform) {
		platform = "store";
	} else if ("广告效果监测平台" == platform) {
		platform = "tracker";
	} else {
		platform = "";
	}
	var keyValue = $('#searchCompany').val();
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 200;
	jqcon.bootstrapTable({
		url : url,
		cardView:cardView,
		undefinedText:"",
		height:height,
        cache: false,
        striped: true,
        pagination : true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        queryParams : {'startDate' : startDate,'endDate' : endDate,'keyValue':keyValue,'platform' : platform},
        responseHandler : function(data){
        	return data.content;
        }
    });
}

// 初始化登录公司、未登录公司
function initLoginTable(jqcon,url){
	var heightWin = $(window).height() - 160;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	jqcon.bootstrapTable({
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
        	var options = jqcon.bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getLoginData(jqcon,url,pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = jqcon.bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getLoginData(jqcon,url,pageNumber,pageSize,name,order);
        },
        rowStyle: function(row, index) {
        	if (index % 2 == 0) {
        		return {classes: "odd_row"};
        	} else {
        		return {classes: "even_row"};
        	}
        }
    });
	getLoginData(jqcon,url,1,50);
}

/**
 * 绑定事件
 */
function bindEvent(){
	//格式化列，点击列中按钮的事件
	window.operationEvents = {
		'click .operationName': function (e, value, row, index) {
			openDetailVisit(row.customerID,row.operationVisit);
		}
	};
	window.businessEvents = {
		'click .businessName': function (e, value, row, index) {
			openDetailVisit(row.customerID,row.businessVisit);
		}
	};
	window.detailVisitEvents = {
		'click .edit': function (e, value, row, index) {
			$('#createVisitLabel').text('修改回访信息');
    		$('#updateVisit').show();
			$('#insertVisit').hide();
			openUpdateVisit(row);
		},
	    'click .remove': function (e, value, row, index) {
	    	delvisit(row);
	    }
	};
	// 客户回访信息
	window.loginEvents = {
		'click .edit': function (e, value, row, index) {
			openCustomerVisit(row);
		}
	};
	window.viewCustomerInfo = {
			'click .customerName': function (e, value, row, index) {
				window.location.href = "customerInfo.jsp?menuID=2&customerID="+row.customerID;
			}
		};
	// 搜索
	$('#searchCompany').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	query();
        } 
    });
	window.emailEvents = {
			'click .email': function (e, value, row, index) {
				openEveryLoginCount(value,row.platform.split(",")[1].split("'")[1]);
			}
		};
	//切换标签页
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	      toggleTab(e);
	});
	// 查询
	$('#confirm').click(function(){
		query();
	});
	// 按钮下拉菜单
	$('#btnMenu').click(function(e){
		queryByMenu(e);
	});
	// 添加回访详情
	$('#insertVisit').click(function(){
		insertVisit();
	});
	// 修改回访详情
	$('#updateVisit').click(function(){
		updateVisit();
	});
	// 修改客户回访信息
	$('#updateCustomerVisit').click(function(){
		updateCustomerVisit();
	});
}

// 打开回访详情
function openDetailVisit(customerID,personID){
	$('#visitData').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#visitData').bootstrapTable({
		url : 'getVisitList.do',
		cardView:cardView,
		undefinedText:"",
        cache: false,
        striped: true,
        pagination : true,
        search : true,
        showColumns : true,
        showToggle : true,
        showRefresh : true,
        queryParams : {'customerID' : customerID,'personID' : personID},
        responseHandler : function(data){
        	if ($('#viewDetailVisit .fixed-table-toolbar').find('div').hasClass('columns pull-left') == false) {
        		$('#viewDetailVisit .fixed-table-toolbar').append(
    			'<div class="columns pull-left"><button id="createVisit" class="btn btn-success" type="button"><i class="glyphicon glyphicon-plus"></i>创建</button></div>');
        	}
        	$('#createVisit').unbind("click");
        	$('#createVisit').click(function(){
        		$('#createVisitLabel').text('新建回访信息');
        		$('#updateVisit').hide();
    			$('#insertVisit').show();
        		createVisit(customerID,personID);
        	});
        	return data.content;
        }
    });
	$('#viewDetailVisit').modal({backdrop: 'static', keyboard: false});
	
}

//打开创建回访详情界面
function createVisit(customerID,personID){
	$('#inputcustomerID').val(customerID);
	$('#inputpersonID').val(personID);
	$('#inputVisitName').val('');
	$("#inputContactWay").val('');
	$("#visitDetail").val('');
	$('#createVisitModal').modal({backdrop: 'static', keyboard: false});
	initSelectbox($('#visitWaySlect'), "10001004");
}
// 打开修改回访详情界面
function openUpdateVisit(rowData){
	$('#createVisitModal').modal({backdrop: 'static', keyboard: false});
	initSelectbox($('#visitWaySlect'), "10001004");
	$('#inputvisitID').val(rowData.visitID);
	$('#inputVisitName').val(rowData.visitName);
	$("#inputContactWay").val(rowData.contactWay);
	$("#visitWaySlect").val(rowData.visitWay);
	$("#visitDetail").val(rowData.visitDetail.replace(new RegExp("<br>","gm"),"\n"));
}

// 添加回访详情
function insertVisit(){
	var visitData = {
			'customerID' : $('#inputcustomerID').val(),
			'personID' : $('#inputpersonID').val(),
			'visitName' : $('#inputVisitName').val(),
			'contactWay' : $("#inputContactWay").val(),
			'visitWay' : $("#visitWaySlect").val(),
			'visitWayName' : $("#visitWaySlect").find("option:selected").text(),
			'visitDetail' : $("#visitDetail").val().replace(new RegExp("\n","gm"),"<br>")
	};
	$.ajax({
		url : 'insertVisit.do',
		data : {
			'visitData' : JSON.stringify(visitData)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else if (data.statusCode == 4) {
            	window.open("login.jsp");
            } else {
				$.messager.popup("添加成功");
				$("#createVisitModal").modal('hide');
				$('#visitData').bootstrapTable('refresh');
			}
		}
	});
}

// 修改回访详情
function updateVisit(){
	var visitData = {
			'visitID' : $('#inputvisitID').val(),
			'visitName' : $('#inputVisitName').val(),
			'contactWay' : $("#inputContactWay").val(),
			'visitWay' : $("#visitWaySlect").val(),
			'visitWayName' : $("#visitWaySlect").find("option:selected").text(),
			'visitDetail' : $("#visitDetail").val().replace(new RegExp("\n","gm"),"<br>")
	};
	$.ajax({
		url : 'updateVisit.do',
		data : {
			'visitData' : JSON.stringify(visitData)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else if (data.statusCode == 4) {
            	window.open("login.jsp");
            } else {
				$.messager.popup("修改成功");
				$("#createVisitModal").modal('hide');
				$('#visitData').bootstrapTable('refresh');
			}
		}
	});
}

// 打开客户回访信息编辑窗口
function openCustomerVisit(rowData){
	$.ajax({
		url : 'getVisitSelect.do',
		method : "post",
		async : true,
		success : function(data) {
			$('#inputcustomerID').val(rowData.customerID);
			var operations = data.content.operations;
			var customerStatus = data.content.customerStatus;
			var business = data.content.businesser;
			var option = setOption(operations,1);
			$("#operationVisitSlect").html(option.join(""));
			option = setOption(customerStatus,1);
			$("#customerStatusSlect").html(option.join(""));
			option = setOption(business,1);
            $("#businessVisitSelect").html(option.join(""));
			$("#operationVisitSlect").val(rowData.operationVisit);
			$("#customerStatusSlect").val(rowData.customerStatus);
			$("#businessVisitSelect").val(rowData.businessVisit);
			$('#customerVisitModal').modal({backdrop: 'static', keyboard: false});
		}
	});
}

// 修改客户回访信息
function updateCustomerVisit(){
	var customer = {
			'customerStatus' : $("#customerStatusSlect").val(),
			'customerStatusName' : $("#customerStatusSlect").find("option:selected").text(),
			'operationVisit' : $("#operationVisitSlect").val(),
			'operationVisitName' : $("#operationVisitSlect").find("option:selected").text(),
			'businessVisit' : $("#businessVisitSelect").val(),
            'businessVisitName' : $("#businessVisitSelect").find("option:selected").text(),
			'customerID' : $('#inputcustomerID').val()
	};
	$.ajax({
		url : 'saveCustomerVisit.do',
		data : {
			'customer' : JSON.stringify(customer)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else if (data.statusCode == 4) {
            	window.open("login.jsp");
            } else {
				$.messager.popup("修改成功");
				$("#customerVisitModal").modal('hide');
				for (var i = 0;i < $("#productTab > li").length;i++) {
					if ($($("#productTab > li")[i]).hasClass('active')) {
						var tabName = $($("#productTab > li")[i]).text();
					    if (tabName == "未登录公司") {
					    	var options = $('#notloginCustomer').bootstrapTable('getOptions');
					    	var pageNumber = options.pageNumber;
					    	var pageSize = options.pageSize;
					    	var name = options.sortName;
					    	var order = options.sortOrder;
					    	getLoginData($('#notloginCustomer'),'getNotLoginList.do',pageNumber,pageSize,name,order)
					    } else if (tabName == "登陆公司") {
					    	var options = $('#loginCustomer').bootstrapTable('getOptions');
					    	var pageNumber = options.pageNumber;
					    	var pageSize = options.pageSize;
					    	var name = options.sortName;
					    	var order = options.sortOrder;
					    	getLoginData($('#loginCustomer'),'getLoginList.do',pageNumber,pageSize,name,order)
					    }
					}
				}
			}
		}
	});
}

// 切换标签页
function toggleTab(e){
	// 获取已激活的标签页的名称
    var activeTab = $(e.target).text();
    if ($(e.target)[0].title) {
  	  	activeTab = $(e.target)[0].title;
    }
    var chartID = $($(e.target)[0].hash).find('div').attr('id');
    var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
    var tabName = "";
    for (var i = 0;i < $('#productTab').find('li').length;i++) {
    	if ($($("#productTab > li")[i]).hasClass('active')) {
			tabName = $($("#productTab > li")[i]).text();
    	}
    }
    console.log($($(e.target)[0].hash).find('div'));
    if (activeTab == "新用户分析") {
    	$('#dropdownBtn').show();
    	$($(e.target)[0].hash +' a:first').tab('show');
    	initNewUserAnalysis($('#newUserData'),'newUserAnalysis.do');
    } else if (activeTab == "老用户分析") {
    	$('#dropdownBtn').hide();
    	initNewUserAnalysis($('#oldUserData'),'oldUserAnalysis.do');
    } else if (activeTab == "子账号分析") {
        $('#dropdownBtn').hide();
        initChildAccountData();
    }else if (activeTab == "登陆次数") {
    	$('#dropdownBtn').show();
  	  	initCountTable($('#loginCount'),'logincount.do');
    } else if (activeTab == "菜单点击"){
    	$('#dropdownBtn').show();
    	initCountTable($('#menuClick'),'getPageClick.do');
    } else if (activeTab == "登陆公司") {
    	$($(e.target)[0].hash +' a:first').tab('show');
    	$('#dropdownBtn').hide();
    	lineCharts("getLoginCpEveryDay.do","loginCPEveryDay");
    } else if (activeTab == "总设备激活量") {
        $($(e.target)[0].hash +' a:first').tab('show');
        $('#dropdownBtn').hide();
        allActiveDeviceLineCharts("getAllActiveDeviceCount.do","allActiveDeviceByDay",0);
    }else if (activeTab == "未登录公司") {
    	$('#dropdownBtn').hide();
    	initLoginTable($('#notloginCustomer'),'getNotLoginList.do');
    } else if (activeTab == "平台注册") {
    	$($(e.target)[0].hash +' a:first').tab('show');
    	$('#dropdownBtn').hide();
    	showCharts("getPlatformRegAccount.do","platformRegpies");
    } else if (activeTab == "饼图") {
    	$('#dropdownBtn').hide();
    	showCharts("getPlatformRegAccount.do","platformRegpies");
    } else if (activeTab == "曲线图") {

//    	lineCharts("getLoginCpEveryDay.do",chartID,platform);
    	if (chartID == "platformRegLineByDay") {
    		$('#dropdownBtn').hide();

    		//lineCharts("getChartRegDatas.do",chartID,platform);
    		//lineCharts("getChartRegUpload.do", "regUploadline");
    	} else {
    		$('#dropdownBtn').hide();
    		lineCharts("getLoginCpEveryDay.do",chartID);
    	}
    } else if (activeTab == "新用户注册曲线图") {
        $('#dropdownBtn').hide();
        newUserLineCharts("getChartRegDatas.do","platformRegLineByDay",0);
    } else if (activeTab == "表格") {
    	var jqconTable = $($(e.target)[0].hash).find('table');

    	if (jqconTable.attr('id') == "platformRegTable"){
    		$('#dropdownBtn').hide();
    		showTable(jqconTable,'getChartRegTabDatas.do');
    	} else if (jqconTable.attr('id') == "newUserData") {
    		$('#dropdownBtn').show();
    		initNewUserAnalysis($('#newUserData'),'newUserAnalysis.do');
    	} else if (jqconTable.attr('id') == "oldUserData") {
    		$('#dropdownBtn').show();
    		initNewUserAnalysis($('#oldUserData'),'oldUserAnalysis.do');
    	} else {
    		$('#dropdownBtn').hide();
    		initLoginTable($('#loginCustomer'),'getLoginList.do');
    	}
    } else if (activeTab == "新用户表格") {
        $('#dropdownBtn').show();

    } else if (activeTab == "平台问题") {
    	$('#dropdownBtn').hide();
    	showCharts("getPlatformAccount.do","platformProblemAmount");
    } else if (activeTab == "平台CP") {
    	$('#dropdownBtn').hide();
    	showCharts("getProblemCPAccount.do","platformCPAmount");
    } else if (activeTab == "新增CP") {
    	$('#dropdownBtn').hide();
    	showTable($('#addCPTable'),'getNewCPDatas.do');
    } else if (activeTab == "回传统计") {
    	$('#dropdownBtn').hide();
    	showCharts("getPlatformUploadAccount.do","uploadTimepies");
    } else if (activeTab == "条形图") {
    	var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
    	if ("游戏分析平台1.0" == platform) {
    		platform = "g";
    	} else if ("H5游戏分析平台2.0" == platform) {
    		platform = "hh5";
    	} else if ("移动应用统计分析平台" == platform) {
    		platform = "store";
    	} else if ("广告效果监测平台" == platform) {
    		platform = "tracker";
    	} else {
    		platform = "";
    	}
    	if (chartID == "oldUserBarLoginCount") {
    		$('#dropdownBtn').show();
    		showChartBar("getOldUserLoginCount.do", "oldUserBarLoginCount",platform);
    		showChartBar("getOldUserLoginDays.do", "oldUserBarLoginDays",platform);
    	} else {
    		$('#dropdownBtn').show();
    		showChartBar("getNewUserUploadDataTimeStatus.do", "newUserBarData",platform);
    	}
    	
    }/* else if (activeTab == "按天") {
        newUserLineCharts("getChartRegDatas.do","platformRegLineByDay",0);
    } else if (activeTab == "按周") {
        newUserLineCharts("getChartRegDatas.do","platformRegLineByWeek",1);
    } else if (activeTab == "按月") {
        newUserLineCharts("getChartRegDatas.do","platformRegLineByMonth",2);
    }*/

}

// 查询
function query(){
	var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
	for (var i = 0;i < $("#productTab > li").length;i++) {
		if ($($("#productTab > li")[i]).hasClass('active')) {
			var tabName = $($("#productTab > li")[i]).text();
			if (tabName == "新用户分析") {
				var activeName = "";
		    	for (var j = 0;j < $("#newUserTab").find('li').length;j++) {
		    		if ($($("#newUserTab").find('li')[j]).hasClass('active') == true) {
		    			activeName = $($("#newUserTab").find('li')[j]).find('a')[0].title;
		    		}
		    	}
		    	if (activeName == "条形图") {
		    		var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
		    		if ("游戏分析平台1.0" == platform) {
		    			platform = "g";
		    		} else if ("H5游戏分析平台2.0" == platform) {
		    			platform = "hh5";
		    		} else if ("移动应用统计分析平台" == platform) {
		    			platform = "store";
		    		} else if ("广告效果监测平台" == platform) {
		    			platform = "tracker";
		    		} else {
		    			platform = "";
		    		}
		    		showChartBar("getNewUserUploadDataTimeStatus.do", "newUserBarData",platform);
		    	} else if (activeName == "新用户注册曲线图") {
		    	    /*for (var k = 0;k < $("#newUserRegLine > li").length;k++) {
                        if ($($("#newUserRegLine > li")[k]).hasClass('active')) {
                            var newUserTabName = $($("#newUserRegLine > li")[k]).text();
                            if (newUserTabName == "按天") {
                                newUserLineCharts("getChartRegDatas.do","platformRegLineByDay",0);
                            } else if (newUserTabName == "按周"){
                                newUserLineCharts("getChartRegDatas.do","platformRegLineByWeek",1);
                            } else if (newUserTabName == "按月"){
                                newUserLineCharts("getChartRegDatas.do","platformRegLineByMonth",2);
                            }
                        }
                    }*/

                    //window.location.reload();
                    newUserLineCharts("getChartRegDatas.do","platformRegLineByDay",0);
                    newUserLineCharts("getChartRegDatas.do","platformRegLineByWeek",1);
                    newUserLineCharts("getChartRegDatas.do","platformRegLineByMonth",2);

                } else {
		    		initNewUserAnalysis($('#newUserData'),'newUserAnalysis.do');
		    	}
		    } else if (tabName == "老用户分析") {
		    	var activeName = "";
		    	for (var j = 0;j < $("#oldUserTab").find('li').length;j++) {
		    		if ($($("#oldUserTab").find('li')[j]).hasClass('active') == true) {
		    			activeName = $($("#oldUserTab").find('li')[j]).find('a')[0].title;
		    		}
		    	}
		    	if (activeName == "条形图") {
		    		var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
		    		if ("游戏分析平台1.0" == platform) {
		    			platform = "g";
		    		} else if ("H5游戏分析平台2.0" == platform) {
		    			platform = "hh5";
		    		} else if ("移动应用统计分析平台" == platform) {
		    			platform = "store";
		    		} else if ("广告效果监测平台" == platform) {
		    			platform = "tracker";
		    		} else {
		    			platform = "";
		    		}
		    		showChartBar("getOldUserLoginCount.do", "oldUserBarLoginCount",platform);
		    		showChartBar("getOldUserLoginDays.do", "oldUserBarLoginDays",platform);
		    	} else {
		    		initNewUserAnalysis($('#oldUserData'),'oldUserAnalysis.do');
		    	}
		    } else if (tabName == "子账号分析") {
		        var options = $("#searchKpi").bootstrapTable('getOptions');
            	var name = options.sortName;
            	var order = options.sortOrder;
            	var keyValue = $('#searchCompany').val();
                getChildAccountData(1,50,name,order,keyValue);
            } else if (tabName == "登陆次数") {
				initCountTable($('#loginCount'),'logincount.do',0);
			} else if (tabName == "总设备激活量") {
			    allActiveDeviceLineCharts("getAllActiveDeviceCount.do","allActiveDeviceByDay",0);
			    allActiveDeviceLineCharts("getAllActiveDeviceCount.do","allActiveDeviceByWeek",1);
			    allActiveDeviceLineCharts("getAllActiveDeviceCount.do","allActiveDeviceByMonth",2);
            } else if (tabName == "菜单点击"){
		    	initCountTable($('#menuClick'),'getPageClick.do',1); 
		    } else if (tabName == "登陆公司") {
		    	var activeName = "";
		    	for (var j = 0;j < $("#loginComp").find('li').length;j++) {
		    		if ($($("#loginComp").find('li')[j]).hasClass('active') == true) {
		    			activeName = $($("#loginComp").find('li')[j]).find('a')[0].title;
		    		}
		    	}
		    	if (activeName == "曲线图") {
		    		lineCharts("getLoginCpEveryDay.do","loginCPEveryDay");
		    	} else {
		    		initLoginTable($('#loginCustomer'),'getLoginList.do');
		    	}
		    } else if (tabName == "未登录公司") {
		    	initLoginTable($('#notloginCustomer'),'getNotLoginList.do');
		    } else if (tabName == "平台注册") {
		    	var activeName = "";
		    	for (var j = 0;j < $("#regUpload").find('li').length;j++) {
		    		if ($($("#regUpload").find('li')[j]).hasClass('active') == true) {
		    			activeName = $($("#regUpload").find('li')[j]).find('a')[0].title;
		    		}
		    	}
		    	if (activeName == "曲线图") {
		    		lineCharts("getChartRegDatas.do","platformRegline");
		    		lineCharts("getChartRegUpload.do", "regUploadline");
		    	} else if (activeName == "饼图") {
		    		showCharts("getPlatformRegAccount.do","platformRegpies");
		    	} else {
		    		showTable($('#platformRegTable'),'getChartRegTabDatas.do');
		    	}
		    } else if (tabName == "平台CP") {
		    	showCharts("getProblemCPAccount.do","platformCPAmount");
		    } else if (tabName == "新增CP") {
		    	showTable($('#addCPTable'),'getNewCPDatas.do');
		    } else if (tabName == "回传统计") {
		    	showCharts("getPlatformUploadAccount.do","uploadTimepies");
		    }
		}
	}
}

// 查询按钮
function queryByMenu(e){
	var value = $(e.target).text();
	$('#dropdownBtn').text(value).append('<span class="caret">');
	query();
}

// 删除回访详情
function delvisit(rowData){
	$.messager.confirm("", "确定删除该条回访信息？", function() { 
		$.ajax({
			url : 'delVisit.do',
			data : {
				'visitID' : rowData.visitID
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
					$('#visitData').bootstrapTable('refresh');
				}
			}
		});
    });
}

function openEveryLoginCount(email,platform){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	$('#everyLoginCount').bootstrapTable('destroy');
	var heightWin = $(window).height() - 340;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#everyLoginCount').bootstrapTable({
		url : 'getEveryLoginCount.do',
		cardView:cardView,
		undefinedText:"",
		height:heightWin,
        cache: false,
        striped: true,
        pagination : true,
        search : true,
        showColumns : true,
        showToggle : true,
        showRefresh : true,
        queryParams : {'email' : email,'startDate' : startDate,
			'endDate' : endDate,"platform":platform},
        responseHandler : function(data){
        	return data.content;
        }
    });
	$('#viewLoginCountModal').modal({backdrop: 'static', keyboard: false});
}

function viewgame(email,platform){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	$('#gameData').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 200;
	$('#gameData').bootstrapTable({
		url : 'queryGameList.do',
		cardView:cardView,
		undefinedText:"",
		height:height,
        striped: true,
        search : true,
        pagination : true,
        showColumns : true,
        showToggle : true,
        showRefresh : true,
        queryParams : {'startDate':startDate,'endDate':endDate,'email' : email, 'platform' : platform},
        responseHandler : function(data){
        	var roleType = $('#roleinput').val();
            var department = $('#deparmentinput').val();
            if (roleType == '00000003' && department == '3') {
                $('#gameData').bootstrapTable('hideColumn', 'newEquipNum');
            } else {
                 $('#gameData').bootstrapTable('showColumn', 'newEquipNum');
            }
        	return data.content;
        }
    });
	$('#viewGameinfo').modal({backdrop: 'static', keyboard: false});


}

//子账号分析
function initChildAccountData(){
    var heightWin = $(window).height() - 150;
    var cardView = false;
    if ($(window).width() <= 768) {
        cardView = true;
    }
    $('#childAccountData').bootstrapTable({
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
            var options = $("#childAccountData").bootstrapTable('getOptions');
            var name = options.sortName;
            var order = options.sortOrder;
            var keyValue = $('#searchCompany').val();
            getChildAccountData(pageNumber,pageSize,name,order,keyValue);
        },
        onSort : function (name,order) {
            var options = $("#childAccountData").bootstrapTable('getOptions');
            var pageNumber = options.pageNumber;
            var pageSize = options.pageSize;
            var keyValue = $('#searchCompany').val();
            getChildAccountData(pageNumber,pageSize,name,order,keyValue);
        }
    });
    getChildAccountData(1,50);
}

function getChildAccountData(pageNumber,pageSize,sortName,order,keyValue){
	var queryParam = buildCondition(pageNumber,pageSize,sortName,order,keyValue);
	$('#childAccountData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getChildAccountList.do',
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
				$('#childAccountCount').html(data.content.childAccount);
				$('#childAccountData').bootstrapTable("hideLoading");
				$('#childAccountData').bootstrapTable('load', datasource);
				$('.channelSwitch').bootstrapSwitch('size','small');
				addActiveClass();
			}
		}
	});
}


function buildCondition(pageNumber,pageSize,sortName,order,keyValue){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;

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

function viewtracker(email){
	$('#trackerData').bootstrapTable('destroy');
    	var cardView = false;
    	if ($(window).width() <= 768) {
    		cardView = true;
    	}
    	var height = $(window).height() - 200;
    	$('#trackerData').bootstrapTable({
    		url : 'getTrackerInfo.do',
    		cardView:cardView,
    		undefinedText:"",
    		height:height,
            cache: false,
            striped: true,
            pagination : true,
            search : true,
            showColumns : true,
            showToggle : true,
            showRefresh : true,
            queryParams : {'email' : email},
            responseHandler : function(data){
            	return data.content;
            }
        });
    	$('#viewTrackerInfo').modal({backdrop: 'static', keyboard: false});
}


//collapse panel list function
$('#byDay').on('shown.bs.collapse', function () {
   newUserLineCharts("getChartRegDatas.do","platformRegLineByDay",0);
})

$('#byWeek').on('shown.bs.collapse', function () {
   newUserLineCharts("getChartRegDatas.do","platformRegLineByWeek",1);
})

$('#byMonth').on('shown.bs.collapse', function () {
  newUserLineCharts("getChartRegDatas.do","platformRegLineByMonth",2);
})


$('#byDayAD').on('shown.bs.collapse', function () {
   allActiveDeviceLineCharts("getAllActiveDeviceCount.do","allActiveDeviceByDay",0);
})

$('#byWeekAD').on('shown.bs.collapse', function () {
   allActiveDeviceLineCharts("getAllActiveDeviceCount.do","allActiveDeviceByWeek",1);
})

$('#byMonthAD').on('shown.bs.collapse', function () {
  allActiveDeviceLineCharts("getAllActiveDeviceCount.do","allActiveDeviceByMonth",2);
})



