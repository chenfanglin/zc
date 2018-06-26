<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<meta name="viewport"
	content="width=device-width,initial-scale=1,maximum-scale=1.0" />
<meta name="keywords" content="智产网管理系统"/>
<meta name="description" content="智产网管理系统"/>
<title>智产网管理系统</title>
<link rel="shortcut icon"
	href="../assets/images/favicon.ico"/>
<link href="../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="../assets/style/login.css" rel="stylesheet">
</head>
<body>
	<div class="box">
		<div class="login-box">
			<div class="login-title text-center">
				<h1>
					<small>后台管理系统</small>
				</h1>
			</div>
			<div class="login-content ">
				<div class="form">
					<form id="formlogin">
						<div class="login-error"></div>
						<div class="form-group">
							<div class="col-xs-12">
								<div class="input-group">
									<span class="input-group-addon"><span
										class="glyphicon glyphicon-user"></span></span> <input type="text"
										id="username" name="user_name" class="form-control"
										placeholder="用户名" />
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-xs-12">
								<div class="input-group">
									<span class="input-group-addon"><span
										class="glyphicon glyphicon-lock"></span></span> <input
										type="password" id="password" name="password"
										class="form-control" placeholder="密码" />
								</div>
							</div>
						</div>

						<div class="form-group">
<!-- 						 <div class="col-xs-12"> -->
<!--                             <div class="input-group"> -->
<!--                               <span class="input-group-addon verifyCode"></span> -->
<!--                                <input style="width: 305px;" -->
<!--                                 class="form-control" type="text" autocomplete="off" -->
<!--                                 placeholder="验证码" name="verifyCode" /> -->
<!--                             </div> -->
<!--                              <div class="get-verifyCode">获取验证码</div> -->
<!--                           </div> -->

						<div class="form-group form-actions">
							<div class="col-xs-4 col-xs-offset-4 ">
								<button type="button" id="loginbtn" onclick="login()" data-loading-text="正在登陆"
									class="btn btn-primary btn-lg btn-block">
									<span class="glyphicon glyphicon-off"></span> 登录
								</button>
							</div>
						</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script src="../assets/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.js"></script>
	<script type="text/javascript" src="../assets/script/login.min.js"></script>
</body>
</html>