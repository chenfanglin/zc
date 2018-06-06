$(function() {
	initPages();
	bindEvent();
})
// 初始化页面
function initPages() {
	initShowLetter();
	addActiveClass();
}

// 查看站内信
function initShowLetter() {
	$.ajax({
		url : 'queryAllLetter.do',
		method : "post",
		async : true,
		success : function(data) {
			var resData = data.content;
			setLetters(resData);
		}
	});
}

// 站内信
function setLetters(resData) {
	var letterDIV = [];
	$
			.each(
					resData,
					function(i, v) {
						letterDIV
								.push('<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading'
										+ v.messageID
										+ '">'
										+ '<h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'
										+ v.messageID
										+ '" aria-expanded="false"'
										+ ' style="text-decoration: none;" aria-controls="collapse'
										+ v.messageID
										+ '"><i class="round">●</i>'
										+ v.subject
										+ '</a></h4></div>'
										+ '<div id="collapse'
										+ v.messageID
										+ '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'
										+ v.messageID
										+ '">'
										+ '<div class="panel-body"><div class="tab-inline-padding"><ul class="nav nav-tabs nav-pills">'
										+ '<li role="presentation" class="active"><a href="#zh'
										+ v.messageID
										+ '" data-toggle="tab" class="tab-size">简体</a></li>'
										+ '	<li role="presentation"><a href="#en'
										+ v.messageID
										+ '" data-toggle="tab" class="tab-size">English</a></li>'
										+ '	<li role="presentation"><a href="#ft'
										+ v.messageID
										+ '" data-toggle="tab" class="tab-size">繁体</a></li></ul></div>'
										+ '<div class="tab-content contentpadding"><div role="tabpanel" class="tab-pane active" id="zh'
										+ v.messageID
										+ '">'
										+ v.content
										+ '</div>'
										+ '<div role="tabpanel" class="tab-pane" id="en'
										+ v.messageID
										+ '">'
										+ v.contentEN
										+ '</div>'
										+ '<div role="tabpanel" class="tab-pane" id="ft'
										+ v.messageID
										+ '">'
										+ v.contentFT
										+ '</div>' + '</div></div></div></div>');
					});
	$('#accordion').html(letterDIV.join(""));
}

// 绑定事件
function bindEvent() {
	$('.submitletter').click(function() {
		submitletter();
	});
	// 发送邮件
	$('.submitemail').click(function() {
		submitemail();
	});
	// 切换标签页
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		toggleTab(e);
	});
	$('#inputaddresses').on('beforeItemAdd', function(event) {
	});
	$('.select-all a').click(function() {
		$('#all_zone').show();
		$('.bootstrap-tagsinput').hide();
	});
	$('#unselect_all').on('click', function() {
		$('#all_zone').hide();
		$('.bootstrap-tagsinput').show();
	})
}

// 提交站内信
function submitletter() {
	var addressee = $('#addressee').val();
	var subject = $('#inputsubject').val();
	var subjectEN = $('#inputsubjectEN').val();
	var subjectFT = $('#inputsubjectFT').val();
	var contentZH = $($('#editorZH')[0].lastElementChild)[0].innerHTML;
	if ($($('#editorZH')[0].lastElementChild).find('textarea').length > 0) {
		contentZH = $($('#editorZH')[0].lastElementChild).find('textarea').val();
	}
	var contentEN = $($('#editorEN')[0].lastElementChild)[0].innerHTML;
	if ($($('#editorEN')[0].lastElementChild).find('textarea').length > 0) {
		contentEN = $($('#editorEN')[0].lastElementChild).find('textarea').val();
	}
	var contentFT = $($('#editorFT')[0].lastElementChild)[0].innerHTML;
	if ($($('#editorFT')[0].lastElementChild).find('textarea').length > 0) {
		contentFT = $($('#editorFT')[0].lastElementChild).find('textarea').val();
	}
	if (subject.length > 0) {
		if (subjectEN.length > 0) {
			if (subjectFT.length > 0) {
				if (contentZH.length > 0) {
					if (contentEN.length > 0) {
						if (contentFT.length > 0) {
							addnewLetter(addressee, subject, subjectEN,
									subjectFT, contentZH, contentEN, contentFT);
						} else {
							$.messager.popup("请输入繁体“正文”");
						}
					} else {
						$.messager.popup("Please Enter English“Text”");
					}
				} else {
					$.messager.popup("请输入简体“正文”");
				}
			} else {
				$.messager.popup("请输入繁体“主題”");
			}
		} else {
			$.messager.popup("Please Enter English“Subject”");
		}
	} else {
		$.messager.popup("请输入简体“主题”");
	}
}

// 添加站内信
function addnewLetter(addressee, subject, subjectEN, subjectFT, contentZH,
		contentEN, contentFT) {
	var $btn = $('.submitletter').button('loading');
	if (addressee && addressee.length > 0) {
		var message = {
			subject : subject,
			content : contentZH,
			subjectEN : subjectEN,
			contentEN : contentEN,
			subjectFT : subjectFT,
			contentFT : contentFT,
			type : 2,
			addressee : addressee
		};
		// 不全发
		$.ajax({
			url : "addnewLetter.do",
			type : "post",
			dataType : "json",
			data : {
				'message' : JSON.stringify(message)
			},
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 7) {
					$.messager.popup("请输入有效账号");
				} else if (data.statusCode == 8) {
					$.messager.popup("账号之间请用“,”隔开");
				} else {
					$.messager.popup("发送成功");
				}
				$btn.button('reset');
			}
		});
	} else {
		var message = {
			subject : subject,
			content : contentZH,
			subjectEN : subjectEN,
			contentEN : contentEN,
			subjectFT : subjectFT,
			contentFT : contentFT,
			type : 1
		};
		// 全发
		$.ajax({
			url : "addnewLetter.do",
			type : "post",
			dataType : "json",
			data : {
				'message' : JSON.stringify(message)
			},
			success : function(data) {
				if (data.statusCode == 504) {
					$.messager.popup("系统错误，错误代码504。");
				} else if (data.statusCode == 7) {
					$.messager.popup("请输入有效账号");
				} else if (data.statusCode == 8) {
					$.messager.popup("账号之间请用“,”隔开");
				} else {
					$.messager.popup("发送成功");
				}
				$btn.button('reset');
			}
		});
	}
}

// 发送邮件
function submitemail() {
	// 1全部收件人  2部分收件人
	var type = $('#all_zone').css('display') == 'none' ? 2 : 1;
	// 收件人
	var email = $('#inputaddresses').val();
	if (type == 2 && email.length == 0) {
		if ($('.bootstrap-tagsinput').find('input').val().length == 0) {
			return $.messager.popup("收件人不能为空");
		} else {
			email = $('.bootstrap-tagsinput').find('input').val();
		}
	}
	var subject = $('#inputsubjectEmail').val()
	if(!subject) {
		return $.messager.popup("邮件主题不能为空");
	}
	var contentEmail = $($('#editorEmail')[0].lastElementChild)[0].innerHTML;
	if ($($('#editorEmail')[0].lastElementChild).find('textarea').length > 0) {
		contentEmail = $($('#editorEmail')[0].lastElementChild).find('textarea').val();
	}
	if(!contentEmail) {
		return $.messager.popup("邮件正文不能为空");
	}
	var $btn = $('.submitemail').button('loading');
//	var message = {
//			addressee : email,
//			subject : subject,
//			content : contentEmail,
//			type : type
//		};
		// 全发
		$.ajax({
			url : "sendEmail.do",
			type : "post",
			dataType : "json",
			data : {
				'addressee' : email,
				'subject' : subject,
				'content' : contentEmail,
				'type' : type
			},
			success : function(data) {
				if (data.statusCode == 401) {
					$.messager.popup("参数错误");
				} else if (data.statusCode == 7) {
					$.messager.popup("请输入有效账号");
				} else if (data.statusCode == 10) {
					$.messager.popup("邮箱系统异常");
				} else {
					$.messager.popup("发送成功");
				}
				$btn.button('reset');
			}
		});
	
}

// 切换标签页
function toggleTab(e) {
	// 获取已激活的标签页的名称
	var activeTab = $(e.target).text();
	if (activeTab == "查看站内信") {
		initShowLetter();
	} else if (activeTab == "发送站内信") {
		$('#editorZH').editable({inlineMode: false, alwaysBlank: true,height:'300px'});
		$('#editorEN').editable({inlineMode: false, alwaysBlank: true,height:'300px'});
		$('#editorFT').editable({inlineMode: false, alwaysBlank: true,height:'300px'});
//		initToolbarBootstrapBindings();
//		$('#editorZH').wysiwyg({
//			fileUploadError : showErrorAlert
//		});
//		$('#editorEN').wysiwyg({
//			fileUploadError : showErrorAlert
//		});
//		$('#editorFT').wysiwyg({
//			fileUploadError : showErrorAlert
//		});
	} else if (activeTab == "发送邮件") {
		$('#inputaddresses').tagsinput({
			itemValue : 'value',
			itemText : 'text',
		});
//		initToolbarBootstrapBindings();
//		$('#editorEmail').wysiwyg({
//			fileUploadError : showErrorAlert
//		});
		$('#editorEmail').editable({inlineMode: false, alwaysBlank: true,height:'300px'});
		queryAllCompany();
	}
}

// 查询所有公司
function queryAllCompany() {
	$.ajax({
		url : "queryAllCompany.do",
		type : "post",
		dataType : "json",
		success : function(data) {
			var respData = data.content;
			setCompanyList(respData);
		}
	});
}

// 设置公司数据
function setCompanyList(respData) {
	var lista = [];
	$.each(respData, function(i, v) {
		lista.push('<a title=' + v.regEmail
				+ ' href="javascript:void(0)" class="list-group-item">'
				+ v.companyName + '</a> ');
	});
	$('.contact_list').html(lista.join(""));
	$('.contact_list a').unbind('click');
	$('.contact_list a').click(function() {
		$('.contact_list a').removeClass('active');
		$(this).addClass('active');
		var regEmail = $(this)[0].title;
		var companyName = $(this)[0].text;
		$('#inputaddresses').tagsinput('add', {
			"value" : regEmail,
			"text" : companyName + '<' + regEmail + '>'
		});
	});
	// 查询
	$('#searchCompany').on(
			'keyup',
			function() {
				clearTimeout();
				var keyword = $.trim(this.value)
				setTimeout(function() {
					var listcompany = $('.contact_list a');
					$.each(respData, function(i) {
						var isTarget = this.companyName.indexOf(keyword) > -1
								|| this.regEmail.indexOf(keyword) > -1
						if (isTarget) {
							listcompany.eq(i).show()
						} else {
							listcompany.eq(i).hide()
						}
					})
				}, 300)
			})
}

// 初始化文本编辑器
//function initToolbarBootstrapBindings() {
//	var fonts = [ 'Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
//			'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact',
//			'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
//			'Times New Roman', 'Verdana' ], fontTarget = $('[title=字体]')
//			.siblings('.dropdown-menu');
//	$.each(fonts, function(idx, fontName) {
//		fontTarget.append($('<li><a data-edit="fontName ' + fontName
//				+ '" style="font-family:\'' + fontName + '\'">' + fontName
//				+ '</a></li>'));
//	});
//	$('a[title]').tooltip({
//		container : 'body'
//	});
//	$('.dropdown-menu input').click(function() {
//		return false;
//	}).change(
//			function() {
//				$(this).parent('.dropdown-menu').siblings('.dropdown-toggle')
//						.dropdown('toggle');
//			}).keydown('esc', function() {
//		this.value = '';
//		$(this).change();
//	});
//
//	$('[data-role=magic-overlay]').each(
//			function() {
//				var overlay = $(this), target = $(overlay.data('target'));
//				overlay.css('opacity', 0).css('position', 'absolute').offset(
//						target.offset()).width(target.outerWidth()).height(
//						target.outerHeight());
//			});
//	if ("onwebkitspeechchange" in document.createElement("input")) {
//		var editorOffset = $('#editor').offset();
//		$('#voiceBtn').css('position', 'absolute').offset({
//			top : editorOffset.top,
//			left : editorOffset.left + $('#editor').innerWidth() - 35
//		});
//	} else {
//		$('#voiceBtn').hide();
//	}
//};
//function showErrorAlert(reason, detail) {
//	var msg = '';
//	if (reason === 'unsupported-file-type') {
//		msg = "Unsupported format " + detail;
//	} else {
//		console.log("error uploading file", reason, detail);
//	}
//	$(
//			'<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'
//					+ '<strong>File upload error</strong> ' + msg + ' </div>')
//			.prependTo('#alerts');
//};