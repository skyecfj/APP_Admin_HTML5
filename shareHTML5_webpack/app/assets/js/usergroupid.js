var totalCount;
var totalCounts;
var ArrayList = [];
var allSelect = false;
var allGroupSelect;
var groupUserArray = [];
// require([
// 	'../assets/js/vendor/jquery.min',
// 	'../assets/js/vendor/lobibox.min',
// 	'../assets/js/page',
// 	'../assets/js/vendor/jquery.pnotify',
// 	'../assets/js/vendor/jquery.validate.min'
// 	],
// 	function($, Lobibox) {
	$(function() {
			var init = function init() {
				// 获取用户列表
				getUserList(0);
				var a = $("#page ul li.active a").html();
				//console.log(a);
			};
			function getUrl(arrays) {
				var url = "";
				for (var arraysLength = 0; arraysLength < arrays.length; arraysLength++) {
					var arr = arrays[arraysLength];
					if (arr[1]) {
						url += arr[0] + "=" + arr[1] + "&";
					}
				}
				return url.substring(0, url.length - 1);
			}
			function select(page, type, isGroup) {
				if (isGroup) {
					if (type) {
						for (var index = 0; index < groupUserArray.length; index++) {
							if (page == groupUserArray[index].page) {
								var ids = groupUserArray[index].userList;
								if (ids.length <= 0) {
									$('.all').addClass("glyphicon-unchecked")
											.removeClass("glyphicon-ok-circle");
									continue;
								}
								var chooesd = false;
								for (var j = 0; j < ids.length; j++) {
									var $tr = $("tbody.groupuserList tr");
									for (var tr_index = 0; tr_index < $tr.length; tr_index++) {
										var id = $($($tr[tr_index]).children()[1])
												.attr("data-id");
										if (id == ids[j]) {
											$($($tr[tr_index]).children()[0])
													.removeClass("glyphicon-unchecked")
													.addClass("glyphicon-ok-circle");
											$('.all')
													.removeClass("glyphicon-unchecked")
													.addClass("glyphicon-ok-circle");
											chooesd = true;
											break;
										}
									}
									if (!chooesd) {
										$('.all')
												.addClass("glyphicon-unchecked")
												.removeClass("glyphicon-ok-circle");
									}

								}
							}
						}
					} else {
						var pageArr = {};
						page = $("#groupuserpage ul li.active a").html() === undefined
								? 1
								: $("#groupuserpage ul li.active a").html();
						pageArr.page = page;
						var selList = $("tbody.groupuserList .glyphicon-ok-circle");
						var selectListIds = [];
						for (var i = 0; i < selList.length; i++) {
							var phone = $($(selList[i]).parent().children()[1])
									.html();
							var id = $($($(selList[i]).parent()).children()[1])
									.data('id');
							selectListIds.push(id);
						}
						var choosed = false;
						for (var indexArray = 0; indexArray < groupUserArray.length; indexArray++) {
							if (page == groupUserArray[indexArray].page) {
								groupUserArray[indexArray].userList = selectListIds;
								choosed = true;
							}
						}
						if (!choosed) {
							pageArr.userList = selectListIds;
							groupUserArray.push(pageArr);
						}
					}

				} else {
					if (type) {
						for (var index = 0; index < ArrayList.length; index++) {
							if (page == ArrayList[index].page) {
								var ids = ArrayList[index].userList;
								if (ids.length <= 0) {
									$('.all').addClass("glyphicon-unchecked")
											.removeClass("glyphicon-ok-circle");
									continue;
								}
								for (var j = 0; j < ids.length; j++) {
									var $tr = $("tbody.userList tr");
									var chooesd = false;
									for (var tr_index = 0; tr_index < $tr.length; tr_index++) {
										var id = $($($tr[tr_index]).children()[1])
												.attr("data-id");
										if (id == ids[j]) {
											$($($tr[tr_index]).children()[0])
													.removeClass("glyphicon-unchecked")
													.addClass("glyphicon-ok-circle");
											$('.all')
													.removeClass("glyphicon-unchecked")
													.addClass("glyphicon-ok-circle");
											chooesd = true;
											break;
										}
									}
									if (!chooesd) {
										$('.all')
												.addClass("glyphicon-unchecked")
												.removeClass("glyphicon-ok-circle");
									}
								}
							}
						}
					} else {
						var pageArr = {};
						page = $("#page ul li.active a").html() === undefined
								? 1
								: $("#page ul li.active a").html();
						pageArr.page = page;
						var selList = $("tbody.userList .glyphicon-ok-circle");
						var selectListIds = [];
						for (var i = 0; i < selList.length; i++) {
							var phone = $($(selList[i]).parent().children()[1])
									.html();
							var id = $($($(selList[i]).parent()).children()[1])
									.data('id');
							selectListIds.push(id);
						}
						var choosed = false;
						for (var indexArray = 0; indexArray < ArrayList.length; indexArray++) {
							if (page == ArrayList[indexArray].page) {
								ArrayList[indexArray].userList = selectListIds;
								choosed = true;
							}
						}
						if (!choosed) {
							pageArr.userList = selectListIds;
							ArrayList.push(pageArr);
						}
					}
				}

			}
			$(".user-tab2,.closed").click(function() {
				$(".groupList").empty();
				$(".types,#usertable1,#usertable3,.checktimes,.user-group")
						.addClass("hiddens");
				$(".user,#usertable2").removeClass("hiddens");
				$(".active2").addClass("active");
				$(".active1").removeClass("active");
				var page = $("#pages ul li.active a").html() === undefined
						? 1
						: $("#pages ul li.active a").html();
				getUserGroup(page - 1);
			});
			$(".user-tab1").click(function() {
				$(".userList").empty();
				allSelect = false;
				$(".user,#usertable2,.closed,#usertable3,.user-group")
						.addClass("hiddens");
				$(".types,#usertable1").removeClass("hiddens");
				$(".active1").addClass("active");
				$(".active2").removeClass("active");
				$("#usertable1 .all,.one").addClass('glyphicon-unchecked')
						.removeClass('glyphicon-ok-circle');
				getUserList(0);
				var startTime = $("#userstartTime").val();
				var endTime = $("#userendTime").val();
				if (startTime > endTime) {
					$(".checktimes").removeClass("hiddens");
				} else {
					$(".checktimes").addClass("hiddens");
				}
			});

			$(".btn-search").click(function() {

						if ($(this).hasClass('btn-group-search-user')) {

							checkTime('#onSearchUserGroup');
							recoderCheck('#groupUserSearch')
							$(".groupuserList").empty();
							getUserListNotGroup(0);
						} else {
							recoderCheck('#onSearchUser2')
							checkTime('#onSearchUser');
							$(".userList").empty();
							getUserList(0);
						}
					});
			$("#onSearchGroup").click(function() {
						$(".groupList").empty();
						getUserGroup(0);
					});
			$("#addGroup").click(function() {
						addGroup();
					});
			$(".all").click(function(page) {
				if ($(this).hasClass('glyphicon-ok-circle')) {
					$(this).removeClass('glyphicon-ok-circle')
							.addClass('glyphicon-unchecked')
					$(".one").removeClass('glyphicon-ok-circle')
							.addClass('glyphicon-unchecked');
				} else {
					$(this).removeClass('glyphicon-unchecked')
							.addClass('glyphicon-ok-circle');
					$(".one").removeClass('glyphicon-unchecked')
							.addClass('glyphicon-ok-circle');
				}
				if ($(this).hasClass('group')) {
					select(null, false, true);
				} else {
					select();
				}
				$('.users-group').addClass('hiddens');
			});
			$('body').on("click", ".selectone", function() {
				var that = this;
				if ($(that).children().hasClass('glyphicon-ok-circle')) {
					$(that.firstChild).removeClass('glyphicon-ok-circle')
							.addClass('glyphicon-unchecked');
					$(this).parents('tbody').siblings().find(".all")
							.removeClass('glyphicon-ok-circle')
							.addClass('glyphicon-unchecked');
				} else {
					$(that.firstChild).removeClass('glyphicon-unchecked')
							.addClass('glyphicon-ok-circle');
				}
				if ($(this).parents('tbody').hasClass("groupuserList")) {
					select(null, false, true);
				} else {
					select();
				}
				$('.users-group').addClass('hiddens');
			});
			// 获取用户列表
			function getUserList(page) {
				var pages = page ? page : 0;
				var params = {
					userName: $("#userName").val(),
					startTime: $("#userstartTime").val(),
					endTime: $("#userendTime").val(),
					totalAmount: $("#totalAmount").val(),
					subscribeTimes: $("#subscribeTimes").val(),
					signInType: $("#signInType").val(),
					signIn: $("#signIn").val(),
					signInTimes: $("#signInTimes_1").val(),
					recordType: $("#recordType").val(),
					operator: $("#operator").val(),
					loginTimes: $("#loginTimes_1").val(),
					page: pages,
					size: 10
				}
				var check = onSearchUser2Validate('#onSearchUser2').form();
				if (check) {
					var $signInTh = ''
					if($('#signInType').val() === '0'){
						$signInTh = '近一周签到次数';
					}else if($('#signInType').val() === '1'){
						$signInTh = '近一个月签到次数';
					}else if($('#signInType').val() === '2'){
						$signInTh = '近三个月签到次数';
					}
					if($signInTh !== ''){
						$('#usertable1 .usertablesignin').removeClass('hidden');
						$('#usertable1 .usertablesignin').text($signInTh);
					}else{
						$('#usertable1 .usertablesignin').addClass('hidden');
					}
					var $loginTh = ''
					if($('#recordType').val() === '0'){
						$loginTh = '近一周登录次数';
					}else if($('#recordType').val() === '1'){
						$loginTh = '近一个月登录次数';
					}else if($('#recordType').val() === '2'){
						$loginTh = '近三个月登录次数';
					}
					if($loginTh !== ''){
						$('#usertable1 .usertablelogin').removeClass('hidden');
						$('#usertable1 .usertablelogin').text($loginTh);
					}else{
						$('#usertable1 .usertablelogin').addClass('hidden');
					}
					$.ajax({
						type : "POST",
						url : '/APP-admin/user/getUserList',
						contentType : "application/json;charset=UTF-8",
						dataType : "json",
						async : false,
						timeout : 8000,
						data : JSON.stringify(params),
						success : function(msg) {
							getUserTable(msg, '.userList');
							totalCount = msg.data.totalCount;
							var total = (totalCount / 10);
							if (total % 1 !== 0) {
								total = parseInt(total) + 1;
							}
							$("#page").createPage({
								total : total,
								page : (page + 1),
								callback : function(page) {
									$(".userList").empty();
									getUserList(page - 1);
									if (!allSelect) {
										// if ($("#usertable1 .all").hasClass('glyphicon-ok-circle')) {
											$("#usertable1 .all").removeClass('glyphicon-ok-circle').addClass('glyphicon-unchecked');
											$("#usertable1 .one").removeClass('glyphicon-ok-circle').addClass('glyphicon-unchecked');
										// }
										select(page, true);
									} else {
										// if ($("#usertable1 .all").hasClass('glyphicon-unchecked')) {
											$("#usertable1 .all").removeClass('glyphicon-unchecked').addClass('glyphicon-ok-circle');
											$("#usertable1 .one").removeClass('glyphicon-unchecked').addClass('glyphicon-ok-circle');
										// }
										select(page, true);
									}
								}
							});
						}
					});
				}
			}

			function getUserTable(msg, container) {
				var list = msg.data.list;
				var li_html = "";
				for (var i = 0; i < list.length; i++) {
					var id = list[i].id;
					var userName = list[i].userName;
					var createTime = list[i].createTime;
					var lastLogin = list[i].lastLogin;
					var totalAmount = list[i].totalAmount;
					var subscribeTimes = list[i].subscribeTimes;
					var loginInWeek = list[i].loginInWeek;
					var loginInMonth = list[i].loginInMonth;
					var loginIn3Month = list[i].loginIn3Month;
					var signInWeek = list[i].signInWeek;
					var signInMonth = list[i].signInMonth;
					var signIn3Month = list[i].signIn3Month;
					var $signIn = null;
					if($('#signInType').val() === '0'){
						$signIn = signInWeek;
					}else if($('#signInType').val() === '1'){
						$signIn = signInMonth;
					}else if($('#signInType').val() === '2'){
						$signIn = signIn3Month;
					}else{
						$signIn = null;
					}
					var $login = null;
					if($('#recordType').val() === '0'){
						$login = loginInWeek;
					}else if($('#recordType').val() === '1'){
						$login = loginInMonth;
					}else if($('#recordType').val() === '2'){
						$login = loginIn3Month;
					}else{
						$login = null;
					}
					var count_html = '';
					if($signIn !== null){
						count_html += '<td>'+ $signIn +'</td>';
					}
					if($login !== null){
						count_html += '<td>'+ $login +'</td>';
					}
					if(!totalAmount){totalAmount = ''}
					if(!subscribeTimes){subscribeTimes = ''}
					li_html += "<tr class='selectone' id='one_" + i + "'>"
							+ "<th class='one glyphicon glyphicon-unchecked check'></th>"
							+ "<td data-id='" + id + "'>" + userName + "</td>"
							+ "<td>" + createTime + "</td>" + "<td>"
							+ lastLogin + "</td><td>" + totalAmount + "</td><td>" + subscribeTimes + "</td>" + count_html + "</tr>";
				}
				$(container).append(li_html);
			}


			function getUserListNotGroup(page) {
				var groupId = $("#groupIds").val();
				var userName = $("#userName").val();
				var startTime = $("#userstartTime").val();
				var endTime = $("#userendTime").val();
				var recordType = $("#recordType").val();
				var operator = $("#operator").val();
				var loginTimes = $("#loginTimes_1").val();

				var size = 10;
				var arr = [
						["userName", $("#onSearchUserGroup #userName").val()],
						["startTime",
								$("#onSearchUserGroup #userstartTime").val()],
						["endTime", $("#onSearchUserGroup #userendTime").val()],
						["recordType", $("#groupUserSearch #recordType").val()],
						["operator", $("#groupUserSearch #operator").val()],
						["loginTimes", $("#loginTimesGroup").val()],
						["groupId", groupId]];

				var urls = getUrl(arr);
				var url = '/APP-admin/user/getUserListGroupAddition?page='
						+ page + '&size=' + size + "&" + urls;
				var check = onSearchUser2Validate('#groupUserSearch').form();
				if (check) {
					$.ajax({
						type : "GET",
						url : url,
						contentType : "application/json;charset=UTF-8",
						dataType : "json",
						async : false,
						timeout : 8000,
						success : function(msg) {
							UserList(msg, '.groupuserList');

							totalCount = msg.data.totalCount;
							var total = (totalCount / 10);
							if (total % 1 !== 0) {
								total = parseInt(total) + 1;
							}
							$("#groupuserpage").createPage({
								total : total,
								page : (page + 1),
								callback : function(page) {
									$(".groupuserList").empty();
									getUserListNotGroup(page - 1);
									if (!allGroupSelect) {
										if (!$("#usernotgrouptable .all")
												.hasClass('glyphicon-ok-circle')) {
											$("#usernotgrouptable .all,.one")
													.removeClass('glyphicon-ok-circle')
													.addClass('glyphicon-unchecked');

										} else {
											$("#usernotgrouptable .all,.one")
													.removeClass('glyphicon-ok-circle')
													.addClass('glyphicon-unchecked');

										}
										select(page, true, true);
									} else {
										if ($("#usernotgrouptable .all")
												.hasClass('glyphicon-ok-circle')) {

											$("#usernotgrouptable .all")
													.addClass('glyphicon-unchecked')
													.removeClass('glyphicon-ok-circle');
										}
										select(page, true, true);
									}
								}
							});
						}
					});
				}
			}
			function UserList(msg, container) {
				var list = msg.data.list;
				$(container).find('tr').remove();
				var li_html = "";
				for (var i = 0; i < list.length; i++) {
					var id = list[i].id;
					var userName = list[i].userName;
					var createTime = list[i].createTime;
					var lastLogin = list[i].lastLogin;
					var loginInWeek = list[i].loginInWeek;
					var loginInMonth = list[i].loginInMonth;
					var loginIn3Month = list[i].loginIn3Month;
					var unixTimestamp = new Date(createTime);
					unixTimestamp = unixTimestamp.toLocaleDateString()
							.split('/');
					createTime = unixTimestamp[0] + "-" + unixTimestamp[1]
							+ "-" + unixTimestamp[2];
					var unixTimestamps = new Date(lastLogin);
					unixTimestamps = unixTimestamps.toLocaleDateString()
							.split('/');
					lastLogin = unixTimestamps[0] + "-" + unixTimestamps[1]
							+ "-" + unixTimestamps[2];
					li_html += "<tr class='selectone' id='one_"
							+ i
							+ "'>"
							+ "<th class='one glyphicon glyphicon-unchecked check'></th>"
							+ "<td data-id='" + id + "'>" + userName + "</td>"
							+ "<td>" + createTime + "</td>" + "<td>"
							+ lastLogin + "</td>" + "<td>" + loginInWeek
							+ "</td>" + "<td>" + loginInMonth + "</td>"
							+ "<td>" + loginIn3Month + "</td>" + "</tr>";
				}
				$(container).append(li_html);
			}
			function UserGroup(msg) {
				var list = msg.data.list;
				var li_html = "";
				for (var i = 0; i < list.length; i++) {
					var groupId = list[i].id;
					var groupName = list[i].name;
					var count = list[i].count;
					var status = parseInt(list[i].status);
					var hiddenClass;
					var statu_s,delet_e;
					if (status === 0) {
						statu_s = '启用';
						hiddenClass = 'back';
						delet_e='';
					} else {
						statu_s = '停用';
						hiddenClass = 'reds';
						delet_e='hiddens';
					}
					li_html += "<tr>"
							+ "<td class='groupName'>"
							+ groupName
							+ "</td>"
							+ "<td class='number'>"
							+ count
							+ "</td>"
							+ "<td>"
							+ "<button data-id='"
							+ groupId
							+ "' data-groupName='"
							+ groupName
							+ "' data-count='"
							+ count
							+ "' type='button' class='btn btn-sm btn-success btn-beautify checkUser'>"
							+ "<i class='ace-icon fa fa-plus'></i>"
							+ "查看"
							+ "</button>"
							+ "<button data-type='"
							+ groupId
							+ "' id='"
							+ hiddenClass
							+ "' data-staus='"
							+ status
							+ "' data-name='"
							+ groupName
							+ "'  type='button' class='btn btn-sm btn-danger btn-beautify delUser'>"
							+ "<i class='ace-icon fa fa-plus' style='font-style: normal'>"
							+ statu_s
							+ "</i>"
							+ "</button>"
							+ "<button data-id='"
							+ groupId
							+ "' data-groupName='"
							+ groupName
							+ "' data-count='"
							+ count
							+ "' type='button' class='btn btn-sm btn-primary btn-beautify btn-update-user'>"
							+ "<i class='ace-icon fa fa-plus'></i>" + "修改"
							+ "</button>"
							+ "<button data-id='"
							+ groupId
							+ "' data-groupName='"
							+ groupName
							+ "' data-count='"
							+ count
							+ "' type='button' class='btn btn-sm btn-warning btn-beautify btn-delete-user "+delet_e+"'>"
							+ "<i class='ace-icon fa fa-plus'></i>" + "删除"
							+ "</button>" + "</td>" + "</tr>";
				}
				$(".groupList").append(li_html);
			}
			// 获取用户组列表
			function getUserGroup(page) {
				var groupName = encodeURI(encodeURI($("#groupNameId").val()));
				var status = $('#groupType').val();

				var size = 10;
				var url = '/APP-admin/user/getUserGroup?page=' + page
						+ '&size=' + size + '&' + Math.random();
				if (groupName) {
					url = '/APP-admin/user/getUserGroup?groupName='
							+ groupName + '&page=' + page + '&size=' + size
							+ '&' + Math.random();
				}
				if (status) {
					url = url + '&status=' + status;
				}
				$.ajax({
							type : "GET",
							url : url,
							contentType : "application/json;charset=UTF-8",
							dataType : "json",
							async : false,
							timeout : 8000,
							success : function(msg) {
								totalCounts = msg.data.totalCount;
								UserGroup(msg);
								var total = (totalCounts / 10);
								if (total % 1 !== 0) {
									total = parseInt(total) + 1;
								}
								$("#pages").createPage({
											total : total,
											page : (page + 1),
											callback : function(page) {
												$(".groupList").empty();
												getUserGroup(page - 1);
												select(page, true);
											}
										});
							}
						});
			}
			// 根据用户组Id获取用户
			function getUserByGroupId(page, isUpdate) {
				var groupId = $("#groupIds").val();

				var size = 20;
				$.ajax({
					type : "GET",
					url : '/APP-admin/user/getUserByGroupId?groupId='
							+ groupId + '&page=' + page + '&size=' + size
							+ '&rnd=' + Math.random(),
					contentType : "application/json;charset=UTF-8",
					dataType : "json",
					async : false,
					timeout : 8000,
					success : function(msg) {
						$(".userListCheck").empty();
						var list = msg.data.list;
						var count = msg.data.totalCount;
						var total = (count / 20);
						if (total % 1 !== 0) {
							total = parseInt(total) + 1;
						}

						$(".checkcount").html('人数:' + count);
						var li_html = "";
						for (var i = 0; i < list.length; i++) {
							var id = list[i].id;
							var userName = list[i].userName;
							var createTime = list[i].createTime;
							var lastLogin = list[i].lastLogin;
							var loginInWeek = list[i].loginInWeek;
							var loginInMonth = list[i].loginInMonth;
							var loginIn3Month = list[i].loginIn3Month;
							var unixTimestamp = new Date(createTime);
							unixTimestamp = unixTimestamp.toLocaleDateString()
									.split('/');
							createTime = unixTimestamp[0] + "-"
									+ unixTimestamp[1] + "-" + unixTimestamp[2];
							var unixTimestamps = new Date(lastLogin);
							unixTimestamps = unixTimestamps
									.toLocaleDateString().split('/');
							lastLogin = unixTimestamps[0] + "-"
									+ unixTimestamps[1] + "-"
									+ unixTimestamps[2];
							if (isUpdate) {
								li_html += "<tr class='' id='one_"
										+ i
										+ "'>"
										+ "<td data-id='"
										+ id
										+ "'>"
										+ userName
										+ "</td>"
										+ "<td>"
										+ createTime
										+ "</td>"
										+ "<td>"
										+ lastLogin
										+ "</td>"
										+ "<td>"
										+ loginInWeek
										+ "</td>"
										+ "<td>"
										+ loginInMonth
										+ "</td>"
										+ "<td>"
										+ loginIn3Month
										+ "</td>"
										+ "<td> <button class='btn-group-user-delete btn btn-primary' data-id='"
										+ id + "'>删除</button>" + "</td>"
										+ "</tr>";
							} else {
								li_html += "<tr class='' id='one_" + i + "'>"
										+ "<td data-id='" + id + "'>"
										+ userName + "</td>" + "<td>"
										+ createTime + "</td>" + "<td>"
										+ lastLogin + "</td>" + "<td>"
										+ loginInWeek + "</td>" + "<td>"
										+ loginInMonth + "</td>" + "<td>"
										+ loginIn3Month + "</td>" + "</tr>";

							}
						}
						$(".userListCheck").append(li_html);
						$("#userpages").createPage({
									total : total,
									page : (page + 1),
									callback : function(page) {
										$(".userListCheck").empty();
										if (isUpdate) {
											getUserByGroupId(page - 1, isUpdate);
										} else {
											getUserByGroupId(page - 1);
										}

									}
								});

					}
				});
			}

			$('body').on("click", ".checkUser", function() {
						$(".groupList").empty();
						$(".userList").empty();
						/* getUserList(0); */
						$("#usertable2,#pages,.user").addClass("hiddens");
						$("#usertable1,.closed,.user-group")
								.removeClass("hiddens");

						console.log($(this).data('id'));
						$("#groupIds").val($(this).data('id'));
						$(".checkuser").html('用户组名称:'
								+ $(this).data('groupname'));
						$(".checkcount").html('人数:' + $(this).data('count'));
						$("#usertable3").removeClass("hiddens");
						$("#usertable1,#usertable2").addClass("hiddens");
						getUserByGroupId(0);
						$('.user-group-opreation').hide();
						$('.btn-group-adduser').hide();
					});
			$('body').on("click", ".btn-update-user", function() {
						$(".groupList").empty();
						$(".userList").empty();
						/* getUserList(0); */
						$("#usertable2,#pages,.user").addClass("hiddens");
						$("#usertable1,.closed,.user-group")
								.removeClass("hiddens");

						console.log($(this).data('id'));
						$("#groupIds").val($(this).data('id'));
						$(".checkuser").html('用户组名称:'
								+ $(this).data('groupname'));
						$(".checkcount").html('人数:' + $(this).data('count'));
						$("#usertable3").removeClass("hiddens");
						$("#usertable1,#usertable2").addClass("hiddens");
						$('.user-group-opreation').show();
						$('.btn-group-adduser').show();
						getUserByGroupId(0, true);

					});
			$('#usertable3').on('click', '.btn-group-user-delete',
					function(event) {
						var userId = $(this).attr('data-id');
						var groupId = $("#groupIds").val();
						Lobibox.confirm({
							'msg' : '请确认是否将用户从该用户组删除?',
							callback : function($this, type, ev) {
								if (type === 'yes') {
									$.ajax({
										url : '/APP-admin/user/deleteUserFromGroup?userId='
												+ userId
												+ '&groupId='
												+ groupId,
										type : 'DELETE',
										dataType : 'json',
										contentType : 'application/json',
										success : function(data) {
											if (data.success) {
												Lobibox.notify('success', {
															msg : '删除成功',
															sound:false,
															delay : 1000
														});
												var page = $("#userpages ul li.active a")
														.html() === undefined
														? 1
														: $("#userpages ul li.active a")
																.html();
												getUserByGroupId(page - 1, true);
											} else {
												Lobibox.notify('error', {
															msg : data.msg,
															sound:false,
															delay : 1000
														})
											}

										}
									});

								}
							}
						});
					});
			// 创建新用户组
			function addGroup() {
				var check = true;
				var userList = $("#userListInput").val().split(",");
				if ($("#userListInput").val() === '') {
					check = false;
					return false;
				}
				var o = {
					groupName : $("#numberName").val(),
					userList : userList
					,
				};
				var groupName = $("#numberName").val();
				if (groupName === "") {
					check = false;
					$(".name").removeClass('hiddens');
					return false;;
				} else {
					$(".name").addClass('hiddens');
				}
				if ($.trim(groupName) === '') {
					check = false;
					alert('不能全为空格!');
					return false;
				}
				if (check) {
					$.ajax({
								type : "POST",
								url : '/APP-admin/user/createUserGroup',
								contentType : "application/json;charset=UTF-8",
								dataType : "json",
								data : JSON.stringify(o),
								async : false,
								timeout : 8000,
								success : function(msg) {
									if (msg.msg.indexOf('用户组名已存在') > -1) {
										$(".groupnamess")
												.removeClass('hiddens');
										return;
									} else {
										$(".groupnamess").addClass('hiddens');
									}
									$('#myModalUser1').modal('hide');
									$("#usertable1 .all,.one")
											.removeClass('glyphicon-ok-circle')
											.addClass('glyphicon-unchecked');
									allSelect = false;
									ArrayList = [];
									$.pnotify({
												text : '新增用户组成功',
												type : 'success'
											});

								}
							});
				}
			}
			$("#addUserGroup").click(function() {
						$("#dialogClass")
								.attr("class", "modal-dialog modal-sm");
						$('.modal-title').html("新增用户组");
						// var userList =
						// $("tbody.userList").find(".glyphicon-ok-circle");
						var userListIds = [];
						for (var i = 0; i < ArrayList.length; i++) {
							// var phone =
							// $($($("tbody.userList").find(".glyphicon-ok-circle")[i]).parent().children()[1]).html();
							// var id =
							// $($($($("tbody.userList").find(".glyphicon-ok-circle")[i]).parent()).children()[1]).data('id');
							for (var j = 0; j < ArrayList[i].userList.length; j++) {
								userListIds.push(ArrayList[i].userList[j]);
							}
						}
						$("#userListInput").val(userListIds);
						if (userListIds.length === 0) {

							Lobibox.alert('warning', {
										msg : "请选择至少一个用户!",
										width : 400,
										delay : 1000

									});
						} else {
							$('#myModalUser1').modal({
										backdrop : 'static',
										keyboard : false
									});
						}

					});
			$('.btn-select-user').click(function() {
				if ($(this).hasClass('btn-group')) {
					allGroupSelect = true;
					var groupId = $("#groupIds").val();
					var arr = [
							["userName",
									$("#onSearchUserGroup #userName").val()],
							[
									"startTime",
									$("#onSearchUserGroup #userstartTime")
											.val()],
							["endTime",
									$("#onSearchUserGroup #userendTime").val()],
							["recordType",
									$("#groupUserSearch #recordType").val()],
							["operator", $("#groupUserSearch #operator").val()],
							["loginTimes", $("#loginTimesGroup").val()],
							['groupId', groupId]];
					var urls = getUrl(arr);
					var url = '/APP-admin/user/getUserListGroupAddition?'
							+ urls + '&' + Math.random();
					$.ajax({
								type : "GET",
								url : url,
								contentType : "application/json;charset=UTF-8",
								dataType : "json",
								async : false,
								timeout : 8000,
								success : function(msg) {
									var list = msg.data.list;
									totalCount = msg.data.totalCount;
									var pageNum = Math.ceil(totalCount / 10);
									var page = 1;
									var userList = [];
									groupUserArray = [];

									for (var i = 0; i < list.length; i++) {
										if (i <= page * 10 - 1) {
											userList.push(list[i].id);
											if (i === page * 10 - 1
													|| i === (list.length - 1)) {
												groupUserArray.push({
															'page' : page,
															userList : userList
														});
												page = page + 1;
												userList = [];
											}
										}

									}
									console.log(groupUserArray);
									$("#usernotgrouptable .all,.one")
											.removeClass('glyphicon-unchecked')
											.addClass('glyphicon-ok-circle');
								}
							});
					$('.users-group').addClass('hiddens');

				} else {
					allSelect = true;

					var params = {
						userName: $("#userName").val(),
						startTime: $("#userstartTime").val(),
						endTime: $("#userendTime").val(),
						totalAmount: $("#totalAmount").val(),
						subscribeTimes: $("#subscribeTimes").val(),
						signInType: $("#signInType").val(),
						signIn: $("#signIn").val(),
						signInTimes: $("#signInTimes_1").val(),
						recordType: $("#recordType").val(),
						operator: $("#operator").val(),
						loginTimes: $("#loginTimes_1").val()
					}
					$.ajax({
						type : "POST",
						url : '/APP-admin/user/getUserList',
						contentType : "application/json;charset=UTF-8",
						dataType : "json",
						async : false,
						timeout : 8000,
						data : JSON.stringify(params),
						success : function(msg) {
							var list = msg.data.list;
							totalCount = msg.data.totalCount;
							var pageNum = Math.ceil(totalCount / 10);
							var page = 1;
							var userList = [];
							ArrayList = [];

							for (var i = 0; i < list.length; i++) {
								if (i <= page * 10 - 1) {
									userList.push(list[i].id);
									if (i === page * 10 - 1
											|| i === (list.length - 1)) {
										ArrayList.push({
													'page' : page,
													userList : userList
												});
										page = page + 1;
										userList = [];
									}
								}

							}
							console.log(ArrayList);
							$("#usertable1 .all,.one").removeClass('glyphicon-unchecked').addClass('glyphicon-ok-circle');
						}
					});
				}
			});

			$('body').on("click", ".delUser", function() {
				var that = this;
				var o = {
					groupId : $(this).data('type'),
					groupName : $(this).data('name'),
					status : $(this).attr("data-staus")
				};
				var status = o.status;
				if (status === '0') {
					o.status = 1;
				} else {
					o.status = 0;
				}
				$.ajax({
							type : "PUT",
							url : '/APP-admin/user/updateUserGroup',
							contentType : "application/json;charset=UTF-8",
							dataType : "json",
							data : JSON.stringify(o),
							async : false,
							timeout : 8000,
							success : function(msg) {
								var status1 = status;
								if (status1 === '0') {
									$(that).attr('data-staus', 1);
									$(that).children().html("停用");
									$(that).siblings('.btn-delete-user').addClass('hiddens');
									$(that).css("background", "#d9534f").css(
											"border-color", "#d9534f");
								} else {
									$(that).attr('data-staus', 0);
									$(that).children().html("启用");
									$(that).siblings('.btn-delete-user').removeClass('hiddens');
									$(that).css("background", "#23527c").css(
											"border-color", "#23527c");
								}
							}
						});
			});
			$('.groupList').on('click','.btn-delete-user',function(){
				var that=this;
				var groupId=$(this).data('id');
				Lobibox.confirm({
					msg:'确认要要删除用户组('+$(that).data('groupname')+')吗?',
					buttons:{
						yes:{
							text:'删除',
							class:'btn btn-primary'
						},
						no:{
							text:'取消',
							class:'btn btn-default'
						}
					},
					callback:function($this,type,ev){
						if(type==='yes'){
							$.ajax({
								url : '/APP-admin/user/deleteUserGroup?groupId='+groupId,
								type : 'DELETE',
								dataType : 'json',
								success : function(data) {
									if (data.success) {
										Lobibox.notify('success',{
											'msg' : '用户组删除成功',
											sound:false,
											delay:1000
										})
										$(".groupList").empty();
										getUserGroup(0);
									} else {
										Lobibox.notify('error',{
											'msg' : data.msg,
											sound:false,
											delay:1000
										})
									}
								}
							});
						}
					}
				});
			});
			init();
			$('#onSearchUser input,#onSearchUser2 input').bind('keyup',
					function(e) {
						if (e.keyCode == 13) {
							checkTime('#onSearchUser');
							recoderCheck('#onSearchUser2')
							$(".userList").empty();
							getUserList(0);

						}
					});
			$('#onSearchUserGroup input,#groupUserSearch input').bind('keyup',
					function(e) {
						if (e.keyCode == 13) {
							recoderCheck('#groupUserSearch')
							checkTime('#onSearchUserGroup');
							$(".groupuserList").empty();
							getUserListNotGroup(0);

						}
					});
			$('#groupNameId').bind('keyup', function(e) {
						if (e.keyCode == 13) {
							$(".groupList").empty();
							getUserGroup(0);
							console.log(12341);
						}
					});
			function recoderCheck(contaner) {
				// 签到
				var signInType = $(contaner).find("#signInType").val();
				var signIn = $(contaner).find("#signIn").val();
				var signInTimes = $(contaner).find("#signInTimes_1").val();
				// 登录
				var recordType = $(contaner).find("#recordType").val();
				var operator = $(contaner).find("#operator").val();
				var loginTimes = $(contaner).find("#loginTimes_1").val();
				if ((signInType && signIn && signInTimes)
						|| !(signInType || signIn || signInTimes)) {
					$(contaner).find('.checkdates').addClass("hiddens");
					$(contaner).find('.checkdates').text("最近,签到次数，比较符都不能为空");
				} else {
					$(contaner).find('.checkdates').removeClass("hiddens")
				}
				if ((recordType && operator && loginTimes)
						|| !(recordType || operator || loginTimes)) {
					$(contaner).find('.checkdates').addClass("hiddens");
					$(contaner).find('.checkdates').text("最近,登录次数，比较符都不能为空");
				} else {
					$(contaner).find('.checkdates').removeClass("hiddens")
				}

			}
			function checkTime(contaner) {
				var startTime, endTime;

				startTime = $(contaner).find("#userstartTime").val();
				endTime = $(contaner).find("#userendTime").val();

				startTime = $("#userstartTime").val();
				endTime = $("#userendTime").val();
				if (startTime > endTime) {
					$(contaner).find('.checktimes').removeClass("hiddens");
				} else {
					$(contaner).find('.checktimes').addClass("hiddens");
				}
				if (endTime === '' || startTime === '') {
					$(contaner).find('.checktimes').addClass("hiddens");
				}
			}
			function onSearchUser2Validate(container) {
				return $(container).validate({
							rules : {
								loginTimes : {
									digits : true,
									min : 0

								}
							},
							messages : {
								loginTimes : {
									digits : '请输入大于或等于零的数字',
									min : '请输入大于或等于零的数字'

								}
							},
							errorLabelContainer : ".error-msg"
							,

						});
			}
			$('.btn-group-adduser').click(function() {
				$('#groupAddUserModal').modal('show');
				$('.users-group').addClass('hiddens');
				$('.modal-title').text('添加用户到用户组');
				allGroupSelect = false;

				$("#usernotgrouptable .all,.one")
						.removeClass('glyphicon-ok-circle')
						.addClass('glyphicon-unchecked');
				groupUserArray = [];

				$(".groupuserList").empty();
				getUserListNotGroup(0);
			});
			$('#btnGroupAddUser').click(function() {
				var userListIds = [];
				var check;
				for (var i = 0; i < groupUserArray.length; i++) {

					for (var j = 0; j < groupUserArray[i].userList.length; j++) {
						userListIds.push(groupUserArray[i].userList[j]);
					}
				}
				$("#userListGroupInput").val(userListIds);
				if (userListIds.length === 0) {
					$(".users-group").removeClass('hiddens');
					check = false;
				} else {
					$(".users-group").addClass('hiddens');
					check = true;
				}
				if (check) {
					var userList = $("#userListGroupInput").val().split(",");
					var groupId = $("#groupIds").val();
					var o = {
						groupId : groupId,
						userList : userList
						,
					};
					$.ajax({
						type : "POST",
						url : '/APP-admin/user/addUserToGroup',
						contentType : "application/json;charset=UTF-8",
						dataType : "json",
						data : JSON.stringify(o),
						async : false,
						timeout : 8000,
						success : function(data) {
							if (data.success) {
								$.pnotify({
											text : '新增用户成功',
											type : 'success'
										});

								var page = $("#userpages ul li.active a")
										.html() === undefined
										? 1
										: $("#userpages ul li.active a").html();
								getUserByGroupId(page - 1, true);
							} else {
								$.pnotify({
											text : '用户已经存在于当前组中',
											type : 'error'
										});
							}
							var allGroupSelect = false;
							groupUserArray = [];

							$('#groupAddUserModal').modal('hide');

						}
					});
				}
			})
			// 批量导入添加用户组

			$('#usergroup-bulkimport-btn').click(function(){
				$('#ug-bi-name').val('');
				$('#ug-bi-user').html('');
				$('#ug-bi-file').val('');
				$('#usergroup-bulkimport-modal').modal();

			});
			//批量上传
		 $('#ug-bi-file').on('change',function(){
		    var that = this;
		    var files = this.files[0];
		    if(files.name.indexOf('.csv')===-1){
		    	Lobibox.alert('error', {
						'msg' : '请上传csv格式文件'
					})
		    }else{
		    	 var form = new FormData();
			    form.append('csvFile',files);
			    $.ajax({
			      url:'/APP-admin/data/import/csv/phone',
			      data:form,
			      method:'POST',
			      contentType:false,
			      processData: false,
			      success : function(resp) {
			      	if(resp.success){
			      		var list=resp.data;
			      		var len=list.length;
			      		var phone='';
			      		$.each(list,function(i,v){
		      				phone = phone+''+'<span class="del-user">'+v+'<i class="glyphicon glyphicon-remove"></i></span>';
									if(i<len-1){
										phone+='<span>,</span>';
									}
			      		})
			      		if($.trim($('#ug-bi-user').html()) === ''){
									$('#ug-bi-user').html(phone);
								}else{
									Lobibox.alert('warning',{
										msg:'只能添加一个文件'
									})
								}
			      	}
			      }
			    });
		    }
		  });
		  $('#ug-bi-user').on('click','.del-user i',function(e){
		  	if($(e.target).parent('.del-user').next().text()===','){
		  		$(e.target).parent('.del-user').next().remove();
		  	}else if($(e.target).parent('.del-user').prev().text()===','){
		  		$(e.target).parent('.del-user').prev().remove();
		  	}
		  	$(e.target).parent('.del-user').remove();
		  });
		  //获取多人短信发送人列表
		  function getReceivers(list){
		  	var rec=[];
		  	var len=list.length;
		  	for(var i=0;i<len;i++){
		  		rec.push(Number($(list[i]).text()));
		  		// if(i<len-1){
		  		// 	rec+=($(list[i]).text()+',');
		  		// }else{
		  		// 	rec+=$(list[i]).text();
		  		// }
		  	}
		  	return rec;
		  }
			$('#ug-bi-save').click(function(){
				var gname=$.trim($('#ug-bi-name').val());
				var guser=getReceivers($('#ug-bi-user').find('.del-user'));
				if(gname===''){
					Lobibox.alert('warning',{
						msg:'用户组名不能为空'
					})
					return;
				}
				if($.trim(guser)===''){
					Lobibox.alert('warning',{
						msg:'请选择要添加的用户'
					})
					return;
				}
				$.ajax({
					type : "POST",
					url : '/APP-admin/user/importUserGroup',
					contentType : "application/json;charset=UTF-8",
					dataType : "json",
					data : JSON.stringify({
						groupName : gname,
						userNameList : guser
					}),
					async : false,
					timeout : 8000,
					success : function(resp) {
						if(resp.success){
							$('#usergroup-bulkimport-modal').modal('hide');
							$(".groupList").empty();
							getUserGroup(0);
							Lobibox.notify('success',{
								msg:'添加用户组成功',
								sound:false,
								delay:1000
							})
						}else{
							Lobibox.notify('error',{
								msg:resp.msg,
								sound:false
							})
						}
					}
				});
			})
		});
