$(function() {
	initPages();
	bindEvent();
})

/**
 * 初始化页面
 */
function initPages(){
	initDateSelect();
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#userlist').bootstrapTable({
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
        	var options = $("#userlist").bootstrapTable('getOptions');
        	var name = options.sortName;
        	var order = options.sortOrder;
        	getData(pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
        	var options = $("#userlist").bootstrapTable('getOptions');
        	var pageNumber = options.pageNumber;
        	var pageSize = options.pageSize;
        	getData(pageNumber,pageSize,name,order);
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
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'pageNumber':pageNumber,
			'pageSize':pageSize,
			'sortName':sortName,
			'order':order,
			'keyValue':keyValue
		};
	$('#userlist').bootstrapTable("showLoading");
	$.ajax({
		url : 'getAllContactsData.do',
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
				$('#userlist').bootstrapTable("hideLoading");
				$('#userlist').bootstrapTable('load', datasource);
				addActiveClass();
				$('table#userlist tbody tr').mouseover(function(){  
			        $(this).addClass("in_right");  
			    });
			    //取消鼠标绑定的tr样式改变  
			    $('table#userlist tbody tr').mouseout(function(){  
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
	// 查询
	$("#confirm").click(function(e){
		query();
	});
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
	window.viewCustomerInfo = {
			'click .customerName': function (e, value, row, index) {
				window.location.href = "customerInfo.jsp?menuID=2&customerID="+row.customerID;
			}
		};
	// 修改联系信息
	$('#updateContacts').click(function(){
		updateContacts();
	});
	$('#insertContacts').click(function(){
		addContacts();
	});
	// 搜索
	$('#serachContact').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	var keyValue = $('#serachContact').val();
        	keySearch(keyValue); 
        } 
    });
	// 创建联系信息
	$('#createUser').click(function(){
		createUser();
	});
	$('#createContactModal').on('hidden.bs.modal', function () {
		$('#inputCustomer').attr("readonly","readonly");
	});
}

//查询
function query(){
	getData(1,50);
}

//搜索
function keySearch(keyValue) {
	var options = $("#userlist").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	getData(1,50,name,order,keyValue);
}

// 创建联系信息
function createUser(){
	$('#inputCustomer').removeAttr('readonly');
	$('#insertContacts').show();
	$('#updateContacts').hide();
	initSelectbox($("#roleSelect"),'10001013',0,0);
	$('#createContactModal').modal({backdrop: 'static', keyboard: false});
}
//新增联系信息
function addContacts(){
	var contacts = {
			'customerName' : $('#inputCustomer').val(),
			'name' : $('#inputContactName').val(),
			'role' : $('#roleSelect').val(),
			'roleName' : $("#roleSelect").find("option:selected").text(),
			'office' : $('#inputoffice').val(),
			'mobileNumber' : $('#inputmobileNumber').val(),
			'landlineNumber' : $('#inputlandlineNumber').val(),
			'qq' : $('#inputContactQQ').val(),
			'weixin' : $('#inputweixin').val(),
			'email' : $('#inputContactEmail').val(),
			'companyAddr' : $('#companyAddr').val().replace(new RegExp("\n","gm"),"<br>")
	};
	$.ajax({
		url : 'addContacts.do',
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
				refreshTable($('#userlist'));
			}
		}
	});
}
