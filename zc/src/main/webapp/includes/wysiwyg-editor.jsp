<%@ page language="java" contentType="text/html; charset=utf-8"%>
<div class="btn-group">
	<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体"><i
		class="icon-font"></i><b class="caret"></b></a>
	<ul class="dropdown-menu">
	</ul>
</div>
<div class="btn-group">
	<a class="btn dropdown-toggle" data-toggle="dropdown" title="字体大小"><i
		class="icon-text-height"></i>&nbsp;<b class="caret"></b></a>
	<ul class="dropdown-menu">
		<li><a data-edit="fontSize 5"><font size="5">Huge</font></a></li>
		<li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>
		<li><a data-edit="fontSize 1"><font size="1">Small</font></a></li>
	</ul>
</div>
<div class="btn-group">
	<a class="btn" data-edit="bold" title="加粗"><i
		class="icon-bold"></i></a> <a class="btn" data-edit="italic"
		title="斜体"><i class="icon-italic"></i></a> <a
		class="btn" data-edit="strikethrough" title="删除线"><i
		class="icon-strikethrough"></i></a> <a class="btn" data-edit="underline"
		title="下划线"><i class="icon-underline"></i></a>
</div>
<div class="btn-group">
	<a class="btn" data-edit="insertunorderedlist" title="无序列表"><i
		class="icon-list-ul"></i></a> <a class="btn" data-edit="insertorderedlist"
		title="有序列表"><i class="icon-list-ol"></i></a> <a class="btn"
		data-edit="outdent" title="去除缩进 "><i
		class="icon-indent-left"></i></a> <a class="btn" data-edit="indent"
		title="首行缩进"><i class="icon-indent-right"></i></a>
</div>
<div class="btn-group">
	<a class="btn" data-edit="justifyleft" title="左对齐"><i
		class="icon-align-left"></i></a> <a class="btn" data-edit="justifycenter"
		title="居中"><i class="icon-align-center"></i></a> <a
		class="btn" data-edit="justifyright" title="右对齐"><i
		class="icon-align-right"></i></a> <a class="btn" data-edit="justifyfull"
		title="两端对齐"><i class="icon-align-justify"></i></a>
</div>
<div class="btn-group">
	<a class="btn dropdown-toggle" data-toggle="dropdown" title="超链接"><i
		class="icon-link"></i></a>
	<div class="dropdown-menu input-append">
		<input class="span2" placeholder="URL" type="text"
			data-edit="createLink" />
		<button class="btn" type="button">添加</button>
	</div>
	<a class="btn" data-edit="unlink" title="取消链接"><i
		class="icon-cut"></i></a>
</div>

<div class="btn-group">
	<a class="btn" title="插入图片"
		id="pictureBtn"><i class="icon-picture"></i></a> <input type="file"
		data-role="magic-overlay" data-target="#pictureBtn"
		data-edit="insertImage" />
</div>
<div class="btn-group">
	<a class="btn" data-edit="undo" title="撤销"><i
		class="icon-undo"></i></a> <a class="btn" data-edit="redo"
		title="返回"><i class="icon-repeat"></i></a>
</div>
