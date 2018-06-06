$(function() {
	initPages();
	bindEvent();
})

/**
 * 初始化页面
 */
function initPages(){
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#customerData').bootstrapTable({
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
        	var options = $("#customerData").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	if ($("#focusbtn > span").hasClass("btn-important-highlight")){
        		getData(pageNumber,pageSize,1,name,order);
        	} else {
        		getData(pageNumber,pageSize,0,name,order);
        	}
        },
        onSort : function (name,order) {
        	var options = $("#customerData").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	if ($("#focusbtn > span").hasClass("btn-important-highlight")){
        		getData(pageNumber,pageSize,1,name,order);
        	} else {
        		getData(pageNumber,pageSize,0,name,order);
        	}
        	
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
function getData(pageNumber,pageSize,flag,sortName,order,keyValue){
	var keyValue = $('#serachCustomer').val();
	var customerID = getUrlParam('customerID');
	var queryParam = {
			'customerID':customerID,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'flag':flag,
			'sortName':sortName,
			'order':order,
			'keyValue':keyValue
		};
	$('#customerData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getCustomerData.do',
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
				$('#customerData').bootstrapTable("hideLoading");
				$('#customerData').bootstrapTable('load', datasource);
				addActiveClass();
				$('table#customerData tbody tr').mouseover(function(){  
			        $(this).addClass("in_right");  
			    });
			    //取消鼠标绑定的tr样式改变  
			    $('table#customerData tbody tr').mouseout(function(){  
			        $(this).removeClass("in_right");   
			    });
			}
		}
	});
}

/**
 * 绑定事件
 */
function bindEvent(){
	// 修改客户信息
	window.customerEvents = {
		'click .edit': function (e, value, row, index) {
			openEditCustomer(row);
		},
	    'click .remove': function (e, value, row, index) {
	    	delCustomerInfo(row);
	    }
	};
	// 客户名称
	window.customerNameEvents = {
		'click .customerName': function (e, value, row, index) {
			openCompany(row.regemail);
		}
	};
	// 详情
	window.detailEvents = {
		'click .detail': function (e, value, row, index) {
			openDeatil(row);
		}
	};
	// 商务
	window.businessEvents = {
		'click .businessName': function (e, value, row, index) {
			openBusiness(row);
		}
	};
	// 修改商务信息
	window.businessInfoEvents = {
		'click .edit': function (e, value, row, index) {
			$('#createBusinessLabel').text('修改跟进信息');
			$('#updateBusiness').show();
			$('#insertBusiness').hide();
			createBusiness(row,1);
		},
		'click .remove': function (e, value, row, index) {
	    	delBusinessInfo(row);
	    }
	};
	// 运营
	window.operationEvents = {
		'click .operationName': function (e, value, row, index) {
			openOperation(row);
		}
	};
	// 修改运营跟进信息
	window.operationInfoEvents = {
		'click .edit': function (e, value, row, index) {
			$('#createOperationLabel').text('修改跟进信息');
			$('#updateProblem').show();
			$('#insertProblem').hide();
			createProbem(row,1);
		},
		'click .remove': function (e, value, row, index) {
			delProblemInfo(row);
	    }
	};
	//修改联系人信息
	window.contactsEvents = {
		'click .edit': function (e, value, row, index) {
			$('#createContactLabel').text('修改联系人信息');
			$('#updateContacts').show();
			$('#insertContacts').hide();
			createContact(row,1);
		},
		'click .remove': function (e, value, row, index) {
			delcontact(row);
	    }
	};
	
	// 实时分渠道
	window.channelEvents = {
		'switchChange.bootstrapSwitch .channelSwitch': function (e, value, row, index) {
			if (e.target.checked == true) {
				// 开通实时分渠道
				realchannel(row.appID,1,'开通成功');
			} else {
				// 关闭实时分渠道
				realchannel(row.appID,0,'关闭成功');
			}
		}
	};
	// 全部信息
	$("#allbtn").click(function(){
		$("#allbtn > span").removeClass("btn-grayed").addClass("btn-all-highlight");
		$("#focusbtn > span").removeClass("btn-important-highlight").addClass("btn-grayed");
		getData(1,50,0);
	});
	// 重点关注
	$("#focusbtn").click(function(){
		$("#focusbtn > span").removeClass("btn-grayed").addClass("btn-important-highlight");
		$("#allbtn > span").removeClass("btn-all-highlight").addClass("btn-grayed");
		getData(1,50,1);
	});
	// 搜索
	$('#serachCustomer').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	var keyValue = $('#serachCustomer').val();
        	keySearch(keyValue); 
        } 
    });
	// 修改客户信息
	$('#saveCustomerInfo').click(function(){
		updateCustomerInfo();
	});
	// 绑定国家下拉事件
	$("#countrySelect").change(function(){
		var value = $(this).children('option:selected').val();
		initSelectbox($("#areaSelect"),value,4);
		initSelectbox($("#citySelect"),$("#areaSelect").val(),5);
	});
	//绑定地区下拉事件
	$("#areaSelect").change(function(){
		var value = $(this).children('option:selected').val();
		initSelectbox($("#citySelect"),value,5);
	});
	// 确定修改注册信息
	$("#updateUser").click(function(){
		updateCompany();
	});
	// 开通、关闭插件中心
	$('#pluginswitch').on('switchChange.bootstrapSwitch', function(event, state) {
		if (state == false) {
			// 关闭
			usePlugin(0,"关闭成功");
		} else {
			// 开通
			usePlugin(1,"开通成功");
		}
	});
	// 添加商务跟进
	$('#insertBusiness').click(function(){
		insertBusiness();
	});
	// 修改商务跟进
	$('#updateBusiness').click(function(){
		updateBusiness();
	});
	// 绑定问题类型下拉事件
	$("#problemTypeSelect").change(function(){
		var value = $(this).children('option:selected').val();
		initSelectbox($("#typeNameSelect"),value,2);
	});
	//添加运营跟进
	$('#insertProblem').click(function(){
		insertProblem();
	});
	//修改运营跟进
	$('#updateProblem').click(function(){
		updateProblem();
	});
	// 添加联系信息
	$('#insertContacts').click(function(){
		insertContacts();
	});	
	// 修改联系信息
	$('#updateContacts').click(function(){
		updateContacts();
	});
	// 搜索
	$('#serachContact').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	var options = $("#currentUsers").bootstrapTable('getOptions');
    		var name = options.sortName;
    		var order = options.sortOrder;
    		getContactData(1,50,name,order);
        } 
    });
	$('#checkUser').click(function(){
		selectContacts();
	});
}

/**
 * 编辑客户信息
 */
function openEditCustomer(rowData){
	$.ajax({
		url : 'getCustomerSelect.do',
		method : "post",
		async : true,
		success : function(data) {
			var industrial = data.content.industrial;
			var customerRank = data.content.customerRank;
			var operations = data.content.operations;
			var businesser = data.content.businesser;
			var customerStatus = data.content.customerStatus;
			var option = setOption(industrial,1);
			$("#industrialSelect").html(option.join(""));
			$("#industrialSelect").val(rowData.industrial);
			option = setOption(customerRank,1);
			$("#customerRankSelect").html(option.join(""));
			$("#customerRankSelect").val(rowData.customerRank);
			option = setOption(businesser,1);
			$("#businessSelect").html(option.join(""));
			$("#businessSelect").val(rowData.business)
			option = setOption(operations,1);
			$("#operationSelect").html(option.join(""));
			$("#operationSelect").val(rowData.operation);
			$('#inputcustomerID').val(rowData.customerID);
			$("#inputcustomerName").val(rowData.customerName);

			option = setOption(customerStatus,1);
            $("#customerStatusSelect").html(option.join(""));
            $("#customerStatusSelect").val(rowData.customerStatus);

			initSelectByURL($("#countrySelect"),'getCountryEnum.do');
			initSelectbox($("#areaSelect"),rowData.country,4);
			initSelectbox($("#citySelect"),rowData.area,5);
			$("#countrySelect").val(rowData.country);
			$("#areaSelect").val(rowData.area);
			$("#citySelect").val(rowData.cuscity);
			$("#editCustomer").modal({backdrop: 'static', keyboard: false});
		}
	});
}

// 查看商务跟进详情
function openBusiness(rowData){
	$('#businessData').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#businessData').bootstrapTable({
		url : 'getBusinessByCustomer.do',
		cardView:cardView,
		undefinedText:"",
        cache: false,
        striped: true,
        pagination : true,
        search : true,
        showColumns : true,
        showToggle : true,
        showRefresh : true,
        queryParams : {'customerID' : rowData.customerID},
        responseHandler : function(data){
        	if ($('#viewBusiness .fixed-table-toolbar').find('div').hasClass('columns pull-left') == false) {
        		$('#viewBusiness .fixed-table-toolbar').append(
    			'<div class="columns pull-left"><button id="createBusiness" class="btn btn-success" type="button"><i class="glyphicon glyphicon-plus"></i>创建</button></div>');
        	}
        	$('#createBusiness').unbind("click");
        	$('#createBusiness').click(function(){
        		$('#updateBusiness').hide();
    			$('#insertBusiness').show();
        		createBusiness(rowData);
        	});
        	return data.content;
        }
    });
	$('#viewBusiness').modal({backdrop: 'static', keyboard: false});
}

// 查看运营跟进详情
function openOperation(rowData){
	$('#operationData').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 200;
	$('#operationData').bootstrapTable({
		url : 'getOperationByCustomer.do',
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
        queryParams : {'customerID' : rowData.customerID},
        responseHandler : function(data){
        	if ($('#viewOperation .fixed-table-toolbar').find('div').hasClass('columns pull-left') == false) {
        		$('#viewOperation .fixed-table-toolbar').append(
    			'<div class="columns pull-left"><button id="createProblem" class="btn btn-success" type="button"><i class="glyphicon glyphicon-plus"></i>创建</button></div>');
        	}
        	$('#createProblem').unbind("click");
        	$('#createProblem').click(function(){
        		$('#updateProblem').hide();
    			$('#insertProblem').show();
        		createProbem(rowData);
        	});
        	return data.content;
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
	$('#viewOperation').modal({backdrop: 'static', keyboard: false});
}

//打开创建跟进信息页面
function createBusiness(rowData,flag){
	$.ajax({
		url : 'getCreateBusinessSelect.do',
		method : "post",
		async : true,
		success : function(data) {
			$('#inputbusiness').val(rowData.business);
			$('#inputcustomerID').val(rowData.customerID);
			var city = data.content.city;
			var clueStatus = data.content.clueStatus;
			var dataStatus = data.content.dataStatus;
			var option = setOption(city,1);
			$("#businessCitySelect").html(option.join(""));
			option = setOption(clueStatus,1);
			$("#clueStatusSelect").html(option.join(""));
			option = setOption(dataStatus,1);
			$("#dataStatusSelect").html(option.join(""));
			$("#communicateStatus").val('');
			if (flag == 1) {
				$('#inputbusinessID').val(rowData.businessID);
				$("#businessCitySelect").val(rowData.city);
				$("#clueStatusSelect").val(rowData.clue);
				$("#dataStatusSelect").val(rowData.dataStatus);
				$("#communicateStatus").val(rowData.communicateStatus.replace(new RegExp("<br>","gm"),"\n"));
			}
		}
	});
	$('#createBusinessModal').modal({backdrop: 'static', keyboard: false});
}

// 打开创建跟进信息页面
function createProbem(rowData,flag){
	$.ajax({
		url : 'getCreateProblemSelect.do',
		method : "post",
		async : true,
		success : function(data) {
			$('#inputcustomerID').val(rowData.customerID);
			$('#inputoperationID').val(rowData.operation);
			$('#inputoperationName').val(rowData.operationName);
			$("#solovetime").datetimepicker({format: 'yyyy-mm-dd',todayBtn: true,autoclose: true,todayHighlight: 1,startView: 2,minView: 2});
			var technology = data.content.technology;
			var problemType = data.content.problemType;
			var problemStatus = data.content.problemStatus;
			var platformType = data.content.platformType;
			var communicate = data.content.communicate;
			var statusName = data.content.statusName;
			var option = setOption(technology,1);
			$("#technicalersSelect").html(option.join(""));
			option = setOption(problemType,1);
			$("#problemTypeSelect").html(option.join(""));
			option = setOption(problemStatus,1);
			$("#problemStatusSelect").html(option.join(""));
			option = setOption(platformType,1);
			$("#platformSelect").html(option.join(""));
			option = setOption(communicate,1);
			$("#communicateSelect").html(option.join(""));
			option = setOption(statusName,1);
			$("#statusSelect").html(option.join(""));
			$('#typeNameSelect').val('');
			$("#solovetime").val('');
			$("#detailProblem").val('');
			$("#soloveWay").val('');
			if (flag == 1) {
				$("#inputproblemID").val(rowData.problemID);
				$("#communicateSelect").val(rowData.communicate);
				$("#statusSelect").val(rowData.status);
				$("#platformSelect").val(rowData.platform);
				$("#technicalersSelect").val(rowData.technicalers);
				$("#problemTypeSelect").val(rowData.problemType);
				$("#problemStatusSelect").val(rowData.problemStatus);
				$("#solovetime").val(rowData.solveTime);
				$("#detailProblem").val(rowData.detailProblem.replace(new RegExp("<br>","gm"),"\n"));
				$("#soloveWay").val(rowData.solution.replace(new RegExp("<br>","gm"),"\n"));
				initSelectbox($('#typeNameSelect'), rowData.problemType, 2);
				$('#typeNameSelect').val(rowData.subdivisionType);
			}
		}
	});
	$('#createOperation').modal({backdrop: 'static', keyboard: false});
}

// 新增商务跟进
function insertBusiness(){
	var business = {
			'city' : $('#businessCitySelect').val(),
			'cityValue' : $("#businessCitySelect").find("option:selected").text(),
			'clue' : $('#clueStatusSelect').val(),
			'clueValue' : $("#clueStatusSelect").find("option:selected").text(),
			'dataStatus' : $('#dataStatusSelect').val(),
			'dataStatusValue' : $("#dataStatusSelect").find("option:selected").text(),
			'communicateStatus' : $('#communicateStatus').val().replace(new RegExp("\n","gm"),"<br>"),
			'businesser' : $('#inputbusiness').val(),
			'customerID' : $('#inputcustomerID').val()
	};
	$.ajax({
		url : 'insertBusiness.do',
		data : {
			'business' : JSON.stringify(business)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#createBusinessModal").modal('hide');
			$('#businessData').bootstrapTable('refresh');
		}
	});
}

// 修改商务跟进
function updateBusiness(){
	var business = {
			'city' : $('#businessCitySelect').val(),
			'cityValue' : $("#businessCitySelect").find("option:selected").text(),
			'clue' : $('#clueStatusSelect').val(),
			'clueValue' : $("#clueStatusSelect").find("option:selected").text(),
			'dataStatus' : $('#dataStatusSelect').val(),
			'dataStatusValue' : $("#dataStatusSelect").find("option:selected").text(),
			'communicateStatus' : $('#communicateStatus').val().replace(new RegExp("\n","gm"),"<br>"),
			'businessID' : $('#inputbusinessID').val(),
	};
	$.ajax({
		url : 'saveBusinessData.do',
		data : {
			'business' : JSON.stringify(business)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#createBusinessModal").modal('hide');
			$('#businessData').bootstrapTable('refresh');
		}
	});
}

// 新增问题
function insertProblem(){
	var problem = {
			'communicate' : $("#communicateSelect").val(),
			'communicateName' : $("#communicateSelect").find("option:selected").text(),
			'status' : $("#statusSelect").val(),
			'statusName' : $("#statusSelect").find("option:selected").text(),
			'problemType' : $("#problemTypeSelect").val(),
			'problemTypeName' : $("#problemTypeSelect").find("option:selected").text(),
			'subdivisionType' : $("#typeNameSelect").val(),
			'technicalers' : $("#technicalersSelect").val(),
			'technicalersName' : $("#technicalersSelect").find("option:selected").text(),
			'problemStatus' : $("#problemStatusSelect").val(),
			'problemStatusName' : $("#problemStatusSelect").find("option:selected").text(),
			'platform' : $("#platformSelect").val(),
			'platformName' : $("#platformSelect").find("option:selected").text(),
			'customerID' : $('#inputcustomerID').val(),
			'operations' : $('#currentUserId').val(),
			'operationsName' : $('#currentUserName').val(),
			'solveTime' : $('#solovetime').val(),
			'detailProblem' : $("#detailProblem").val().replace(new RegExp("\n","gm"),"<br>"),
			'solution' : $("#soloveWay").val().replace(new RegExp("\n","gm"),"<br>")
	};
	$.ajax({
		url : 'insertProblem.do',
		data : {
			'problem' : JSON.stringify(problem)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('添加成功');
			$("#createOperation").modal('hide');
			$('#operationData').bootstrapTable('refresh');
		}
	});
}

// 修改运营跟进信息
function updateProblem(){
	var problem = {
			'problemID' :  $("#inputproblemID").val(),
			'communicate' : $("#communicateSelect").val(),
			'communicateName' : $("#communicateSelect").find("option:selected").text(),
			'status' : $("#statusSelect").val(),
			'statusName' : $("#statusSelect").find("option:selected").text(),
			'problemType' : $("#problemTypeSelect").val(),
			'problemTypeName' : $("#problemTypeSelect").find("option:selected").text(),
			'subdivisionType' : $("#typeNameSelect").val(),
			'technicalers' : $("#technicalersSelect").val(),
			'technicalersName' : $("#technicalersSelect").find("option:selected").text(),
			'problemStatus' : $("#problemStatusSelect").val(),
			'problemStatusName' : $("#problemStatusSelect").find("option:selected").text(),
			'platform' : $("#platformSelect").val(),
			'platformName' : $("#platformSelect").find("option:selected").text(),
			'operations' : $('#currentUserId').val(),
            'operationsName' : $('#currentUserName').val(),
			'solveTime' : $('#solovetime').val(),
			'detailProblem' : $("#detailProblem").val().replace(new RegExp("\n","gm"),"<br>"),
			'solution' : $("#soloveWay").val().replace(new RegExp("\n","gm"),"<br>")
	};
	$.ajax({
		url : 'updateProblem.do',
		data : {
			'problem' : JSON.stringify(problem)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup('修改成功');
			$("#createOperation").modal('hide');
			$('#operationData').bootstrapTable('refresh');
		}
	});
}

// 查看公司注册信息
function openCompany(email){
	$.ajax({
		url : 'getRegCompanyData.do',
		data : {
			'email' : email
		},
		method : "post",
		async : true,
		success : function(data) {
			var companyData = data.content[0];
			$("#inputcompanyName").val(companyData.companyName);
			$("#inputemail").val(companyData.regEmail);
			$("#inputname").val(companyData.regName);
			$("#inputphoneNumber").val(companyData.regPhoneNumber);
			$("#inputqq").val(companyData.regQQ);
			$("#inputregDate").val(companyData.regDate);
			$("#inputgameNumber").val(companyData.gameNumber);
			if (companyData.usePlugin == 0) {
				// 没有开通
				$("#pluginswitch").bootstrapSwitch('state', false,true);
			} else {
				// 已经开通
				$("#pluginswitch").bootstrapSwitch('state', true,true);
			}
		}
	});
	$("#editRegInfo").modal({backdrop: 'static', keyboard: false});
	
}

// 查看联系信息
function openDeatil(rowData){
	$('#contactData').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 200;
	$('#contactData').bootstrapTable({
		url : 'getContactsData.do',
		cardView:cardView,
		undefinedText:"",
		height : height,
        cache: false,
        striped: true,
        pagination : true,
        search : true,
        showColumns : true,
        showToggle : true,
        showRefresh : true,
        queryParams : {'customerID' : rowData.customerID},
        responseHandler : function(data){
        	if ($('#viewDetail .fixed-table-toolbar').find('div').hasClass('columns pull-left') == false) {
        		$('#viewDetail .fixed-table-toolbar').append(
    			'<div class="columns pull-left"><button id="createContact" class="btn btn-success" type="button"><i class="glyphicon glyphicon-plus"></i>创建</button></div>');
            	$('#viewDetail .fixed-table-toolbar').append(
    			'<div class="columns pull-left"><button id="selectCurrentContact" style="margin-left: 8px" class="btn btn-success" type="button"><i class="glyphicon glyphicon-search"></i>选择联系人</button></div>');
        	}
        	$('#createContact').unbind('click');
        	$('#createContact').click(function(){
        		$('#createContactLabel').text('添加联系人信息');
        		$('#updateContacts').hide();
    			$('#insertContacts').show();
        		createContact(rowData);
        	});
        	$('#selectCurrentContact').unbind('click');
        	$('#selectCurrentContact').click(function(){
        		selectCurrentContact(rowData);
        	});
        	return data.content;
        }
    });
	$('#viewDetail').modal({backdrop: 'static', keyboard: false});
}

//选择联系人
function selectCurrentContact(rowData){
	$('#inputcustomerID').val(rowData.customerID);
	$('#currentUsers').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 280;
	$('#currentUsers').bootstrapTable({
		cardView:cardView,
		undefinedText:"",
        cache: false,
        height: height,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        sidePagination: "server",
        onPageChange: function (pageNumber,pageSize) {
        	var options = $("#currentUsers").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getContactData(pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = $("#currentUsers").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getContactData(pageNumber,pageSize,name,order);
        }
    });
	getContactData(1,50);
	$('#currentContacts').modal({backdrop: 'static', keyboard: false});
}
function getContactData(pageNumber,pageSize,sortName,order){
	var keyValue = $('#serachContact').val();
	var queryParam = {
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order,
			'keyValue':keyValue
		};
	$('#currentUsers').bootstrapTable("showLoading");
	$.ajax({
		url : 'getCurrentContacts.do',
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
						rows : data.content.contacts
					};
				$('#currentUsers').bootstrapTable("hideLoading");
				$('#currentUsers').bootstrapTable('load', datasource);
			}
		}
	});
}
// 修改公司注册信息
function updateCompany(){
	var companyData = {
			'companyName' : $("#inputcompanyName").val(),
			'regEmail' : $("#inputemail").val(),
			'regName': $("#inputname").val(),
			'regPhoneNumber':$("#inputphoneNumber").val(),
			'regQQ' : $("#inputqq").val(),
			'gameNumber' : $("#inputgameNumber").val()
	};
	$.ajax({
		url : 'saveRegInfo.do',
		data : {
			'companyData' : JSON.stringify(companyData)
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup("修改成功");
			$("#editRegInfo").modal('hide');
		}
	});
}

// 开通关闭插件中心
function usePlugin(flag,message){
	$.ajax({
		url : 'userplugin.do',
		data : {
			'email' : $("#inputemail").val(),
			'flag' : flag
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup(message);
		}
	});
}

// 开通关闭实时分渠道
function realchannel(appID,flag,message){
	$.ajax({
		url : 'realTimeChannel.do',
		data : {
			'appID' : appID,
			'flag' : flag
		},
		method : "post",
		async : true,
		success : function(data) {
			$.messager.popup(message);
			$('#gameData').bootstrapTable('refresh');
		}
	});
}

// 关键字搜索
function keySearch(keyValue) {
	var options = $("#customerData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	if ($("#focusbtn > span").hasClass("btn-important-highlight")){
		getData(1,50,1,name,order,keyValue);
	} else {
		getData(1,50,0,name,order,keyValue);
	}
}

// 修改客户信息
function updateCustomerInfo(){
	var customer = {
			'customerName' : $("#inputcustomerName").val(),
			'industrial' : $("#industrialSelect").val(),
			'industrialName' : $("#industrialSelect").find("option:selected").text(),
			'customerRank' : $("#customerRankSelect").val(),
			'customerRankName' : $("#customerRankSelect").find("option:selected").text(),
			'country' : $("#countrySelect").val(),
			'countryName' : $("#countrySelect").find("option:selected").text(),
			'area' : $("#areaSelect").val(),
			'areaName' : $("#areaSelect").find("option:selected").text(),
			'cuscity' : $("#citySelect").val(),
			'cityName' : $("#citySelect").find("option:selected").text(),
			'business' : $("#businessSelect").val(),
			'businessName' : $("#businessSelect").find("option:selected").text(),
			'operation' : $("#operationSelect").val(),
			'operationName' : $("#operationSelect").find("option:selected").text(),
			'customerStatus' : $("#customerStatusSelect").val(),
            'customerStatusName' : $("#customerStatusSelect").find("option:selected").text(),
			'customerID' : $('#inputcustomerID').val()

	};
	$.ajax({
		url : 'saveCustomerData.do',
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
				$("#editCustomer").modal('hide');
				refreshCustomerTable($('#customerData'));
			}
			
		}
	});
}

//游戏分析平台
function viewgame(email,flag){
	$('#gameData').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 200;
	$('#gameData').bootstrapTable({
		url : 'getGameInfos.do',
		cardView:cardView,
		undefinedText:"",
		height:height,
        striped: true,
        search : true,
        pagination : true,
        showColumns : true,
        showToggle : true,
        showRefresh : true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        queryParams : {'email' : email, 'gameType' : flag},
        responseHandler : function(data){
        	return data.content;
        },
        onLoadSuccess : function(data){
        	if (flag == 'h5') {
        		$('#gameData').bootstrapTable('hideColumn','platformType');
        		$('#gameData').bootstrapTable('hideColumn','flag');
        	} else {
        		$('#gameData').bootstrapTable('showColumn','platformType');
        		$('#gameData').bootstrapTable('showColumn','flag');
        	}
        	$('.channelSwitch').bootstrapSwitch('size','small');
        }
    });
	$('#viewGameinfo').modal({backdrop: 'static', keyboard: false});
}
//渠道分析平台
function viewchannel(email){
	$('#channelData').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 200;
	$('#channelData').bootstrapTable({
		url : 'getChannelData.do',
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
	$('#viewChannelinfo').modal({backdrop: 'static', keyboard: false});
}
//h5 2.0
function viewgameh5(email){
	$('#h5Data').bootstrapTable('destroy');
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	var height = $(window).height() - 200;
	$('#h5Data').bootstrapTable({
		url : 'getGameInfosH5.do',
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
	$('#viewH5info').modal({backdrop: 'static', keyboard: false});
}

//删除运营信息
function delProblemInfo(rowData) {
	$.messager.confirm("", "确定删除该条跟进信息？", function() { 
		$.ajax({
			url : 'delOperation.do',
			data : {
				'problemID' : rowData.problemID
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
					$('#operationData').bootstrapTable('refresh');
				}
			}
		});
		
    });
}

//删除商务信息
function delBusinessInfo(rowData) {
	$.messager.confirm("", "确定删除该条跟进信息？", function() { 
		$.ajax({
			url : 'delBusiness.do',
			data : {
				'businessID' : rowData.businessID
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
					$('#businessData').bootstrapTable('refresh');
				}
			}
		});
    });
}
//删除客户信息
function delCustomerInfo(rowData) {
	$.messager.confirm("", "确定删除该条客户信息？", function() { 
		$.ajax({
			url : 'delCustomers.do',
			data : {
				'customerID' : rowData.customerID
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
					refreshCustomerTable($('#customerData'));
				}
			}
		});
    });
}
//选择现有联系人
function selectContacts(){
	var selectDatas = $('#currentUsers').bootstrapTable('getSelections');
	var customerID = $('#inputcustomerID').val();
	$.ajax({
		url : 'confirmSelect.do',
		data : {
			'customerID' : customerID,
			'updateContacts' : JSON.stringify(selectDatas)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else {
				$.messager.popup("选择成功");
				$('#currentContacts').modal('hide');
				$('#contactData').bootstrapTable('refresh');
			}
		}
	});
}

// Tracker Information
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