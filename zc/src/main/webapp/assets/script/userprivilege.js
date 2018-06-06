$(function() {
	initPages();
	bindEvent();
})

/**
 * 初始化页面
 */
function initPages(){
	var heightWin = $(window).height() - 120;
	$('#userList').bootstrapTable({
		undefinedText:"",
        cache: false,
        height: heightWin,
        striped: true,
        pagination: true,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 200],
        sidePagination: "server",
        search:true,
        showColumns:true,
        showRefresh:true,
        showToggle:true,
        onPageChange: function (pageNumber,pageSize) {
        	getData(pageNumber,pageSize);
        },
        onSort: function(name, order){
        	getData(1,50);
        },
        onSearch: function(text){
        	getData(1,50);
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
function getData(pageNumber,pageSize){
	var queryParam = {
			'pageNumber' : pageNumber,
			'pageSize' : pageSize
		};
	$('#userList').bootstrapTable("showLoading");
	$.ajax({
		url : 'getPersons.do',
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
						rows : data.content.users
					};
				$('#userList').bootstrapTable("hideLoading");
				$('#userList').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

/**
 * 绑定事件
 */
function bindEvent(){
	/**
	 * 格式化列，点击列中按钮的事件
	 */
	window.operateEvents = {
		'click .edit': function (e, value, row, index) {
			openEditModal(row);
		},
	    'click .remove': function (e, value, row, index) {
	    	delCompanyUser(row);
	    }
	};
	// 修改人员信息
	$('#updatePerson').click(function(){
		updatePerson();
	});
	// 全选/取消全选
	$("#checkall").click(function(){
		if($("#checkall")[0].checked==true){
			$("input[name='mainmenu']").each(function(){
				this.checked = true;
				$("input[name='"+this.value+"']").each(function(){
					this.checked = true;
				}); 
			});  
		} else {
			$("input[name='mainmenu']").each(function(){
				this.checked = false;
				$("input[name='"+this.value+"']").each(function(){
					this.checked = false;
				}); 
			}); 
		}
	});
}

/**
 * 打开编辑用户模态框
 */
function openEditModal(rowData){
	$('#inputpersonID').val(rowData.personID);
	$("#inputloginEmail").val(rowData.loginName);
	$("#inputpersonName").val(rowData.personName);
	$("#inputenglishName").val(rowData.englishName);
	$("#inputtelNumber").val(rowData.telNumber);
	initSelectbox($("#accountSelect"),'10001021',0);
	$("#accountSelect").val(rowData.roleType);
	initSelectByURL($("#departmentSelect"),'getDepartMent.do');
	$("#departmentSelect").val(rowData.department);
	$("#editUser").modal();
}

// 修改用户信息
function updatePerson(){
	var user = {
		'personID' : $('#inputpersonID').val(),
		'personName' : $("#inputpersonName").val(),
		'loginName' : $('#inputloginEmail').val(),
		'englishName' : $("#inputenglishName").val(),
		'department' : $("#departmentSelect").val(),
		'telNumber' : $("#inputtelNumber").val(),
		'roleType' : $('#accountSelect').val()
	};
	$.ajax({
		url : 'savePersons.do',
		data : {
			'user' : JSON.stringify(user)
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
				$("#editUser").modal('hide');
				refreshTable($('#userList'));
			}
		}
	});
}

/**
 * 全选/全清 父子级复选框
 */
function checkchild(menuID){
	if ($("#"+menuID+"")[0].checked == true) {
		$("input[name='"+menuID+"']").each(function(){
			this.checked = true;
		}); 
	} else {
		$("input[name='"+menuID+"']").each(function(){
			this.checked = false;
		}); 
	}
}

function delCompanyUser(rowData){
	$.messager.confirm("", "确定删除该条员工信息？", function() { 
		$.ajax({
			url : 'delPersons.do',
			data : {
				'personID' : rowData.personID
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
					refreshTable($('#userList'));
				}
			}
		});
    });
}


