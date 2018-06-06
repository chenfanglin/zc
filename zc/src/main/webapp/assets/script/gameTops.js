$(document).ready(function(){
	initPages();
	bindEvent();
})

/**
 * 初始化页面
 */
function initPages(){
    $('#dropdownBtn').hide();
	// 初始化日期控件
	initDateSelect();

	// 初始化过滤条件
	initfilter();
	initAllGameChartData();
}

//初始化游戏总榜数据
function initAllGameChartData(){
    var heightWin = $(window).height() - 170;
    var cardView = false;
    if ($(window).width() <= 768) {
        cardView = true;
    }

    $('#gameTops').bootstrapTable({
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
            var options = $("#gameTops").bootstrapTable('getOptions');
            var name = options.sortName;
            var order = options.sortOrder;
            getData(pageNumber,pageSize,name,order);
        },
        onSort : function (name,order) {
            var options = $("#gameTops").bootstrapTable('getOptions');
            var pageNumber = options.pageNumber;
            var pageSize = options.pageSize;
            getData(pageNumber,pageSize,name,order);
        },
        rowStyle: function(row, index) {
            if (index % 2 == 0) {
                return {classes: "odd_row"};
            } else {
                return {classes: "even_row"};
            }
        }
    });
    var roleType = $('#roleinput').val();
    var department = $('#deparmentinput').val();
    if (roleType == '00000003' && department == '3') {
        $('#gameTops').bootstrapTable('hideColumn', 'newEquipNum');
        $('#gameTops').bootstrapTable('hideColumn', 'newPlayerNum');
        $('#gameTops').bootstrapTable('hideColumn', 'activePlayer');
        $('#gameTops').bootstrapTable('hideColumn', 'income');
    } else {
    	 $('#gameTops').bootstrapTable('showColumn', 'newEquipNum');
         $('#gameTops').bootstrapTable('showColumn', 'newPlayerNum');
         $('#gameTops').bootstrapTable('showColumn', 'activePlayer');
         $('#gameTops').bootstrapTable('showColumn', 'income');
    }
    getData(1,50);
}

//初始化新建游戏数据
function initNewGameData(platform){
    var heightWin = $(window).height() - 170;
    var cardView = false;
    if ($(window).width() <= 768) {
        cardView = true;
    }
    $('#newGameChartData').bootstrapTable({
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
            var options = $("#newGameChartData").bootstrapTable('getOptions');
            var name = options.sortName;
            var order = options.sortOrder;
            var keyValue = $('#serachGames').val();
            getNewGameData(pageNumber,pageSize,platform,name,order,keyValue);
        },
        onSort : function (name,order) {
            var options = $("#newGameChartData").bootstrapTable('getOptions');
            var pageNumber = options.pageNumber;
            var pageSize = options.pageSize;
            var keyValue = $('#serachGames').val();
            getNewGameData(pageNumber,pageSize,platform,name,order,keyValue);
        }
    });
    var roleType = $('#roleinput').val();
    var department = $('#deparmentinput').val();
    if (roleType == '00000003' && department == '3') {
        $('#newGameChartData').bootstrapTable('hideColumn', 'activeDeviceCount');
    } else {
         $('#newGameChartData').bootstrapTable('showColumn', 'activeDeviceCount');
    }
    getNewGameData(1,50,platform);
}

//获取新建游戏数据
function getNewGameData(pageNumber,pageSize,platform,sortName,order,keyValue){
	var queryParam = buildQueryParam(pageNumber,pageSize,platform,sortName,order,keyValue);
	$('#newGameChartData').bootstrapTable("showLoading");
	$.ajax({
		url : 'getNewGameData.do',
		data : {
			'queryParam' : JSON.stringify(queryParam)
		},
		method : "post",
		async : true,
		success : function(data) {
			if (data.statusCode == 504) {
				$.messager.popup("系统错误，错误代码504");
			} else {
				var datasource = {
                    total : data.content.totalRecord,
                    rows : data.content.content
				};
				$('#newGameChartData').bootstrapTable("hideLoading");
				$('#newGameChartData').bootstrapTable('load', datasource);
				$('.channelSwitch').bootstrapSwitch('size','small');
				addActiveClass();
			}
		}
	});
}


function buildQueryParam(pageNumber,pageSize,platform,sortName,order,keyValue){
	var startDate = dateRange.getCurrentDate().startDate;
    var endDate = dateRange.getCurrentDate().endDate;

	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'pageNumber' : pageNumber,
			"pageSize" : pageSize,
			'platform' : platform,
			'sortName' : sortName,
			'order' : order,
			'keyValue' : keyValue
		};
	return queryParam;
}


/**
 * 服务端分页，通过ajax获取请求数据
 */
function getData(pageNumber,pageSize,sortName,order){
	var queryParam = buildCondition(pageNumber,pageSize,sortName,order);
	$('#gameTops').bootstrapTable("showLoading");
	$.ajax({
		url : 'getAllGameDatas.do',
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
						rows : data.content.gameData
					};
				$('#gameTops').bootstrapTable("hideLoading");
				$('#gameTops').bootstrapTable('load', datasource);
				addActiveClass();
			}
		}
	});
}

// 初始化过滤条件
function initfilter(){
	$.ajax({
		url : 'getGameSelect.do',
		method : "post",
		async : true,
		success : function(data) {
			var platformType = data.content.platformType;
			var network = data.content.network;
			var platformMobile = data.content.platformMobile;
			var parentTags = data.content.parentTags;
			var childTags = data.content.childTags;
			var option = setOption(platformType);
			$('#productPlatformSelect').html(option.join(""));
			option = setOption(network);
			$('#networkSelect').html(option.join(""));
			option = setOption(platformMobile);
			$('#platformMobileSelect').html(option.join(""));
//			initCondition(parentTags, childTags);
		}
	});
}
// 初始化过滤条件
//function initCondition(parentTags,childTags){
//	var conditionDIV = [];
//	$.each(parentTags,function(i, v) {
//		conditionDIV.push('<div class="form-group form-group-sm"><div class="select select-list">'
//				+'<label class="col-sm-1 control-label">'+v.text+'</label><div class="col-sm-11"><dl id="select'+v.value+'" class="conditiondl">');
//		$.each(childTags,function(j,k){
//			if (j == 0) {
//				conditionDIV.push('<dd class="select-all selected"><a href="javascript:void(0)">全部</a></dd>');
//			} else {
//				if (k.parentTag == v.value) {
//					conditionDIV.push('<dd><a href="#'+k.tagID+'">'+k.tagName+'</a></dd>');
//				}
//			}
//		});
//		conditionDIV.push('</dl></div></div></div>');
//	});
//	$('#conditiondiv').html(conditionDIV.join(""));
//	addConditionEvent(parentTags);
//}
//添加事件
//function addConditionEvent(parentTags){
//	$.each(parentTags,function(i,v){
//		$("#select"+v.value+" dd").click(function () {
//			$(this).addClass("selected").siblings().removeClass("selected");
//			if ($(this).hasClass("select-all")) {
//				$("#select"+i+"").remove();
//			} else {
//				var copyThis = $(this).clone();
//				if ($("#select"+i+"").length > 0) {
//					$("#select"+i+" a").html($(this).text());
//				} else {
//					$(".select-result dl").append(copyThis.attr("id", "select"+i+""));
//					$("#select"+i+"").click(function () {
//						$(this).remove();
//						$("#select"+v.value+" .select-all").addClass("selected").siblings().removeClass("selected");
//						if ($(".select-result dd").length > 1) {
//							$(".select-no").hide();
//						} else {
//							$(".select-no").show();
//						}
//					});
//				}
//			}
//			if ($(".select-result dd").length > 1) {
//				$(".select-no").hide();
//			} else {
//				$(".select-no").show();
//			}
//		});
//	});
//}

/**
 * 绑定事件
 */
function bindEvent(){
	// 修改游戏信息
	window.gameEvents = {
		'click .edit': function (e, value, row, index) {
			openEditGame(row);
		}
	};
	window.themeEvents = {
		'click .edit': function (e, value, row, index) {
			openThemes(row);
		}
	};
	window.tagEvents = {
		'click .edit': function (e, value, row, index) {
			openTags(row);
		}
	};
	window.viewCustomerInfo = {
			'click .customerName': function (e, value, row, index) {
				window.location.href = "customerInfo.jsp?menuID=2&customerID="+row.customerID;
			}
		};
	// 修改游戏信息
	$('#updateGameInfo').click(function(){
		updateGameInfo();
	});
	//保存题材
	$('#saveThemeData').click(function(){
		saveThemeData();
	});
	// 保存标签
	$('#saveTagData').click(function(){
		saveTagData();
	});
	$('#serachGames').off('keyup drop').on('keyup drop',function(event){
        if(event.keyCode == "13") {
        	keySearch(); 
        } 
    });
	$("#confirm").click(function(e){
		query();
		cancel();
	});
	$('#exportExcel').click(function(){
		exportExcel();
	});

	//切换tab
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          toggleTab(e);
    });

    // 按钮下拉菜单
    $('#btnMenu').click(function(e){
        queryByMenu(e);
    });
}

function queryByMenu(e){
	var value = $(e.target).text();
	$('#dropdownBtn').text(value).append('<span class="caret">');
	query();
}

function toggleTab(e) {
    var activeTab = $(e.target).text();
    if ($(e.target)[0].title) {
      activeTab = $(e.target)[0].title;
    }

    if (activeTab == "游戏总榜") {
      $('#exportEx').show();
      $('#filterBtn').show();
      $('#dropdownBtn').hide();
      initAllGameChartData();
    } else if (activeTab == "新建游戏"){
      $('#exportEx').hide();
      $('#filterBtn').hide();
      $('#dropdownBtn').show();
      var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
      if ("游戏分析平台1.0" == platform) {
          platform = "g";
      } else if ("H5游戏分析平台2.0" == platform) {
          platform = "hh5";
      } else if ("移动应用统计分析平台" == platform) {
          platform = "store";
      } else if ("广告效果监测平台" == platform) {
          platform = "tracker";
      } else {
          platform = "";
      }
      initNewGameData(platform);
    }
}

//搜索
function keySearch() {

    for (var i = 0;i < $("#gameTab > li").length;i++) {
        if ($($("#gameTab > li")[i]).hasClass('active')) {
            var tabName = $($("#gameTab > li")[i]).text();
            if (tabName == "游戏总榜") {
                var options = $('#gameTops').bootstrapTable('getOptions');
                var name = options.sortName;
                var order = options.sortOrder;
                getData(1,50,name,order);
            } else if (tabName == "新建游戏"){
                var options = $('#newGameChartData').bootstrapTable('getOptions');
                var name = options.sortName;
                var order = options.sortOrder;
                var keyValue = $('#serachGames').val();
                var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
                if ("游戏分析平台1.0" == platform) {
                    platform = "g";
                } else if ("H5游戏分析平台2.0" == platform) {
                    platform = "hh5";
                } else if ("移动应用统计分析平台" == platform) {
                    platform = "store";
                } else if ("广告效果监测平台" == platform) {
                    platform = "tracker";
                } else {
                    platform = "";
                }
                getNewGameData(1,50,platform,name,order,keyValue);
            }
        }
    }

}

// 打开修改游戏窗口
function openEditGame(rowData){

    for (var i = 0;i < $("#gameTab > li").length;i++) {
        if ($($("#gameTab > li")[i]).hasClass('active')) {
            var tabName = $($("#gameTab > li")[i]).text();
            if (tabName == "游戏总榜") {
                $('#inputappID').val(rowData.appID);
                $('#inputGameName').val(rowData.gameName);
                $('#inputOtherName').val(rowData.otherName);
                $("#gameTopsModal").modal({backdrop: 'static', keyboard: false});
                $.ajax({
                    url : 'getGameInfoSelect.do',
                    method : "post",
                    async : true,
                    success : function(data) {
                        var network = data.content.network;
                        var gameTypes = data.content.gameTypes;
                        var gemeRank = data.content.gameRank;
                        var gameStatus = data.content.gameStatus;
                        var option = setOption(network,1);
                        $('#networkFilter').html(option.join(""));
                        option = setOption(gameTypes,1);
                        $('#gameTypeSelect').html(option.join(""));
                        option = setOption(gemeRank,1);
                        $('#gameRankSelect').html(option.join(""));
                        option = setOption(gameStatus,1);
                        $('#gameStatusSelect').html(option.join(""));
                        $('#networkFilter').val(rowData.network);
                        $('#gameTypeSelect').val(rowData.gameType);
                        $('#gameRankSelect').val(rowData.gameRank);
                        $('#gameStatusSelect').val(rowData.gameStatus);
                    }
                });
            } else if (tabName == "新建游戏"){
                $('#gameStatus').hide();
                $('#inputappID').val(rowData.appID);
                $('#inputGameName').val(rowData.gameName);

                console.log(rowData.networkType)

                $("#gameTopsModal").modal({backdrop: 'static', keyboard: false});
                $.ajax({
                    url : 'getGameInfoSelect.do',
                    method : "post",
                    async : true,
                    success : function(data) {
                        var network = data.content.network;
                        var gameTypes = data.content.gameTypes;

                        var option = setOption(network,1);
                        $('#networkFilter').html(option.join(""));
                        option = setOption(gameTypes,1);

                        $('#gameTypeSelect').html(option.join(""));
                        $('#inputOtherName').val(rowData.otherName);
                        $('#networkFilter').val(rowData.networkType);
                        $('#gameTypeSelect').val(rowData.gameType);
                    }
                });
            }
        }
    }


}

//修改游戏信息
function updateGameInfo(){
	var gameData = {
			'gameName' : $('#inputOtherName').val(),
			'appID' :  $('#inputappID').val(),
			'gameType' : $('#gameTypeSelect').val(),
			'network' : $('#networkFilter').val(),
			'networkName' : $('#networkFilter').find("option:selected").text(),
			'gameRank' : $('#gameRankSelect').val(),
			'gameRankName' : $('#gameRankSelect').find("option:selected").text(),
			'gameStatus' : $('#gameStatusSelect').val(),
			'gameStatusName' : $('#gameStatusSelect').find("option:selected").text()
	};
	$.ajax({
		url : 'saveGameInfo.do',
		method : "post",
		data : {
			'gameData' : JSON.stringify(gameData)
		},
		async : true,
		success : function(data) {
			if (data.statusCode == 4) {
            	window.open("login.jsp");
            } else {
            	$.messager.popup("保存成功");
				$("#gameTopsModal").modal('hide');
				for (var i = 0;i < $("#gameTab > li").length;i++) {
                    if ($($("#gameTab > li")[i]).hasClass('active')) {
                        var tabName = $($("#gameTab > li")[i]).text();
                        if (tabName == "游戏总榜") {
                            refreshTable($('#gameTops'));
                        } else if (tabName == "新建游戏"){
                            var keyValue = $('#serachGames').val();
                            var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
                            var options = $('#newGameChartData').bootstrapTable('getOptions');
                            var pageNumber = options.pageNumber;
                            var pageSize = options.pageSize;
                            var name = options.sortName;
                            var order = options.sortOrder;
                            if ("游戏分析平台1.0" == platform) {
                                platform = "g";
                            } else if ("H5游戏分析平台2.0" == platform) {
                                platform = "hh5";
                            } else if ("移动应用统计分析平台" == platform) {
                                platform = "store";
                            } else if ("广告效果监测平台" == platform) {
                                platform = "tracker";
                            } else {
                                platform = "";
                            }
                            getNewGameData(pageNumber, pageSize, platform, name, order, keyValue);
                        }
                    }
                }


            }
		}
	});
	
}

// 打开游戏题材
var themeData = {}
function openThemes(rowData){
	$('#saveTagData').hide();
	$('#saveThemeData').show();
	$('#inputgameTheme').val(rowData.gameTheme);
	$('#inputappID').val(rowData.appID);
	$("#commonModal").modal({backdrop: 'static', keyboard: false});
	$('#commonLabel').text('游戏题材');
	$.ajax({
		url : 'getAllGameThemes.do',
		method : "post",
		async : true,
		success : function(data) {
			themeData = data.content
			var oneTheme = data.content.oneTheme;
			var twoTheme = data.content.twoTheme;
			var threeTheme = data.content.threeTheme;
			initGameThemes(oneTheme,twoTheme,threeTheme,rowData);
		}
	});
}
// 初始化游戏题材列表
function initGameThemes(oneTheme,twoTheme,threeTheme,rowData){
	var conditionDIV = [];
	$.each(oneTheme,function(i, v) {
		conditionDIV.push('<div class="form-group form-group-sm">');
		var index = 0;
		$.each(twoTheme,function(j,k){
			if (k.parentID == v.enumID) {
				if (index == 0) {
					conditionDIV.push('<div class="select select-list"><label class="col-sm-1 control-label">'+v.themeName+''
							+'<input type="hidden" value="'+v.enumID+'"></label>');
				} else {
					conditionDIV.push('<div class="select select-list"><label class="col-sm-1 control-label">'
							+'<input type="hidden" value="'+v.enumID+'"></label>');
				}
				if (k.themeName == '三国' || k.themeName == '武侠') {
					conditionDIV.push('<div class="col-sm-11"><dl id="theme'+v.enumID+'" class="conditiontheme">'
							+'<dd id="two'+k.themeID+'"><a href="#'+k.themeID+'">'+k.themeName+'</a><input type="hidden" value="'+k.themeID+'"></dd></dl></div></div>');
				} else {
					conditionDIV.push('<label class="col-sm-1 control-label">'+k.themeName+'</label>');
					conditionDIV.push('<div class="col-sm-10"><dl id="theme'+k.themeID+'" class="conditiontheme"><input type="hidden" value="'+k.themeID+'">');
					$.each(threeTheme,function(m,n){
						if (n.parentID == k.themeID) {
							conditionDIV.push('<dd id="themes'+n.themeID+'"><a href="#'+n.themeID+'">'+n.themeName+'</a>'
									+'<input type="hidden" value="'+n.themeID+'"></dd>');
						}
					});
					conditionDIV.push('</dl></div></div>');
				}
				
				index ++;
			}
		});
		conditionDIV.push('</div>');
	});
	$('#commonCondition').html(conditionDIV.join(""));
	addThemeEvent(oneTheme,twoTheme);
	addThemeSelect(rowData);
}

// 游戏题材添加事件
function addThemeEvent(oneTheme,twoTheme){
	$.each(oneTheme,function(i,v){
		$("#theme"+v.enumID+" dd").click(function () {
			var _this = this
			$('#commonCondition .select-list dd').each(function() {
				if (_this === this) {
					$(this).toggleClass("selected")
				} else {
					$(this).removeClass("selected")
				}
			})
		});
		$.each(twoTheme,function(j,k){
			if (k.parentID == v.enumID) {
				$("#theme"+k.themeID+" dd").click(function () {
					var _this = this
					$('#commonCondition .select-list dd').each(function() {
						if (_this === this) {
							$(this).toggleClass("selected")
						} else {
							$(this).removeClass("selected")
						}
					})
				});
			}
		});
	});
}

// 添加题材颜色
function addThemeSelect(rowData){
	if (rowData.gameTheme) {
		var themes = rowData.gameTheme.split(",");
		if (themes.length == 3) {
			$('#themes'+themes[2]+'').addClass("selected");
		} else {
			$('#two'+themes[1]+'').addClass("selected");
		}
	}
}

// 保存游戏题材
function saveThemeData(){

    for (var i = 0;i < $("#gameTab > li").length;i++) {
        if ($($("#gameTab > li")[i]).hasClass('active')) {
            var tabName = $($("#gameTab > li")[i]).text();
            if (tabName == "游戏总榜") {
                var appID = $('#inputappID').val();
                var ddlist = $('#commonCondition .select-list dd');
                var gameTheme;
                $.each(ddlist,function(i,v){
                    if ($(v).hasClass('selected') == true) {
                        var themeValue3 = $(v).find('a').text();
                        var themeID3 = $(v).find('input').val();
                        var themeID2 = $(v).siblings('input').val();
                        var themeID1 = $(v).parent().parent().siblings().find('input').val();
                        if (themeID3 && themeID1) {
                            if (themeID2) {
                                gameTheme = themeID1 + "," + themeID2 + "," + themeID3;
                            } else {
                                gameTheme = themeID1 + "," + themeID3;
                            }

                        }
                    }
                });
                var gameData = {
                        'appID' : appID,
                        'gameTheme' : gameTheme
                };

                //取出更改前的游戏题材相关值
                var data = $("#gameTops").bootstrapTable('getData')

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        //游戏题材如果初始没有选中值，更改后也没有选中值，不予提交
                        if (!this.gameThemeName && !gameTheme) {
                            $.messager.popup("请选择游戏题材。");
                        } else {
                            saveGameData('saveGameTheme.do',gameData,function() {updateThemeData(appID, gameTheme)});
                        }
                    }
                })
            } else if (tabName == "新建游戏"){
                var appID = $('#inputappID').val();
                var ddlist = $('#commonCondition .select-list dd');
                var gameTheme;
                $.each(ddlist,function(i,v){
                    if ($(v).hasClass('selected') == true) {
                        var themeValue3 = $(v).find('a').text();
                        var themeID3 = $(v).find('input').val();
                        var themeID2 = $(v).siblings('input').val();
                        var themeID1 = $(v).parent().parent().siblings().find('input').val();
                        if (themeID3 && themeID1) {
                            if (themeID2) {
                                gameTheme = themeID1 + "," + themeID2 + "," + themeID3;
                            } else {
                                gameTheme = themeID1 + "," + themeID3;
                            }

                        }
                    }
                });
                var gameData = {
                        'appID' : appID,
                        'gameTheme' : gameTheme
                };

                //取出更改前的游戏题材相关值
                var data = $("#newGameChartData").bootstrapTable('getData')

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        //游戏题材如果初始没有选中值，更改后也没有选中值，不予提交
                        if (!this.gameThemeName && !gameTheme) {
                            $.messager.popup("请选择游戏题材。");
                        } else {
                            saveGameData('saveGameTheme.do',gameData,function() {updateThemeData(appID, gameTheme)});
                        }
                    }
                })
            }
        }
    }

}
//游戏题材更改不刷新 更新表格数据
function updateThemeData(appID, gamePostData) {

    for (var i = 0;i < $("#gameTab > li").length;i++) {
        if ($($("#gameTab > li")[i]).hasClass('active')) {
            var tabName = $($("#gameTab > li")[i]).text();
            if (tabName == "游戏总榜") {
                var data = $("#gameTops").bootstrapTable('getData')
                var name = ''

                if (gamePostData) {
                    var theme = gamePostData.split(',')
                    $.each(themeData.oneTheme, function() {
                        if (theme[0] === this.enumID) {
                            name += '<span style="color:#FF00FF">' + this.themeName + '</span>&nbsp;'
                        }
                    })

                    $.each(themeData.twoTheme, function() {
                        if (Number(theme[1]) === this.themeID) {
                            name += '<span style="color:#FF7256">' + this.themeName + '</span>&nbsp;'
                        }
                    })

                    $.each(themeData.threeTheme, function() {
                        if (Number(theme[2]) === this.themeID) {
                            name += '<span style="color:#EEB422">' + this.themeName + '</span>&nbsp;'
                        }
                    })
                }

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        this.gameThemeName = name
                        this.gameTheme = gamePostData
                        $("#gameTops").bootstrapTable('updateRow', {index: index, row: this})
                    }
                })
            } else if (tabName == "新建游戏"){
                var data = $("#newGameChartData").bootstrapTable('getData')
                	var name = ''

                if (gamePostData) {
                    var theme = gamePostData.split(',')
                    $.each(themeData.oneTheme, function() {
                        if (theme[0] === this.enumID) {
                            name += '<span style="color:#FF00FF">' + this.themeName + '</span>&nbsp;'
                        }
                    })

                    $.each(themeData.twoTheme, function() {
                        if (Number(theme[1]) === this.themeID) {
                            name += '<span style="color:#FF7256">' + this.themeName + '</span>&nbsp;'
                        }
                    })

                    $.each(themeData.threeTheme, function() {
                        if (Number(theme[2]) === this.themeID) {
                            name += '<span style="color:#EEB422">' + this.themeName + '</span>&nbsp;'
                        }
                    })
                }

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        this.gameThemeName = name
                        this.gameTheme = gamePostData
                        $("#newGameChartData").bootstrapTable('updateRow', {index: index, row: this})
                    }
                })
            }
        }
    }


}
// 保存游戏题材，游戏标签
function saveGameData(url,gameData,fn){
	$.ajax({
		url : url,
		method : "post",
		data : {
			'gameData' : JSON.stringify(gameData)
		},
		async : true,
		success : function(data) {
			if (data.statusCode == 4) {
            	window.open("login.jsp");
            } else {

            	$.messager.popup("保存成功");
				$("#commonModal").modal('hide');
				fn()
				//注释掉刷新表格
				// refreshTable($('#gameTops'));
            }
		}
	});
}

// 打开游戏标签
var tagData = []
function openTags(rowData){
	$('#saveTagData').show();
	$('#saveThemeData').hide();
	$('#inputgameTags').val(rowData.gameTags);
	$('#inputappID').val(rowData.appID);
	$("#commonModal").modal({backdrop: 'static', keyboard: false});
	$('#commonLabel').text('游戏标签');
	$.ajax({
		url : 'getGameSelect.do',
		method : "post",
		async : true,
		success : function(data) {
			tagData = data.content.childTags;
			var parentTags = data.content.parentTags;
			var childTags = data.content.childTags;
			initGameTags(parentTags, childTags,rowData);
		}
	});
	
}

// 初始化
function initGameTags(parentTags, childTags,rowData){
	var conditionDIV = [];
	$.each(parentTags,function(i, v) {
		conditionDIV.push('<div class="form-group form-group-sm"><div class="select select-list">'
				+'<label class="col-sm-1 control-label">'+v.text+'</label><div class="col-sm-11"><dl id="tag'+v.value+'" class="conditiondl">');
		$.each(childTags,function(j,k){
			if (k.parentTag == v.value) {
				conditionDIV.push('<dd id="tags'+k.tagID+'"><a href="#'+k.tagID+'">'+k.tagName+'<input type="hidden" value="'+k.tagID+'"></a></dd>');
			}
		});
		conditionDIV.push('</dl></div></div></div>');
	});
	$('#commonCondition').html(conditionDIV.join(""));
	addTagEvent(parentTags);
	// 给已选标签标色
	addSelectClass(rowData);
}

//添加事件
function addTagEvent(parentTags){
	$.each(parentTags,function(i,v){
		$("#tag"+v.value+" dd").click(function () {
			if ($(this).hasClass('selected') == true) {
				$(this).removeClass("selected");
			} else {
				$(this).addClass("selected");
			}
		});
	});
}

// 添加颜色
function addSelectClass(rowData){
	if (rowData.gameTags) {
		var tags = rowData.gameTags.split(",");
		for (var i = 0;i < tags.length;i++) {
			$('#tags'+tags[i]+'').addClass("selected");
		}
	} 
}

//保存游戏标签
function saveTagData(){

    for (var i = 0;i < $("#gameTab > li").length;i++) {
        if ($($("#gameTab > li")[i]).hasClass('active')) {
            var tabName = $($("#gameTab > li")[i]).text();
            if (tabName == "游戏总榜") {
                var appID = $('#inputappID').val();
                var ddlist = $('#commonCondition .select-list dd');
                var tags = [];
                $.each(ddlist,function(i,v){
                    if ($(v).hasClass('selected') == true) {
                        tags.push($(v).find('input').val());
                    }
                });

                var gameTags = tags.join(",");
                var gameData = {
                        'appID' : appID,
                        'gameTags' : gameTags
                };

                //取出更改前的游戏题材相关值
                var data = $("#gameTops").bootstrapTable('getData')

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        //游戏标签如果初始没有选中值，更改后也没有选中值，不予提交
                        if (!this.gameTagsName && !gameTags) {
                            $.messager.popup("请选择游戏标签。");
                        } else {
                            saveGameData('saveGameTags.do',gameData, function(){updateTagData(appID, gameTags)});
                        }
                    }
                })
            } else if (tabName == "新建游戏"){
                var appID = $('#inputappID').val();
                var ddlist = $('#commonCondition .select-list dd');
                var tags = [];
                $.each(ddlist,function(i,v){
                    if ($(v).hasClass('selected') == true) {
                        tags.push($(v).find('input').val());
                    }
                });

                var gameTags = tags.join(",");
                var gameData = {
                        'appID' : appID,
                        'gameTags' : gameTags
                };

                //取出更改前的游戏题材相关值
                var data = $("#newGameChartData").bootstrapTable('getData')

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        //游戏标签如果初始没有选中值，更改后也没有选中值，不予提交
                        if (!this.gameTagsName && !gameTags) {
                            $.messager.popup("请选择游戏标签。");
                        } else {
                            saveGameData('saveGameTags.do',gameData, function(){updateTagData(appID, gameTags)});
                        }
                    }
                })
            }
        }
    }

}

//游戏题材更改不刷新 更新表格数据
function updateTagData(appID, gameTags) {

    for (var i = 0;i < $("#gameTab > li").length;i++) {
        if ($($("#gameTab > li")[i]).hasClass('active')) {
            var tabName = $($("#gameTab > li")[i]).text();
            if (tabName == "游戏总榜") {
                var data = $("#gameTops").bootstrapTable('getData')
                var gameTagsName = ""

                if (gameTags) {
                    //选中标签个数
                    var tagCount = 0

                    $.each(tagData, function() {
                        if (gameTags.indexOf(this.tagID) !== -1) {
                            tagCount++
                            var color = (tagCount % 2) ? '#FF00FF' : '#FF7256'
                            gameTagsName +=  '<span style="color:' + color + '">' + this.tagName + '</span>&nbsp;'
                        }
                    })
                }

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        this.gameTagsName = gameTagsName
                        this.gameTags = gameTags
                        $("#gameTops").bootstrapTable('updateRow', {index: index, row: this})
                    }
                })
            } else if (tabName == "新建游戏"){
                var data = $("#newGameChartData").bootstrapTable('getData')
                var gameTagsName = ""

                if (gameTags) {
                    //选中标签个数
                    var tagCount = 0

                    $.each(tagData, function() {
                        if (gameTags.indexOf(this.tagID) !== -1) {
                            tagCount++
                            var color = (tagCount % 2) ? '#FF00FF' : '#FF7256'
                            gameTagsName +=  '<span style="color:' + color + '">' + this.tagName + '</span>&nbsp;'
                        }
                    })
                }

                $.each(data, function(index) {
                    if (this.appID === appID) {
                        this.gameTagsName = gameTagsName
                        this.gameTags = gameTags
                        $("#newGameChartData").bootstrapTable('updateRow', {index: index, row: this})
                    }
                })
            }
        }
    }

}

//查询
function query(){

    for (var i = 0;i < $("#gameTab > li").length;i++) {
        if ($($("#gameTab > li")[i]).hasClass('active')) {
            var tabName = $($("#gameTab > li")[i]).text();
            if (tabName == "游戏总榜") {
                getData(1,50);
            } else if (tabName == "新建游戏"){
                var platform = $('#dropdownBtn').text().replace(/(^\s*)|(\s*$)/g, "");
                if ("游戏分析平台1.0" == platform) {
                    platform = "g";
                } else if ("H5游戏分析平台2.0" == platform) {
                    platform = "hh5";
                } else if ("移动应用统计分析平台" == platform) {
                    platform = "store";
                } else if ("广告效果监测平台" == platform) {
                    platform = "tracker";
                } else {
                    platform = "";
                }
                getNewGameData(1,50,platform);
            }
        }
    }

}

//导出Excel
function exportExcel(){
	var options = $("#gameTops").bootstrapTable('getOptions');
	var name = options.sortName;
	var order = options.sortOrder;
	var queryParam = buildCondition(1, 50, name, order);
	window.location = "exportGame.do?queryParam="+JSON.stringify(queryParam);
}
//构造查询条件
function buildCondition(pageNumber,pageSize,sortName,order){
	var startDate = dateRange.getCurrentDate().startDate;
	var endDate = dateRange.getCurrentDate().endDate;
	var platform = $('#productPlatformSelect').val();
	var platformName = $('#productPlatformSelect').find("option:selected").text();
	if (platform == -1) {
		platformName = '';
	}
	if ("游戏分析平台" == platformName) {
		platformName = "g";
	} else if ("H5游戏分析平台2.0" == platformName) {
		platformName = "hh5";
	} else if ("渠道分析平台" == platformName) {
		platformName = "store";
	} else if ("广告效果监测" == platformName) {
     		platformName = "tracker";
    } else {
		platformName = "";
	}
	var platformType = $('#platformMobileSelect').val();
	var platformTypeName = $('#platformMobileSelect').find("option:selected").text();
	if (platformType == -1) {
		platformTypeName = '';
	}
	var network = $('#networkSelect').val();
	if (network == -1) {
		network = '';
	}
	var keyValue = $('#serachGames').val();
	var queryParam = {
			'startDate' : startDate,
			'endDate' : endDate,
			'platform' : platformName,
			'platformType' : platformTypeName,
			'network' : network,
			'pageNumber' : pageNumber,
			'pageSize' : pageSize,
			"sortName" : sortName,
			"order" : order,
			'keyValue' : keyValue
		};
	return queryParam;
}
