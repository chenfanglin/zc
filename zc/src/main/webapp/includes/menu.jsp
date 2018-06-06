<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@page import="java.util.List"%>
<%@page import="com.zc.model.MenuModel"%>
<%
	// 从session中获取菜单列表
	List<MenuModel> menulist = (List<MenuModel>) session.getAttribute("menulist");
%>
<div class="collapse navbar-collapse navbar-ex1-collapse">
	<ul class="nav navbar-nav side-nav">
		<%for (MenuModel menu : menulist) {%>
		<li id="<%=menu.getMenuID()%>"><a href="<%=menu.getMenuPath()%>?menuID=<%=menu.getMenuID()%>"><i
				class="glyphicon glyphicon-<%=menu.getMenuLogo()%>"></i> <%=menu.getMenuName()%></a>
		</li>
		<% }%>
	</ul>
</div>