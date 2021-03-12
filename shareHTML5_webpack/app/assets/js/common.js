$(function() {
	/* 引入公共部分 */
	// 菜单
	// $("#leftMenu").load("./assets/html/left.html");
	// 头部
	// $("#header").load("./assets/html/header.html");
	// 管理员管理的弹框
	// $("#user").load("./assets/html/user.html");
	// $("#detailModal").load("./assets/html/detail.html");
	var type = $.cookie("alphaguUserType");
	if (type === "0") {
		$('.analysiser').show();
	} else if (type === "2") {
		$('.operating').show();
	} else {
		$('.panel').show();
	}
});
