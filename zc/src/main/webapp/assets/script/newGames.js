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
	$('#newGameData').bootstrapTable({
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
			var options = $("#newGameData").bootstrapTable('getOptions');
			var name = options.sortName;
			var order = options.sortOrder;
			getData(pageNumber, pageSize, name, order);
		},
		onSort : function(name, order) {
			var options = $("#newGameData").bootstrapTable('getOptions');
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
	$('#inputflag').val(0);
	getData(1, 50);
}

/**
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber, pageSize, sortName, order) {
	var queryParam = buildCondition(pageNumber, pageSize, sortName, order);
	$('#newGameData').bootstrapTable("showLoading");
	$.ajax({
		url : 'queryNewGames.do',
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
					rows : data.content.newGame
				};
				$('#newGameData').bootstrapTable("hideLoading");
				$('#newGameData').bootstrapTable('load', datasource);
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
			var option = setOption(gameSource);
			$("#gameSourceSelect").html(option.join(""));
			option = setOption(gameType);
			$("#gameTypeSelect").html(option.join(""));
			option = setOption(gameType,1);
			option.splice(1,1);
			$("#inputGameTypeSelect").html(option.join(""));
		}
	});
}

function bindEvent() {
	window.artEvents = {
			'click .edit': function (e, value, row, index) {
				openArt(row);
			}
		};
	window.playEvents = {
			'click .edit': function (e, value, row, index) {
				openPlay(row);
			}
		};
	window.themeEvents = {
			'click .edit': function (e, value, row, index) {
				openTheme(row);
			}
		};
	window.gameEvents = {
		'click .gameName' : function(e, value, row, index) {
			$("#editGameInfo").modal({backdrop: 'static', keyboard: false});
			viewGameInfo(row);
		}
	};
	// 查询
	$("#confirm").click(function(e){
		query();
		cancel();
	});
	// 搜索
	$('#serachGames').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	query();
        } 
    });
	$('#playerRank').click(function(){
		$('#downloadNum').removeClass('btn-success').addClass('btn-default');
//		$('#listTops').removeClass('btn-success').addClass('btn-default');
		$('#playerRank').removeClass('btn-default').addClass('btn-success');
		var startDate = dateRange.getCurrentDate().startDate;
		var endDate = dateRange.getCurrentDate().endDate;
		var id = $('#inputGameID').val();
		lineMonitorCharts("getPlayerRates.do","evaluation",startDate,endDate,id);
	});
	$('#downloadNum').click(function(){
		$('#playerRank').removeClass('btn-success').addClass('btn-default');
//		$('#listTops').removeClass('btn-success').addClass('btn-default');
		$('#downloadNum').removeClass('btn-default').addClass('btn-success');
		var startDate = dateRange.getCurrentDate().startDate;
		var endDate = dateRange.getCurrentDate().endDate;
		var id = $('#inputGameID').val();
		lineDownloadCharts("getDownloadNums.do","evaluation",startDate,endDate,id);
	});
//	$('#listTops').click(function(){
//		$('#playerRank').removeClass('btn-success').addClass('btn-default');
//		$('#downloadNum').removeClass('btn-success').addClass('btn-default');
//		$('#listTops').removeClass('btn-default').addClass('btn-success');
//	});
	$("#inputGameTypeSelect").change(function(){
		var value = $(this).children('option:selected').val();
		getDetailType(value);
	});
	$("#gameSourceFilter").change(function(){
		var value = $(this).children('option:selected').val();
		getGameTops(value);
	});
	//切换标签页
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	      toggleTab(e);
	});
	// 保存美术及定位标签
	$('#saveArt').click(function(){
		saveMonitorTags(0);
	});
	// 保存玩法标签
	$('#savePlay').click(function(){
		saveMonitorTags(1);
	});
	// 保存题材标签
	$('#saveTheme').click(function(){
		saveMonitorTags(2);
	});
	$('#saveGameInfo').click(function(){
		saveGameInfo();
	});
	$('#saveGameSort').click(function(){
		saveGameSort();
	});
	$('#exportExcel').click(function(){
		exportExcel();
	});
	$('#deleteGame').click(function(){
		deleteGame();
	});
	$('#addNewGame').click(function(){
		addNewGame();
	});
	$('#createGame').click(function(){
		openCreateGame();
	});
	// 按钮下拉菜单
	$('#btnMenu').click(function(e){
		queryByMenu(e);
	});
}

// 保存游戏基础信息
function saveGameInfo(){
	var newGame = {
			'id' : Number.parseInt($('#inputGameID').val()),
			'gameName' : $('#inputGameName').val(),
			'companyName' : $('#inputCompany').val(),
			'version' : $('#inputVersion').val(),
			'device' : $("#inputDevice").find("option:selected").text(),
			'network' : $('#inputNetwork').val(),
			'networkName' : $('#inputNetwork').find("option:selected").text(),
			'clientSize' : $('#inputClientSize').val(),
			'gameSource' : $('#inputGameSource').val(),
	};
	saveGameData('saveNewGameInfo.do',newGame);
}

// 保存游戏游戏分类

function saveGameSort(){
	var newGame = {
			'id' : Number.parseInt($('#inputGameID').val()),
			'gameRank' : $('#inputGameRank').val(),
			'gameRankName' : $('#inputGameRank').find("option:selected").text(),
			'screenType' : $('#inputScreenType').val(),
			'screenTypeName' : $('#inputScreenType').find("option:selected").text(),
			'screenDirection' : $('#inputScreenDirection').val(),
			'perspective' : $('#inputPerspective').val(),
			'styleArea' : $('#inputStyleArea').val(),
			'gameType' : $('#inputGameTypeSelect').val() == null ? '' : $('#inputGameTypeSelect').val(),
			'gameTypeName' : $('#inputGameTypeSelect').find("option:selected").text(),
			'detailType' : $('#inputDetailTypeSelect').val() == null ? '' : $('#inputDetailTypeSelect').val(),
			'homogenization' : $('#inputTzhSelect').val() == null ? '' : $('#inputTzhSelect').val(),
			'gameTheme' : $('#inputGameTheme').val(),
			'gameThemeName' : $('#inputGameTheme').find("option:selected").text(),
			'ipinfo' : $('#inputIP').val(),
			'authorize' : $('#inputAuthorize').val(),
			'remark' : $('#remarkInfo').val().replace(new RegExp("\n","gm"),"<br>")
	};
	saveGameData('saveGameSort.do',newGame);
}

function saveGameData(url,newGame){
	$.ajax({
		url : url,
		data : {
			'flag' : Number.parseInt($('#inputflag').val()),
			'newGame' : JSON.stringify(newGame)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else if (data.statusCode == 4) {
            	window.open("login.jsp");
            } else {
				$.messager.popup("保存成功");
				$("#editGameInfo").modal('hide');
//				refreshTable($('#newGameData'));
				var data = $('#newGameData').bootstrapTable('getData');
				$.each(data, function(index) {
                    if (this.id == newGame.id) {
                    	if (newGame.device) {
                    		this.device = newGame.device.replace("<br>");
                    	}
                    	this.networkName = newGame.networkName;
                    	this.screenTypeName = newGame.screenTypeName;
                    	this.gameTypeName = newGame.gameTypeName;
                    	this.gameThemeName = newGame.gameThemeName;
                    	this.gameRankName = newGame.gameRankName;
                        $("#newGameData").bootstrapTable('updateRow', {index: index, row: this})
                    }
                })
			}
		}
	});
}

// 查询细分类型和同质化
function getDetailType(value){
	$.ajax({
		url : 'getNewGameTypes.do',
		method : "post",
		data : {
			'type' : 1,
			'parentID' : value,
		},
		async : false,
		success : function(data) {
			var gameType = data.content;
			option = setOption(gameType,1);
			$("#inputDetailTypeSelect").html(option.join(""));
		}
	});
	$.ajax({
		url : 'getNewGameTypes.do',
		method : "post",
		data : {
			'type' : 2,
			'parentID' : value,
		},
		async : false,
		success : function(data) {
			var gameType = data.content;
			option = setOption(gameType,1);
			$("#inputTzhSelect").html(option.join(""));
		}
	});
}

// 切换标签页
function toggleTab(e){
	// 获取已激活的标签页的名称
    var activeTab = $(e.target).text();
    if ($(e.target)[0].title) {
  	  activeTab = $(e.target)[0].title;
    }
    if (activeTab == "游戏概况") {
    	initGameInfo();
    } else if (activeTab == "市场表现"){
    	var flag = $('#inputflag').val();
    	if (flag == 0) {
    		$('#playerRank').show();
    		$('#downloadNum').show();
    		$('#condition').hide();
    	} else {
    		$('#playerRank').hide();
    		$('#downloadNum').hide();
    		$('#condition').show();
    	}
    	initMaketShow(flag);
    } else if (activeTab == "基础信息") {
    	$('#saveGameInfo').show();
    	$('#saveGameSort').hide();
    } else if (activeTab == "游戏简介") {
    	$('#saveGameInfo').hide();
    	$('#saveGameSort').hide();
    } else if (activeTab == "游戏分类") {
    	$('#saveGameInfo').hide();
    	$('#saveGameSort').show();
    }
}

function initGameInfo(){
	$('#gameInfoTab a:first').tab('show');
	$('#saveGameInfo').show();
	$('#saveGameSort').hide();
	var id = $('#inputGameID').val();
	setGameInfo(id);
}

// 初始化市场表现
function initMaketShow(flag){
	$('#saveGameInfo').hide();
	$('#saveGameSort').hide();
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	if (flag == 0) {
		var id = $('#inputGameID').val();
		$('#downloadNum').removeClass('btn-success').addClass('btn-default');
//		$('#listTops').removeClass('btn-success').addClass('btn-default');
		$('#playerRank').removeClass('btn-default').addClass('btn-success');
		lineMonitorCharts("getPlayerRates.do","evaluation",startDate,endDate,id);
	} else {
		var id = $('#inputGameID').val();
		$.ajax({
			url : 'getHotGameSource.do',
			method : "post",
			data : {
				'gameID' : id
			},
			async : true,
			success : function(data) {
				var gameSource = data.content.gameSource;
				var option = setOption(gameSource);
				if (option.length > 0) {
					option.shift();
					$("#gameSourceFilter").html(option.join(""));
					getGameTops($("#gameSourceFilter").val());
				}
			}
		});
	}
}

// 查询渠道对应的所有榜单排名
function getGameTops(channelID){
	var id = $('#inputGameID').val();
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	lineGameTopsCharts("getHotGameTops.do","evaluation",startDate,endDate,id,channelID);
}

// 打开美术及定位标签
function openArt(rowData){
	$('#inputGameID').val(rowData.id);
	$('#saveArt').show();
	$('#savePlay').hide();
	$('#saveTheme').hide();
	$("#monitorModal").modal({backdrop: 'static', keyboard: false});
	$('#monitorLabel').text('美术及定位标签');
	$.ajax({
		url : 'getNewGameTags.do',
		method : "post",
		data : {
			'type' : 0
		},
		async : true,
		success : function(data) {
			var parentTags = data.content.parentTag;
			var childTags = data.content.childTag;
			initGameTags(parentTags, childTags,rowData.gameArt);
		}
	});
}

// 打开玩法标签
function openPlay(rowData){
	$('#inputGameID').val(rowData.id);
	$('#saveArt').hide();
	$('#savePlay').show();
	$('#saveTheme').hide();
	$("#monitorModal").modal({backdrop: 'static', keyboard: false});
	$('#monitorLabel').text('玩法标签');
	$.ajax({
		url : 'getNewGameTags.do',
		method : "post",
		data : {
			'type' : 1
		},
		async : true,
		success : function(data) {
			var parentTags = data.content.parentTag;
			var childTags = data.content.childTag;
			initGameTags(parentTags, childTags,rowData.gamePlay);
		}
	});
}

// 打开题材标签
function openTheme(rowData){
	$('#inputGameID').val(rowData.id);
	$('#saveArt').hide();
	$('#savePlay').hide();
	$('#saveTheme').show();
	$("#monitorModal").modal({backdrop: 'static', keyboard: false});
	$('#monitorLabel').text('题材标签');
	$.ajax({
		url : 'getNewGameTags.do',
		method : "post",
		data : {
			'type' : 2
		},
		async : true,
		success : function(data) {
			var parentTags = data.content.parentTag;
			var childTags = data.content.childTag;
			initGameTags(parentTags, childTags,rowData.gameThemeTag);
		}
	});
}

function saveMonitorTags(flag){
	var id = $('#inputGameID').val();
	var ddlist = $('#monitortags .select-list dd');
	var tags = [];
	var name = '';
	var j = 0;
	$.each(ddlist,function(i,v){
		if ($(v).hasClass('selected') == true) {
			tags.push($(v).find('input').val());
			if (j%2==0) {
				name = name + '<span style="color:#FF00FF">' + $(v).find('input').context.textContent + '</span>&nbsp;';
			} else {
				name = name + '<span style="color:#FF7256">' + $(v).find('input').context.textContent + '</span>&nbsp;';
			}
			j++;
		}
	});
	if (tags.length == 0) {
		$.messager.popup("请选择标签。");
	} else {
		var gameTags = tags.join(",");
		var gameData = {
				'gameID' : id,
				'gameTags' : gameTags,
				'flag' : flag
		};
		saveGameTags('saveMonitorTags.do',gameData,name);
	}
}

function saveGameTags(url,gameData,name){
	$.ajax({
		url : url,
		method : "post",
		data : {
			'flag' : Number.parseInt($('#inputflag').val()),
			'gameData' : JSON.stringify(gameData)
		},
		async : true,
		success : function(data) {
			if (data.statusCode == 4) {
            	window.open("login.jsp");
            } else {
            	$.messager.popup("保存成功");
				$("#monitorModal").modal('hide');
//				refreshTable($('#newGameData'));
				var data = $('#newGameData').bootstrapTable('getData');
				$.each(data, function(index) {
                    if (this.id == gameData.gameID) {
                    	if (gameData.flag == 0) {
                    		this.gameArtName = name;
                            this.gameArt = gameData.gameTags;
                    	} else if (gameData.flag == 1) {
                    		this.gamePlayName = name;
                            this.gamePlay = gameData.gameTags;
                    	} else if (gameData.flag == 2) {
                    		this.gameThemeTagName = name;
                            this.gameThemeTag = gameData.gameTags;
                    	}
                        $("#newGameData").bootstrapTable('updateRow', {index: index, row: this})
                    }
                })
            }
		}
	});
}

function query(){
	var options = $("#newGameData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	getData(pageNumber,pageSize,name,order);
}

// 查询游戏基础信息
function viewGameInfo(rowData){
	$('#inputGameID').val(rowData.id);
	$('#monitorTab a:first').tab('show');
	initGameInfo(rowData);
}

/**
 * 设置游戏数据
 */
function setGameInfo(id){
	$.ajax({
		url : 'getNewGameInfo.do',
		data : {
			'flag' : Number.parseInt($('#inputflag').val()),
			'gameID' : id
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504。");
			} else {
				var gameData = data.content[0];
				$('#inputGameName').val(gameData.gameName);
				$('#inputCompany').val(gameData.companyName);
				$('#inputGameSource').val(gameData.gameSource);
				$('#inputPublishDate').val(gameData.publishDate);
				$('#inputVersion').val(gameData.version);
				for (var i = 0 ;i < $("#inputDevice option").length;i++) {
					if ($("#inputDevice option")[i].text == gameData.device) {
						var deviceValue = $("#inputDevice option")[i].value;
						$("#inputDevice").val(deviceValue);
					}
				}
				$('#inputNetwork').val(gameData.network);
				$('#inputClientSize').val(gameData.clientSize);
				var flag = Number.parseInt($('#inputflag').val());
				if (flag == 0) {
					$('#inputGameSource').removeAttr("readonly");
				} else {
					$('#inputGameSource').attr("readonly","readonly");
				}
				$('#gameLogo').fileinput({
					enctype: 'multipart/form-data',
	                showUpload: true, //是否显示上传按钮
	                showCaption: false,//是否显示标题
			        uploadUrl: "uploadLogo.do", //上传的地址
			        uploadAsync: true,
			        maxFileCount : 1,
			        maxFileSize : 500,// 不能大于500k
			        allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
			    });
				$('#gameLogo').fileinput('refresh',{
					uploadExtraData: {'gameID' : id,'flag' : flag},
			        initialPreview: [
			                         "<img src='"+gameData.gameLogo+"' class='file-preview-image' alt='logo' title='logo'>",
			                     ]
			    });
				$('#summary').text(gameData.summary);
				var gameScreen = gameData.gameScreen;
				if (gameScreen.length > 0) {
					var screens = gameScreen.split(",");
					var screensDiv = [];
					var zbDiv = [];
					for (var i = 0; i < screens.length;i++) {
						if (i == 0) {
							screensDiv.push('<div class="item active"><img src="'+screens[i]+'" style="max-width:500px;max-height:360px;dispaly:block; margin:0 auto"></div>');
							zbDiv.push('<li data-target="#gameimages" data-slide-to="'+i+'" class="active"></li>');
						} else {
							screensDiv.push('<div class="item"><img src="'+screens[i]+'" style="max-width:500px;max-height:360px;dispaly:block; margin:0 auto"></div>');
							zbDiv.push('<li data-target="#gameimages" data-slide-to="'+i+'"></li>');
						}
						
					}
					$('#summaryImg').html(screensDiv.join(""));
					$('#summaryZB').html(zbDiv.join(""));
				}
				$('#inputGameRank').val(gameData.gameRank);
				$('#inputScreenType').val(gameData.screenType);
				$('#inputScreenDirection').val(gameData.screenDirection);
				$('#inputPerspective').val(gameData.perspective);
				$('#inputStyleArea').val(gameData.styleArea);
				$('#inputGameTypeSelect').val(gameData.gameType);
				getDetailType(gameData.gameType);
				$('#inputDetailTypeSelect').val(gameData.detailType);
				$('#inputTzhSelect').val(gameData.homogenization);
				$('#inputGameTheme').val(gameData.gameTheme);
				$('#inputIP').val(gameData.ipinfo);
				$('#inputAuthorize').val(gameData.authorize);
				$('#remarkInfo').val(gameData.remark);
			}
		}
	});
	
}

//初始化
function initGameTags(parentTags, childTags, gameTags){
	var conditionDIV = [];
	$.each(parentTags,function(i, v) {
		conditionDIV.push('<div class="form-group form-group-sm"><div class="select select-list">'
				+'<label class="col-sm-1 control-label">'+v.tagName+'</label><div class="col-sm-11"><dl id="tag'+v.tagID+'" class="conditiondl">');
		$.each(childTags,function(j,k){
			if (k.parentTag == v.tagID) {
				conditionDIV.push('<dd id="tags'+k.tagID+'"><a href="#'+k.tagID+'">'+k.tagName+'<input type="hidden" value="'+k.tagID+'"></a></dd>');
			}
		});
		conditionDIV.push('</dl></div></div></div>');
	});
	$('#monitortags').html(conditionDIV.join(""));
	addTagEvent(parentTags);
	// 给已选标签标色
	addSelectClass(gameTags);
}

//添加事件
function addTagEvent(parentTags){
	$.each(parentTags,function(i,v){
		$("#tag"+v.tagID+" dd").click(function () {
			if ($(this).hasClass('selected') == true) {
				$(this).removeClass("selected");
			} else {
				$(this).addClass("selected");
			}
		});
	});
}

// 添加颜色
function addSelectClass(gameTags){
	if (gameTags) {
		var tags = gameTags.split(",");
		for (var i = 0;i < tags.length;i++) {
			$('#tags'+tags[i]+'').addClass("selected");
		}
	} 
}

function queryChartData(startDate,endDate){
	var id = $('#inputGameID').val();
	lineMonitorCharts("getPlayerRates.do","evaluation",startDate,endDate,id);
}

// 导出游戏数据
function exportExcel(){
	var options = $("#newGameData").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var pageNumber = options.pageNumber;
	var pageSize = options.pageSize;
	var queryParam = buildCondition(pageNumber, pageSize, name, order);
	window.location = "exportNewGame.do?queryParam="+JSON.stringify(queryParam);
}

//构造查询条件
function buildCondition(pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var flag = $('#inputflag').val();
	var device = $('#deviceFilter').find("option:selected").text();
	if (device == '全部') {
		device = '';
	}
	var network = $("#networkFilter").val();
	if (network == -1) {
		network = '';
	}
	if (flag == 0) {
		var gameSource = $('#gameSourceSelect').find("option:selected").text();
		if (gameSource == '全部') {
			gameSource = '';
		}
	} else {
		var gameSource = $('#gameSourceSelect').val();
		if (gameSource == '-1') {
			gameSource = '';
		}
	}
	var gameRank = $('#gameRankFilter').val();
	if (gameRank == -1) {
		gameRank = '';
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
	var styleArea = $('#styleAreaFilter').val();
	if (styleArea == -1) {
		styleArea = '';
	}
	var keyValue = $('#serachGames').val();
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'device' : device,
		'network' : network,
		'gameSource' : gameSource,
		'gameRank' : gameRank,
		'gameType' : gameType,
		'screenType' : screenType,
		'gameTheme' : gameTheme,
		'styleArea' : styleArea,
		'pageNumber' : pageNumber,
		'pageSize' : pageSize,
		'sortName' : sortName,
		'order' : order,
		'flag' : Number.parseInt(flag),
		'keyValue' : keyValue
	};
	return queryParam;
}
// 打开游戏
function openCreateGame(){
	$("#addGameModal").modal({backdrop: 'static', keyboard: false});
	$("#publishTime").datetimepicker({format: 'yyyy-mm-dd',todayBtn: true,autoclose: true,todayHighlight: 1,startView: 2,minView: 2});
	$('#publishTime').val('');
	$('#inputNewGameName').val('');
	$('#inputCompanyName').val('');
	$('#inputDeviceType').val('');
	$('#inputGameSummary').val('');
}

// 新增游戏
function addNewGame(){
	var newGame = {
		'gameName' : $('#inputNewGameName').val(),
		'publishDate' : $('#publishTime').val(),
		'companyName' : $('#inputCompanyName').val(),
		'device' : $('#inputDeviceType').find("option:selected").text(),
		'summary' : $('#inputGameSummary').val()
	};
	$.ajax({
		url : 'addNewGame.do',
		data : {
			'flag' : Number.parseInt($('#inputflag').val()),
			'newGame' : JSON.stringify(newGame)
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
				$("#addGameModal").modal('hide');
				refreshTable($('#newGameData'));
			}
		}
	});
}

//删除游戏
function deleteGame(){
	var selectDatas = $('#newGameData').bootstrapTable('getSelections');
	if (selectDatas.length > 0) {
		$.messager.confirm("", "确定删除所选游戏信息？", function() { 
			$.ajax({
				url : 'deleteNewGame.do',
				data : {
					'flag' : Number.parseInt($('#inputflag').val()),
					'newGames' : JSON.stringify(selectDatas)
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
						refreshTable($('#newGameData'));
					}
				}
			});
	    });
	} else {
		$.messager.popup("请勾选需要删除的游戏信息。");
	}
	
}
//查询按钮
function queryByMenu(e){
	var value = $(e.target).text();
	$('#dropdownBtn').text(value).append('<span class="caret">');
	if (value == '新品游戏') {
		$('#inputflag').val(0);
	} else {
		$('#inputflag').val(1);
	}
	query();
}

/**
 * 曲线图
 */
function lineMonitorCharts(url, id, startDate,endDate,gameIDs) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : id,
			plotBackgroundColor : null,
			defaultSeriesType: 'spline',
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
				text : '分数'
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
			valueSuffix : '分'
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
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'id' : gameIDs
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
						name : seriesData[i].name,
						data : seriesData[i].dataRank
					};
					chart.addSeries(lineData);
					seriesDatas.push(lineData);
				}
				chart.xAxis[0].setCategories(categoriesData);
			}
		}
	});
}

// 下载量
function lineDownloadCharts(url, id, startDate,endDate,gameIDs) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : id,
			plotBackgroundColor : null,
			defaultSeriesType: 'spline',
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
				text : '次数'
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
			valueSuffix : '次'
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
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'id' : gameIDs
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
						name : seriesData[i].name,
						data : seriesData[i].dataRank
					};
					chart.addSeries(lineData);
					seriesDatas.push(lineData);
				}
				chart.xAxis[0].setCategories(categoriesData);
			}
		}
	});
}

// 榜单排名
function lineGameTopsCharts(url, id, startDate,endDate,gameID,channelID) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : id,
			plotBackgroundColor : null,
			defaultSeriesType: 'spline',
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
				text : '名次'
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
			valueSuffix : '名'
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
	var queryParam = {
		'startDate' : startDate,
		'endDate' : endDate,
		'id' : gameID,
		'channelID' : channelID
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
						name : seriesData[i].name,
						data : seriesData[i].dataRank
					};
					chart.addSeries(lineData);
					seriesDatas.push(lineData);
				}
				chart.xAxis[0].setCategories(categoriesData);
			}
		}
	});
}