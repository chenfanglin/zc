$(function(){
	$("#loginbtn").focus();
	// 绑定Enter键
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
//			$("#loginbtn").click(); 
			login();
		} 
	});
	$("#loginbtn").click(function(){ 
		login();
	});
//	var countdown = 0
//    var timer
//     $(".get-verifyCode").click(function() {
//          $(".login-error").show()
//          if (!$('input[name="loginName"]').val()) {
//            $(".login-error").html('没有填写邮箱')
//            return
//          }
//          var verifyCodeBtn = $(this)
//
//          if (countdown > 0) return
//          countdown = 60
//
//          verifyCodeBtn.css('background-color', '#ccc')
//
//          $.ajax({
//            url: "http://119.147.212.253:38083/common/securityCode/send",
//            data: {uid: $('input[name="loginName"]').val(), app: 'crm'},
//            dataType : 'jsonp',
//            jsonp:"jsoncallback",
//            success: function(data) {
//              if (data.statusCode ===200) {
//                clearInterval(timer)
//
//                verifyCodeBtn.text('重发（' + countdown + '）')
//                timer = setInterval(function() {
//                  countdown--
//                  verifyCodeBtn.text('重发（' + countdown + '）')
//                  if (countdown <= 0) {
//                    clearInterval(timer)
//                    verifyCodeBtn.text('获取验证码')
//                    verifyCodeBtn.css('background-color', '#4bd083')
//                  }
//                }, 1000)
//              } else {
//                $(".login-error").show();
//                $(".login-error").html(data.content);
//                verifyCodeBtn.css('background-color', '#4bd083')
//              }
//            }
//          })
//        })
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
//    if (!paramArr[2].split('=')[1]) {
//          $(".login-error").html('没有填写验证码')
//          return
//    }

	$.ajax({
        type: "post",
        url:"login.do",
        data:$('#formlogin').serialize(),
        async: true,
        success: function(data) {
        	if(data.statusCode == 200){
//        		if (data.content.department == 5){
//        			window.location.href = "newGames.jsp?menuID=14";
//        		} else if (data.content.department == 1) {
//        			window.location.href = "usercheck.jsp?menuID=1";
//        		} else {
        			window.location.href = "patent_manager.jsp";
//        		}
        	}else if(data.statusCode ==410){
                $(".login-error").show();
				$(".login-error").html("验证码不正确。");
        	}else if (data.statusCode == 1) {
        		$(".login-error").show();
				$(".login-error").html("用户名或者密码不正确。");
        	} else if (data.statusCode == 402) {
        		$(".login-error").show();
				$(".login-error").html("您没有登陆权限，请联系系统管理员。");
        	}
        }
    });
}