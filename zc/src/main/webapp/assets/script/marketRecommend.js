$(function() {
	initPages();
	bindEvent();
})

function initPages() {
	// 初始化日期控件
	initDateSelect();
	initSelectFilter();
	var heightWin = $(window).height() - 120;
	var cardView = false;
	if ($(window).width() <= 768) {
		cardView = true;
	}
	$('#marketRecommendData').bootstrapTable({
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
			var options = $("#marketRecommendData").bootstrapTable('getOptions');
			var name = options.sortName;
			var order = options.sortOrder;
			getData(pageNumber, pageSize, name, order);
		},
		onSort : function(name, order) {
			var options = $("#marketRecommendData").bootstrapTable('getOptions');
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
	var queryParam = buildCondition(pageNumber, pageSize, sortName, order);
	$('#marketRecommendData').bootstrapTable("showLoading");
	$.ajax({
		url : 'queryMarketGames.do',
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
					rows : data.content.marketRecommend
				};
				$('#marketRecommendData').bootstrapTable("hideLoading");
				$('#marketRecommendData').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

//初始化选择条件
function initSelectFilter(){
	$.ajax({
		url : 'getNewGameSelect.do',
		method : "post",
		data : {
			'type' : 0,
			'parentID' : 0,
		},
		async : false,
		success : function(data) {
			var gameType = data.content.gameType;
			var gameSource = data.content.gameSource;
			var option = setOption(gameType);
			$("#gameTypeSelect").html(option.join(""));
			option = setOption(gameSource);
			$("#gameSourceSelect").html(option.join(""));
			option = setOption(gameType,1);
			option.splice(1,1);
			$("#inputGameTypeSelect").html(option.join(""));
		}
	});
}

function bindEvent() {
	// 搜索
	$('#serachMarket').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	query();
        } 
    });
	// 查询
	$("#confirm").click(function(e){
		query();
		cancel();
	});
	$('#saveRecommendInfo').click(function(e){
		saveRecommendInfo();
	});
	$('#exportMarketExcel').click(function(){
		exportMarketExcel();
	});
	$('#deleteRecommend').click(function(){
		deleteRecommend();
	});
	window.gameEvents = {
			'click .edit' : function(e, value, row, index) {
				$("#editMarket").modal({backdrop: 'static', keyboard: false});
				viewMarket(row);
			}
		};
}

// 查看推荐位信息
function viewMarket(rowData){
	$('#inputGameID').val(rowData.id);
	$('#recommendInfoModal').modal({backdrop: 'static', keyboard: false});
	$.ajax({
		url : 'getRecommendInfo.do',
		method : "post",
		data : {
			'gameID' : rowData.id
		},
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else {
				var gameData = data.content[0];
				$('#publishTime').val(gameData.publishDate);
				$('#inputChannelName').val(gameData.channelName);
				$('#inputRecommendType').val(gameData.recommendType);
				$('#inputRecommendName').val(gameData.recommendName);
				$('#inputGameName').val(gameData.gameName);
				$('#inputCompanyName').val(gameData.companyName);
				for (var i = 0 ;i < $("#inputDeviceType option").length;i++) {
					if ($("#inputDeviceType option")[i].text == gameData.device) {
						var deviceValue = $("#inputDeviceType option")[i].value;
						$("#inputDeviceType").val(deviceValue);
					}
				}
//				$('#inputDeviceType').val(gameData.device);
				$('#inputNetwork').val(gameData.network);
				$('#inputScreenType').val(gameData.screenType);
				$('#inputGameTypeSelect').val(gameData.gameType);
				$('#inputGameTheme').val(gameData.gameTheme);
				$('#recommendPic').attr('src',gameData.recommendPath);
			}
		}
	});
}

// 保存推荐位信息
function saveRecommendInfo(){
	var marketRecommend = {
			'id' : $('#inputGameID').val(),
			'gameName' : $('#inputGameName').val(),
			'companyName' : $('#inputCompanyName').val(),
			'device' : $('#inputDeviceType').find("option:selected").text(),
			'network' : $('#inputNetwork').val(),
			'screenType' : $('#inputScreenType').val(),
			'gameType' : $('#inputGameTypeSelect').val(),
			'gameTheme' : $('#inputGameTheme').val()
	};
	if ($('#inputGameName').val() == '') {
		$.messager.popup("请输入游戏名称。");
	} else {
		$.ajax({
			url : 'saveRecommendInfo.do',
			method : "post",
			data : {
				'marketRecommend' : JSON.stringify(marketRecommend)
			},
			async : true,
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 4) {
	            	window.open("login.jsp");
	            } else {
					$.messager.popup("保存成功");
					refreshTable($('#marketRecommendData'));
					$('#recommendInfoModal').modal('hide');
				}
			}
		});
	}
}

// 查询
function query(){
	var options = $("#marketRecommendData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	getData(pageNumber,pageSize,name,order);
}
// 删除
function deleteRecommend(){
	var selectDatas = $('#marketRecommendData').bootstrapTable('getSelections');
	if (selectDatas.length > 0) {
		$.messager.confirm("", "确定删除所选游戏信息？", function() { 
			$.ajax({
				url : 'deleteRecommendInfo.do',
				data : {
					'marketList' : JSON.stringify(selectDatas)
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
						refreshTable($('#marketRecommendData'));
					}
				}
			});
	    });
	} else {
		$.messager.popup("请勾选需要删除的游戏信息。");
	}
}

// 导出
function exportMarketExcel(){
	var options = $("#marketRecommendData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	var queryParam = buildCondition(pageNumber, pageSize, name, order);
	window.location = "exportMarketInfo.do?queryParam="+JSON.stringify(queryParam);
}

//构造查询条件
function buildCondition(pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var device = $('#deviceFilter').find("option:selected").text();
	if (device == '全部') {
		device = '';
	}
	var network = $("#networkFilter").val();
	if (network == -1) {
		network = '';
	}
	var gameSource = $('#gameSourceSelect').val();
	if (gameSource == -1) {
		gameSource = '';
	}
	var gameType = $('#gameTypeSelect').val();
	if (gameType == -1) {
		gameType = '';
	}
	var screenType = $('#screenTypeFilter').val();
	if (screenType == -1) {
		screenType = '';
	}
	var gameTheme = $('#gameThemeFilter').val();
	if (gameTheme == -1) {
		gameTheme = '';
	}
	var keyValue = $('#serachMarket').val();
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'device' : device,
		'network' : network,
		'gameSource' : gameSource,
		'gameType' : gameType,
		'screenType' : screenType,
		'gameTheme' : gameTheme,
		'pageNumber' : pageNumber,
		'pageSize' : pageSize,
		'sortName' : sortName,
		'order' : order,
		'keyValue' : keyValue
	};
	return queryParam;
}