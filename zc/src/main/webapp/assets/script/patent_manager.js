$(function() {
	initPages();
	bindEvent();
})

function initPages() {
	// 初始化日期控件
	initDateSelect();
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#patentData').bootstrapTable({
		cardView : cardView,
		undefinedText : "",
		cache : false,
		height : heightWin,
		striped : true,
		pagination : true,
		pageSize : 100,
		pageList : [ 10, 25, 50, 100, 200 ],
		sidePagination : "server",
		onPageChange : function(pageNumber, pageSize) {
			var options = $("#patentData").bootstrapTable('getOptions');
			var name = options.sortName;
			var order = options.sortOrder;
			getData(pageNumber, pageSize, name, order);
		},
		onSort : function(name, order) {
			var options = $("#patentData").bootstrapTable('getOptions');
			var pageNumber = options.pageNumber;
			var pageSize = options.pageSize;
			getData(pageNumber, pageSize, name, order);
		},
		rowStyle : function(row, index) {
			if (index % 2 == 0) {
				return {
					classes : "odd_row"
				};
			} else {
				return {
					classes : "even_row"
				};
			}
		}
	});
	getData(1, 50);
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber, pageSize, sortName, order) {
	var patentType = $('#patentTypeFilter').val();
	var patentStatus = $('#patentStatusFilter').val();
	var isBatch = $('#isBatchFilter').val();
	var keyValue = $('#serachPatents').val();
	$('#patentData').bootstrapTable("showLoading");
	$.ajax({
		url : '../query_patent_list.do',
		data : {
			'patent_type' : patentType,
			'patent_status' : patentStatus,
			'is_batch' : isBatch,
			'flag':"admin",
			'page_num' : pageNumber,
			'page_size' : pageSize,
			'keyword' : keyValue
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else {
				var datasource = {
					total : data.content.totalRecord,
					rows : data.content.data
				};
				$('#patentData').bootstrapTable("hideLoading");
				$('#patentData').bootstrapTable('load', datasource);
				$('.channelSwitch').bootstrapSwitch('size','small');
				addActiveClass();
			}
		}
	});
}


function bindEvent() {
	$('#createPatent').click(function(){
		openCreatePatent();
	});
	$('#uploadPatent').click(function(){
		openUploadPatent();
	});
	$('#addPatent').click(function(){
		addPatent();
	});
	$('#updatePatent').click(function(){
		updatePatent();
	});
	// 查询
	$("#confirm").click(function(e){
		query();
		cancel();
	});
	// 搜索
	$('#serachPatents').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	query();
        } 
    });
	// 修改专利信息
	window.patentEvents = {
		'click .edit': function (e, value, row, index) {
			openUpdatePatent(row);
		},
	    'click .remove': function (e, value, row, index) {
	    	delPatentInfo(row);
	    }
	};
	// 
	window.showEvents = {
		'switchChange.bootstrapSwitch .channelSwitch': function (e, value, row, index) {
			if (e.target.checked == true) {
				changePatentStatus(row.patentId, 0, "开启成功");
			} else {
				changePatentStatus(row.patentId, 1, "关闭成功");
			}
		}
	};
	$("#uploadPatents").on("fileuploaded", function (event, data, previewId, index) {
		$.messager.popup(data.response.content);
    });
}

//开通关闭
function changePatentStatus(patentId,isShow,message){
	$.ajax({
		url : '../del_patent.do',
		data : {
			"patent_id" : patentId,
			"is_show":isShow
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup(message);
		}
	});
}

/**
 * 删除专利
 * @param rowData
 * @returns
 */
function delPatentInfo(rowData){
	$.messager.confirm("", "确定删除该条专利？", function() { 
		$.ajax({
			url : '../del_patent.do',
			data : {
				'patent_id' : rowData.patentId
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
					refreshTable($('#patentData'));
				}
			}
		});
    });
}

/**
 * 查询
 * @returns
 */
function query(){
	var options = $("#patentData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	getData(pageNumber,pageSize,name,order);
}

/**
 * 打开创建专利面板
 * @returns
 */
function openCreatePatent(){
	$("#addPatentModal").modal({backdrop: 'static', keyboard: false});
	$("#publishTime").datetimepicker({format: 'yyyy-mm-dd HH:mm:ss',todayBtn: true,autoclose: true,todayHighlight: 1,startView: 2,minView: 2});
}

/**
 * 打开上传专利面板
 * @returns
 */
function openUploadPatent(){
	$("#uploadPatentModal").modal({backdrop: 'static', keyboard: false});
	$('#uploadPatents').fileinput({
		enctype: 'multipart/form-data',
        showUpload: true, //是否显示上传按钮
        showCaption: false,//是否显示标题
        uploadUrl: "upload_patents.do", //上传的地址
        uploadAsync: true,
        maxFileCount : 1,
        maxFileSize : 500000,//
        allowedFileExtensions : ['xls', 'xlsx'],//接收的文件后缀
    });
}

/**
 * 打开修改专利面板
 * @param rowData
 * @returns
 */
function openUpdatePatent(rowData) {
	$("#updatePatentModal").modal({backdrop: 'static', keyboard: false});
	$("#publishTime1").datetimepicker({format: 'yyyy-mm-dd HH:mm:ss',todayBtn: true,autoclose: true,todayHighlight: 1,startView: 2,minView: 2});
	$('#inputPatentId1').val(rowData.patentId);
	$('#publishTime1').val(rowData.publishTime);
	$('#inputPatentName1').val(rowData.patentName);
	$('#inputPatentType1').val(rowData.patentType);
	$('#inputPatentPrice1').val(rowData.patentPrice);
	$('#inputPatentStatus1').val(rowData.patentStatus);
	$('#inputIsBatch1').val(rowData.isBatch);
	$('#inputIndustry1').val(rowData.industry);
	$('#inputQQ1').val(rowData.userQQ);
	$('#inputWX1').val(rowData.userWX);
	$('#inputPublishYear1').val(rowData.publishYear);
	$('#inputPatentUrl1').val(rowData.patentUrl);
	
	$('#inputPatentee1').val(rowData.patentee);
	$('#inputSalesStatus1').val(rowData.salesStatus);
	$('#inputSellerContact1').val(rowData.sellerContact);
	$('#inputContact1').val(rowData.contact);
}

/**
 * 修改专利
 */
function updatePatent() {
	var patentTypeName = $('#inputPatentType1').find("option:selected").text();
	if (patentTypeName == '请选择') {
		patentTypeName = "";
	}
	var patent_status_name = $('#inputPatentStatus1').find("option:selected").text();
	if (patent_status_name == '请选择') {
		patent_status_name = "";
	}
	var is_batch_name = $('#inputIsBatch1').find("option:selected").text();
	if (is_batch_name == '请选择') {
		is_batch_name = "";
	}
	var industry_name = $('#inputIndustry1').find("option:selected").text();
	if (industry_name == '请选择') {
		industry_name = "";
	}
	$.ajax({
		url : '../update_patent.do',
		data : {
			'patent_id' : $('#inputPatentId1').val(),
			'publish_time' : $('#publishTime1').val(),
			'patent_name' : $('#inputPatentName1').val(),
			'patent_type' : $('#inputPatentType1').val(),
			'patent_type_name' : patentTypeName,
			'patent_price' : $('#inputPatentPrice1').val(),
			'patent_status' : $('#inputPatentStatus1').val(),
			'patent_status_name' : patent_status_name,
			'is_batch' : $('#inputIsBatch1').val(),
			'is_batch_name' : is_batch_name,
			'industry' : $('#inputIndustry1').val(),
			'industry_name' : industry_name,
			'user_qq' : $('#inputQQ1').val(),
			'user_wx' : $('#inputWX1').val(),
			'publish_year' : $('#inputPublishYear1').val(),
			'patent_url' : $('#inputPatentUrl1').val(),
			'patentee' : $('#inputPatentee1').val(),
			'sales_status' : $('#inputSalesStatus1').val(),
			'seller_contact' : $('#inputSellerContact1').val(),
			'contact' : $('#inputContact1').val()
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
				$("#updatePatentModal").modal('hide');
				refreshTable($('#patentData'));
			}
		}
	});
}

// 新增专利
function addPatent(){
	var patentTypeName = $('#inputPatentType').find("option:selected").text();
	if (patentTypeName == '请选择') {
		patentTypeName = "";
	}
	var patent_status_name = $('#inputPatentStatus').find("option:selected").text();
	if (patent_status_name == '请选择') {
		patent_status_name = "";
	}
	var is_batch_name = $('#inputIsBatch').find("option:selected").text();
	if (is_batch_name == '请选择') {
		is_batch_name = "";
	}
	var industry_name = $('#inputIndustry').find("option:selected").text();
	if (industry_name == '请选择') {
		industry_name = "";
	}
	$.ajax({
		url : '../add_patent.do',
		data : {
			'patent_id' : $('#inputPatentId').val(),
			'publish_time' : $('#publishTime').val(),
			'patent_name' : $('#inputPatentName').val(),
			'patent_type' : $('#inputPatentType').val(),
			'patent_type_name' : patentTypeName,
			'patent_price' : $('#inputPatentPrice').val(),
			'patent_status' : $('#inputPatentStatus').val(),
			'patent_status_name' : patent_status_name,
			'is_batch' : $('#inputIsBatch').val(),
			'is_batch_name' : is_batch_name,
			'industry' : $('#inputIndustry').val(),
			'industry_name' : industry_name,
			'user_qq' : $('#inputQQ').val(),
			'user_wx' : $('#inputWX').val(),
			'publish_year' : $('#inputPublishYear').val(),
			'patent_url' : $('#inputPatentUrl').val(),
			'patentee' : $('#inputPatentee').val(),
			'sales_status' : $('#inputSalesStatus').val(),
			'seller_contact' : $('#inputSellerContact').val(),
			'contact' : $('#inputContact').val()
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
				$("#addPatentModal").modal('hide');
				refreshTable($('#patentData'));
			}
		}
	});
}

/**
 * 置顶
 * @param patentId
 * @returns
 */
function makeTop(patentId,isTop) {
	$.ajax({
		url : '../make_top.do',
		data : {
			"patent_id" : patentId,
			"is_top":isTop
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup(data.content);
			refreshTable($('#patentData'));
		}
	});
}
