/**
 patent_type
false
string

专利类型，不选就不传，0发明、1实用、2外观
patent_status
false
string

专利状态，不选就不传，0未下证、1下证、2未授权
min_patent_price
false
int

最小价格，最小值是0
max_patent_price
false
int

最大价格
publish_year
false
int

年份，传下拉框的value
industry
false 
int

行业，传下拉框的key
is_batch
false
int

是否批量:0不批量,1批量
keyword
false
string

搜索关键字
sort
true
string 

默认按照时间排序 “publish_time”
价格排序”patent_price”
年份排序”publish_year”
order
true
string

排序规则 升序“asc”，降序“desc”
page_num
true
int

第几页
page_size
true
int

每页显示条数
 */
// 发布年份接口：http://www.zhichanip.cn/get_publish_year_list.do
//查询行业接口：http://www.zhichanip.cn/get_industry_list.do
//获取表格数据接口:http://www.zhichanip.cn/query_patent_list.do
//获取热搜数据接口：http://193.112.159.77/get_hot_words.do
var tools = {
	patent_type:'',//专利类型
	patent_status:'',//专利状态
	min_patent_price:'',//最小价格
	max_patent_price:'',//最大价格
	publish_year:'',//年份
	industry:'',//行业
	is_batch:'',//是否批量:0不批量,1批量
	keyword:'',//搜索关键字
	sort:'publish_time',//默认按照时间排序 “publish_time”价格排序”patent_price”年份排序”publish_year”
	order:'desc',//排序规则 升序“asc”，降序“desc”	
	page_num:1,//第几页
	page_size:'12',//每页显示条数
	totalPages:'',//总页数
	selCon1:'',//专利类型
	selCon1Index:'',//专利类型参数
	selCon2:'',//专利状态
	selCon2Index:'',//专利状态参数
	selCon3:'',//价格
	selCon4:'',//年份
	selCon5:'',//行业
	industryList:'',//行业key
	industryIndex:'',//行业参数
	selCon6:'',//是否批量
	contactList:[],//联系方式数组
	init:function(){
		tools.getPublishYear();
		tools.getIndustryList();
		tools.getData();
		tools.getHot();
	},
	getHot:function(){//热搜
		$.ajax({
             type: "post",
             crossDomain: true,
             url: "http://127.0.0.1:8080/zc/get_hot_words.do",
             data: {},
             dataType: "json",
             success: function(res){
             	console.log(res)
//               if(res.statusCode == "200"){
//               	$(".maskload").hide();
////               	res.content.unshift({'key':'', 'value': '不限'})
////                  $(".hangye").html(template('template', { list: res.content }));
//               }else{
//               	$(".maskload").hide()
//               	alert(res.content)
//               }

              },
              error:function(){
              	$(".maskload").hide();
              	alert("接口异常")
              }
        })
	},
	getIndustryList:function(){//行业
		$.ajax({
             type: "post",
             crossDomain: true,
             url: "http://127.0.0.1:8080/zc/get_industry_list.do",
             data: {},
             dataType: "json",
             success: function(res){
                 if(res.statusCode == "200"){
                 	$(".maskload").hide();
                 	res.content.unshift({'key':'', 'value': '不限'})
                 	tools.industryList = res.content;
                 	console.log(tools.industryList)
                    $(".hangye").html(template('template', { list: res.content }));
                 }else{
                 	$(".maskload").hide()
                 	alert(res.content)
                 }

              },
              error:function(){
              	$(".maskload").hide();
              	alert("接口异常")
              }
        })
	},
	getPublishYear:function(){//发布年份
		$.ajax({
             type: "post",
             crossDomain: true,
             url: "http://127.0.0.1:8080/zc/get_publish_year_list.do",
             data: {},
             dataType: "json",
             success: function(res){
//                       console.log(res.content)
                         if(res.statusCode == "200"){
                         	$(".maskload").hide();
                         	res.content.unshift({'key':'', 'value': '不限'})
                          $(".year").html(template('template', { list:res.content }));
                         }else{
				     		$(".maskload").hide()	
				     		      alert(res.content)
				             }
              },
              error:function(){
              	$(".maskload").hide();
              	alert("接口异常")
              }
        })
	},
	getData1:function(){//获取表格数据
		$(".maskload").show();
		var state = '';
		if(tools.selCon6 == ''){
			state = '';
		}else{
			state = tools.selCon6 == "批量" ? 1 : 0;
		}
		var params = {
             	patent_type:tools.selCon1Index,//专利类型
             	patent_status:tools.selCon2Index,//专利状态
             	min_patent_price:tools.min_patent_price,//最小价格
             	max_patent_price:tools.max_patent_price,//最大价格
             	publish_year:tools.selCon4,//年份
             	industry:tools.selCon5,//行业
             	is_batch:state,//是否批量:0不批量,1批量
             	keyword:tools.keyword,//搜索关键字
             	sort:tools.sort,
             	order:tools.order,
             	page_num:tools.page_num,
             	page_size:tools.page_size
             }
//		console.log(params)
		$.ajax({
             type: "post",
             crossDomain: true,
             url: "http://127.0.0.1:8080/zc/query_patent_list.do",
             data: params,
             dataType: "json",
             success: function(res){
                         console.log(res.content)  
                         $(".maskload").hide()
             	if(res.statusCode != "200"){
             		alert(res.content)
             	}else{
             		tools.contactList = [];
                         for (var i = 0;i<res.content.data.length;i++) {
                         	var obj = {};
                         	obj.userQQ = res.content.data[i].userQQ;
                         	obj.userWX = res.content.data[i].userWX;
                             tools.contactList.push(obj)
                         }
             		 if(res.content.data.length == 0){
                         	$(".null").show();
                         	$(".tabs").hide();
                         }else{
                         	$(".null").hide();
                         	$(".tabs").show();
                         	 $(".lists").html(template('template1', { list:res.content.data }));
                     	    tools.totalPages = Math.ceil(res.content.totalRecord/tools.page_size);
                         }
             	}
              },
              error:function(){
              	$(".maskload").hide();
              	alert("接口异常")
              }
        })
	},
	getData:function(){//获取表格数据
		$(".maskload").show();
		var state = '';
		if(tools.selCon6 == ''){
			state = '';
		}else{
			state = tools.selCon6 == "批量" ? 1 : 0;
		}
		tools.page_num = 1;
		var params = {
             	patent_type:tools.selCon1Index,//专利类型
             	patent_status:tools.selCon2Index,//专利状态
             	min_patent_price:tools.min_patent_price,//最小价格
             	max_patent_price:tools.max_patent_price,//最大价格
             	publish_year:tools.selCon4,//年份
             	industry:tools.industryIndex,//行业
             	is_batch:state,//是否批量:0不批量,1批量
             	keyword:tools.keyword,//搜索关键字
             	sort:tools.sort,
             	order:tools.order,
             	page_num:tools.page_num,
             	page_size:tools.page_size
             }
		console.log(params)
		$.ajax({
             type: "post",
             crossDomain: true,
             url: "http://127.0.0.1:8080/zc/query_patent_list.do",
             data: params,
             dataType: "json",
             success: function(res){
                         console.log(res.content)  
                         $(".maskload").hide()
                       
             	if(res.statusCode != "200"){
             		alert(res.content)
             	}else{
             		  tools.contactList = [];
                         for (var i = 0;i<res.content.data.length;i++) {
                         	var obj = {};
                         	obj.userQQ = res.content.data[i].userQQ;
                         	obj.userWX = res.content.data[i].userWX;
                             tools.contactList.push(obj)
                         }
             		 if(res.content.data.length == 0){
                         	$(".null").show();
                         	$(".tabs").hide();
                         }else{
                         	$(".null").hide();
                         	$(".tabs").show();
                         	 $(".lists").html(template('template1', { list:res.content.data }));
                     	    tools.totalPages = Math.ceil(res.content.totalRecord/tools.page_size);
                           tools.page();
                         }
             	}
              },
              error:function(){
              	$(".maskload").hide();
              	alert("接口异常")
              }
        })
	},
	page:function(){
		$(function(){
			$("#page").Page({
          totalPages: tools.totalPages,//分页总数
          liNums: 9,//分页的数字按钮数(建议取奇数)
          activeClass: 'activP', //active 类样式定义
          callBack : function(page){
            		tools.page_num = page;
            		tools.getData1();
          }
      });
		})
	}
}
$(document).on("click",".btn",function(){
	$(".mask").show();
var index = $(this).parent().parent().index();
console.log(tools.contactList[index].userQQ);
$(".dialog span").html("电话(微信)："+tools.contactList[index].userWX);
$(".dialog strong").html("QQ："+tools.contactList[index].userQQ);
})
$(document).on("click",".close",function(){
	$(".mask").hide();
})

$("body").on("click",".option",function(){
	console.log($(this).html())
	var index = $(this).index();
	if($(this).parent().data("type") == 4){
		if(index == 0){
		 $(".cancle4").remove();
		 tools.selCon4 = '';
		 $(this).parent().parent().find("span").html("年份");
		}else{
			tools.selCon4 = $(this).html();
		if($(".cancle").children().hasClass("cancle4")){
			$("body").find(".cancle4 span").html(tools.selCon4);
		}else{
			$(".cancle").append("<li class=\"cancle4\"><span>"+tools.selCon4+"</span><strong class=\"delet\">X</strong></li>");
		}
		$(this).parent().parent().find("span").html($(this).html())
		}
	}else if($(this).parent().data("type") == 5){
		console.log(tools.industryList[index].key);
		tools.industryIndex = tools.industryList[index].key;
		if(index == 0){
		 $(".cancle5").remove();
		 tools.selCon5 = '';
		 $(this).parent().parent().find("span").html("行业");
		}else{
		tools.selCon5 = $(this).html();
		if($(".cancle").children().hasClass("cancle5")){
			$("body").find(".cancle5 span").html(tools.selCon5);
		}else{
			$(".cancle").append("<li class=\"cancle5\"><span>"+tools.selCon5+"</span><strong class=\"delet\">X</strong></li>");
		}
		$(this).parent().parent().find("span").html($(this).html())
		}
	}else if($(this).parent().data("type") == 6){
		if(index == 0){
		 $(".cancle6").remove();
		 tools.selCon6 = '';
		 $(this).parent().parent().find("span").html("是否批量");
		}else{
		tools.selCon6 = $(this).html();
		if($(".cancle").children().hasClass("cancle6")){
			$("body").find(".cancle6 span").html(tools.selCon6);
		}else{
			$(".cancle").append("<li class=\"cancle6\"><span>"+tools.selCon6+"</span><strong class=\"delet\">X</strong></li>");
		}
		$(this).parent().parent().find("span").html($(this).html())
		}
	}
		$(this).parent().hide();
		if($(".cancle").children().length==0){
		$(".reset").hide();
	}else{
		$(".reset").show();
	}
})
$(".sel span").on("click",function(){
	var index = $(this).parent().index();
	    $(this).parent().parent().find("span").removeClass("spanClass");
		$(this).addClass("spanClass");
//	console.log($(this).parent().parent().data("type"))
	if($(this).parent().parent().data("type") == 1){
		tools.selCon1 = $(this).html();
		console.log(index);
		if(index == 1){
			tools.selCon1Index = 0;
		}else if(index == 2){
			tools.selCon1Index = 1;
		}else if(index == 3){
			tools.selCon1Index = 2;
		}
		if($(".cancle").children().hasClass("cancle1")){
			$("body").find(".cancle1 span").html(tools.selCon1);
		}else{
			$(".cancle").append("<li class=\"cancle1\"><span>"+tools.selCon1+"</span><strong class=\"delet\">X</strong></li>");
		}
		
	}else if($(this).parent().parent().data("type") == 2){
	tools.selCon2 = $(this).html();
	if(index == 1){
			tools.selCon2Index = 0;
		}else if(index == 2){
			tools.selCon2Index = 1;
		}else if(index == 3){
			tools.selCon2Index = 2;
		}
		if($(".cancle").children().hasClass("cancle2")){
			$("body").find(".cancle2 span").html(tools.selCon2);
		}else{
			$(".cancle").append("<li class=\"cancle2\"><span>"+tools.selCon2+"</span><strong class=\"delet\">X</strong></li>");
		}
	}else if($(this).parent().parent().data("type") == 3){
		$("#price_s").val("");
	    $("#price_e").val("");
	tools.selCon3 = $(this).html();
	  console.log(index)
	  if(index == 1){
	  	tools.min_patent_price = "";
	  	tools.max_patent_price = "10000";
	  }else if(index == 2){
	  	tools.min_patent_price = "10000";
	  	tools.max_patent_price = "20000";
	  }else if(index == 3){
	  	tools.min_patent_price = "20000";
	  	tools.max_patent_price = "30000";
	  }else if(index == 4){
	  	tools.min_patent_price = "30000";
	  	tools.max_patent_price = "50000";
	  }else if(index == 5){
	  	tools.min_patent_price = "50000";
	  	tools.max_patent_price = "";
	  }
		if($(".cancle").children().hasClass("cancle3")){
			$("body").find(".cancle3 span").html(tools.selCon3);
		}else{
			$(".cancle").append("<li class=\"cancle3\"><span>"+tools.selCon3+"</span><strong class=\"delet\">X</strong></li>");
		}
	}
		if($(".cancle").children().length==0){
		$(".reset").hide();
	}else{
		$(".reset").show();
	}
})
$(".search-opt .select1 dd").on("mouseover",function(){
	$(this).children(".year_all").show();
})
$(".search-opt .select1 dd").on("mouseout",function(){
	$(this).children(".year_all").hide();
})
$("body").on("click",".delet",function(){
	if($(this).parent().hasClass("cancle1")){
		console.log(1)
		tools.selCon1 = '';
		$(".re1").find("span").removeClass("spanClass");
	}else if($(this).parent().hasClass("cancle2")){
		console.log(2)
		tools.selCon2 = '';
		$(".re2").find("span").removeClass("spanClass");
	}else if($(this).parent().hasClass("cancle3")){
		console.log(3)
		tools.min_patent_price = "";
	  	tools.max_patent_price = "";
		$(".re3").find("span").removeClass("spanClass");
		$("#price_s").val("");
		$("#price_e").val("")
	}else if($(this).parent().hasClass("cancle4")){
		console.log(4)
		tools.selCon4 = '';
		$(".re4").html("年份");
	}else if($(this).parent().hasClass("cancle5")){
		console.log(5)
		tools.selCon5 = '';
		$(".re5").html("行业");
	}else if($(this).parent().hasClass("cancle6")){
		tools.selCon6 = '';
		$(".re6").html("是否批量");
	}
	$(this).parent().remove();
	if($(".cancle").children().length==0){
		$(".reset").hide();
	}else{
		$(".reset").show();
	}
})
$(".reset").on("click",function(){
	$(".cancle").children().remove();
	$(".reset").hide();
	$(".re4").html("年份");
	$(".re5").html("行业");
	$(".re6").html("是否批量");
	$(".re1").find("span").removeClass("spanClass");
	$(".re2").find("span").removeClass("spanClass");
	$(".re3").find("span").removeClass("spanClass");
	tools.selCon1 = '';
	tools.selCon2 = '';
	tools.selCon3 = '';
	tools.selCon4 = '';
	tools.selCon5 = '';
	tools.selCon6 = '';
	$("#price_s").val("");
	$("#price_e").val("")
	tools.min_patent_price = "";
	tools.max_patent_price = "";
})
$(".confirm-btn").on("click",function(){
	var n1 = $("#price_s").val();
	var n2 = $("#price_e").val();
	if(isNaN(n1)){
		$(".error").show();
		return false;
	}
	n1 = Number(n1);
	n2 = Number(n2);
	if(n1 == ""){
		var n1 = 0;
	}
		if(n1==""&&n2==""){
		$(".error").show();
	}
	else{
		if(n1 ==''||n2 ==''){
			tools.min_patent_price = n1*10000;
		if(n2 == 0){
	    tools.max_patent_price = '';
		}else{
	    tools.max_patent_price = n2*10000;
		}
	    tools.getData();
				$(".error").hide();
		$(".re3").find("span").removeClass("spanClass");
		
	    if($(".cancle").children().hasClass("cancle3")){
	    	if(n2 == 0){
	    		$("body").find(".cancle3 span").html(n1+"万以上");
	    	}else{
			$("body").find(".cancle3 span").html(n1+"-"+n2+"万");
	    	}

		}else{
			if(n2 == 0){
				$(".cancle").append("<li class=\"cancle3\"><span>"+n1+"万以上</span><strong class=\"delet\">X</strong></li>");
			}else{
				$(".cancle").append("<li class=\"cancle3\"><span>"+n1+"-"+n2+"万</span><strong class=\"delet\">X</strong></li>");
			}
			
		}
		}else{
			if(n1>n2){
				$(".error").show();
			}else{
				tools.min_patent_price = n1*10000;
		if(n2 == 0){
	    tools.max_patent_price = '';
		}else{
	    tools.max_patent_price = n2*10000;
		}
		     tools.getData();
				$(".error").hide();
		$(".re3").find("span").removeClass("spanClass");
	    if($(".cancle").children().hasClass("cancle3")){
			$("body").find(".cancle3 span").html(n1+"-"+n2+"万");
		}else{
			$(".cancle").append("<li class=\"cancle3\"><span>"+n1+"-"+n2+"万</span><strong class=\"delet\">X</strong></li>");
		}
			}
				
		}
	
	}
	
	
})
$(".go").on("click",function(){
	tools.page_num = 1;
	if(tools.selCon1 == ''){
		tools.selCon1Index = '';
	}
	if(tools.selCon1 == ''){
		tools.selCon2Index = '';
	}
	if(tools.selCon5 == ""){
		tools.industryIndex = '';
	}
  tools.getData();
})
$(".ss").on("click",function(){
	var index = $(this).parent().index();
	console.log(index);
	$(".ss").removeClass("spanClass");
	if($(this).hasClass("spanClass")){return false;}
	$(this).addClass("spanClass")
	if(index == 0){
		tools.order = "desc";
		tools.sort = "publish_time"
	}else if(index == 1){
		tools.order = "desc";
		tools.sort = "patent_price"
	}else if(index == 2){
		tools.order = "asc";
		tools.sort = "patent_price"
	}else if(index == 3){
		tools.order = "desc";
		tools.sort = "publish_year"
	}
	tools.getData();
})
document.onkeyup = function (e) {//搜索关键字  
    var code = e.charCode || e.keyCode; 
    if (code == 13) {  
    	  tools.keyword = $(".serch input").val();
        tools.getData();
    }  
} 
$(".icon-search").on("click",function(){
	tools.keyword = $(".serch input").val();
        tools.getData();
})
$(".serch input").on("input",function(){
	if($(this).val().length == 0){
		tools.keyword = '';
	}
})
tools.init();