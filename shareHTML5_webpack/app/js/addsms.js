// require([
//         '../assets/js/vendor/jquery.min',
//         '../assets/js/vendor/lobibox.min',
//         '../assets/js/vendor/crypto-js',
//         '../assets/js/vendor/jquery.md5',
//         '../assets/js/page',
//         '../assets/js/vendor/jquery.pnotify',
//         '../assets/js/vendor/jquery.validate.min',
//         '../assets/js/vendor/bootstrap3-typeahead'
//     ],
//     function($, Lobibox,CryptoJS) {
//         //获取用户id
//         var idDes = $.cookie("alphagu_user_id");
//         var userId = decryptByDES(idDes,
//             'insigmahengtiansofthta!$#$%%$%&^%*<');
//         function decryptByDES(ciphertext, key) {
//             var keyHex = CryptoJS.enc.Utf8.parse(key);
//             // direct decrypt ciphertext
//             var decrypted = CryptoJS.DES.decrypt({
//                 ciphertext : CryptoJS.enc.Base64.parse(ciphertext)
//             }, keyHex, {
//                 mode : CryptoJS.mode.ECB,
//                 padding : CryptoJS.pad.Pkcs7
//             });
//             return decrypted.toString(CryptoJS.enc.Utf8);
//         }
//         //短信余额加载
//         function smsBalance(){
//             $.ajax({
//                 type : "GET",
//                 //url : '/APP-admin/analyse/data/login',
//                 contentType : "application/json;charset=UTF-8",
//                 dataType : "json",
//                 success : function(resp) {
//                     if(resp.success){
//                         $('.sms-balance').html(resp.data);
//                     }
//                 }
//             });
//         }
//         //获取用户组列表
//         function getUserGroups() {
//             var page = 0;
//             var size = 1000;
//             var url = '/APP-admin/user/getUserGroup?page=' + page
//                 + '&size=' + size;
//             $.ajax({
//                 type : "GET",
//                 url : url,
//                 contentType : "application/json;charset=UTF-8",
//                 dataType : "json",
//                 // async : false,
//                 // timeout : 8000,
//                 success : function(msg) {
//                     var list = msg.data.list;
//                     var li_html = "<option value=''>--请选择--</option>";
//                     for (var i = 0; i < list.length; i++) {
//                         var groupId = list[i].id;
//                         var groupName = list[i].name;
//                         var status = list[i].status;
//                         var hiddenClass;
//                         if (status == 1) {
//                             li_html += "<option value='" + groupId
//                                 + "'>" + groupName
//                                 + "</option>";
//                         }
//                     }
//                     $("select#usergroup-select").html(li_html);
//                 }
//             });
//         }
//         //获取模板列表并加载当前模板
//         $(function(){
//             $.ajax({
//                 type : "GET",
//                 url : '/APP-admin/sms/template/list',
//                 contentType : "application/json;charset=UTF-8",
//                 dataType : "json",
//                 async : false,
//                 timeout : 8000,
//                 success : function(resp) {
//                     if(resp.success){
//                         var list=resp.data.list;
//                         var html='<option value="">无</option>';
//                         $.each(list,function(i,v){
//                             html+='<option value="'+v.id+'">'+v.name+'</option>';
//                         });
//                         $('#template-type').html(html);
//                         var tempType=$('#template-type').val();
//                         switchTemplate(tempType);
//                     }
//                 }
//             });
//             getUserGroups();
//         })
//         //切换短信模板
//         function switchTemplate(tempType){
//             if(tempType===''){
//                 return;
//             }
//             $.ajax({
//                 type : "GET",
//                 url : '/APP-admin/sms/template/'+tempType,
//                 contentType : "application/json;charset=UTF-8",
//                 dataType : "json",
//                 async : false,
//                 timeout : 8000,
//                 success : function(resp) {
//                     if(resp.success){
//                         var tempContent=resp.data.content;
//                         $('#sms-temp-content').val(tempContent);
//                         $('#sms-temp-content-num').html(100-$('#sms-temp-content').val().length);
//                     }
//                 }
//             });
//         }
//         $('#template-type').on('change',function(){
//             if($(this).val()==''){
//                 $('#sms-temp-content').val('');
//                 $('#sms-temp-content-num').html(100);
//             }else{
//                 switchTemplate($(this).val());
//             }
//         });
//         $('#sms-temp-content').on('keyup',function(){
//             var n=$(this).val().length;
//             $('#sms-temp-content-num').html(100-n);
//         });
//         //切换不同类型
//         $('.per-category').on('click','input[type=radio]',function(){
//             var value=$(this).val();
//             $('#checked-sms-user').empty();
//             if(value==='0'){
//                 $('#user-list').removeClass('hide');
//                 $('#usergroup-list').addClass('hide');
//                 $('.btn-addbatch-file').addClass('hide');
//                 $('#per-checked').removeClass('hide');
//                 // $('#pergroup-checked').addClass('hide');
//                 $('#check-per-num').html('0');
//             }else if(value==='1'){
//                 $('#user-list').removeClass('hide');
//                 $('#usergroup-list').addClass('hide');
//                 $('.btn-addbatch-file').removeClass('hide');
//                 $('#per-checked').removeClass('hide');
//                 // $('#pergroup-checked').addClass('hide');
//                 $('#check-per-num').html('0');
//             }else if(value==='2'){
//                 $('#user-list').addClass('hide');
//                 $('#usergroup-list').removeClass('hide');
//                 $('.btn-addbatch-file').addClass('hide');
//                 $('#per-checked').removeClass('hide');
//                 $('#checked-sms-usergroup').html('');
//                 // $('#pergroup-checked').removeClass('hide');
//                 $('#check-per-num').html('0');
//             }else{
//                 $('#user-list').addClass('hide');
//                 $('#usergroup-list').addClass('hide');
//                 $('.btn-addbatch-file').addClass('hide');
//                 // $('#pergroup-checked').addClass('hide');
//                 $('#per-checked').addClass('hide');

//                 $.ajax({
//                     url : '/APP-admin/user/count',
//                     type : 'GET',
//                     dataType : 'json',
//                     timeout : 8000,
//                     success : function(resp) {
//                         if(resp.success){
//                             $('#check-per-num').html(resp.data);
//                         }
//                     }
//                 })
//             }
//         });
//         //添加用户
//         $('.btn-add-sms-user').click(function() {
//             var coinPer = $('#add-sms-per').val();
//             var coinuser = $('#checked-sms-user').html();
//             var userArray = coinuser.split(',');
//             var mobile = /^\d+$/;
//             var isExist = false;
//             var type=$('.per-category').find('input[type="radio"]:checked').val();
//             var num=userArray.length;
//             if ($.trim(coinPer) !== '' && mobile.test(coinPer)) {
//                 if(type==='0'){
//                     $('#checked-sms-user').html(coinPer);
//                     $('#check-per-num').html(1);
//                 }else if(type==='1'){
//                     for (var i = 0; i < userArray.length; i++) {
//                         if (coinPer === $(userArray[i]).text()) {
//                             isExist = true;
//                             break;
//                         }
//                     }
//                     if ($.trim(coinuser) === '') {
//                         $('#checked-sms-user').html('<span class="del-user">'+coinPer+'<i class="glyphicon glyphicon-remove"></i></span>');
//                         $('#check-per-num').html(1);
//                     } else if (!isExist) {
//                         $('#checked-sms-user').html(coinuser + '<span>,</span>' + '<span class="del-user">'+coinPer+'<i class="glyphicon glyphicon-remove"></i></span>');
//                         $('#check-per-num').html(num+1);
//                     } else {
//                         Lobibox.alert('error', {
//                             'msg' : '已添加，不需要再添加'
//                         });
//                     }
//                 }else if(type==='2'){
//                     for (var i = 0; i < userArray.length; i++) {
//                         if (coinPer === userArray[i]) {
//                             isExist = true;
//                             break;
//                         }
//                     }
//                     if ($.trim(coinuser) === '') {
//                         $('#checked-sms-user').html(coinPer);
//                         $('#check-per-num').html(1);
//                     } else if (!isExist) {
//                         $('#checked-sms-user').html(coinuser + ',' + coinPer);
//                         $('#check-per-num').html(num+1);
//                     } else {
//                         Lobibox.alert('error', {
//                             'msg' : '已添加，不需要再添加'
//                         });
//                     }
//                 }

//             }else if (!mobile.test(coinPer)) {
//                 Lobibox.alert('error', {
//                     'msg' : '添加用户格式错误，请重新添加'
//                 })
//             }
//             $('#add-sms-per').val('');
//         });
//         //添加用户组
//         $('.btn-addgroup-coin-user').click(function() {
//             var coinPer = $('#usergroup-select').val();
//             var coinuser = $('#checked-sms-usergroup').html();
//             var userArray = coinuser.split(',');
//             var isExist = false;
//             var num=userArray.length;
//             if ($.trim(coinPer) !== '') {
//                 if ($.trim(coinuser) === '') {
//                     $('#checked-sms-usergroup').html(coinPer);
//                     getUserByGroupId(coinPer);
//                 } else {
//                     Lobibox.alert('error', {
//                         'msg' : '只能添加一组用户组'
//                     })
//                 }
//                 $('#check-per-num').html($('#checked-sms-user').html().split(',').length);
//             }else{
//                 Lobibox.alert('error', {
//                     'msg' : '请选择用户组'
//                 })
//             }
//         });
//         //获取用户组中的用户
//         function getUserByGroupId(groupId) {
//             var page = 0;
//             var size = 100000;
//             var htmll='';
//             $.ajax({
//                 type : "GET",
//                 url : '/APP-admin/user/getUserByGroupId?groupId='
//                     + groupId + '&page=' + page + '&size=' + size
//                     + '&rnd=' + Math.random(),
//                 contentType : "application/json;charset=UTF-8",
//                 dataType : "json",
//                 async : false,
//                 timeout : 8000,
//                 success : function(resp) {
//                     if(resp.success){
//                         var list=resp.data.list;
//                         var len=list.length;
//                         if(resp.data.totalCount===0){
//                             return;
//                         }
//                         $.each(list,function(i,v){
//                             htmll = htmll+''+v.userName;
//                             if(i<len-1){
//                                 htmll+=',';
//                             }
//                         });
//                         if($.trim($('#checked-sms-user').html()) === ''){
//                             $('#checked-sms-user').html(htmll);
//                         }else{
//                             htmll =','+htmll;
//                             $('#checked-sms-user').append(htmll);
//                         }

//                     }

//                 }
//             });
//         }
//         function getUrl(arrays) {
//             var url = "";
//             for (var arraysLength = 0; arraysLength < arrays.length; arraysLength++) {
//                 var arr = arrays[arraysLength];
//                 if (arr[1]) {
//                     url += arr[0] + "=" + arr[1] + "&";
//                 }
//             }
//             return url.substring(0, url.length - 1);
//         }
//         // 补全用户名
//         $('#add-sms-per').typeahead({
//             source : function(query, process) {
//                 var arr = [["userName", query], ["startTime", ''],
//                     ["endTime", ''], ["recordType", ''],
//                     ["operator", ''], ["loginTimes", '']];
//                 var urls = getUrl(arr);
//                 var url = '/APP-admin/user/getUserList?' + urls + '&'
//                     + Math.random();
//                 $.ajax({
//                     url : url,
//                     type : 'GET',
//                     dataType : 'json',
//                     timeout : 8000,
//                     success : function(data) {
//                         var list = data.data.list;
//                         var users = [];
//                         if (list.length === 0) {
//                             users.push('');
//                             $('#add-sms-per').val('');
//                         }
//                         if (list.length === 1) {
//                             // $('#coinPer').val(list[0].userName);
//                         }
//                         for (var i = 0; i < list.length; i++) {
//                             users.push(list[i].userName);
//                         }
//                         return process(users);
//                     }
//                 })
//             }

//         });
//         //批量上传筛选已添加的用户
//         function addPushBatchfilter(user){
//             var userlist=$.trim($('#checked-sms-user').html());
//             var msg=true;
//             if(userlist!==''){
//                 var userArr=userlist.split(',');
//                 $.each(userArr,function(i,v){
//                     if(user===$(v).text()){
//                         msg=false;
//                         return;
//                     }
//                 })
//                 return msg;
//             }else{
//                 return true;
//             }
//         }
//         //批量上传
//         $('#btn-addbatch-file').on('change',function(){
//             var that = this;
//             var files = this.files[0];
//             console.log(files)
//             if(files.name.indexOf('.csv')===-1){
//                 Lobibox.alert('error', {
//                     'msg' : '请上传csv格式文件'
//                 })
//             }else{
//                 var form = new FormData();
//                 form.append('csvFile',files);
//                 $.ajax({
//                     url:'/APP-admin/data/import/csv/phone',
//                     data:form,
//                     method:'POST',
//                     contentType:false,
//                     processData: false,
//                     success : function(resp) {
//                         if(resp.success){
//                             var list=resp.data;
//                             var len=list.length;
//                             var phone='';
//                             var slen=0;
//                             $.each(list,function(i,v){
//                                 if(addPushBatchfilter(v)){
//                                     phone = phone+''+'<span class="del-user">'+v+'<i class="glyphicon glyphicon-remove"></i></span>';
//                                     if(i<len-1){
//                                         phone+='<span>,</span>';
//                                     }
//                                     slen++;
//                                 }
//                             })
//                             if(phone===''){
//                                 return;
//                             }else if(phone.lastIndexOf(',')===phone.length-8){
//                                 phone=phone.substring(0,phone.length-14);
//                             }
//                             if($.trim($('#checked-sms-user').html()) === ''){
//                                 $('#checked-sms-user').html(phone);
//                             }else{
//                                 phone ='<span>,</span>'+phone;
//                                 $('#checked-sms-user').append(phone);
//                             }
//                             $('#check-per-num').html(Number($('#check-per-num').html())+slen);
//                             $('#btn-addbatch-file').val('');
//                         }
//                     }
//                 });
//             }
//         });
//         $('#checked-sms-user').on('click','.del-user i',function(e){
//             if($(e.target).parent('.del-user').next().text()===','){
//                 $(e.target).parent('.del-user').next().remove();
//             }else if($(e.target).parent('.del-user').prev().text()===','){
//                 $(e.target).parent('.del-user').prev().remove();
//             }
//             $(e.target).parent('.del-user').remove();
//             $('#check-per-num').html(Number($('#check-per-num').html())-1);
//         });
//         //获取多人短信发送人列表
//         function getReceivers(list){
//             var rec='';
//             var len=list.length;
//             for(var i=0;i<len;i++){
//                 if(i<len-1){
//                     rec+=($(list[i]).text()+',');
//                 }else{
//                     rec+=$(list[i]).text();
//                 }
//             }
//             return rec;
//         }
//         //保存/保存并发送
//         $('.add-sms-btns').on('click','button',function(){
//             var dataType=$(this).data('type');
//             var status;
//             var type=$('.per-category').find('input[type="radio"]:checked').val();
//             if(dataType==='addSmsSave'){
//                 status='0';
//             }else if(dataType==='addSmsSend'){
//                 status='1';
//                 if(type==='3'){
//                     $('#add-send-alluser').modal();
//                     return;
//                 }
//             }
//             var data;
//             if(type==='0'){
//                 if($('#checked-sms-user').html()===''||$('#sms-temp-content').val()===''){
//                     Lobibox.alert('error', {
//                         msg : "已选用户或短信内容不能为空"
//                     });
//                     return;
//                 }
//                 data={
//                     'type':type,
//                     'receiver':$('#checked-sms-user').html(),
//                     "templateId":$('#template-type').val(),
//                     "content":$('#sms-temp-content').val(),
//                     "operator":userId,
//                     "status":status
//                 };
//             }else if(type==='1'){
//                 if($('#checked-sms-user').html()===''||$('#sms-temp-content').val()===''){
//                     Lobibox.alert('error', {
//                         msg : "已选用户或短信内容不能为空"
//                     });
//                     return;
//                 }
//                 var receiverList=getReceivers($('#checked-sms-user').find('.del-user'));
//                 data={
//                     'type':type,
//                     'receiver':receiverList,
//                     "templateId":$('#template-type').val(),
//                     "content":$('#sms-temp-content').val(),
//                     "operator":userId,
//                     "status":status
//                 };
//             }else if(type==='2'){
//                 if($('#checked-sms-user').html()===''||$('#sms-temp-content').val()===''){
//                     Lobibox.alert('error', {
//                         msg : "已选用户或短信内容不能为空"
//                     });
//                     return;
//                 }
//                 data={
//                     'type':type,
//                     "templateId":$('#template-type').val(),
//                     "content":$('#sms-temp-content').val(),
//                     "operator":userId,
//                     "status":status,
//                     "userGroupId":$('#checked-sms-usergroup').html()
//                 };
//             }else if(type==='3'){
//                 if($('#sms-temp-content').val()===''){
//                     Lobibox.alert('error', {
//                         msg : "短信内容不能为空"
//                     });
//                     return;
//                 }
//                 data={
//                     'type':type,
//                     "templateId":$('#template-type').val(),
//                     "content":$('#sms-temp-content').val(),
//                     "operator":userId,
//                     "status":status
//                 };
//             }
//             $.ajax({
//                 url : '/APP-admin/sms/add',
//                 type : 'POST',
//                 dataType : 'json',
//                 contentType : "application/json;charset=UTF-8",
//                 data:JSON.stringify(data),
//                 timeout : 8000,
//                 success : function(resp) {
//                     if(resp.success){
//                         if(status==='0'){
//                             Lobibox.notify('success', {
//                                 msg : "短信保存成功",
//                                 sound:false,
//                                 delay:1000
//                             });
//                         }else{
//                             Lobibox.notify('success', {
//                                 msg : "短信保存并发送成功",
//                                 sound:false,
//                                 delay:1000
//                             });
//                         }
//                         smsBalance();
//                         $('#add-sms-per').val('');
//                         $('#checked-sms-user').html('');
//                         $('#checked-sms-usergroup').html('');
//                         $('#check-per-num').html(0);
//                     }
//                 }
//             })
//         })
//         //确认发给所有用户
//         $('.add-send-alluser-btn').on('click',function(){
//             var data={
//                 'type':'3',
//                 "templateId":$('#template-type').val(),
//                 "content":$('#sms-temp-content').val(),
//                 "operator":userId,
//                 "status":'1'
//             };
//             $.ajax({
//                 url : '/APP-admin/sms/add',
//                 type : 'POST',
//                 dataType : 'json',
//                 contentType : "application/json;charset=UTF-8",
//                 data:JSON.stringify(data),
//                 timeout : 8000,
//                 success : function(resp) {
//                     if(resp.success){
//                         Lobibox.notify('success', {
//                             msg : "短信保存并发送成功",
//                             sound:false,
//                             delay:1000
//                         });
//                         $('#add-sms-per').val('');
//                         $('#checked-sms-user').html('');
//                         $('#checked-sms-usergroup').html('');
//                         smsBalance();
//                     }
//                 }
//             })
//         })
//     });
