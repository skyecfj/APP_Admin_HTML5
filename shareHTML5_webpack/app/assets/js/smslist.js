require([
		'./assets/js/vendor/jquery.min',
		'./assets/js/vendor/lobibox.min',
		'./assets/js/vendor/crypto-js',
		'./assets/js/page',
	 	'./assets/js/vendor/jquery.pnotify',
		'./assets/js/vendor/jquery.validate.min',
		'./assets/js/vendor/bootstrap3-typeahead',
	],
function($, Lobibox,CryptoJS) {

	$(function(){
		getSMSList(1,10);
		getUserList();
	})
	//获取用户id
	var idDes = $.cookie("alphagu_user_id");
	var userId = decryptByDES(idDes,
			'insigmahengtiansofthta!$#$%%$%&^%*<');
	function decryptByDES(ciphertext, key) {
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		// direct decrypt ciphertext
		var decrypted = CryptoJS.DES.decrypt({
			ciphertext : CryptoJS.enc.Base64.parse(ciphertext)
		}, keyHex, {
			mode : CryptoJS.mode.ECB,
			padding : CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
	function unixToDate(unixTime, isFull, timeZone) {
    if (typeof (timeZone) === 'number')
    {
        unixTime = parseInt(unixTime, 10) + parseInt(timeZone, 10) * 60 * 60;
    }
    var time = new Date(unixTime);
    var ymdhis = '';
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    month = month < 10 ? '0'+month : month;
    date = date < 10 ? '0'+date : date;
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;

    ymdhis += year + '-' + month + '-' + date;
    if (isFull === true)
    {
        ymdhis += ' ' + hours + ':' + minutes + ':' + seconds;
    }
    return ymdhis;
	}
	function checkTime() {
			var startTime = $("#smssend-start-time").val();
			var endTime = $("#smssend-end-time").val();
			if (startTime > endTime) {
				$(".sms-checktime").removeClass("hiddens");
			} else {
				$(".sms-checktime").addClass("hiddens");
			}
			if (endTime === '' || startTime === '') {
				$(".sms-checktime").addClass("hiddens");
			}
		}

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
	function switchType(type){
		switch(type){
			case '0':
			return '个人';
			case '1':
			return '多人';
			case '2':
			return '用户组';
			case '3':
			return '全部';
		};
	}
		//短信余额加载
	function smsBalance(){
		$.ajax({
			type : "GET",
			url : '/APP-admin/sms/status',
			contentType : "application/json;charset=UTF-8",
			dataType : "json",
			success : function(resp) {
				if(resp.success){
					var data=resp.data;
					if(data.status=='Sucess'){
						$('.sms-balance').html(data.overage);
					}else{
						$('.sms-balance').html(0);
					}
				}
			}
		});
	}

	//获取管理员列表
	function getUserList() {
		var url = "/APP-admin/user/admin/list";
		$.ajax({
			type : "GET",
			url : url,
			contentType : "application/json;charset=UTF-8",
			dataType : "json",
			async : false,
			timeout : 8000,
			success : function(resp) {
				if(resp.success){
					var list = resp.data;
					var li_html = "<option value=''>--请选择--</option>";
					for (var i = 0; i < list.length; i++) {
						var groupId = list[i].id;
						var groupName = list[i].userName;
						var status = list[i].userType;
						if (status === '1'||status === '2') {
							li_html += "<option value='" + groupId
									+ "'>" + groupName
									+ "</option>";
						}
					}
					$("select#sms-creater").html(li_html);
				}
			}
		});
	}
	//加载短信列表
	function smsLoadList(list) {
		var li_html = "";
		for (var i = 0; i < list.length; i++) {
			var createTime = unixToDate(list[i].createTime);
			li_html += '<tr><td >'+list[i].id+'</td><td>'+(list[i].status==='0'?'未发送':'已发送')+'</td>';
			if(list[i].status==='1'){
				li_html +='<td>'+createTime+'</td>';
			}else{
				li_html +='<td></td>';
			}
			li_html += '<td>' + switchType(list[i].type) + '</td><td>' + list[i].operatorName + '</td>';
			if(list[i].status==='1'){
				li_html +='<td>'
					+'<button data-id="'+list[i].id+'" data-type="'+list[i].type+'" class="btn btn-primary smslist-detail">详情</button>'
					+'</td>';
			}else{
				li_html +='<td>'
					+'<button data-id="'+list[i].id+'" data-type="'+list[i].type+'" class="btn btn-primary smslist-edit">编辑</button>'
					+'<button data-id="'+list[i].id+'" data-type="'+list[i].type+'" class="btn btn-primary smslist-send">发送</button>'
					+'<button data-id="'+list[i].id+'" data-type="'+list[i].type+'" class="btn btn-warning smslist-delete">删除</button>'
					+'</td>';
			}
			li_html += "</tr>";
		}
		$(".sms-list-body").html(li_html);
	}
	// 获取短信列表
	function getSMSList(page,size,id,operator,type,status,startDate,endDate) {
		var data;
		if(type===''&&status===''){
			data = {
				page:page,
				size:size,
				id:id,
				operator:operator,
				startDate:startDate,
				endDate:endDate
			};
		}else if(type===''){
			data = {
				page:page,
				size:size,
				id:id,
				operator:operator,
				status:status,
				startDate:startDate,
				endDate:endDate
			};
		}else if(status===''){
			data = {
				page:page,
				size:size,
				id:id,
				operator:operator,
				type:type,
				startDate:startDate,
				endDate:endDate
			};
		}else{
			data = {
				page:page,
				size:size,
				id:id,
				operator:operator,
				type:type,
				status:status,
				startDate:startDate,
				endDate:endDate
			};
		}

		$.ajax({
			type : "POST",
			url : '/APP-admin/sms/list',
			contentType : "application/json;charset=UTF-8",
			dataType : "json",
			async : false,
			data:JSON.stringify(data),
			timeout : 8000,
			success : function(resp) {
				if(resp.success){
					smsLoadList(resp.data.list);
					smsTotalCount = resp.data.totalCount;
					var total = (smsTotalCount / 10);
					if (total % 1 !== 0) {
						total = parseInt(total) + 1;
					}
					$("#sms-list-page").createPage({
						total : total,
						page : page,
						callback : function(page) {
							$(".sms-list-body").empty();
							getSMSList(page,size,id,operator,type,status,startDate,endDate);
						}
					});
				}
			}
		});
	}

	//查询短信列表
	$("#sms-list-searchbtn").click(function() {
		checkTime();
		$(".sms-list-body").empty();
		var id=$('#sms-batch-num').val(),
			operator=$('#sms-creater').val(),
			type=$('#sms-send-type').val(),
			status=$('#sms-send-status').val(),
			startDate=$('#smssend-start-time').val(),
			endDate=$('#smssend-end-time').val();
			getSMSList(1,10,id,operator,type,status,startDate,endDate);
	});

	//短信详情查看
	$('.sms-list-body').on('click','.smslist-detail',function(){
		var smsId=$(this).data('id');
		var smsType=$(this).data('type');
		$.ajax({
		 	type : "GET",
		 	url : '/APP-admin/sms/'+smsId,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var content=resp.data;
		 			var createTime = unixToDate(content.createTime);
		 			$('#sms-detail-batch-id').html(content.id);
		 			$('#sms-detail-type').html(switchType(content.type));
		 			$('#sms-detail-sendtime').html(createTime);
		 			$('#sms-detail-creater').html(content.operatorName);
		 			$('#sms-detail-sendnum').html(content.count);
		 			$('#sms-detail-tempname').html(content.templateName);
		 			if(smsType==='2'){
		 				$('#sms-detail-usergroup').html(content.usergroup).removeClass('hide');
		 			}else{
		 				$('#sms-detail-usergroup').addClass('hide');
		 			}
		 			$('.sms-detail-sendtotal').html(content.receiver);
		 			$('.sms-detail-sendcontent').html(content.content);
		 			$('#sms-detail-modal').modal();
		 		}
		 	}
		});
	});

	//编辑短信显示
	$(function(){
		// 获取创建人列表
		getUserGroup();
	})
	//获取用户组
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
				$("select#sms-edit-group").html(li_html);
			}
		});
	}
	$('#sms-edit-temptype').on('change',function(){
		if($(this).val()===''){
			$('#sms-edit-content').val($('#sms-edit-content-request').val());
		 	$('#sms-edit-content-num').html(100-$('#sms-edit-content').val().length);
		}else{
			switchTemplate($(this).val());
		}

	});
		//编辑短信添加用户
	$('.btn-sms-edit-user').click(function() {
		var coinPer = $('#sms-edit-per').val();
		var coinuser = $('#sms-edit-user-total').html();
		var userArray = coinuser.split(',');
		var mobile = /^\d+$/;
		var isExist = false;
		var type=$('#sms-edit-type').data('type');
		if ($.trim(coinPer) !== '' && mobile.test(coinPer)) {
			if(type=='0'){
				$('#sms-edit-user-total').html(coinPer);
			}else if(type=='1'){
				for (var i = 0; i < userArray.length; i++) {
					if (coinPer === $(userArray[i]).text()) {
						isExist = true;
						break;
					}
				}
				if ($.trim(coinuser) === '') {
					$('#sms-edit-user-total').html('<span class="del-user">'+coinPer+'<i class="glyphicon glyphicon-remove"></i></span>');
				} else if (!isExist) {
					$('#sms-edit-user-total').html(coinuser + '<span>,</span>' + '<span class="del-user">'+coinPer+'<i class="glyphicon glyphicon-remove"></i></span>');
				} else {
					Lobibox.alert('error', {
						'msg' : '已添加，不需要再添加'
					});
				}
			}

		}else if (!mobile.test(coinPer)) {
			Lobibox.alert('error', {
				'msg' : '添加用户格式错误，请重新添加'
			})
		}
		$('#sms-edit-per').val('');
	});
	//批量上传筛选已添加的用户
	function addPushBatchfilter(user){
		var userlist=$.trim($('#sms-edit-user-total').html());
		var msg=true;
		if(userlist!==''){
			var userArr=userlist.split(',');
			$.each(userArr,function(i,v){
				if(user===$(v).text()){
					msg=false;
					return;
				}
			})
			return msg;
		}else{
			return true;
		}
	}
	//批量上传
 $('#btn-edit-smsbatch-file').on('change',function(){
    var that = this;
    var files = this.files[0];
    console.log(files)
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
	      			if(addPushBatchfilter(v)){
	      				phone = phone+''+'<span class="del-user">'+v+'<i class="glyphicon glyphicon-remove"></i></span>';
							if(i<len-1){
								phone+='<span>,</span>';
							}
	      			}

	      		})
	      		if(phone===''){
	      			return;
	      		}else if(phone.lastIndexOf(',')===phone.length-8){
	      			phone=phone.substring(0,phone.length-14);
	      		}
	      		if($.trim($('#sms-edit-user-total').html()) === ''){
							$('#sms-edit-user-total').html(phone);
						}else{
							phone ='<span>,</span>'+phone;
							$('#sms-edit-user-total').append(phone);
						}
						$('#btn-edit-smsbatch-file').val('');
	      	}
	      }
	    });
    }
  });
	// 补全用户名
	$('#sms-edit-per').typeahead({
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
						$('#add-sms-per').val('');
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
	//获取模板列表并加载当前模板
	$(function(){
		$.ajax({
		 	type : "GET",
		 	url : '/APP-admin/sms/template/list',
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var list=resp.data.list;
		 			var html='<option value="">无</option>';
		 			$.each(list,function(i,v){
		 				html+='<option value="'+v.id+'">'+v.name+'</option>';
		 			});
		 			$('#sms-edit-temptype').html(html);
		 		}
		 	}
		});
	})
	//切换短信模板
	function switchTemplate(tempType){
		$.ajax({
		 	type : "GET",
		 	url : '/APP-admin/sms/template/'+tempType,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var tempContent=resp.data.content;
		 			$('#sms-edit-content').val(tempContent);
		 			$('#sms-edit-content-num').html(100-$('#sms-edit-content').val().length);
		 		}
		 	}
		});
	}
	//加载多人选中用户信息
	function getEditReceivers(data){
  	var rec='';
  	var list=data.split(',');
  	var len=list.length;
  	for(var i=0;i<len;i++){
  		if(i<len-1){
  			rec+=('<span class="del-user">'+list[i]+'<i class="glyphicon glyphicon-remove"></i></span><span>,</span>');
  		}else{
  			rec+=('<span class="del-user">'+list[i]+'<i class="glyphicon glyphicon-remove"></i></span>');
  		}
  	}
  	return rec;
  }
	//获取多人短信发送人列表
  function getReceivers(list){
  	var rec='';
  	var len=list.length;
  	for(var i=0;i<len;i++){
  		if(i<len-1){
  			rec+=($(list[i]).text()+',');
  		}else{
  			rec+=$(list[i]).text();
  		}
  	}
  	return rec;
  }
	//编辑短信显示信息
	$('.sms-list-body').on('click','.smslist-edit',function(){
		var smsId=$(this).data('id');
		var type=$(this).data('type');
		if(type=='0'){
			$('.sms-edit-usergroup').addClass('hide');
			$('.sms-edit-userlist').removeClass('hide');
			$('.btn-smsbatch-file').addClass('hide');
		}else if(type=='1'){
			$('.sms-edit-usergroup').addClass('hide');
			$('.sms-edit-userlist').removeClass('hide');
			$('.btn-smsbatch-file').removeClass('hide');
		}else if(type=='2'){
			$('.sms-edit-usergroup').removeClass('hide');
			$('.sms-edit-userlist').addClass('hide');
		}else{
			$('.sms-edit-usergroup').addClass('hide');
			$('.sms-edit-userlist').addClass('hide');
		}
		$.ajax({
		 	type : "GET",
		 	url : '/APP-admin/sms/'+smsId,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var content=resp.data;
					var createTime = unixToDate(content.createTime);
		 			$('#sms-edit-batch-id').html(content.id);
		 			$('#sms-edit-type').html(switchType(content.type)).attr('data-type',content.type);
		 			$('#sms-edit-createtime').html(createTime);
		 			$('#sms-edit-creater').html(content.operatorName);
		 			$('#sms-edit-sendnum').html(content.count);
		 			$('#sms-edit-temptype').val(content.templateId);
		 			if(type=='2'){
		 				$('#sms-edit-group').val(content.userGroupId);
		 				$('.sms-edit-usergroup').removeClass('hide');
		 			}else{
		 				$('.sms-edit-usergroup').addClass('hide');
		 			}
		 			$('#sms-edit-content-request').val(content.content);
					$('#sms-edit-content').val(content.content);
					if(content.type==='1'){
						$('#sms-edit-user-total').html(getEditReceivers(content.receiver));
					}else{
						$('#sms-edit-user-total').html(content.receiver);
					}
		 			$('#sms-edit-content-num').html(100-$('#sms-edit-content').val().length);
		 			$('#sms-edit-modal').modal();
		 		}
		 	}
		});
	});
	$('#sms-edit-content').on('keyup',function(){
		var n=$(this).val().length;
		$('#sms-edit-content-num').html(100-n);
	});
	$('#sms-edit-user-total').on('click','.del-user i',function(e){
  	if($(e.target).parent('.del-user').next().text()===','){
  		$(e.target).parent('.del-user').next().remove();
  	}else if($(e.target).parent('.del-user').prev().text()===','){
  		$(e.target).parent('.del-user').prev().remove();
  	}
  	$(e.target).parent('.del-user').remove();
  	$('#check-per-num').html(Number($('#check-per-num').html())-1);
  });
	//获取用户组中的用户
	function getUserByGroupId(groupId) {
		var page = 0;
		var size = 100000;
		var htmll='';
		$.ajax({
			type : "GET",
			url : '/APP-admin/user/getUserByGroupId?groupId='
					+ groupId + '&page=' + page + '&size=' + size
					+ '&rnd=' + Math.random(),
			contentType : "application/json;charset=UTF-8",
			dataType : "json",
			async : false,
			timeout : 8000,
			success : function(resp) {
				if(resp.success){
					var list=resp.data.list;
					var len=list.length;
					if(resp.data.totalCount===0){
						$('#sms-edit-user-total').html('');
						return;
					}
					$.each(list,function(i,v){
						htmll = htmll+''+v.userName;
						if(i<len-1){
							htmll+=',';
						}
					});
					$('#sms-edit-user-total').html(htmll);
				}
			}
		});
	}
	// 编辑用户组选择按钮
	$('#sms-edit-group').on('change',function() {
		var coinPer = $('#sms-edit-group').val();
		var coinuser = $('#sms-edit-user-total').html();
		var userArray = coinuser.split(',');
		var isExist = false;
		if ($.trim(coinPer) !== '') {
			getUserByGroupId(coinPer);
		}else{
			Lobibox.alert('error', {
				'msg' : '请选择用户组'
			})
		}
	});
	//编辑后保存并发送短信
	$('.sms-edit-sendbtn').click(function(){
		var type=$('#sms-edit-type').data('type');
		var status=$(this).data('status');
		var data;
		if(type=='0'){
			if($('#sms-edit-temptype').val()===''){
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					'receiver':$('#sms-edit-user-total').html(),
					"content":$('#sms-edit-content').val(),
					"status":status
				};
			}else{
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					'receiver':$('#sms-edit-user-total').html(),
					"templateId":$('#sms-edit-temptype').val(),
					"content":$('#sms-edit-content').val(),
					"status":status
				};
			}

		}else if(type=='1'){
			if($('#sms-edit-temptype').val()===''){
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					'receiver':getReceivers($('#sms-edit-user-total').find('.del-user')),
					"content":$('#sms-edit-content').val(),
					"status":status
				};
			}else{
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					'receiver':getReceivers($('#sms-edit-user-total').find('.del-user')),
					"templateId":$('#sms-edit-temptype').val(),
					"content":$('#sms-edit-content').val(),
					"status":status
				};
			}
		}else if(type=='2'){
			if($('#sms-edit-temptype').val()===''){
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					"content":$('#sms-edit-content').val(),
					"userGroupId":$('#sms-edit-group').val(),
					"status":status
				};
			}else{
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					"templateId":$('#sms-edit-temptype').val(),
					"content":$('#sms-edit-content').val(),
					"userGroupId":$('#sms-edit-group').val(),
					"status":status
				};
			}

		}else if(type=='3'){
			if($('#sms-edit-temptype').val()===''){
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					"content":$('#sms-edit-content').val(),
					"status":status
				};
			}else{
				data={
					'id':$('#sms-edit-batch-id').html(),
					'type':type,
					"templateId":$('#sms-edit-temptype').val(),
					"content":$('#sms-edit-content').val(),
					"status":status
				};
			}

		}
		$.ajax({
			url : '/APP-admin/sms/update',
			type : 'PUT',
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			data:JSON.stringify(data),
			timeout : 8000,
			success : function(resp) {
				if(resp.success){
					$('#sms-edit-modal').modal('hide');
					$("#sms-list-searchbtn").trigger('click');
					smsBalance();
					Lobibox.notify('success', {
						msg : "短信编辑成功",
						sound:false,
						delay:1000
					});
				}
			}
		})
	})
	//发送短信
	$('.sms-list-body').on('click','.smslist-send',function(){
		var smsId=$(this).data('id');
		$.ajax({
		 	type : "GET",
		 	url : '/APP-admin/sms/'+smsId,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var data=resp.data;
		 			$('#sms-send-id').val(data.id);
		 			$('#sms-send-modal-type').val(data.type);
		 			$('#sms-send-receiver').val(data.receiver);
		 			$('#sms-send-templateId').val(data.templateId);
		 			$('#sms-send-content').val(data.content);
		 			$('#sms-send-usergroup').val(data.userGroupId);
					$('#sms-send-user-one').html(data.receiver.split(',')[0]);
					$('#sms-send-user-total').html(data.count);
		 		}
		 	}
		});

		$('#sms-send-modal').modal();
	});
	//确认发送短信
	$('#sms-send-sure').click(function(){
		var smsId=$('#sms-send-id').val();
		var type=$('#sms-send-modal-type').val();
		var data;
		if(type=='0'||type=='1'){
			data={
				'id':$('#sms-send-id').val(),
				'type':type,
				'receiver':$('#sms-send-receiver').val(),
				"templateId":$('#sms-send-templateId').val(),
				"content":$('#sms-send-content').val(),
				"status":'1'
			};
		}else if(type=='2'){
			data={
				'id':$('#sms-send-id').val(),
				'type':type,
				'userGroupId':$('#sms-send-usergroup').val(),
				"templateId":$('#sms-send-templateId').val(),
				"content":$('#sms-send-content').val(),
				"status":'1'
			};
		}else if(type=='3'){
			data={
				'id':$('#sms-send-id').val(),
				'type':type,
				"templateId":$('#sms-send-templateId').val(),
				"content":$('#sms-send-content').val(),
				"status":'1'
			};
		}
		$.ajax({
			url : '/APP-admin/sms/update',
			type : 'PUT',
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			data:JSON.stringify(data),
			timeout : 8000,
			success : function(resp) {
				if(resp.success){
					$('#sms-send-modal').modal('hide');
					$("#sms-list-searchbtn").trigger('click');
					smsBalance();
					Lobibox.notify('success', {
						msg : "短信保存并发送成功",
						sound:false,
						delay:1000
					});
				}
			}
		})
	})
	//删除短信
	$('.sms-list-body').on('click','.smslist-delete',function(){
		var smsId=$(this).data('id');
		$('#sms-delete-id').val(smsId);
		$('#sms-delete-modal').modal();
	});
	//确认删除短信
	$('#sms-delete-sure').click(function(){
		var smsId=$('#sms-delete-id').val();
		$.ajax({
		 	type : "DELETE",
		 	url : '/APP-admin/sms/delete?id='+smsId,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			$("#sms-delete-modal").modal('hide');
					$("#sms-list-searchbtn").trigger('click');
		 			Lobibox.notify('success', {
						msg : "短信删除成功",
						sound:false,
						delay:1000
					});
		 		}
		 	}
		});
	})
});
