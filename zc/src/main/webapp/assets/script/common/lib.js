/**
 * 公共函数库
 */
// 修改密码
function updatePwd() {
	$("#updatePwdModal").modal({
		backdrop : 'static',
		keyboard : false
	});
	$('#inputoldPassword').val('');
	$('#inputnewPassword').val('');
	$('#inputconfirmPassword').val('');
}
// 修改密码
function updatePassword() {
	var inputoldPassword = $('#inputoldPassword').val();
	var inputnewPassword = $('#inputnewPassword').val();
	var inputconfirmPassword = $('#inputconfirmPassword').val();
	if ($.trim(inputoldPassword).length == 0) {
		$(".check-error").show();
		$(".check-error").html("请输入原始密码");
		return;
	}
	if ($.trim(inputnewPassword).length == 0) {
		$(".check-error").show();
		$(".check-error").html("请输入新密码");
		return;
	}
	if ($.trim(inputconfirmPassword).length == 0) {
		$(".check-error").show();
		$(".check-error").html("请输入确认密码");
		return;
	}
	if (inputnewPassword != inputconfirmPassword) {
		$(".check-error").show();
		$(".check-error").html("新密码和确认密码不一致");
		return;
	}
	if (inputnewPassword.length < 6) {
		$(".check-error").show();
		$(".check-error").html("新密码长度不能少于6个字符。");
		return;
	}
	if (inputconfirmPassword.length < 6) {
		$(".check-error").show();
		$(".check-error").html("确认密码长度不能少于6个字符。");
		return;
	}
	$(".check-error").hide();
	$.ajax({
		url : 'update_pwd.do',
		data : {
			'old_password' : inputoldPassword,
			'password' : inputnewPassword
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 4) {
				window.open("login.jsp");
			} else if (data.statusCode == 402) {
				$.messager.popup('原始密码错误');
			} else {
				$.messager.popup('修改成功');
				$("#updatePwdModal").modal('hide');
			}
		}
	});
}
// 注销
function loginout() {
	$.messager.confirm("", "确定退出系统？", function() {
		location.href = 'loginout.do';
	});
}

/**
 * 增删改按钮
 */
function formatterCUD(value, row, index) {
	return [ '<a class="edit" href="javascript:void(0)" title="修改">',
			'<i class="glyphicon glyphicon-edit"></i>', '</a>&nbsp;',
			'<a class="remove" href="javascript:void(0)" title="删除">',
			'<i class="glyphicon glyphicon-remove"></i>', '</a>' ].join('');
}

/**
 * 修改
 */
function formatterEdit(value, row, index) {
	return '<a class="edit" href="javascript:void(0)" title="修改"><i class="glyphicon glyphicon-edit"></i></a>';
}

function formatterBtn(value, row, index) {
	if (row.isTop == 0) {
		return '<button onclick=makeTop("'+row.patentId+'","'+row.isTop+'") type="button" class="btn btn-primary btn-xs">置顶</button>';
	} else {
		return '<button onclick=makeTop("'+row.patentId+'","'+row.isTop+'") type="button" class="btn btn-primary btn-xs">取消置顶</button>';
	}
}

function formatterLoginStatus(value, row, index) {
	if (value > 0) {
		return '<span class="glyphicon glyphicon-star btn-important-highlight"></span>';
	} else {
		return '<span class="glyphicon glyphicon-star btn-grayed"></span>';
	}
}

function formatterSwitch(value, row, index) {
	if (row.isShow == 1) {
		// 未开通（未发放）
		return '<input class="channelSwitch" type="checkbox"/>';
	} else {
		// 已开通（已发放）
		return '<input class="channelSwitch" type="checkbox" checked=true/>';
	}
}


/**
 * 点击筛选按钮事件
 */
function controlfilter() {
	$(".filterpanel").toggle();
	if ($("#iconbtn").hasClass('up-icon') == true) {
		showfilter();
	} else {
		hidefilter();
	}
}

/**
 * 隐藏条件选择面板
 */
function hidefilter() {
	$("#iconbtn").removeClass("down-icon").addClass("up-icon");
	$("#filterBtn").removeClass("filterbtn").addClass("filterbtnborder");
}

/**
 * 显示条件选择面板
 */
function showfilter() {
	$("#iconbtn").removeClass("up-icon").addClass("down-icon");
	$("#filterBtn").removeClass("filterbtnborder").addClass("filterbtn");
}
// 初始化日期控件
var dateRange;
function initDateSelect() {
	var nowDate = new Date();
	var endDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-"
			+ nowDate.getDate();
	nowDate = nowDate.valueOf();
	var lastweek = nowDate - 7 * 24 * 60 * 60 * 1000;
	var lastDay = new Date(lastweek);
	var startDate = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1)
			+ "-" + lastDay.getDate();
	dateRange = new pickerDateRange('datevalue', {
		isTodayValid : true,
		startDate : startDate,
		endDate : endDate,
		defaultText : ' 至 ',
		inputTrigger : 'datetrigger',
		theme : 'ta',
		success : function(obj) {
			query();
		}
	});
	return dateRange;
}

//初始化日期控件
var dateMonthRange;
function initDateMonthSelect() {
	var nowDate = new Date();
	var endDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-"
			+ nowDate.getDate();
	nowDate = nowDate.valueOf();
	var lastweek = nowDate - 30 * 24 * 60 * 60 * 1000;
	var lastDay = new Date(lastweek);
	var startDate = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1)
			+ "-" + lastDay.getDate();
	dateMonthRange = new pickerDateRange('datevalue', {
		isTodayValid : true,
		startDate : startDate,
		endDate : endDate,
		defaultText : ' 至 ',
		inputTrigger : 'datemonthtrigger',
		theme : 'ta',
		success : function(obj) {
			query();
		}
	});
	return dateMonthRange;
}

//初始化日期控件
var dateNewGameRange;
function initDateNewGameSelect() {
	var nowDate = new Date();
	var endDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-"
			+ nowDate.getDate();
	nowDate = nowDate.valueOf();
	var lastweek = nowDate - 30 * 24 * 60 * 60 * 1000;
	var lastDay = new Date(lastweek);
	var startDate = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1)
			+ "-" + lastDay.getDate();
	dateNewGameRange = new pickerDateRange('dateNewValue', {
		isTodayValid : true,
		startDate : startDate,
		endDate : endDate,
		defaultText : ' 至 ',
		inputTrigger : 'dateNewGameTrigger',
		theme : 'ta',
		success : function(obj) {
			query();
		}
	});
	return dateNewGameRange;
}

//初始化日期控件
var dynamicRange;
function initDateDynamicSelect() {
	var nowDate = new Date();
	var endDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-"
			+ nowDate.getDate();
	nowDate = nowDate.valueOf();
	var lastweek = nowDate - 30 * 24 * 60 * 60 * 1000;
	var lastDay = new Date(lastweek);
	var startDate = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1)
			+ "-" + lastDay.getDate();
	dynamicRange = new pickerRange('monthdatevalue', {
		isTodayValid : true,
		startDate : startDate,
		endDate : endDate,
		defaultText : ' 至 ',
		inputTrigger : 'datetrigger',
		theme : 'ta',
		success : function(obj) {
			query();
		}
	});
	return dynamicRange;
}

// 初始化日期控件，当前日期
function initTodayBtn(todayVal) {
	todayVal.datetimepicker({
		format : 'yyyy-mm-dd',
		todayBtn : true,
		autoclose : true,
		todayHighlight : 1,
		startView : 2,
		minView : 2
	});
	var nowDate = new Date();
	var today = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-"
			+ nowDate.getDate();
	todayVal.val(today);
}

// 初始化月份选择空间
function initMonthSelect() {
	var nowDate = new Date();
	var lastMonth = nowDate.getFullYear() + "-" + (nowDate.getMonth()+1)
	monthPicker.create('month_picker', {
		trigger : 'month_trigger',
		autoCommit : false,
		period : true,
		start_month : lastMonth,
		end_month : lastMonth,
		callback : function() {
			query();
		}
	});
}

/**
 * 初始化下拉列表
 */
function initSelectbox(jqcon, enumTypeID, flag, all) {
	$.ajax({
		url : 'getEnum.do',
		data : {
			'enumTypeID' : enumTypeID,
			'flag' : flag
		},
		method : "post",
		async : false,
		success : function(data) {
			var resData = data.content;
			if (all == 1) {
				resData.unshift({
					'text' : '全部',
					'value' : '-1'
				});
			} else if (all == 0) {
				resData.unshift({
					'text' : '无',
					'value' : '-1'
				});
			}
			var option = [];
			for (var i = 0; i < resData.length; i++) {
				option.push('<option value="' + resData[i].value + '">'
						+ resData[i].text + '</option>');
			}
			jqcon.html(option.join(""));
		}
	});
}

function initSelectByURL(jqcon, url) {
	$.ajax({
		url : url,
		method : "post",
		async : false,
		success : function(data) {
			var resData = data.content;
			var option = [];
			for (var i = 0; i < resData.length; i++) {
				option.push('<option value="' + resData[i].value + '">'
						+ resData[i].text + '</option>');
			}
			jqcon.html(option.join(""));
		}
	});
}

/**
 * 切换菜单添加样式
 */
function addActiveClass() {
	var menuID = getUrlParam('menuID');
	$('.nav ul > li').removeClass('active');
	$("#" + menuID + "").addClass('active');
}

// 获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null) {
		return unescape(r[2]);
	} else {
		return 0; // 返回参数值
	}
}

/**
 * 取消
 */
function cancel() {
	$(".filterpanel").toggle();
	hidefilter();
}

// 设置 option
function setOption(resData, all) {
	var option = [];
	if (all) {
		resData.unshift({
			'text' : '请选择',
			'value' : '-1'
		});
	} else {
		resData.unshift({
			'text' : '全部',
			'value' : '-1'
		});
	}
	for (var i = 0; i < resData.length; i++) {
		option.push('<option value="' + resData[i].value + '">'
				+ resData[i].text + '</option>');
	}
	return option;
}

// 刷新
function refreshTable(jqcon) {
	var options = jqcon.bootstrapTable('getOptions');
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	var name = options.sortName;
	var order = options.sortOrder;
	getData(pageNumber, pageSize, name, order);
}
