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
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#checkUsers').bootstrapTable({
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
        	var options = $("#checkUsers").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getData(pageNumber,pageSize,name,order);
        },
        onSort: function(name, order){
        	var options = $("#checkUsers").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getData(pageNumber,pageSize,name, order);
        },
        rowStyle: function(row, index) {
        	if (index % 2 == 0) {
        		return {classes: "odd_row"};
        	} else {
        		return {classes: "even_row"};
        	}
        }
    });
	getData(1,50);
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber,pageSize,sortName,order,keyValue){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	// 状态
//	var status = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
	var status = $('#dropdownBtn').find('input').val();
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'status': status,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order,
			'keyValue':keyValue
		};
	$('#checkUsers').bootstrapTable("showLoading");
	$.ajax({
		url : 'queryPtloginUserlist.do',
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
						rows : data.content.checkUsers
					};
				$('#checkUsers').bootstrapTable("hideLoading");
				$('#checkUsers').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}
/**
 * 绑定事件
 */
function bindEvent(){
	$("#confirm").click(function(e){
		query();
	});
	// 确定审核
	$("#checkPtlogin").click(function(){
		auditPtloginUser();
	});
	// 搜索
	$('#searchUsers').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	var keyValue = $('#searchUsers').val();
        	keySearch(keyValue); 
        } 
    });
	/**
	 * 格式化列，点击列中按钮的事件
	 */
//	window.checkEvents = {
//		'click button': function (e, value, row, index) {
//			openCheck(row);
//		}
//	};
	// 切换单选按钮
	$("input[name=checkRadios]").click(function(){
		toggleRadio();
	});
	// 按钮下拉菜单
	$('#btnMenu').click(function(e){
		queryByMenu(e);
	});
	$('#ipbtn').click(function(){
		iPAuthorize();
	});
}

// 确定审核
function auditPtloginUser(){
	var checkParam = {
			'uid' : $('#inputUID').val(),// 注册邮箱
			'type' : $('input[name="checkRadios"]:checked ').val(),// 2审核通过   1审核不通过
			'reason' : $('#reasonText').val(),// 不通过的原因
			'business' : $("#businessSelect").val(),
			'businessName' : $("#businessSelect").find("option:selected").text()
	};
	$.ajax({
		url : 'auditPtloginUser.do',
		data : {
			'checkParam' : JSON.stringify(checkParam)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 200) {
				$.messager.popup("操作成功");
			} else if (data.statusCode == 10) {
				$.messager.popup("邮件发送失败");
			} else if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else if (data.statusCode == 6) {
				$.messager.popup("用户不存在");
			} else if (data.statusCode == 4) {
				window.open("login.jsp");
			}
			var options = $("#checkUsers").bootstrapTable('getOptions');
			var name = options.sortName;
			var order = options.sortOrder;
			getData(1,50,name,order);
			$("#docheck").modal('hide');
		}
	});
}

// 搜索
function keySearch(keyValue) {
	var options = $("#checkUsers").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	getData(1,50,name,order,keyValue);
}

function check(uid){
	openCheck(uid);
}
// 打开审核窗口
function openCheck(uid){
	initSelectbox($("#businessSelect"),'3',1,0);
	$('#inputUID').val(uid);
	$("#docheck").modal({backdrop: 'static', keyboard: false});
}

// 切换状态
function toggleRadio(){
	var value = $('input[name="checkRadios"]:checked ').val();
	if (value == 2) {
		$('#reasonText').attr('disabled',"true");
		$('#businessSelect').removeAttr("disabled");
	} else if (value == 1){
		$('#reasonText').removeAttr("disabled"); 
		$('#businessSelect').attr('disabled',"true");;
	}
}

//查询按钮
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

// IP 授权
function iPAuthorize(){
	$.ajax({
		url : 'getIP.do',
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 200) {
				$.messager.popup("授权成功，您的IP："+data.content);
			} else if (data.statusCode == 403) {
				$.messager.popup("您没有操作权限，请联系系统管理员");
			} else if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else if (data.statusCode == 4) {
				window.open("login.jsp");
			}
		}
	});
}