// var rebateTotalCount;
// var rebateTotalCounts;
// function time() {
// 	var d = new Date();
// 	// d = +d + 1000*60*60*24;
// 	// d = new Date(d);
// 	var createTime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-"
// 			+ d.getDate();
// 	WdatePicker({
// 				minDate : createTime
// 			});
// }
// require([
// 	'../assets/js/vendor/jquery.min',
// 	'../assets/js/vendor/lobibox.min',
// 	'../assets/js/page',
// 	'../assets/js/vendor/jquery.pnotify',
// 	'../assets/js/vendor/jquery.validate.min',
// 	'../assets/js/vendor/bootstrap3-typeahead'
// 	],
// 	function($, Lobibox) {
// 			var init = function init() {
// 				// 查询优惠券类型
// 				getTicketTypeList(0);
// 				TypeList1();

// 			};
// 			$(".rebate-tab2,.close").click(function() {
// 				$(".type,#table1,#rebatepage,#onSearchRetate,.num")
// 						.addClass("hiddens");
// 				$(".rebate,#table2,#rebatepages,#onSearchFormss,.nums")
// 						.removeClass("hiddens");
// 				$("#createTime,#updateTime").addClass("input-middle");
// 				$("#createTime,#updateTime").removeClass("day-middle");
// 				$("#active2").addClass("active");
// 				$("#active1").removeClass("active");
// 				$(".rebateDetailList").empty();
// 				getTicketDetail(0);
// 				TypeList2();
// 				var startTime = $("#dSTime").val();
// 				var endTime = $("#dETime").val();
// 				if (startTime > endTime) {
// 					$(".rebatetimes").removeClass("hiddens");
// 				} else {
// 					$(".rebatetimes").addClass("hiddens");
// 				}
// 				var startTimes = $("#inSTime").val();
// 				var endTimes = $("#inETime").val();
// 				if (startTimes > endTimes) {
// 					$(".rebatetime").removeClass("hiddens");
// 				} else {
// 					$(".rebatetime").addClass("hiddens");
// 				}
// 			});
// 			$(".rebate-tab1").click(function() {
// 				$(".rebate,#table2,#rebatepages,#onSearchFormss,.nums,.rebatetimes,.rebatetime")
// 						.addClass("hiddens");
// 				$(".type,#table1,#rebatepage,#onSearchRetate,.num")
// 						.removeClass("hiddens");
// 				$("#createTime,#updateTime").removeClass("input-middle");
// 				$("#createTime,#updateTime").addClass("day-middle");
// 				$("#active1").addClass("active");
// 				$("#active2").removeClass("active");
// 				$(".rebateList").empty();
// 				getTicketTypeList(0);
// 				TypeList1();
// 			});
// 			$("#addRebate").click(function() {
// 						$("#dialogClass")
// 								.attr("class", "modal-dialog modal-sm");
// 						$('.modal-title').html("新增种类");
// 						$('#myModal').modal({
// 									backdrop : 'static',
// 									keyboard : false
// 								});
// 						$('#myModal input').val('');
// 					});
// 			$("#addDispense").click(function() {
// 						$("#dialogClass")
// 								.attr("class", "modal-dialog modal-sm");
// 						$('.modal-title').html("分发优惠券");
// 						$('#myModalss').modal({
// 									backdrop : 'static',
// 									keyboard : false
// 								});
// 						TypeList3();
// 						getUserGroup();
// 					});
// 			$("#addDispensePer").click(function() {
// 						$("#dialogClass")
// 								.attr("class", "modal-dialog modal-sm");
// 						$('.modal-title').html("分发优惠券");
// 						$('#myModalsPer').modal({
// 									backdrop : 'static',
// 									keyboard : false
// 								});
// 						$('#myModalsPer input').val('');
// 						$('#myModalsPer textarea').val('');
// 						TypeListPer();

// 					});
// 			// 查询优惠券类型
// 			function getTicketTypeList(page) {
// 				var typeName = $("#typeName").val();
// 				var volume = $("#volume").val();

// 				var size = 10;
// 				var arr = [["typeName", typeName],
// 						["volume", $("#volume").val()]];
// 				var urls = getUrl(arr);
// 				var url = '/APP-admin/ticket/getTicketTypeList?page='
// 						+ page + '&size=' + size + "&" + urls + '&'
// 						+ Math.random();
// 				url = encodeURI(encodeURI(url));
// 				var check = onSearchFormValidate().form();
// 				if (check) {
// 					$(".rebateList").empty();
// 					$.ajax({
// 								type : "GET",
// 								url : url,
// 								contentType : "application/json;charset=UTF-8",
// 								dataType : "json",
// 								async : false,
// 								timeout : 8000,
// 								success : function(msg) {

// 									RebateList(msg);
// 									rebateTotalCount = msg.data.totalCount;
// 									var total = (rebateTotalCount / 10);
// 									if (total % 1 !== 0) {
// 										total = parseInt(total) + 1;
// 									}
// 									$("#rebatepage").createPage({
// 												total : total,
// 												page : (page + 1),
// 												callback : function(page) {
// 													$(".rebateList").empty();
// 													getTicketTypeList(page - 1);
// 												}
// 											});
// 								}
// 							});
// 				}
// 			}
// 			$("#onSearchRebate").click(function() {

// 						var check = onSearchFormValidate().form();

// 						getTicketTypeList(0);

// 					});
// 			function RebateList(msg) {
// 				var list = msg.data.list;
// 				var li_html = "";
// 				for (var i = 0; i < list.length; i++) {
// 					var typeName = list[i].typeName;
// 					var volume = list[i].volume;
// 					var createTime = list[i].createTime;
// 					var unixTimestamp = new Date(createTime);
// 					unixTimestamp = unixTimestamp.toLocaleDateString()
// 							.split('/');
// 					createTime = unixTimestamp[0] + "-" + unixTimestamp[1]
// 							+ "-" + unixTimestamp[2];
// 					li_html += "<tr>" + "<td >" + typeName + "</td>" + "<td>"
// 							+ volume + "</td>" + "<td>" + createTime + "</td>"
// 							/*
// 							 * +"<td>" +"<button type='button' class='btn
// 							 * btn-sm btn-danger btn-beautify '>" +"<i
// 							 * class='ace-icon fa fa-plus'></i>" +" 删除" +"</button>" +"
// 							 * </td>"
// 							 */
// 							+ "</tr>";
// 				}
// 				$(".rebateList").append(li_html);
// 			}
// 			// 
// 			function addTicketType() {
// 				var typeName = $("#typeNames").val();
// 				var volume = $("#volumes").val();
// 				var indate = 1;
// 				typeName = $.trim(typeName);
// 				if (typeName === "") {

// 					$(".type_s").removeClass('hiddens');
// 				} else {
// 					typeName = encodeURI(encodeURI(typeName));
// 					$(".type_s").addClass('hiddens');
// 				}
// 				if (volume === "") {
// 					$(".volume").removeClass('hiddens');
// 				} else if (volume === 0) {
// 					$(".volume").addClass('hiddens');
// 					$(".volume_s").removeClass('hiddens');
// 					return;
// 				} else {
// 					$(".volume,.volume_s").addClass('hiddens');
// 				}
// 				var check = validateAddRebateForm().form();
// 				if (check || typeName !== "") {

// 					$.ajax({
// 								type : "POST",
// 								url : '/APP-admin/ticket/addTicketType?typeName='
// 										+ typeName
// 										+ '&volume='
// 										+ volume
// 										+ '&indate=' + indate,
// 								contentType : "application/json;charset=UTF-8",
// 								dataType : "json",
// 								async : false,
// 								timeout : 8000,
// 								success : function(msg) {
// 									if (msg.msg.indexOf('优惠券种类已存在') > -1) {
// 										$(".types_s").removeClass('hiddens');
// 										return;
// 									} else {
// 										$(".types_s").addClass('hiddens');
// 									}
// 									$('#myModal input').val('');
// 									$('#myModal').modal('hide');
// 									$.pnotify({
// 												text : '新增优惠券成功',
// 												type : 'success'
// 											});
// 									getTicketTypeList(0);
// 								}
// 							});
// 				}
// 			}
// 			$("#addTicketType").click(function() {
// 				addTicketType();
// 				TypeList1();
// 				$("#rebatepage").removeClass("hiddens");
// 					/*
// 					 * $(".rebateList").empty(); getTicketTypeList(0);
// 					 * TypeList1();
// 					 */
// 				});
// 			// 查询优惠券详情
// 			function getTicketDetail(page) {
// 				var typeId = $("#typeName2").val();
// 				var userName = $("#userName").val();
// 				var isUsed = $("#isUsed").val();
// 				var volume = $("#volumeid").val();
// 				var operatorName = $("#operatorName").val();
// 				var isExpired = $("#isExpired").val();
// 				var dSTime = $("#dSTime").val();
// 				var dETime = $("#dETime").val();
// 				var inSTime = $("#inSTime").val();
// 				var inETime = $("#inETime").val();

// 				var size = 10;
// 				var arr = [["typeId", $("#typeName2").val()],
// 						["userName", $("#userName").val()],
// 						["isUsed", $("#isUsed").val()],
// 						["volume", $("#volumeid").val()],
// 						["operatorName", $("#operatorName").val()],
// 						["isExpired", $("#isExpired").val()],
// 						["dSTime", $("#dSTime").val()],
// 						["dETime", $("#dETime").val()],
// 						["inSTime", $("#inSTime").val()],
// 						["inETime", $("#inETime").val()]];
// 				var urls = getUrl(arr);
// 				var url = '/APP-admin/ticket/getTicketDetail?page=' + page
// 						+ '&size=' + size + "&" + urls + '&' + Math.random();
// 				var check = onSearchFormValidate().form();
// 				if (check) {
// 					$(".rebateDetailList").empty();
// 					$.ajax({
// 								type : "GET",
// 								url : url,
// 								contentType : "application/json;charset=UTF-8",
// 								dataType : "json",
// 								async : false,
// 								timeout : 8000,
// 								success : function(msg) {
// 									RebateDetailList(msg);
// 									rebateTotalCounts = msg.data.totalCount;
// 									var total = (rebateTotalCounts / 10);
// 									if (total % 1 !== 0) {
// 										total = parseInt(total) + 1;
// 									}
// 									$("#rebatepages").createPage({
// 												total : total,
// 												page : (page + 1),
// 												callback : function(page) {
// 													$(".rebateDetailList")
// 															.empty();
// 													getTicketDetail(page - 1);
// 												}
// 											});
// 								}
// 							});
// 				}
// 			}
// 			function RebateDetailList(msg) {
// 				var list = msg.data.list;
// 				var li_html = "";
// 				for (var i = 0; i < list.length; i++) {
// 					var typeId = list[i].typeId;
// 					var createTime = list[i].createTime;
// 					var isUsed = list[i].used;
// 					var userGroupId = list[i].userGroupId;
// 					var operatorId = list[i].operatorId;
// 					var typeName = list[i].typeName;
// 					var volume = list[i].volume;
// 					var indate = list[i].indate;
// 					var userName = list[i].userName;
// 					var isExpired = list[i].isExpired;
// 					var groupName = list[i].groupName;
// 					var operatorName = list[i].operatorName;
// 					var unixTimestamp = new Date(createTime);
// 					unixTimestamp = unixTimestamp.toLocaleDateString()
// 							.split('/');
// 					createTime = unixTimestamp[0] + "-" + unixTimestamp[1]
// 							+ "-" + unixTimestamp[2];
// 					var unixTimestamps = new Date(indate);
// 					unixTimestamps = unixTimestamps.toLocaleDateString()
// 							.split('/');
// 					indate = unixTimestamps[0] + "-" + unixTimestamps[1] + "-"
// 							+ unixTimestamps[2];
// 					if (isUsed === 0) {
// 						isUsed = '未使用';
// 					} else {
// 						isUsed = '已使用';
// 					}
// 					if (isExpired === 0) {
// 						isExpired = '未过期';
// 					} else {
// 						isExpired = '已过期';
// 					}
// 					li_html += "<tr>" + "<td >" + typeName + "</td>" + "<td>"
// 							+ volume + "</td>" + "<td>" + indate + "</td>"
// 							+ "<td>" + userName + "</td>" + "<td>" + isUsed
// 							+ "</td>" + "<td>" + isExpired + "</td>" + "<td>"
// 							+ groupName + "</td>" + "<td>" + operatorName
// 							+ "</td>" + "<td>" + createTime + "</td>" + "</tr>";
// 				}
// 				$(".rebateDetailList").append(li_html);
// 			}
// 			$("#onSearchDispense").click(function() {
// 						checkTime();
// 						$(".rebateDetailList").empty();
// 						getTicketDetail(0);
// 					});
// 			function deliverTicketPer() {
// 				var rebateUser = $('#rebateuser').val();
// 				var user = rebateUser.split(',');
// 				var typeId = $("#typePerId").val();
// 				var count = $("#countsper").val();
// 				var operatorId = $("#user-id").val();
// 				var indate = $("#indateper").val() + ' 23:59:59';
// 				var check = validateDeliverPerForm().form();
// 				if (check) {
// 					$.ajax({
// 						type : "POST",
// 						url : '/APP-admin/ticket/deliverTicketbyusernames?username='
// 								+ user
// 								+ '&typeId='
// 								+ typeId
// 								+ '&count='
// 								+ count
// 								+ '&operatorId='
// 								+ operatorId
// 								+ '&indate=' + indate,
// 						contentType : "application/json;charset=UTF-8",
// 						dataType : "json",
// 						async : false,
// 						timeout : 8000,
// 						success : function(msg) {
// 							$.pnotify.defaults.styling = "bootstrap3";

// 							if (msg.success) {
// 								$(".rebateDetailList").empty();
// 								getTicketDetail(0);
// 								$('#myModalsPer').modal('hide');

// 								$.pnotify({
// 											text : '分发优惠券成功',
// 											type : 'success'
// 										});
// 							} else {
// 								$('#myModalsPer').modal('hide');
// 								$.pnotify({
// 											text : '分发优惠券失败',
// 											type : 'error'
// 										});
// 							}

// 						}
// 					});
// 				}
// 			}
// 			$("#resendPer").click(function() {
// 						deliverTicketPer();
// 					});
// 			// 分发优惠券
// 			function deliverTicket() {
// 				var groupId = $("#groupId").val();
// 				var typeId = $("#typeId").val();
// 				var count = $("#counts").val();
// 				var operatorId = $("#user-id").val();
// 				var indate = $("#indate").val() + ' 23:59:59';
// 				if (groupId === "") {
// 					$(".groupd").removeClass('hiddens');
// 				} else {
// 					$(".groupd").addClass('hiddens');
// 				}
// 				if (typeId === "") {
// 					$(".typed").removeClass('hiddens');
// 				} else {
// 					$(".typed").addClass('hiddens');
// 				}
// 				if (count === "") {
// 					$(".count").removeClass('hiddens');
// 				} else if (count === 0) {
// 					$(".count").addClass('hiddens');
// 					$(".count_s").removeClass('hiddens');
// 					return;
// 				} else {
// 					$(".count,.count_s").addClass('hiddens');
// 				}
// 				if (indate === "") {
// 					$(".indates").removeClass('hiddens');
// 				} else {
// 					$(".indates").addClass('hiddens');
// 				}
// 				var check = validateDeliverForm().form();
// 				if (groupId === "" || typeId === "" || count === ""
// 						|| indate === "" || (!check)) {
// 					return;
// 				} else {
// 					$.ajax({
// 								type : "POST",
// 								url : '/APP-admin/ticket/deliverTicket?groupId='
// 										+ groupId
// 										+ '&typeId='
// 										+ typeId
// 										+ '&count='
// 										+ count
// 										+ '&operatorId='
// 										+ operatorId + '&indate=' + indate,
// 								contentType : "application/json;charset=UTF-8",
// 								dataType : "json",
// 								async : false,
// 								timeout : 8000,
// 								success : function(msg) {
// 									$(".rebateDetailList").empty();
// 									getTicketDetail(0);
// 									$('#myModalss').modal('hide');
// 									$.pnotify({
// 												text : '分发优惠券成功',
// 												type : 'success'
// 											});
// 								}
// 							});
// 				}
// 			}
// 			// 分发
// 			$("#resend").click(function() {
// 						deliverTicket();
// 					});
// 			// 获取用户组
// 			function getUserGroup() {
// 				var page = 0;
// 				var size = 1000;
// 				var url = '/APP-admin/user/getUserGroup?page=' + page
// 						+ '&size=' + size;
// 				$.ajax({
// 							type : "GET",
// 							url : url,
// 							contentType : "application/json;charset=UTF-8",
// 							dataType : "json",
// 							async : false,
// 							timeout : 8000,
// 							success : function(msg) {
// 								var list = msg.data.list;
// 								var li_html = "<option value=''>--请选择--</option>";
// 								for (var i = 0; i < list.length; i++) {
// 									var groupId = list[i].id;
// 									var groupName = list[i].name;
// 									var status = list[i].status;
// 									var hiddenClass;
// 									if (status == 1) {
// 										li_html += "<option value='" + groupId
// 												+ "'>" + groupName
// 												+ "</option>";
// 									}
// 								}
// 								$("select#groupId").html(li_html);
// 							}
// 						});
// 			}
// 			// 查询优惠券类型
// 			function TypeList1() {
// 				var page = 0;
// 				var size = 100;
// 				var url = '/APP-admin/ticket/getTicketTypeList?page='
// 						+ page + '&size=' + size + "&" + Math.random();
// 				$.ajax({
// 							type : "GET",
// 							url : url,
// 							contentType : "application/json;charset=UTF-8",
// 							dataType : "json",
// 							async : false,
// 							timeout : 8000,
// 							success : function(msg) {
// 								var list = msg.data.list;
// 								var li_html = "<option value=''>--请选择--</option>";
// 								for (var i = 0; i < list.length; i++) {
// 									var typeId = list[i].id;
// 									var typeName = list[i].typeName;
// 									li_html += "<option value='" + typeName
// 											+ "'>" + typeName + "</option>";
// 								}
// 								$("#onSearchForm #typeName").html(li_html);
// 							}
// 						});
// 			}
// 			function TypeList2() {
// 				var page = 0;
// 				var size = 100;
// 				var url = '/APP-admin/ticket/getTicketTypeList?page='
// 						+ page + '&size=' + size + '&' + Math.random();
// 				$.ajax({
// 							type : "GET",
// 							url : url,
// 							contentType : "application/json;charset=UTF-8",
// 							dataType : "json",
// 							async : false,
// 							timeout : 8000,
// 							success : function(msg) {
// 								var list = msg.data.list;
// 								var li_html = "<option value=''>--请选择--</option>";
// 								for (var i = 0; i < list.length; i++) {
// 									var typeId = list[i].id;
// 									var typeName = list[i].typeName;
// 									li_html += "<option value='" + typeId
// 											+ "'>" + typeName + "</option>";
// 								}
// 								$("#onSearchForm #typeName2").html(li_html);
// 							}
// 						});
// 			}
// 			function TypeList3() {
// 				var page = 0;
// 				var size = 100;
// 				var url = '/APP-admin/ticket/getTicketTypeList?page='
// 						+ page + '&size=' + size + '&' + Math.random();
// 				$.ajax({
// 							type : "GET",
// 							url : url,
// 							contentType : "application/json;charset=UTF-8",
// 							dataType : "json",
// 							async : false,
// 							timeout : 8000,
// 							success : function(msg) {
// 								var list = msg.data.list;
// 								var li_html = "<option value=''>--请选择--</option>";
// 								for (var i = 0; i < list.length; i++) {
// 									var typeId = list[i].id;
// 									var typeName = list[i].typeName;
// 									li_html += "<option value='" + typeId
// 											+ "'>" + typeName + "</option>";
// 								}
// 								$("#onReatForm #typeId").html(li_html);
// 							}
// 						});
// 			}
// 			function TypeListPer() {
// 				var page = 0;
// 				var size = 100;
// 				var url = '/APP-admin/ticket/getTicketTypeList?page='
// 						+ page + '&size=' + size + '&' + Math.random();
// 				$.ajax({
// 							type : "GET",
// 							url : url,
// 							contentType : "application/json;charset=UTF-8",
// 							dataType : "json",
// 							async : false,
// 							timeout : 8000,
// 							success : function(msg) {
// 								var list = msg.data.list;
// 								var li_html = "<option value=''>--请选择--</option>";
// 								for (var i = 0; i < list.length; i++) {
// 									var typeId = list[i].id;
// 									var typeName = list[i].typeName;
// 									li_html += "<option value='" + typeId
// 											+ "'>" + typeName + "</option>";
// 								}
// 								$("#onReatPerForm #typePerId").html(li_html);
// 							}
// 						});
// 			}
// 			init();
// 			function getUrl(arrays) {
// 				var url = "";
// 				for (var arraysLength = 0; arraysLength < arrays.length; arraysLength++) {
// 					var arr = arrays[arraysLength];
// 					if (arr[1]) {
// 						url += arr[0] + "=" + arr[1] + "&";
// 					}
// 				}
// 				return url.substring(0, url.length - 1);
// 			}
// 			$('#onSearchForm #volume').bind('keyup', function(e) {
// 						if (e.keyCode == 13) {

// 							getTicketTypeList(0);

// 						}
// 					});
// 			$('#onSearchForm #volumeid').bind('keyup', function(e) {
// 						if (e.keyCode == 13) {

// 							getTicketDetail(0);

// 						}
// 					});
// 			$('#times_res input').bind('keyup', function(e) {
// 						if (e.keyCode == 13) {
// 							$(".rebateDetailList").empty();
// 							getTicketDetail(0);
// 							checkTime();
// 						}
// 					});
// 			$('#res input').bind('keyup', function(e) {
// 						if (e.keyCode == 13) {
// 							$(".rebateDetailList").empty();
// 							getTicketDetail(0);

// 						}
// 					});
// 			function checkTime() {
// 				var startTime = $("#dSTime").val();
// 				var endTime = $("#dETime").val();
// 				if (startTime > endTime) {
// 					$(".rebatetimes").removeClass("hiddens");
// 				} else {
// 					$(".rebatetimes").addClass("hiddens");
// 				}
// 				if (endTime === '' || startTime === '') {
// 					$(".rebatetimes").addClass("hiddens");
// 				}
// 				var startTimes = $("#inSTime").val();
// 				var endTimes = $("#inETime").val();
// 				if (startTimes > endTimes) {
// 					$(".rebatetime").removeClass("hiddens");
// 				} else {
// 					$(".rebatetime").addClass("hiddens");
// 				}
// 				if (endTimes === '' || startTimes === '') {
// 					$(".rebatetime").addClass("hiddens");
// 				}
// 			}
// 			$('#rebateper').typeahead({
// 				source : function(query, process) {
// 					var arr = [["userName", query], ["startTime", ''],
// 							["endTime", ''], ["recordType", ''],
// 							["operator", ''], ["loginTimes", '']];
// 					var urls = getUrl(arr);
// 					var url = '/APP-admin/user/getUserList?' + urls + '&'
// 							+ Math.random();
// 					$.ajax({
// 								url : url,
// 								type : 'GET',
// 								dataType : 'json',
// 								timeout : 8000,
// 								success : function(data) {
// 									var list = data.data.list;
// 									var users = [];
// 									if (list.length === 0) {
// 										users.push('');
// 										$('#rebateper').val('');
// 									}
// 									if (list.length === 1) {
// 										// $('#rebateper').val(list[0].userName);
// 									}
// 									for (var i = 0; i < list.length; i++) {
// 										users.push(list[i].userName);
// 									}
// 									return process(users);
// 								}
// 							})
// 				}
// 			})
// 			// 添加用户
// 			$('.btn-add-rebate-user').click(function() {
// 				var rebatePer = $('#rebateper').val();
// 				var rebateuser = $('#rebateuser').val();
// 				var userArray = rebateuser.split(',');
// 				var mobile = /^[\da-zA-Z]+$/;
// 				var isExist = false
// 				if ($.trim(rebatePer) !== '' && userArray.length < 5
// 						) {
// 					for (var i = 0; i < userArray.length; i++) {
// 						if (rebatePer === userArray[i]) {
// 							isExist = true;
// 							break;
// 						}
// 					}
// 					if (rebateuser === '') {
// 						$('#rebateuser').val(rebatePer);
// 					} else if (!isExist) {
// 						$('#rebateuser').val(rebateuser + ',' + rebatePer);
// 					} else {
// 						Lobibox.alert('error', {
// 									'msg' : '已添加，不需要再添加'
// 								});
// 					}
// 				} else if (userArray.length >= 5) {
// 					Lobibox.alert('error', {
// 								'msg' : '已经有5个用户，不能再添加'
// 							})
// 				}
// 				$('#rebateper').val('');

// 			});
// 			function onSearchFormValidate() {
// 				return $('#onSearchForm').validate({
// 							rules : {
// 								volume : {
// 									digits : true,
// 									min : 1
// 								}
// 							},
// 							messages : {
// 								volume : {
// 									digits : '请输入大于零的数字',
// 									min : '请输入大于零的数字'
// 								}
// 							}
// 						});

// 			}
// 			function validateAddRebateForm() {
// 				return $("#myModal #addRebate").validate({
// 							rules : {
// 								typeNames : {
// 									required : true
// 								},
// 								volumes : {
// 									digits : true,
// 									required : true,
// 									min : 1

// 								}

// 							},
// 							messages : {
// 								typeNames : {
// 									required : '请输入抵扣劵类型'
// 								},
// 								volumes : {
// 									digits : '请输入大于零的数字',
// 									required : '请输入大于零的数字',
// 									min : '请输入大于零的数字'

// 								}
// 							}
// 						});
// 			}
// 			function validateDeliverPerForm() {
// 				return $(" #deliverRebatePer").validate({
// 							rules : {
// 								rebateuser : {
// 									required : true
// 								},
// 								typePerId : {
// 									required : true
// 								},
// 								indateper : {
// 									required : true
// 								},
// 								countsper : {
// 									digits : true,
// 									required : true,
// 									min : 1

// 								}

// 							},
// 							messages : {
// 								rebateuser : {
// 									required : ' 用户不能为空'
// 								},
// 								typePerId : {
// 									required : '请选择类型'
// 								},
// 								indateper : {
// 									required : '请输入有效期'
// 								},
// 								countsper : {
// 									digits : '请输入大于零的数字',
// 									required : '请输入大于零的数字',
// 									min : '请输入大于零的数字'

// 								}
// 							}
// 						});
// 			}
// 			function validateDeliverForm() {
// 				return $("#myModalss #addRebate").validate({
// 							rules : {
// 								groupId : {
// 									required : true
// 								},
// 								typeId : {
// 									required : true
// 								},
// 								indate : {
// 									required : true
// 								},
// 								counts : {
// 									digits : true,
// 									required : true,
// 									min : 1

// 								}

// 							},
// 							messages : {
// 								groupId : {
// 									required : ' 请选择用户组'
// 								},
// 								typeId : {
// 									required : '请选择优惠券类型'
// 								},
// 								indate : {
// 									required : '请输入有效期'
// 								},
// 								counts : {
// 									digits : '请输入大于零的数字',
// 									required : '请输入大于零的数字',
// 									min : '请输入大于零的数字'

// 								}
// 							}
// 						});
// 			}

// 		});
