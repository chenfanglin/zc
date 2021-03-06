$(function(){
	$("#loginbtn").focus();
	// 绑定Enter键
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
			login();
		} 
	});
	$("#loginbtn").click(function(){ 
		login();
	});
})

function login(){
    $(".login-error").show();
    var paramStr = $('#formlogin').serialize()
    var paramArr = paramStr.split('&')
    if (!paramArr[0].split('=')[1]) {
          $(".login-error").html('没有填写用户名')
          return
    }
    if (!paramArr[1].split('=')[1]) {
          $(".login-error").html('没有填写密码')
          return
      }

	$.ajax({
        type: "post",
        url:"login.do",
        data:$('#formlogin').serialize(),
        async: true,
        success: function(data) {
        	if(data.statusCode == 200){
        			window.location.href = "patent_manager.jsp?menuID=1";
        	}else {
        		$(".login-error").show();
				$(".login-error").html("用户名或者密码不正确。");
        	}
        }
    });
}