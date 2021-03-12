// require([
// 		'../assets/js/vendor/jquery.min',
// 		'../assets/js/vendor/lobibox.min',
// 		'../assets/js/page',
// 		'../assets/js/vendor/jquery.pnotify',
// 		'../assets/js/vendor/jquery.validate.min',
// 		'../assets/js/vendor/bootstrap3-typeahead'
// 	],
// 	function($, Lobibox) {
	$(function() {
		var coinTotalCount;
		var init = function init() {
			// 获取虚拟币分发列表
			getCoinDistributeDetail(0);
		};
		$("#addCoin").click(function() {
					$("#dialogClass")
							.attr("class", "modal-dialog modal-sm");
					$('.modal-title').html("分发虚拟币");
					$('#myModalCoin').modal({
								backdrop : 'static',
								keyboard : false
							});
					getUserGroup();
				});
		$("#addCoinByPer").click(function() {
					$("#dialogClass")
							.attr("class", "modal-dialog modal-sm");
					$('.modal-title').html("分发虚拟币");
					$('#myModalCoinPer').modal({
								backdrop : 'static',
								keyboard : false
							});

				});

		// 获取虚拟币分发列表
		function getCoinDistributeDetail(page) {
			var page = page;
			var size = 10;
			var arr = [["volume", $("#coins #volume").val()],
					["userName", $("#coins #userName").val()],
					["groupName", $("#coinss #groupName").val()],
					["operatorName", $("#coinss #operatorName").val()],
					["startTime", $("#coinstartTime").val()],
					["endTime", $("#coinendTime").val()]];
			var urls = getUrl(arr);
			var url = '/APP-admin/coin/getCoinDistributeDetail?page='
					+ page + '&size=' + size + "&" + urls + '&'
					+ Math.random();
			url = encodeURI(url);
			url = encodeURI(url);

			var check = onCoinsSearchFormValidate().form();
			if (check) {
				$.ajax({
					type : "GET",
					url : url,
					contentType : "application/x-www-form-urlencoded; charset=UTF-8",
					dataType : "json",
					async : false,
					timeout : 8000,
					success : function(msg) {
						CoinList(msg);
						coinTotalCount = msg.data.totalCount;
						var total = (coinTotalCount / 10);
						if (total % 1 !== 0) {
							total = parseInt(total) + 1;
						}
						$("#coinpage").createPage({
									total : total,
									page : (page + 1),
									callback : function(page) {
										$(".coinList").empty();
										getCoinDistributeDetail(page - 1);
									}
								});
					}
				});
			}
		}
		function CoinList(msg) {
			var list = msg.data.list;
			var li_html = "";
			for (var i = 0; i < list.length; i++) {
				var id = list[i].id;
				var volume = list[i].volume;
				var userName = list[i].userName;
				var distributeTime = list[i].distributeTime;
				var groupName = list[i].groupName;
				var operatorName = list[i].operatorName;
				var unixTimestamp = new Date(distributeTime);
				unixTimestamp = unixTimestamp.toLocaleDateString()
						.split('/');
				distributeTime = unixTimestamp[0] + "-" + unixTimestamp[1]
						+ "-" + unixTimestamp[2];
				li_html += "<tr>" + "<td >" + id + "</td>" + "<td>"
						+ volume + "</td>" + "<td>" + userName + "</td>"
						+ "<td>" + distributeTime + "</td>" + "<td>"
						+ groupName + "</td>" + "<td>" + operatorName
						+ "</td>" + "</tr>";
			}
			$(".coinList").append(li_html);
		}
		$("#onSearchCoin").click(function() {
					checkTime();
					$(".coinList").empty();
					getCoinDistributeDetail(0);
				});
		// 分发虚拟币
		function distributeCoin() {
			var groupId = $("#coinGrounp").val();
			var amount = $("#coinnumber").val();
			var operatorId = $("#user-id").val();
			if (groupId === "") {
				$(".groups").removeClass('hiddens');
			} else {
				$(".groups").addClass('hiddens');
			}
			if (amount === "") {
				$(".amounts").removeClass('hiddens');
				$(".amount_s").addClass('hiddens');

			} else if (amount === 0) {
				$(".amounts").addClass('hiddens');
				$(".amount_s").removeClass('hiddens');

			} else {
				$(".amounts,.amount_s").addClass('hiddens');
			}
			var check = validaDeliverCoinForm().form();
			if ((!check)) {
				return;
			} else {
				var url = '/APP-admin/coin/distributeCoin?groupId='
						+ groupId + '&amount=' + amount + "&"
						+ '&operatorId=' + operatorId;
				$.ajax({
							type : "POST",
							url : url,
							contentType : "application/json;charset=UTF-8",
							dataType : "json",
							async : false,
							timeout : 8000,
							success : function(msg) {
								$(".coinList").empty();
								getCoinDistributeDetail(0);
								$('#myModalCoin').modal('hide');
								$.pnotify({
											text : '分发虚拟币成功',
											type : 'success'
										});
							}
						});
			}
		}

		$("#resendCoin").click(function() {
					distributeCoin();
				});
		$('#resendCoinPer').click(function() {
					distributeCoinPer();
				})
		// 小批量分发
		function distributeCoinPer() {
			var coinuser = $('#coinuser').val();
			var users = coinuser.split(',');
			var amount = $("#coinnumberPer").val();
			var operatorId = $("#user-id").val();

			if (amount === "") {
				$(".amounts").removeClass('hiddens');
				$(".amount_s").addClass('hiddens');

			} else if (amount === 0) {
				$(".amounts").addClass('hiddens');
				$(".amount_s").removeClass('hiddens');

			} else {
				$(".amounts,.amount_s").addClass('hiddens');
			}
			var check = validaDeliverCoinPerForm().form();
			if ((!check)) {
				return;
			} else {

				var url = '/APP-admin/coin/distributeCoinByusernames?username='
						+ users
						+ '&amount='
						+ amount
						+ '&operatorId='
						+ operatorId;
				$.ajax({
							type : "POST",
							url : url,
							contentType : "application/json;charset=UTF-8",
							dataType : "json",
							async : false,
							timeout : 8000,
							success : function(msg) {
								if (msg.success) {
									$(".coinList").empty();
									getCoinDistributeDetail(0);
									$('#myModalCoinPer').modal('hide');
									$.pnotify({
												text : '分发虚拟币成功',
												type : 'success'
											});
								} else {
									$('#myModalCoinPer').modal('hide');
									$.pnotify({
												text : '分发虚拟币失败',
												type : 'error'
											});
								}
							}
						});
			}
		}

		// 获取用户组
		function getUserGroup() {
			var page = 0;
			var size = 1000;
			var url = '/APP-admin/user/getUserGroup?page=' + page
					+ '&size=' + size;
			$.ajax({
						type : "GET",
						url : url,
						contentType : "application/json;charset=UTF-8",
						dataType : "json",
						async : false,
						timeout : 8000,
						success : function(msg) {
							var list = msg.data.list;
							var li_html = "<option value=''>--请选择--</option>";
							for (var i = 0; i < list.length; i++) {
								var groupId = list[i].id;
								var groupName = list[i].name;
								var status = list[i].status;
								var hiddenClass;
								if (status == 1) {
									li_html += "<option value='" + groupId
											+ "'>" + groupName
											+ "</option>";
								}
							}
							$("select#coinGrounp").html(li_html);
						}
					});
		}
		init();
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
		$('#coinss input,#coins input').bind('keyup', function(e) {
					if (e.keyCode == 13) {
						$(".coinList").empty();
						getCoinDistributeDetail(0);
						console.log(11111);
						checkTime();
					}
				});
		function checkTime() {
			var startTime = $("#coinstartTime").val();
			var endTime = $("#coinendTime").val();
			if (startTime > endTime) {
				$(".cointime").removeClass("hiddens");
			} else {
				$(".cointime").addClass("hiddens");
			}
			if (endTime === '' || startTime === '') {
				$(".cointime").addClass("hiddens");
			}
		}
		function validaDeliverCoinForm() {
			return $("#myModalCoin #addRebate").validate({
						rules : {
							statusStr : {
								required : true
							},
							coinnumber : {
								digits : true,
								required : true,
								min : 1

							}

						},
						messages : {
							statusStr : {
								required : '请选择用户组'
							},
							coinnumber : {
								digits : '请输入大于零的数字',
								required : '请输入大于零的数字',
								min : '请输入大于零的数字'

							}
						}
					});
		}
		function validaDeliverCoinPerForm() {
			return $("#addcoinByPer").validate({
						rules : {
							coinuser : {
								required : true
							},
							coinnumberPer : {
								digits : true,
								required : true,
								min : 1

							}

						},
						messages : {
							coinuser : {
								required : '用户不能为空'
							},
							coinnumberPer : {
								digits : '请输入大于零的数字',
								required : '请输入大于零的数字',
								min : '请输入大于零的数字'

							}
						}
					});
		}
		function onCoinsSearchFormValidate() {
			return $('#coins').validate({
						rules : {
							volume : {
								digits : true,
								min : 1
							}
						},
						messages : {
							volume : {
								digits : '请输入大于零的数字',
								min : '请输入大于零的数字'
							}
						}
					});

		}
		// 补全用户名
		$('#coinPer').typeahead({
			source : function(query, process) {
				var arr = [["userName", query], ["startTime", ''],
						["endTime", ''], ["recordType", ''],
						["operator", ''], ["loginTimes", '']];
				var urls = getUrl(arr);
				var url = '/APP-admin/user/getUserList?' + urls + '&'
						+ Math.random();
				$.ajax({
							url : url,
							type : 'GET',
							dataType : 'json',
							timeout : 8000,
							success : function(data) {
								var list = data.data.list;
								var users = [];
								if (list.length === 0) {
									users.push('');
									$('#coinPer').val('');
								}
								if (list.length === 1) {
									// $('#coinPer').val(list[0].userName);
								}
								for (var i = 0; i < list.length; i++) {
									users.push(list[i].userName);
								}
								return process(users);
							}
						})
			}

		});
		$('.btn-add-coin-user').click(function() {
			var coinPer = $('#coinPer').val();
			var coinuser = $('#coinuser').val();
			var userArray = coinuser.split(',');
			var mobile = /^[\da-zA-Z]+$/;
			var isExist = false
			if ($.trim(coinPer) !== '' && userArray.length < 5
					) {
				for (var i = 0; i < userArray.length; i++) {
					if (coinPer === userArray[i]) {
						isExist = true;
						break;
					}
				}
				if (coinuser === '') {
					$('#coinuser').val(coinPer);
				} else if (!isExist) {
					$('#coinuser').val(coinuser + ',' + coinPer);
				} else {
					Lobibox.alert('error', {
								'msg' : '已添加，不需要再添加'
							});
				}
			} else if (userArray.length >= 5) {
				Lobibox.alert('error', {
							'msg' : '已经有5个用户，不能再添加'
						})
			}
			$('#coinPer').val('');
		});
	});
