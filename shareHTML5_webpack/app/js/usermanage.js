// require([
//         '../assets/js/vendor/jquery.min',
//         '../assets/js/vendor/crypto-js',
//         '../assets/js/vendor/echarts',
//         '../assets/js/vendor/lobibox.min',
//         '../assets/js/vendor/jquery.dataTables',
//         '../assets/js/vendor/bootstrap.min',
//         '../assets/js/vendor/jquery.cookie',
//         '../assets/js/vendor/jquery.md5',
//         '../assets/js/vendor/jquery.validate.min'
// ],
// function($, CryptoJS, echarts, Lobibox) {
//     $(function() {
//         deleteUser();
//         $("#addUser").click(function(event) {
//             /* Act on the event */
//             $('#addUserModal').find('label.error').hide();
//             $("#addUserModal").modal("show");
//             $('.modal-title').text('添加用户')
//             $('#name').val("");
//             $("#password").val("");
//             $("#email").val("");
//             $("#phonenum").val("");

//         });
//         $("#addUserModal").on('click', '#add', function(event) {
//             var name = $("#name").val();
//             var userType = $(".usertype:checked").val();
//             var email = $("#email").val();
//             var phonenum = $("#phonenum").val();
//             var user = {
//                 "userName" : name,
//                 "userType" : userType,
//                 "email" : email,
//                 "phone" : phonenum
//             }
//             var check = validAddForm().form();
//             if (check) {

//                 $.ajax({
//                     url : "/APP-admin/user/add",
//                     type : 'POST',
//                     dataType : 'json',
//                     contentType : 'application/json',
//                     processData : false,
//                     crossDomain : true,
//                     data : JSON.stringify(user),
//                     success : function(data) {
//                         if (data.success) {

//                             $("#addUserModal").modal("hide");
//                             Lobibox.notify('success', {
//                                 msg : "用户添加成功!用户名和密码已发送到对应邮箱",
//                                 width : 400,
//                                 sound:false,
//                                 delay : 1000

//                             });

//                             $("#usertable tbody tr").remove();
//                             getUsers(1);

//                         } else {
//                             Lobibox.alert('error', {
//                                 msg : "用户添加失败!",
//                                 width : 400,
//                                 delay : 1000

//                             });
//                         }
//                     },
//                     error : function(jqXHR, testStatus,
//                                      errorThrow) {
//                         console.log(jqXHR);

//                     }
//                 });

//             }
//         });
//         $("#usertable").on('click', '.reset', function(event) {
//             var userId = $(this).parents("tr").attr("data-id");
//             Lobibox.confirm({
//                 msg:'确认该账户要重置密码吗？',
//                 callback:function($this,type,ev){
//                     if(type==='yes'){
//                         $.ajax({
//                             url : '/APP-admin/user/resetpwd?userId='
//                                 + userId,
//                             type : 'PUT',
//                             dataType : 'json',
//                             success : function(resp) {
//                                 if(resp.success){
//                                     Lobibox.notify('success', {
//                                         msg : "密码已重置,新密码已发送到对应邮箱",
//                                         width : 400,
//                                         sound:false,
//                                         delay : 1000
//                                     });
//                                 }else{
//                                     Lobibox.notify('error', {
//                                         msg : resp.msg,
//                                         width : 400,
//                                         sound:false,
//                                         delay : 1000
//                                     });
//                                 }
//                             }
//                         });
//                     }
//                 }
//             });
//         });
//         $("#usertable").on('click', '.update', function(event) {
//             var userName=$.cookie('alphaguUserName'),
//                 userId = $(this).parents("tr").attr("data-id"),
//                 typeName=$(this).parents('tr').find('td:nth-child(3)').text(),
//                 type;
//             if(typeName==='管理员'){
//                 type='1';
//             }else if(typeName==='分析师'){
//                 type='0';
//             }else if(typeName==='运营管理员'){
//                 type='2';
//             }
//             $('.update-usertype[value="'+type+'"]').prop('checked',true);
//             $('#update-name').html($(this).parents('tr').find('td:nth-child(1)').text()).attr('data-id',userId);
//             $('#update-email').val($(this).parents('tr').find('td:nth-child(4)').text());
//             $('#update-phonenum').val($(this).parents('tr').find('td:nth-child(5)').text());
//             if(userName!=='admin'){
//                 $('.update-admin').addClass('hide');
//             }else{
//                 $('.update-admin').removeClass('hide');
//             }
//             $('#updateUserModal').find('label.error').hide();
//             $('#updateUserModal').modal();
//         });
//         $('#update-submit').click(function(){
//             var id=$('#update-name').attr('data-id'),
//                 type=$('.update-usertype:checked').val(),
//                 email=$('#update-email').val(),
//                 phonenum=$('#update-phonenum').val();
//             var check=validUpdateForm().form();
//             if(check){
//                 $.ajax({
//                     url:'/APP-admin/user/updateUserInformation',
//                     type:'PUT',
//                     dataType:'json',
//                     contentType:'application/json;charset=utf-8',
//                     data:JSON.stringify({
//                         "id" : id,
//                         "userType" : type,
//                         "email" : email,
//                         "phone" : phonenum
//                     }),
//                     success:function(resp){
//                         if(resp.success){
//                             $('#updateUserModal').modal('hide');
//                             $("#usertable tbody tr").remove();
//                             getUsers(1);
//                             Lobibox.notify('success',{
//                                 msg:'信息变更成功',
//                                 sound:false,
//                                 delay:1000
//                             });
//                         }
//                     }
//                 });
//             }
//         });
//         jQuery.validator.addMethod("isPhonenumer", function(value,
//                                                             element) {
//             var mobile = /^1[3|4|5|7|8]\d{9}$/;

//             return this.optional(element) || mobile.test(value);

//         }, '请输入正确手机号');

//         function validAddForm() {
//             return $("#adduserform").validate({
//                 rules : {
//                     name : {
//                         required : true
//                     },
//                     email : {
//                         required : true,
//                         email : true
//                     },
//                     phonenum : {

//                         isPhonenumer : true
//                     }

//                 },
//                 messages : {
//                     name : {
//                         required : "请输入用户名"
//                     },

//                     email : {
//                         required : "请输入邮箱",
//                         email : "请输入正确邮箱"
//                     }

//                 }

//             });
//         };
//         function validUpdateForm() {
//             return $("#updateuserform").validate({
//                 rules : {
//                     email : {
//                         required : true,
//                         email : true
//                     },
//                     phonenum : {
//                         isPhonenumer : true
//                     }
//                 },
//                 messages : {
//                     email : {
//                         required : "请输入邮箱",
//                         email : "请输入正确邮箱"
//                     }
//                 }
//             });
//         };

//         function deleteUser() {
//             $("#usertable").on('click', '.delete', function(event) {
//                 var userId = $(this).parents("tr").attr("data-id");
//                 Lobibox.confirm({
//                     msg : "确定要删除这个用户吗?",
//                     callback : function($this, type, ev) {
//                         // Your code goes here
//                         if (type === "yes") {
//                             $.ajax({
//                                 url : '/APP-admin/user/delete?userId='
//                                     + userId,
//                                 type : 'DELETE',
//                                 dataType : 'json',
//                                 success : function(data) {
//                                     if (data.success) {
//                                         $(		"#usertable tbody tr")
//                                             .remove();

//                                         getUsers(1);
//                                         Lobibox.notify('success', {
//                                             msg : "删除成功!",
//                                             width : 400,
//                                             sound :false,
//                                             delay : 1000

//                                         });

//                                     } else {
//                                         Lobibox.notify('error', {
//                                             msg : "删除失败!",
//                                             width : 400,
//                                             sound:false,
//                                             delay : 1000

//                                         });
//                                     }

//                                 },
//                                 error : function(jqXHR, testStatus,
//                                                  errorThrow) {
//                                     console.log(jqXHR)

//                                 }
//                             });
//                         }

//                     }
//                 });

//             });
//         }

//         function toDate(time) {

//             var time = new Date(time);
//             var ymdhis = "";
//             ymdhis += time.getFullYear() + "-";
//             ymdhis += (time.getMonth() + 1) + "-";
//             ymdhis += time.getDate();

//             return ymdhis;
//         };
//         function toDateTime(unixTime) {

//             var time = new Date(unixTime);
//             var ymdhis = "";
//             var month, date, hour, minutes, second;
//             ymdhis += time.getFullYear() + "-";
//             month = (time.getMonth() + 1) >= 10
//                 ? (time.getMonth() + 1)
//                 : "0" + (time.getMonth() + 1);
//             ymdhis += month + "-";
//             date = time.getDate() >= 10 ? time.getDate() : "0"
//                 + time.getDate();
//             ymdhis += date;
//             hour = time.getHours() >= 10 ? time.getHours() : "0"
//                 + time.getHours();
//             ymdhis += " " + hour + ":";
//             minutes = time.getMinutes() >= 10 ? time.getMinutes() : "0"
//                 + time.getMinutes();
//             ymdhis += minutes + ":";
//             second = time.getSeconds() >= 10 ? time.getSeconds() : "0"
//                 + time.getSeconds();
//             ymdhis += second;

//             return ymdhis;
//         };
//         function tokTime(unixTime) {
//             var time = new Date(unixTime);
//             var ymdhis = "";
//             var month, date;

//             month = (time.getMonth() + 1) >= 10
//                 ? (time.getMonth() + 1)
//                 : "0" + (time.getMonth() + 1);
//             ymdhis += month + "/";
//             date = time.getDate() >= 10 ? time.getDate() : "0"
//                 + time.getDate();
//             ymdhis += date + '/';
//             ymdhis += time.getFullYear();

//             return ymdhis;
//         }
//         function pageShow(containers, type, modelName, code) {

//             var page = 1
//             if (type === 5) {
//                 page = 0;
//             }
//             var pageU = $(containers);
//             pageU.off("click", ".next");
//             pageU.off("click", ".previous");

//             pageU.on('click', '.next', function(event) {
//                 if ($(this).hasClass("disabled")) {
//                     event.preventDefault();
//                 } else {
//                     page = page + 1;
//                     if (type === 1) {
//                         getUsers(page);
//                     }

//                     pageU.find('.previous')
//                         .removeClass('disabled');
//                 }

//             });
//             pageU.on('click', '.previous', function(event) {
//                 if ($(this).hasClass("disabled")) {
//                     event.preventDefault();
//                 } else {
//                     page = page - 1;
//                     if (type === 1) {
//                         getUsers(page);
//                     }

//                     if (page === 1) {
//                         pageU.find('.previous')
//                             .addClass('disabled');

//                     }

//                 }

//             });

//         };

//         function getUsers(page) {
//             var userTypeMAP = {
//                 "0" : "分析师",
//                 "1" : "管理员",
//                 '2' : '运营管理'
//             }
//             url = '/APP-admin/user/all?page=' + page + '&size=20'
//                 + "&" + Math.random();
//             $.ajax({
//                 url : url,
//                 type : 'GET',
//                 dataType : 'json',
//                 success : function(data) {
//                     if (data.success) {
//                         var maxPage = Math.ceil(data.data.totalCount/20);

//                         var userList = data.data.userList;
//                         if (data.data.totalCount <= 20) {
//                             $("#userpage").hide();

//                         } else {
//                             $("#userpage").show();
//                             if (page === maxPage) {
//                                 $("#userpage .next").addClass('disabled');
//                             } else {
//                                 $("#userpage .next").removeClass('disabled');
//                             }

//                         }
//                         var $tbody = $("#usertable tbody");
//                         $tbody.find('tr').remove();
//                         for (var i = 0; i < userList.length; i++) {
//                             var $tr = $("<tr>").attr("data-id",
//                                 userList[i].id).appendTo($tbody);
//                             var $tdName = $("<td>")
//                                 .text(	userList[i].userName)
//                                 .appendTo($tr);
//                             var date = toDate(userList[i].createTime);
//                             var $tdDate = $("<td>").text(date)
//                                 .appendTo($tr);
//                             var type = userTypeMAP[userList[i].userType];
//                             var $tdType = $("<td>").text(type)
//                                 .appendTo($tr);
//                             var $tdEmail = $("<td>")
//                                 .text(	userList[i].email)
//                                 .appendTo($tr);
//                             var $tdphone = $("<td>")
//                                 .text(	userList[i].phone)
//                                 .appendTo($tr);
//                             var $tdOperation = $("<td>").appendTo($tr);
//                             if(userList[i].userName!=='admin'){
//                                 var $aUpdate = $("<a>").attr("href","#").addClass('update').text("编辑")
//                                     .appendTo($tdOperation);
//                                 var $aDelete = $("<a>").attr("href", "#")
//                                     .addClass('delete').text("删除")
//                                     .appendTo($tdOperation);
//                             }
//                             var $aReset = $("<a>").attr("href", "#")
//                                 .addClass('reset').text("重置密码")
//                                 .appendTo($tdOperation);

//                         }
//                     }

//                 }
//                 ,
//             });

//         }

//     })
// })
