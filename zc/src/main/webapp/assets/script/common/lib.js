/**
 * CRM 公共函数库
 */
// 修改密码
function updatePwd() {
	$("#updatePwdModal").modal({
		backdrop : 'static',
		keyboard : false
	});
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
	$(".check-error").hide();
	$.ajax({
		url : 'updatePwd.do',
		data : {
			'oldpassword' : inputoldPassword,
			'password' : inputnewPassword
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 4) {
				window.open("login.jsp");
			} else if (data.statusCode == 9) {
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
// 审核
function formatterBtn(value, row, index) {
	if (value == 1) {
		return '<button onclick=check("'+row.uid+'") type="button" class="btn btn-primary btn-xs">审核</button>';
	}
}
// 游戏题材
function formatterThemes(value, row, index) {
	return ''
			+ value
			+ '<a class="edit" href="javascript:void(0)" title="题材"><i class="glyphicon glyphicon-pencil"></i></a>';
}

// 游戏标签
function formatterTags(value, row, index) {
	if (value) {
		return ''
		+ value
		+ '<a class="edit" href="javascript:void(0)" title="标签"><i class="glyphicon glyphicon-pencil"></i></a>';
	} else {
		return '<a class="edit" href="javascript:void(0)" title="标签"><i class="glyphicon glyphicon-pencil"></i></a>';
	}
	
}
// 处理
function formatterDealwith(value, row, index) {
	if (value == 0) {
		return '<button type="button" class="btn btn-primary btn-xs">未处理</button>';
	} else {
		return '<button type="button" class="btn btn-primary btn-xs">已处理</button>';
	}
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
// 客户名称
function formatterCustomer(value, row, index) {
	return '<a class="customerName" href="javascript:void(0)" title="客户名称">'
			+ value + '</a>';
}

function formatterEmail(value, row, index) {
	return '<a class="email" href="javascript:void(0)" title="注册邮箱">'
			+ value + '</a>';
}

/**
 * 详情
 */
function formatterDetail(value, row, index) {
	return '<a class="detail" href="javascript:void(0)" title="详情">详情</a>';
}
// 商务跟进人
function formatterBusiness(value, row, index) {
	if (value) {
		return '<a class="businessName" href="javascript:void(0)" title="'
				+ value + '">' + value + '</a>';
	}

}
// 运营跟进人
function formatterOperation(value, row, index) {
	if (value) {
		return '<a class="operationName" href="javascript:void(0)" title="'
				+ value + '">详情</a>';
	}

}
/**
 * 修改
 */
function formatterEdit(value, row, index) {
	return '<a class="edit" href="javascript:void(0)" title="修改"><i class="glyphicon glyphicon-edit"></i></a>';
}

/**
 * 重点关注
 */
function formatterFocus(value, row, index) {
	if (value > 0) {
		return '<a id="'
				+ row.customerID
				+ '" onclick="changeStart('
				+ row.customerID
				+ ')" href="javascript:void(0)"><i class="glyphicon glyphicon-star btn-important-highlight"></i></a>';
	} else {
		return '<a id="'
				+ row.customerID
				+ '" onclick="changeStart('
				+ row.customerID
				+ ')" href="javascript:void(0)"><i class="glyphicon glyphicon-star btn-grayed"></i></a>';
	}
}

function formatterLoginStatus(value, row, index) {
	if (value > 0) {
		return '<span class="glyphicon glyphicon-star btn-important-highlight"></span>';
	} else {
		return '<span class="glyphicon glyphicon-star btn-grayed"></span>';
	}
}
// 实时分渠道
function formatterSwitch(value, row, index) {
	if (value == 0) {
		// 未开通（未发放）
		return '<input class="channelSwitch" type="checkbox"/>';
	} else {
		// 已开通（已发放）
		return '<input class="channelSwitch" type="checkbox" checked=true/>';
	}
}

/**
 * 添加和删除重点关注客户
 */
function changeStart(customerID) {
	if ($("#" + customerID + "> i").hasClass("btn-important-highlight")) {
		// 删除
		$("#" + customerID + "> i").removeClass("btn-important-highlight")
				.addClass("btn-grayed");
		updateFocusCustomer(customerID, 'delFocusCustomer.do', '取消关注成功');
	} else {
		// 添加
		$("#" + customerID + "> i").removeClass("btn-grayed").addClass(
				"btn-important-highlight");
		updateFocusCustomer(customerID, 'addFocusCustomer.do', '关注成功');
	}
}

function updateFocusCustomer(customerID, url, message) {
	$.ajax({
		url : url,
		data : {
			'customerID' : customerID
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 4) {
				window.open("login.jsp");
			} else {
				$.messager.popup(message);
			}
		}
	});
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
 * 初始化页面权限
 */
function initprivilege(jqcon) {
	var url = location.search;
	var menuID = url.split("=")[1];
	var readID = $("#readID" + menuID + "").val();
	var writeID = $("#writeID" + menuID + "").val();
	var createID = $("#createID" + menuID + "").val();
	if (writeID == 0) {
		jqcon.bootstrapTable('hideColumn', "operate");
	} else {
		jqcon.bootstrapTable('showColumn', "operate");
	}
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
function refreshCustomerTable(jqcon) {
	var options = jqcon.bootstrapTable('getOptions');
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	var name = options.sortName;
	var order = options.sortOrder;
	getData(pageNumber, pageSize, 0, name, order);
}
// 打开创建联系人窗口
function createContact(rowData, flag) {
	initSelectbox($("#roleSelect"), '10001013', 0);
	if (flag == 1) {
		$('#inputcontactID').val(rowData.contactID);
		$('#inputCustomer').val(rowData.customerName);
		$('#inputContactName').val(rowData.name);
		$('#inputoffice').val(rowData.office);
		$('#inputmobileNumber').val(rowData.mobileNumber);
		$('#inputlandlineNumber').val(rowData.landlineNumber);
		$('#inputContactQQ').val(rowData.qq);
		$('#inputweixin').val(rowData.weixin);
		$('#inputContactEmail').val(rowData.email);
		$("#roleSelect").val(rowData.role);
		if (rowData.companyAddr) {
			$('#companyAddr')
					.val(
							rowData.companyAddr.replace(
									new RegExp("<br>", "gm"), "\n"));
		}
	} else {
		$('#inputcustomerID').val(rowData.customerID);
		$("#roleSelect").val('');
		$('#inputCustomer').val(rowData.customerName);
		$('#inputContactName').val('');
		$('#inputoffice').val('');
		$('#inputmobileNumber').val('');
		$('#inputlandlineNumber').val('');
		$('#inputContactQQ').val('');
		$('#inputweixin').val('');
		$('#inputContactEmail').val('');
		$('#companyAddr').val('');
	}
	$('#createContactModal').modal({
		backdrop : 'static',
		keyboard : false
	});
}
// 添加联系人
function insertContacts() {
	var contacts = {
		'customerID' : $('#inputcustomerID').val(),
		'name' : $('#inputContactName').val(),
		'role' : $('#roleSelect').val(),
		'roleName' : $("#roleSelect").find("option:selected").text(),
		'office' : $('#inputoffice').val(),
		'mobileNumber' : $('#inputmobileNumber').val(),
		'landlineNumber' : $('#inputlandlineNumber').val(),
		'qq' : $('#inputContactQQ').val(),
		'weixin' : $('#inputweixin').val(),
		'email' : $('#inputContactEmail').val(),
		'companyAddr' : $('#companyAddr').val().replace(new RegExp("\n", "gm"),
				"<br>")
	};
	$.ajax({
		url : 'insertContacts.do',
		data : {
			'contacts' : JSON.stringify(contacts)
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
				$("#createContactModal").modal('hide');
				$('#contactData').bootstrapTable('refresh');
			}
		}
	});
}

// 修改联系人
function updateContacts() {
	var contacts = {
		'contactID' : $('#inputcontactID').val(),
		'name' : $('#inputContactName').val(),
		'role' : $('#roleSelect').val(),
		'roleName' : $("#roleSelect").find("option:selected").text(),
		'office' : $('#inputoffice').val(),
		'mobileNumber' : $('#inputmobileNumber').val(),
		'landlineNumber' : $('#inputlandlineNumber').val(),
		'qq' : $('#inputContactQQ').val(),
		'weixin' : $('#inputweixin').val(),
		'email' : $('#inputContactEmail').val(),
		'companyAddr' : $('#companyAddr').val()
	};
	$.ajax({
		url : 'saveContactsData.do',
		data : {
			'contacts' : JSON.stringify(contacts)
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
				$("#createContactModal").modal('hide');
				if ($('#contactData').length == 1) {
					$('#contactData').bootstrapTable('refresh');
				} else {
					refreshTable($('#userlist'));
				}
			}
		}
	});
}

// 删除联系信息
function delcontact(rowData) {
	$.messager.confirm("", "确定删除该条联系信息？", function() {
		$.ajax({
			url : 'delContacts.do',
			data : {
				'contactID' : rowData.contactID
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
					if ($('#contactData').length == 1) {
						$('#contactData').bootstrapTable('refresh');
					} else {
						refreshTable($('#userlist'));
					}
				}
			}
		});
	});
}

// 编辑回访详情
function openEditVisit(rowData) {
	$("#editVisit").modal({
		backdrop : 'static',
		keyboard : false
	});
	initSelectbox($("#customerStatusSelect"), '10001015', 0);
	$("#customerStatusSelect").val(rowData.customerStatus);
	$("#inputcompanyName").val(rowData.customerName);
	$("#inputvisitID").val(rowData.visitID);
	$("#inputcustomerID").val(rowData.customerID);
	// g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。m 执行多行匹配。
	$("#visitDetail").val(
			rowData.visitDetail.replace(new RegExp("<br>", "gm"), "\n"));
}

// 更新回访详情
function updateVisitInfo() {
	var visitData = {
		'visitID' : $('#inputvisitID').val(),
		'customerID' : $('#inputcustomerID').val(),
		'customerStatus' : $("#customerStatusSelect").val(),
		'customerStatusName' : $("#customerStatusSelect").find(
				"option:selected").text(),
		'visitDetail' : $("#visitDetail").val().replace(new RegExp("\n", "gm"),
				"<br>")
	};
	$.ajax({
		url : 'saveVisit.do',
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
				$("#editVisit").modal('hide');
				refreshTable($('#visitData'));
			}
		}
	});
}
//游戏名称
function formatterGame(value, row, index) {
	return '<a class="gameName" href="javascript:void(0)" title="游戏名称">'
			+ value + '</a>';
}
/**
 * 生成图表(饼图)
 */
function showCharts(url, id, platform, problemType) {
	var chart = new Highcharts.Chart(
			{
				chart : {
					renderTo : id,
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false,
				},
				title : {
					text : null
				},
				credits : {
					enabled : false
				// 禁用版权信息
				},
				tooltip : {
					pointFormat : '{series.name}: <b>{point.percentage:.1f}% ({point.y} 个)</b>'
				},
				plotOptions : {
					pie : {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : true,
							format : '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y}个)',
							color : '#000000',
							connectorColor : '#000000'
						}
					}
				},
				series : [ {
					type : 'pie',
					name : '占比',
					data : []
				} ]
			});
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'platform' : platform,
		'problemType' : problemType
	};
	chart.showLoading();
	$.ajax({
		url : url,
		dataType : "json",
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		type : 'post',
		async : true,
		success : function(data) {
			if (data.statusCode == 200) {
				chart.hideLoading();
				chart.series[0].setData(data.content);
			}
		}
	});
}

/**
 * 生成折线图
 */
function lineCharts(url, id, platform, problemType) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : id,
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
		},
		title : {
			text : null,
		},
		credits : {
			enabled : false
		// 禁用版权信息
		},
		yAxis : {
			title : {
				text : '数量'
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			crosshairs : true,
			shared : true,
			valueSuffix : '个'
		},
		plotOptions : {
			line : {
				dataLabels : {
					enabled : true
				},
				enableMouseTracking : true
			}
		}
	});
	var categoriesData = [];
	var seriesData = [];
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'platform' : platform,
		'problemType' : problemType
	};
	chart.showLoading();
	$.ajax({
		url : url,
		dataType : "json",
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		type : 'post',
		async : true,
		success : function(data) {
			if (data.statusCode == 200) {
				chart.hideLoading();
				categoriesData = data.content.dateLists;
				seriesData = data.content.graphDataModel;
				var seriesDatas = [];
				var sumArr = [];
				var sum = 0;
				for (var i = 0; i < seriesData.length; i++) {
					var lineData = {
						name : seriesData[i].name,
						data : seriesData[i].dataCount
					};
					sumArr = seriesData[i].dataCount;
					for (var j = 0; j < sumArr.length; j++){
                        sum = sum + Number(sumArr[j]);
                    }
					chart.addSeries(lineData);
					seriesDatas.push(lineData);
				}

				$('#sum').html(sum);
				$('#activeDeviceCount').html(sum);
				chart.xAxis[0].setCategories(categoriesData);
			}
		}
	});
}

function newUserLineCharts(url, id, flag) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : id,
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
		},
		title : {
			text : null,
		},
		credits : {
			enabled : false
		// 禁用版权信息
		},
		yAxis : {
			title : {
				text : '数量'
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			crosshairs : true,
			shared : true,
			valueSuffix : '个'
		},
		plotOptions : {
			line : {
				dataLabels : {
					enabled : true
				},
				enableMouseTracking : true
			}
		}
	});
	var categoriesData = [];
	var seriesData = [];
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'ptLoginRegFlag' : flag
	};
	chart.showLoading();
	$.ajax({
		url : url,
		dataType : "json",
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		type : 'post',
		async : true,
		success : function(data) {
			if (data.statusCode == 200) {
				chart.hideLoading();
				categoriesData = data.content.dateLists;
				seriesData = data.content.graphDataModel;
				var seriesDatas = [];
				var sumArr = [];
				var sum = 0;
				for (var i = 0; i < seriesData.length; i++) {
					var lineData = {
						name : seriesData[i].name,
						data : seriesData[i].dataCount
					};
					sumArr = seriesData[i].dataCount;
					for (var j = 0; j < sumArr.length; j++){
                        sum = sum + Number(sumArr[j]);
                    }
					chart.addSeries(lineData);
					seriesDatas.push(lineData);
				}

				$('#sum').html(sum);
				$('#activeDeviceCount').html(sum);
				chart.xAxis[0].setCategories(categoriesData);
			}
		}
	});
}

function allActiveDeviceLineCharts(url, id, flag) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : id,
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
		},
		title : {
			text : null,
		},
		credits : {
			enabled : false
		// 禁用版权信息
		},
		yAxis : {
			title : {
				text : '数量'
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			crosshairs : true,
			shared : true,
			valueSuffix : '个'
		},
		plotOptions : {
			line : {
				dataLabels : {
					enabled : true
				},
				enableMouseTracking : true
			}
		}
	});
	var categoriesData = [];
	var seriesData = [];
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'ptLoginRegFlag' : flag
	};
	chart.showLoading();
	$.ajax({
		url : url,
		dataType : "json",
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		type : 'post',
		async : true,
		success : function(data) {
			if (data.statusCode == 200) {
				chart.hideLoading();
				categoriesData = data.content.dateLists;
				seriesData = data.content.graphDataModel;
				var seriesDatas = [];
				var sumArr = [];
				var sum = 0;
				for (var i = 0; i < seriesData.length; i++) {
					var lineData = {
						name : seriesData[i].name,
						data : seriesData[i].dataCount
					};
					sumArr = seriesData[i].dataCount;
					for (var j = 0; j < sumArr.length; j++){
                        sum = sum + Number(sumArr[j]);
                    }
					chart.addSeries(lineData);
					seriesDatas.push(lineData);
				}

				$('#activeDeviceCount').html(sum);
				chart.xAxis[0].setCategories(categoriesData);
			}
		}
	});
}

/**
 * 条形图
 */
function showChartBar(url, id, platform){
	var chart = new Highcharts.Chart({
        chart: {
        	renderTo : id,
            type: 'bar'
        },
        title: {
            text: null
        },
        yAxis: {
            min: 0,
            title: {
                text: '数量(个)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: '个'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        }
    });
	var categoriesData = [];
	var seriesData = [];
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'platform' : platform
	};
	chart.showLoading();
	$.ajax({
		url : url,
		dataType : "json",
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		type : 'post',
		async : true,
		success : function(data) {
			if (data.statusCode == 200) {
				chart.hideLoading();
				categoriesData = data.content.dateLists;
				seriesData = data.content.graphDataModel;
				var seriesDatas = [];
				for (var i = 0; i < seriesData.length; i++) {
					var lineData = {
						data : seriesData[i].dataCount
					};
					chart.addSeries(lineData);
					seriesDatas.push(lineData);
				}
				chart.xAxis[0].setCategories(categoriesData);
			}
		}
	});
}

// 表格
function showTable(jqcon, url) {
	jqcon.bootstrapTable('destroy');
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate
	};
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	jqcon.bootstrapTable({
		url : url,
		cardView : cardView,
		undefinedText : "",
		cache : false,
		striped : true,
		pagination : true,
		search : true,
		showColumns : true,
		showToggle : true,
		queryParams : {
			'queryParam' : JSON.stringify(queryParam)
		},
		responseHandler : function(data) {
			return data.content;
		}
	});
}
// 动态表格
function showDynamicTables(jqcon, url, platform, problemType) {
	var columnData = [];
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	// 动态获取表头
	$.ajax({
		url : 'getOperationColumns.do',
		data : {
			'problemType' : problemType
		},
		type : 'post',
		async : true,
		success : function(data) {
			columnData.push(data.content);
			var queryParam = {
				'startDate' : startDate,
				'endDate' : endDate,
				'platform' : platform,
				'problemType' : problemType
			};
			var heightWin = $(window).height() - 160;
			var cardView = false;
			if ($(window).width() <= 768) {
				cardView = true;
			}
			jqcon.bootstrapTable('destroy');
			jqcon.bootstrapTable({
				url : url,
				cardView : cardView,
				undefinedText : "",
				cache : false,
				striped : true,
				pagination : true,
				search : true,
				showColumns : true,
				showToggle : true,
				columns : columnData,
				queryParams : {
					'queryParam' : JSON.stringify(queryParam)
				},
				responseHandler : function(data) {
					return data.content;
				}
			});
		}
	});
}
