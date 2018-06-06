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
	initBusinessTable();
}

// 初始化商务跟进表格
function initBusinessTable(){
	initBusinessFilter();
	var heightWin = $(window).height() - 160;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#businessData').bootstrapTable({
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
        	var options = $("#businessData").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getData(pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = $("#businessData").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getData(pageNumber,pageSize,name,order);
        }
    });
	initprivilege($('#businessData'));
	getData(1,50);
}

// 初始化回访详情表格
function initVisitTable(){
	initVisitFilter();
	var heightWin = $(window).height() - 120;
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
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber,pageSize,sortName,order){
	var beginDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var businesser = $('#businesserfilter').val();
	if (businesser == -1) {
		businesser = '';
	}
	var city = $('#cityfilter').val();
	if (city == -1) {
		city = '';
	}
	var clue = $('#cluefilter').val();
	if (clue == -1) {
		clue = '';
	}
	var dataStatus = $('#datafilter').val();
	if (dataStatus == -1) {
		dataStatus = '';
	}
	var paramModel = {
			'beginDate' : beginDate,
			'endDate' : endDate,
			'businesser' : businesser,
			'city' : city,
			'clue' : clue,
			'dataStatus' : dataStatus,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order
		};
	$('#businessData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getAllBusiness.do',
		data : {
			'paramModel' : JSON.stringify(paramModel)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else {
				var datasource = {
						total : data.content.totalRecord,
						rows : data.content.business
					};
				$('#businessData').bootstrapTable("hideLoading");
				$('#businessData').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getVisitData(pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var businesser = $('#businesserfilter1').val();
	if (businesser == -1) {
		businesser = '';
	}
	var customerStatus = $('#customerStatusfilter').val();
	if ( customerStatus == -1) {
		customerStatus = '';
	}
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'businesser' : businesser,
			'customerStatus' : customerStatus,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order
		};
	$('#visitData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getBusinessVisitDatas.do',
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
				addActiveClass();
			}
		}
	});
}

/**
 * 绑定事件
 */
function bindEvent(){
	$('#confirm').click(function(){
		getData(1,50);
		$("#cpBusiness").toggle();
		hidefilter();
	});
	$('#confirmVisit').click(function(){
		getVisitData(1,50);
		$("#visitfilter").toggle();
		hidefilter();
	});
	// 确认修改回访详情
	$('#saveVisitInfo').click(function(){
		updateVisitInfo();
	});
	//格式化列，点击列中按钮的事件
	window.businessEvents = {
		'click .edit': function (e, value, row, index) {
			openEditBusiness(row);
		},
	    'click .remove': function (e, value, row, index) {
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
	
	//切换标签页
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	      toggleTab(e);
	});
	// 回访详情取消
	$('#visitcancel').click(function(){
		$("#visitfilter").toggle();
		hidefilter();
	});
	// CP问题反馈取消
	$('#businesscancel').click(function(){
		$("#cpBusiness").toggle();
		hidefilter();
	});
	// 筛选过滤按钮
	$('#filterBtn').click(function(){
		filterBtn();
	});
}

// 打开编辑商务跟进页面
function openEditBusiness(rowData){
	$.ajax({
		url : 'getCreateBusinessSelect.do',
		method : "post",
		async : true,
		success : function(data) {
			var city = data.content.city;
			var clueStatus = data.content.clueStatus;
			var dataStatus = data.content.dataStatus;
			var option = setOption(city,1);
			$("#citySelect").html(option.join(""));
			option = setOption(clueStatus,1);
			$("#clueSelect").html(option.join(""));
			option = setOption(dataStatus,1);
			$("#dataSelect").html(option.join(""));
			$("#citySelect").val(rowData.city);
			$("#clueSelect").val(rowData.clue);
			$("#dataSelect").val(rowData.dataStatus);
		}
	});
	$('#inputcustomerName').val(rowData.customerName);
	$('#communicateStatus').val(rowData.communicateStatus.replace(new RegExp("<br>","gm"),"\n"));
	$('#saveBusinessInfo').click(function(){
		updateBusinessInfo(rowData);
	});
	$("#editBusiness").modal();
}

// 修改商务跟进信息
function updateBusinessInfo(rowData){
	var business = {
			'city' : $('#citySelect').val(),
			'cityValue' : $("#citySelect").find("option:selected").text(),
			'clue' : $('#clueSelect').val(),
			'clueValue' : $("#clueSelect").find("option:selected").text(),
			'dataStatus' : $('#dataSelect').val(),
			'dataStatusValue' : $("#dataSelect").find("option:selected").text(),
			'communicateStatus' : $('#communicateStatus').val().replace(new RegExp("\n","gm"),"<br>"),
			'businessID' : rowData.businessID
	};
	$.ajax({
		url : 'saveBusinessData.do',
		data : {
			'business' : JSON.stringify(business)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup("修改成功");
			$("#editBusiness").modal('hide');
			refreshTable($('#businessData'));
		}
	});
}

//切换标签页
function toggleTab(e){
	$("#editGameInfo").modal({backdrop: 'static', keyboard: false});
	// 获取已激活的标签页的名称
    var activeTab = $(e.target).text();
    if ($(e.target)[0].title) {
  	  activeTab = $(e.target)[0].title;
    }
    if (activeTab == "回访详情") {
  	  $("#cpBusiness").hide();
  	  $("#visitfilter").show();
  	  $("#visitfilter").toggle();
  	  initVisitTable();
    } else if (activeTab == "跟进信息"){
  	  $("#cpBusiness").show();
  	  $("#visitfilter").hide();
  	  $("#cpBusiness").toggle();
  	  initBusinessTable(); 
    } 
}

// 商务跟进过滤条件
function initBusinessFilter(){
	$.ajax({
		url : 'getCreateBusinessSelect.do',
		method : "post",
		async : false,
		success : function(data) {
			var city = data.content.city;
			var clueStatus = data.content.clueStatus;
			var dataStatus = data.content.dataStatus;
			var businesser = data.content.businesser;
			var option = setOption(city);
			$("#cityfilter").html(option.join(""));
			option = setOption(clueStatus);
			$("#cluefilter").html(option.join(""));
			option = setOption(dataStatus);
			$("#datafilter").html(option.join(""));
			option = setOption(businesser);
			$("#businesserfilter").html(option.join(""));
		}
	});
}

//初始化回访详情过滤条件
function initVisitFilter(){
	$.ajax({
		url : 'getVisitSelect.do',
		method : "post",
		async : false,
		success : function(data) {
			var businesser = data.content.businesser;
			var customerStatus = data.content.customerStatus;
			var option = setOption(businesser);
			$("#businesserfilter1").html(option.join(""));
			option = setOption(customerStatus);
			$("#customerStatusfilter").html(option.join(""));
		}
	});
}
//筛选过滤
function filterBtn() {
	for (var i = 0;i < $("#cpTab > li").length;i++) {
		if ($($("#cpTab > li")[i]).hasClass('active')) {
			var tabName = $($("#cpTab > li")[i]).text();
			if (tabName == "跟进信息") {
				$("#cpBusiness").toggle();
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
// 查询
function query(){
	for (var i = 0;i < $("#cpTab > li").length;i++) {
		if ($($("#cpTab > li")[i]).hasClass('active')) {
			var tabName = $($("#cpTab > li")[i]).text();
			if (tabName == "跟进信息") {
				getData(1,50);
			} else if (tabName == "回访详情"){
				getVisitData(1, 50);
			}
		}
	}
}
