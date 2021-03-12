// require([
// 		'../assets/js/vendor/jquery.min',
// 		'../assets/js/vendor/lobibox.min',
// 		'../assets/js/page',
// 		'../assets/js/vendor/jquery.pnotify',
// 		'../assets/js/vendor/jquery.validate.min',
//         '../assets/js/vendor/bootstrap3-typeahead',
// 		// '../assets/js/vendor/polyfill.min.js',
// 		// '../assets/js/WdatePicker.js',
// 		// '../assets/js/skin/WdatePicker.css'
// 	],
// function($, Lobibox) {
// 	var codeTotalCount;
// 	var init = function init() {
// 		// 获取邀请码列表
// 		getInvitationCode(0);
// 	};
// 	$("#addCode").click(function() {
// 		$("#dialogClass")
// 				.attr("class", "modal-dialog modal-sm");
// 		$('.modal-title').html("分发邀请码");
// 		$('#myModalCode').modal({
// 					backdrop : 'static',
// 					keyboard : false
// 				});
// 		$('#myModalCode input').val('');
// 		$('#myModalCode .error').text('');
// 		getUserGroup();
// 	});
// 	$("#addCodePer").click(function() {
// 		$("#dialogClass")
// 				.attr("class", "modal-dialog modal-sm");
// 		$('.modal-title').html("分发邀请码");
// 		$('#myModalCodeByPer').modal({
// 					backdrop : 'static',
// 					keyboard : false
// 				});
// 		$('#myModalCodeByPer input').val('');
// 		$('#myModalCodeByPer textarea').val('');
// 		$('#myModalCodeByPer .error').text('');
// 	});
// 	// 获取邀请码列表
// 	function getInvitationCode(page) {
// 		var page = page;
// 		var size = 10;
// 		var arr = [
// 			["code.html", $("#code1 #codes").val()],
// 			["userName", $("#code1 #userName").val()],
// 			[
// 					"groupName",
// 					encodeURI(encodeURI($("#code2 #groupName")
// 							.val()))],
// 			["operatorName", $("#code2 #operatorName").val()],
// 			["startTime", $("#code1 #codestartTime").val()],
// 			["endTime", $("#code1 #codeendTime").val()]
// 		];
// 		var urls = getUrl(arr);
// 		var url = '/APP-admin/invitation/getInvitationCode?page='
// 				+ page + '&size=' + size + "&" + urls + '&'
// 				+ Math.random();
// 		$.ajax({
// 			type : "GET",
// 			url : url,
// 			contentType : "application/json;charset=UTF-8",
// 			dataType : "json",
// 			async : false,
// 			timeout : 8000,
// 			success : function(msg) {
// 				CodeList(msg);
// 				codeTotalCount = msg.data.totalCount;
// 				var total = (codeTotalCount / 10);
// 				if (total % 1 !== 0) {
// 					total = parseInt(total) + 1;
// 				}
// 				$("#codepage").createPage({
// 					total : total,
// 					page : (page + 1),
// 					callback : function(page) {
// 						$(".codeList").empty();
// 						getInvitationCode(page - 1);
// 					}
// 				});
// 			}
// 		});
// 	}
// 	function CodeList(msg) {
// 		var list = msg.data.list;
// 		var li_html = "";
// 		for (var i = 0; i < list.length; i++) {
// 			var id = list[i].id;
// 			var invitationCode = list[i].code;
// 			var userName = list[i].userName;
// 			var distributionTime = list[i].distributionTime;
// 			var groupName = list[i].groupName;
// 			var operatorName = list[i].operatorName;
// 			var useCount = list[i].useCount;
// 			var maxUserTimes = list[i].maxUserTimes;
// 			var unixTimestamp = new Date(distributionTime);
// 			unixTimestamp = unixTimestamp.toLocaleDateString()
// 					.split('/');
// 			distributionTime = unixTimestamp[0] + "-"
// 					+ unixTimestamp[1] + "-" + unixTimestamp[2];
// 			li_html += "<tr>" + "<td >" + id + "</td>" + "<td>"
// 					+ invitationCode + "</td>" + "<td>" + userName
// 					+ "</td>" + "<td>" + maxUserTimes + "</td>"
// 					+ "<td>" + useCount + "</td>" + "<td>"
// 					+ distributionTime + "</td>" + "<td>" + groupName
// 					+ "</td>" + "<td>" + operatorName + "</td>"
// 					+ "</tr>";
// 		}
// 		$(".codeList").append(li_html);
// 	}
// 	$("#onSearchCode").click(function() {
// 		checkTime();
// 		$(".codeList").empty();
// 		getInvitationCode(0);
// 	});
// 	// 个人发放邀请码
// 	function distributeInvitationCodeper() {
// 		var codeusers = $('#codeuser').val();
// 		var users = codeusers.split(',');
// 		var codemum = $('#codenumberper').val();
// 		var maxnumberper = $('#maxnumberper').val();
// 		var operatorId = $("#user-id").val();
// 		var url = '/APP-admin/invitation/distributeInvitationCodeByUsernames?';
// 		var urlusername = '';

// 		url = url + 'username=' + users + '&amount=' + codemum
// 				+ '&max=' + maxnumberper + '&operatorId=' + operatorId;
// 		var check = validateDeliverCodeFormByPer().form();
// 		if (check) {
// 			$.ajax({
// 				type : "POST",
// 				url : url,
// 				contentType : "application/json;charset=UTF-8",
// 				dataType : "json",
// 				async : false,
// 				timeout : 8000,
// 				success : function(msg) {
// 					if (msg.success) {

// 						$(".codeList").empty();
// 						getInvitationCode(0);
// 						$('#myModalCodeByPer').modal('hide');
// 						$.pnotify({
// 									text : '分发邀请码成功',
// 									type : 'success'
// 								});
// 					} else {
// 						$('#myModalCodeByPer').modal('hide');
// 						$.pnotify({
// 									text : '分发邀请码失败',
// 									type : 'success'
// 								});
// 					}
// 				}
// 			});
// 		}
// 	}
// 	// 分发邀请码
// 	function distributeInvitationCode() {
// 		var groupId = $("#codeGrounp").val();
// 		var amount = $("#codenumber").val();
// 		var max = $("#maxnumber").val();
// 		var operatorId = $("#user-id").val();
// 		if (groupId === "") {
// 			$(".group").removeClass('hiddens');
// 		} else {
// 			$(".group").addClass('hiddens');
// 		}
// 		if (amount === "") {
// 			$(".amount").removeClass('hiddens');
// 			$(".mamounax").addClass('hiddens');
// 		} else if (amount === 0) {
// 			$(".amount").addClass('hiddens');
// 			$(".mamounax").removeClass('hiddens');

// 		} else {
// 			$(".amount,.mamounax").addClass('hiddens');
// 		}
// 		if (max === "") {
// 			$(".max").removeClass('hiddens');
// 			$(".max_s").addClass('hiddens');
// 		} else if (max === 0) {
// 			$(".max").addClass('hiddens');
// 			$(".max_s").removeClass('hiddens');

// 		} else {
// 			$(".max,.max_s").addClass('hiddens');
// 		}
// 		var check = validateDeliverCodeForm().form();
// 		if ((!check) || groupId === "" || amount === "" || max === "") {
// 			return;
// 		} else {
// 			var url = '/APP-admin/invitation/distributeInvitationCode?groupId='
// 				+ groupId
// 				+ '&amount='
// 				+ amount
// 				+ '&operatorId='
// 				+ operatorId + '&max=' + max;
// 			$.ajax({
// 				type : "POST",
// 				url : url,
// 				contentType : "application/json;charset=UTF-8",
// 				dataType : "json",
// 				async : false,
// 				timeout : 8000,
// 				success : function(msg) {
// 					$(".codeList").empty();
// 					getInvitationCode(0);
// 					$('#myModalCodeByPer').modal('hide');
// 					$.pnotify({
// 						text : '分发邀请码成功',
// 						type : 'success'
// 					});
// 				}
// 			});
// 		}
// 	}
// 	$("#resendCode").click(function() {distributeInvitationCode();});
// 	$('#resendCodeByPer').click(function() {distributeInvitationCodeper();});
// 	// 获取用户组
// 	function getUserGroup() {
// 		var page = 0;
// 		var size = 1000;
// 		var url = '/APP-admin/user/getUserGroup?page=' + page
// 				+ '&size=' + size;
// 		$.ajax({
// 			type : "GET",
// 			url : url,
// 			contentType : "application/json;charset=UTF-8",
// 			dataType : "json",
// 			async : false,
// 			timeout : 8000,
// 			success : function(msg) {
// 				var list = msg.data.list;
// 				var li_html = "<option value=''>--请选择--</option>";
// 				for (var i = 0; i < list.length; i++) {
// 					var groupId = list[i].id;
// 					var groupName = list[i].name;
// 					var status = list[i].status;
// 					var hiddenClass;
// 					if (status == 1) {
// 						/* hiddenClass='hiddens'; */
// 						li_html += "<option value='" + groupId
// 								+ "'>" + groupName
// 								+ "</option>";
// 					}
// 				}
// 				$("select#codeGrounp").html(li_html);
// 			}
// 		});
// 	}
// 	init();
// 	function getUrl(arrays) {
// 		var url = "";
// 		for (var arraysLength = 0; arraysLength < arrays.length; arraysLength++) {
// 			var arr = arrays[arraysLength];
// 			if (arr[1]) {
// 				url += arr[0] + "=" + arr[1] + "&";
// 			}
// 		}
// 		return url.substring(0, url.length - 1);
// 	}
// 	$('#code1 input,#code2 input').bind('keyup', function(e) {
// 		if (e.keyCode == 13) {
// 			checkTime();
// 			$(".codeList").empty();
// 			getInvitationCode(0);
// 			console.log(11111);
// 		}
// 	});
// 	function checkTime() {
// 		var startTime = $("#codestartTime").val();
// 		var endTime = $("#codeendTime").val();
// 		if (startTime > endTime) {
// 			$(".codetime").removeClass("hiddens");
// 		} else {
// 			$(".codetime").addClass("hiddens");
// 		}
// 		if (endTime === '' || startTime === '') {
// 			$(".codetime").addClass("hiddens");
// 		}
// 	}
// 	function validateDeliverCodeForm() {
// 		return $("#deliverCodeForm").validate({
// 			rules : {
// 				statusStr : {
// 					required : true
// 				},

// 				codenumber : {
// 					digits : true,
// 					required : true,
// 					min : 1

// 				},
// 				maxnumber : {
// 					digits : true,
// 					required : true,
// 					min : 1

// 				}

// 			},
// 			messages : {
// 				statusStr : {
// 					required : ' 请选择用户组'
// 				},

// 				codenumber : {
// 					digits : '请输入大于零的数字',
// 					required : '请输入大于零的数字',
// 					min : '请输入大于零的数字'

// 				},
// 				maxnumber : {
// 					digits : '请输入大于零的数字',
// 					required : '请输入大于零的数字',
// 					min : '请输入大于零的数字'

// 				}
// 			}
// 		});
// 	}
// 	function validateDeliverCodeFormByPer() {
// 		return $("#deliverCodeFormByPer").validate({
// 			rules : {
// 				codeuser : {
// 					required : true
// 				},

// 				codenumberper : {
// 					digits : true,
// 					required : true,
// 					min : 1

// 				},
// 				maxnumberper : {
// 					digits : true,
// 					required : true,
// 					min : 1

// 				}

// 			},
// 			messages : {
// 				codeuser : {
// 					required : ' 请选择用户'
// 				},

// 				codenumberper : {
// 					digits : '请输入大于零的数字',
// 					required : '请输入大于零的数字',
// 					min : '请输入大于零的数字'

// 				},
// 				maxnumberper : {
// 					digits : '请输入大于零的数字',
// 					required : '请输入大于零的数字',
// 					min : '请输入大于零的数字'

// 				}
// 			}
// 		});
// 	}
// 	// 自动补全用户名
// 	$('#usernameper').typeahead({
// 		source : function(query, process) {
// 			var arr = [["userName", query], ["startTime", ''],
// 					["endTime", ''], ["recordType", ''],
// 					["operator", ''], ["loginTimes", '']];
// 			var urls = getUrl(arr);
// 			var url = '/APP-admin/user/getUserList?' + urls + '&'
// 					+ Math.random();
// 			$.ajax({
// 				type : "GET",
// 				url : url,
// 				contentType : "application/json;charset=UTF-8",
// 				dataType : "json",
// 				async : false,
// 				timeout : 8000,
// 				success : function(data) {
// 					var list = data.data.list;
// 					var users = [];
// 					if (list.length === 0) {
// 						users.push('');
// 						$('#usernameper').val('');
// 					}
// 					if (list.length === 1) {
// 						// $('#usernameper').val(list[0].userName);
// 					}
// 					for (var i = 0; i < list.length; i++) {
// 						users.push(list[i].userName);
// 					}
// 					return process(users);

// 				}
// 			});
// 		}
// 	});
// 	$('.btn-add-user').click(function() {
// 		var usernameper = $('#usernameper').val();
// 		var codeuser = $('#codeuser').val();
// 		var codeUsers = $('#codeuserlist li span').text();
// 		var $codeUserList = $('#codeuserlist');
// 		var userArray = codeuser.split(',');
// 		var mobile = /^[\da-zA-Z]+$/;
// 		var isExist = false
// 		// var li=$('<li>').appendTo( $codeUserList);
// 		// var span=$('<span>').text(usernameper).appendTo(li);
// 		// var
// 		// deleteButton=$('<button>').addClass('btn-delete-user').text('x').appendTo(li);

// 		if ($.trim(usernameper) !== '' && userArray.length < 5
// 				) {
// 			for (var i = 0; i < userArray.length; i++) {
// 				if (usernameper === userArray[i]) {
// 					isExist = true;
// 					break;
// 				}
// 			}
// 			if (codeuser === '') {
// 				$('#codeuser').val(usernameper);
// 			} else if (!isExist) {
// 				$('#codeuser').val(codeuser + ',' + usernameper);
// 			} else {
// 				Lobibox.alert('error', {
// 							'msg' : '已添加，不需要再添加'
// 						});
// 			}
// 		} else if (userArray.length >= 5) {
// 			Lobibox.alert('error', {
// 						'msg' : '已经有5个用户，不能再添加'
// 					})
// 		}
// 		$('#usernameper').val('');
// 	})
// });
