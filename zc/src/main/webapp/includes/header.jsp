<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@page import="com.zc.model.UserModel"%>

<%
	UserModel user = (UserModel) session.getAttribute("currentUser");
	
	String appContext = request.getContextPath();
	if (user == null) {
		response.setContentType("text/html; charset=utf-8");
		//response.sendRedirect(appContext + "/admin/pages/login.jsp");
		String url = appContext + "/admin/login.jsp";
		out.print("<script>top.location.href='"+url+"'</script>");
		return;
	}
%>
<div class="navbar-header">
	<button type="button" class="navbar-toggle" data-toggle="collapse"
		data-target=".navbar-ex1-collapse">
		<span class="sr-only">切换导航</span> <span class="icon-bar"></span>
		<span class="icon-bar"></span> <span class="icon-bar"></span>
	</button>
	<a class="navbar-brand" href="customerInfo.jsp?menuID=2">
	<img src="../assets/images/logo.png"></a>
</div>
<ul class="nav navbar-right top-nav">
	<li class="nav active"><a href="javascript:void(0)"><i
			class="glyphicon glyphicon-user"></i> <%=user.getUserName() %> </a></li>
	<li class="nav"><a href="javascript:void(0)" onclick="updatePwd()"><i
			class="glyphicon glyphicon-pencil"></i> 修改密码 </a></li>
	<li class="nav"><a href="javascript:void(0)" onclick="loginout()"><i class="glyphicon glyphicon-off"></i>
			注销 </a></li>
</ul>
