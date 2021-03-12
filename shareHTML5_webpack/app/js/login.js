// require([
//         '../assets/js/vendor/jquery.min',
//         '../assets/js/vendor/crypto-js',
//         '../assets/js/vendor/bootstrap.min',
//         '../assets/js/vendor/jquery.cookie',
//         '../assets/js/vendor/jquery.md5',
//         '../assets/js/vendor/jquery.validate.min'
//     ],
//     function($, CryptoJS) {
//         $(function() {
//             login();
//             function validateForm() {
//                 return $("#loginform").validate({
//                     rules : {
//                         username : {
//                             required : true
//                             ,

//                         },
//                         password : {
//                             required : true,
//                             minlength : 6,
//                             maxlength : 10
//                         }
//                     },
//                     messages : {
//                         username : {
//                             required : "请输入用户名"
//                             ,

//                         },
//                         password : {
//                             required : "请输入密码",
//                             minlength : "密码不能小于6位",
//                             maxlength : "密码不能大于10位"
//                         }

//                     }
//                 });
//             }
//             function login() {
//                 $("body").keydown(function(event) {
//                     /* Act on the event */
//                     if (event.keyCode === 13) {
//                         $("#login").click();
//                     }
//                 });
//                 $("#login").click(function(event) {
//                     var username = $("#username").val();
//                     var password = $("#password").val();
//                     var key = "/insigmahengtiansofthtawill!$#$%%$%&^%*<";
//                     var passwordM = $.md5(password + key);

//                     var check = validateForm().form();
//                     if (check) {
//                         $.ajax({
//                             url : '/APP-admin/user/login?userName='
//                                 + username + '&password=' + passwordM,
//                             type : 'POST',
//                             dataType : 'json',
//                             contentType : 'application/json',
//                             success : function(data) {
//                                 if (data.success) {
//                                     var idDES = encryptByDES((data.data.id)
//                                             .toString(),
//                                         "insigmahengtiansofthta!$#$%%$%&^%*<");
//                                     $.cookie("alphagu_user_id", idDES, {
//                                         path : '/'
//                                     });
//                                     $.cookie("alphaguUserType",
//                                         data.data.userType);
//                                     $.cookie("alphaguUserName",
//                                         data.data.userName);
//                                     //window.location.href = "/APP-admin/manage";
//                                     if(data.data.userType==='0'){
//                                         window.location.href = "/APP-admin/analyser";
//                                     }
//                                     if(data.data.userType==='1'){
//                                         window.location.href = "/APP-admin/manage";
//                                     }
//                                     if(data.data.userType==='2'){
//                                         window.location.href = "/APP-admin/opetation";
//                                     }



//                                 } else {
//                                     $("#error").text(data.msg);
//                                 }

//                             },
//                             error : function(jqXHR, testStatus, errorThrow) {
//                                 console.log(jqXHR);

//                             }
//                         });

//                     }
//                 });
//                 // 加密
//                 function encryptByDES(message, key) {
//                     var keyHex = CryptoJS.enc.Utf8.parse(key);
//                     var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
//                         mode : CryptoJS.mode.ECB,
//                         padding : CryptoJS.pad.Pkcs7
//                     });
//                     return encrypted.toString();
//                 }

//             }
//         });
//     });
