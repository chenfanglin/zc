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
	initProblemTable(); // 默认显示CP问题反馈
}

/**
 * 服务端分页，通过ajax获取请求数据（CP问题反馈）
 */
function getData(pageNumber,pageSize,sortName,order){
	var queryParam = buildCondition(pageNumber,pageSize,sortName,order);
	$('#operationData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getOperations.do',
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
						rows : data.content.problem
					};
				$('#operationData').bootstrapTable("hideLoading");
				$('#operationData').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

/**
 * 服务端分页，通过ajax获取请求数据（回访详情）
 */
function getVisitData(pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var operations = $('#operationsfilter1').val();
	if (operations == -1) {
		operations = '';
	}
	var customerStatus = $('#customerStatusfilter').val();
	if ( customerStatus == -1) {
		customerStatus = '';
	}
	var keyValue = $('#serachVisit').val();
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'operations' : operations,
			'customerStatus' : customerStatus,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order,
			'keyValue' : keyValue
		};
	$('#visitData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getVisitDatas.do',
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
						rows : data.content.visitData
					};
				$('#visitData').bootstrapTable("hideLoading");
				$('#visitData').bootstrapTable('load', datasource);
			}
		}
	});
}
// 构造查询条件
function buildCondition(pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var operations = $('#operationsfilter').val();
	if (operations == -1) {
		operations = '';
	}
	var technicalers = $('#technicalersfilter').val();
	if (technicalers == -1) {
		technicalers = '';
	}
	var problemType = $('#problemTypefilter').val();
	if (problemType == -1) {
		problemType = '';
	}
	var detailType = $('#subdivisionTypefilter').val();
	if (detailType == -1) {
		detailType = '';
	}
	var problemStatus = $('#problemStatusfilter').val();
	if (problemStatus == -1) {
		problemStatus = '';
	} 
	var platform = $('#platformfilter').val();
	if (platform == -1) {
		platform = '';
	}
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'operations' : operations,
			'technicalers' : technicalers,
			'problemType' : problemType,
			'detailType' : detailType,
			'problemStatus' : problemStatus,
			'platform' : platform,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order
		};
	return queryParam;
}
// 初始化CP问题反馈
function initProblemTable(){
	initProblemFilter();
	var heightWin = $(window).height() - 160;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#operationData').bootstrapTable({
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
        	var options = $("#operationData").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getData(pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = $("#operationData").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getData(pageNumber,pageSize,name,order);
        },
        rowStyle: function(row, index) {
        	if (row.problemStatus == '00000001') {
        		return {classes: "waring_info"};
        	} else if (row.problemStatus == '00000004') {
        		return {classes: "info_info"};
        	} else {
        		return {};
        	}
        }
    });
	initprivilege($('#operationData'));
	getData(1,50);
}

// 初始化回访详情
function initVisitTable(){
	initVisitFilter();
	var heightWin = $(window).height() - 160;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#visitData').bootstrapTable({
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
        	var options = $("#visitData").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getVisitData(pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = $("#visitData").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getVisitData(pageNumber,pageSize,name,order);
        }
    });
	initprivilege($('#visitData'));
	getVisitData(1,50);
}

/**
 * 绑定事件
 */
function bindEvent(){
	/**
	 * 格式化列，点击列中按钮的事件
	 */
	window.problemEvents = {
		'click .edit': function (e, value, row, index) {
			openEditProblem(row);
		}
	};
	window.visitEvents = {
		'click .edit': function (e, value, row, index) {
			openEditVisit(row);
		}
	};
	window.viewCustomerInfo = {
			'click .customerName': function (e, value, row, index) {
				window.location.href = "customerInfo.jsp?menuID=2&customerID="+row.customerID;
			}
		};
	// 生成图表
	$('#makeReport').click(function(){
		openReport();
	});
	// 绑定问题类型下拉事件
	$("#problemTypefilter").change(function(){
		var value = $(this).children('option:selected').val();
		initSelectbox($("#subdivisionTypefilter"),value,2,true);
	});
	// 绑定问题类型下拉事件
	$("#problemTypeSelect").change(function(){
		var value = $(this).children('option:selected').val();
		initSelectbox($("#detailTypeSelect"),value,2,true);
	});
	// 确认修改CP反馈问题
	$('#saveProblemInfo').click(function(){
		updateProblemInfo();
	});
	// 确认修改回访详情
	$('#saveVisitInfo').click(function(){
		updateVisitInfo();
	});
	//切换标签页
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	      toggleTab(e);
	});
	// 确认查询CP问题反馈
	$("#confirm").click(function(){
		getData(1,50);
		$("#cpProblem").toggle();
		hidefilter();
	});
	// 确认查询回访详情
	$("#confirmVisit").click(function(){
		getVisitData(1,50);
		$("#visitfilter").toggle();
		hidefilter();
	});
	// 选择平台
	$('#platformTypeSelect').change(function(){
		var platform = $(this).children('option:selected').val();
		if (platform == '-1') {
			platform = "";
		}
		queryReportByPlatform(platform);
	});
	// 回访详情取消
	$('#visitcancel').click(function(){
		$("#visitfilter").toggle();
		hidefilter();
	});
	// CP问题反馈取消
	$('#problemcancel').click(function(){
		$("#cpProblem").toggle();
		hidefilter();
	});
	// 筛选过滤按钮
	$('#filterBtn').click(function(){
		filterBtn();
	});
	// 导出Excel
	$('#exportExcel').click(function(){
		exportExcel();
	});
	// 搜索
	$('#serachVisit').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	keySearch(); 
        } 
    });
	
}

// 编辑CP反馈问题
function openEditProblem(rowData){
	$("#editProblem").modal({backdrop: 'static', keyboard: false});
	$("#inputcustomerName").val(rowData.customerName);
	$("#inputproblemID").val(rowData.problemID);
	//g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。m 执行多行匹配。
	$("#detailProblem").val(rowData.detailProblem.replace(new RegExp("<br>","gm"),"\n"));
	$("#soloveWay").val(rowData.solution.replace(new RegExp("<br>","gm"),"\n"));
	initSelectbox($("#platformSelect"),'10001012',0);
	initSelectbox($("#problemTypeSelect"),'10001006',0);
	initSelectbox($("#detailTypeSelect"),rowData.problemType,2);
	initSelectbox($("#problemStatusSelect"),'10001007',0);
	$("#platformSelect").val(rowData.platform);
	$("#problemTypeSelect").val(rowData.problemType);
	$("#detailTypeSelect").val(rowData.typeID);
	$("#problemStatusSelect").val(rowData.problemStatus);
	$("#solovetime").datetimepicker({format: 'yyyy-mm-dd',todayBtn: true,autoclose: true,todayHighlight: 1,startView: 2,minView: 2});
	$("#solovetime").val(rowData.solveTime);
}

// 更新CP反馈问题
function updateProblemInfo(){
	var problem = {
			'problemID' : $("#inputproblemID").val(),
			'platform' : $("#platformSelect").val(),
			'platformName' : $("#platformSelect").find("option:selected").text(),
			'problemType' : $("#problemTypeSelect").val(),
			'problemTypeName' : $("#problemTypeSelect").find("option:selected").text(),
			'subdivisionType' : $("#detailTypeSelect").val(),
			'problemStatus' : $("#problemStatusSelect").val(),
			'problemStatusName' : $("#problemStatusSelect").find("option:selected").text(),
			'solveTime' : $("#solovetime").val(),
			'detailProblem' : $("#detailProblem").val().replace(new RegExp("\n","gm"),"<br>"),
			'solution' : $("#soloveWay").val().replace(new RegExp("\n","gm"),"<br>")
	};
	$.ajax({
		url : 'saveOperationData.do',
		data : {
			'problem' : JSON.stringify(problem)
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
				$("#editProblem").modal('hide');
				refreshTable($('#operationData'));
			}
		}
	});
}

// 初始化CP问题反馈过滤条件
function initProblemFilter(){
	$.ajax({
		url : 'getProblemSelect.do',
		method : "post",
		async : false,
		success : function(data) {
			var operations = data.content.operations;
			var technology = data.content.technology;
			var problemType = data.content.problemType;
			var problemStatus = data.content.problemStatus;
			var platformType = data.content.platformType;
			var option = setOption(operations);
			$("#operationsfilter").html(option.join(""));
			option = setOption(technology);
			$("#technicalersfilter").html(option.join(""));
			option = setOption(problemType);
			$("#problemTypefilter").html(option.join(""));
			option = setOption(problemStatus);
			$("#problemStatusfilter").html(option.join(""));
			option = setOption(platformType);
			$("#platformfilter").html(option.join(""));
		}
	});
}

// 初始化回访详情过滤条件
function initVisitFilter(){
	$.ajax({
		url : 'getVisitSelect.do',
		method : "post",
		async : false,
		success : function(data) {
			var operations = data.content.operations;
			var customerStatus = data.content.customerStatus;
			var option = setOption(operations);
			$("#operationsfilter1").html(option.join(""));
			option = setOption(customerStatus);
			$("#customerStatusfilter").html(option.join(""));
		}
	});
}

// 查看报表
function openReport(){
	initSelectbox($("#platformTypeSelect"),'10001012',0,1);
	$("#viewReport").modal({backdrop: 'static', keyboard: false});
	$('#problemTab a:first').tab('show');
	showCharts("getProblemAccount.do","collectpiesChart","");
}

// 切换标签页
function toggleTab(e){
	// 获取已激活的标签页的名称
    var activeTab = $(e.target).text();
    if ($(e.target)[0].title) {
  	  activeTab = $(e.target)[0].title;
    }
    var chartID = $($(e.target)[0]).find('input').val();
    var platform = $("#platformTypeSelect").val();
    if (platform == '-1') {
		platform = "";
	}
    var problemType = $(e.target)[0].className;
    if (activeTab == "回访详情") {
  	  $("#cpProblem").hide();
  	  $("#visitfilter").show();
  	  $("#serachVisit").show();
  	  $('#exportExcel').hide();
  	  $('#makeReport').hide();
  	  $("#visitfilter").toggle();
  	  initVisitTable();
    } else if (activeTab == "CP问题反馈"){
  	  $("#cpProblem").show();
  	  $("#visitfilter").hide();
  	  $("#serachVisit").hide();
	  $('#exportExcel').show();
	  $('#makeReport').show();
  	  $("#cpProblem").toggle();
  	  initProblemTable(); 
    } else if (activeTab == "汇总") {
    	$($(e.target)[0].hash +' a:first').tab('show');
    	showCharts("getProblemAccount.do",chartID,platform);
    } else if (activeTab == "咨询") {
    	$($(e.target)[0].hash +' a:first').tab('show');
    	showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
    } else if (activeTab == "BUG") {
    	$($(e.target)[0].hash +' a:first').tab('show');
    	showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
    } else if (activeTab == "数据") {
    	$($(e.target)[0].hash +' a:first').tab('show');
    	showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
    } else if (activeTab == "接入") {
    	$($(e.target)[0].hash +' a:first').tab('show');
    	showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
    } else if (activeTab == "饼图") {
    	if (problemType) {
    		showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
    	} else {
    		showCharts("getProblemAccount.do",chartID,platform);
    	}
    } else if (activeTab == "曲线图") {
    	if (problemType) {
    		lineCharts("getDiffTypeChartDatas.do",chartID,platform,problemType);
    	} else {
    		lineCharts("getChartDatas.do",chartID,platform);
    	}
    } else if (activeTab == "表格") {
    	if (problemType) {
    		showDynamicTables($('#'+chartID), 'getChartTabDiffTypeDatas.do',platform,problemType);
    	} else {
    		showDynamicTables($('#'+chartID), 'getChartTabDatas.do',platform);
    	}
    }
}

// 根据平台查报表
function queryReportByPlatform(platform){
	for (var i = 0;i < $("#problemTab > li").length;i++) {
		if ($($("#problemTab > li")[i]).hasClass('active')) {
			var tabName = $($("#problemTab > li")[i]).text();
			var chartID = $($("#problemTab > li")[i]).find('input').val();
			var problemType = $($("#problemTab > li")[i]).find('a')[0].className
			if (tabName == "汇总") {
				showCharts("getProblemAccount.do",chartID,platform);
			} else if (tabName == "咨询"){
				showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
		    } else if (tabName == "数据") {
		    	showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
		    } else if (tabName == "接入") {
		    	showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
		    } else if (tabName == "BUG") {
		    	showCharts("getProblemDiffTypeAccount.do",chartID,platform,problemType);
		    }
		}
	}
}

// 筛选过滤
function filterBtn() {
	for (var i = 0;i < $("#cpTab > li").length;i++) {
		if ($($("#cpTab > li")[i]).hasClass('active')) {
			var tabName = $($("#cpTab > li")[i]).text();
			if (tabName == "CP问题反馈") {
				$("#cpProblem").toggle();
			} else if (tabName == "回访详情"){
				$("#visitfilter").toggle();
			}
		}
	}
	if ($("#iconbtn").hasClass('up-icon') == true){
		showfilter();
	} else {
		hidefilter();
	}
}

//查询
function query(){
	for (var i = 0;i < $("#cpTab > li").length;i++) {
		if ($($("#cpTab > li")[i]).hasClass('active')) {
			var tabName = $($("#cpTab > li")[i]).text();
			if (tabName == "CP问题反馈") {
				getData(1,50);
			} else if (tabName == "回访详情"){
				getVisitData(1,50);
			}
		}
	}
}

// 关键字搜索
function keySearch(){
	var options = $("#visitData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	getVisitData(1,50,name,order);
}

// 导出Excel
function exportExcel(){
	var options = $("#operationData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var queryParam = buildCondition(1, 50, name, order);
	window.location = "exportOperation.do?queryParam="+JSON.stringify(queryParam);
}