$.fn.createPage = function(options) {
	var _mostPage = 10;
	var _beforePage = 3;
	var _lastPage = 5;
	var _DEFAULT_ = {
		total : 1,
		page : 1,
		callback : null
	};
	var _PROTO_ = {
		_init : function(initOption) {
			var total = initOption.total;
			var page = initOption.page;
			/*
			 * var _html = "<lable for='sel_input_page' style='float:
			 * left;display: inline-block;'>" + "<span style='float:
			 * left;display: inline-block;line-height: 74px;'>第</span>" + "<input
			 * id = 'sel_input_page' value='' style='float: left;display:
			 * inline-block;margin: 20px 5px;border-radius: 4px; height:
			 * 34px;width: 51px;text-align: center' />" + "<span style='float:
			 * left;display: inline-block;line-height: 74px;'>页</span> " + "<button
			 * type='button' class='btn btn-info to-page' style='height:
			 * 34px;margin: 20px 2px;'>跳转</button>" + "</lable>"; if(page !=
			 * 1){ this._afterClick("page-"+page,total); }else{ _html += "<ul class='pagination'><li class='disabled'><a
			 * class='first-page'>&laquo;</a></li>"; if(total<=_mostPage){
			 * for(var pageNum = 0;pageNum<total;pageNum++){ if((pageNum+1) ==
			 * page){ _html += "<li class='active'><a
			 * class='page-"+(pageNum+1)+"'>"+(pageNum+1)+"</a></li>"; }else{
			 * _html += "<li><a
			 * class='page-"+(pageNum+1)+"'>"+(pageNum+1)+"</a></li>"; } }
			 * }else{ for(var firstThree = 0;firstThree<_beforePage;firstThree++){
			 * if((firstThree+1) == 1){ _html += "<li class='active'><a
			 * class='page-"+(firstThree+1)+"'>"+(firstThree+1)+"</a></li>";
			 * }else{ _html += "<li><a
			 * class='page-"+(firstThree+1)+"'>"+(firstThree+1)+"</a></li>"; } }
			 * _html += "<li><a class='jump-three-page'>...</a></li>";
			 * for(var lastThree = _lastPage;lastThree>0;lastThree--){ _html += "<li><a
			 *
			 * class='page-"+(total-lastThree+1)+"'>"+(total-lastThree+1)+"</a></li>"; } }
			 * _html += "<li><a class='last-page'>&raquo;</a></li></ul>";
			 * this.html(_html); this._handle(total); }
			 */
			var _id = this[0].id;
			var $input = $("#" + _id + " input#sel_input_page");
			var pageNum = $input.val();
			if (pageNum == undefined) {
				pageNum = "";
			}
			var _html = "<lable for='sel_input_page' style='float: left;display: inline-block;'>"
					+ "<span style='float: left;display: inline-block;line-height: 74px;'>第</span>"
					+ "<input type='number' id = 'sel_input_page' value='"
					+ pageNum
					+ "' style='float: left;display: inline-block;margin: 20px 5px;border-radius: 4px;	height: 34px;width: 51px;text-align: center' />"
					+ "<span style='float: left;display: inline-block;line-height: 74px;'>页 </span> "
					+ "<span style='float: left;display: inline-block;line-height: 74px;'>/共"
					+total
					+"页</span> "
					+ "<button type='button' class='btn btn-info to-page' style='height: 34px;margin: 20px 2px;'>跳转</button>"
					+ "</lable>";
			if (page != 1) {
				_html += "<ul class='pagination'><li><a class='first-page'>&laquo;</a></li>";
			} else {
				_html += "<ul class='pagination'><li class='disabled'><a class='first-page'>&laquo;</a></li>";
			}
			if (total <= _mostPage) {// [1 2 3 4 5 6 7 8 9 10]
				for (var pageNum = 0; pageNum < total; pageNum++) {
					if ((pageNum + 1) == page) {
						_html += "<li class='active'><a class='page-"
								+ (pageNum + 1) + "'>" + (pageNum + 1)
								+ "</a></li>";
					} else {
						_html += "<li><a class='page-" + (pageNum + 1)
								+ "'>" + (pageNum + 1) + "</a></li>";
					}
				}
			} else {
				if (page >= 3 && page < total - _lastPage) {
					_html += "<li><a class='page-1'>" + 1
							+ "</a></li>";
					var jump_html = "";
					if (page == 3) {
						// jump_html += "<li><a
						// class='jump-one-page'>...</a></li>";
					} else {
						jump_html += "<li><a class='jump-two-page-before'>...</a></li>";
					}
					_html += jump_html;
					if (page + 1 == total - _lastPage) {
						for (var firstThree = page; firstThree <= total; firstThree++) {
							if (firstThree == page) {
								_html += "<li class='active'><a class='page-"
										+ (firstThree)
										+ "'>"
										+ (firstThree)
										+ "</a></li>";
							} else {
								_html += "<li><a class='page-"
										+ (firstThree) + "'>" + (firstThree)
										+ "</a></li>";
							}
						}
					} else {
						for (var firstThree = page - 1; firstThree <= page + 1; firstThree++) {
							if (firstThree == page) {
								_html += "<li class='active'><a class='page-"
										+ (firstThree)
										+ "'>"
										+ (firstThree)
										+ "</a></li>";
							} else {
								_html += "<li><a class='page-"
										+ (firstThree) + "'>" + (firstThree)
										+ "</a></li>";
							}
						}
						_html += "<li><a class='jump-two-page-last'>...</a></li>";
						for (var lastThree = _lastPage; lastThree > 0; lastThree--) {
							_html += "<li><a class='page-"
									+ (total - lastThree + 1) + "'>"
									+ (total - lastThree + 1) + "</a></li>";
						}
					}

				} else if (page >= total - _lastPage) {
					/*
					 * for(var firstThree = 0;firstThree<_beforePage;firstThree++){
					 * _html += "<li><a
					 * class='page-"+(firstThree+1)+"'>"+(firstThree+1)+"</a></li>"; }
					 */
					_html += "<li><a class='page-1'>" + 1
							+ "</a></li>";
					_html += "<li><a class='jump-two-page-before'>...</a></li>";

					var startNum;
					if (page == total - _lastPage) {
						startNum = page;
					} else {
						startNum = total - _lastPage + 1;
					}
					for (var i = startNum; i <= total; i++) {
						if (i == page) {
							_html += "<li class='active'><a class='page-"
									+ page + "'>" + page + "</a></li>";
						} else {
							_html += "<li><a class='page-" + i + "'>"
									+ i + "</a></li>";
						}
					}
					/*
					 * for(var firstThree = page;firstThree<=total;firstThree++){
					 * if((firstThree) == page){ _html += "<li class='active'><a
					 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>";
					 * }else{ _html += "<li><a
					 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>"; } }
					 */

				} else {
					for (var firstThree = 0; firstThree < _beforePage; firstThree++) {
						if ((firstThree + 1) == page) {
							_html += "<li class='active'><a class='page-"
									+ (firstThree + 1)
									+ "'>"
									+ (firstThree + 1) + "</a></li>";
						} else {
							_html += "<li><a class='page-"
									+ (firstThree + 1) + "'>"
									+ (firstThree + 1) + "</a></li>";
						}
					}
					if (page == 1) {
						_html += "<li><a class='jump-three-page'>...</a></li>";
					} else {
						_html += "<li><a class='jump-two-page-last'>...</a></li>";
					}
					for (var lastThree = _lastPage; lastThree > 0; lastThree--) {
						_html += "<li><a class='page-"
								+ (total - lastThree + 1) + "'>"
								+ (total - lastThree + 1) + "</a></li>";
					}
				}
			}
			if (page == total) {
				_html += "<li class='disabled'><a class='last-page'>&raquo;</a></li></ul>";
			} else {
				_html += "<li><a class='last-page'>&raquo;</a></li></ul>";
			}
			this.html(_html);
			this._handle(total);

		},
		_handle : function(total) {
			var $this = this;
			var _id = this[0].id;
			var $li = $("#" + _id + " .pagination li");
			$li.on('click', function() {
						var to_page = $(this.children[0]).attr("class");
						$this._afterClick(to_page, total);
					});
			var $button = $("#" + _id + " button.to-page");
			var $input = $("#" + _id + " input#sel_input_page");
			$button.on("click", function() {
						var to_page = $input.val();
						var parent = $input.parents('.peges');
						parent.find('.error').remove();
						var $label = $('<label>').addClass('error')
								.prependTo(parent);
						try {
							to_page = parseInt(to_page);
							if (to_page != 0 && !to_page) {
								// alert("请输入数字！");
								$label.text("请输入数字！")
								$input.val("");
								return;
							}
							if (to_page > total || to_page <= 0) {
								// alert("请输入合法页码！");
								$label.text("请输入合法页码！")
								$input.val("");
								return;
							}
							$label.text("");
						} catch (e) {
							// alert("请输入数字！");
							$label.text("请输入数字！")
							return;
						}
						$this._afterClick("page-" + to_page, total);
					});
		},
		_afterClick : function(to_page, total) {
			var _id = this[0].id;
			var $input = $("#" + _id + " input#sel_input_page");
			var pageNum = $input.val();
			if (pageNum == undefined) {
				pageNum = "";
			}
			var page = this._getPageNum(to_page);
			if (page == -1) {
				return;
			}
			/*
			 * var _html = "<lable for='sel_input_page' style='float:
			 * left;display: inline-block;'>" + "<span style='float:
			 * left;display: inline-block;line-height: 74px;'>第</span>" + "<input
			 * id = 'sel_input_page' value='"+pageNum+"' style='float:
			 * left;display: inline-block;margin: 20px 5px;border-radius: 4px;
			 * height: 34px;width: 51px;text-align: center' />" + "<span
			 * style='float: left;display: inline-block;line-height: 74px;'>页</span> " + "<button
			 * type='button' class='btn btn-info to-page' style='height:
			 * 34px;margin: 20px 2px;'>跳转</button>" + "</lable>"; if(page !=
			 * 1){ _html += "<ul class='pagination'><li><a
			 * class='first-page'>&laquo;</a></li>"; }else{ _html += "<ul class='pagination'><li class='disabled'><a
			 * class='first-page'>&laquo;</a></li>"; } if(total<=_mostPage){//[1
			 * 2 3 4 5 6 7 8 9 10] for(var pageNum = 0;pageNum<total;pageNum++){
			 * if((pageNum+1) == page){ _html += "<li class='active'><a
			 * class='page-"+(pageNum+1)+"'>"+(pageNum+1)+"</a></li>";
			 * }else{ _html += "<li><a
			 * class='page-"+(pageNum+1)+"'>"+(pageNum+1)+"</a></li>"; } }
			 * }else{ if(page>=3 && page < total-_lastPage){ _html += "<li><a
			 * class='page-1'>"+1+"</a></li>"; var jump_html = "";
			 * if(page == 3){ //jump_html += "<li><a
			 * class='jump-one-page'>...</a></li>"; }else{ jump_html += "<li><a
			 * class='jump-two-page-before'>...</a></li>"; }
			 * _html+=jump_html; if(page+1 == total-_lastPage){ for(var
			 * firstThree = page;firstThree<=total;firstThree++){ if(firstThree ==
			 * page){ _html += "<li class='active'><a
			 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>";
			 * }else{ _html += "<li><a
			 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>"; } }
			 * }else{ for(var firstThree = page-1;firstThree<=page+1;firstThree++){
			 * if(firstThree == page){ _html += "<li class='active'><a
			 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>";
			 * }else{ _html += "<li><a
			 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>"; } }
			 * _html += "<li><a class='jump-two-page-last'>...</a></li>";
			 * for(var lastThree = _lastPage;lastThree>0;lastThree--){ _html += "<li><a
			 *
			 * class='page-"+(total-lastThree+1)+"'>"+(total-lastThree+1)+"</a></li>"; } }
			 *
			 * }else if(page>=total-_lastPage){ for(var firstThree =
			 * 0;firstThree<_beforePage;firstThree++){ _html += "<li><a
			 * class='page-"+(firstThree+1)+"'>"+(firstThree+1)+"</a></li>"; }
			 * _html += "<li><a class='page-1'>"+1+"</a></li>";
			 * _html += "<li><a class='jump-two-page-before'>...</a></li>";
			 *
			 * var startNum ; if(page == total-_lastPage){ startNum = page;
			 * }else{ startNum = total-_lastPage+1; } for(var i=startNum;i<=total;i++){
			 * if(i == page){ _html += "<li class='active'><a
			 * class='page-"+page+"'>"+page+"</a></li>"; }else{ _html += "<li><a
			 * class='page-"+i+"'>"+i+"</a></li>"; } } for(var
			 * firstThree = page;firstThree<=total;firstThree++){
			 * if((firstThree) == page){ _html += "<li class='active'><a
			 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>";
			 * }else{ _html += "<li><a
			 * class='page-"+(firstThree)+"'>"+(firstThree)+"</a></li>"; } }
			 *
			 * }else{ for(var firstThree = 0;firstThree<_beforePage;firstThree++){
			 * if((firstThree+1) == page){ _html += "<li class='active'><a
			 * class='page-"+(firstThree+1)+"'>"+(firstThree+1)+"</a></li>";
			 * }else{ _html += "<li><a
			 * class='page-"+(firstThree+1)+"'>"+(firstThree+1)+"</a></li>"; } }
			 * if(page == 1){ _html += "<li><a
			 * class='jump-three-page'>...</a></li>"; }else{ _html += "<li><a
			 * class='jump-two-page-last'>...</a></li>"; } for(var
			 * lastThree = _lastPage;lastThree>0;lastThree--){ _html += "<li><a
			 *
			 * class='page-"+(total-lastThree+1)+"'>"+(total-lastThree+1)+"</a></li>"; } } }
			 * if(page == total){ _html += "<li class='disabled'><a
			 * class='last-page'>&raquo;</a></li></ul>"; }else{ _html += "<li><a
			 * class='last-page'>&raquo;</a></li></ul>"; }
			 * this.html(_html);
			 */
			console.log("====================================");
			this.options.callback(page);
			// this._handle(total);
			/*
			 * var _id = this[0].id; if($("#"+_id+" .pagination li
			 * a."+to_page).parent().hasClass("disabled")){ return; } var
			 * active_page = $("#"+_id+" .pagination li.active
			 * a").attr("class"); var num = 0; $("#"+_id+" .pagination
			 * li").removeClass("disabled"); if(to_page == "last-page"){ num =
			 * parseInt(active_page.substring(5))+1; if(num ==
			 * this.options.total){ $("#"+_id+" .pagination li
			 * a.last-page").parent().addClass("disabled"); } to_page =
			 * "page-"+num; }else if(to_page == "first-page"){ num =
			 * parseInt(active_page.substring(5))-1; if(num == 1){ $("#"+_id+"
			 * .pagination li a.first-page").parent().addClass("disabled"); }
			 * to_page = "page-"+num; }else{ num =
			 * parseInt(to_page.substring(5)); if(num == this.options.total){
			 * $("#"+_id+" .pagination li
			 * a.last-page").parent().addClass("disabled"); } if(num == 1){
			 * $("#"+_id+" .pagination li
			 * a.first-page").parent().addClass("disabled"); } }
			 * $(".pagination").find("li").removeClass("active");
			 * $("."+to_page).parent().addClass("active");
			 * this.options.callback(num);
			 */
		},
		_getPageNum : function(pageClass) {
			var _id = this[0].id;
			if ($("#" + _id + " .pagination li a." + pageClass).parent()
					.hasClass("disabled")) {
				return -1;
			}
			var num = 0;
			$("#" + _id + " .pagination li").removeClass("disabled");
			/*
			 * if(pageClass == "last-page"){ num =
			 * parseInt(active_page.substring(5))+1; }else if(pageClass ==
			 * "first-page"){ num = parseInt(active_page.substring(5))-1; }else{
			 * num = parseInt(pageClass.substring(5)); }
			 */
			switch (pageClass) {
				case "last-page" :
					var active_page = $("#" + _id + " .pagination li.active a")
							.attr("class");
					num = parseInt(active_page.substring(5)) + 1;
					break;
				case "first-page" :
					var active_page = $("#" + _id + " .pagination li.active a")
							.attr("class");
					num = parseInt(active_page.substring(5)) - 1;
					break;
				case "jump-two-page-before" :
					var active_page = $("#" + _id + " .pagination li.active a")
							.attr("class");
					num = parseInt(active_page.substring(5)) - 2;
					break;
				case "jump-two-page-last" :
					var active_page = $("#" + _id + " .pagination li.active a")
							.attr("class");
					num = parseInt(active_page.substring(5)) + 2;
					break;
				case "jump-one-page" :
					var active_page = $("#" + _id + " .pagination li.active a")
							.attr("class");
					num = parseInt(active_page.substring(5)) - 2;
					break;
				case "jump-three-page" :
					var active_page = $("#" + _id + " .pagination li.active a")
							.attr("class");
					num = parseInt(active_page.substring(5)) + 3;
					break;
				default :
					num = parseInt(pageClass.substring(5));
					break;
			}
			return num;
		}

	};
	this.options = $.extend(_DEFAULT_, options);
	$.extend(this, _PROTO_);
	this._init({
				total : this.options.total,
				page : this.options.page
			});
}