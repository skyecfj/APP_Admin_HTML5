require([
	'./assets/js/vendor/jquery.min',
	'./assets/js/vendor/crypto-js',
	'./assets/js/vendor/lobibox.min',
	'./assets/js/page',
	'./assets/js/vendor/jquery.cookie',
	'./assets/js/vendor/jquery.md5',
	'./assets/js/vendor/jquery.pnotify',
	'./assets/js/vendor/jquery.validate.min',
	'./assets/js/vendor/bootstrap3-typeahead',
], function($, CryptoJS,Lobibox) {
	var idDes = $.cookie("alphagu_user_id");
	var userId = decryptByDES(idDes,
			'insigmahengtiansofthta!$#$%%$%&^%*<');
	$(function(){
		$('#add-temp-operator').val($.cookie('alphaguUserName'));
		$.extend($.validator.messages, {
			required: "必填",
		});
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
		 			var list=resp.data;
		 			var html='';
		 			$.each(list,function(i,v){
		 				html+='<option value="'+v.id+'">'+v.userName+'</option>';
		 			});
		 			$('#temp-operator-search').append(html);
		 		}
		 	}
		});
		showSmsList(null,null,1,10);
	})
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
	//加载短信模板列表
	function showSmsList(name,operator,page,size){
		var url;
		if(name===null && operator===null){
			url='/APP-admin/sms/template/list?page='+page+'&size='+size;
		}else if(name!==null && operator===null){
			url='/APP-admin/sms/template/list?name='+name+'&page='+page+'&size='+size;
		}else if(name===null && operator!==null){
			url='/APP-admin/sms/template/list?operator='+operator+'&page='+page+'&size='+size;
		}else{
			url='/APP-admin/sms/template/list?name='+name+'&operator='+operator+'&page='+page+'&size='+size;
		}
	  $.ajax({
		 	type : "GET",
		 	url : url,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var list=resp.data.list;
		 			var html='';
		 			$.each(list,function(i,v){
		 				html+='<tr>'
		 				+'<td>'+v.id+'</td>'
		 				+'<td>'+v.name+'</td>'
		 				+'<td>'+v.operatorName+'</td>'
		 				+'<td>'+v.content+'</td>'
		 				+'<td>'
		 				+'<button data-id="'+v.id+'" class="btn btn-primary temp-show" title="详情"><i class="glyphicon glyphicon-eye-open"></i></button>'
						+'<button data-id="'+v.id+'" class="btn btn-primary temp-edit" title="编辑"><i class="glyphicon glyphicon-edit"></i></button>'
						+'<button data-id="'+v.id+'" class="btn btn-warning temp-delete" title="删除"><i class="glyphicon glyphicon-trash"></i></button>'
		 				+'</td>'
		 				+'</tr>';
		 			});
		 			$('.temp-body').html(html);
		 			var total = (resp.data.totalCount / 10);
					if (total % 1 !== 0) {
						total = parseInt(total) + 1;
					}
		 			$("#temp-list-page").createPage({
						total : total,
						page : page,
						callback : function(page) {
							$(".temp-body").empty();
							showSmsList($('#temp-name-search').val(),$('#temp-operator-search').val(),page,10);
						}
					});
		 		}
		 	}
		});
	}
	//查询短信模板列表
	$('#temp-search-btn').click(function(){
		var tempName=$('#temp-name-search').val()||null;
		var operator=$('#temp-operator-search').val()||null;
		showSmsList(tempName,operator,1,10);
	});
//添加模板
	$('#add-temp-content').on('keyup',function(){
		var n=$(this).val().length;
		$('#add-temp-numleft').html(100-n);
	});
	$('#add-sms-temp-btn').click(function(){
		if($('#add-sms-temp').validate().form()){
			var data={
				'name':$('#add-temp-name').val(),
				'content':$('#add-temp-content').val(),
				'createTime':new Date().getTime(),
				'operator':userId
			};
			$.ajax({
			 	type : "POST",
			 	url : '/APP-admin/sms/template/add',
			 	contentType : "application/json;charset=UTF-8",
			 	dataType : "json",
			 	async : false,
			 	timeout : 8000,
			 	data:JSON.stringify(data),
			 	success : function(resp) {
			 		console.log(resp)
			 		$('#add-temp-content').val('');
			 		$('#add-temp-name').val('');
			 		$('#add-temp-numleft').html(100);
			 		$('#addTemplateModal').modal('hide');
			 		showSmsList($('#temp-name-search').val(),$('#temp-operator-search').val(),1,10);
			 		Lobibox.notify('success',{
						msg : "短信模板成功!",
						sound:false,
						width : 400,
						delay : 1000
					});
			 	}
			});
		}
	})
	//模板详情
	$('.temp-body').on('click','.temp-show',function(){
		var tempId=$(this).data('id');
		$.ajax({
		 	type : "GET",
		 	url : '/APP-admin/sms/template/'+tempId,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var temp=resp.data;
		 			$('#temp-detail-id').html(temp.id);
		 			$('#temp-detail-name').html(temp.name);
		 			$('#temp-detail-operator').html(temp.operatorName);
		 			if(temp.modifyTime===null){
		 				$('#temp-detail-modifyTime').html(unixToDate(temp.createTime,true));
		 			}else{
		 				$('#temp-detail-modifyTime').html(unixToDate(temp.modifyTime,true));
		 			}
		 			if(temp.modifyTime===null){
		 				$('#temp-detail-modifyByName').html(temp.operatorName);
		 			}else{
		 				$('#temp-detail-modifyByName').html(temp.modifyByName);
		 			}
		 			$('#temp-detail-content').html(temp.content);
		 			$('#temp-detail-modal').modal();
		 		}
		 	}
		});
	});
	//编辑模板显示
	$('.temp-body').on('click','.temp-edit',function(){
		var tempId=$(this).data('id');
		$.ajax({
		 	type : "GET",
		 	url : '/APP-admin/sms/template/'+tempId,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			var temp=resp.data;
		 			$('#temp-edit-id').html(temp.id);
		 			$('#temp-edit-name').val(temp.name);
		 			$('#temp-edit-operatorName').html(temp.operatorName);
		 			if(temp.modifyTime===null){
		 				$('#temp-edit-modifyTime').html(unixToDate(temp.createTime,true));
		 			}else{
		 				$('#temp-edit-modifyTime').html(unixToDate(temp.modifyTime,true));
		 			}
		 			$('#temp-edit-modifyByName').html(temp.modifyByName);
		 			if(temp.modifyTime===null){
		 				$('#temp-edit-modifyByName').html(temp.operatorName);
		 			}else{
		 				$('#temp-edit-modifyByName').html(temp.modifyByName);
		 			}
		 			$('#temp-edit-content').val(temp.content);
		 			$('#edit-temp-numleft').html(100-$('#temp-edit-content').val().length);
		 			$('#temp-edit-modal').modal();
		 		}
		 	}
		});
	});
	$('#temp-edit-content').on('keyup',function(){
		var n=$(this).val().length;
		$('#edit-temp-numleft').html(100-n);
	});
	//保存编辑后模板
	$('#temp-edit-btn').click(function(){
		var data={
			'id':$('#temp-edit-id').html(),
			'name':$('#temp-edit-name').val(),
			'content':$('#temp-edit-content').val(),
			'modifyTime':new Date().getTime(),
			'modifyBy':userId
		};
		$.ajax({
		 	type : "PUT",
		 	url : '/APP-admin/sms/template/update',
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	data:JSON.stringify(data),
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			$('#temp-edit-modal').modal('hide');
		 			showSmsList($('#temp-name-search').val(),$('#temp-operator-search').val(),1,10);
		 			Lobibox.notify('success',{
						msg : "短信模板修改成功!",
						sound:false,
						width : 400,
						delay : 1000
					});
		 		}
		 	}
		});
	});
	//删除模板
	$('.temp-body').on('click','.temp-delete',function(){
		var tempId=$(this).data('id');
		$('#temp-delete-id').val(tempId);
		$('#temp-delete-modal').modal();
	});
	$('#temp-delete-btn').click(function(){
		var tempId=$('#temp-delete-id').val();
		$.ajax({
		 	type : "DELETE",
		 	url : '/APP-admin/sms/template/delete?id='+tempId,
		 	contentType : "application/json;charset=UTF-8",
		 	dataType : "json",
		 	async : false,
		 	timeout : 8000,
		 	success : function(resp) {
		 		if(resp.success){
		 			$('#temp-delete-modal').modal('hide');
		 			showSmsList($('#temp-name-search').val(),$('#temp-operator-search').val(),1,10);
	 				Lobibox.notify('success',{
						msg : "短信模板删除成功!",
						sound:false,
						width : 400,
						delay : 1000
					});
		 		}
		 	}
		});
	});

});
