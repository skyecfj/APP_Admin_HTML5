// require([
        // './assets/js/vendor/jquery.min',
        // './assets/js/vendor/crypto-js',
        // './assets/js/vendor/echarts',
        // './assets/js/vendor/lobibox.min',
        // './assets/js/vendor/theme/shine',
        // './assets/js/vendor/fileinput.min',
        // './assets/js/vendor/zh',
        // './assets/js/vendor/jquery.dataTables',
        // './assets/js/vendor/bootstrap.min',
        // './assets/js/vendor/jquery.cookie',
        // './assets/js/vendor/jquery.md5',
        // './assets/js/vendor/jquery.validate.min',
        // './assets/js/vendor/jquery.spinner',
        // './assets/js/page',
        // './assets/js/vendor/bootstrap3-typeahead',
        // './assets/js/vendor/ellipses',
        // './assets/js/vendor/summernote/summernote',
        // './assets/js/vendor/summernote/lang/summernote-zh-CN'
    // ],
 // function($, CryptoJS, echarts, Lobibox, shine) {
$(function() {
    window.addEventListener("message", childTest, false);
    function childTest(event){
        var $a = JSON.parse(event.data);
        if(!$a.childList){
            // 管理员管理
            if($a.class === 'user-manage-tab'){
                window.location.href = "/usermanage.html";
            }
            // 策略发布管理
            if($a.class === 'stragety-publish'){
                window.location.href = "/stragypublish.html";
            }
            // 抵扣券管理
            if($a.class === 'rebate-tab'){
                window.location.href = "/rebate.html";
            }
            // 虚拟币管理
            if($a.class === 'coin-tab'){
                window.location.href = "/coin.html";
            }
            // 邀请码管理
            if($a.class === 'code-tab'){
                window.location.href = "/code.html";
            }
            // 用户组管理
            if($a.class === 'usergroupid-tab'){
                window.location.href = "/usergroupid.html";
            }
            // 用户订单管理
            if($a.class === 'userbook-tab'){
                window.location.href = "/userbook.html";
            }
            // 意见反馈管理
            if($a.class === 'userfeefback-tab'){
                window.location.href = "/feedback.html";
            }
            // 导出K线图
            if($a.class === 'export-tab'){
                window.location.href = "/export.html";
            }
            // 查看K线图
            if($a.class === 'search-k-tab'){
                window.location.href = "/searchkline.html";
            }
            // 运营数据分析
            if($a.class === 'operatingdataanysis-tab'){
                window.location.href = "/operatinganalysis.html";
            }
            // 资讯文章发布
            if($a.class === 'article-tab'){
                window.location.href = "/articlepublish.html";
            }
            // 代理管理
            if($a.class === 'agency-tab'){
                window.location.href = "/agency.html";
            }
            // 广告轮播
            if($a.class === 'ad-tab'){
                window.location.href = "/advertisement.html";
            }
            // 大屏广告
            if($a.class === 'bigAd-tab'){
                window.location.href = "/bigscreenad.html";
            }
            // 消息推送
            if($a.class === 'push-tab'){
                window.location.href = "/pushmessage.html";
            }
            // 信号管理
            if($a.class === 'singal-tab'){
                window.location.href = "/singalmanage.html";
            }
            // 指数管理
            if($a.class === 'indices-tab'){
                window.location.href = "/addindices.html";
            }
        }else{
            var $childMenu = $a.childList[0];
            var type,name,modelId;
            if($childMenu.class === 'strategy-monitor-tab'){
                window.location.href = "/stategymonitor.html";
            }else if($childMenu.class === 'strategy-tab'){
                window.location.href = "/strategy.html";
            }else if($childMenu.class === 'addstragety-tab'){
                window.location.href = "/addStragety.html";
            }else if($childMenu.class === 'stragety-out-tab'){
                window.location.href = "/addStragety.html";
            }else if($childMenu.class === 'smslist-tab'){
                window.location.href = "/smsmanager.html";
            }else if($childMenu.class === 'tempmanager-tab'){
                window.location.href = "/tempmanager.html";
            }else if($childMenu.class === 'addsms-tab'){
                window.location.href = "/addsms.html";
            }
        }
    }
    var urLength = window.location.pathname.split('/').length;
    var selectMenu = window.location.pathname.split('/')[urLength-1].split('.')[0];
    var idDes = $.cookie("alphagu_user_id");
    var id, t;
    var trades = [];
    var host, host2, articleaddress;
    // var imageServer;
    var imageServer = '/APP-admin';  //暂时APP-admin
    var currentJndex = 0;// 退出递归的条件变量;
    var currentJndex2 = 0;
    var imgDatas = [];
    var stockArray = [];
    var selectUserArray = [];
    var num = 1;
    var selectID = null;
    var stockArticeId = 0;
    var weekArticleId = 0;
    var modelsHtml;
    var stragyStatusMAP = {
        '0': '未上架',
        '1': '已上架',
        '2': '已下架',
        'null': ''
    };
    var StragyTypeStyleMap = {
        '2': '盘前策略',
        '1': '资产配置型',
        '3': '荐股类策略',
        'null': ''
    };
    var StragyTypeCircleMap = {
        '3': '短线',
        '2': '中线',
        '1': '长线',
        'null': ''
    };
    var stragyRecommentCircle = {
        '1': '近一周',
        '2': '近一月'
    };
    var StragyTypePushMap = {
        '1': '买卖点推送',
        '2': '只推送买点',
        'null': ''

    };
    var feedbackstatusMap = {
        '0': '未处理',
        '1': '处理中',
        '2': '已处理'
    };
    var paypricetypeMap = {};
    var navigationMap = [];
    var selectNavigation = {};
    var bigSelectNavigation = {};

    // $.ajaxSettings.async = false;
    // $.getJSON('/APP-admin/host/host.json?' + Math.random(),
    //     function (data) {
    //         host = data.host;
    //         host2 = data.host2;
    //         articleaddress = data.articleaddress;
    //         imageServer = data.imageServer;
    //     });
    // $.ajaxSettings.async = true;

    var type = $.cookie("alphaguUserType");
    if (idDes === undefined || idDes === null || type === undefined) {
        // window.location.href = "/APP-admin/login";
        window.location.href = "http://172.16.137.247:2323/AlphaAdmin/#/login";
        $("#logon").show();
        $("#loged").hide();
    } else {
        id = decryptByDES(idDes,"insigmahengtiansofthta!$#$%%$%&^%*<");
        $("#logon").hide();
        $("#loged").show();
        $("#user-id").val(5);
    }

    //modelstatisticsRealTime();
    tableshow();
    urlShow();
    getmodels();

    getOutModelList();

    // strategyShow();
    updatePass();
    deleteStragety();

    logout();

    getNavigationList();

    // 界面显示
    function urlShow() {
        if (selectMenu === "usermanage") {
            $('.user-manage-tab').parents('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('.user-manage-tab').parents('.panel').siblings()
                .find('li').removeClass('active');
            $("#usermanage").show().siblings().hide();
            $("#usertable tbody tr").remove();
            $("#userpage .previous").addClass('disabled');
            $("title").text('AlphaGu后台管理-用户管理');
            getUsers(1);
            pageShow("#userpage", 1);
        }
        if (selectMenu === "stategymonitor") {
            $('.stragety-monitor').parents('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass('active');
            $('.stragety-monitor').parents('.panel').siblings()
                .find('li').removeClass('active');
            $('.stragety-monitor').removeClass('collapsed');
            $('#collapseTwo').addClass('in');
            $("title").text('AlphaGu后台管理-策略监控');
            $('.welcome-title').text('~~欢迎使用策略监控~~');
        }
        if (selectMenu === "strategy") {
            $('.stragety-anaysis').parents('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('.stragety-anaysis').parents('.panel').siblings()
                .find('li').removeClass('active');
            $('.stragety-anaysis').removeClass('collapsed');
            $('#collapseThree').addClass('in');
            $("title").text('AlphaGu后台管理-策略分析');
            $('.welcome-title').text('~~欢迎使用策略分析~~');
        }
        if (selectMenu === "addStragety") {
            $('.out-stragety').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.out-stragety').parents('.panel').siblings().find(
                'li').removeClass('active');
            $('.out-stragetys').removeClass('collapsed');
            $('#collapseAdd').addClass('in');
            $("title").text('AlphaGu后台管理-外部买卖点');
            $('.welcome-title').text('~~欢迎使用外部买卖点导入分析，导入之前请新建策略~~');

        }
        if (selectMenu === "rebate") {
            $('.rebate-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.rebate-tab').parents('.panel').siblings()
                .find('li').removeClass('active');
            $("#rebate").show().siblings().hide();

            $("title").text('AlphaGu后台管理-抵扣卷管理');
        }
        if (selectMenu === "coin") {
            $('.coin-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.coin-tab').parents('.panel').siblings().find('li')
                .removeClass('active');

            $("#coin").show().siblings().hide();

            $("title").text('AlphaGu后台管理-虚拟币管理');
        }
        if (selectMenu === "code") {

            $('.code-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.code-tab').parents('.panel').siblings().find('li')
                .removeClass('active');
            $("#code").show().siblings().hide();

            $("title").text('AlphaGu后台管理-邀请码管理');
        }
        if (selectMenu === "usergroupid") {
            $('.usergroupid-tab').parents('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('.usergroupid-tab').parents('.panel').siblings()
                .find('li').removeClass('active');
            $("#usergroupid").show().siblings().hide();

            $("title").text('AlphaGu后台管理-用户组管理');

        }
        if (selectMenu === "stragypublish") {
            $('.stragety-publish').parents('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('stragety-publish').parents('.panel').siblings()
                .find('li').removeClass('active');
            $("#strategypublishcontent").show().siblings().hide();
            getModelList();
            getReferenceIndices();

            $("title").text('AlphaGu后台管理-策略发布管理');
        }
        if (selectMenu === "export") {
            $('.export-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.export-tab').parents('.panel').siblings()
                .find('li').removeClass('active');
            $("#exportkline").show().siblings().hide();

            $("title").text('AlphaGu后台管理-导出k线');
            // uploadLogFile();
            // uploadTradeFile();

        }
        if (selectMenu === "feedback") {
            $('.userfeefback-tab').parents('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('.userfeefback-tab').parents('.panel').siblings()
                .find('li').removeClass('active');
            $("#feedbackcontent").show().siblings().hide();
            var status = $('.feedback-table select').val();
            getFeedBack(1, status);

            $("title").text('AlphaGu后台管理-意见反馈管理');

        }
        if (selectMenu === "searchkline") {
            $('.search-k-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.search-k-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("#searchkline").show().siblings().hide();

            $("title").text('AlphaGu后台管理-查看k线图');

        }
        if (selectMenu === "operatinganalysis") {
            $('.operatingdataanysis-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.operatingdataanysis-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("#operatingcontent").show().siblings().hide();

            $("title").text('AlphaGu后台管理-运营数据管理');

            //getstatisticsRealTime();

            var tab = $('#operatingTab .active').find('a').attr('href');
            //        if(tab==='#userregisterdata'){
            //       	 //getstatisticsHistory();
            // 	 var type=$('#userregisterselect').val();
            // 	 statisticsHistoryLine(type);

            // }
            //        if(tab==='#stagetybook'){
            // 	   //getmodelHistory();
            // 	  var type= $('#bookselect').val();
            //          modelHistoryLine(type);
            // }
            addRegisterLoginList(1, 10, 0, 1);
            addSubscribeList(1, 10, 0, 1);
            addYingYuanList(1, 10);
            addSignAnalysisList(1, 10);
            addCodedataList(1, 10);
            //invitationstatistics();
            getArticleConfigList();
            getTacticsConfigList();
            getUserLoginSummary();
            getUserSiginSummary();
            getTacticsSubscribeSummary();
            getInviteCodeSummary();

        }
        if (selectMenu === 'userbook') {
            $('.userbook-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.userbook-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-用户订单管理');
            $("#userbookcontent").show().siblings().hide();
            $('#bookform input').val('');
            getBookTable(0);
        }
        if (selectMenu === 'articlepublish') {
            $('.article-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.article-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-资讯文章发布');
            $("#articlepublish").show().siblings().hide();
            summerNote();
            getPublisherList();
            getArticleList(1, 10);
        }
        if (selectMenu === 'advertisement') {
            $('.ad-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.ad-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-广告轮播');
            $('#advertisement').show().siblings().hide();
            getAds(1);
            uploadImg();
            $('#adscontentform').find('input').val('');

        }
        if (selectMenu === 'bigscreenad') {
            $('.bigAd-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.bigAd-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-大屏广告');
            $('#bigscreenad').show().siblings().hide();
            getonmodels();
            // getLinkType();
            getBigAdList(1, 10);


        }
        if (selectMenu === 'singalmanage') {
            $('.singal-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.singal-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-信号管理');
            $('#singal').show().siblings().hide();
            getAllSmartModel();
            getAllOperation();
            getAllPoolModel();
            queryFuquanInfoList(1, 10);
            queryPoolInfoList(1, 10);

        }
        if (selectMenu === 'addindices') {
            $('.indices-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.indices-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-信号管理');
            $('#addindiecs').show().siblings().hide();
            getIndicesByPage(1, 10);
        }
        if (selectMenu === 'pushmessage') {
            $('.push-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.push-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-消息推送');
            $('#pushmessage').show().siblings().hide();
            getonmodels();
            getUserGroupforPush();

            getPutList(1, 10);
            getUserList()
        }
        if (selectMenu === 'agency') {
            $('.agency-tab').parents('.panel-heading').addClass(
                'active').parents('.panel').siblings().find(
                '.panel-heading').removeClass('active');
            $('.agency-tab').parents('.panel').siblings().find(
                'li').removeClass('active');
            $("title").text('AlphaGu后台管理-代理管理');

            $('#agency').show().siblings().hide();
            addagencyInfoList(1, 10, '1', '1');
            addbrokerageList(1, 10, '1', '1', 0, 1);

        }
        if (selectMenu === 'smsmanager') {
            $("title").text('AlphaGu后台管理-短信管理');

            $('#smsManager').addClass('in');
            $('#smsManager').siblings('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('.smslist-tab').parent().addClass('active').parents('.panel').siblings()
                .find('li').removeClass('active');
            $('#smslist').show().siblings().hide();
            smsBalance();
        }
        if (selectMenu === 'tempmanager') {
            $("title").text('AlphaGu后台管理-短信管理');
            $('#smsManager').addClass('in');
            $('#smsManager').siblings('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('.tempmanager-tab').parent().addClass('active').parents('.panel').siblings()
                .find('li').removeClass('active');
            $('#tempmanager').show().siblings().hide();
        }
        if (selectMenu === 'addsms') {
            $("title").text('AlphaGu后台管理-短信管理');
            $('#smsManager').addClass('in');
            $('#smsManager').siblings('.panel-heading')
                .addClass('active').parents('.panel')
                .siblings().find('.panel-heading').removeClass(
                'active');
            $('.addsms-tab').parent().addClass('active').parents('.panel').siblings()
                .find('li').removeClass('active');
            $('#addsms').show().siblings().hide();
            smsBalance();
        }
    }

    function decryptByDES(ciphertext, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        // direct decrypt ciphertext
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // 表格
    function tableshow() {
        $('.anaysis-table').dataTable({
            "searching": false, // 是否允许Datatables开启本地搜索
            "paging": true, // 是否开启本地分页
            "lengthChange": false, // 是否允许用户改变表格每页显示的记录数
            "info": false, // 控制是否显示表格左下角的信息
            "columnDefs": [{
                "targets": 'nosort', // 列的样式名
                "orderable": false
                // 包含上样式名‘nosort’的禁止排序
            }],
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 10, // 一页显示条数
            "createdRow": function (row, data, index) {
                if (data[2] > 0) {
                    $('td', row).eq(2).css("color", "rgb(187,0,0)");
                } else if (data[2] < 0) {
                    $('td', row).eq(2).css("color", "green");
                } else {
                    $('td', row).eq(2).css("color", "black");
                }
            },
            "oLanguage": { // 语言设置
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sZeroRecords": "没有检索到数据",
                "sSearch": "检索:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                }
            },
            // 跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
            "order": [[0, 'desc']]
            // asc升序 desc降序 "order": [[ 3, "desc"
            // ]]默认第四列为降序排列
        });
        $('#stragepublishtable').dataTable({
            "searching": false, // 是否允许Datatables开启本地搜索
            "paging": true, // 是否开启本地分页
            "lengthChange": false, // 是否允许用户改变表格每页显示的记录数
            "info": true, // 控制是否显示表格左下角的信息
            'bAutoWidth': false,
            "aoColumnDefs": [{
                "sWidth": "20%",
                "aTargets": [0, 1]
            },
                {"bSortable": false, "aTargets": ['nosort']},
                {
                    'aTargets': 11,
                    "mRender": function (data, display, row) {
                        var id = '"' + row.id + '"';
                        var html = "";
                        html += "<a href='javascript:void(0);' class='btn btn-default btn-xs btn-update'> 编辑</a>";
                        html += "<a href='javascript:void(0);' class='btn btn-default btn-xs btn-off'> 下架</a>";
                        html += "<a href='javascript:void(0);' class='btn btn-default btn-xs btn-on'>上架</a>";
                        html += "<a href='javascript:void(0);' class='btn btn-default btn-xs btn-pay'>支付信息</a>";
                        return html;
                    }
                }],
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 10, // 一页显示条数
            "createdRow": function (row, data, index) {
                if (data[3] > 0) {
                    $('td', row).eq(3).css("color", "rgb(187,0,0)").text(data[3] + "%");
                } else if (data[4] < 0) {
                    $('td', row).eq(3).css("color", "green").text(data[3] + "%");
                } else {
                    $('td', row).eq(3).css("color", "black").text(data[3] + "%");
                }
            },
            "oLanguage": { // 语言设置
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sZeroRecords": "没有检索到数据",
                "sSearch": "检索:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                }
            },
            // 跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
            "order": [[2, 'desc']]
            // asc升序 desc降序 "order": [[ 3, "desc"
            // ]]默认第四列为降序排列
        });

        $(".detail-table").dataTable({
            "searching": false,
            "paging": false,
            "lengthChange": false,
            "info": false,
            "columnDefs": [{
                "targets": 'nosort',
                "orderable": false
            }],
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 20, // 一页显示条数
            "order": [0]
        });

        // 意见反馈
        $(".feedback-table").DataTable({
            "searching": false,
            "paging": false,
            "lengthChange": false,
            "info": false,
            "scrollX": false,
            "bAutoWidth": false,
            "aoColumnDefs": [
                {"bSortable": false, "aTargets": ['nosort']},
                {
                    "aTargets": 7, // 操作按钮目标列
                    "mRender": function (data, display, row) {
                        var id = '"' + row.id + '"';
                        var html = "";
                        html += "<a href='javascript:void(0);' class='btn btn-default btn-xs btn-feedback-update'>追踪</a>";
                        html += "<a href='javascript:void(0);' class='btn btn-default btn-xs btn-done'>完成</a>";
                        return html;
                    }
                }, {
                    "sWidth": "20%",
                    "aTargets": [1, 2, 4]
                },
                {
                    "sWidth": "16%",
                    "aTargets": [0, 6]
                }],
            "bPaginate": false, // 显示分页器
            //"iDisplayLength" : 20, // 一页显示条数
            "order": [0],
            initComplete: function () {// 列筛选
                var api = this.api();
                api.columns().indexes().flatten().each(function (i) {
                    if (i === 3) {//
                        var column = api.column(i);
                        var $span = $('<span class="addselect"></span>').appendTo($(column.header()))
                        var select = $('<select><option value="">All</option></select>')
                            .appendTo($(column.header()));
                        // .on('change',
                        // function
                        // (evt) {
                        //
                        // var val =
                        // $.fn.dataTable.util.escapeRegex(
                        // $(this).val()
                        // );
                        // column
                        // .search(val
                        // ? '^' +
                        // val + '$'
                        // : '',
                        // true,
                        // false)
                        // .draw();
                        // });
                        select.append("<option value='0'>未处理</option>");
                        select.append("<option value='1'>处理中</option>");
                        select.append("<option value='2'>已处理</option>");
                        $span.append(select)
                        // column.data().unique().sort().each(
                        // function
                        // ( d, j )
                        // {
                        // select.append(
                        // '<option
                        // value="'+d+'">'+d+'</option>'
                        // );
                        // $span.append(select)
                        // } );
                    }
                });
            }
        });
        // 收益率表
        $("#ratetable").dataTable({
            "searching": false,
            "paging": false,
            "lengthChange": false,
            "info": false,
            "columnDefs": [{
                "targets": 'nosort',
                "orderable": false
            }],
            //"scrollY" : "400px",
            "scrollCollapse": "true",
            "createdRow": function (row, data, index) {
                for (i = 1; i < data.length; i++) {
                    if (data[i] > 0) {
                        $("td", row).eq(i).css("color", "rgb(187,0,0)").text(data[i] + "%");
                    } else if (data[i] < 0) {
                        $("td", row).eq(i).css("color", "green").text(data[i] + "%");
                    } else {
                        $("td", row).eq(i).css("color", "black");
                    }
                }
            },
            "order": [[0, 'asc']]
        });
        $("#ratelinetable").dataTable({
            "searching": false,
            "paging": true,
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 50, // 一页显示条数
            "lengthChange": true,
            'sPaginationType': 'ellipses',
            "info": true,
            //"pagingType": "input",
            "columnDefs": [{
                "targets": 'nosort',
                "orderable": false
            }],
            "createdRow": function (row, data, index) {
                for (i = 1; i < data.length; i++) {
                    if (data[i] > 0) {
                        $("td", row).eq(i).css("color", "rgb(187,0,0)").text(data[i] + "%");
                    } else if (data[i] < 0) {
                        $("td", row).eq(i).css("color", "green").text(data[i] + "%");
                    } else {
                        $("td", row).eq(i).css("color", "black");
                    }
                }
            },
            "oLanguage": { // 语言设置
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sZeroRecords": "没有检索到数据",
                "sSearch": "检索:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                }
            },
            "order": [[0, 'desc']]
        });
        $('#userregisterTable').dataTable({
            "searching": false,
            "paging": true,
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 50, // 一页显示条数
            "lengthChange": true,
            'sPaginationType': 'ellipses',
            "info": true,
            "oLanguage": { // 语言设置
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sZeroRecords": "没有检索到数据",
                "sSearch": "检索:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                }
            }
        });
        $('#stagetyBookTable').dataTable({
            "searching": false,
            "paging": true,
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 50, // 一页显示条数
            "lengthChange": true,
            'sPaginationType': 'ellipses',
            "info": true,
            "oLanguage": { // 语言设置
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sZeroRecords": "没有检索到数据",
                "sSearch": "检索:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                }
            },
            order: [[0, 'desc']]
        });
        $("#retracementtable").dataTable({
            "searching": false,
            "paging": false,
            "lengthChange": false,
            "info": false,
            "columnDefs": [{
                "targets": 'nosort',
                "orderable": false
            }],
            //"scrollY" : "400px",
            "scrollCollapse": "true",
            "createdRow": function (row, data, index) {
                for (i = 1; i < data.length; i++) {
                    if (data[i] > 0) {
                        $("td", row).eq(i).css("color", "rgb(187,0,0)").text(data[i] + "%");
                    } else if (data[i] < 0) {
                        $("td", row).eq(i).css("color", "green").text(data[i] + "%");
                    } else {
                        $("td", row).eq(i).css("color", "black");
                    }
                }
            },
            "order": [0, 'asc']
        });
        $("#holdinTable").dataTable({
            "searching": false,
            "paging": false,
            "lengthChange": false,
            "info": false,
            "columnDefs": [{
                "targets": 'nosort',
                "orderable": false
            }, {
                "targets": 9, // 操作按钮目标列
                "data": null,
                "render": function (data, type, row) {
                    var id = '"' + row.id + '"';
                    var html = "";
                    html += "<a href='javascript:void(0);' class='btn btn-info btn-xs btn-bulls-show'>去推荐</a>";
                    return html;
                }
            }],
            "bPaginate": false, // 显示分页器
            // 一页显示条数
            "createdRow": function (row, data, index) {
                if (data[5] > 0) {
                    $('td', row).eq(5).css("color", "rgb(187,0,0)").text(data[5] + "%");
                } else if (data[5] < 0) {
                    $('td', row).eq(5).css("color", "green").text(data[5] + "%");
                } else {
                    $('td', row).eq(5).css("color", "black");
                }
                if (data[8] > 0) {
                    $('td', row).eq(8).css("color", "rgb(187,0,0)").text(data[8] + "%");
                } else if (data[8] < 0) {
                    $('td', row).eq(8).css("color", "green").text(data[8] + "%");
                } else {
                    $('td', row).eq(8).css("color", "black");
                }
            },
            "order": [0]
        });
        $('#bullsinfotable').dataTable({
            'searching': false,
            'paging': false,
            'info': false,
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 50, // 一页显示条数
            "autoWidth": false,
            'aoColumnDefs': [
                {"bSortable": false, "aTargets": ['nosort']},
                {"sWidth": "15%", "aTargets": [4]},
                {"sWidth": "10%", "aTargets": [1, 2, 3, 6, 8, 9]},
                {
                    'aTargets': 9, "mRender": function (data, display, row) {
                        // console.log(data)
                        // console.log(display)
                        // console.log(row)
                        var html = '';
                        if (row[6] === '未发送') {
                            html += "<a href='javascript:void(0);' class='btn btn-success btn-sm btn-bulls-update'>编辑</a>";
                            html += '<br/>';
                            html += "<a href='javascript:void(0);' class='btn btn-info btn-sm btn-bulls-send'>发送</a>";
                        } else {
                            html += "<a href='javascript:void(0);' class='btn btn-sm btn-primary btn-bulls-detail'>查看</a>";
                        }
                        return html;
                    }
                }],
            "order": [0]
        });
        $('#tradetables').dataTable({
            'searching': false,
            'paging': false,
            'info': false,
            "bPaginate": true, // 显示分页器
            "iDisplayLength": 50, // 一页显示条数
            "autoWidth": true,
            'columnDefs': [{'targets': 'nosort', 'orderable': false}],
            'createdRow': function (row, data, index) {
                if (data[3] > 0) {
                    $('td', row).eq(3).css("color", "rgb(187,0,0)").text('盈' + data[3] + "%");
                } else if (data[3] < 0) {
                    $('td', row).eq(3).css("color", "green").text('亏' + Math.abs(data[3]) + "%");
                } else {
                    $('td', row).eq(3).css("color", "black").text(Math.abs(data[3]) + "%");
                }
            },
            "order": [[0, 'desc']]
        });
    }

    $("#addStragety").click(function () {
        $("#addStagetyModal").modal('show');
        $('.modal-title').text('添加策略');
        $("#addStagetyModal input").val('');
        $('#addStagetyModal .error').text('');

    });

    function getNavigationList() {
        var url = "/APP-admin/upload/getNavigationList";
        $.ajax({
            type: "get",
            url: url,
            async: false,
            contentType: "applocation/json;charset=UTF-8",
            dataType: "json",
            success: function(resp){
                if(resp.success){
                    navigationMap = resp.data;
                    selectNavigation = [resp.data[0]];
                    bigSelectNavigation = [resp.data[0]];
                    var selectPar = JSON.parse(bigSelectNavigation[0].param);
                    $("#adPushParams").html('');
                    $("#bigAdPushParams").html('');
                    Object.keys(selectPar).forEach(item => {
                        if(item === 'id'){
                            $("#adPushParams").append("<input type='number' placeholder='请输入"+item+"' class='form-control' id='adPushParams"+item+"' name='adPushParams"+item+"' />")
                            $("#bigAdPushParams").append("<input type='number' placeholder='请输入"+item+"' class='form-control' id='bigAdPushParams"+item+"' name='bigAdPushParams"+item+"' />")
                        }else{
                            $("#adPushParams").append("<input placeholder='请输入"+item+"' class='form-control' id='adPushParams"+item+"' name='adPushParams"+item+"' />")
                            $("#bigAdPushParams").append("<input placeholder='请输入"+item+"' class='form-control' id='bigAdPushParams"+item+"' name='bigAdPushParams"+item+"' />")
                        }
                    })
                    $("#adPushParams").append("<span style='color:red'>(数据库样例:"+ bigSelectNavigation[0].param +")</span>");
                    $("#bigAdPushParams").append("<span style='color:red'>(数据库样例:"+ bigSelectNavigation[0].param +")</span>");
                    $("#adpushType").html();
                    $("#bigAdpushType").html();
                    resp.data.forEach(item => {
                        $("#adpushType").append("<option value='"+item.name+"'>"+item.displayName+"</option>");
                        $("#bigAdpushType").append("<option value='"+item.name+"'>"+item.displayName+"</option>");
                    })
                    $("#bigAdpushType").append("<option value=''>无跳转</option>");
                }
            }
        })
    }

    function validStagetyform() {
        return $("#addStagetyForm").validate({
            rules: {
                sname: {
                    required: true
                }
            },
            messages: {
                sname: {
                    required: '请输入策略名'
                }
            }
        });
    }

    $("#addStagety").click(function () {
        var check = validStagetyform().form();
        if (check) {
            var modelName = $('#sname').val();
            var stragety = {
                "name": modelName,
                "createrId": id
            };
            $.ajax({
                url: '/APP-admin/data/model',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(stragety),
                success: function (data) {
                    if (data.success) {
                        Lobibox.notify('success', {
                            msg: "添加策略成功!",
                            width: 400,
                            sound: false,
                            delay: 1000
                        });
                        getOutModelList();
                        $("#addStagetyModal").modal('hide');
                        $("#addStagetyModal input").val('');
                    } else {
                        $('#addStagetyModal .error').text('策略名不能相同');
                    }
                }
            });
        }
    });

    function getOutModelList() {
        $.ajax({
            url: '/APP-admin/data/model/list' + '?' + Math.random(),
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    var list = data.data;
                    var $list = $("#outsidemodellist");
                    var $tbody = $("#stagetytable tbody");
                    $tbody.find("tr").remove();
                    $list.find('.out-model').remove();
                    if (list) {
                        for (var i = 0; i < list.length; i++) {
                            var modelname = list[i].name;
                            var $li = $('<li>').addClass('out-model').appendTo($list);
                            var $a = $('<a>').addClass('stragety-out-tab').text(modelname)
                                .attr('data-id', list[i].id).appendTo($li);
                            var $tr = $('<tr>').appendTo($tbody).attr('data-id', list[i].id);
                            var $tdMName = $('<td>').text(modelname).appendTo($tr);
                            var $tdDate = $('<td>').text(toDate(list[i].createTime)).appendTo($tr);
                            var $tdName = $('<td>').text(list[i].userName).appendTo($tr);
                            var $tdOperate = $('<td>').appendTo($tr);
                            var $aDelete = $("<a>").attr("href", "#").addClass('delete').text("删除")
                                .appendTo($tdOperate);
                        }
                    }
                }
            }
        });
    }

    function deleteStragety() {
        $("#stagetytable").on('click', '.delete', function (event) {
            var sId = $(this).parents("tr").attr("data-id");
            Lobibox.confirm({
                msg: "确定要删除这个策略吗?",
                callback: function ($this, type, ev) {
                    // Your code goes here
                    if (type === "yes") {
                        $.ajax({
                            url: '/APP-admin/data/model?id=' + sId,
                            type: 'DELETE',
                            dataType: 'json',
                            success: function (data) {
                                if (data.success) {
                                    $("#stagetytable tbody tr").remove();
                                    getOutModelList();
                                    Lobibox.notify('success', {
                                        msg: "删除成功!",
                                        width: 400,
                                        sound: false,
                                        delay: 1000
                                    });
                                } else {
                                    Lobibox.notify('error', {
                                        msg: "删除失败!",
                                        width: 400,
                                        sound: false,
                                        delay: 1000
                                    });
                                }
                            },
                            error: function (jqXHR, testStatus, errorThrow) {
                                // console.log(jqXHR);
                            }
                        });
                    }
                }
            });
        });
    }

    jQuery.validator.addMethod("noEqual", function (value, element, param) {
        var target = $(param);
        if (this.settings.onfocusout) {
            target.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                $(element).valid();
            });
        }
        return value !== target.val();
    }, '新密码与原密码一样');

    function validPassform() {
        return $('#passwordform').validate({
            rules: {
                oldpassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 16
                },
                newpassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 10,
                    noEqual: "#oldpassword"
                },
                confrimpassword: {
                    required: true,
                    equalTo: "#newpassword"
                }
            },
            messages: {
                oldpassword: {
                    required: "请输入原密码",
                    minlength: "密码不能小于6个字符",
                    maxlength: "密码不能大于10个字符"
                },
                newpassword: {
                    required: "请输入新密码",
                    minlength: "密码不能小于6个字符",
                    maxlength: "密码不能大于10个字符"
                },
                confrimpassword: {
                    required: "请输入确认密码",
                    equalTo: "两次输入密码不一致"
                }
            }
        });
    }

    function updatePass() {
        $("#updatePass").click(function (event) {
            /* Act on the event */
            $("#updatepasswordmodal").modal("show");
            $('.modal-title').html("修改密码");
            $("#updatepasswordmodal input").val('');
        });
        $("#updatepasswordmodal").on('click', '#confrim', function (event) {
            var key = "/insigmahengtiansofthtawill!$#$%%$%&^%*<";
            var oldpassword = $("#oldpassword").val();
            var oldpasswordM = $.md5(oldpassword + key);
            var newpassword = $("#newpassword").val();
            var newpasswordM = $.md5(newpassword + key);
            var check = validPassform().form();
            if (check) {
                $.ajax({
                    url: '/APP-admin/user/password?userId=' + id + '&oldPwd=' + oldpasswordM
                        + '&newPwd=' + newpasswordM,
                    type: 'PUT',
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            $("#updatepasswordmodal").modal("hide");
                            Lobibox.notify('success', {
                                msg: "修改密码成功!",
                                width: 400,
                                sound: false,
                                delay: 1000
                            });
                        } else {
                            Lobibox.notify('error', {
                                msg: data.msg,
                                width: 400,
                                sound: false,
                                delay: 1000
                            });
                        }
                    },
                    error: function (jqXHR, testStatus, errorThrow) {
                        //console.log(jqXHR);
                    }
                });
            }
        });
    }

    $(".anaysis-table>tbody").on("click", 'tr', function (event) {
        /* Act on the event */
        $("#detailModal").modal("show");
        var modelName = $(this).attr("name");
        var modelId = $(this).attr('mid');
        var stockName = $(this).attr('stockName');
        $('.modal-title').text(stockName + '详情').attr('data-stockName', stockName);
        var code = $(this).attr("data-id");
        $("#detailpage").hide();
        $("#detailpage .previous").addClass('disabled');
        if (modelName) {
            modelDetail(modelName, code, 1);
            pageShow("#detailpage", 3, modelName, code);
        }
        if (modelId) {
            outModelDetail(modelId, code, 0);
            pageShow("#detailpage", 3, modelName, code, modelId);
        }
    });
    $('#tradetables>tbody').on('click', 'tr', function () {
        $("#detailModal").modal("show");
        var modelName = $(this).attr("data-modelName");
        var modelId = $(this).attr('data-modelid');
        var stockName = $(this).attr('data-stockname');
        $('.modal-title').text(stockName + '详情').attr('data-stockName', stockName);
        var code = $(this).attr("data-stockcode");
        $("#detailpage").hide();
        $("#detailpage .previous").addClass('disabled');
        modelDetail(modelName, code, 1);
        pageShow("#detailpage", 3, modelName, code);
    })

    function getUsers(page) {
        var userTypeMAP = {
            "0": "分析师",
            "1": "管理员",
            '2': '运营管理员'
        };
        url = '/APP-admin/user/all?page=' + page + '&size=20' + '&' + Math.random();
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    var maxPage = Math.ceil(data.data.totalCount / 20);
                    var userList = data.data.userList;
                    if (data.data.totalCount <= 20) {
                        $("#userpage").hide();
                    } else {
                        $("#userpage").show();
                        if (page === maxPage) {
                            $("#userpage .next").addClass('disabled');
                        } else {
                            $("#userpage .next").removeClass('disabled');
                        }
                    }
                    var $tbody = $("#usertable tbody");
                    $tbody.find('tr').remove();
                    for (var i = 0; i < userList.length; i++) {
                        var $tr = $("<tr>").attr("data-id", userList[i].id).appendTo($tbody);
                        var $tdName = $("<td>").text(userList[i].userName).appendTo($tr);
                        var date = toDate(userList[i].createTime);
                        var $tdDate = $("<td>").text(date).appendTo($tr);
                        var type = userTypeMAP[userList[i].userType];
                        var $tdType = $("<td>").text(type).appendTo($tr);
                        var $tdEmail = $("<td>").text(userList[i].email).appendTo($tr);
                        var $tdphone = $("<td>").text(userList[i].phone).appendTo($tr);
                        var $tdOperation = $("<td>").appendTo($tr);
                        if (userList[i].userName !== 'admin') {
                            var $aUpdate = $("<a>").attr("href", "#").addClass('update').text("编辑")
                                .appendTo($tdOperation);
                            var $aDelete = $("<a>").attr("href", "#").addClass('delete').text("删除")
                                .appendTo($tdOperation);
                        }
                        var $aReset = $("<a>").attr("href", "#").addClass('reset').text("重置密码")
                            .appendTo($tdOperation);
                    }
                }
            },
        });
    }

    // 发布管理
    function getModelList() {
        $.ajax({
            url: '/APP-admin/model/list',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var $tbody = $('#stragepublishtable tbody')
                var table = $('#stragepublishtable').dataTable();
                var oSettings = table.fnSettings();
                var temp = [];
                table.fnClearTable(this);
                if (data.success && data.data.list.length > 0) {
                    var list = data.data.list;
                    for (var i = 0; i < list.length; i++) {
                        var displayName = list[i].displayName;
                        var onlineTime = toDate(list[i].onlineTime);
                        var annualizedReturnRate = (list[i].annualizedReturnRate * 100)
                            .toFixed(2);
                        var alphaRatio = list[i].alphaRatio;
                        var biggestAssetRetreatRatio = list[i].biggestAssetRetreatRatio;
                        var sharpRatio = list[i].sharpRatio;
                        var subcribeVolume = list[i].subcribeVolume;
                        var status = stragyStatusMAP[list[i].status]
                        var maxEmptyPositionDays = list[i].maxEmptyPositionDays;
                        var recommendOrder = list[i].recommendOrder;

                        var type;
                        if (list[i].strategyTypeId !== 3) {
                            type = StragyTypeStyleMap[list[i].strategyTypeId] + '<br/>'
                                + StragyTypeCircleMap[list[i].strategyIndexId] + '<br/>'
                                + StragyTypePushMap[list[i].pushType];
                        } else {
                            type = StragyTypeStyleMap[list[i].strategyTypeId]
                                + '<br/>'
                            list[i].showReturnScope
                        }
                        var ss = [displayName, type,
                            onlineTime,
                            annualizedReturnRate,
                            alphaRatio,
                            biggestAssetRetreatRatio,
                            sharpRatio, subcribeVolume,
                            maxEmptyPositionDays,
                            recommendOrder,
                            status, ''];
                        var newline = table.oApi._fnAddData(oSettings, ss);
                        $(oSettings.aoData[newline].nTr).attr("data-id", list[i].id)
                            .attr('data-name', list[i].name).attr('data-display-name', list[i].displayName);
                        if (list[i].status === 0 || list[i].status === 2) {
                            $(oSettings.aoData[newline].nTr)
                                .find('.btn-off').attr('disabled', true).addClass('disabled');
                        } else {
                            $(oSettings.aoData[newline].nTr)
                                .find('.btn-off').removeAttr('disabled').removeClass('disabled');
                        }
                        if (list[i].status === 1) {
                            $(oSettings.aoData[newline].nTr)
                                .find('.btn-on').attr('disabled', true).addClass('disabled');
                        } else {
                            $(oSettings.aoData[newline].nTr)
                                .find('.btn-on').removeAttr('disabled').removeClass('disabled');
                        }
                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    table.fnDraw();
                    $tbody.show();
                } else {
                    $tbody.hide();
                }
            }
        })
    }

    //注意这个函数
    function getReferenceIndices() {
        $.ajax({
            url: '/APP-admin/model/ReferenceIndices',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var list = data.data;
                var $referenceaTypeContent = $('.referenceType');
                $referenceaTypeContent.find('option').remove();
                for (var i = 0; i < list.length; i++) {
                    var $option = $("<option>").attr('value',
                        list[i].id).appendTo(
                        $referenceaTypeContent);
                    $option.text(list[i].indicesName);
                }
            }
        })
    }


    function getmodels() {
        $.ajax({
            url: '/APP-admin/model/all',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    var $list = $("#modellist");
                    var $anaysisList = $("#modelmonitorlist");
                    var modelList = data.data;
                    var $select = $('#articlesragery');
                    var $select1 = $('#tactics-name');
                    var $select2 = $('#tactics-numOptimization-name');
                    for (var i = 0; i < modelList.length; i++) {
                        var $li = $("<li>").appendTo($list);
                        var $analasisli = $("<li>").appendTo($anaysisList);
                        $('<option>')
                            .text(modelList[i].modelDisplayName).val(modelList[i].id).appendTo($select);
                        $('<option>').text(modelList[i].modelDisplayName)
                            .val(modelList[i].modelDisplayName).appendTo($select1);
                        $('<option>')
                            .text(modelList[i].modelDisplayName).val(modelList[i].id).appendTo($select2);
                        $("<a>").addClass('strategy-tab')
                            .attr(
                                {
                                    href: '#strategy-analysis',
                                    name: modelList[i].modelName,
                                    'data-id': modelList[i].id,
                                    'data-type': modelList[i].strategyTypeId
                                })
                            .text(modelList[i].modelDisplayName)
                            .appendTo($li);
                        $("<a>").addClass('strategy-monitor-tab')
                            .attr(
                                {
                                    href: '#strategy-monitor',

                                    name: modelList[i].modelName,
                                    'data-id': modelList[i].id,
                                    'data-type': modelList[i].strategyTypeId
                                })
                            .text(modelList[i].modelDisplayName)
                            .appendTo($analasisli);
                    }
                }
            },
            error: function (jqXHR, testStatus, errorThrow) {
                //console.log(jqXHR);
            }
        });

    }

    //获取上架的model列表
    function getonmodels() {
        $.ajax({
            url: '/APP-admin/model/get/upShelfModel',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    var modelList = data.data;
                    var html = '';
                    for (var i = 0; i < modelList.length; i++) {
                        html += '<option value="' + modelList[i].id + '">' + modelList[i].displayName + '</option>';
                    }
                    modelsHtml = html;
                    $('#add-push-strategy').html(html);
                    $('#add-bigad-strategy').html(html);
                }
            }
        });
    }

    function toDate(time) {
        var month, darte;
        var timeDate = new Date(time);
        var ymdhis = "";
        ymdhis += timeDate.getFullYear() + "-";
        month = (timeDate.getMonth() + 1) >= 10 ? (timeDate
            .getMonth() + 1) : "0" + (timeDate.getMonth() + 1);
        ymdhis += month + "-";
        date = timeDate.getDate() >= 10 ? timeDate.getDate() : "0"
            + timeDate.getDate();
        ymdhis += date;
        return ymdhis;
    }

    function toDateTime(unixTime) {

        var timeDate = new Date(unixTime);
        var ymdhis = "";
        var month, date, hour, minutes, second;
        ymdhis += timeDate.getFullYear() + "-";
        month = (timeDate.getMonth() + 1) >= 10 ? (timeDate
            .getMonth() + 1) : "0" + (timeDate.getMonth() + 1);
        ymdhis += month + "-";
        date = timeDate.getDate() >= 10 ? timeDate.getDate() : "0"
            + timeDate.getDate();
        ymdhis += date;
        hour = timeDate.getHours() >= 10 ? timeDate.getHours()
            : "0" + timeDate.getHours();
        ymdhis += " " + hour + ":";
        minutes = timeDate.getMinutes() >= 10 ? timeDate
            .getMinutes() : "0" + timeDate.getMinutes();
        ymdhis += minutes + ":";
        second = timeDate.getSeconds() >= 10 ? timeDate
            .getSeconds() : "0" + timeDate.getSeconds();
        ymdhis += second;

        return ymdhis;
    }

    function tokTime(unixTime) {
        var time = new Date(unixTime);
        var ymdhis = "";
        var month, date;

        month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1)
            : "0" + (time.getMonth() + 1);
        ymdhis += month + "/";
        date = time.getDate() >= 10 ? time.getDate() : "0"
            + time.getDate();
        ymdhis += date + '/';
        ymdhis += time.getFullYear();

        return ymdhis;
    }

    function tokDateTime(unixTime) {
        var time = new Date(unixTime);
        var ymdhis = "";
        var month, date;
        var hour, minutes, second;
        var ap;

        month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1)
            : "0" + (time.getMonth() + 1);
        ymdhis += month + "/";
        date = time.getDate() >= 10 ? time.getDate() : "0"
            + time.getDate();
        ymdhis += date + '/';
        ymdhis += time.getFullYear();
        hour = time.getHours() > 12 ? time.getHours() - 12 : time
            .getHours();
        ymdhis += " " + hour + ":";
        minutes = time.getMinutes() >= 10 ? time.getMinutes() : "0"
            + time.getMinutes();
        ymdhis += minutes + ":";
        second = time.getSeconds() >= 10 ? time.getSeconds() : "0"
            + time.getSeconds();
        ymdhis += second;
        ap = time.getHours() > 12 ? 'PM' : 'AM';
        ymdhis += " " + ap;

        return ymdhis;
    }

    // function modelInfo(name) {
    //     $.ajax({
    //         url: '/APP-admin/model/' + name,
    //         type: 'GET',
    //         dataType: 'json',
    //         async: false,
    //         success: function (data) {
    //             if (data.success) {
    //                 var model = data.data;
    //                 var annualizedReturnRate, realTimeReturnRatio;
    //                 $(".modelDisName").text(model.modelDisplayName);
    //                 var startTime = model.onLineTime;
    //                 var startDate = toDate(startTime);
    //                 $(".realStarttime").text(startDate);
    //                 $(".realDate").text(model.firmTime);
    //             }
    //         },
    //         error: function (jqXHR, testStatus, errorThrow) {
    //             //console.log(jqXHR);
    //         }
    //     });
    // }

    $('.btn-publish-article').click(function () {
        var form = $(this).parents('form');
        //var sHTML = form.find('.summer-note').summernote('code');
        var sHTML = form.find('#publish-article-content').val();
        var articleState = $(this).data('status');
        var articletitle = form.find('.article-title').val();
        var imgSrc = form.find('.article-edit-img').val();
        var publishername = $.cookie("alphaguUserName");
        var tab = form.find('#get-article-tab').val();

        if ($.trim(articletitle) === '' || sHTML === '' || articletitle.length >= 45) {
            Lobibox.alert('warning', {
                msg: '文章标题或文章内容不能为空,且标题长度不超过45'
            })
        } else {
            var stockPublish = {
                "title": articletitle, "content": sHTML, "publisherName": publishername,
                'articleState': articleState, 'imgSrc': imgSrc, 'tab': tab
            }
            var url = '/APP-admin/upload/article';
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(stockPublish),
                contentType: 'application/json',
                success: function (data) {
                    if (data.success) {
                        Lobibox.notify('success', {
                            msg: '发布成功',
                            sound: false,
                            delay: 1000
                        })
                        //form.find('.summer-note').summernote('code','<p><br></p>');
                        form.find('#publish-article-content').val('');
                        form.find('input').val('');
                        $('#article-publish-searchbtn').trigger('click');
                    }
                }
            })
        }
    });

    // 外部买卖点
    function outModelAnalysis(modelId, page, startTime, endTime) {
        var url = host2 + '/GetAllTradeStocksByModelForMonitoring?modelId='
            + modelId + '&pagesize=20&pageindex=' + page;
        if (startTime) {
            url = url + '&startTime=' + startTime;
        }
        if (endTime) {
            url = url + '&endTime=' + endTime
        }
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.Code === '1') {
                    $("#analysispagenum").text(page + 1);
                    var list = data.Data;
                    var table = $(".anaysis-table").dataTable({
                        'destroy': true,
                        "searching": false, // 是否允许Datatables开启本地搜索
                        "paging": false, // 是否开启本地分页
                        "lengthChange": false, // 是否允许用户改变表格每页显示的记录数
                        "info": false, // 控制是否显示表格左下角的信息
                        "columnDefs": [{
                            "targets": 'nosort', // 列的样式名
                            "orderable": false
                            // 包含上样式名‘nosort’的禁止排序
                        }],
                        "bPaginate": false, // 显示分页器
                        "iDisplayLength": 10, // 一页显示条数
                        "createdRow": function (row, data, index) {
                            if (data[1] > 0) {
                                $('td', row).eq(1).css("color", "rgb(187,0,0)");
                            } else if (data[1] < 0) {
                                $('td', row).eq(1).css("color", "green");
                            } else {
                                $('td', row).eq(1).css("color", "black");
                            }
                        },
                        "oLanguage": { // 语言设置
                            "sLengthMenu": "每页显示 _MENU_ 条记录",
                            "sZeroRecords": "抱歉， 没有找到",
                            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                            "sInfoEmpty": "没有数据",
                            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                            "sZeroRecords": "没有检索到数据",
                            "sSearch": "检索:",
                            "oPaginate": {
                                "sFirst": "首页",
                                "sPrevious": "前一页",
                                "sNext": "后一页",
                                "sLast": "尾页"
                            }
                        },
                        // 跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
                        "order": [[0, 'desc']]
                        // asc升序 desc降序 "order":
                        // [[ 3, "desc"
                        // ]]默认第四列为降序排列
                    });

                    var oSettings = table.fnSettings();

                    var temp = [];
                    var $tbody = $(".anaysis-table tbody");
                    table.fnClearTable(this);

                    if (list.length > 0) {
                        $('#analysispage').show();
                        if (list.length >= 20) {
                            $("#analysispage .next").removeClass('disabled');

                        } else {
                            $("#analysispage .next").addClass('disabled');
                        }
                        for (var i = 0; i < list.length; i++) {
                            var ss = [
                                jsonTimeToDateTime(list[i].TradingTime),
                                list[i].StockName + "(" + list[i].InstrumentId + ")",
                                list[i].TotalProfit, 0];
                            temp.push(ss);

                            var newline = table.oApi._fnAddData(oSettings, ss);
                            $(oSettings.aoData[newline].nTr)
                                .attr("data-id", list[i].InstrumentId)
                                .attr("mid", modelId)
                                .attr('stockName', list[i].StockName);
                        }
                        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                        table.fnDraw();
                        $tbody.show();
                        oSettings._paging = false;
                        oSettings._bPaginate = false;
                    } else {
                        $tbody.hide();
                        $("#analysispagenum").text("0");
                    }
                }
            }
        });
    }

    function outModelDetail(modelId, stockCode, page) {

        var tradeMap = {
            "1": "买入",
            "3": "卖出",
            "4": "分红",
            "5": "配股",
            "6": "送股",
            "7": "转股",
            "0": "无交易"
        };

        var endTime = tokTime(new Date().getTime()) + ' 9:00:00 PM';

        var url = host2
            + '/GetTraderSignalByModelAndStockForMonitoring?modelId='
            + modelId + '&stockCode=' + stockCode
            + '&pageindex=' + page + '&pagesize=11';
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            timeout: 2000,
            success: function (data) {
                $("#detailpagenum").text(page + 1);

                var table = $(".detail-table").dataTable();
                var oSettings = table.fnSettings();
                var temp = [];
                table.fnClearTable(this);
                var tradeMap = {
                    "1": "买入",
                    "3": "卖出",
                    "4": "分红",
                    "5": "配股",
                    "6": "送股",
                    "7": "转股",
                    "0": "无交易"
                };

                var $tbody = $(".detail-table tbody");
                if (data.Code === '1' && data.Data.length > 0) {
                    var list = data.Data;
                    $('#detailpage').show();
                    if (list.length >= 11) {
                        $("#detailpage .next").removeClass('disabled');
                    } else {
                        $("#detailpage .next").addClass('disabled');
                    }
                    var ktrades = [];
                    for (var i = 0; i < list.length; i++) {
                        var date = jsonTimeToDateTime(list[i].Time);
                        if (i === list.length - 1) {
                            var startT = /\d+(?=\+)/.exec(list[i].Time)[0];
                            macdstartTime = startT;
                        }

                        var ss = [
                            date,
                            list[i].Price,
                            tradeMap[list[i].TradeType],
                            list[i].Quantity,
                            list[i].PositionChangeInfo];
                        temp.push(ss);

                        var newline = table.oApi._fnAddData(oSettings, ss);
                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    table.fnDraw();

                    for (i = list.length - 1; i >= 0; i--) {
                        var trade = {
                            name: tradeMap[list[i].TradeType],
                            value: list[i].Price,
                            xAxis: jsonTimeToDate(list[i].Time),
                            yAxis: list[i].Price - 2,

                        };
                        ktrades.push(trade);
                    }
                    var ktype = $('.ktypes .press>a').attr('data-type');
                    var restorationtype = $('.ktypes  .restoration-type')
                        .attr('data-restoration');
                    switchKLine(stockCode, macdstartTime, endTime, ktrades);

                    kline(stockCode, macdstartTime, endTime, ktrades, ktype, restorationtype);
                } else {
                    $tbody.hide();
                    $("#detailpagenum").text("0");
                }
            }
        });
    }

    function modelDetail(modelName, stockCode, page) {
        var tradeMap = {
            "1": "买入",
            "3": "卖出",
            "4": "分红",
            "5": "配股",
            "6": "送股",
            "7": "转股",
            "0": "无交易"
        };
        var url = '/APP-admin/model/modelTraderSignal?modelName=' + modelName + "&code="
            + stockCode + "&whichColumn=0" + "&whichPattern=0&page=" + page + "&size=10";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            timeout: 2000,
            success: function (data) {
                var table = $(".detail-table").dataTable();
                var oSettings = table.fnSettings();
                var temp = [];
                table.fnClearTable(this);
                var $tbody = $(".detail-table tbody");
                var maxPage;
                var tradeMap = {
                    "1": "买入",
                    "3": "卖出",
                    "4": "分红",
                    "5": "配股",
                    "6": "送股",
                    "7": "转股",
                    "0": "无交易"
                };
                if (data.success && data.data.list.length > 0) {
                    $tbody.show();
                    $("#detailpagenum").text(page);
                    maxPage = Math.ceil(data.data.totalCount / 10);
                    var list = data.data.list;
                    if (data.data.totalCount > 10) {
                        $("#detailpage").show();
                        if (page === maxPage) {
                            $("#detailpage .next").addClass('disabled');
                        } else {
                            $("#detailpage .next").removeClass('disabled');
                        }
                    } else {
                        $("#detailpage").hide();
                    }
                    var startTime, endTime, macdinitTime;
                    endTime = tokTime(new Date().getTime()) + ' 9:00:00 PM';
                    var ktrades = [];
                    for (var i = 0; i < list.length; i++) {
                        var dealTime = list[i].time;
                        var date = toDateTime(dealTime);
                        if (i === (list.length - 1)) {
                            startTime = toLastMonth(dealTime) + ' 9:00:00 PM';
                            macdinitTime = dealTime;
                        }
                        var ss = [
                            date,
                            list[i].price,
                            tradeMap[list[i].tradeSignalType],
                            list[i].quantity,
                            list[i].positionChangeInfo];
                        temp.push(ss);
                        var newline = table.oApi._fnAddData(oSettings, ss);
                        // $(oSettings.aoData[newline].nTr).attr("data-id",list[i].code).attr("name",modelName);
                    }
                    list.sort(compare('time'));
                    var ktype = $('.ktypes .press>a').attr('data-type');
                    var restorationtype = $('.ktypes  .restoration-type').attr('data-restoration');
                    for (i = 0; i < list.length; i++) {
                        var name = toDate(list[i].time) + '\n' + tradeMap[list[i].tradeSignalType];
                        var trade = {
                            name: name,
                            value: list[i].price,
                            xAxis: toDateTime(list[i].time),
                            yAxis: list[i].price
                        };
                        ktrades.push(trade);
                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    table.fnDraw();
                    switchKLine(stockCode, macdinitTime, endTime, ktrades);
                    kline(stockCode, macdinitTime, endTime, ktrades, ktype, restorationtype);
                } else {
                    $tbody.hide();
                    $("#detailpagenum").text("0");
                }
            },
            error: function (jqXHR, testStatus, errorThrow) {
                // console.log(jqXHR);
            }
        });
    }

    function pageShow(containers, type, modelName, code, modeId) {
        var page = 1;
        if (type === 5 || modeId) {
            page = 0;
        }
        var pageU = $(containers);
        pageU.off("click", ".next");
        pageU.off("click", ".previous");
        pageU.on('click', '.next', function (event) {
            if ($(this).hasClass("disabled")) {
                event.preventDefault();
            } else {
                page = page + 1;
                if (type === 1) {
                    getUsers(page);
                }
                if (type === 2 && modeId) {
                    var startTime = $("#tradestartTime").val();
                    var endTime = $("#tradesendTime").val();
                    outModelAnalysis(modeId, page, startTime, endTime);
                }
                if (type === 3 && modelName) {
                    modelDetail(modelName, code, page);
                } else if (type === 3 && modeId) {
                    outModelDetail(modeId, code, page);
                }
                if (type === 4) {
                    holdInInfo(modelName, page);
                }
                pageU.find('.previous').removeClass('disabled');
            }
        });
        pageU.on('click', '.previous', function (event) {
            if ($(this).hasClass("disabled")) {
                event.preventDefault();
            } else {
                page = page - 1;
                if (type === 1) {
                    getUsers(page);
                }
                if (type === 2 && modeId) {
                    var startTime = $("#tradestartTime").val();
                    var endTime = $("#tradesendTime").val();
                    outModelAnalysis(modeId, page, startTime, endTime);
                }
                if (type === 3 && modelName) {
                    modelDetail(modelName, code, page);
                } else if (type === 3 && modeId) {
                    var endTime = $("#tradesendTime").val();
                    outModelDetail(modeId, code, page);
                }
                if (type === 4) {
                    holdInInfo(modelName, page);
                }
                if (modeId || type === 5) {
                    if (page === 0) {
                        pageU.find('.previous')
                            .addClass('disabled');
                    }
                } else {
                    if (page === 1) {
                        pageU.find('.previous')
                            .addClass('disabled');
                    }
                }
            }
        });
    }

    // function lineChart(container, dates, rates, indicesName, csi500s,
    //                    zxbzs, overRates, type) {
    //     var mychart = echarts.init(document
    //         .getElementById(container));
    //     var option = {
    //         title: {
    //             text: '收益率走势'
    //         },
    //         tooltip: {
    //             trigger: 'axis'
    //         },
    //         legend: {
    //             x: 'right',
    //             data: ['实盘收益率'],
    //             selectedMode: false,
    //             selected: {
    //                 '实盘收益率': true,
    //             }
    //         },
    //         xAxis: [{
    //             type: 'category',
    //             boundaryGap: false,
    //             data: dates,
    //             position: 'bottom',
    //             name: '日期'
    //         }],

    //         yAxis: [{
    //             type: 'value',
    //             name: '收益率',
    //             splitNumber: 10,
    //             axisLabel: {
    //                 formatter: '{value} %'
    //             }
    //         }],
    //         series: [{
    //             name: '实盘收益率',
    //             type: 'line',
    //             data: rates,
    //         }]
    //     };
    //     option.legend.data.push(indicesName + "收益率");
    //     option.series.push({
    //         name: indicesName + "收益率",
    //         type: "line",
    //         data: zxbzs
    //     });
    //     if (overRates.length > 0 && container === 'ratecontainer') {
    //         option.legend.data.push("超额收益率");
    //         option.series.push({
    //             name: '超额收益率',
    //             type: "line",
    //             data: overRates
    //         });
    //     }
    //     mychart.setOption(option);
    // }

    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        };
    }

    function searchKline(stockCode, name, ktype, efunc1, efunc2, restorationtype) {
        var startTime;
        var endTime = tokTime(new Date().getTime()) + ' 9:00:00 PM';
        var startTime, startT;
        if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {
            startTime = '01/01/2000 00:00:00 AM';
        } else if (ktype === 'M5') {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24
                * 60) + ' 9:00:00 PM';
        } else if (ktype === 'M15') {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24
                * 60) + ' 9:00:00 PM';
            ;

        } else if (ktype === 'M30') {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24
                * 60) + ' 9:00:00 PM';

        } else {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24
                * 60) + ' 9:00:00 PM';
        }
        var tradePrices = [];
        var url = host
            + '/Klines?instrument='
            + stockCode + '&kType=' + ktype + '&startTime='
            + startTime + '&endTime=' + endTime + '&weightingType=' + restorationtype;
        $.ajax({
            url: url,
            type: 'GET',
            //dataType : 'json',
            beforeSend: function () {
                $("#klinecontainer2").hide();
                $("#klinecontainer").hide();
                $(".VOL").hide();
                $(".MACD").hide();
                $(".KDJ").hide();
                $(".loading").show();
            },
            complete: function () {
                //$(".loading").hide();
            },
            success: function (data) {
                $(".loading").hide();
                var list = data.Data;
                var data0 = splitData(list, '', ktype);
                var mergeKline = mergeData(list);
                $("#klinecontainer").show();

                if (efunc1) {
                    $("#klinecontainer2").show();
                } else {
                    $("#klinecontainer2").hide();
                }
                $(".VOL").show();
                if (data0.categoryData.length > 0) {
                    for (var i = 0; i < data0.categoryData.length; i++) {
                        tradePrices.push(data0.values[i][3]);
                        tradePrices.push(data0.values[i][2]);
                    }
                    var maxvalue = Math.max.apply(null, tradePrices);
                    var minvalue = Math.min.apply(null, tradePrices);
                    var addPoint = (((maxvalue - minvalue) / 0.9) - (maxvalue - minvalue)) / 2;
                    var myChart = echarts.init(document.getElementById('klinecontainer'),
                        shine);
                    var myChart2 = echarts.init(document.getElementById('klinecontainer2'));
                    var myChart3 = echarts.init(document.getElementById('klinecontainer3'));
                    var myChart4 = echarts.init(document.getElementById('klinecontainer4'));
                    var myChart5 = echarts.init(document.getElementById('klinecontainer5'));
                    var MACDResults = calulateMACD(list, '');
                    var KDJResults = calculateKDJ(list, '', 9);
                    var title = stockCode + '-' + name;
                    if ($('.search-kline-details .zibtype .press').hasClass('klist-macd')) {
                        $(".MACD").show();
                    } else {
                        $(".KDJ").show();
                    }
                    var option = {
                        title: {
                            text: title
                        },
                        color: ['#ff7f50', '#87cefa',
                            '#40e0d0', '#c23531',
                            '#ff69b4', '#ba55d3',
                            '#7b68ee', '#ffa500'],
                        backgroundColor: '#fff',
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            alwaysShowContent: true,
                            position: function (point, params, dom) {
                                // 固定在顶部
                                if (point[0] > 300) {
                                    return ['0%', '10%'];
                                } else {
                                    return ['80%', '10%'];
                                }
                            },
                            formatter: function (params) {
                                if (params) {
                                    var res;
                                    if (params[0]) {
                                        res = params[0].name;
                                        res += '<br/>' + params[0].seriesName;
                                        res += '<br/>  开盘 : ' + params[0].value[0]
                                            + '  最高 : ' + params[0].value[3];
                                        res += '<br/>  收盘 : ' + params[0].value[1]
                                            + '  最低 : ' + params[0].value[2];
                                    }
                                    for (var i = 2; i < params.length; i++) {
                                        res += params[i].seriesName + ':' + params[i].value;
                                    }
                                    return res;
                                }
                            }
                        },
                        legend: {
                            data: ['k线'],
                            paddind: 0,
                            height: 5,
                            itemWidth: 5,
                            itemHeight: 5,
                            textStyle: {
                                fontSize: 10
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside',
                                throttle: 0,
                                start: 0,
                                end: 100
                            }, {
                                type: 'slider',
                                show: false,
                                right: '5%',
                                throttle: 0,
                                start: 0,
                                end: 100
                            }
                        ],
                        grid: {
                            left: '10%',
                            right: '5%',
                            top: 30,
                            bottom: 20,
                        },
                        xAxis: [{
                            type: 'category',
                            scale: true,
                            boundaryGap: true,
                            axisTick: {
                                onGap: true
                            },
                            splitLine: {
                                show: false
                            },
                            data: data0.categoryData
                        }],
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            //min:'dataMin',
                            //max:'dataMax',
                            //splitNumber:10,
                            axisLabel: {
                                formatter: function (value, index) {
                                    return value.toFixed(2);
                                }
                            }
                        }],
                        series: [{
                            name: 'k线',
                            type: 'candlestick',
                            data: data0.values,
                            animation: false,
                            itemStyle: {
                                normal: {
                                    color0: '#137f57'
                                }
                            }
                        }]
                    };
                    if (efunc1) {
                        $("#klinecontainer2").show();
                    } else {
                        $("#klinecontainer2").hide();
                    }
                    if (ktype !== 'D1' && ktype !== 'Week1'
                        && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option.dataZoom = [
                            {
                                type: 'inside',
                                zoomLock: false,
                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            },
                            {
                                type: 'slider',
                                show: false,
                                zoomLock: false,
                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            }
                        ]
                    }

                    myChart.setOption(option);

                    var option2 = {
                        tooltip: {
                            position: function (point, params, dom) {
                                // 固定在顶部
                                return [point[0], '10%'];
                            },
                            trigger: 'axis',
                            showDelay: 0
                            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        color: ['#137f57'],
                        backgroundColor: '#fff',
                        legend: {
                            show: true,
                            paddind: 0,
                            paddind: 0,
                            height: 5,
                            itemWidth: 5,
                            itemHeight: 5,
                            textStyle: {
                                fontSize: 10
                            },
                            data: ['合并后的k线']
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params) {
                                var result;
                                var tar;
                                if (params[1].value === '-') {
                                    tar = params[1];
                                    result = tar.name + '<br/>最低' + params[0].value + '最高 :- ';
                                } else {
                                    tar = params[0];
                                    result = tar.name + '<br/>最低' + params[0].value + '最高 : '
                                        + (Number(params[0].value) + Number(params[1].value)).toFixed(2)
                                }
                                return result;
                            }
                        },
                        dataZoom: [{
                            type: 'slider',
                            show: true,
                            right: '15%',
                            bottom: '0%',
                            start: 0,
                            end: 100,
                        }, {
                            type: 'inside',
                            start: 0,
                            end: 100,
                        }],
                        grid: {
                            left: '10%',
                            right: '5%',
                            top: 30,
                            bottom: 25,
                        },
                        xAxis: [{
                            type: 'category',
                            // inverse:true,
                            // position: 'top',
                            scale: true,
                            boundaryGap: true,
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            data: data0.categoryData
                        }],
                        yAxis: [{
                            scale: true,
                            // inverse:true,
                            splitNumber: 2,
                            splitArea: {
                                show: true
                            },
                            axisLabel: {
                                show: true
                            },
                            axisLine: {
                                show: true
                            },
                            axisTick: {
                                show: true
                            },
                            splitLine: {
                                show: true
                            }
                        }],
                        series: [{
                            name: '辅助',
                            type: 'bar',
                            stack: '总量',
                            data: mergeKline.mindatas,
                            barWidth: 5,
                            animation: false,
                            itemStyle: {
                                normal: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                },
                                emphasis: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                }
                            },
                        },
                            {
                                name: '合并后的k线',
                                type: 'bar',
                                data: mergeKline.mergedata,
                                barWidth: 5,
                                stack: '总量',
                                animation: false,
                                itemStyle: {
                                    normal: {
                                        color: '#137f57',
                                    }
                                }
                            }]
                    };
                    if (ktype !== 'D1' && ktype !== 'Week1'
                        && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option2.dataZoom = [{
                            type: 'inside',
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        },
                            {
                                type: 'slider',
                                show: false,
                                zoomLock: false,

                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            }]
                    }
                    if (efunc2) {
                        option2.series[1].markLine = {
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: '#ff0000',
                                },
                                type: 'solid'
                            },
                            data: caculateline(mergeKline),
                            symbol: ['circle', 'circle'],
                            symbolSize: 3
                        }
                    }
                    myChart2.setOption(option2);
                    var option3 = {
                        tooltip: {
                            position: function (point, params, dom) {
                                // 固定在顶部
                                return [point[0], '10%'];
                            },
                            trigger: 'axis',
                            showDelay: 0,
                            formatter: function (params) {
                                if (params) {
                                    var text = new Array();
                                    text.push('<span class="k-date" ">' + (params[0].name) + "</span>");
                                    params.forEach(function (o) {
                                        text.push('<span class="data" style="color:' + o.color + '">'
                                            + (o.seriesName) + ':' + o.value + "</span>");
                                    })
                                    $('.VOLCurrent').html(text.join(''));
                                }
                                return '';
                            }
                            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        color: ['#c23531', '#ff69b4'],
                        backgroundColor: '#fff',
                        legend: {
                            paddind: 0,
                            show: false,
                            data: ['成交量'],
                            paddind: 0,
                            height: 5,
                            itemWidth: 5,
                            itemHeight: 5,
                            textStyle: {
                                fontSize: 10
                            }
                        },
                        dataZoom: [{
                            type: 'slider',
                            show: false,
                            right: '15%',
                            start: 0,
                            end: 100
                        }, {
                            type: 'inside',
                            start: 0,
                            end: 100
                        }],
                        grid: {
                            left: '10%',
                            right: '5%',
                            top: 10,
                            bottom: 25,
                            //height : '40%'
                        },
                        xAxis: [{
                            type: 'category',
                            // inverse:true,
                            // position: 'top',
                            scale: true,
                            boundaryGap: true,
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            data: data0.categoryData
                        }],
                        yAxis: [{
                            scale: true,
                            // inverse:true,
                            splitNumber: 2,
                            axisLabel: {
                                show: true
                            },
                            axisLine: {
                                show: true
                            },
                            axisTick: {
                                show: true
                            },
                            splitLine: {
                                show: true
                            }
                        }],
                        series: [{
                            name: '成交量',
                            type: 'bar',

                            data: data0.volumns,
                            barWidth: 5,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        var index = params.dataIndex;
                                        if (index === -1) {
                                            return '#c23531';
                                        }
                                        if (data0.values[index][1] <= data0.values[index][0]) {
                                            return '#137f57';
                                        } else {
                                            return '#c23531';
                                        }
                                    }
                                }
                            }
                        }]
                    }
                    if (ktype !== 'D1' && ktype !== 'Week1'
                        && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option3.dataZoom = [{
                            type: 'inside',
                            zoomLock: false,
                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        },
                            {
                                type: 'slider',
                                show: false,
                                zoomLock: false,

                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            }]
                    }
                    myChart3.setOption(option3);
                    var option4 = {
                        tooltip: {
                            position: function (point, params, dom) {
                                // 固定在顶部
                                return [point[0], '10%'];
                            },
                            trigger: 'axis',
                            showDelay: 0,
                            formatter: function (params) {
                                var text = new Array();
                                text.push('<span class="k-date" ">' + (params[0].name) + "</span>");
                                params.forEach(function (o) {
                                    text.push('<span class="data" style="color:'
                                        + o.color + '">' + o.seriesName + ':' + o.value + '</span>');
                                });
                                $('.MACDCurrent').html(text.join(''));
                                return '';
                            },
                            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        color: ['#ba55d3', '#7b68ee', '#ffa500'],
                        backgroundColor: '#fff',
                        legend: {
                            paddind: 0,
                            show: false,
                            data: ['DEA', 'DIF', 'MACD'],
                            height: 5,
                            itemWidth: 5,
                            itemHeight: 5,
                            textStyle: {
                                fontSize: 10
                            }
                        },
                        dataZoom: [{
                            type: 'inside',
                            show: true,
                            start: 0,
                            end: 100
                        }, {
                            type: 'slider',
                            right: '5%',
                            left: '10%',
                            show: true,
                            start: 0,
                            end: 100
                        }],
                        grid: {
                            left: '10%',
                            right: '5%',
                            top: 10,
                            bottom: 35,
                            //height : '40%'
                        },
                        xAxis: [{
                            type: 'category',
                            scale: true,
                            // inverse:true,
                            boundaryGap: true,
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            data: data0.categoryData
                        }],
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            // inverse:true,

                            splitNumber: 4,
                            axisLabel: {
                                show: true
                            },
                            axisLine: {
                                show: true
                            },
                            axisTick: {
                                show: true
                            },
                            splitLine: {
                                show: true
                            }
                        }],
                        series: [{
                            name: 'DEA',
                            type: 'line',
                            smooth: true,
                            data: MACDResults.DEA,
                        },
                            {
                                name: 'DIF',
                                type: 'line',
                                smooth: true,
                                data: MACDResults.DIF,
                            },
                            {
                                name: 'MACD',
                                type: 'bar',
                                data: MACDResults.MACD,
                                barWidth: 5,
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            // console.log(params);
                                            if (params.data === null || params.data > 0) {
                                                return '#ffa500';
                                            } else {
                                                return '#7CFC00 ';
                                            }
                                        }
                                    }
                                }
                            }]
                    }
                    if (ktype !== 'D1' && ktype !== 'Week1'
                        && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option4.dataZoom = [
                            {
                                type: 'inside',
                                zoomLock: false,
                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            },
                            {
                                type: 'slider',
                                zoomLock: false,
                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            }
                        ]
                    }
                    myChart4.setOption(option4);
                    var option5 = {
                        tooltip: {
                            position: function (point, params, dom) {
                                // 固定在顶部
                                return [point[0], '10%'];
                            },
                            trigger: 'axis',
                            showDelay: 0,
                            formatter: function (params) {
                                var text = new Array();
                                text.push('<span class="k-date" ">' + (params[0].name) + "</span>");
                                params.forEach(function (o) {
                                    text.push('<span class="data" style="color:' + o.color + '">'
                                        + o.seriesName + ':' + o.value + '</span>');
                                });
                                $('.KDJCurrent').html(text.join(''));
                                return '';
                            },
                            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        backgroundColor: '#fff',
                        color: ['#ffa500', '#0000ff', '#ff0000'],
                        legend: {
                            paddind: 0,
                            show: false,
                            height: 5,
                            itemWidth: 5,
                            itemHeight: 5,
                            textStyle: {
                                fontSize: 10
                            },
                            data: ['K', 'D', 'J']
                        },
                        dataZoom: [
                            {
                                type: 'inside',
                                show: true,
                                start: 0,
                                end: 100
                            }, {
                                type: 'slider',
                                right: '10%',
                                left: '5%',
                                bottom: 0,
                                show: true,
                                start: 0,
                                end: 100
                            }
                        ],
                        grid: {
                            left: '10%',
                            right: '5%',
                            top: 10,
                            bottom: 35,
                            //height : '40%'
                        },
                        xAxis: [{
                            type: 'category',
                            scale: true,
                            // inverse:true,
                            boundaryGap: true,
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            data: data0.categoryData
                        }],
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            // inverse:true,
                            splitNumber: 4,
                            axisLabel: {
                                show: true
                            },
                            axisLine: {
                                show: true
                            },
                            axisTick: {
                                show: true
                            },
                            splitLine: {
                                show: true
                            }
                        }],
                        series: [
                            {
                                name: 'K',
                                type: 'line',
                                smooth: true,
                                data: KDJResults.K,
                            }, {
                                name: 'D',
                                type: 'line',
                                smooth: true,
                                data: KDJResults.D,
                            }, {
                                name: 'J',
                                type: 'line',
                                data: KDJResults.J,
                            }
                        ]
                    }
                    if (ktype !== 'D1' && ktype !== 'Week1'
                        && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option5.dataZoom = [
                            {
                                type: 'inside',
                                zoomLock: false,
                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            },
                            {
                                type: 'slider',
                                zoomLock: false,
                                startValue: data0.categoryData.length - 100,
                                endValue: data0.categoryData.length - 1
                            }
                        ]
                    }
                    myChart5.setOption(option5);
                    echarts.connect([myChart, myChart2, myChart3, myChart4, myChart5]);
                }
            }
        })
    }

    //全屏显示
    $('.show-k').click(function () {
        if (!$(this).hasClass('enter-full')) {
            $(this).addClass('enter-full').text('退出全屏');
            $('.search-kline-details').addClass('full');
            $('.s-kgraph').addClass('s-graph');
            $('.e-kgraph').addClass('e-fgraph')
            $('.search-k').removeClass('col-sm-12');
            $('#searchkline').removeClass('col-sm-9');

            $('.nav-top').hide();
            var myChart = echarts.getInstanceByDom(document
                    .getElementById('klinecontainer'),
                shine);
            var myChart2 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer2'));
            var myChart3 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer3'));
            var myChart4 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer4'));
            var myChart5 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer5'));
            myChart.resize();
            myChart2.resize();
            myChart3.resize();
            myChart4.resize();
            myChart5.resize();

        } else {
            $(this).removeClass('enter-full').text('全屏显示');
            $('.search-kline-details').removeClass('full');
            $('.s-kgraph').removeClass('s-graph');
            $('.e-kgraph').removeClass('e-fgraph')
            $('.search-k').addClass('col-sm-12');
            $('#searchkline').addClass('col-sm-9');
            $('.nav-top').show();
            var myChart = echarts.getInstanceByDom(document
                    .getElementById('klinecontainer'),
                shine);
            var myChart2 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer2'));
            var myChart3 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer3'));
            var myChart4 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer4'));
            var myChart5 = echarts.getInstanceByDom(document
                .getElementById('klinecontainer5'));
            myChart.resize();
            myChart2.resize();
            myChart3.resize();
            myChart4.resize();
            myChart5.resize();

        }

    })

    // k线图买卖点
    function kline(stockCode, macdinitTime, endTime, ktrades, ktype, restorationtype) {
        var startTime, startT
        if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {
            startTime = '01/01/2000 00:00:00 AM';

        } else if (ktype === 'M5') {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24
                * 60 * 5);

        } else if (ktype === 'M15') {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24
                * 60 * 15);

        } else if (ktype === 'M30') {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24
                * 60 * 30)
                + ' 9:00:00 PM';
            startT = macdinitTime - 60 * 60 * 1000 * 24 * 30
        } else {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24
                * 60 * 60)
                + ' 9:00:00 PM';
        }


        var tradePrices = [];
        var tradeObjects = [];
        var trdes = []
        var times = [];
        for (var i = 0; i < ktrades.length; i++) {
            tradePrices.push(ktrades[i].value);
            if (ktype === 'D1' || ktype === 'Week1'
                || ktype === 'Month1') {
                var index = ktrades[i].xAxis.indexOf(' ');


                trdes.push({
                    name: ktrades[i].name,
                    value: ktrades[i].value,
                    xAxis: ktrades[i].xAxis.substring(0,
                        index),
                    yAxis: ktrades[i].yAxis,

                });

            }

        }

        var url = host
            + '/Klines?instrument='
            + stockCode + '&kType=' + ktype + '&startTime='
            + startTime + '&endTime=' + endTime + '&weightingType=' + restorationtype;

        $
            .ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                beforeSend: function () {
                    $(".loading").show();
                },
                complete: function () {
                    $(".loading").hide();

                },
                timeout: 2000,
                success: function (data) {
                    var list = data.Data;
                    var data0 = splitData(list, '', ktype);

                    $("#kcontainer").show();
                    $("#kcontainer2").show();
                    // $("#kcontainer3").show();
                    if ($('.zibtype .press').hasClass(
                        'klist-macd')) {
                        $("#kcontainer3").show();
                    } else {
                        $("#kcontainer4").show();
                    }
                    if (data0.categoryData.length > 0) {

                        for (var i = 0; i < data0.categoryData.length; i++) {
                            tradePrices
                                .push(data0.values[i][3]);
                            tradePrices
                                .push(data0.values[i][2]);

                            for (var j = 0; j < trdes.length; j++) {
                                if (data0.categoryData[i] === trdes[j].xAxis) {
                                    if (trdes[j].name
                                        .indexOf('买入') > 0) {

                                        tradeObjects
                                            .push({
                                                'name': '买入',
                                                'coord': [
                                                    i,
                                                    data0.values[i][3]],
                                                'symbol': 'emptyPin',
                                                symbolOffset: [0, -5],
                                                'symbolSize': 10,
                                                'label': {
                                                    'normal': {
                                                        'show': true,
                                                        position: 'top',
                                                    }
                                                }
                                            });

                                    }
                                    if (trdes[j].name
                                        .indexOf('卖出') > 0) {

                                        tradeObjects
                                            .push({
                                                'name': '卖出',
                                                'coord': [
                                                    i,
                                                    data0.values[i][2]],
                                                'symbol': 'emptypin',
                                                'symbolSize': 10,
                                                symbolOffset: [0, 5],
                                                'symbolRotate': 180,
                                                'itemStyle': {
                                                    'normal': {
                                                        color: 'green'
                                                    }
                                                },
                                                'label': {
                                                    'normal': {
                                                        show: true,
                                                        position: 'bottom'
                                                    }
                                                }
                                            });
                                    }
                                }
                            }

                        }
                        var maxvalue = Math.max.apply(null,
                            tradePrices);
                        var minvalue = Math.min.apply(null,
                            tradePrices);
                        var addPoint = (((maxvalue - minvalue) / 0.8) - (maxvalue - minvalue)) / 2

                        var MACDResults = calulateMACD(list, '');
                        var KDJResults = calculateKDJ(list, '',
                            9);


                        var myChart = echarts.init(document
                                .getElementById('kcontainer'),
                            shine);
                        var myChart2 = echarts.init(document
                            .getElementById('kcontainer2'));
                        var title = $('.modal-title').attr(
                            'data-stockname');
                        var option = {
                            title: {
                                text: title,

                            },
                            color: ['#ff7f50', '#87cefa',
                                '#40e0d0', '#c23531',
                                '#ff69b4', '#ba55d3',
                                '#7b68ee', '#ffa500'],
                            tooltip: {
                                trigger: 'axis',
                                showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                                alwaysShowContent: true,
                                position: function (point, params, dom) {
                                    // 固定在顶部

                                    if (point[0] > 300) {
                                        return ['0%', '10%'];
                                    } else {
                                        return ['80%', '10%'];
                                    }

                                },


                                formatter: function (params) {
                                    if (params) {

                                        var res;
                                        if (params.componentType === 'markPoint') {

                                            var index = params.data.coord[0];
                                            console.log(params);
                                            var time = data0.categoryData[index];
                                            res = time;
                                            res += '<br/>'
                                                + params.name
                                                + ':'
                                                + trades[params.dataIndex].value;
                                        }
                                        if (params[0]) {
                                            res = params[0].name;
                                            res += '<br/>'
                                                + params[0].seriesName;
                                            res += '<br/>  开盘 : '
                                                + params[0].value[0]
                                                + '  最高 : '
                                                + params[0].value[3];
                                            res += '<br/>  收盘 : '
                                                + params[0].value[1]
                                                + '  最低 : '
                                                + params[0].value[2];
                                        }
                                        if (params[1]) {
                                            res += '<br/>  MA5 : '
                                                + params[1].value;
                                        }
                                        if (params[2]) {
                                            res += '<br/>  MA10 : '
                                                + params[2].value;
                                        }
                                        if (params[3]) {
                                            res += '<br/>  MA30 : '
                                                + params[3].value;
                                        }

                                        return res;
                                    }
                                }
                            },
                            legend: {
                                data: ['k线', 'MA5', 'MA10',
                                    'MA30'],

                            },
                            dataZoom: [{
                                type: 'inside',

                                start: 0,
                                end: 100
                            }, {
                                type: 'slider',
                                show: false,
                                right: '15%',

                                start: 0,
                                end: 100
                            }],
                            grid: {
                                left: '15%',
                                right: '15%',

                            },
                            xAxis: [{
                                type: 'category',
                                scale: true,
                                boundaryGap: true,
                                axisTick: {
                                    onGap: true
                                },
                                splitLine: {
                                    show: false
                                },
                                data: data0.categoryData
                            }],
                            yAxis: [{
                                type: 'value',
                                scale: true,


                            }],
                            series: [
                                {
                                    name: 'k线',
                                    type: 'candlestick',
                                    data: data0.values,

                                    itemStyle: {
                                        normal: {
                                            color0: '#137f57'
                                        }
                                    },
                                    markPoint: {

                                        symbolRotate: 0,

                                        label: {
                                            normal: {
                                                show: true,
                                                //position : 'bottom',
                                                formatter: function (
                                                    params) {
                                                    // console.log(params)
                                                    var res;
                                                    res = params.name;

                                                    return res;
                                                },
                                                textStyle: {
                                                    color: '#0000ff'
                                                }
                                            }
                                        },
                                        data: tradeObjects
                                    }

                                },

                                {
                                    name: 'MA5',
                                    type: 'line',
                                    data: calculateMA(5,
                                        data0),
                                    smooth: true,

                                },
                                {
                                    name: 'MA10',
                                    type: 'line',
                                    data: calculateMA(10,
                                        data0),
                                    smooth: true,

                                },

                                {
                                    name: 'MA30',
                                    type: 'line',
                                    data: calculateMA(30,
                                        data0),
                                    smooth: true,

                                },

                            ]
                        };

                        if (ktype !== 'D1'
                            && ktype !== 'Week1'
                            && ktype !== 'Month1'
                            || data0.categoryData.length > 100) {
                            option.dataZoom = [
                                {
                                    type: 'inside',
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                },
                                {
                                    type: 'slider',
                                    show: false,
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                }]
                        }
                        myChart.setOption(option);

                        var option2 = {
                            tooltip: {
                                position: function (point,
                                                    params, dom) {
                                    // 固定在顶部
                                    return [point[0], '10%'];
                                },
                                trigger: 'axis',
                                showDelay: 0
                                // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            },
                            color: ['#c23531', '#ff69b4'],
                            legend: {
                                show: true,

                                data: ['成交量', '5日均量']
                            },
                            dataZoom: [{
                                type: 'slider',
                                show: false,
                                right: '15%',

                                start: 0,
                                end: 100
                            }, {
                                type: 'inside',

                                start: 0,
                                end: 100
                            }],

                            grid: {
                                left: '15%',
                                right: '15%',

                                height: '60%'
                            },
                            xAxis: [{
                                type: 'category',
                                // inverse:true,
                                // position: 'top',
                                scale: true,
                                boundaryGap: true,
                                axisLabel: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                data: data0.categoryData
                            }],
                            yAxis: [{
                                scale: true,
                                // inverse:true,
                                splitNumber: 2,
                                axisLabel: {
                                    show: true
                                },
                                axisLine: {
                                    show: true
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                }
                            }],
                            series: [
                                {
                                    name: '成交量',
                                    type: 'bar',

                                    data: data0.volumns,
                                    barWidth: 5,
                                    itemStyle: {
                                        normal: {
                                            color: function (
                                                params) {

                                                var index = params.dataIndex;

                                                if (index === -1) {
                                                    return '#c23531';
                                                }
                                                if (data0.values[index][1] <= data0.values[index][0]) {
                                                    return '#137f57';
                                                } else {
                                                    return '#c23531';
                                                }

                                            }
                                        }

                                    }

                                },
                                {
                                    name: '5日均量',
                                    type: 'line',
                                    data: calculateMavol(
                                        5, data0),
                                    smooth: true,
                                    itemStyle: {
                                        normal: {
                                            color: '#ff69b4',
                                        }
                                    }
                                }]
                        };
                        var mychart3 = echarts.init(document
                            .getElementById('kcontainer3'));
                        var option3 = {
                            tooltip: {
                                position: function (point,
                                                    params, dom) {
                                    // 固定在顶部
                                    return [point[0], '10%'];
                                },
                                trigger: 'axis',
                                showDelay: 0
                                // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            },
                            color: ['#ba55d3', '#7b68ee',
                                '#ffa500'],
                            legend: {

                                data: ['DEA', 'DIF', 'MACD']
                            },
                            toolbox: {
                                y: -40,
                                show: true,
                                feature: {
                                    mark: {
                                        show: true
                                    },
                                    dataZoom: {
                                        show: true
                                    },
                                    dataView: {
                                        show: true,
                                        readOnly: false
                                    },
                                    magicType: {
                                        show: true,
                                        type: ['line', 'bar']
                                    },
                                    restore: {
                                        show: true
                                    },
                                    saveAsImage: {
                                        show: true
                                    }
                                }
                            },
                            dataZoom: [{
                                type: 'inside',
                                show: true,

                                start: 0,
                                end: 100
                            }, {
                                type: 'slider',
                                right: '15%',
                                left: '15%',

                                show: true,
                                start: 0,
                                end: 100
                            }],
                            grid: {
                                left: '15%',
                                right: '15%',
                                bottom: '18%',

                                height: '70%'
                            },
                            xAxis: [{
                                type: 'category',
                                scale: true,
                                // inverse:true,
                                boundaryGap: true,
                                axisLabel: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                data: data0.categoryData
                            }],
                            yAxis: [{
                                type: 'value',
                                scale: true,
                                // inverse:true,

                                splitNumber: 4,
                                axisLabel: {
                                    show: true
                                },
                                axisLine: {
                                    show: true
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                }
                            }],
                            series: [
                                {
                                    name: 'DEA',
                                    type: 'line',
                                    smooth: true,
                                    data: MACDResults.DEA,

                                },
                                {
                                    name: 'DIF',
                                    type: 'line',
                                    smooth: true,
                                    data: MACDResults.DIF,

                                },
                                {
                                    name: 'MACD',
                                    type: 'bar',

                                    data: MACDResults.MACD,
                                    barWidth: 5,
                                    itemStyle: {
                                        normal: {
                                            color: function (
                                                params) {
                                                // console.log(params);
                                                if (params.data === null
                                                    || params.data > 0) {
                                                    return '#ffa500';
                                                } else {
                                                    return '#7CFC00 ';
                                                }
                                            }
                                        }
                                    }

                                }]
                        };
                        var mychart4 = echarts.init(document
                            .getElementById('kcontainer4'));
                        var option4 = {
                            tooltip: {
                                position: function (point,
                                                    params, dom) {
                                    // 固定在顶部
                                    return [point[0], '10%'];
                                },
                                trigger: 'axis',
                                showDelay: 0
                                // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            },
                            color: ['#ffa500', '#0000ff',
                                '#ff0000'],
                            legend: {

                                right: '20%',
                                top: '-2%',
                                data: ['K', 'D', 'J']
                            },
                            toolbox: {
                                y: -40,
                                show: true,
                                feature: {
                                    mark: {
                                        show: true
                                    },
                                    dataZoom: {
                                        show: true
                                    },
                                    dataView: {
                                        show: true,
                                        readOnly: false
                                    },
                                    magicType: {
                                        show: true,
                                        type: ['line', 'bar']
                                    },
                                    restore: {
                                        show: true
                                    },
                                    saveAsImage: {
                                        show: true
                                    }
                                }
                            },
                            dataZoom: [{
                                type: 'inside',
                                show: true,

                                start: 0,
                                end: 100
                            }, {
                                type: 'slider',
                                right: '15%',
                                left: '15%',
                                bottom: 0,
                                show: true,

                                start: 0,
                                end: 100
                            }],
                            grid: {
                                left: '15%',
                                right: '15%',
                                bottom: '15%',

                                height: '80%'
                            },
                            xAxis: [{
                                type: 'category',
                                scale: true,
                                // inverse:true,
                                boundaryGap: true,
                                axisLabel: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                data: data0.categoryData
                            }],
                            yAxis: [{
                                type: 'value',
                                scale: true,
                                // inverse:true,

                                splitNumber: 4,
                                axisLabel: {
                                    show: true
                                },
                                axisLine: {
                                    show: true
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                }
                            }],
                            series: [{
                                name: 'K',
                                type: 'line',
                                smooth: true,
                                data: KDJResults.K,

                            }, {
                                name: 'D',
                                type: 'line',
                                smooth: true,
                                data: KDJResults.D,

                            }, {
                                name: 'J',
                                type: 'line',

                                data: KDJResults.J,

                            }]
                        }

                        if (ktype !== 'D1'
                            && ktype !== 'Week1'
                            && ktype !== 'Month1'
                            || data0.categoryData.length > 100) {
                            option2.dataZoom = [
                                {
                                    type: 'inside',
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                },
                                {
                                    type: 'slider',
                                    show: false,
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                }]
                        }
                        myChart2.setOption(option2);
                        if (ktype !== 'D1'
                            && ktype !== 'Week1'
                            && ktype !== 'Month1'
                            || data0.categoryData.length > 100) {
                            option3.dataZoom = [
                                {
                                    type: 'inside',
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                },
                                {
                                    type: 'slider',
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                }]
                        }
                        mychart3.setOption(option3);
                        if (ktype !== 'D1'
                            && ktype !== 'Week1'
                            && ktype !== 'Month1'
                            || data0.categoryData.length > 100) {
                            option4.dataZoom = [
                                {
                                    type: 'inside',
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                },
                                {
                                    type: 'slider',
                                    zoomLock: false,

                                    startValue: data0.categoryData.length - 100,
                                    endValue: data0.categoryData.length - 1
                                }]
                        }
                        mychart4.setOption(option4)

                        // myChart.connect([ myChart2, mychart3
                        // ]);
                        // myChart2.connect([ myChart, mychart3
                        // ]);
                        // mychart3.connect([ myChart, myChart2
                        // ]);
                        echarts.connect([myChart, myChart2,
                            mychart3, mychart4]);

                    } else {
                        $("#kcontainer").hide();
                        $("#kcontainer2").hide();
                        $("#kcontainer3").hide();
                    }

                }

            });

    }

    // 计算KDJ
    function calculateKDJ(data, startT, dayCount) {
        var k, d, j, L, H, RSV;
        var maxArray = [];
        var minArray = [];
        var kLists = [];
        var dLists = [];
        var jLists = [];

        var list = data;
        for (var i = 0; i < list.length; i++) {
            var time = /\d+(?=\+)/.exec(list[i].KLineTime)[0];
            maxArray = [];
            minArray = [];
            if (i >= dayCount - 1) {
                for (var j = 0; j < dayCount; j++) {
                    maxArray.push(list[i - j].HighestPrice);
                    minArray.push(list[i - j].LowestPrice);
                }
                H = Math.max.apply(null, maxArray);
                L = Math.min.apply(null, minArray);
                if (H === L) {
                    RSV = 100;
                } else {
                    RSV = (list[i].ClosingPrice - L) / (H - L)
                        * 100;
                }

                if (i === dayCount - 1) {
                    k = ((2 / 3) * 50 + (1 / 3) * RSV).toFixed(2);
                    d = ((2 / 3) * 50 + (1 / 3) * k).toFixed(2);

                } else {
                    k = ((2 / 3) * k + (1 / 3) * RSV).toFixed(2);
                    d = ((2 / 3) * d + (1 / 3) * k).toFixed(2);
                }
                j = 3 * k - 2 * d;
                if (Number(time) >= startT || startT === '') {
                    kLists.push(k);
                    dLists.push(d);
                    jLists.push(j.toFixed(2))
                }

            } else {
                kLists.push('-');
                dLists.push('-');
                jLists.push('-')
            }

        }
        return {
            'K': kLists,
            'D': dLists,
            'J': jLists

        }

    }

    // 计算MACD
    function calulateMACD(data, startT) {

        var EMA12, DIF, EMA26, DEA, MACD;
        var sum = 0;
        var sumDIF = 0;
        var DIFS = [];
        var DEAS = [];
        var MACDS = [];
        var result = [];

        var list = data;
        for (var i = 0; i < list.length; i++) {

            var time = /\d+(?=\+)/.exec(list[i].KLineTime)[0];

            if (i === 0) {
                EMA12 = list[i].ClosingPrice;
                EMA26 = list[i].ClosingPrice
                DEA = 0;

            } else {
                EMA12 = (11 / 13) * EMA12 + (2 / 13)
                    * list[i].ClosingPrice;
                EMA26 = (25 / 27) * EMA26 + (2 / 27)
                    * list[i].ClosingPrice;
            }

            DIF = EMA12 - EMA26
            DEA = (8 / 10) * DEA + (2 / 10) * DIF;
            MACD = 2 * (DIF - DEA);
            if (Number(time) >= startT || startT === '') {
                DIFS.push(DIF.toFixed(4));
                DEAS.push(DEA.toFixed(4));
                MACDS.push(MACD.toFixed(4));
            }

        }
        return {
            'DIF': DIFS,
            'DEA': DEAS,
            'MACD': MACDS
        };

    }

    function calculateMA(dayCount, data) {
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += Number(data.values[i - j][1]);
            }

            result.push(+(sum / dayCount).toFixed(3));

        }
        return result;
    }

    function calculateMavol(dayCount, data) {
        var result = [];
        for (var i = 0, len = data.volumns.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data.volumns[i - j];
            }

            result.push(+(sum / dayCount).toFixed(3));

        }
        return result;
    }

    function splitData(rawData, startT, ktype) {
        var categoryDatas;
        var categoryData = [];

        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
            var time = /\d+(?=\+)/.exec(rawData[i].KLineTime)[0];
            if (Number(time) >= startT || startT === '') {

                if (ktype === 'D1' || ktype === 'Week1'
                    || ktype === 'Month1') {
                    categoryData
                        .push(jsonTimeToDate(rawData[i].KLineTime));
                } else {
                    categoryData
                        .push(jsonTimeToDateTime(rawData[i].KLineTime));
                }

                volumns.push(rawData[i].Volume);
                values.push([Number(rawData[i].OpenPrice.toFixed(2)),
                    Number(rawData[i].ClosingPrice.toFixed(2)),
                    Number(rawData[i].LowestPrice.toFixed(2)),
                    Number(rawData[i].HighestPrice.toFixed(2))]);
            }

        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    }

    //k线合并
    function mergeData(rawData) {
        var mergedata = [];
        var mindatas = [];
        var maxdatas = [];
        var maxArray = [];
        var minArray = [];
        var tempdata = [];
        var higthse, lowlost;

        for (var i = 0; i < rawData.length; i++) {
            if (i <= 1) {
                mergedata.push((rawData[i].HighestPrice - rawData[i].LowestPrice).toFixed(2));
                mindatas.push(rawData[i].LowestPrice.toFixed(2));
                maxdatas.push(rawData[i].HighestPrice.toFixed(2));

                tempdata.push([i, rawData[i].LowestPrice.toFixed(2), rawData[i].HighestPrice.toFixed(2)]);
            } else {


                if ((rawData[i].LowestPrice.toFixed(2) <= tempdata[tempdata.length - 1][1] && rawData[i].HighestPrice.toFixed(2) >= tempdata[tempdata.length - 1][2]) || (rawData[i].LowestPrice.toFixed(2) >= tempdata[tempdata.length - 1][1] && rawData[i].HighestPrice.toFixed(2) <= tempdata[tempdata.length - 1][2])) {
                    maxArray.push(rawData[i].HighestPrice.toFixed(2));
                    minArray.push(rawData[i].LowestPrice.toFixed(2));

                    for (var j = 1; j <= 1; j++) {
                        maxArray.push(tempdata[tempdata.length - j][2]);
                        minArray.push(tempdata[tempdata.length - j][1]);
                    }
                    if (tempdata[tempdata.length - 2][1] < tempdata[tempdata.length - 1][1]) {
                        higthse = Math.max.apply(null, maxArray);
                        lowlost = Math.max.apply(null, minArray);
                    } else {
                        higthse = Math.min.apply(null, maxArray);
                        lowlost = Math.min.apply(null, minArray);
                    }
                    maxArray = [];
                    minArray = [];
                    tempdata[tempdata.length - 1] = [i, lowlost, higthse];
                    mindatas[mindatas.length - 1] = '-';
                    mergedata[mergedata.length - 1] = '-';
                    mindatas.push(lowlost.toFixed(2));
                    mergedata.push((higthse - lowlost));

                } else {
                    tempdata.push([i, rawData[i].LowestPrice.toFixed(2), rawData[i].HighestPrice.toFixed(2)]);
                    mindatas.push(rawData[i].LowestPrice.toFixed(2));
                    mergedata.push((rawData[i].HighestPrice.toFixed(2) - rawData[i].LowestPrice.toFixed(2)));
                }
            }
        }
        return {
            'tempdatas': tempdata,
            'mindatas': mindatas,
            'mergedata': mergedata
        }

    }

    //画笔
    function caculateline(mergeKline) {
        var dataArrary = [];
        var bottomArray = [];
        var tempdata = mergeKline.tempdatas;
        var drawArray = [];
        var markLineData = [];
        //0为顶，1为底
        for (var i = 0; i < tempdata.length; i++) {
            if (i >= 1 && i !== tempdata.length - 1) {
                if (tempdata[i][1] > tempdata[i - 1][1] && tempdata[i][1] > tempdata[i + 1][1]) {
                    dataArrary.push([tempdata[i][0], tempdata[i][2], 0, i, tempdata[i - 1][1], tempdata[i + 1][1], tempdata[i - 1][2], tempdata[i + 1][2]]);

                }
                if (tempdata[i][1] < tempdata[i - 1][1] && tempdata[i][1] < tempdata[i + 1][1]) {
                    dataArrary.push([tempdata[i][0], tempdata[i][1], 1, i, tempdata[i - 1][1], tempdata[i + 1][1], tempdata[i - 1][2], tempdata[i + 1][2]]);
                }

            }


        }
        for (i = 0; i < dataArrary.length; i++) {
            if (i === 0) {
                drawArray.push(dataArrary[i]);
            } else {
                if (dataArrary[i][2] === 0 && drawArray[drawArray.length - 1][2] === 0) {
                    if (dataArrary[i][1] > drawArray[drawArray.length - 1][1]) {
                        drawArray[drawArray.length - 1] = dataArrary[i]
                    }

                }
                if (dataArrary[i][2] === 1 && drawArray[drawArray.length - 1][2] === 1) {
                    if (dataArrary[i][1] < drawArray[drawArray.length - 1][1]) {
                        drawArray[drawArray.length - 1] = dataArrary[i]
                    }

                }
                if ((dataArrary[i][2] === 1 && drawArray[drawArray.length - 1][2] === 0) || (dataArrary[i][2] === 0 && drawArray[drawArray.length - 1][2] === 1)) {
                    if (dataArrary[i][0] - drawArray[drawArray.length - 1][0] > 5 && ((dataArrary[i][3] - 1) !== (drawArray[drawArray.length - 1][3] + 1))) {
                        if ((dataArrary[i][2] === 1 && drawArray[drawArray.length - 1][2] === 0)) {
                            if (dataArrary[i][1] < drawArray[drawArray.length - 1][4] && dataArrary[i][1] < drawArray[drawArray.length - 1][5] && drawArray[drawArray.length - 1][1] > dataArrary[i][6] && drawArray[drawArray.length - 1][1] > dataArrary[i][7]) {
                                drawArray.push(dataArrary[i]);
                            }
                        }
                        if (dataArrary[i][2] === 0 && drawArray[drawArray.length - 1][2] === 1) {
                            if (dataArrary[i][1] > drawArray[drawArray.length - 1][6] && dataArrary[i][1] > drawArray[drawArray.length - 1][7] && drawArray[drawArray.length - 1][1] < dataArrary[i][4] && drawArray[drawArray.length - 1][1] < dataArrary[i][5]) {
                                drawArray.push(dataArrary[i]);
                            }
                        }


                    }
                }

            }
        }
        for (i = 0; i < drawArray.length; i++) {
            if (i !== drawArray.length - 1) {
                markLineData.push([{
                    value: drawArray[i][1],
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    'coord': [drawArray[i][0], drawArray[i][1]]


                }, {
                    value: drawArray[i + 1][1],
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    },
                    'coord': [drawArray[i + 1][0], drawArray[i + 1][1]]
                }]);
            }

        }
        return markLineData;
    }

    function toLastMonth(time) {
        var timeDate = new Date(time);
        var ymdhis = "";
        month = (timeDate.getMonth()) >= 10 ? (timeDate.getMonth())
            : "0" + (timeDate.getMonth());
        ymdhis += month + "/";
        date = timeDate.getDate() >= 10 ? timeDate.getDate() : "0"
            + timeDate.getDate();
        ymdhis += date + '/';
        ymdhis += timeDate.getFullYear();

        return ymdhis;
    }

    function jsonTimeToDate(str) {

        var tmp = /\d+(?=\+)/.exec(str);

        var d = new Date(+tmp);
        var ymdhis = '';
        ymdhis += d.getFullYear() + "-";
        month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0"
            + (d.getMonth() + 1);
        ymdhis += month + "-";
        date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        ymdhis += date;
        return ymdhis;

    }

    function jsonTimeToDateTime(str) {
        var houe, ymdhis, minutes, second, month, hour;
        var ymdhis = ''

        var tmp = /\d+(?=\+)/.exec(str);
        var d = new Date(+tmp);
        ymdhis += d.getFullYear() + "-";
        month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0"
            + (d.getMonth() + 1);
        ymdhis += month + "-";
        date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        ymdhis += date + ' ';
        hour = d.getHours() >= 10 ? d.getHours() : "0"
            + d.getHours();
        ymdhis += hour + ":";
        minutes = d.getMinutes() >= 10 ? d.getMinutes() : "0"
            + d.getMinutes();
        ymdhis += minutes + ":";
        second = d.getSeconds() >= 10 ? d.getSeconds() : "0"
            + d.getSeconds();
        ymdhis += second;
        return ymdhis;

    }

    function jsonTimeToTime(str) {
        var houe, ymdhis, minutes, second;

        var tmp = /\d+(?=\+)/.exec(str);
        var d = new Date(+tmp);
        hour = d.getHours() >= 10 ? d.getHours() : "0"
            + d.getHours();
        ymdhis = hour + ":";
        minutes = d.getMinutes() >= 10 ? d.getMinutes() : "0"
            + d.getMinutes();
        ymdhis += minutes + ":";
        second = d.getSeconds() >= 10 ? d.getSeconds() : "0"
            + d.getSeconds();
        ymdhis += second;
        return ymdhis;

    }

    function dataFix(data, container) {
        var result;
        if (data > 0) {
            $(container).css("color", "red");

        } else if (data < 0) {
            $(container).css("color", "green");
        } else {
            $(container).css("color", "");
        }
        if (data === null) {
            result = "N/A";
        } else {
            result = data;
        }
        return result;
    }

    $('#annualratelist').change(function () {

        var rate = dataFix($(this).find("option:selected").attr('data-rate'), '.annaul-span');
        $('.annaul-span').text((rate * 100)
                .toFixed(2)
            + "%");
    })

    // 收益率详情
    function yieldDetails(name) {
        $
            .ajax({
                url: '/APP-admin/model/profit/statistics?modelName='
                    + name,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var table = $("#ratetable").dataTable();
                    var oSettings = table.fnSettings();
                    var temp = [];
                    var $tbody = $("#ratetable tbody");
                    table.fnClearTable(this);
                    if (data.success && data.data.length > 0) {
                        $tbody.show();
                        var list = data.data;
                        var oneMonthReturnRatio, threeMonthReturnRatio, halfYearReturnRatio, yearReturnRatio;

                        for (var i = 0; i < list.length; i++) {

                            if (list[i].oneMonthReturnRatio === null) {
                                oneMonthReturnRatio = '--';
                            } else {
                                oneMonthReturnRatio = (list[i].oneMonthReturnRatio * 100)
                                    .toFixed(2);
                            }
                            if (list[i].threeMonthReturnRatio === null) {
                                threeMonthReturnRatio = '--';
                            } else {
                                threeMonthReturnRatio = (list[i].threeMonthReturnRatio * 100)
                                    .toFixed(2);
                            }

                            if (list[i].halfYearReturnRatio === null) {
                                halfYearReturnRatio = '--';
                            } else {
                                halfYearReturnRatio = (list[i].halfYearReturnRatio * 100)
                                    .toFixed(2);
                            }
                            if (list[i].yearReturnRatio === null) {
                                yearReturnRatio = '--';
                            } else {
                                yearReturnRatio = (list[i].yearReturnRatio * 100)
                                    .toFixed(2);
                            }
                            var ss = [list[i].statisticsMonth,
                                oneMonthReturnRatio,
                                threeMonthReturnRatio,
                                halfYearReturnRatio,
                                yearReturnRatio];
                            temp.push(ss);
                            table.oApi
                                ._fnAddData(oSettings, ss);

                        }
                        oSettings.aiDisplay = oSettings.aiDisplayMaster
                            .slice();
                        table.fnDraw();

                    } else {
                        $tbody.hide();
                    }

                },
                error: function (jqXHR, testStatus, errorThrow) {
                    console.log(jqXHR);

                }
            });

    }

    // 最大回撤
    function retracement(name) {
        $
            .ajax({
                url: '/APP-admin/model/drawdown/statistics?modelName='
                    + name,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var table = $('#retracementtable')
                        .dataTable();
                    var oSettings = table.fnSettings();
                    var temp = [];
                    table.fnClearTable(this);
                    var $tbody = $("#retracementtable tbody");
                    if (data.success && data.data.length > 0) {
                        $tbody.show();
                        var list = data.data;
                        var oneMonthRetreatRatio, threeMonthRetreatRatio, halfYearRetreatRatio, yearRetreatRatio;
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].oneMonthRetreatRatio === null) {
                                oneMonthRetreatRatio = '--';
                            } else {
                                oneMonthRetreatRatio = (list[i].oneMonthRetreatRatio * 100);
                            }
                            if (list[i].threeMonthRetreatRatio === null) {
                                threeMonthRetreatRatio = '--';
                            } else {
                                threeMonthRetreatRatio = (list[i].threeMonthRetreatRatio * 100)
                                    .toFixed(2);
                            }
                            if (list[i].halfYearRetreatRatio === null) {
                                halfYearRetreatRatio = '--';

                            } else {
                                halfYearRetreatRatio = (list[i].halfYearRetreatRatio * 100)
                                    .toFixed(2);
                            }
                            if (list[i].yearRetreatRatio === null) {
                                yearRetreatRatio = '--';
                            } else {
                                yearRetreatRatio = (list[i].yearRetreatRatio * 100)
                                    .toFixed(2);
                            }

                            var ss = [list[i].statisticsMonth,
                                oneMonthRetreatRatio,
                                threeMonthRetreatRatio,
                                halfYearRetreatRatio,
                                yearRetreatRatio];
                            temp.push(ss);
                            table.oApi
                                ._fnAddData(oSettings, ss);

                        }
                        oSettings.aiDisplay = oSettings.aiDisplayMaster
                            .slice();
                        table.fnDraw();

                    } else {
                        $tbody.hide();
                    }

                },
                error: function (jqXHR, testStatus, errorThrow) {
                    console.log(jqXHR);

                }
            });

    }

    //优选股池 - 基本信息
    function optStockInfo(page, size) {
        var modelId = $('#opt-modalid-hide').val();
        $.ajax({
            url: '/APP-admin/recommend/basicInformation?modelId=' + Number(modelId) + '&page=' + Number(page) + '&size=' + Number(size),
            type: "GET",
            dataType: 'json',
            success: function (resp) {
                if (resp.success) {
                    $('#opt-stock-ratio-today').html((resp.data.today.realtimeReturnRatioToday * 100).toFixed(2) + '%');
                    $('#opt-stock-ratio-week').html((resp.data.today.realtimeReturnRatioWeek * 100).toFixed(2) + '%');
                    optStockTable(resp.data.list.realtimeReturnRatio, page, size);
                    optStockCount = resp.data.totalCount;
                    $('#opt-stock-totalCounts').find('span').html(optStockCount);
                    var total = (optStockCount / $('#opt-stock-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#opt-stock-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".opt-stock-body").empty();
                            optStockInfo(page, $('#opt-stock-size').val());
                        }
                    });
                }
            }
        })
    }

    function optStockTable(list, page, size) {
        var li_html = "";
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td>' + unixToDate(list[i].date) + '</td>'
                // +'<td>'+(list[i].realtimeReturnRatioToday*100).toFixed(2)+'%</td>'
                + '<td>' + (list[i].realtimeReturnRatioWeek * 100).toFixed(2) + '%</td>'
                + '</tr>';
        }
        $(".opt-stock-body").html(li_html);
    }

    $('#opt-stock-size').on('change', function () {
        var size = $(this).val();
        optStockInfo(1, size);
    })

    //优选股池 - 当前股池
    function optStockPresent(page, size, sortField, sortDirection, stockCode, stockName) {
        var modelId = $('#opt-modalid-hide').val();
        var size = 10;
        var data = {
            page: Number(page),
            size: Number(size),
            sortField: sortField !== '' ? sortField : null,
            sortDirection: sortDirection !== '' ? sortDirection : null,
            modelId: Number(modelId),
            stockCode: stockCode !== '' ? stockCode : null,
            stockName: stockName !== '' ? stockName : null
        };
        $.ajax({
            url: '/APP-admin/recommend/nowHoldStock',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    optStockPresentTable(resp.data.list);
                    optStockPresentCount = resp.data.totalCount;
                    $('#pref-stock-totalCounts').find('span').html(optStockPresentCount);
                    var total = (optStockPresentCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#pref-stock-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".pref-stock-body").empty();
                            optStockPresent(page, 10, sortField, sortDirection, stockCode, stockName);
                        }
                    });
                }
            }
        });
    }

    function optStockPresentTable(list) {
        var li_html = "";
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr data-modelId="' + list[i].modelId + '" data-stockcode="' + list[i].stockCode + '" data-stockname="' + list[i].stockName + '">'
                + '<td>' + list[i].id + '</td>'
                + '<td>' + list[i].stockCode + '</td>'
                + '<td>' + list[i].stockName + '</td>'
                + '<td>' + unixToDate(list[i].pickInTime) + '</td>'
                + '<td>' + list[i].price + '</td>'
                + '<td>' + list[i].topPrice + '</td>'
                + '<td>' + list[i].newPrice + '</td>'
                + '<td>' + (list[i].highIncrease * 100).toFixed(2) + '%</td>';
            if (list[i].nowIncrease > 0) {
                li_html += '<td class="font-red">' + (list[i].nowIncrease * 100).toFixed(2) + '%</td>';
            } else if (list[i].nowIncrease < 0) {
                li_html += '<td class="font-green">' + (list[i].nowIncrease * 100).toFixed(2) + '%</td>';
            } else {
                li_html += '<td>0.00</td>';
            }
            if (list[i].todayIncrease > 0) {
                li_html += '<td class="font-red">' + (list[i].todayIncrease * 100).toFixed(2) + '%</td>';
            } else if (list[i].todayIncrease < 0) {
                li_html += '<td class="font-green">' + (list[i].todayIncrease * 100).toFixed(2) + '%</td>';
            } else {
                li_html += '<td>0.00</td>';
            }
            li_html += '<td>'
                + '<button class="btn btn-info btn-sm btn-bulls-show">去推荐</button>'
                + '</td>'
                + '</tr>';
        }
        $(".pref-stock-body").html(li_html);
    }

    $('#pref-stock-searchbtn').click(function () {
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var stockCode = $('#pref-stock-code').val(),
            stockName = $('#pref-stock-name').val(),
            page = 1,
            size = 10;
        optStockPresent(page, size, sortField, sortDirection, stockCode, stockName);
    });
    $('#monitor-stock-searchbtn').click(function () {
        var stockCode = $('#stockcodesearch1').val(),
            stockName = $('#stocknamesearch2').val(),
            modelId = $("#monitor-modalid-hide").val(),
            page = 1,
            size = 10;
        holdInInfoByCondtion(modelId, stockCode, stockName, page, size);

    });

    function holdInInfoByCondtion(modelId, stockCode, stockName, page, size) {
        $.ajax({
            url: '/APP-admin/model/runTimeHoldPositionInfoByCondition?modelId='
                + modelId + '&stockCode=' + stockCode + "&stockName=" + stockName + '&page=1' + '&size=20',
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                var table = $('#holdinTable').dataTable();
                var oSettings = table.fnSettings();
                var temp = [];
                table.fnClearTable(this);
                var $tbody = $("#holdinTable tbody");
                var maxPage;

                if (data.success
                    && data.data.list.length > 0) {

                    $("#holdinpagenum").text(page);
                    var list = data.data.list;
                    maxPage = Math
                        .ceil(data.data.totalCount / 20);
                    if (data.data.totalCount > 20) {
                        $("#holdinpage").show();
                        if (page === maxPage) {
                            $("#holdinpage .next")
                                .addClass('disabled');
                        } else {
                            $("#holdinpage .next")
                                .removeClass('disabled');
                        }
                    } else {
                        $("#holdinpage").hide();
                    }
                    for (i = 0; i < list.length; i++) {
                        var id, stockCode, stockName, lastPrice, averagePrice, returnRatio,
                            netWorthRatio, quantity, contributionDegree, realtimeReturnRadio;
                        id = list[i].id;
                        stockCode = list[i].stockCode;
                        stockName = list[i].stockName;
                        lastPrice = list[i].lastPrice;
                        averagePrice = list[i].averagePrice;
                        returnRatio = (list[i].returnRatio * 100)
                            .toFixed(2);
                        realtimeReturnRadio = (list[i].realtimeReturnRadio * 100)
                            .toFixed(2)
                        netWorthRatio = (list[i].netWorthRatio * 100)
                                .toFixed(2)
                            + '%';
                        quantity = list[i].quantity;
                        if (contributionDegree) {
                            contributionDegree = list[i].contributionDegree;
                        } else {
                            contributionDegree = 'N/A';
                        }
                        var ss = [id, stockCode,
                            stockName, lastPrice,
                            averagePrice, returnRatio,
                            netWorthRatio, quantity, realtimeReturnRadio, ''];
                        var newLine = table.oApi
                            ._fnAddData(oSettings, ss);
                        $(oSettings.aoData[newLine].nTr).attr('data-modelId', list[i].modelId).attr('data-stockcode', stockCode).attr('data-stockname', stockName);

                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster
                        .slice();
                    table.fnDraw();
                    $tbody.show();
                    $("#cashrate").text(
                        (data.data.cash * 100)
                            .toFixed(2)
                        + "%");

                } else {
                    $tbody.hide();
                    $("#holdinpagenum").text("0");
                    $('#cashrate').text('');
                }
            }
        });

    }

    $('#pref-stock-table').on('click', '.btn-bulls-show', function () {
        var modelId = $(this).parents('tr').attr('data-modelId');
        var stockcode = $(this).parents('tr').attr('data-stockcode');
        var stockname = $(this).parents('tr').attr('data-stockname');
        $('#bullsnoticemodal').modal('show');
        $('.modal-title').text('牛股提醒');
        $('#bullsnoticeform').attr('data-modelId', modelId).attr('data-stockcode', stockcode).attr('data-stockname', stockname);
        //	var content=$('.modelDisName').text()+'\n'+$(this).parents('tr').find('td:eq(2)').text()+'('+$(this).parents('tr').find('td:eq(1)').text()+')\n';
        $('#noticecontent1').text($('.modelDisName').text())
        $('#noticecontent2').text($(this).parents('tr').find('td:eq(2)').text() + '(' + $(this).parents('tr').find('td:eq(1)').text() + ')');

        $('#bullsnoticemodal').find('.error').text('');
        $('#bullsnoticemodal').find('input,textarea').val('');
        $('#savenoticebtn').addClass('btn-add-bulls');
        $('#sendconfrimbtn').addClass('btn-sendandadd-bulls');
    });

    //优选股池 - 买卖信号池
    function optStockTradeInfo(page, size, sortField, sortDirection) {
        var modelId = $('#opt-modalid-hide').val();
        var size = 10;
        var data = {
            page: Number(page),
            size: Number(size),
            sortField: sortField !== '' ? sortField : null,
            sortDirection: sortDirection !== '' ? sortDirection : null,
            modelId: Number(modelId)
        };
        $.ajax({
            url: '/APP-admin/recommend/stockSignal',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    optStockTradeTable(resp.data.list);
                    optStockTradeCount = resp.data.totalCount;
                    $('#pref-trade-totalCounts').find('span').html(optStockTradeCount);
                    var total = (optStockTradeCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#pref-trade-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".pref-trade-body").empty();
                            optStockTradeInfo(page, size, sortField, sortDirection);
                        }
                    });
                }
            }
        });
    }

    function optStockTradeTable(list) {
        var tradeMap = {
            "0": "入选",
            "1": "调出"
        };
        var li_html = "";
        var time;
        var timeArray = [];

        for (var i = 0; i < list.length; i++) {
            time = list[i].time;
            for (var j = 0; j < list.length; j++) {
                if (toDate(list[i].time) === toDate(list[j].time) && i !== j) {
                    if (list[i].time < list[j].time) {
                        time = list[j].time;
                    }
                    if (list[i].time === list[j].time && i > j) {
                        time = '';
                    }
                    timeArray.push(j);
                }
            }
            if (timeArray.length === 0 || (time === list[i].time)) {
                firstTime = "<div class='first-trade'>" + toDateTime(list[i].time) + "</div>"
            } else {
                firstTime = toDateTime(list[i].time);
            }
            li_html += '<tr>'
                + '<td>' + firstTime + '</td>'
                + '<td>' + list[i].stockCode + '<br/>' + list[i].stockName + '</td>'
                + '<td>' + tradeMap[list[i].type] + '<br/>' + list[i].price + '</td>';
            if (list[i].profit > 0) {
                li_html += '<td class="font-red">' + (list[i].profit * 100).toFixed(2) + '%</td>';
            } else if (list[i].profit < 0) {
                li_html += '<td class="font-green">' + (list[i].profit * 100).toFixed(2) + '%</td>';
            } else {
                li_html += '<td>0.00%</td>';
            }
            li_html += '<td>' + (list[i].hignIncrease * 100).toFixed(2) + '%</td>'
                + '</tr>';
        }
        $(".pref-trade-body").html(li_html);
    }

    $('#pref-trade-searchbtn').click(function () {
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        optStockTradeInfo(1, 10, sortField, sortDirection);
    });


    function holdInInfo(name, page) {
        $.ajax({
            url: '/APP-admin/model/runTimeHoldPositionInfo?modelName='
                + name + '&page=' + page + '&size=20',
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                var table = $('#holdinTable').dataTable();
                var oSettings = table.fnSettings();
                var temp = [];
                table.fnClearTable(this);
                var $tbody = $("#holdinTable tbody");
                var maxPage;

                if (data.success
                    && data.data.list.length > 0) {

                    $("#holdinpagenum").text(page);
                    var list = data.data.list;
                    maxPage = Math
                        .ceil(data.data.totalCount / 20);
                    if (data.data.totalCount > 20) {
                        $("#holdinpage").show();
                        if (page === maxPage) {
                            $("#holdinpage .next")
                                .addClass('disabled');
                        } else {
                            $("#holdinpage .next")
                                .removeClass('disabled');
                        }
                    } else {
                        $("#holdinpage").hide();
                    }
                    for (i = 0; i < list.length; i++) {
                        var id, stockCode, stockName, lastPrice, averagePrice, returnRatio,
                            netWorthRatio, quantity, contributionDegree, realtimeReturnRadio;
                        id = list[i].id;
                        stockCode = list[i].stockCode;
                        stockName = list[i].stockName;
                        lastPrice = list[i].lastPrice;
                        averagePrice = list[i].averagePrice;
                        returnRatio = (list[i].returnRatio * 100)
                            .toFixed(2);
                        realtimeReturnRadio = (list[i].realtimeReturnRadio * 100)
                            .toFixed(2)
                        netWorthRatio = (list[i].netWorthRatio * 100)
                                .toFixed(2)
                            + '%';
                        quantity = list[i].quantity;
                        if (contributionDegree) {
                            contributionDegree = list[i].contributionDegree;
                        } else {
                            contributionDegree = 'N/A';
                        }
                        var ss = [id, stockCode,
                            stockName, lastPrice,
                            averagePrice, returnRatio,
                            netWorthRatio, quantity, realtimeReturnRadio, ''];
                        var newLine = table.oApi
                            ._fnAddData(oSettings, ss);
                        $(oSettings.aoData[newLine].nTr).attr('data-modelId', list[i].modelId).attr('data-stockcode', stockCode).attr('data-stockname', stockName);

                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster
                        .slice();
                    table.fnDraw();
                    $tbody.show();
                    $("#cashrate").text(
                        (data.data.cash * 100)
                            .toFixed(2)
                        + "%");

                } else {
                    $tbody.hide();
                    $("#holdinpagenum").text("0");
                    $('#cashrate').text('');
                }
            }
        });

    }

    function tradePoolInfo(name, mid, page, whichColumn, whichPattern) {
        var tradeMap = {
            "1": "买入",
            "3": "卖出",
            "4": "分红",
            "5": "配股",
            "6": "送股",
            "7": "转股",
            "0": "无交易"
        };

        var url = '/APP-admin/model/traderSignalPool?mid='
            + mid + "&page=" + page
            + "&size=20" + '&whichColumn=' + whichColumn + '&whichPattern=' + whichPattern;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                var table = $('#tradetables').dataTable();
                var oSettings = table.fnSettings();
                var $tbody = $("#tradetables tbody");
                var maxPage, firstTime;
                var time = false;
                var timeArray = [];
                table.fnClearTable(this);
                if (data.success
                    && data.data.list.length > 0) {
                    maxPage = Math
                        .ceil(data.data.totalCount / 20);
                    var list = data.data.list;
                    for (var i = 0; i < list.length; i++) {
                        time = list[i].time;
                        for (var j = 0; j < list.length; j++) {
                            if (toDate(list[i].time) === toDate(list[j].time) && i !== j) {
                                if (list[i].time < list[j].time) {
                                    time = list[j].time;
                                }
                                if (list[i].time === list[j].time && i > j) {
                                    time = '';
                                }
                                timeArray.push(j);
                            }
                        }

                        if (timeArray.length === 0 || (time === list[i].time)) {

                            firstTime = "<div class='first-trade'>" + toDateTime(list[i].time) + "</div>"
                        } else {
                            firstTime = toDateTime(list[i].time);
                        }
                        var date = toDate(list[i].time);
                        var profit = (list[i].profit * 100).toFixed(2);


                        var ss = [firstTime, list[i].code + '<br/>' + list[i].stockName, tradeMap[list[i].type] + '<br/>' + list[i].price, profit, list[i].positionChangeInfo];
                        if (list[i].type === 4 || list[i].type === 5 || list[i].type === 6 || list[i].type === 7) {
                            ss = [firstTime, list[i].code + '<br/>' + list[i].stockName, tradeMap[list[i].type] + '<br/>'
                            + list[i].signalDescription, profit, list[i].positionChangeInfo];
                        }
                        var newLine = table.oApi._fnAddData(oSettings, ss);
                        $(oSettings.aoData[newLine].nTr)
                            .attr('data-modelid', list[i].modelId).attr('data-modelName', name).attr('data-stockcode', list[i].code).attr('data-stockname', list[i].stockName);
                        $tbody.attr('data-mpdelId', list[i].modelId).attr('data-modelName', name);

                        timeArray = [];
                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster
                        .slice();
                    table.fnDraw();
                    $tbody.show();
                    $('#tradepoolpage').createPage({
                        total: maxPage,
                        page: page,
                        callback: function (page) {
                            tradePoolInfo(name, mid, page, whichColumn, whichPattern)
                        }
                    })

                } else {
                    $tbody.hide();
                }
            }

        });

    }

    function addTradeTable(trade) {
        var tradeMap = {
            "1": "买入",
            "3": "卖出",
            "4": "分红",
            "5": "配股",
            "6": "送股",
            "7": "转股",
            "0": "无交易"
        };

        var $dateH, $table, $trhead, $th1, $th2, $th3, $th4, $tbody, $trade, $trContent;
        var $tdTime, $tdCode, $tdPrice, $tdHoldChange;
        $trade = $(".trade");
        $dateH = $('<h4>').text(trade.GrupName).appendTo($trade);
        $table = $("<table>").addClass(
            ' table-hover table table-hover table-bordered')
            .appendTo($trade);
        $trhead = $("<tr>").appendTo($table);
        $th1 = $('<th>').text('时间').appendTo($trhead);
        $th2 = $('<th>').text('证券代码').appendTo($trhead);
        $th3 = $('<th>').text('成交价').appendTo($trhead);
        $th1 = $('<th>').text('仓位变化').appendTo($trhead);
        $tbody = $('<tbody>').appendTo($table);
        var signals = trade.Signals;
        for (var i = 0; i < signals.length; i++) {
            $trContent = $('<tr>').appendTo($tbody);
            $tdTime = $('<td>').text(
                jsonTimeToTime(signals[i].Time)).appendTo(
                $trContent);
            $tdCode = $('<td>').html(
                signals[i].StockCode + '<br/>'
                + signals[i].StockName).appendTo(
                $trContent);
            $tdPrice = $('<td>').html(
                tradeMap[signals[i].TradeType] + '<br/>'
                + signals[i].Price)
                .appendTo($trContent);
            $tdHoldChange = $('<td>').text(
                signals[i].PositionChangeInfo).appendTo(
                $trContent);
        }

    }

    // 导入买卖点。

    function uploadFile() {
        var outid = $('#outsidemodellist .active a')
            .attr('data-id');
        url = '/APP-admin/data/import/csv?';
        // + outid+'&'+Math.random()
        $('#file-1').off('fileuploaded');
        $('#file-1').fileinput(
            {
                language: 'zh',
                uploadUrl: url, // 上传的地址
                showRemove: true, // 是否显示移除按钮
                showCancel: false,

                allowedFileExtensions: ['csv'],
                maxFileSize: 1000,
                maxFilesNum: 10,
                showPreview: false,
                enctype: 'multipart/form-data charset=utf-8',
                uploadExtraData: function (previewId, index) {
                    var modelId = $(
                        '#outsidemodellist .active a')
                        .attr('data-id');
                    return {
                        'modelId': modelId
                    };

                }

            }).on(
            "fileuploaded",
            function (event, data, previewId, index) {

                Lobibox.notify('success', {
                    msg: "文件上传成功!请3-5分钟后，刷新界面",
                    width: 400,
                    sound: false,
                    delay: 1000

                });

                $(this).fileinput('clear').fileinput('enable');
                return false;

            })

        ;

    }

    // 导入买卖点文件
    $('#file-3').fileinput({
        language: 'zh',
        showUpload: false,
        showCaption: true,
        showPreview: false,
        showRemove: false,
        showCancel: false,
        dropZoneEnabled: false,
        allowedFileExtensions: ['csv']
    }).on('change', function () {
        var files = $('#file-3').prop('files');
        if (files.length === 0) {
            Lobibox.alert('warning', {
                msg: '请选择csv格式文件'
            });
            $('#uploadtradefile').find('.file-caption-name span').text('');
        } else {
            var reader = new FileReader();
            reader.readAsText(files[0], 'GB2312');
            reader.onload = function (evt) {
                var fileString = evt.target.result, fileStrings;
                $('#trade-file-name').val(files[0].name);
                if ($.trim($('#upload-paste-trade').val()) === '') {
                    $('#upload-paste-trade').val(fileString);
                } else {
                    fileStrings = $('#upload-paste-trade').val() + '\n' + fileString;
                    $('#upload-paste-trade').val(fileStrings);
                }
            }
        }
    })
    $('#trade-createdata').click(function (e) {
        e.preventDefault();
        var fileData = $('#upload-paste-trade').val();
        if ($.trim(fileData) === '') {
            Lobibox.alert('warning', {
                msg: '买卖点内容不能为空'
            });
            return;
        }
        $.ajax({
            url: '/APP-admin/data/import/tradeSignalNew',
            type: 'POST',
            dataType: 'json',
            data: {
                tradeSignal: $.trim(fileData)
            },
            success: function (resp) {
                var kdatas = [];
                var days, endTime;
                var datas = resp.data;
                if (resp.success && datas.length > 0) {
                    var tbody = $('#exporttradeTable tbody');
                    $('#exporttradeTable tbody tr').remove();
                    var fileName = $('#trade-file-name').val();
                    var dotindex = fileName.indexOf('.');
                    var date = new Date();
                    var dateTime = date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + ' ' + date.getHours() + '_' + date.getMinutes();
                    tbody.attr('data-file', fileName.substring(0, dotindex) + '(' + dateTime + ').csv');
                    stockArray = [];
                    var j = 0;
                    for (j = 0; j < datas.length; j++) {
                        var $tr = $('<tr>').appendTo(tbody);
                        var datalength = datas[j].signals.length;
                        for (var i = 0; i < datalength; i++) {
                            var $td = $('<td>').attr('data-stockcode', datas[j].stockCode)
                                .attr('data-time', datas[j].endTime)
                                .text(datas[j].signals[i][0].name + '-' + datas[j].stockCode)
                                .attr('data-name', datas[j].signals[0][0].name)
                                .appendTo($tr);
                            stockArray.push({
                                'Stock': datas[j].stockCode,
                                'Time': tokDateTime(datas[j].signals[i][0].time)
                            });
                            days = (datas[j].signals[i][datalength - 1].time - datas[j].signals[i][0].time) / (1000 * 60 * 60 * 24);
                            endTime = datas[j].signals[i][datalength - 1].time;
                            kdatas.push({
                                'stockCode': datas[j].stockCode,
                                'days': Math.round(days),
                                'beginTime': datas[j].signals[i][0].time,
                                'endTime': endTime,
                                'signals': datas[j].signals[i]
                            })
                        }
                    }
                    localStorage.setItem('stockArray', JSON.stringify(stockArray));
                    localStorage.setItem('kdatas', JSON.stringify(kdatas));
                    $('#createTradeFile').removeAttr('disabled');
                    $('#createtradewordFile').removeAttr('disabled');
                    $("#file-3").fileinput('clear').fileinput('enable');
                    Lobibox.notify('success', {
                        msg: "数据生成成功!",
                        width: 400,
                        sound: false
                    });
                    currentJndex = 0;
                    return false;
                } else {
                    $("#file-3").fileinput('clear').fileinput('enable');
                    Lobibox.notify('error', {
                        msg: "买卖点内容格式错误!",
                        width: 400,
                        sound: false
                    });
                }
            }
        });
    });

    // 导入日志文件
    $('#file-2').fileinput({
        language: 'zh',
        showUpload: false,
        showCaption: true,
        showPreview: false,
        showRemove: false,
        showCancel: false,
        dropZoneEnabled: false,
        allowedFileExtensions: ['txt']
    }).on('change', function () {
        var files = $('#file-2').prop('files');
        if (files.length === 0) {
            Lobibox.alert('warning', {
                msg: '请选择txt格式文件'
            });
            $('#exportlogFile').find('.file-caption-name span').text('');
        } else {
            var reader = new FileReader();
            reader.readAsText(files[0], 'GB2312');
            reader.onload = function (evt) {
                var fileString = evt.target.result, fileStrings;
                $('#log-file-name').val(files[0].name);
                if ($.trim($('#upload-paste-log').val()) === '') {
                    $('#upload-paste-log').val(fileString);
                } else {
                    fileStrings = $('#upload-paste-log').val() + '\n' + fileString;
                    $('#upload-paste-log').val(fileStrings);
                }
            }
        }
    });
    $('#log-createdata').click(function (e) {
        e.preventDefault();
        var fileData = $('#upload-paste-log').val();
        if ($.trim(fileData) === '') {
            Lobibox.alert('warning', {
                msg: '日志内容不能为空'
            });
            return;
        }
        $.ajax({
            url: '/APP-admin/data/import/stringArrays',
            type: 'POST',
            dataType: 'json',
            data: {
                txtFile: $.trim(fileData)
            },
            success: function (resp) {
                var kdatas = resp.data;
                if (resp.success && kdatas.length > 0) {
                    var $exportcontent = $('.export-contaner');
                    var tbody = $('#exportTable tbody');
                    $('#exportTable tbody tr').remove();
                    var fileName = $('#log-file-name').val();
                    var dotindex = fileName.indexOf('.');
                    var date = new Date();
                    var dateTime = date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + ' ' + date.getHours() + '_' + date.getMinutes();
                    tbody.attr('data-file', fileName.substring(0, dotindex) + '(' + dateTime + ').txt');
                    var trnum = Math.ceil(kdatas.length / 10);
                    stockArray = [];
                    for (var j = 0; j < trnum; j++) {
                        var $tr = $('<tr>').appendTo(tbody);
                        for (var i = j * 10; i < (j + 1) * 10; i++) {
                            var $td = $('<td>').attr('data-stockcode', kdatas[i].stockCode)
                                .attr('data-time', kdatas[i].time)
                                .attr('data-name', kdatas[i].stockName)
                                .attr('data-file',
                                    fileName.substring(0, dotindex) + '(' + new Date().getTime() + ').txt')
                                .text(kdatas[i].stockName + '-' + kdatas[i].stockCode)
                                .appendTo($tr);
                            stockArray.push({
                                'Stock': kdatas[i].stockCode,
                                'Time': tokDateTime(kdatas[i].time)
                            });
                            if (i === kdatas.length - 1) {
                                break;
                            }
                        }
                    }
                    localStorage.setItem('stockArray', JSON.stringify(stockArray));
                    localStorage.setItem('kdatas', JSON.stringify(kdatas));
                    $('#createFile').removeAttr('disabled');
                    $('#createwordFile').removeAttr('disabled');
                    $('#file-2').fileinput('clear').fileinput('enable');
                    Lobibox.notify('success', {
                        msg: "数据生成成功!",
                        width: 400,
                        delay: 1000,
                        sound: false
                    });
                    currentJndex = 0;
                    return false;
                } else {
                    $('#file-2').fileinput('clear').fileinput('enable');
                    Lobibox.notify('error', {
                        msg: "日志内容格式错误!",
                        width: 400,
                        sound: false
                    });
                }
            }
        });
    });

    function uploadImg() {
        $('#file-img').fileinput({
            language: 'zh',
            uploadUrl: '',
            showRemove: true,
            dropZoneEnabled: false,//是否显示拖拽区域,
            enctype: 'multipart/form-data charset=utf-8',
            maxFileSize: 1000,
            maxFilesNum: 10,
            showPreview: false,
            allowedFileExtensions: ['jpg', 'png', 'gif']
        })
        $('.upload-img-success').hide();
        $('#uploadImgForm')[0].reset();
        var input = document.getElementById('file-img');
        var txshow = document.getElementById("txshow");
        if (typeof (FileReader) === 'undefined') {
            input.setAttribute('disabled', 'disabled');
        } else {
            input.addEventListener('change', readFile, false);

        }
    }

    function readFile() {
        var file = this.files[0];
        //判断是否是图片类型
        if (!/image\/\w+/.test(file.type)) {
            alert("只能选择图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = new Image,
                width = 95,    //图片resize宽度
                quality = 1.0,  //图像质量
                canvas = document.createElement("canvas"),
                drawer = canvas.getContext("2d");
            img.src = this.result;
            var image_base64 = img.src.split(",")[1];
            image_base64 = image_base64.replace("data:image/png;base64,", "");
            var pictureindex = img.src.indexOf(',');
            var picture = img.src.substring(pictureindex + 1);
            var parameter = {name: file.name, picture: picture}
            $.ajax({
                type: "POST",
                url: imageServer + "/upload/pic",
                cache: false,
                data: parameter,
                async: true,
                success: function (url) {
                    $('#imgURL').text(url.data);
                    $('.upload-img-success').show();
                    $('#uploadImgForm')[0].reset()
                }
            });
        }
    }

    function getWeekArticle(page) {
        var $tbody = $('#weektable').find('tbody');
        $tbody.find('tr').remove();
        $.ajax({
            url: '/APP-admin//article/briefing/list?size=10' + '&page=' + page,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success && data.data.list.length > 0) {
                    var list = data.data.list;
                    var maxPage = Math.ceil(data.data.totalCount / 10);
                    for (var i = 0; i < list.length; i++) {
                        var $tr = $('<tr>').appendTo($tbody);
                        var $tdinput = $('<td>').appendTo($tr);
                        var input;
                        if (list[i].id === Number(selectID)) {
                            input = $('<input>').attr('type', 'radio').attr('name', 'weekselect').attr('value', list[i].id).attr('checked', 'checked').addClass('article-check').appendTo($tdinput);
                        } else {
                            input = $('<input>').attr('type', 'radio').attr('name', 'weekselect').attr('value', list[i].id).addClass('article-check').appendTo($tdinput);

                        }
                        var tdid = $('<td>').text(list[i].id).appendTo($tr);
                        var tdTitle = $('<td>').text(list[i].title).appendTo($tr);
                    }
                    $("#weekpage").createPage({
                        total: maxPage,
                        page: page,
                        callback: function (page) {
                            getWeekArticle(page);
                        }
                    });
                }
            }
        })

    }

    function getArticleStock(page) {

        var $tbody = $('#stockArticleTable').find('tbody');
        $tbody.find('tr').remove();
        $.ajax({
            url: '/APP-admin/article/list?size=10' + '&page=' + page,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success && data.data.list.length > 0) {
                    var list = data.data.list;
                    var maxPage = Math.ceil(data.data.totalCount / 10);
                    for (var i = 0; i < list.length; i++) {
                        var $tr = $('<tr>').appendTo($tbody);
                        var $tdinput = $('<td>').appendTo($tr);

                        var input
                        if (list[i].id === Number(selectID)) {
                            input = $('<input>').attr('type', 'radio').attr('name', 'stockselect').attr('value', list[i].id).attr('checked', 'checked').addClass('article-check').appendTo($tdinput);
                        } else {
                            input = $('<input>').attr('type', 'radio').attr('name', 'stockselect').attr('value', list[i].id).addClass('article-check').appendTo($tdinput);

                        }
                        var tdid = $('<td>').text(list[i].id).appendTo($tr);
                        var tdTitle = $('<td>').text(list[i].title).appendTo($tr);
                    }
                    $("#stockspage").createPage({
                        total: maxPage,
                        page: page,
                        callback: function (page) {
                            getArticleStock(page);
                        }
                    });
                }
            }
        })
    }

    $('.arrticle-table').on('click', '.article-check', function () {
        var adsurl;
        var selectID = $(this).val();
        if ($(this).attr('name') === 'weekselect') {
            var adsurl = articleaddress + "?type=1&articleId=" + selectID;
            $('.weekURL').attr('href', adsurl).text(adsurl);

        } else {
            var adsurl = articleaddress + "?type=0&articleId=" + selectID + '&userId=2';
            $('.stockURL').attr('href', adsurl).text(adsurl);
        }
    })

    function getAds(page) {
        var $tbody = $('#adstable').find('tbody');
        $tbody.find('tr').remove();
        $.ajax({
            url: '/APP-admin/upload/sliderImages/list?size=10&page=' + page,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success & data.data.list.length > 0) {
                    var list = data.data.list;
                    var maxPage = Math.ceil(data.data.totalCount / 10);
                    for (var i = 0; i < list.length; i++) {
                        var $tr = $('<tr>').appendTo($tbody);
                        var $tdid = $('<td>').text(list[i].id).appendTo($tr);
                        var $tdimage = $('<td>').text(list[i].imagePath).appendTo($tr);
                        var $tdURL = $('<td>').text(list[i].jumpAddress).appendTo($tr);
                        var $tdINDEX = $('<td>').appendTo($tr);
                        $('<input>').attr('type', 'number').val(list[i].showIndex).addClass('update-index').appendTo($tdINDEX);
                        var $tdstatus = $('<td>').appendTo($tr);
                        var $select = $('<select>').addClass('update-status').appendTo($tdstatus);
                        $('<option>').appendTo($select).attr('value', '0').text('未启用');
                        $('<option>').appendTo($select).attr('value', '1').text('启用');
                        $select.val(list[i].status);

                        var $tdopen = $('<td>').appendTo($tr);
                        var $openselect = $('<select>').addClass('update-open').appendTo($tdopen);
                        $('<option>').appendTo($openselect).attr('value', '0').text('不开放');
                        $('<option>').appendTo($openselect).attr('value', '1').text('开放');
                        $openselect.val(list[i].open);

                        var $tdoperation = $('<td>').appendTo($tr);
                        $('<button>').addClass('btn-update-ads btn btn-success').attr('data-adsid', list[i].id).appendTo($tdoperation).text('保存')

                        $('<button>').addClass('btn-delete-ads btn btn-danger').attr('data-adsid', list[i].id).appendTo($tdoperation).text('删除')

                        $('#adspage').createPage({
                            total: maxPage,
                            page: page,
                            callback: function (page) {
                                getAds(page)
                            }
                        })

                    }

                }
            }
        })

    }

    $('#adstable').on('click', '.btn-update-ads', function () {
        var adsid = $(this).attr('data-adsid');
        var re = /^[1-9]*[1-9][0-9]*$/;
        var adindex = $(this).parents('tr').find('.update-index').val();
        var adStatus = $(this).parents('tr').find('.update-status').val();
        var adOpen = $(this).parents('tr').find('.update-open').val();
        var imgBoolean = true;
        if (!re.test(Number(adindex))) {
            Lobibox.alert('warning', {
                msg: '请输入大于0的数字'
            })
            imgBoolean = false;
        }
        var ads = {
            "showIndex": Number(adindex), "status": adStatus, "id": adsid, "open": adOpen
        }
        if (imgBoolean) {
            $.ajax({
                url: '/APP-admin/upload/sliderImages',
                dataType: 'json',
                type: 'PUT',
                data: JSON.stringify(ads),
                contentType: 'application/json',
                success: function (data) {
                    if (data.success) {
                        Lobibox.notify('success', {
                            msg: '保存成功',
                            sound: false,
                            delay: 1000
                        });
                        getAds(1)

                    }
                }
            })
        }

    })

    $('#adstable').on('click', '.btn-delete-ads', function () {
        var adsid = $(this).attr('data-adsid');
        Lobibox.confirm({
            msg : "确定要删除这个广告吗?",
            callback : function($this, type, ev){
                if(type === "yes"){
                    $.ajax({
                        url: '/APP-admin/advert/slider/delete?id='+adsid,
                        dataType: 'json',
                        type: 'DELETE',
                        contentType: 'application/json',
                        success: function (data) {
                            if (data.success) {
                                Lobibox.notify('success', {
                                    msg : "删除成功!",
                                    width : 400,
                                    sound :false,
                                    delay : 1000
                                });
                                getAds(1);
                            } else {
                                Lobibox.notify('error', {
                                    msg : "删除失败!",
                                    width : 400,
                                    sound:false,
                                    delay : 1000
                                });
                            }
                        },
                        error : function(jqXHR, testStatus, errorThrow) {
                            console.log(jqXHR)
                        }
                    })
                }
            }
        });
    })

    $("#adpushType").change(function(){
        selectNavigation = navigationMap.filter(val => val.name === $(this).val());
        var selectParam = JSON.parse(selectNavigation[0].param);
        $("#adPushParams").html('');
        Object.keys(selectParam).forEach(item => {
            if(item === 'id'){
                $("#adPushParams").append("<input type='number' placeholder='请输入"+item+"' class='form-control' id='adPushParams"+item+"' name='adPushParams"+item+"' />")
            }else{
                $("#adPushParams").append("<input placeholder='请输入"+item+"' class='form-control' id='adPushParams"+item+"' name='adPushParams"+item+"' />")
            }
        })
        $("#adPushParams").append("<span style='color:red'>(数据库样例:"+ selectNavigation[0].param +")</span>");
    });

    $("#bigAdpushType").change(function(){
        if(!$(this).val()){
            $("#bigAdPushParams").html('');
            return;
        }
        bigSelectNavigation = navigationMap.filter(val => val.name === $(this).val());
        var bigSelectParam = JSON.parse(bigSelectNavigation[0].param);
        $("#bigAdPushParams").html('');
        Object.keys(bigSelectParam).forEach(item => {
            if(item === 'id'){
                $("#bigAdPushParams").append("<input type='number' placeholder='请输入"+item+"' class='form-control' id='bigAdPushParams"+item+"' name='bigAdPushParams"+item+"' />")
            }else{
                $("#bigAdPushParams").append("<input placeholder='请输入"+item+"' class='form-control' id='bigAdPushParams"+item+"' name='bigAdPushParams"+item+"' />")
            }
        })
        $("#bigAdPushParams").append("<span style='color:red'>(数据库样例:"+ bigSelectNavigation[0].param +")</span>");
    })

    $('#addAdvertisement').click(function () {
        var imgUrl = $('#imgURL').text();
        var imgBoolean = true;
        var re = /^[1-9]*[1-9][0-9]*$/
        var href = '';
        // var adType = $('#adtype').val();
        var adindex = $('#adindex').val();
        var adopen = $('#adopen').val();
        var type;
        var pushType = $('#adpushType').val();
        var pushParam = '{';
        var selectParam = JSON.parse(selectNavigation[0].param);
        Object.keys(selectParam).forEach(item => {
            pushParam += '"' + item + '":"' + $('#adPushParams'+item).val() + '",';
        })
        pushParam = pushParam.slice(0,-1);
        pushParam += '}';
        if (imgUrl === '') {
            Lobibox.alert('warning', {
                msg: '图片地址不能为空，请上传图片'
            })
            imgBoolean = false;

        } else if (!re.test(Number(adindex))) {
            Lobibox.alert('warning', {
                msg: '请输入大于0的数字'
            })
            imgBoolean = false;
        }

        if (imgBoolean) {
            // var outline = $('#outURL').val();
            // if ($.trim(outline) === '') {
            //     Lobibox.alert('warning', {
            //         msg: '跳转的URL不能为空'
            //     })
            //     return;
            // } else {
            //     href = outline
            // }

            var ads = {
                "imagePath": imgUrl,
                // "jumpAddress": href,
                "showIndex": Number(adindex),
                "status": '',
                'open': adopen,
                // 'type': adType,
                'pushType': pushType,
                'pushParam': pushParam
            }
            if (pushType) {
                Lobibox.confirm({
                    msg: '是否需要启用这个广告?',
                    callback: function ($this, type, ev) {
                        if (type === 'yes') {
                            ads.status = '1'
                        } else {
                            ads.status = '0'
                        }
                        $.ajax({
                            url: '/APP-admin/upload/sliderImages',
                            dataType: 'json',
                            type: 'POST',
                            data: JSON.stringify(ads),
                            contentType: 'application/json',
                            success: function (data) {
                                if (data.success) {
                                    Lobibox.notify('success', {
                                        msg: '保存成功',
                                        sound: false,
                                        delay: 1000
                                    });
                                    getAds(1)
                                    $('#adscontentform').find('input').val('');
                                    $('.upload-img-success').hide();
                                }
                            }
                        })
                    }
                })
            }
        }
    })

    // 获取用户组
    function getUserGroupforPush() {
        var page = 0;
        var size = 1000;
        var url = '/APP-admin/user/getUserGroup?page=' + page
            + '&size=' + size;
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            timeout: 8000,
            success: function (msg) {
                var list = msg.data.list;
                var li_html = '';
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
                $("#pushGroupId").html(li_html);
                $('#add-push-usergroup').html(li_html);
            }
        });
    }

    function logout() {
        $("#logout").click(function (event) {
            /* Act on the event */
            $.removeCookie("alphagu_user_id", {
                path: "/"
            });
            $.removeCookie("alphaguUserType");
            // window.location.href = "/APP-admin/login";
            window.location.href = "http://172.16.137.247:2323/AlphaAdmin/#/login";
        });
    }

    function swithchForSearchk(stockCode, name, efun1, efun2) {
        var ktype;
        var restorationtype;
        $('.search-kline-details .ktypes').on('click', 'li', function () {
            ktype = $('.search-kline-details .ktypes .press>a').attr(
                'data-type');
            restorationtype = $('.search-kline-details  .restoration-type').attr(
                'data-restoration')


            if ($(this).hasClass('klist-d1')) {
                $("#klinecontainer").hide();
                $("#klinecontainer2").hide();
                $(".VOL").hide();
                $('.MACD').hide();
                $('.KDJ').hide();

                $(this).addClass('press').siblings()
                    .removeClass('press');
                ktype = 'D1';

                searchKline(stockCode, name, ktype, efun1, efun2, restorationtype);

            } else if ($(this).hasClass('klist-m')) {
                $("#klinecontainer").hide();
                $("#klinecontainer2").hide();
                $(".VOL").hide();
                $('.MACD').hide();
                $('.KDJ').hide();
                var mtext = $(this).find('a').text();
                $('.search-kline-details .m-type').text(mtext);
                $(this).parents('.dropdown').addClass(
                    'press').siblings().removeClass(
                    'press');

                if (mtext === '5分钟') {
                    $('.search-kline-details .m-type').attr('data-type',
                        'M5');
                    ktype = 'M5'
                }
                if (mtext === '15分钟') {
                    $('.search-kline-details .m-type').attr('data-type',
                        'M15');
                    ktype = 'M15'
                }
                if (mtext === '30分钟') {
                    $('.search-kline-details .m-type').attr('data-type',
                        'M30');
                    ktype = 'M30'
                }


                searchKline(stockCode, name, ktype, efun1, efun2, restorationtype);
            } else if ($(this).hasClass('klist-h1')) {
                $("#klinecontainer").hide();
                $("#klinecontainer2").hide();
                $(".VOL").hide();
                $('.MACD').hide();
                $('.KDJ').hide();
                $(this).addClass('press').siblings()
                    .removeClass('press');
                ktype = 'H1'
                searchKline(stockCode, name, ktype, efun1, efun2, restorationtype);
            } else if ($(this).hasClass('klist-w1')) {
                $("#klinecontainer").hide();
                $("#klinecontainer2").hide();
                $(".VOL").hide();
                $('.MACD').hide();
                $('.KDJ').hide();
                $(this).addClass('press').siblings()
                    .removeClass('press');
                ktype = 'Week1'
                searchKline(stockCode, name, ktype, efun1, efun2, restorationtype);
            } else if ($(this).hasClass('klist-m1')) {
                $("#klinecontainer").hide();
                $("#klinecontainer2").hide();
                $(".VOL").hide();
                $('.MACD').hide();
                $('.KDJ').hide();
                $(this).addClass('press').siblings()
                    .removeClass('press');
                ktype = 'Month1'
                searchKline(stockCode, name, ktype, efun1, efun2, restorationtype);

            }
            if ($(this).hasClass('klist-rehabilitation')) {

                $("#klinecontainer").hide();
                $("#klinecontainer2").hide();
                $(".VOL").hide();
                $('.MACD').hide();
                $('.KDJ').hide();
                var mtext = $(this).find('a').text();
                $('.search-kline-details .restoration-type').text(mtext);


                if (mtext === '不复权') {
                    $('.restoration-type').attr('data-restoration',
                        'None');
                    restorationtype = 'None'
                }
                if (mtext === '前复权') {
                    $('.search-kline-details .restoration-type').attr('data-restoration',
                        'Forward');
                    restorationtype = 'Forward'
                }
                if (mtext === '后复权') {
                    $('search-kline-details .restoration-type').attr('data-restoration',
                        'Backward');
                    restorationtype = 'Backward'
                }
                searchKline(stockCode, name, ktype, efun1, efun2, restorationtype);

            }
            if ($(this).hasClass('klist-macd')) {
                $(this).addClass('press').siblings()
                    .removeClass('press');
                $('.MACD').show();
                $('.KDJ').hide();
                var myChart4 = echarts.getInstanceByDom(document
                    .getElementById('klinecontainer4'));
                myChart4.resize();

            }
            if ($(this).hasClass('klist-KDJ')) {
                $(this).addClass('press').siblings()
                    .removeClass('press');
                $('.MACD').hide();
                $('.KDJ').show();
                var myChart5 = echarts.getInstanceByDom(document
                    .getElementById('klinecontainer5'));
                myChart5.resize();

            }

        })

    }

    function switchKLine(stockCode, macdstartTime, endTime, ktrades) {
        // $('.ktypes').off('click','li');
        var ktype;
        var restorationtype;
        trades = ktrades;
        $('.ktypes li').off('click');
        $('.ktypes').on(
            'click',
            'li',
            function () {
                restorationtype = $('.ktypes  .restoration-type').attr(
                    'data-restoration');
                ktype = $('.ktypes .press>a').attr(
                    'data-type')
                if ($(this).hasClass('klist-d1')) {
                    $("#kcontainer").hide();
                    $("#kcontainer2").hide();
                    $("#kcontainer3").hide();
                    $("#kcontainer4").hide();
                    $(this).addClass('press').siblings()
                        .removeClass('press');
                    ktype = 'D1'
                    kline(stockCode, macdstartTime, endTime,
                        trades, ktype, restorationtype);

                } else if ($(this).hasClass('klist-m')) {
                    $("#kcontainer").hide();
                    $("#kcontainer2").hide();
                    $("#kcontainer3").hide();
                    $("#kcontainer4").hide();
                    var mtext = $(this).find('a').text();
                    $('.m-type').text(mtext);
                    $(this).parents('.dropdown').addClass(
                        'press').siblings().removeClass(
                        'press');

                    if (mtext === '5分钟') {
                        $('.m-type').attr('data-type',
                            'M5');
                        ktype = 'M5'
                    }
                    if (mtext === '15分钟') {
                        $('.m-type').attr('data-type',
                            'M15');
                        ktype = 'M15'
                    }
                    if (mtext === '30分钟') {
                        $('.m-type').attr('data-type',
                            'M30');
                        ktype = 'M30'
                    }

                    kline(stockCode, macdstartTime, endTime,
                        trades, ktype, restorationtype);
                } else if ($(this).hasClass('klist-h1')) {
                    $("#kcontainer").hide();
                    $("#kcontainer2").hide();
                    $("#kcontainer3").hide();
                    $("#kcontainer4").hide();
                    $(this).addClass('press').siblings()
                        .removeClass('press');
                    ktype = 'H1'
                    kline(stockCode, macdstartTime, endTime,
                        trades, ktype, restorationtype);
                } else if ($(this).hasClass('klist-w1')) {
                    $("#kcontainer").hide();
                    $("#kcontainer2").hide();
                    $("#kcontainer3").hide();
                    $("#kcontainer4").hide();
                    $(this).addClass('press').siblings()
                        .removeClass('press');
                    ktype = 'Week1'
                    kline(stockCode, macdstartTime, endTime,
                        trades, ktype, restorationtype);
                } else if ($(this).hasClass('klist-m1')) {
                    $("#kcontainer").hide();
                    $("#kcontainer2").hide();
                    $("#kcontainer3").hide();
                    $("#kcontainer4").hide();
                    $(this).addClass('press').siblings()
                        .removeClass('press');
                    ktype = 'Month1'
                    kline(stockCode, macdstartTime, endTime,
                        trades, ktype, restorationtype);

                }
                if ($(this).hasClass('klist-rehabilitation')) {

                    $("#kcontainer").hide();
                    $("#kcontainer2").hide();
                    $("#kcontainer3").hide();
                    $("#kcontainer4").hide();
                    var mtext = $(this).find('a').text();
                    $('.restoration-type').text(mtext);


                    if (mtext === '不复权') {
                        $('.restoration-type').attr('data-restoration',
                            'None');
                        restorationtype = 'None'
                    }
                    if (mtext === '前复权') {
                        $('.restoration-type').attr('data-restoration',
                            'Forward');
                        restorationtype = 'Forward'
                    }
                    if (mtext === '后复权') {
                        $('.restoration-type').attr('data-restoration',
                            'Backward');
                        restorationtype = 'Backward'
                    }
                    kline(stockCode, macdstartTime, endTime,
                        trades, ktype, restorationtype);

                }

                if ($(this).hasClass('klist-macd')) {
                    $(this).addClass('press').siblings()
                        .removeClass('press');
                    $('#kcontainer3').show();
                    $('#kcontainer4').hide();

                }
                if ($(this).hasClass('klist-KDJ')) {
                    $(this).addClass('press').siblings()
                        .removeClass('press');
                    $('#kcontainer3').hide();
                    $('#kcontainer4').show();

                }

            })
    }

    $('#btn-publish-add').click(function () {
        $("#publihModal input[type='text']").val('');
        $("#publihModal input[type='number']").val('');
        $("#publihModal textarea").val('');
        $("#publihModal .error").text('');
        $('#publihModal .modal-title').text('新增策略');
        $('#btn-publish-save').removeClass('hide');
        $('#publishtime').removeAttr('disabled');
        $('#btn-publish-saveandpush').removeClass('hide').removeAttr('disabled');
        $('#btn-publish-update').addClass('hide');
        var styleType = $(
            '.styletype:checked').val();
        if (styleType === '3') {
            $('.recomment-config').show();
            $('.assets-config').hide();
        } else {
            $('.recomment-config').hide();
            $('.assets-config').show();
        }
        $('.strategy-templist').find('input')
            .prop('checked', false).removeClass('strategy-temp-checked').addClass('strategy-temp');
        $("#strategy-pushmsg").val('');
        getStrategyPushTempList();
        $('#publihModal').modal('show');

        // publishAddOrUpdateOrOn();

    });

    //获取策略管理推送消息模板列表
    function getStrategyPushTempList() {
        $.ajax({
            url: '/APP-admin/model/getPushTemplate',
            type: 'GET',
            dataType: 'json',
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    var html = '';
                    $.each(data, function (i, v) {
                        html += '<input type="radio" name="templateId" id="strategy-' + v.id + '" class="strategy-temp" '
                            + 'data-id="' + v.id + '" data-content="' + v.content + '">'
                            + '<label for="strategy-' + v.id + '" class="margin">' + v.name + '</label>';
                    })
                    $('.strategy-templist').html(html);
                }
            }
        })
    }

    //获取策略类型信息列表
    function getSubscribeTypeInfoList(modelId){
        $.ajax({
            url: '/APP-admin/subscribe/getSubscribeTypeInfoList?modelId=' + modelId,
            type: 'GET',
            dataType: 'json',
            success: function(resp){
                if(resp.success){
                    paypricetypeMap = {
                        '月': '月',
                        '季': '季',
                        '年': '年'
                    }
                    if(resp.data.length < 3){
                        $('#btn-pay-add').removeClass('hide');
                    }else{
                        $('#btn-pay-add').addClass('hide');
                    }
                    if(resp.data.length > 0){
                        var html = '<tr>';
                        $.each(resp.data, function(i,v){
                            delete paypricetypeMap[v.priceType]
                            let isDiscount = '';
                            v.isDiscount === 0 ? isDiscount = '不打折' : isDiscount = '打折';
                            html += '<td>' + 
                            v.name + '</td><td>' + 
                            v.description + '</td><td><span class="pay-span pay-span-price" data-val="' + v.price + '">' + v.price + '</span><input type="number" class="hide pay-input pay-input-price"></td><td>' + 
                            isDiscount + '</td><td><span class="pay-span pay-span-discount-price" data-val="' + v.discountPrice + '">' + v.discountPrice + '</span><input type="number" class="hide pay-input pay-input-discount-price"></td><td>' + 
                            v.priceType + '</td><td>' + 
                            v.createTime + '</td><td><a href="javascript:void(0);" class="btn btn-default btn-xs btn-pay-update" data-mid="' + modelId + '" data-id="' + 
                            v.id + '">编辑</a><a href="javascript:void(0);" class="btn btn-default btn-xs btn-pay-delete" data-mid="' + modelId + '" data-id="' + 
                            v.id + '">删除</a></td></tr>';
                        })
                    }else{
                        var html = '<tr><td colspan="8">暂无数据</td></tr>'
                    }
                    $('.strategy-pay-tbody').html(html);
                }
            }
        })
    }

    $('#btn-pay-add').click(function(){
        $('#strategy-add-pay').modal('show');
        var $btnPayAddContent = $('.paypricetype');
        $btnPayAddContent.find('option').remove();
        if(JSON.stringify(paypricetypeMap) !== '{}'){
            for (let i in paypricetypeMap){
                var $option = $('<option>').attr('value',i).appendTo($btnPayAddContent);
                $option.text(i)
            }
        }
    })

    $('#btn-pay-save').click(function(){
        var check = validstrategypayform().form();
        if(check){
            var payprice = Number($('#payprice').val());
            var paydiscountprice = Number($('#paydiscountprice').val());
            var paypricetype = $('.paypricetype').val();
            var modelID = $('#btn-pay-add').attr('data-mid');
            var name = $('#btn-pay-add').attr('data-display-name') + '-' + paypricetype;
            var description = $('#btn-pay-add').attr('data-display-name') + '按照' + paypricetype + '支付';
            var isDiscount = '';
            payprice > paydiscountprice ?  isDiscount = 1 : isDiscount = 0;
            var stragety = {
                'description': description,
                'discountPrice': paydiscountprice,
                'isDelete': 0,
                'isDiscount': isDiscount,
                'modelID': modelID,
                'name': name,
                'price': payprice,
                'priceType': paypricetype
            }
            $.ajax({
                url: '/APP-admin/subscribe/addsubscribeTypeInfo',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(stragety),
                success: function (data) {
                    if(data.success){
                        Lobibox.notify('success', {
                            'msg': '添加成功',
                            sound: false,
                            delay: 1000
                        })
                        $('#strategy-add-pay').modal('hide');
                        getSubscribeTypeInfoList(modelID);
                    }else{
                        Lobibox.notify('error', {
                            'msg': data.msg,
                            sound: false,
                            delay: 1000
                        })
                    }
                }
            })
        }
    })

    function validstrategypayform(){
        return $('#strategypayform').validate({
            rules: {
                payprice: {
                    required: true,
                    number: true
                },
                paydiscountprice: {
                    required: true,
                    number: true
                },
                paypricetype: {
                    required: true
                }
            },
            messages: {
                payprice: {
                    required: '请输入订阅原价',
                    number: '请输入数字'
                },
                paydiscountprice: {
                    required: '请输入订阅折扣价',
                    number: '请输入数字'
                },
                paypricetype: {
                    required: '请选择订阅类型'
                }
            }
        })
    }

    $('#strategy-pay').on('click','.btn-pay-update,.btn-pay-delete,.btn-pay-save', function(){
        var id = $(this)[0].dataset.id;
        var mid = $(this)[0].dataset.mid;
        if($(this).hasClass('btn-pay-save')){
            var price = $(this).parents('tr').find('.pay-input-price').val();
            var discountPrice = $(this).parents('tr').find('.pay-input-discount-price').val();
            $.ajax({
                type: 'PUT',
                url: '/APP-admin/subscribe/modifySubscribeTypeInfo?id='+ id +'&price='+ price +'&discountPrice='+discountPrice,
                dataType: 'json',
                success: function(resp){
                    if(resp.success){
                        Lobibox.notify('success', {
                            msg: "编辑成功!",
                            width: 400,
                            sound: false,
                            delay: 1000
                        });
                        getSubscribeTypeInfoList(mid);
                    }else{
                        Lobibox.notify('error', {
                            msg: resp.msg,
                            width: 400,
                            sound: false
                        });
                    }
                }
            })
        }
        if($(this).hasClass('btn-pay-update')){
            $(this).parents('tr').find('.pay-span').addClass('hide');
            $(this).parents('tr').find('.pay-input').removeClass('hide');
            $(this).removeClass('btn-pay-update').addClass('btn-pay-save').text('保存');
            $(this).parents('tr').find('.pay-input').each(function(i,v) {
                $(this).val($(this).siblings('span').data('val'));
            })
        }
        if($(this).hasClass('btn-pay-delete')){
            Lobibox.confirm({
                msg : '确定要删除这个支付信息吗?',
                callback : function($this, type, ev){
                    if(type === 'yes'){
                        $.ajax({
                            url: 'APP-admin/subscribe/deleteSubscribeTypeInfoById?id=' + id,
                            type: 'DELETE',
                            dataType: 'json',
                            success: function(resp){
                                if(resp.success){
                                    getSubscribeTypeInfoList(mid);
                                    Lobibox.notify('success', {
                                        msg : "删除成功!",
                                        width : 400,
                                        sound :false,
                                        delay : 1000
                                    });
                                }else{
                                    Lobibox.notify('error', {
                                        msg : "删除失败!",
                                        width : 400,
                                        sound:false,
                                        delay : 1000
                                    });
                                }
                            }
                        })
                    }
                }
            })
        }
    })

    //策略管理推送消息模板
    $('#strategy-template-btn').click(function () {
        $.ajax({
            url: '/APP-admin/model/getPushTemplate',
            type: 'GET',
            dataType: 'json',
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    var html = '';
                    $.each(data, function (i, v) {
                        html += '<tr>'
                            + '<td>' + v.name + '</td>'
                            + '<td><input type="text" class="form-control strategy-template-text" value="' + v.content + '" disabled></td>'
                            + '<td>'
                            + '<button class="btn btn-primary strategy-template-update" data-id="' + v.id + '">编辑</button>'
                            + '<button class="btn btn-success hide strategy-template-save" data-id="' + v.id + '">提交</button>'
                            + '</td>'
                            + '</tr>'
                    })
                    $('.strategy-template-tbody').html(html);
                }
            }
        })
        $('#strategy-template-modal').modal();
    });
    $('.strategy-template-tbody').on('click', '.strategy-template-update', function () {
        $(this).addClass('hide').siblings('.strategy-template-save').removeClass('hide')
            .parents('td').prev().find('input').removeAttr('disabled').css('border', '1px solid #ccc');
    })
    $('.strategy-template-tbody').on('click', '.strategy-template-save', function () {
        var that = this;
        var id = $(this).data('id');
        var content = $(this).parents('tr').find('.strategy-template-text').val();
        if ($.trim(content) === '') {
            Lobibox.alert('warning', {
                msg: '模板内容不能为空'
            })
        }
        $.ajax({
            url: '/APP-admin/model/updatePushTemplate',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                'id': id,
                'content': content
            }),
            success: function (resp) {
                if (resp.success) {
                    $(that).addClass('hide').siblings('.strategy-template-update').removeClass('hide')
                        .parents('td').prev().find('input').attr('disabled', 'disabled').css('border', '0');
                    Lobibox.notify('success', {
                        msg: '模板编辑成功',
                        sound: false,
                        delay: 1000
                    })
                } else {
                    Lobibox.notify('error', {
                        msg: resp.msg,
                        sound: false,
                        delay: 1000
                    })
                }
            }
        });
    })
    // 发布操作
    $('#stragepublishtable').on('click', '.btn-update,.btn-off,.btn-on,.btn-pay', function (event) {
        var mid = $(this).parents('tr').attr('data-id');
        var name = $(this).parents('tr').attr('data-name');
        var displayName = $(this).parents('tr').attr('data-display-name');
        if ($(this).hasClass('btn-update')) {
            getStrategyPushTempList();
            $('#publihModal .error').text('');
            $('#publihModal .modal-title').text('策略修改');
            $('#btn-publish-save').addClass('hide')
            $('#btn-publish-saveandpush').addClass('hide');
            $('#btn-publish-update').removeClass('hide');
            $.ajax({
                url: '/APP-admin/model/info?id=' + mid + '&' + Math.random(),
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        var result = data.data;
                        $('#btn-publish-update').attr('data-status', result.status);
                        $('#btn-publish-update').attr('data-id', result.id);
                        $('#stragetyname').val(result.name);
                        $('#appname').val(result.displayName);
                        $('#des').val(result.introduction);
                        $('#sharetext').val(result.sharingContent);
                        //按月按季度收费============================================================
                        $('.priceType').val(result.priceType);
                        // =====================================================================================

                        $("input[name='styletype'][value=" + result.strategyTypeId + "]").prop('checked', 'checked').parent().siblings()
                            .find('.styletype').removeAttr('checked');
                        if (result.showReturnScope) {
                            $("input[name='recommnttype'][value=" + result.showReturnScope + "]").prop('checked', 'checked')
                                .parent().siblings().find('.recommnttype').removeAttr('checked');
                        }
                        if (result.strategyTypeId === 3) {
                            $('.recomment-config').show();
                            $('.assets-config').hide();
                        } else {
                            $('.recomment-config').hide();
                            $('.assets-config').show();
                        }
                        $("input[name='circletype'][value=" + result.strategyIndexId + ']').prop('checked', 'checked')
                            .parent().siblings().find('.circletype').removeAttr('checked');
                        if (result.pushType) {
                            $("input[name='pushtype'][value=" + result.pushType + ']').prop('checked', 'checked')
                                .parent().siblings().find('.pushtype').removeAttr('checked');
                        } else {
                            $("input[name='pushtype']").removeAttr('checked');
                        }
                        $('#publishtime').val(toDate(result.onlineTime));
                        $('.referenceType').val(result.referenceIndicesId ? result.referenceIndicesId : '');
                        //支付方式
                        $('.priceType').val(result.priceType ? result.priceType : '');
                        $('#testannualrate').val(result.annualizedReturnRate);
                        $('#alphatvalue').val(result.alphaRatio);
                        $('#xiapurate').val(result.sharpRatio);
                        $('#recommendOrder').val(result.recommendOrder);
                        $('#submaxnum').val(result.maxSubcribeVolume);
                        $('#bookprice').val(result.price);
                        $('#discountPrice').val(result.discountPrice);
                        $('input[name="discount"]').removeAttr('checked');
                        $('input[name="discount"][value="' + result.discount + '"]').click();
                        $('input[name="discount"][value="' + result.discount + '"]').attr("checked", true);
                        discountedPrice();
                        $('#maxpostionemptydates').val(result.maxEmptyPositionDays);
                        $('#positionemptyinfo').val(result.emptyPositionNotice);
                        $("#biggestAssetRetreatRatio").val(result.biggestAssetRetreatRatio);
                        if (result.templateId) {
                            $('.strategy-templist').find('input[data-id="' + result.templateId + '"]')
                                .prop('checked', true).removeClass('strategy-temp').addClass('strategy-temp-checked');
                        } else {
                            $('.strategy-templist').find('input')
                                .prop('checked', false).removeClass('strategy-temp-checked').addClass('strategy-temp');
                        }
                        $("#strategy-pushmsg").val(result.pushMessage);
                        // if(result.status===1){
                        // $('#publishtime').attr('disabled','true');
                        // $('#btn-publish-save').attr('disabled','true');
                        //
                        // }else{
                        // $('#publishtime').removeAttr('disabled');
                        // $('#btn-publish-save').removeAttr('disabled');
                        // }
                    }
                }
            });
            // publishAddOrUpdateOrOn(mid);
            $('#publihModal').modal('show');
        }
        if ($(this).hasClass('btn-off')) {
            if ($(this).hasClass('disabled')) {
                event.preventDefault();
            } else {
                $('#strategy-off-message').val('');
                $('#strategy-off-mid').val(mid);
                $('.strategy-off-msgnum').html(100);
                $('#strategy-off-modal').modal();
            }
        }
        if ($(this).hasClass('btn-on')) {
            if ($(this).hasClass('disabled')) {
                event.preventDefault();
            } else {
                Lobibox.confirm({
                    msg: '是否将上架信息推送给客户',
                    buttons: {
                        yes: {
                            class: 'btn btn-primary',
                            text: '上架并推送'
                        },
                        no: {
                            class: 'btn btn-default',
                            text: '仅上架不推送'
                        }
                    },
                    callback: function ($this, type, ev) {
                        if (type === 'yes') {
                            $.ajax({
                                url: '/APP-admin/model/onshelf?requirePush=1&uid=' + id + '&mid=' + mid,
                                type: 'PUT',
                                dataType: 'json',
                                contentType: 'application/json',
                                success: function (data) {
                                    if (data.success) {
                                        Lobibox.notify('success', {
                                            'msg': '策略成功上架，并已成功推送',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#publihModal').modal('hide');
                                        getModelList();
                                    } else {
                                        Lobibox.notify('error', {
                                            'msg': data.msg,
                                            sound: false,
                                            delay: 1000
                                        })
                                    }
                                }
                            })
                        }
                        if (type === 'no') {
                            $.ajax({
                                url: '/APP-admin/model/onshelf?requirePush=0&uid=' + id + '&mid=' + mid,
                                type: 'PUT',
                                dataType: 'json',
                                contentType: 'application/json',
                                success: function (data) {
                                    if (data.success) {
                                        Lobibox.notify('success', {
                                            'msg': '策略成功上架',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#publihModal').modal('hide');
                                        getModelList();
                                    } else {
                                        Lobibox.notify('error', {
                                            'msg': data.msg,
                                            sound: false,
                                            delay: 1000
                                        })
                                    }
                                }
                            })
                        }
                    }
                });
            }
        }
        if($(this).hasClass('btn-pay')){
            $('#strategy-pay-modal').modal('show');
            $('#btn-pay-add').attr('data-mid',mid);
            $('#btn-pay-add').attr('data-display-name',displayName);
            getSubscribeTypeInfoList(mid);
        }
        /* Act on the event */
    });
    $('#strategy-off-message').on('keyup', function () {
        $('.strategy-off-msgnum').html(100 - $(this).val().length);
    })
    //策略下架确认
    $('#btn-off-sure').click(function () {
        if ($.trim($('#strategy-off-message').val()) === '') {
            Lobibox.alert('warning', {
                msg: '推送内容不能为空!'
            });
            return;
        }
        Lobibox.confirm({
            msg: '确认是否下架?',
            buttons: {
                yes: {
                    class: 'btn btn-primary',
                    text: '下架'
                },
                no: {
                    class: 'btn btn-default',
                    text: '取消'
                }
            },
            callback: function ($this, type, ev) {
                if (type === 'yes') {
                    var mid = $('#strategy-off-mid').val();
                    var content = $('#strategy-off-message').val();
                    $.ajax({
                        url: '/APP-admin/model/model_repeal',
                        type: 'POST',
                        dataType: 'json',
                        //contentType : "application/json;charset=UTF-8",
                        data: {
                            'modelId': Number(mid),
                            'message': content
                        },
                        success: function (data) {
                            if (data.success) {
                                $('#strategy-off-modal').modal('hide');
                                Lobibox.notify('success', {
                                    msg: '策略下架成功',
                                    sound: false,
                                    delay: 1000
                                });
                                getModelList();
                            } else {
                                Lobibox.notify('error', {
                                    msg: data.msg,
                                    sound: false,
                                    delay: 1000
                                });
                            }
                        }
                    });
                }
            }
        });
    })
    jQuery.validator.addMethod("english", function (value, element) {
        var chrnum = /^([a-zA-Z]+)$/;
        return this.optional(element) || (chrnum.test(value));
    }, "只能输入英文");

    jQuery.validator.addMethod("priceCompare", function (value, element) {
        var price = Number($('#bookprice').val());
        var discountPrice = Number($('#discountPrice').val());
        if (price === discountPrice) {
            return this.optional(element) || false;
        } else {
            return this.optional(element) || (price > discountPrice);
        }
    }, "优惠价需小于原价");

    function validstagetypublishform() {
        return $('#stagetypublishform').validate({
            rules: {
                stragetyname: {
                    required: true,
                    english: true,
                    maxlength: 45
                },
                appname: {
                    required: true,
                    maxlength: 45
                },
                des: {
                    required: true,
                    maxlength: 300
                },
                sharetext: {
                    required: true,
                    maxlength: 300
                },
                testannualrate: {
                    required: true,
                    number: true
                },
                alphatvalue: {
                    required: true,
                    number: true,

                },
                biggestAssetRetreatRatio: {
                    required: true,
                    number: true
                },
                xiapurate: {
                    required: true,
                    number: true
                },
                recommendOrder: {
                    required: true,
                    digits: true,
                    min: 0
                },
                submaxnum: {
                    required: true,
                    digits: true,
                    min: 0,
                    maxlength: 10
                },
                bookprice: {
                    required: true,
                    digits: true,
                    min: 1,
                    maxlength: 16
                },
                discountPrice: {
                    required: true,
                    min: 0,
                    digits: true,
                    maxlength: 16,
                    priceCompare: true
                },
                maxpostionemptydates: {
                    required: true,
                    digits: true,
                    min: 0,
                    maxlength: 10
                },
                positionemptyinfo: {
                    required: true,
                    maxlength: 100
                },
                publishtime: {
                    required: true
                },
                referenceType: {
                    required: true
                },
                pushMessage: {
                    required: true
                }

            },
            messages: {
                stragetyname: {
                    required: '请输入策略名字',
                    maxlength: '长度最长不能超过45'

                },
                appname: {
                    required: '请输入策略在APP显示名称',
                    maxlength: '长度最长不能超过45'
                },
                des: {
                    required: '请输入策略描述',
                    maxlength: '长度最长不能超过300'

                },
                sharetext: {
                    required: '请输入策略分享语句',
                    maxlength: '长度最长不能超过300'
                },
                testannualrate: {
                    required: '请输入策略年化收益率',
                    number: '请输入数字'
                },
                alphatvalue: {
                    required: '请输入阿尔法',
                    number: '请输入数字'
                },
                biggestAssetRetreatRatio: {
                    required: '请输入最大回撤',
                    number: '请输入数字'
                },
                xiapurate: {
                    required: '请输入夏普率',
                    number: '请输入数字'
                },
                recommendOrder: {
                    required: '请输入推荐序号',
                    digits: '请输入整数',
                    min: '输入的数字大于0'
                },
                submaxnum: {
                    required: '请输入人数',
                    digits: '请输入整数',
                    min: '输入的数字大于0',
                    maxlength: '长度最长不能超过10'
                },
                bookprice: {
                    required: '请输入原价',
                    digits: '请输入整数',
                    min: '输入的数字大于0',
                    maxlength: '长度最长不能超过16'
                },
                discountPrice: {
                    required: '请输入优惠价',
                    digits: '请输入整数',
                    min: '输入的数字大于或等于0',
                    maxlength: '长度最长不能超过16'
                },
                maxpostionemptydates: {
                    required: '请输入天数',
                    digits: '请输入整数',
                    min: '输入的数字大于0',
                    maxlength: '长度最长不能超过10'
                },
                positionemptyinfo: {
                    required: '请输入空仓提示信息',
                    maxlength: '长度最长不能超过100'

                },
                publishtime: {
                    required: '请输入时间'
                },
                referenceType: {
                    required: '请选择参照类型'
                },
                pushMessage: {
                    required: '推送消息不能为空'
                }
            }

        });
    }

    $('.strategy-templist').on('click', '.strategy-temp', function () {
        $(this).prop('checked', true).removeClass('strategy-temp').addClass('strategy-temp-checked')
            .siblings('.strategy-temp-checked').prop('checked', false).removeClass('strategy-temp-checked').addClass('strategy-temp');
        $('#strategy-pushmsg').val($(this).data('content'));
    });
    $('.strategy-templist').on('click', '.strategy-temp-checked', function () {
        $(this).prop('checked', false).removeClass('strategy-temp-checked').addClass('strategy-temp');
    });
    $('#stragetyname').keyup(function () {
        var stragetyname = $(this).val();
        $.ajax({
            url: '/APP-admin/model/checkName?name='
                + stragetyname,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.success) {

                    if (!data.data) {
                        $('.name-error').show().text('名字已存在');

                        $('.check-value').text('false')
                    } else {
                        $('.name-error').hide();


                        $('.check-value').text('true')

                    }

                }
            }
        });
    })
    $('#appname').keyup(function () {
        var appname = $(this).val();
        $
            .ajax({
                url: '/APP-admin/model/checkDisplayName',
                type: 'POST',
                data: {'displayName': appname},
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        if (!data.data) {
                            $('.displayname-error').show()
                                .text('名字已存在')

                            $('.check-value').text('false')

                        } else {
                            $('.displayname-error').hide()

                            $('.check-value').text('true')

                        }

                    }
                }
            });
    })

    function checkName(stragetyname, appname) {

        $.ajax({
            url: '/APP-admin/model/checkName?name='
                + stragetyname,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.success) {

                    if (!data.data) {
                        $('.name-error').show().text('名字已存在');

                        $('.check-value').text('false')
                    } else {
                        $('.name-error').hide();

                        $('.check-value').text('true')

                    }

                }
            }
        });
        $
            .ajax({
                url: '/APP-admin/model/checkDisplayName',
                type: 'POST',
                dataType: 'json',
                data: {'displayName': appname},
                success: function (data) {
                    if (data.success) {
                        if (!data.data) {
                            $('.displayname-error').show()
                                .text('名字已存在')

                            $('.check-value').text(
                                $('.check-value').text()
                                + 'false')

                        } else {
                            $('.displayname-error').hide()

                            $('.check-value').text(
                                $('.check-value').text()
                                + 'true')

                        }

                    }
                }
            });

    }

    // 加减
    $('.spinnerExample').spinner({});
    // // 查看数据
    // $('#exportTable').on(
    // 'click',
    // 'td',
    // function() {
    // var ktype = $('#klinetype').val();
    // var startT = Number($('#kstarttime').val());
    // var endT = Number($('#kendtime').val());
    //
    // var stockcode = $(this).attr('data-stockcode');
    // var time = Number($(this).attr('data-time'));
    // var name = $(this).attr('data-name');
    //
    // var startkT = time - startT;
    //
    // var endTime = tokDateTime(time + endT);
    // $('.kline-contanier').attr('data-stockcode',
    // stockcode).attr('data-name', name);
    // $('.data-load').text('数据正在加载中。。。');
    // exportKline('.kline-contanier', stockcode, startT,
    // endT, time, ktype);
    // // $('.data-load').hide();
    // });
    // 生成log数据
    $('#createFile').click(function () {


        imgDatas = [];
        // currentIndex=0;
        // $('.progress').show();


        if (currentJndex === 0) {
            var ktype = $('#exportlogFile').find('#klinetype').val();
            var name = $('#exportlogFile').find('.export-table tbody').attr('data-file');
            var fileindex = name.indexOf('.');
            var fileType = name.substring(fileindex);
            var filename = name.substring(0, fileindex);
            $('#exportlogFile').find('.export-table tbody').attr('data-file', filename + '(' + ktype + ')' + fileType);
            exportFor('pdf', '#exportlogFile', 'log');
        } else {
            Lobibox.alert('error', {
                msg: '有数据正在处理中,请稍后再试！'
            })
        }

    });
    $('#createTradeFile').click(function () {
        imgDatas = [];
        // currentIndex=0;
        // $('.progress').show();

        if (currentJndex === 0) {
            var ktype = $('#exporttradeFile').find('#klinetype').val();
            var name = $('#exporttradeFile').find('.export-table tbody').attr('data-file');
            var fileindex = name.indexOf('.');
            var fileType = name.substring(fileindex);
            var filename = name.substring(0, fileindex);
            $('#exporttradeFile').find('.export-table tbody').attr('data-file', filename + '(' + ktype + ')' + fileType);
            exportFor('pdf', '#exporttradeFile', 'trade')
        } else {
            Lobibox.alert('error', {
                msg: '有数据正在处理中,请稍后再试！'
            })
        }
    })
    $('#createtradewordFile').click(function () {
        imgDatas = [];
        // currentIndex=0;
        // $('.progress').show();
        if (currentJndex === 0) {
            var ktype = $('#exporttradeFile').find('#klinetype').val();
            var name = $('#exporttradeFile').find('.export-table tbody').attr('data-file');
            var fileindex = name.indexOf('.');
            var fileType = name.substring(fileindex);
            var filename = name.substring(0, fileindex);
            $('#exporttradeFile').find('.export-table tbody').attr('data-file', filename + '(' + ktype + ')' + fileType);
            exportFor('word', '#exporttradeFile', 'trade')
        } else {
            Lobibox.alert('error', {
                msg: '有数据正在处理中,请稍后再试！'
            })
        }


    })
    $('#createwordFile').click(function () {


        imgDatas = [];
        // currentIndex=0;
        // $('.progress').show();

        if (currentJndex === 0) {
            var ktype = $('#exportlogFile').find('#klinetype').val();
            var name = $('#exportlogFile').find('.export-table tbody').attr('data-file');
            var fileindex = name.indexOf('.');
            var fileType = name.substring(fileindex);
            var filename = name.substring(0, fileindex);
            $('#exportlogFile').find('.export-table tbody').attr('data-file', filename + '(' + ktype + ')' + fileType);
            exportFor('word', '#exportlogFile', 'log')
        } else {
            Lobibox.alert('error', {
                msg: '有数据正在处理中,请稍后再试！'
            })
        }

    });


    function exportFor(buildtype, container, exporttype) {
        var ktype = $(container).find('#klinetype').val();

        var restorationtype = $(container).find('#klinerestorationtype').val();
        var startT = Number($(container).find('#kstarttime').val());
        var endT = Number($(container).find('#kendtime').val());
        var stockArrary = JSON.parse(localStorage.getItem("stockArray"));
        var kdatas = JSON.parse(localStorage.getItem('kdatas'));
        var days, startTime;
        var length = stockArray.length;
        var stocks = [];
        var stockObjects;
        var eachIndex;
        if (exporttype === 'log') {
            eachIndex = currentJndex * 10;
        } else {
            eachIndex = currentJndex
        }


        if (eachIndex >= length) {
            imgDatas = null;
            currentJndex = 0;
            stocks = null;
            stockObjects = null;
            clearTimeout(t);

            return;

        }


        if (exporttype === 'log') {
            stocks = stockArray.slice(currentJndex * 10, (currentJndex + 1) * 10);
            startTime = endT;

        } else {
            stocks = stockArray.slice(currentJndex, currentJndex + 1);
            days = kdatas.slice(currentJndex, currentJndex + 1)[0].days;
            if (ktype === 'M1') {
                startTime = endT + days * 240;
            }
            if (ktype === 'M5') {
                startTime = endT + days * 48

            }
            if (ktype === 'M15') {
                startTime = endT + days * 16

            }
            if (ktype === 'M30') {
                startTime = endT + days * 8

            }
            if (ktype === 'H1') {
                startTime = endT + days * 4

            }
            if (ktype === 'D1') {
                startTime = endT + days

            }
        }


        stockObjects = {
            'StockInfos': stocks,
            "KType": ktype,
            "ForwardLength": startT,
            "BackwardLength": startTime,
            'weightingType': restorationtype

        }

        imgDatas = [];

        exportKline(container, stockObjects, ktype, currentJndex + 1, buildtype, exporttype);


//					for(var n=0;n<stocks.length;n++){
//						stocks.push(stockArray[n]);
//						if(n===stockArray.length-1||n===20*m-1){
//							stockObjects = {
//									'StockInfos' : stocks,
//									"KType" : ktype,
//									"ForwardLength" : startT,
//									"BackwardLength" : endT
//
//								}
//							exportKline('.kline-contanier',stockObjects,ktype,m,buildtype);
//							stockObjects=null;
//							m++;
//							stocks=[];
//						}
//					}


    }

    //生成导出k线
    function exportKline(container, stockObjects, ktype, m, buildtype, exportType) {
        var startTime, startT, log;
        var tradeMap = {
            "1": "买入",
            "3": "卖出",
            "4": "分红",
            "5": "配股",
            "6": "送股",
            "7": "转股",
            "0": "无交易"
        };


        var tradePrices = [];
        var tradeObjects = [];
        var times = [];
        var imgData, width, data0, name, logTime, stockcode;
        var list;
        var maxvalue, maxvolumn, maxMACD, maxKDJ;
        var minvalue, minvolumn, minMACD, minKDJ;
        var tradeline = [];
        var tradeline2 = [];
        var tradeline3 = [];
        var tradeline4 = [];
        var signals = [];
        var ktrades = [];
        var addPoint;
        var i = 0;
        var MACDResults;
        var KDJResults;
        var kcontainer;
        var jindex = 0;
        num = 1;
        var kcontainer4, kcontainer3, kcontainer2, option, option2, option3, option4, mychart4, myChart2, mychart3,
            myChart;
        var defer = $.Deferred();
        kcontainer = $(container).find(
            '.k-container')[0];
        kcontainer2 = $(container)
            .find('.k-container2')[0];
        kcontainer3 = $(container)
            .find('.k-container3')[0];
        kcontainer4 = $(container)
            .find('.k-container4')[0];
        myChart = echarts.init(
            kcontainer, shine);
        myChart2 = echarts
            .init(kcontainer2);

        mychart4 = echarts
            .init(kcontainer4);

        var url = host + '/GetKlineByAmount';
        var percent = 100 / stockArray.length;
        var pdf;
        var kdatas = JSON.parse(localStorage.getItem('kdatas'));


        $
            .ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                //async : false,
                // cache: false,
                //timeout:10000,
                contentType: "application/json",
                data: JSON.stringify(stockObjects),
                beforeSend: function () {
                    $('.loading').show();
                    $('.progress').show();
                },
                complete: function (XHR, TS) {
                    XHR = null

                },// 回收资源

                success: function (data) {

                    $('.data-load').show();
                    $('.loading').hide();


                    var dataList = data.Data;

                    for (var currentIndex = 0; currentIndex < dataList.length; currentIndex++) {
                        tradeObjects = [];
                        tradePrices = [];
                        list = dataList[currentIndex].KlineDatas;
                        var stockIndex;
                        if (exportType === 'log') {
                            stockIndex = currentIndex + (m - 1) * 10;
                        } else {
                            stockIndex = currentIndex + (m - 1);
                        }
                        if (stockIndex >= stockArray.length - 1) {
                            stockcode = $(container).find('.export-table td')[stockArray.length - 1]
                                .getAttribute('data-stockcode');
                            logTime = Number($(container).find('.export-table td')[stockArray.length - 1]
                                .getAttribute('data-time'));
                            name = $(container).find('.export-table td')[stockArray.length - 1].getAttribute('data-name')
                            $(container).find('.data-load')
                                .text(
                                    '第'
                                    + stockArray.length
                                    + '条数据正在生成中，数据完成前，请不要进行其他操作。');
                            width = 100;
                            if (exportType === 'trade') {
                                signals = kdatas[stockArray.length - 1].signals;
                            }

                        } else {

                            if (exportType === 'trade') {
                                signals = kdatas[currentIndex + (m - 1)].signals;
                                stockcode = $(container).find('.export-table td')[currentIndex + (m - 1)]
                                    .getAttribute('data-stockcode');
                                logTime = Number($(container).find('.export-table td')[currentIndex + (m - 1)]
                                    .getAttribute('data-time'));

                                name = $(container).find('.export-table td')[currentIndex + (m - 1)].getAttribute('data-name')

                                $(container).find('.data-load')
                                    .text(
                                        '第'
                                        + (currentIndex + 1 + (m - 1))
                                        + '条数据正在生成中，数据完成前，请不要进行其他操作。');
                                width = (currentIndex + 1 + (m - 1))
                                    * percent

                            } else {
                                stockcode = $(container).find('.export-table td')[currentIndex + (m - 1) * 10]
                                    .getAttribute('data-stockcode');
                                logTime = Number($(container).find('.export-table td')[currentIndex + (m - 1) * 10]
                                    .getAttribute('data-time'));

                                name = $(container).find('.export-table td')[currentIndex + (m - 1) * 10].getAttribute('data-name')

                                $(container).find('.data-load')
                                    .text(
                                        '第'
                                        + (currentIndex + 1 + (m - 1) * 10)
                                        + '条数据正在生成中，数据完成前，请不要进行其他操作。');
                                width = (currentIndex + 1 + (m - 1) * 10)
                                    * percent
                            }


                        }


                        $('.process-export').width(width + "%");

                        $('.process-export span').text(
                            'processing');
                        data0 = splitData(list, '', ktype);
                        if (data0.categoryData.length > 0) {

                            if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {

                                log = toDate(logTime);

                            } else {

                                log = toDateTime(logTime);
                            }
                            if (exportType === 'trade') {
                                if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {

                                    for (jindex = 0; jindex < signals.length; jindex++) {
                                        //tradePrices.push(signals[jindex].price);
                                        var tradename = toDate(signals[jindex].time)
                                            + '\n'
                                            + tradeMap[signals[jindex].tradeSignalType];

                                        var trade = {
                                            name: tradename,
                                            value: signals[jindex].price,
                                            xAxis: toDate(signals[jindex].time),
                                            yAxis: signals[jindex].price

                                        };
                                        ktrades.push(trade);

                                    }


                                } else {

                                    for (jindex = 0; jindex < signals.length; jindex++) {
                                        //tradePrices.push(signals[jindex].price);
                                        var tradename = toDateTime(signals[jindex].time)
                                            + '\n'
                                            + tradeMap[signals[jindex].tradeSignalType];

                                        var trade = {
                                            name: tradename,
                                            value: signals[jindex].price,
                                            xAxis: toDateTime(signals[jindex].time),
                                            yAxis: signals[jindex].price

                                        };
                                        ktrades.push(trade);

                                    }
                                }
                            }

                            for (i = 0; i < data0.categoryData.length; i++) {

                                tradePrices
                                    .push(data0.values[i][3]);
                                tradePrices
                                    .push(data0.values[i][2]);

                            }
                            MACDResults = calulateMACD(
                                list, '');
                            KDJResults = calculateKDJ(list,
                                '', 9);

                            maxvalue = Math.max.apply(null,
                                tradePrices);
                            minvalue = Math.min.apply(null,
                                tradePrices);
                            maxvolumn = Math.max.apply(null, data0.volumns);
                            minvolumn = Math.min.apply(null, data0.volumns);
                            maxMACD = Math.max.apply(null, MACDResults.MACD);
                            minMACD = Math.min.apply(null, MACDResults.MACD);

                            maxKDJ = Math.max.apply(null, KDJResults.J.slice(9));
                            minKDJ = Math.min.apply(null, KDJResults.J.slice(9));
                            console.log(minKDJ);
                            console.log(maxKDJ)


                            tradeline = [];
                            tradeline2 = [];
                            tradeline3 = [];
                            tradeline4 = [];
                            addPoint = (((maxvalue - minvalue) / 0.8) - (maxvalue - minvalue)) / 2
                            for (i = 0; i < data0.categoryData.length; i++) {

                                if (exportType === 'log') {


                                    if (data0.categoryData[i] === log
                                        || (data0.categoryData[i] > log && data0.categoryData[i - 1] < log)) {

                                        tradeObjects
                                            .push({
                                                'name': '原点时间'
                                                    + log,
                                                'value': log,
                                                'coord': [
                                                    i,
                                                    maxvalue],
                                                'symbol': 'emptytriangle',
                                                'symbolSize': 10,
                                                'symbolOffset': [0, '50%'],
                                                'label': {
                                                    'normal': {
                                                        'position': 'top'
                                                    }
                                                }


                                            });
                                        tradeline.push([{
                                            'coord': [i,
                                                data0.values[i][3] + 0.01]

                                        }, {
                                            'coord': [i,
                                                maxvalue],

                                            label: {
                                                normal: {
                                                    show: false
                                                }
                                            }
                                        }])


                                        tradeline2
                                            .push([{
                                                'coord': [i,
                                                    0]

                                            }, {
                                                'coord': [i,
                                                    maxvolumn],

                                                label: {
                                                    normal: {
                                                        show: true
                                                    }
                                                }
                                            }]);

                                        tradeline3.push([{
                                            "coord": [i, minMACD]
                                        }, {
                                            'coord': [i, maxMACD],
                                            label: {
                                                normal: {
                                                    show: true
                                                }
                                            }
                                        }]);

                                        tradeline4.push([{
                                            "coord": [i, minKDJ]
                                        }, {
                                            'coord': [i, maxKDJ],
                                            label: {
                                                normal: {
                                                    show: true
                                                }
                                            }

                                        }]);


                                        break;

                                    }
                                } else {
                                    for (var j = 0; j < ktrades.length; j++) {
                                        if (data0.categoryData[i] === ktrades[j].xAxis || (data0.categoryData[i] > ktrades[j].xAxis && data0.categoryData[i - 1] < ktrades[j].xAxis)) {


                                            if (ktrades[j].name
                                                .indexOf('买入') > 0) {
                                                tradeline.push([{
                                                    'coord': [i,
                                                        data0.values[i][3] + 0.01],


                                                }, {
                                                    'coord': [i,
                                                        maxvalue],

                                                    label: {
                                                        normal: {
                                                            show: false
                                                        }
                                                    }
                                                }])


                                                tradeline2
                                                    .push([{
                                                        'coord': [i,
                                                            0]

                                                    }, {
                                                        'coord': [i,
                                                            maxvolumn],

                                                        label: {
                                                            normal: {
                                                                show: true
                                                            }
                                                        }
                                                    }]);

                                                tradeline3.push([{
                                                    "coord": [i, minMACD]
                                                }, {
                                                    'coord': [i, maxMACD],
                                                    label: {
                                                        normal: {
                                                            show: true
                                                        }
                                                    }
                                                }]);

                                                tradeline4.push([{
                                                    "coord": [i, minKDJ]
                                                }, {
                                                    'coord': [i, maxKDJ],
                                                    label: {
                                                        normal: {
                                                            show: true
                                                        }
                                                    }

                                                }]);

                                                tradeObjects
                                                    .push({
                                                        'name': ktrades[j].name,
                                                        'coord': [
                                                            i,
                                                            data0.values[i][3]],
                                                        'symbol': 'emptyPin',
                                                        symbolOffset: [0, -5],
                                                        'symbolSize': 10,
                                                        'label': {
                                                            'normal': {
                                                                'show': true,
                                                                position: 'top',
                                                            }
                                                        }
                                                    });

                                            }
                                            if (ktrades[j].name
                                                .indexOf('卖出') > 0) {
                                                tradeline.push([{
                                                    'coord': [i,
                                                        data0.values[i][3] + 0.01],
                                                    'itemStyle': {
                                                        'normal': {
                                                            color: 'green'
                                                        }
                                                    },


                                                }, {
                                                    'coord': [i,
                                                        maxvalue],
                                                    'itemStyle': {
                                                        'normal': {
                                                            color: 'green'
                                                        }
                                                    },

                                                    label: {
                                                        normal: {
                                                            show: false
                                                        }
                                                    }
                                                }])


                                                tradeline2
                                                    .push([{
                                                        'coord': [i,
                                                            0],
                                                        'itemStyle': {
                                                            'normal': {
                                                                color: 'green'
                                                            }
                                                        },

                                                    }, {
                                                        'coord': [i,
                                                            maxvolumn],
                                                        'itemStyle': {
                                                            'normal': {
                                                                color: 'green'
                                                            }
                                                        },

                                                        label: {
                                                            normal: {
                                                                show: true
                                                            }
                                                        }
                                                    }]);

                                                tradeline3.push([{
                                                    "coord": [i, minMACD],
                                                    'itemStyle': {
                                                        'normal': {
                                                            color: 'green'
                                                        }
                                                    },
                                                }, {
                                                    'coord': [i, maxMACD],
                                                    'itemStyle': {
                                                        'normal': {
                                                            color: 'green'
                                                        }
                                                    },
                                                    label: {
                                                        normal: {
                                                            show: true
                                                        }
                                                    }
                                                }]);

                                                tradeline4.push([{
                                                    "coord": [i, minKDJ],
                                                    'itemStyle': {
                                                        'normal': {
                                                            color: 'green'
                                                        }
                                                    },
                                                }, {
                                                    'coord': [i, maxKDJ],
                                                    'itemStyle': {
                                                        'normal': {
                                                            color: 'green'
                                                        }
                                                    },
                                                    label: {
                                                        normal: {
                                                            show: true
                                                        }
                                                    }

                                                }]);

                                                tradeObjects
                                                    .push({
                                                        'name': ktrades[j].name,
                                                        'coord': [
                                                            i,
                                                            data0.values[i][2]],
                                                        'symbol': 'emptypin',
                                                        'symbolSize': 10,
                                                        symbolOffset: [0, 5],
                                                        'symbolRotate': 180,
                                                        'itemStyle': {
                                                            'normal': {
                                                                color: 'green'
                                                            }
                                                        },
                                                        'label': {
                                                            'normal': {
                                                                show: true,
                                                                position: 'bottom'
                                                            }
                                                        }
                                                    });
                                            }
                                        }
                                    }
                                }


                            }
                            if (exportType === 'log') {


                                if (tradeObjects.length === 0) {
                                    tradeObjects
                                        .push({
                                            'name': '原点时间'
                                                + log,
                                            'value': log,
                                            'coord': [
                                                data0.categoryData.length - 1,
                                                maxvalue],
                                            'symbol': 'emptytriangle',
                                            'symbolSize': 10,
                                            'symbolOffset': [0, '50%'],
                                            'label': {
                                                'normal': {
                                                    'position': 'top'
                                                }
                                            }

                                        });
                                    tradeline
                                        .push([{
                                            'coord': [data0.categoryData.length - 1,
                                                minvalue]

                                        }, {
                                            'coord': [data0.categoryData.length - 1,
                                                maxvalue],

                                            label: {
                                                normal: {
                                                    show: false
                                                }
                                            }
                                        }]);

                                    tradeline2
                                        .push([{
                                            'coord': [data0.categoryData.length - 1,
                                                0]

                                        }, {
                                            'coord': [data0.categoryData.length - 1,
                                                maxvolumn],

                                            label: {
                                                normal: {
                                                    show: true
                                                }
                                            }
                                        }]);

                                    tradeline3.push([{
                                        "coord": [data0.categoryData.length - 1, minMACD]
                                    }, {
                                        'coord': [data0.categoryData.length - 1, maxMACD],
                                        label: {
                                            normal: {
                                                show: true
                                            }
                                        }
                                    }]);

                                    tradeline4.push([{
                                        "coord": [data0.categoryData.length - 1, minKDJ]
                                    }, {
                                        'coord': [data0.categoryData.length - 1, maxKDJ],
                                        label: {
                                            normal: {
                                                show: true
                                            }
                                        }

                                    }]);


                                }
                            }


                            var title = '股票:'
                                + stockcode
                                + ' '
                                + name;


                            option = {
                                title: {
                                    text: title,

                                },
                                color: ['#ff7f50', '#87cefa',
                                    '#40e0d0', '#c23531',
                                    '#ff69b4', '#ba55d3',
                                    '#7b68ee', '#ffa500'],
                                tooltip: {
                                    trigger: 'axis',
                                    showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms

                                    formatter: function (params) {
                                        if (params) {

                                            var res;
                                            if (params.componentType === 'markPoint') {

                                                var time = log;
                                                res = time;
                                                res += '<br/>'
                                                    + params.name
                                                    + ':'
                                                    + params.data.coord[1];
                                            }
                                            if (params[0]) {
                                                res = params[0].name;
                                                res += '<br/>'
                                                    + params[0].seriesName;
                                                res += '<br/>  开盘 : '
                                                    + params[0].value[0]
                                                    + '  最高 : '
                                                    + params[0].value[3];
                                                res += '<br/>  收盘 : '
                                                    + params[0].value[1]
                                                    + '  最低 : '
                                                    + params[0].value[2];
                                            }
                                            if (params[1]) {
                                                res += '<br/>  MA5 : '
                                                    + params[1].value;
                                            }
                                            if (params[2]) {
                                                res += '<br/>  MA10 : '
                                                    + params[2].value;
                                            }
                                            if (params[3]) {
                                                res += '<br/>  MA30 : '
                                                    + params[3].value;
                                            }

                                            return res;
                                        }
                                    }
                                },
                                legend: {
                                    data: ['K线', 'MA5',
                                        'MA10', 'MA30'],

                                    right: '20%',

                                },
                                dataZoom: [{
                                    type: 'inside',

                                    start: 0,
                                    end: 100
                                }, {
                                    type: 'slider',
                                    show: false,
                                    right: '5%',

                                    start: 0,
                                    end: 100
                                }],
                                grid: {
                                    left: '10%',
                                    right: '5%',

                                },
                                xAxis: [{
                                    type: 'category',
                                    scale: true,
                                    boundaryGap: true,
                                    axisTick: {
                                        onGap: true
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    data: data0.categoryData
                                }],
                                yAxis: [{
                                    type: 'value',
                                    scale: true,


                                }],
                                series: [
                                    {
                                        name: 'K线',
                                        type: 'k',
                                        data: data0.values,
                                        animation: false,
                                        itemStyle: {
                                            normal: {
                                                color0: '#137f57'
                                            }
                                        },
                                        markPoint: {

                                            symbolRotate: 0,
                                            label: {
                                                normal: {
                                                    show: true,
                                                    position: 'bottom',
                                                    formatter: function (
                                                        params) {
                                                        // console.log(params)
                                                        var res;
                                                        res = params.name;

                                                        return res;
                                                    },
                                                    textStyle: {
                                                        color: '#0000ff'
                                                    }
                                                }
                                            },
                                            data: tradeObjects
                                        },
                                        markLine: {
                                            name: '原点时间',
                                            symbolSize: 0,
                                            data: tradeline

                                        }

                                    },

                                    {
                                        name: 'MA5',
                                        animation: false,
                                        type: 'line',
                                        data: calculateMA(
                                            5, data0),
                                        smooth: true,

                                    },
                                    {
                                        name: 'MA10',
                                        type: 'line',
                                        data: calculateMA(
                                            10, data0),
                                        smooth: true,
                                        animation: false

                                    },

                                    {
                                        name: 'MA30',
                                        type: 'line',
                                        data: calculateMA(
                                            30, data0),
                                        smooth: true,
                                        animation: false

                                    },

                                ]
                            };


                            myChart.setOption(option);


                            option2 = {
                                tooltip: {
                                    position: function (point,
                                                        params, dom) {
                                        // 固定在顶部
                                        return [point[0],
                                            '10%'];
                                    },
                                    trigger: 'axis',
                                    showDelay: 0
                                    // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                                },
                                color: ['#c23531', '#ff69b4'],
                                legend: {
                                    show: true,
                                    right: '20%',

                                    data: ['成交量', '5日均量']
                                },
                                dataZoom: [{
                                    type: 'slider',
                                    show: false,
                                    right: '5%',
                                    show: false,

                                    start: 0,
                                    end: 100
                                }, {
                                    type: 'inside',
                                    show: false,

                                    start: 0,
                                    end: 100
                                }],

                                grid: {
                                    left: '10%',
                                    right: '5%',

                                    height: '60%'
                                },
                                xAxis: [{
                                    type: 'category',
                                    // inverse:true,
                                    // position: 'top',
                                    scale: true,
                                    boundaryGap: true,
                                    axisLabel: {
                                        show: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    data: data0.categoryData
                                }],
                                yAxis: [{
                                    scale: true,
                                    // inverse:true,
                                    splitNumber: 2,
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine: {
                                        show: true
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    splitLine: {
                                        show: false
                                    }
                                }],
                                series: [
                                    {
                                        name: '成交量',
                                        type: 'bar',

                                        data: data0.volumns,
                                        barWidth: 5,
                                        animation: false,
                                        markLine: {
                                            name: '原点时间',
                                            symbolSize: 5,
                                            data: tradeline2

                                        },
                                        itemStyle: {
                                            normal: {
                                                color: function (
                                                    params) {

                                                    var index = params.dataIndex;

                                                    if (index === -1) {
                                                        return '#c23531';
                                                    }
                                                    if (data0.values[index][1] <= data0.values[index][0]) {
                                                        return '#137f57';
                                                    } else {
                                                        return '#c23531';
                                                    }

                                                }
                                            }

                                        }

                                    },
                                    {
                                        name: '5日均量',
                                        type: 'line',
                                        data: calculateMavol(
                                            5, data0),
                                        smooth: true,
                                        animation: false,
                                        itemStyle: {
                                            normal: {
                                                color: '#ff69b4',
                                            }
                                        }
                                    }]
                            };

                            mychart3 = echarts
                                .init(kcontainer3);
                            option3 = {
                                tooltip: {
                                    position: function (point,
                                                        params, dom) {
                                        // 固定在顶部
                                        return [point[0],
                                            '10%'];
                                    },
                                    trigger: 'axis',
                                    showDelay: 0
                                    // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                                },
                                color: ['#ba55d3', '#7b68ee',
                                    '#ffa500'],
                                legend: {

                                    right: '20%',

                                    data: ['DEA', 'DIF',
                                        'MACD']
                                },
                                toolbox: {
                                    y: -40,
                                    show: true,
                                    feature: {
                                        mark: {
                                            show: true
                                        },
                                        dataZoom: {
                                            show: true
                                        },
                                        dataView: {
                                            show: true,
                                            readOnly: false
                                        },
                                        magicType: {
                                            show: true,
                                            type: ['line',
                                                'bar']
                                        },
                                        restore: {
                                            show: true
                                        },
                                        saveAsImage: {
                                            show: true
                                        }
                                    }
                                },
                                dataZoom: [{
                                    type: 'inside',
                                    show: false,

                                    start: 0,
                                    end: 100
                                }, {
                                    type: 'slider',
                                    right: '10%',
                                    left: '5%',
                                    show: false,

                                    start: 0,
                                    end: 100
                                }],
                                grid: {
                                    left: '10%',
                                    right: '5%',

                                    height: '60%'
                                },
                                xAxis: [{
                                    type: 'category',
                                    scale: true,
                                    // inverse:true,
                                    boundaryGap: true,
                                    axisLabel: {
                                        show: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    data: data0.categoryData
                                }],
                                yAxis: [{
                                    type: 'value',
                                    scale: true,
                                    // inverse:true,

                                    splitNumber: 4,
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine: {
                                        show: true
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    splitLine: {
                                        show: false
                                    }
                                }],
                                series: [
                                    {
                                        name: 'DEA',
                                        type: 'line',
                                        smooth: true,
                                        data: MACDResults.DEA,
                                        animation: false,


                                    },
                                    {
                                        name: 'DIF',
                                        type: 'line',
                                        smooth: true,
                                        data: MACDResults.DIF,
                                        animation: false

                                    },
                                    {
                                        name: 'MACD',
                                        type: 'bar',
                                        animation: false,

                                        data: MACDResults.MACD,
                                        barWidth: 5,
                                        markLine: {
                                            name: '原点时间',
                                            symbolSize: 5,
                                            data: tradeline3

                                        },
                                        itemStyle: {
                                            normal: {
                                                color: function (
                                                    params) {
                                                    // console.log(params);
                                                    if (params.data === null
                                                        || params.data > 0) {
                                                        return '#ffa500';
                                                    } else {
                                                        return '#7CFC00 ';
                                                    }
                                                }
                                            }
                                        }

                                    }]
                            };

                            option4 = {
                                tooltip: {
                                    position: function (point,
                                                        params, dom) {
                                        // 固定在顶部
                                        return [point[0],
                                            '10%'];
                                    },
                                    trigger: 'axis',
                                    showDelay: 0
                                    // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                                },
                                color: ['#ffa500', '#0000ff',
                                    '#ff0000'],
                                legend: {

                                    right: '20%',

                                    data: ['K', 'D', 'J']
                                },
                                toolbox: {
                                    y: -40,
                                    show: true,
                                    feature: {
                                        mark: {
                                            show: true
                                        },
                                        dataZoom: {
                                            show: true
                                        },
                                        dataView: {
                                            show: true,
                                            readOnly: false
                                        },
                                        magicType: {
                                            show: true,
                                            type: ['line',
                                                'bar']
                                        },
                                        restore: {
                                            show: true
                                        },
                                        saveAsImage: {
                                            show: true
                                        }
                                    }
                                },
                                dataZoom: [{
                                    type: 'inside',
                                    show: false,

                                    start: 0,
                                    end: 100
                                }, {
                                    type: 'slider',
                                    right: '10%',
                                    left: '5%',
                                    show: false,

                                    start: 0,
                                    end: 100
                                }],
                                grid: {
                                    left: '10%',
                                    right: '5%',

                                    height: '60%'
                                },
                                xAxis: [{
                                    type: 'category',
                                    scale: true,
                                    // inverse:true,
                                    boundaryGap: true,
                                    axisLabel: {
                                        show: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    data: data0.categoryData
                                }],
                                yAxis: [{
                                    type: 'value',
                                    scale: true,
                                    // inverse:true,

                                    splitNumber: 4,
                                    axisLabel: {
                                        show: true
                                    },
                                    axisLine: {
                                        show: true
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    splitLine: {
                                        show: false

                                    }
                                }],
                                series: [{
                                    name: 'K',
                                    type: 'line',
                                    smooth: true,
                                    data: KDJResults.K,

                                    animation: false

                                }, {
                                    name: 'D',
                                    type: 'line',
                                    smooth: true,
                                    data: KDJResults.D,
                                    animation: false,

                                }, {
                                    name: 'J',
                                    type: 'line',
                                    animation: false,
                                    markLine: {
                                        name: '原点时间',
                                        symbolSize: 5,
                                        data: tradeline4

                                    },

                                    data: KDJResults.J,

                                }]
                            }


                            myChart2.setOption(option2);

                            mychart3.setOption(option3);
                            mychart4.setOption(option4);

                            echarts.connect([myChart,
                                myChart2, mychart3,
                                mychart4]);
                            if (currentIndex >= 0) {

                                imgData = myChart
                                    .getConnectedDataURL({
                                        type: 'jpg'
                                    });
                                imgDatas.push(imgData);

                                defer.resolve(imgDatas);
                                imgData = null;
                                myChart.clear();
                                mychart3.clear();
                                mychart4.clear();
                                myChart2.clear();
                                if (currentIndex === dataList.length - 1
                                    || currentIndex === (10 * num - 1)) {
                                    myChart.dispose();
                                    mychart3.dispose();
                                    mychart4.dispose();
                                    myChart2.dispose();
                                    var name = $(container).find('.export-table tbody')
                                        .attr('data-file');
                                    pdf = {
                                        'fileName': name,
                                        'base64Info': imgDatas
                                    };
                                    var url
                                    if (buildtype === 'pdf') {
                                        url = '/APP-admin/data/import/buildpdf?'
                                    } else {
                                        url = '/APP-admin/data/import/buildword?'
                                    }

                                    $
                                        .ajax({
                                            url: url,
                                            type: 'POST',
                                            async: false,
                                            dataType: 'json',
                                            data: JSON
                                                .stringify(pdf),
                                            contentType: 'application/json',

                                            complete: function (
                                                XHR, TS) {
                                                XHR = null
                                            },// 回收资源

                                            success: function (
                                                data) {
                                                $(
                                                    '.data-load')
                                                    .hide();
                                                var stockforIndex
                                                if (exportType === 'log') {
                                                    stockforIndex = currentIndex + (m - 1) * 10 + 1;
                                                } else {
                                                    stockforIndex = currentIndex + (m - 1) + 1;
                                                }

                                                if (stockforIndex >= stockArray.length) {
                                                    if (buildtype === 'pdf') {
                                                        $(container).find(
                                                            '.btn-export')
                                                            .removeAttr(
                                                                'disabled');
                                                    } else {
                                                        $(container).find(
                                                            '.btn-export-word')
                                                            .removeAttr(
                                                                'disabled');
                                                    }


                                                    $(
                                                        '.progress')
                                                        .hide();
                                                    $('.process-export').width("0%");
                                                    m = 1;
                                                    num = 1;

                                                }
                                                num++;
                                                imgDatas
                                                    .splice(
                                                        0,
                                                        imgDatas.length);// 清空数组
                                                imgDatas.length = 0;
                                                imgDatas = [];

                                            }

                                        })

                                }

                            }


                        } else {
                            $('.progress').hide();
                            $('.data-load').show().text(
                                '没有数据可生成')
                        }
                        // defer.resolve(imgDatas);

                    }

                    currentJndex++;
                    kcontainer4 = null;
                    kcontainer3 = null;
                    kcontainer2 = null;
                    kcontainer = null;
                    option = null;
                    option2 = null;
                    option3 = null;
                    option4 = null;
                    pdf = null;
                    // mychart4=null;
                    // myChart2=null,
                    // mychart3=null;
                    // myChart=null;
                    //imgDatas=null;
                    data0 = null;

                    //return defer.promise();
                    t = setTimeout(function () {
                        exportFor(buildtype, container, exportType);
                    }, 2000);


                }

            });
        // return defer.promise();

    }

    // 导出
    $('#export').click(function () {
        var name = $('#exportTable tbody').attr('data-file');
        var fileindex = name.indexOf('.');
        var filename = name.substring(0, fileindex)
        var url = '/APP-admin/upload/' + filename + '.pdf';
        // var
        // doc=window.open('/APP-admin/upload/'+filename+'.pdf','newwindow',
        // 'height=100, width=400, top=0, left=0, toolbar=no,
        // menubar=no, scrollbars=no, resizable=no,location=n o,
        // status=no');
        var a = document.getElementById("downPdf");
        a.href = url;

        a.download = filename + '.pdf';
        a.click();

        // doc.document.execCommand("SaveAs");
        // doc.close();

    })
    $('#exportword').click(function () {
        var name = $('#exportTable tbody').attr('data-file');
        var fileindex = name.indexOf('.');
        var filename = name.substring(0, fileindex)
        var url = '/APP-admin/upload/' + filename + '.docx';
        // var
        // doc=window.open('/APP-admin/upload/'+filename+'.pdf','newwindow',
        // 'height=100, width=400, top=0, left=0, toolbar=no,
        // menubar=no, scrollbars=no, resizable=no,location=n o,
        // status=no');
        var a = document.getElementById("downPdf");
        a.href = url;

        a.download = filename + '.docx';
        a.click();

        // doc.document.execCommand("SaveAs");
        // doc.close();

    })
    $('#exporttrade').click(function () {
        var name = $('#exporttradeTable tbody').attr('data-file');
        var fileindex = name.indexOf('.');
        var filename = name.substring(0, fileindex)
        var url = '/APP-admin/upload/' + filename + '.pdf';
        // var
        // doc=window.open('/APP-admin/upload/'+filename+'.pdf','newwindow',
        // 'height=100, width=400, top=0, left=0, toolbar=no,
        // menubar=no, scrollbars=no, resizable=no,location=n o,
        // status=no');
        var a = document.getElementById("downPdf");
        a.href = url;

        a.download = filename + '.pdf';
        a.click();
    })
    $('#exporttradeword').click(function () {
        var name = $('#exporttradeTable tbody').attr('data-file');
        var fileindex = name.indexOf('.');
        var filename = name.substring(0, fileindex)
        var url = '/APP-admin/upload/' + filename + '.docx';
        // var
        // doc=window.open('/APP-admin/upload/'+filename+'.pdf','newwindow',
        // 'height=100, width=400, top=0, left=0, toolbar=no,
        // menubar=no, scrollbars=no, resizable=no,location=n o,
        // status=no');
        var a = document.getElementById("downPdf");
        a.href = url;

        a.download = filename + '.docx';
        a.click();
    })

    // 意见反馈信息
    function getFeedBack(page, seachstatus) {

        var url = '/APP-admin/feedback/all?page=' + page
        // type暂时为1
            + '&size=20&type=1' + '&' + Math.random();
        if (seachstatus) {
            url = url + '&status=' + seachstatus
        } else {
            url = url;
        }
        $
            .ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {

                    var maxPage;
                    var table = $('.feedback-table')
                        .dataTable();
                    var oSettings = table.fnSettings();
                    var $tbody = $(".feedback-table tbody");
                    table.fnClearTable(this);
                    if (data.success
                        && data.data.feedbackList.length > 0) {

                        maxPage = Math
                            .ceil(data.data.totalCount / 20);
                        var list = data.data.feedbackList;

                        for (var i = 0; i < list.length; i++) {
                            var time = toDateTime(list[i].time);
                            var status = feedbackstatusMap[list[i].status];
                            var finishTime = list[i].finishTime ? toDateTime(list[i].finishTime)
                                : '';
                            var result;
                            list[i].result = list[i].result ? list[i].result
                                : '';
                            if (list[i].status === 0) {
                                result = "<textarea   disabled  class='result'  value="
                                    + list[i].result + ">";
                            } else if (list[i].status !== 2) {

                                result = "<textarea   class='result'  value="
                                    + list[i].result + ">";
                            } else {

                                result = "<textarea   disabled  class='result'  value="
                                    + list[i].result + ">" + list[i].result + '</textarea>';
                            }

                            var ss = [time, list[i].userName,
                                list[i].feedBack, status,
                                result,
                                list[i].opratorName,
                                finishTime, ''];
                            var newLine = table.oApi
                                ._fnAddData(oSettings, ss);
                            $(oSettings.aoData[newLine].nTr)
                                .attr('data-id', list[i].id);
                            if (list[i].status === 2) {

                                $(oSettings.aoData[newLine].nTr)
                                    .find('.btn-done')
                                    .attr('disabled',
                                        'true')
                                    .addClass('disabled');
                                $(oSettings.aoData[newLine].nTr)
                                    .find(
                                        '.btn-feedback-update')
                                    .attr('disabled',
                                        'true')
                                    .addClass('disabled');
                            } else if (list[i].status === 0) {
                                $(oSettings.aoData[newLine].nTr)
                                    .find('.btn-done')
                                    .attr('disabled',
                                        'true')
                                    .addClass('disabled');
                                ;
                                $(oSettings.aoData[newLine].nTr)
                                    .find(
                                        '.btn-feedback-update')
                                    .removeAttr('disabled')
                                    .removeClass('disabled');
                                ;
                            } else {
                                $(oSettings.aoData[newLine].nTr)
                                    .find('.btn-done')
                                    .removeAttr('disabled')
                                    .removeClass('disabled');
                                ;
                                $(oSettings.aoData[newLine].nTr)
                                    .find(
                                        '.btn-feedback-update')
                                    .attr('disabled',
                                        'true')
                                    .addClass('disabled');
                                ;
                            }

                        }
                        oSettings.aiDisplay = oSettings.aiDisplayMaster
                            .slice();
                        table.fnDraw();
                        $tbody.show();
                        $("#userfeedbackpage").createPage({
                            total: maxPage,
                            page: page,
                            callback: function (page) {
                                getFeedBack(page, $('.feedback-table').find('select').val());
                            }
                        });
                    } else {
                        $tbody.hide();

                    }
                }
            })

    }

    $('.feedback-table ').on('change', 'select', function () {
        var status = $(this).val();
        getFeedBack(1, status);

    });
    //修改意见反馈
    $('.feedback-table ')
        .on(
            'click',
            '.btn-done,.btn-feedback-update',
            function (event) {
                var that = $(this);
                if ($(this).hasClass('disabled')) {
                    event.preventDefault();
                } else {
                    var feedbackid = $(this).parents('tr')
                        .attr('data-id');
                    var opratorid = id;

                    var updateInfo;
                    if ($(this).hasClass(
                        'btn-feedback-update')) {

                        var status = 1;
                        $
                            .ajax({
                                url: '/APP-admin/feedback/updatestatus?feedbackid='
                                    + feedbackid
                                    + '&opratorid='
                                    + opratorid
                                    + '&status='
                                    + status
                                    + '&result=',
                                type: 'POST',
                                dataType: 'json',
                                contentType: 'application/json',

                                success: function (data) {
                                    if (data.success) {
                                        Lobibox
                                            .notify(
                                                'success',
                                                {
                                                    'msg': '追踪成功',
                                                    sound: false,
                                                    delay: 1000
                                                });
                                        var searchstatus = $('.feedback-table select').val();
                                        var pageIndex = Number($('#userfeedbackpage .active a').text());
                                        getFeedBack(pageIndex);
                                    }

                                }
                            });

                    }
                    if ($(this).hasClass('btn-done')) {
                        var status = 2;
                        if ($.trim($(this).parents('tr')
                            .find('.result').val()) === '') {
                            Lobibox.alert('error', {
                                msg: '请先填写处理内容'
                            })
                        } else if ($(this).parents('tr')
                            .find('.result').val().length > 200) {
                            Lobibox.alert('error', {
                                msg: '处理内容长度不能超过200'
                            })

                        } else {
                            var result = encodeURI(encodeURI($(
                                this).parents('tr')
                                .find('.result').val()));
                            $
                                .ajax({
                                    url: '/APP-admin/feedback/updatestatus?feedbackid='
                                        + feedbackid
                                        + '&opratorid='
                                        + opratorid
                                        + '&status='
                                        + status
                                        + '&result='
                                        + result,
                                    type: 'POST',
                                    dataType: 'json',
                                    contentType: 'application/json',

                                    success: function (
                                        data) {
                                        if (data.success) {
                                            Lobibox
                                                .notify(
                                                    'success',
                                                    {
                                                        'msg': '完成成功',
                                                        sound: false,
                                                        delay: 1000
                                                    });
                                            var searchstatus = $('.feedback-table select').val();
                                            var pageIndex = Number($('#userfeedbackpage .active a').text());
                                            getFeedBack(pageIndex, searchstatus);
                                        }

                                    }
                                });
                        }

                    }

                }

            });

    // 检查时间
    function checkTime(contaner) {
        var startTime, endTime;

        startTime = $("#tradestartTime").val();
        endTime = $("#tradesendTime").val();
        if (startTime > endTime) {
            $(contaner).find('.checktimes').removeClass("hiddens");

        } else {
            $(contaner).find('.checktimes').addClass("hiddens");
        }
        if (endTime === '' || startTime === '') {
            $(contaner).find('.checktimes').addClass("hiddens");
        }

    }

    $('.btn-search-date').click(function () {
        var startTime, endTime;
        startTime = $("#tradestartTime").val();
        endTime = $("#tradesendTime").val();
        checkTime('#searchdateform');
        var outId = $('#strategycontent').attr('data-id');
        outModelAnalysis(outId, 0, startTime, endTime);


    })
    //查询k线
    $('.btn-search-kline').click(function () {
        var stockcodeid = $('#stockcodeid').val();
        var reg = /^\d{6}$/;
        var valid = true
        if (!stockcodeid) {
            Lobibox.alert('error', {
                msg: '股票号不能为空!'
            })
            valid = false
        } else if (!reg.test(stockcodeid)) {


            Lobibox.alert('error', {
                msg: '股票号格式不正确!'
            })
            valid = false

        }

        var ktype = $('.search-kline-details .ktypes .press>a').attr(
            'data-type');
        var restorationtype = $('.search-kline-details  .restoration-type').attr(
            'data-restoration')
        var chk_value = [];
        var efun1 = false;
        var efun2 = false;
        $('input[name="kfunc"]:checked').each(function () {
            if ($(this).val() == '1') {
                efun1 = true
            }
            if ($(this).val() == '2') {
                efun2 = true
            }
        });
        var name = $('#stockcodeid').attr('data-name');
        if (valid) {
            if ((!efun1) && efun2) {
                Lobibox.alert('error', {
                    msg: '不能单独进行画笔，需要跟k线合并连用'
                })

            } else {
                searchKline(stockcodeid, name, ktype, efun1, efun2, restorationtype);
                swithchForSearchk(stockcodeid, name, efun1, efun2);
            }
        }


    });

    $('#stockcodeid').typeahead({
        source: function (query, process) {
            var url = '/APP-admin//model/StockInfos?code=' + query + '&' + Math.random();
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var list = data.data;

                    var codes = []
                    for (var i = 0; i < list.length; i++) {
                        codes.push(list[i].stockcode + '-' + list[i].name);
                    }

                    process(codes);
                }
            })
        },
        updater: function (obj) {
            var index = obj.indexOf('-');


            $('#stockcodeid').attr('data-name', obj.substring(index));
            return obj.substring(0, index);

        }
    })

    $('#pushType').change(function () {
        var pushType = $(this).val();
        switch (pushType) {
            case '0':
                $('#pushgroup').hide();
                $('.push-user').hide();
                break;
            case '1':
                $('#pushgroup').show().siblings().hide();
                break;
            case '2':
                $('.push-user').show();
                $('#pushgroup').hide();

                break;


        }
    })


    $('#holdinTable').on('click', '.btn-bulls-show', function () {
        var modelId = $(this).parents('tr').attr('data-modelId');
        var stockcode = $(this).parents('tr').attr('data-stockcode');
        var stockname = $(this).parents('tr').attr('data-stockname');
        $('#bullsnoticemodal').modal('show');
        $('.modal-title').text('牛股提醒');
        $('#bullsnoticeform').attr('data-modelId', modelId).attr('data-stockcode', stockcode).attr('data-stockname', stockname);
        //	var content=$('.modelDisName').text()+'\n'+$(this).parents('tr').find('td:eq(2)').text()+'('+$(this).parents('tr').find('td:eq(1)').text()+')\n';
        $('#noticecontent1').text($('.modelDisName').text())
        $('#noticecontent2').text($(this).parents('tr').find('td:eq(2)').text() + '(' + $(this).parents('tr').find('td:eq(1)').text() + ')');

        $('#bullsnoticemodal').find('.error').text('');
        $('#bullsnoticemodal').find('input,textarea').val('');
        $('#savenoticebtn').addClass('btn-add-bulls');
        $('#sendconfrimbtn').addClass('btn-sendandadd-bulls');
    });

    function bullsnoticeformvalid() {
        return $('#bullsnoticeform').validate({
            rules: {
                noticetitle: {
                    required: true,
                    maxlength: 10
                },
                noticecontent: {
                    required: true,
                    maxlength: 20
                }
            },
            messages: {
                noticetitle: {
                    required: '标题不能为空',
                    maxlength: '不能超过10个字符'
                },
                noticecontent: {
                    required: '消息内容不能为空',
                    maxlength: '不能超过20个字符'
                }
            }
        });
    }

    $('#savenoticebtn').click(function () {
        var check = bullsnoticeformvalid().form();
        var title = $('#noticetitle').val();
        var content = $('#noticecontent').val();
        var contentList = content.split('\n');
        var messageContentParagraph1 = $('#noticecontent1').text();
        var messageContentParagraph2 = $('#noticecontent2').text();
        var messageContentParagraph3 = content;
        var opreator = id;


        var modelId = $('#bullsnoticeform').attr('data-modelId');
        var bullId = $('#bullsnoticeform').attr('data-id')
        var stockcode = $('#bullsnoticeform').attr('data-stockcode');
        var stockname = $('#bullsnoticeform').attr('data-stockname');
        var url = '';
        var requestType = '';
        var noticeobject;
        if (check) {

            if ($(this).hasClass('btn-add-bulls')) {
                noticeobject = {
                    "modelId": modelId,
                    "stockName": stockname,
                    "stockCode": stockcode,
                    "title": title,
                    "messageContentParagraph1": messageContentParagraph1,
                    "messageContentParagraph2": messageContentParagraph2,
                    "messageContentParagraph3": messageContentParagraph3,
                    "status": 0,
                    "operator": opreator
                }
                url = '/APP-admin/recommend/message'
                requestType = 'POST';


            } else {
                noticeobject = {
                    "id": bullId,
                    "title": title,
                    "messageContentParagraph1": messageContentParagraph1,
                    "messageContentParagraph2": messageContentParagraph2,
                    "messageContentParagraph3": messageContentParagraph3,
                    "status": 0,
                    "operator": opreator
                }

                url = '/APP-admin/recommend/message'
                requestType = 'PUT';
            }
            $.ajax({
                'url': url,
                type: requestType,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(noticeobject),
                success: function (data) {
                    if (data.success) {
                        if (requestType === 'POST') {
                            Lobibox.notify('success', {
                                msg: '推荐信息已经保存',
                                sound: false,
                                delay: 1000
                            })
                            $('#bullsnoticemodal').modal('hide');
                            getBullMsgs(1, modelId);
                            $('#bullsnoticemodal input').val('');
                        } else {
                            Lobibox.notify('success', {
                                msg: '推荐信息已经修改',
                                sound: false,
                                delay: 1000
                            })
                            $('#bullsnoticemodal').modal('hide');
                            var page = $('#bullsinfopage .active a').text();
                            getBullMsgs(page, modelId);
                            $('#bullsnoticemodal input').val('');
                        }

                    }
                }
            })


        }
    });
    $('#sendconfrimbtn').click(function () {
        var check = bullsnoticeformvalid().form();
        var title = $('#noticetitle').val();
        var content = $('#noticecontent').val();
        var contentList = content.split('\n');
        var messageContentParagraph1 = $('#noticecontent1').text();
        var messageContentParagraph2 = $('#noticecontent2').text();
        var messageContentParagraph3 = content;
        var opreator = id;
        var bullId = $('#bullsnoticeform').attr('data-id')

        var modelId = $('#bullsnoticeform').attr('data-modelId');
        var stockcode = $('#bullsnoticeform').attr('data-stockcode');
        var stockname = $('#bullsnoticeform').attr('data-stockname');
        var url = '';
        var requestType = '';
        var noticeobject;
        var that = $(this)
        if (check) {


            Lobibox.confirm({
                msg: '此信息将会推送给全部用户,确认发送吗?',
                callback: function ($this,
                                    type, ev) {
                    if (type === 'yes') {
                        if (that.hasClass('btn-sendandadd-bulls')) {
                            noticeobject = {
                                "modelId": modelId,
                                "stockName": stockname,
                                "stockCode": stockcode,
                                "title": title,
                                "messageContentParagraph1": messageContentParagraph1,
                                "messageContentParagraph2": messageContentParagraph2,
                                "messageContentParagraph3": messageContentParagraph3,
                                "status": 1,
                                "operator": opreator
                            }
                            url = '/APP-admin/recommend/message'
                            requestType = 'POST';


                        } else {
                            noticeobject = {
                                "id": bullId,
                                "title": title,
                                "messageContentParagraph1": messageContentParagraph1,
                                "messageContentParagraph2": messageContentParagraph2,
                                "messageContentParagraph3": messageContentParagraph3,
                                "status": 1,
                                "operator": opreator
                            }
                            url = '/APP-admin/recommend/message'
                            requestType = 'PUT';
                        }
                        $.ajax({
                            'url': url,
                            type: requestType,
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify(noticeobject),
                            success: function (data) {
                                if (data.success) {
                                    if (requestType === 'POST') {
                                        Lobibox.notify('success', {
                                            msg: '推荐信息已经保存并推送给用户',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#bullsnoticemodal').modal('hide');
                                        getBullMsgs(1, modelId)
                                        $('#bullsnoticemodal input').val('');
                                    } else {
                                        Lobibox.notify('success', {
                                            msg: '推荐信息已经修改并推送给用户',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#bullsnoticemodal').modal('hide');
                                        var page = $('#bullsinfopage .active a').text();
                                        getBullMsgs(page, modelId);
                                        $('#bullsnoticemodal input').val('');
                                    }
                                }
                            }
                        })

                    }
                }
            })

        }
    });

    //获取牛股列表
    function getBullMsgs(page, mid) {
        $.ajax({
            url: '/APP-admin/recommend/msgList?page=' + page + "&size=20" + '&mid=' + mid + '&' + Math.random(),
            type: 'GET',
            data: 'json',
            async: false,
            success: function (data) {
                var maxPage;
                var table = $('#bullsinfotable').dataTable();
                var oSettings = table.fnSettings();
                var $tbody = $("#bullsinfotable tbody");
                table.fnClearTable(this);
                if (data.success && data.data.list.length > 0) {
                    maxPage = Math.ceil(data.data.totalCount / 20);
                    var list = data.data.list;
                    for (var i = 0; i < list.length; i++) {
                        var lastModifyTime = toDateTime(list[i].lastModifyTime);
                        var content = list[i].messageContentParagraph1 + '策略推荐的'
                            + list[i].messageContentParagraph2 + list[i].messageContentParagraph3;
                        var contentSpan = "<span title=" + content + ">" + content.substring(0, 20) + '...' + "</span>";
                        var pushTime;
                        if (list[i].pushTime) {
                            pushTime = toDateTime(list[i].pushTime);
                        } else {
                            pushTime = '';
                        }
                        var status;
                        if (list[i].status === 0) {
                            status = '未发送'
                        } else {
                            status = '已发送'
                        }
                        var ss = [list[i].id, list[i].stockCode,
                            list[i].stockName, list[i].title,
                            contentSpan,
                            lastModifyTime,
                            status, pushTime, list[i].operatorName, ''];
                        var newLine = table.oApi._fnAddData(oSettings, ss);
                        $(oSettings.aoData[newLine].nTr).attr('data-id', list[i].id);
                        $tbody.attr('data-mid', list[i].modelId);
                        // if(list[i].status===1){
                        // 	$(oSettings.aoData[newLine].nTr).find('a').remove();
                        // }
                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    table.fnDraw();
                    $tbody.show();
                    $("#bullsinfopage").createPage({
                        total: maxPage,
                        page: page,
                        callback: function (page) {
                            getBullMsgs(page, mid);
                        }
                    });
                } else {
                    $tbody.hide();
                }
            }
        })
    }

    $('#bullsinfotable').on('click', '.btn-bulls-update,.btn-bulls-send,.btn-bulls-detail', function () {
        var bullsId = $(this).parents('tr').attr('data-id');
        if ($(this).hasClass('btn-bulls-update')) {
            $('#bullsnoticemodal').modal('show');
            $('#bullsnoticemodal').find('.error').text('');
            $('#savenoticebtn').removeClass('btn-add-bulls');
            $('#sendconfrimbtn').removeClass('btn-sendandadd-bulls');
            $('.modal-title').text('牛股提醒')
            $.ajax({
                url: '/APP-admin/recommend/message?id=' + bullsId,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.success === true) {
                        var result = data.data;
                        $('#noticetitle').val(result.title);
                        $('#noticecontent1').text(result.messageContentParagraph1);
                        $('#noticecontent2').text(result.messageContentParagraph2);
                        $('#noticecontent').val(result.messageContentParagraph3);
                        $('#bullsnoticeform').attr('data-id', result.id).attr('data-modelId', result.modelId);
                    }
                }
            })
        }
        if ($(this).hasClass('btn-bulls-send')) {
            $('#noticeconfrimmodal').modal('show');

            $('.modal-title').text("确认提示");
            $.ajax({
                url: '/APP-admin/recommend/message?id=' + bullsId,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.success === true) {
                        var result = data.data;
                        var noticesendcontent = $('.noticesendcontent');
                        noticesendcontent.attr('data-id', result.id).attr('data-modelId', result.modelId);
                        noticesendcontent.find('span,p').remove();
                        var $spanTitle = $('<p>').addClass('notice-title').text(result.title).appendTo(noticesendcontent);
                        var $spanmsg = $('<p>').addClass('notice-msg').appendTo(noticesendcontent);
                        var $p1 = $('<span>').addClass('notice-msg1').text(result.messageContentParagraph1).appendTo($spanmsg);
                        var $p2 = $('<span>').text('策略推荐的').appendTo($spanmsg);

                        var $spanmsg2 = $('<p>').addClass('notice-msg2').text(result.messageContentParagraph2).appendTo(noticesendcontent);
                        var $spanmsg3 = $('<p>').addClass('notice-msg3').text(result.messageContentParagraph3).appendTo(noticesendcontent);
                    }
                }
            })
        }
        if ($(this).hasClass('btn-bulls-detail')) {
            var modelId = $(this).parents('tbody').data('mid');
            var stockCode = $(this).parents('tr').find('td:nth-child(2)').text();
            var time = $(this).parents('tr').find('td:nth-child(8)').text();
            $.ajax({
                url: '/APP-admin/recommend/queryByStockCode?modelId=' + modelId + '&stockCode=' + stockCode + '&time=' + time,
                type: 'GET',
                dataType: 'json',
                success: function (resp) {
                    if (resp.success) {
                        var data = resp.data;
                        $('#bulls-detail-title').html(data.title);
                        $('#bulls-detail-content1').html(data.messageContentParagraph1);
                        $('#bulls-detail-content2').html(data.messageContentParagraph2);
                        $('#bulls-detail-content3').html(data.messageContentParagraph3);
                    }
                }
            })
            $('#bulls-detail-modal').modal();
        }
    });
    $('#confrimSendBulls').click(function () {
        var bullId = $('.noticesendcontent').attr('data-id');
        var modelId = $('.noticesendcontent').attr('data-modelId');
        var title = $('.notice-title').text();
        var messageContentParagraph1 = $('.notice-msg1').text();
        var messageContentParagraph2 = $('.notice-msg2').text();
        var messageContentParagraph3 = $('.notice-msg3').text();
        var operator = id;
        var noticeobject = {
            "id": bullId,
            "title": title,
            "messageContentParagraph1": messageContentParagraph1,
            "messageContentParagraph2": messageContentParagraph2,
            "messageContentParagraph3": messageContentParagraph3,
            "status": 1,
            "operator": operator
        }

        Lobibox.confirm({
            msg: '此信息将会推送给全部用户,确认发送吗?',
            callback: function ($this,
                                type, ev) {
                if (type === 'yes') {

                    var url = '/APP-admin/recommend/message'
                    var requestType = 'PUT';
                    $.ajax({
                        'url': url,
                        type: requestType,
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(noticeobject),
                        success: function (data) {
                            if (data.success) {

                                Lobibox.notify('success', {
                                    msg: '推荐信息已经修改并推送给用户',
                                    sound: false,
                                    delay: 1000
                                })
                                $('#noticeconfrimmodal').modal('hide');
                                var page = $('#bullsinfopage .active a').text();
                                getBullMsgs(page, modelId);
                                $('#bullsnoticemodal input').val('');

                            }
                        }
                    })
                }
            }
        })

    });

    //获取今日注册统计数据
    function getstatisticsRealTime() {
        $.ajax({
            url: "/APP-admin/user/statisticsRealTime",
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var result = data.data;
                $('#sumregister').text(result.totalCount);
                $('#addtoday').text(result.increaseCount);
            }


        })
    }

    $('#btnexportbook').click(function () {
        var check = true;
        var dates = $('#searchDate1').val();
        if (dates !== '' && Number(dates) <= 0) {
            check = false;
            Lobibox.alert('error', {
                msg: '请输入大于0的数'
            })
        }

        var url = '/APP-admin/model/statisticsHistory/export';
        if (dates) {
            var date = toDate(new Date().getTime() - (dates - 1) * 1000 * 60 * 60 * 24);
            url = url + '?from=' + date;
        }
        if (check) {
            if ($('#downloadexcel2').length <= 0)
                $('body').append("<iframe id=\"downloadexcel2\" style=\"display:none\"></iframe>");
            $('#downloadexcel2').attr('src', url);

        }

    })

    function getstatisticsHistory(dates) {
        var url = '/APP-admin/user/statisticsHistory';

        if (dates) {
            url = url + '?days=' + dates;
        }
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var list = data.data;
                var table = $('#userregisterTable').dataTable();
                var oSettings = table.fnSettings();
                table.fnClearTable(this);
                if (data.success && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var ss = [i + 1, list[i].date, list[i].totalCount, list[i].increaseCount];
                        table.oApi._fnAddData(oSettings, ss);
                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    table.fnDraw();
                }
            }
        })
    }

    //注册统计图
    function statisticsHistoryLine(type) {
        var mychart = echarts.init(document
            .getElementById('userregisterlinetainer'));
        mychart.resize(800, 300)
        $.ajax({
            url: '/APP-admin/user/statisticsHistory?' + Math.random(),
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                mychart.showLoading({
                    text: 'loading',
                    color: '#c23531',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.8)',
                    zlevel: 0
                });
            },
            success: function (data) {
                var list = data.data;
                var dates = [];
                var totalCounts = [];
                var increaseCounts = [];
                mychart.hideLoading();


                if (data.success && list.length > 0) {
                    $('#userregisterlinetainer').show();
                    for (var i = 0; i < list.length; i++) {


                        dates.push(list[i].date);
                        totalCounts.push(list[i].totalCount)
                        increaseCounts.push(list[i].increaseCount);
                    }
                    var option = {
                        title: {
                            text: '用户注册趋势'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            x: 'right',
                            data: ['注册总数', '今日新增'],
                            selectedMode: false,
                            selected: {
                                '注册总数': true,
                                '今日新增': true
                            }

                        },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: dates,
                            position: 'bottom',
                            name: '日期'

                        }],
                        yAxis: [{
                            type: 'value',
                            name: '人数'

                        }],
                        series: [
                            {
                                name: '注册总数',
                                type: 'line',
                                data: totalCounts
                            },
                            {
                                name: '今日新增',
                                type: 'line',
                                data: increaseCounts
                            }
                        ]


                    }
                    if (type === '2') {
                        option.legend.selected = {
                            '注册总数': true,
                            '今日新增': true
                        }
                    }
                    if (type === '1') {
                        option.legend.selected = {
                            '注册总数': false,
                            '今日新增': true
                        }
                    }
                    if (type === '0') {
                        option.legend.selected = {
                            '注册总数': true,
                            '今日新增': false
                        }
                    }

                    mychart.setOption(option);
                }

            }
        })

    }

    function modelHistoryLine(type, timeSelect) {
        var mychart2 = echarts.init(document
            .getElementById('stagetybookiner'));
        mychart2.resize(800, 300);
        var url = '/APP-admin/model/statisticsHistory?' + Math.random();
        var index = Number(type)
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                mychart2.showLoading({
                    text: 'loading',
                    color: '#c23531',
                    zlevel: 0
                });
            },
            success: function (data) {
                mychart2.hideLoading();
                var moldelName = $('#stagetybookCurrentTable tbody').find('tr:eq(' + index + ')').find('td:eq(0)').text();
                var result = data.data;
                var list = result[moldelName];
                var dates = [];
                var date;
                var totalCounts = [];
                var increaseCounts = [];
                if (data.success && list.length > 0) {
                    var startDate = list[0].time;
                    startMDate = list[list.length - 1].time
                        - 3 * 30 * 24 * 60 * 60 * 1000;
                    startYDate = list[list.length - 1].time
                        - 365 * 24 * 60 * 60 * 1000;
                    if (startDate <= startMDate) {
                        $("#booktimeselect").find(
                            '.list-3').removeClass(
                            "disabled");

                    } else {
                        $("#booktimeselect").find.find(
                            '.list-3').addClass(
                            'disabled');
                    }
                    if (startDate <= startYDate) {
                        $("#booktimeselect").find(
                            '.list-12').removeClass(
                            'disabled');

                    } else {
                        $("#booktimeselect").find(
                            '.list-12').addClass(
                            'disabled');
                    }
                    for (var i = 0; i < list.length; i++) {
                        if (timeSelect === '近3个月') {
                            if (list[i].time >= startMDate) {
                                dates.push(toDate(list[i].time));
                                totalCounts.push(list[i].totalCount)
                                increaseCounts.push(list[i].increaseCount);
                            }
                        } else if (timeSelect === '最近一年') {
                            if (list[i].time >= startYDate) {
                                dates.push(toDate(list[i].time));
                                totalCounts.push(list[i].totalCount)
                                increaseCounts.push(list[i].increaseCount);
                            }
                        } else {
                            dates.push(toDate(list[i].time));
                            totalCounts.push(list[i].totalCount)
                            increaseCounts.push(list[i].increaseCount);
                        }


                    }
                    var option = {
                        title: {
                            text: moldelName + '订阅趋势'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            x: 'right',
                            data: ['注册总数', '今日新增'],
                            selectedMode: false,
                            selected: {
                                '注册总数': true,
                                '今日新增': true
                            }

                        },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: dates,
                            position: 'bottom',
                            name: '日期'

                        }],
                        yAxis: [{
                            type: 'value',
                            name: '订阅人数'

                        }],
                        series: [
                            {
                                name: '注册总数',
                                type: 'line',
                                data: totalCounts
                            },
                            {
                                name: '今日新增',
                                type: 'line',
                                data: increaseCounts
                            }
                        ]


                    }


                    mychart2.setOption(option);
                }

            }

        })
    }

    function getmodelHistory(dates) {
        var url = '/APP-admin/model/statisticsHistory';
        if (dates) {
            var date = toDate(new Date().getTime() - (dates - 1) * 1000 * 60 * 60 * 24);
            url = url + '?from=' + date;
        }

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var result = data.data;
                var stagetyBooks = [];
                var totalbooksIncre = 0;
                var totalbooksToyal = 0;


                $('#stagetybookCurrentTable tbody tr').each(function () {
                    stagetyBooks.push(result[$(this).find('td:eq(0)').text()]);
                })
                var table = $('#stagetyBookTable')
                    .dataTable();
                var oSettings = table.fnSettings();
                table.fnClearTable(this);

                for (var i = 0; i < stagetyBooks[0].length; i++) {
                    var time = toDate(stagetyBooks[0][i].time)
                    var ss = [];
                    ss.push(i + 1);
                    ss.push(time);
                    for (var j = 0; j < stagetyBooks.length; j++) {
                        ss.push(stagetyBooks[j][i].increaseCount + '/' + stagetyBooks[j][i].totalCount);
                        totalbooksIncre = totalbooksIncre + stagetyBooks[j][i].increaseCount;
                        totalbooksToyal = totalbooksToyal + stagetyBooks[j][i].totalCount
                    }
                    ss.push(totalbooksIncre + '/' + totalbooksToyal);
                    table.oApi
                        ._fnAddData(oSettings, ss)
                    totalbooksIncre = 0;
                    totalbooksToyal = 0;


                }
                oSettings.aiDisplay = oSettings.aiDisplayMaster
                    .slice();
                table.fnDraw();

            }
        })
    }

    // function invitationstatistics(){
    // 	$.ajax({
    // 		url:'/APP-admin/invitation/statistics',
    // 		type:'GET',
    // 		dataType:'json',
    // 		success:function(data){
    // 			var result=data.data;
    // 			$('#distributenum').text(result.totalCount);
    // 			$('#usedcode').text(result.usedCount);
    // 		}

    // 	})
    // }
    $('#btnsearchorder').click(function () {
        var params = {
            userName: $('#bbokusername').val(),
            orderId: $('#bookid').val(),
            state: $('#bookstatus').val(),
            subPriceType: $('#booktype').val(),
            minCashAmount: $('#bookcashamountfrom').val(),
            maxCashAmount: $('#bookcashamountto').val(),
            operatorName: $("#bookoperation").val()
        }
        getBookTable(0, params);
    });
    $('#booktable').on('click', '.btn-fix-order', function () {
        var orderId = $(this).attr('data-order');
        var managerName = $.cookie("alphaguUserName");
        Lobibox.confirm({
            msg: "您将为订单 '" + orderId + "'补单,确定执行此操作?",
            callback: function ($this, type, ev) {
                if (type === 'yes') {
                    url = '/APP-admin/order/fixOrder?orderId=' + orderId + '&operator=' + managerName;
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            if (data.success) {
                                Lobibox.notify('success', {
                                    msg: '补单成功',
                                    sound: false,
                                    delay: 1000
                                })
                                var page = Number($('#bookpages .active a').text());

                                var params = {
                                    userName: $('#bbokusername').val(),
                                    orderId: $('#bookid').val(),
                                    state: $('#bookstatus').val(),
                                    subPriceType: $('#booktype').val(),
                                    minCashAmount: $('#bookcashamountfrom').val(),
                                    maxCashAmount: $('#bookcashamountto').val(),
                                    operatorName: $("#bookoperation").val()
                                }
                                getBookTable(page - 1, params);
                            }
                        }
                    })
                }
            }

        })


    })

    function getBookTable(page, params) {
        var stateMap = {
            "1": "成功",
            "0": "失败"
        };
        var ten = {
            page: page ? page : 0,
            size: 10
        };
        var params = params ? params : ten;
        Object.assign(params,{page: page ? page : 0},{size: 10});
        $.ajax({
            url: '/APP-admin/order/findOrder',
            contentType : "application/json;charset=UTF-8",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(params),
            success: function (data) {
                var list = data.data.list;
                var totalCount = data.data.totalCount;
                var total = Math.ceil(totalCount / 10);
                var $tbody = $('#booktable tbody');
                $tbody.find('tr').remove();
                if (data.success && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var $tr = $('<tr>').appendTo($tbody);
                        $('<td>').text(i).appendTo($tr);
                        $('<td>').text(list[i].orderId).appendTo($tr);
                        $('<td>').text(list[i].userName).appendTo($tr);
                        $('<td>').text(list[i].modelDisplyName).appendTo($tr);
                        $('<td>').text(list[i].actualPayAmount).appendTo($tr);
                        $('<td>').text(list[i].qty).appendTo($tr);
                        $('<td>').text(list[i].payAcount).appendTo($tr);
                        $('<td>').text(list[i].cashamount).appendTo($tr);
                        $('<td>').text(toDateTime(list[i].orderTime)).appendTo($tr);
                        $('<td>').text(stateMap[list[i].state]).appendTo($tr);
                        $('<td>').text(list[i].operatorName).appendTo($tr);
                        var $tdOperation = $('<td>').appendTo($tr)
                        if (list[i].state === 0) {
                            $('<button>').attr('data-order', list[i].orderId).addClass('btn btn-success btn-fix-order').text('补单').appendTo($tdOperation)
                        }

                    }
                    $('#bookpages').createPage({
                        total: total,
                        page: page + 1,
                        callback: function (page) {
                            getBookTable(page - 1, params)
                        }
                    })
                }

            }
        })


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

    //文章发布富文本
    function summerNote() {

        $('.summer-note').summernote({
            height: "500px",
            lang: 'zh-CN',
            callbacks: {
                onImageUpload: function (files, editor, $editable) {
                    var img = sendFile(files[0], this, $editable)
                }
            }

        })

    }

    function sendFile(file, that, $editable) {
        var data = new FormData();


        var reader = new FileReader();
        reader.readAsDataURL(file);
        $.ajaxSettings.async = true;


        reader.onload = function (e) {
            var picture = this.result;
            var pictureindex = picture.indexOf(',');
            picture = picture.substring(pictureindex + 1);
//				    console.log(picture);
            var img = new Image,
                width = 95,    //图片resize宽度
                quality = 1.0,  //图像质量
                canvas = document.createElement("canvas"),
                drawer = canvas.getContext("2d");
            img.src = this.result;
//		            canvas.width = width;
//		            canvas.height = width * (img.height / img.width);
//		            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
//		            img.src = canvas.toDataURL();

            var parameter = {name: file.name, picture: picture}
            $.ajax({

                type: "POST",
                //url: "/APP-admin/upload/pic",
                url: imageServer + "/upload/pic",
                cache: false,
                data: parameter,
                async: true,
                success: function (url) {
                    $(that).summernote('insertImage', url.data); // the insertImage API
                }
            });
        }

    }

    //投资类型切换
    $('.styletype').click(function () {
        var styleType = $(this).val();

        if (styleType === '3') {
            $('.assets-config').hide();
            $('.recomment-config').show();

        } else {
            $('.assets-config').show();
            $('.recomment-config').hide();
        }
    })
    //策略新增修改
    // function publishAddOrUpdateOrOn(mid) {
    // $('#btn-publish-save').unbind('click');
    $('#btn-publish-save').click(function () {
        var check = validstagetypublishform().form();
        var stragetyname = $('#stragetyname').val();
        var appname = $('#appname').val();
        //checkName(stragetyname, appname);
        var nameCheck = $('.check-value').text();
        if (check) {
            var stragetyname = $('#stragetyname').val();
            var appname = $('#appname').val();
            var des = $('#des').val();
            var sharetext = $('#sharetext').val();
            var stragyType = Number($('.styletype:checked').val());
            var strategyIndexId = Number($('.circletype:checked').val());

            var pushtype = Number($('.pushtype:checked').val());

            var str = $('#publishtime').val().replace(/-/g, "/");
            var publishtime = new Date(str + ' 00:00:00');
            var testannualrate = Number($('#testannualrate').val());
            var alphatvalue = Number($('#alphatvalue').val());
            var xiapurate = Number($('#xiapurate').val());
            var recommendOrder = Number($('#recommendOrder').val());
            var submaxnum = Number($('#submaxnum').val());
            var bookprice = Number($('#bookprice').val());
            var discountPrice = Number($('#discountPrice').val());
            var discount = $('input[name="discount"]:checked').val();

            var maxpostionemptydates = Number($('#maxpostionemptydates').val());
            var positionemptyinfo = $('#positionemptyinfo').val();
            var biggestAssetRetreatRatio = Number($("#biggestAssetRetreatRatio").val());
            var referenceTypeId = $('.referenceType').val();
            var priceType = $('.priceType').val();
            var recc = $('.recommnttype:checked');
            var recommnttype = $('.recommnttype:checked').val();
            var templateId;
            if ($('.strategy-templist').find('input:checked').length !== 0) {
                templateId = $('.strategy-templist').find('input:checked').data('id');
            } else {
                templateId = null;
            }
            var pushMessage = $('#strategy-pushmsg').val();
            if (stragyType === 3) {
                strategyIndexId = null;
                pushtype = null;
                referenceTypeId = null;
            } else {
                recommnttype = null;
            }
            // 添加
            if (nameCheck === 'true') {
                var stragety = {
                    "name": stragetyname,
                    "displayName": appname,
                    "introduction": des,
                    "sharingContent": sharetext,
                    "strategyTypeId": stragyType,
                    "strategyIndexId": strategyIndexId,
                    "annualizedReturnRate": testannualrate,
                    "alphaRatio": alphatvalue,
                    "biggestAssetRetreatRatio": biggestAssetRetreatRatio,
                    "sharpRatio": xiapurate,
                    "recommendOrder": recommendOrder,
                    "maxSubcribeVolume": submaxnum,
                    "price": bookprice,
                    'discountPrice': discountPrice,
                    'discount': discount,
                    "onlineTime": publishtime,
                    "status": 0,
                    "pushType": pushtype,
                    "maxEmptyPositionDays": maxpostionemptydates,
                    "emptyPositionNotice": positionemptyinfo,
                    "creater": parseInt(id),
                    'referenceIndicesId': referenceTypeId,
                    'priceType': priceType,
                    'showReturnScope': recommnttype,
                    'templateId': templateId,
                    'pushMessage': pushMessage
                }
                $.ajax({
                    url: '/APP-admin/model/add?requirePush=0',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(stragety),
                    success: function (data) {
                        if (data.success) {
                            Lobibox.notify('success', {
                                'msg': '添加策略成功',
                                sound: false,
                                delay: 1000
                            })
                            $('#publihModal').modal('hide');
                            getModelList();
                        } else {
                            Lobibox.notify('error', {
                                'msg': data.msg,
                                sound: false,
                                delay: 1000
                            })
                        }
                    }
                })
            }
        }
    });
    // $('#btn-publish-saveandpush').unbind('click');
    $('#btn-publish-saveandpush').click(function (event) {
        var check = validstagetypublishform().form();
        if (check) {
            var stragetyname = $('#stragetyname').val();
            var appname = $('#appname').val();
            var des = $('#des').val();
            var sharetext = $('#sharetext').val();
            var stragyType = Number($('.styletype:checked').val());
            var strategyIndexId = Number($('.circletype:checked').val());
            var pushtype = Number($('.pushtype:checked').val());
            var str = $('#publishtime').val().replace(/-/g, "/");
            var publishtime = new Date(str + ' 00:00:00');
            var testannualrate = Number($('#testannualrate').val());
            var alphatvalue = Number($('#alphatvalue').val());
            var xiapurate = Number($('#xiapurate').val());
            var recommendOrder = Number($('#recommendOrder').val());
            var submaxnum = Number($('#submaxnum').val());
            var bookprice = Number($('#bookprice').val());
            var discountPrice = Number($('#discountPrice').val());
            var discount = $('input[name="discount"]:checked').val();
            var maxpostionemptydates = Number($('#maxpostionemptydates').val());
            var positionemptyinfo = $('#positionemptyinfo').val();
            var biggestAssetRetreatRatio = Number($("#biggestAssetRetreatRatio").val());
            //checkName(stragetyname, appname);
            var nameCheck = $('.check-value').text();
            var referenceTypeId = $('.referenceType').val();
            var priceType = $('.priceType').val();
            var recc = $('.recommnttype:checked');
            var recommnttype = $('.recommnttype:checked').val();
            var templateId;
            if ($('.strategy-templist').find('input:checked').length !== 0) {
                templateId = $('.strategy-templist').find('input:checked').data('id');
            } else {
                templateId = null;
            }
            var pushMessage = $('#strategy-pushmsg').val();
            if (stragyType === 3) {
                strategyIndexId = null;
                pushtype = null;
                referenceTypeId = null
            } else {
                recommnttype = null;
            }
            if (nameCheck === 'true') {
                var stragety = {
                    "name": stragetyname,
                    "displayName": appname,
                    "introduction": des,
                    "sharingContent": sharetext,
                    "strategyTypeId": stragyType,
                    "strategyIndexId": strategyIndexId,
                    "annualizedReturnRate": testannualrate,
                    "alphaRatio": alphatvalue,
                    "biggestAssetRetreatRatio": biggestAssetRetreatRatio,
                    "sharpRatio": xiapurate,
                    "recommendOrder": recommendOrder,
                    "maxSubcribeVolume": submaxnum,
                    "price": bookprice,
                    'discountPrice': discountPrice,
                    'discount': discount,
                    "onlineTime": publishtime,
                    "status": 1,
                    "pushType": pushtype,
                    "maxEmptyPositionDays": maxpostionemptydates,
                    "emptyPositionNotice": positionemptyinfo,
                    'referenceIndicesId': referenceTypeId,
                    'priceType': priceType,
                    "creater": parseInt(id),
                    'showReturnScope': recommnttype,
                    'templateId': templateId,
                    'pushMessage': pushMessage
                }
                Lobibox.confirm({
                    msg: '是否将上架信息推送给客户',
                    buttons: {
                        yes: {
                            class: 'btn btn-primary',
                            text: '上架并推送'
                        },
                        no: {
                            class: 'btn btn-default',
                            text: '仅上架不推送'
                        }
                    },
                    callback: function ($this, type, ev) {
                        if (type === 'yes') {
                            $.ajax({
                                url: '/APP-admin/model/add?requirePush=1',
                                type: 'POST',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(stragety),
                                success: function (data) {
                                    if (data.success) {
                                        Lobibox.notify('success', {
                                            'msg': '添加策略成功，并已推送给客户',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#publihModal').modal('hide');
                                        getModelList();
                                    } else {
                                        Lobibox.notify('error', {
                                            'msg': data.msg,
                                            sound: false,
                                            delay: 1000
                                        })
                                    }
                                }
                            })
                        }
                        if (type === 'no') {
                            $.ajax({
                                url: '/APP-admin//model/add?requirePush=0',
                                type: 'POST',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(stragety),
                                success: function (data) {
                                    if (data.success) {
                                        Lobibox.notify('success', {
                                            'msg': '添加策略成功',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#publihModal').modal('hide');
                                        getModelList();
                                    } else {
                                        Lobibox.notify('error', {
                                            'msg': data.msg,
                                            sound: false,
                                            delay: 1000
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    });
    $('#btn-publish-update').click(function () {
        var check = validstagetypublishform().form();
        var stragetyname = $('#stragetyname').val();
        var appname = $('#appname').val();
        //checkName(stragetyname, appname);
        var nameCheck = $('.check-value').text();
        if (check) {
            var stragetyname = $('#stragetyname').val();
            var appname = $('#appname').val();
            var des = $('#des').val();
            var sharetext = $('#sharetext').val();
            var stragyType = Number($('.styletype:checked').val());
            var strategyIndexId = Number($('.circletype:checked').val());

            var pushtype = Number($('.pushtype:checked').val());

            var str = $('#publishtime').val().replace(/-/g, "/");
            var publishtime = new Date(str + ' 00:00:00');
            var testannualrate = Number($('#testannualrate').val());
            var alphatvalue = Number($('#alphatvalue').val());
            var xiapurate = Number($('#xiapurate').val());
            var recommendOrder = Number($('#recommendOrder').val());
            var submaxnum = Number($('#submaxnum').val());
            var bookprice = Number($('#bookprice').val());
            var discountPrice = Number($('#discountPrice').val());
            var discount = $('input[name="discount"]:checked').val();

            var maxpostionemptydates = Number($('#maxpostionemptydates').val());
            var positionemptyinfo = $('#positionemptyinfo').val();
            var biggestAssetRetreatRatio = Number($("#biggestAssetRetreatRatio").val());
            var referenceTypeId = $('.referenceType').val();
            var priceType = $('.priceType').val();
            var recc = $('.recommnttype:checked');
            var recommnttype = $('.recommnttype:checked').val();
            var status = $(this).attr('data-status') !== '1' ? 0 : 1;
            var mid = $(this).attr('data-id');
            var templateId;
            if ($('.strategy-templist').find('input:checked').length !== 0) {
                templateId = $('.strategy-templist').find('input:checked').data('id');
            } else {
                templateId = null;
            }
            var pushMessage = $('#strategy-pushmsg').val();
            if (stragyType === 3) {
                strategyIndexId = null;
                pushtype = null;
                referenceTypeId = null;
            } else {
                recommnttype = null;
            }
            var stragety = {
                'id': parseInt(mid),
                "name": stragetyname,
                "displayName": appname,
                "introduction": des,
                "sharingContent": sharetext,
                "strategyTypeId": stragyType,
                "strategyIndexId": strategyIndexId,
                "annualizedReturnRate": testannualrate,
                "alphaRatio": alphatvalue,
                "biggestAssetRetreatRatio": biggestAssetRetreatRatio,
                "sharpRatio": xiapurate,
                "recommendOrder": recommendOrder,
                "maxSubcribeVolume": submaxnum,
                "price": bookprice,
                'discountPrice': discountPrice,
                'discount': discount,
                "onlineTime": publishtime,
                "status": status,
                "pushType": pushtype,
                "maxEmptyPositionDays": maxpostionemptydates,
                "emptyPositionNotice": positionemptyinfo,
                'referenceIndicesId': referenceTypeId,
                'priceType': priceType,
                'showReturnScope': recommnttype,
                'templateId': templateId,
                'pushMessage': pushMessage
            }
            if (status === 1) {
                Lobibox.confirm({
                    msg: '是否将更新信息推送给客户',
                    buttons: {
                        yes: {
                            class: 'btn btn-primary',
                            text: '更新并推送'
                        },
                        no: {
                            class: 'btn btn-default',
                            text: '仅更新不推送'
                        }
                    },
                    callback: function ($this, type, ev) {
                        if (type === 'yes') {
                            $.ajax({
                                url: '/APP-admin/model/update?requirePush=1',
                                type: 'PUT',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(stragety),
                                success: function (data) {
                                    if (data.success) {
                                        Lobibox.notify('success', {
                                            'msg': '更新策略成功,并成功推送',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#publihModal').modal('hide');
                                        getModelList();
                                    } else {
                                        Lobibox.notify('error', {
                                            'msg': data.msg,
                                            sound: false,
                                            delay: 1000
                                        })
                                    }
                                }
                            })
                        }
                        if (type === 'no') {
                            $.ajax({
                                url: '/APP-admin/model/update?requirePush=0',
                                type: 'PUT',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(stragety),
                                success: function (data) {
                                    if (data.success) {
                                        Lobibox.notify('success', {
                                            'msg': '更新策略成功',
                                            sound: false,
                                            delay: 1000
                                        })
                                        $('#publihModal').modal('hide');
                                        getModelList();
                                    } else {
                                        Lobibox.notify('error', {
                                            'msg': data.msg,
                                            sound: false,
                                            delay: 1000
                                        })
                                    }
                                }
                            })
                        }
                    }
                });
            } else {
                $.ajax({
                    url: '/APP-admin/model/update?requirePush=0',
                    type: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(stragety),
                    success: function (data) {
                        if (data.success) {
                            Lobibox.notify('success', {
                                'msg': '更新策略成功',
                                sound: false,
                                delay: 1000
                            })
                            $('#publihModal').modal('hide');
                            getModelList();
                        } else {
                            Lobibox.notify('error', {
                                'msg': data.msg,
                                sound: false,
                                delay: 1000
                            })
                        }
                    }
                })
            }
        }
    });
    // }

    //短信余额加载
    function smsBalance() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/sms/status',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    if (data.status == 'Sucess') {
                        $('.sms-balance').html(data.overage);
                    } else {
                        $('.sms-balance').html(0);
                    }
                }
            }
        });
    }

    //****获取用户注册登录概况*////
    function getUserLoginSummary() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/analyse/data/login/summary',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    $('.register-login-summary').find('.summary-total').html(resp.data.total);
                    $('.register-login-summary').find('.summary-add-register').html(resp.data.register);
                    $('.register-login-summary').find('.summary-add-login').html(resp.data.login);
                }
            }
        });
    }

    //****获取用户签到概况*////
    function getUserSiginSummary() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/analyse/data/signin/summary',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    $('.sign-analysis-summary').find('span').html(resp.data.todayCount);
                }
            }
        });
    }

    //****获取策略订阅概况*////
    function getTacticsSubscribeSummary() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/analyse/data/subscribe/summary',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    var li_html = "";
                    var list = resp.data;
                    var num = 1;
                    for (var i = 0; i < list.length; i++) {
                        li_html += '<tr>'
                            + '<td >' + (num++) + '</td>'
                            + '<td>' + list[i].modelName + '</td>'
                            + '<td>' + list[i].today + '</td>'
                            + '<td>' + list[i].total + '</td>'
                            + '<td>' + list[i].effectiveTotal + '</td>'
                            + '</tr>';
                    }
                    $(".tactics-subscribe-num-body").html(li_html);
                }
            }
        });
    }

    //****获取邀请码概况*////
    function getInviteCodeSummary() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/analyse/data/inviteCode/summary',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    $('.codedata-summary').find('.codedata-summary-total').html(resp.data.accumulateCount);
                    $('.codedata-summary').find('.codedata-summary-today').html(resp.data.todayRaise);
                }
            }
        });
    }

    //用户注册登录分析模块
    function unixToDate(unixTime, isFull, timeZone) {
        if (typeof (timeZone) === 'number') {
            unixTime = parseInt(unixTime, 10) + parseInt(timeZone, 10) * 60 * 60;
        }
        var time = new Date(unixTime);
        var ymdhis = '';
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        ymdhis += year + '-' + month + '-' + date;
        if (isFull === true) {
            ymdhis += ' ' + hours + ':' + minutes + ':' + seconds;
        }
        return ymdhis;
    }

    function registerCheckTime() {
        var startTime = $("#register-start-time").val();
        var endTime = $("#register-end-time").val();
        if (startTime > endTime) {
            $('.register-checktime').removeClass('hiddens');
        } else {
            $('.register-checktime').addClass('hiddens');
        }
        if (startTime === '' || endTime === '') {
            $(".register-checktime").addClass("hiddens");
        }
    }

    //加载注册登录表格
    function registerLoginList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            var createTime = unixToDate(list[i].createTime);
            var lastLoginTime = list[i].lastLoginTime !== null ? unixToDate(list[i].lastLoginTime) : '';
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].userName + '</td>'
                + '<td>' + (list[i].role === 1 ? '代理用户' : '普通用户') + '</td>'
                + '<td>' + createTime + '</td>'
                + '<td>' + lastLoginTime + '</td>'
                + '<td>' + list[i].weekCount + '</td>'
                + '<td>' + list[i].monthCount + '</td>'
                + '<td>' + list[i].seasonCount + '</td>'
                + '<td>' + list[i].agentedPeople + '</td>'
                + '<td>';
            if (list[i].role != 1) {
                li_html += '<button class="btn btn-info btn-sm btn-subagent" data-id="' + list[i].userId + '" data-name="' + list[i].userName + '">转代理</button>'
                    + '</td></tr>';
            } else {
                li_html += '</td></tr>';
            }
        }
        $(".register-login-body").html(li_html);
    }

    function addRegisterLoginList(page, size, sortField, sortDirection, userName, lastLoginTime, startTime, endTime, type, compare, count, agentedPeople, role) {
        var data = {
            'userName': userName !== '' ? userName : null,
            'lastLoginTime': lastLoginTime !== '' ? lastLoginTime : null,
            'startTime': startTime !== '' ? startTime : null,
            'endTime': endTime !== '' ? endTime : null,
            'type': type !== '' ? type : null,
            'compare': compare !== '' ? compare : null,
            'count': count !== '' ? count : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'role': role !== '' ? role : null,
            'agentedPeople': agentedPeople !== '' ? agentedPeople : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/analyse/data/login',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            data: JSON.stringify(data),
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    registerLoginList(resp.data.list, page, size);
                    registerLoginCount = resp.data.totalCounts;
                    $('#register-login-totalCounts').find('span').html(registerLoginCount);
                    var total = (registerLoginCount / $('#register-login-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#register-login-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".register-login-body").empty();
                            addRegisterLoginList(page, size, sortField, sortDirection, userName, lastLoginTime, startTime, endTime, type, compare, count, agentedPeople, role)
                        }
                    });
                }
            }
        });
    }

    $(".register-login-body").on('click', '.btn-subagent', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        $('#subagent-id').val(id);
        $('#subagent-name').html(name);
        $('#subagent-modal').modal();
    })
    $(".btn-subagent-sure").click(function () {
        var id = $('#subagent-id').val();
        $.ajax({
            type: "GET",
            url: '/APP-admin/agent/userTransAgent?userId=' + id,
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    $('#register-login-searchbtn').trigger('click');
                    $('#subagent-modal').modal('hide');
                    Lobibox.notify('success', {
                        msg: '转代理操作成功',
                        sound: false,
                        delay: 1000
                    });
                }
            }
        });
    })
    $('#register-login-searchbtn').click(function () {
        registerCheckTime();
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var userName = $('#register-login-user').val(),
            lastLoginTime = $('#last-login-time').val() !== '' ? (new Date().getTime() - Number($('#last-login-time').val()) * 24 * 60 * 60 * 1000) : '',
            startTime = $('#register-start-time').val(),
            endTime = $('#register-end-time').val(),
            type = $('#lately-login').val(),
            compare = $('#login-compare').val(),
            count = $('#login-count').val(),
            role = $('#register-login-role').val(),
            agentedPeople = $('#register-login-agentedPeople').val(),
            page = 1,
            size = Number($('#register-login-size').val());
        addRegisterLoginList(page, size, sortField, sortDirection, userName, lastLoginTime, startTime, endTime, type, compare, count, agentedPeople, role);
    });
    $('#register-login-size').change(function () {
        $('#register-login-searchbtn').trigger('click');
    });
    $('#btn-register-login-export').click(function () {
        var data;
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        if ($('#register-login-page').val() === '0') {
            data = {
                'userName': $('#register-login-user').val(),
                'lastLoginTime': $('#last-login-time').val() !== '' ? unixToDate(new Date().getTime() - Number($('#last-login-time').val()) * 24 * 60 * 60 * 1000) : '',
                'startTime': $('#register-start-time').val(),
                'endTime': $('#register-end-time').val(),
                'type': $('#lately-login').val(),
                'compare': $('#login-compare').val(),
                'count': $('#login-count').val(),
                'role': $('#register-login-role').val(),
                'agentedPeople': $('#register-login-agentedPeople').val(),
                'page': isNaN(Number($('#register-login-pages ul li.active a').html())) ? 0 : Number($('#register-login-pages ul li.active a').html()),
                'size': Number($('#register-login-size').val())
            };
        } else {
            data = {
                'userName': $('#register-login-user').val(),
                'lastLoginTime': $('#last-login-time').val() !== '' ? unixToDate(new Date().getTime() - Number($('#last-login-time').val()) * 24 * 60 * 60 * 1000) : '',
                'startTime': $('#register-start-time').val(),
                'endTime': $('#register-end-time').val(),
                'type': $('#lately-login').val(),
                'compare': $('#login-compare').val(),
                'count': $('#login-count').val(),
                'role': $('#register-login-role').val(),
                'agentedPeople': $('#register-login-agentedPeople').val()
            };
        }
        if (sortField !== '') {
            data.sortField = sortField;
            data.sortDirection = sortDirection;
        }
//					var url='/APP-admin/analyse/data/subscribe/export?';
//					for (var key in data) {
//						 url+=key+'='+data[key]+'&';
//					};
//					url=url.slice(0,-1);
//			      if($('#downloadexcellogin').length<=0)
//						$('body').append("<iframe id=\"downloadexcellogin\" style=\"display:none\"></iframe>");
//						$('#downloadexcellogin').attr('src',url);
        var inputs = '';
        for (var key in data) {
            inputs += '<input type="hidden" name="'

                + key + '" value="' + data[key] + '" />';
        }
        ;
        $('<form action="/APP-admin/analyse/data/login/export" accept-charset="UTF-8" method="GET">'
            + inputs + '</form>').appendTo('body').submit().remove();

    })


    //新增策略订阅查询模块

    function tacticsCheckTime() {
        var startTime1 = $("#subscribe-start-time1").val();
        var startTime2 = $("#subscribe-start-time2").val();
        var endTime1 = $("#subscribe-end-time1").val();
        var endTime2 = $("#subscribe-end-time2").val();
        if (startTime1 > startTime2) {
            $('.tactics-checktime1').removeClass('hiddens');
        } else {
            $('.tactics-checktime1').addClass('hiddens');
        }
        if (endTime1 > endTime2) {
            $(".tactics-checktime2").removeClass("hiddens");
        } else {
            $(".tactics-checktime2").addClass("hiddens");
        }
        if (startTime2 === '' || startTime1 === '') {
            $(".tactics-checktime1").addClass("hiddens");
        }
        if (endTime2 === '' || endTime1 === '') {
            $(".tactics-checktime2").addClass("hiddens");
        }
    }

    //加载策略订阅表格
    function tacticsSubscribeList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            var subscribeStartTime = unixToDate(list[i].subscribeTime);
            var subscribeEndTime = unixToDate(list[i].endTime);
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].userName + '</td>'
                + '<td>' + list[i].modelName + '</td>'
                + '<td>' + subscribeStartTime + '</td>'
                + '<td>' + subscribeEndTime + '</td>'
                + '</tr>';
        }
        $(".tactics-subscribe-body").html(li_html);
    }
    function addSubscribeList(page, size, sortField, sortDirection, userName, isregist, modelName, minStartTime, maxStartTime, minEndTime, maxEndTime) {
        var data = {
            'userName': userName !== '' ? userName : null,
            'modelName': modelName !== '' ? modelName : null,
            'isregist': isregist !== '' ? isregist : null,
            'minStartTime': minStartTime !== '' ? minStartTime : null,
            'maxStartTime': maxStartTime !== '' ? maxStartTime : null,
            'minEndTime': minEndTime !== '' ? minEndTime : null,
            'maxEndTime': maxEndTime !== '' ? maxEndTime : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/analyse/data/subscribe',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            data: JSON.stringify(data),
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    tacticsSubscribeList(resp.data.list, page, size);
                    tacticsSubscribeCount = resp.data.totalCounts;
                    $('#tactics-subscribe-totalCounts').find('span').html(tacticsSubscribeCount);
                    var total = (tacticsSubscribeCount / $('#tactics-subscribe-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#tactics-subscribe-page").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".tactics-subscribe-body").empty();
                            addSubscribeList(page, size, sortField, sortDirection, userName, isregist, modelName, minStartTime, maxStartTime, minEndTime, maxEndTime);
                        }
                    });
                }
            }
        });
    }

    $('#tactics-subscribe-searchbtn').click(function () {
        tacticsCheckTime();
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var userName = $('#tactics-user').val(),
            modelName = $('#tactics-name').val(),
            isregist = $('#isregist').val(),
            minStartTime = $('#subscribe-start-time1').val(),
            maxStartTime = $('#subscribe-start-time2').val(),
            minEndTime = $('#subscribe-end-time1').val(),
            maxEndTime = $('#subscribe-end-time2').val(),
            page = 1,
            size = Number($('#tactics-subscribe-size').val());
        addSubscribeList(page, size, sortField, sortDirection, userName, isregist, modelName, minStartTime, maxStartTime, minEndTime, maxEndTime);
    });
    $('#tactics-subscribe-size').change(function () {
        $('#tactics-subscribe-searchbtn').trigger('click');
    });
    $('#btn-tactics-export').click(function () {
        var data;
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        if ($('#tactics-export-page').val() === '0') {
            data = {
                'userName': $('#tactics-user').val(),
                'modelName': $('#tactics-name').val(),
                'isregist': $('#isregist').val(),
                'minStartTime': $('#subscribe-start-time1').val(),
                'maxStartTime': $('#subscribe-start-time2').val(),
                'minEndTime': $('#subscribe-end-time1').val(),
                'maxEndTime': $('#subscribe-end-time2').val(),
                'page': isNaN(Number($('#tactics-subscribe-page ul li.active a').html())) ? 0 : Number($('#tactics-subscribe-page ul li.active a').html()),
                'size': Number($('#tactics-subscribe-size').val())
            };
        } else {
            data = {
                'userName': $('#tactics-user').val(),
                'modelName': $('#tactics-name').val(),
                'isregist': $('#isregist').val(),
                'minStartTime': $('#subscribe-start-time1').val(),
                'maxStartTime': $('#subscribe-start-time2').val(),
                'minEndTime': $('#subscribe-end-time1').val(),
                'maxEndTime': $('#subscribe-end-time2').val()
            };
        }
        if (sortField !== '') {
            data.sortField = sortField;
            data.sortDirection = sortDirection;
        }
//					var url='/APP-admin/analyse/data/subscribe/export?';
//					for (var key in data) {
//						 url+=key+'='+data[key]+'&';
//					};
//					url=url.slice(0,-1);
//			    if($('#downloadexceltactics').length<=0)
//					$('body').append("<iframe id=\"downloadexceltactics\" style=\"display:none\"></iframe>");
//					$('#downloadexceltactics').attr('src',url);
        var inputs = '';
        for (var key in data) {
            inputs += '<input type="hidden" name="'

                + key + '" value="' + data[key] + '" />';
        }
        ;
        $('<form action="/APP-admin/analyse/data/subscribe/export" accept-charset="UTF-8" method="GET">'
            + inputs + '</form>').appendTo('body').submit().remove();
    })


    /***************************资讯文章发布********************************************/
    //资讯文章发布查询

    function articleCheckTime() {
        var startTime, endTime;

        startTime = $("#publish-start-time").val();
        endTime = $("#publish-end-time").val();
        if (startTime > endTime) {
            $('.publish-checktime').removeClass("hiddens");

        } else {
            $('.publish-checktime').addClass("hiddens");
        }
        if (endTime === '' || startTime === '') {
            $('.publish-checktime').addClass("hiddens");
        }

    }

    //获取创建人列表
    function getPublisherList() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/article/creater/list',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
//						async : false,
//						timeout : 8000,
            success: function (resp) {
                if (resp.success) {
                    var list = resp.data;
                    var li_html = '<option value="" selected>全部</option>';
                    for (var i = 0; i < list.length; i++) {
                        li_html += '<option value="' + list[i] + '">' + list[i] + '</option>';
                    }
                    $("#article-publisher").html(li_html);
                }
            }
        });
    }

    //获取创建人列表
    function getArticleTab() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/article/creater/tab',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
//						async : false,
//						timeout : 8000,
            success: function (resp) {
                if (resp.success) {
                    var list = resp.data;
                    var li_html = '<option value=null selected>全部</option>'
                    for (var i = 0; i < list.length; i++) {
                        li_html += '<option value="' + list[i].id + '">' + list[i].tab + '</option>';
                    }
                    $("#get-article-tab").html(li_html);
                }
            }
        });
    }

    //加载策略订阅表格
    function getArticleTable(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            var publishedTime = list[i].articleState == '1' ? unixToDate(list[i].publishedTime) : '';
            var isBanner = '';
            if(list[i].isBanner === 0){
                isBanner = '否';
            }else if(list[i].isBanner === 1){
                isBanner = '是';
                $('#recommendTitle').text('当前推荐文章：'+list[i].title);
            }
            li_html += '<tr>'
                + '<td >' + list[i].title + '</td>'
                + '<td>' + (list[i].articleState == '1' ? '已发布' : '未发布') + '</td>'
                + '<td>' + publishedTime + '</td>'
                + '<td>' + list[i].publisherName + '</td>'
                + '<td>' + list[i].imgSrc + '</td>'
                + '<td>' + isBanner + '</td>';
            if (list[i].articleState == '1') {
                li_html += '<td>'
                    + '<button class="btn btn-primary article-detail" data-id="' + list[i].id + '">详情</button>'
                    + '<button class="btn btn-warning article-delete" data-id="' + list[i].id + '">删除</button>'
                    + '</td>';
            } else {
                li_html += '<td>'
                    + '<button class="btn btn-primary article-edit" data-id="' + list[i].id + '">编辑</button>'
                    + '<button class="btn btn-primary article-publish" data-id="' + list[i].id + '">发布</button>'
                    + '<button class="btn btn-warning article-delete" data-id="' + list[i].id + '">删除</button>'
                    + '</td>';
            }
            li_html += '</tr>';
        }
        $(".article-publish-body").html(li_html);
    }

    function getArticleList(page, size, title, publisherName, articleState, startDate, endDate) {
        var size = 10;
        var data = {
            'title': title !== '' ? title : null,
            'publisherName': publisherName !== '' ? publisherName : null,
            'articleState': articleState !== '' ? articleState : null,
            'startDate': startDate,
            'endDate': endDate,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/article/list',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            data: JSON.stringify(data),
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    getArticleTable(resp.data.list);
                    var articleCount = resp.data.totalCount;
                    var total = (articleCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#article-publish-page").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".article-publish-body").empty();
                            getArticleList(page, size, title, publisherName, articleState, startDate, endDate);
                        }
                    });
                }
            }
        });
    }

    $('#article-publish-searchbtn').click(function () {
        articleCheckTime();
        var title = $('#article-publish-title').val(),
            publisherName = $('#article-publisher').val(),
            articleState = $('#article-publish-status').val(),
            startDate = $('#publish-start-time').val(),
            endDate = $('#publish-end-time').val(),
            page = 1,
            size = 10;
        getArticleList(page, size, title, publisherName, articleState, startDate, endDate);
    });
    // 文章详情
    $('.article-publish-body').on('click', '.article-detail', function () {
        var articleId = $(this).data('id');
        // $('#article-detail-modal').addClass('in');
        // document.getElementById("article-detail-modal").style.display='block';
        // $('#article-detail-modal').show();
        $.ajax({
            type: "GET",
            url: '/APP-admin/article/' + articleId,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    $('#article-detail-title').html(data.title);
                    $('#article-detail-content').html(data.content);
                    $('#article-detail-publisher').html(data.publisherName);
                    $('#article-detail-img').attr('src', data.imgSrc);
                    $('#article-detail-modal').modal();
                }
            }
        });
    })
    //编辑文章
    $('.article-publish-body').on('click', '.article-edit', function () {
        var articleId = $(this).data('id');
        $.ajax({
            type: "GET",
            url: '/APP-admin/article/' + articleId,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    $('#article-edit-id').val(articleId);
                    $('#article-edit-title').val(data.title);
                    // $('#article-edit-modal').find('.summer-note').summernote('code',data.content);
                    $('#article-edit-modal').find('#article-edit-content').val(data.content);
                    $('#article-edit-publisher').html(data.publisherName);
                    $('#article-edit-modal').find('.article-edit-img').val(data.imgSrc);
                    $('#article-edit-img-show').attr('src', data.imgSrc);
                    $('#article-edit-modal').modal();
                }
            }
        });
    })
    // 上传图标
    $('.btn-article-file').on('change', function () {
        var _self = this;
        var file = this.files[0];
        //判断是否是图片类型
        if (!/image\/\w+/.test(file.type)) {
            alert("只能选择图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = new Image,
                //width = 95,    //图片resize宽度
                //quality = 1.0,  //图像质量
                canvas = document.createElement("canvas"),
                drawer = canvas.getContext("2d");
            img.src = this.result;
            var image_base64 = img.src.split(",")[1];
            image_base64 = image_base64.replace("data:image/png;base64,", "");
            var pictureindex = img.src.indexOf(',');
            var picture = img.src.substring(pictureindex + 1);
            var parameter = {name: file.name, picture: picture}
            $.ajax({
                type: "POST",
                //url: "/APP-admin/upload/pic",
                url: imageServer + "/upload/pic",
                cache: false,
                data: parameter,
                async: true,
                success: function (url) {
                    $(_self).parent().prev().find('input').val(url.data);
                    $('#article-edit-img-show').attr('src', url.data);
                }
            });
        }
    })
    $('#article-edit-img-url').change(function () {
        $('#article-edit-img-show').attr('src', $(this).val());
    });
    $('#article-edit-btns').on('click', 'button', function () {
        var status = $(this).data('status');
        $.ajax({
            type: "PUT",
            url: '/APP-admin/article/update',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({
                'id': $('#article-edit-id').val(),
                'title': $('#article-edit-title').val(),
                //'content':$('#article-edit-modal').find('.summer-note').summernote('code'),
                'content': $('#article-edit-modal').find('#article-edit-content').val(),
                'imgSrc': $('#article-edit-modal').find('.article-edit-img').val(),
                'articleState': status
            }),
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    $('#article-edit-modal').modal('hide');
                    $('#article-publish-searchbtn').trigger('click');
                    Lobibox.notify('success', {
                        msg: "文章编辑成功!",
                        width: 400,
                        sound: false,
                        delay: 1000
                    });
                }
            }
        });
    });
    //发布文章
    $('.article-publish-body').on('click', '.article-publish', function () {
        var articleId = $(this).data('id');
        $.ajax({
            type: "GET",
            url: '/APP-admin/article/' + articleId,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    $('#article-publish-id').val(articleId);
                    $('#article-publish-titles').val(data.title);
                    $('#article-publish-content').val(data.content);
                    $('#article-publish-img').val(data.imgSrc);
                    $('#article-publish-showtitles').html(data.title);
                    $('#article-publish-modal').modal();
                }
            }
        });
    })
    $('#publish-article-sure').click(function () {
        $.ajax({
            type: "PUT",
            url: '/APP-admin/article/update',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({
                'id': $('#article-publish-id').val(),
                'title': $('#article-publish-titles').val(),
                'content': $('#article-publish-content').val(),
                'imgSrc': $('#article-publish-img').val(),
                'articleState': 1
            }),
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    $('#article-publish-modal').modal('hide');
                    $('#article-publish-searchbtn').trigger('click');
                    Lobibox.notify('success', {
                        msg: "文章发布成功!",
                        width: 400,
                        sound: false,
                        delay: 1000
                    });
                }
            }
        });
    });
    //删除文章
    $('.article-publish-body').on('click', '.article-delete', function () {
        var articleId = $(this).data('id');
        $('#article-delete-id').val(articleId);
        $('#article-delete-showtitles').html($(this).parent().parent().find('td:first-child').html());
        $('#article-delete-modal').modal();
    })
    $('#delete-article-sure').click(function () {
        var articleId = $('#article-delete-id').val();
        $.ajax({
            type: "DELETE",
            url: '/APP-admin/article/delete?id=' + articleId,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    $('#article-delete-modal').modal('hide');
                    $('#article-publish-searchbtn').trigger('click');
                    Lobibox.notify('success', {
                        msg: "文章删除成功!",
                        width: 400,
                        sound: false,
                        delay: 1000
                    });
                }
            }
        });
    })


    //盈元分析模块
    function yingYuanList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            let signIn = list[i].signIn ? list[i].signIn : 0;
            let share = list[i].share ? list[i].share : 0;
            let systemHandsel = list[i].systemHandsel ? list[i].systemHandsel : 0;
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].userName + '</td>'
                + '<td>' + list[i].available + '</td>'
                + '<td>' + list[i].used + '</td>'
                + '<td>' + signIn + '</td>'
                + '<td>' + share + '</td>'
                + '<td>' + systemHandsel + '</td>'
                + '</tr>';
        }
        $(".yingYuan-body").html(li_html);
    }

    function addYingYuanList(page, size, userName, holdCompare, holdCount, usedCompare, usedCount, sortField, sortDirection) {
        var data = {
            'userName': userName !== '' ? userName : null,
            'holdCompare': holdCompare !== '' ? holdCompare : null,
            'holdCount': holdCount !== '' ? holdCount : null,
            'usedCompare': usedCompare !== '' ? usedCompare : null,
            'usedCount': usedCount !== '' ? usedCount : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/analyse/data/coin',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            data: JSON.stringify(data),
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    yingYuanList(resp.data.coinDataInfoList, page, size);
                    yingYuanCount = resp.data.totalCounts;
                    $('#yingYuan-totalCounts').find('span').html(yingYuanCount);
                    var total = (yingYuanCount / $('#yingYuan-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#yingYuan-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".yingYuan-body").empty();
                            addYingYuanList(page, size, userName, holdCompare, holdCount, usedCompare, usedCount, sortField, sortDirection);
                        }
                    });
                }
            }
        });
    }

    $('#yingYuan-searchbtn').click(function () {
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var userName = $('#yingYuan-user').val(),
            holdCompare = $('#yingYuan-have-compare').val(),
            holdCount = $('#yingYuan-have-count').val(),
            usedCompare = $('#yingYuan-used-compare').val(),
            usedCount = $('#yingYuan-used-count').val(),
            page = 1,
            size = $('#yingYuan-size').val();
        addYingYuanList(page, size, userName, holdCompare, holdCount, usedCompare, usedCount, sortField, sortDirection);
    });
    $('#yingYuan-size').change(function () {
        $('#yingYuan-searchbtn').trigger('click');
    });
    $('#btn-yingYuan-export').click(function () {
        var data;
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        if ($('#yingYuan-export-page').val() === '0') {
            data = {
                'userName': $('#yingYuan-user').val(),
                'holdCompare': $('#yingYuan-have-compare').val(),
                'holdCount': $('#yingYuan-have-count').val(),
                'usedCompare': $('#yingYuan-used-compare').val(),
                'usedCount': $('#yingYuan-used-count').val(),
                'page': isNaN(Number($('#yingYuan-pages ul li.active a').html())) ? 0 : Number($('#yingYuan-pages ul li.active a').html()),
                'size': Number($('#yingYuan-size').val())
            };
        } else {
            data = {
                'userName': $('#yingYuan-user').val(),
                'holdCompare': $('#yingYuan-have-compare').val(),
                'holdCount': $('#yingYuan-have-count').val(),
                'usedCompare': $('#yingYuan-used-compare').val(),
                'usedCount': $('#yingYuan-used-count').val()
            };
        }
        if (sortField !== '') {
            data.sortField = sortField;
            data.sortDirection = sortDirection;
        }
        var inputs = '';
        for (var key in data) {
            inputs += '<input type="hidden" name="'

                + key + '" value="' + data[key] + '" />';
        }
        ;
        $('<form action="/APP-admin/analyse/data/coin/export" accept-charset="UTF-8" method="GET">'
            + inputs + '</form>').appendTo('body').submit().remove();

    })

    //签到分析模块
    function signAnalysisList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        var lastSignInTime;
        for (var i = 0; i < list.length; i++) {
            lastSignInTime = list[i].lastSignInTime !== null ? unixToDate(list[i].lastSignInTime) : '';
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].userName + '</td>'
                + '<td>' + list[i].totalCount + '</td>'
                + '<td>' + lastSignInTime + '</td>'
                + '<td>' + list[i].weekCount + '</td>'
                + '<td>' + list[i].monthCount + '</td>'
                + '<td>' + list[i].seasonCount + '</td>'
                + '<td>' + list[i].maxDays + '</td>'
                + '</tr>';
        }
        $(".sign-analysis-body").html(li_html);
    }

    function addSignAnalysisList(page, size, sortField, sortDirection, userName, totalCompare, totalCount, maxCompare, maxDays, lastSignInTime, type, compare, count) {
        var data = {
            'userName': userName !== '' ? userName : null,
            'totalCompare': totalCompare !== '' ? totalCompare : null,
            'totalCount': totalCount !== '' ? totalCount : null,
            'maxCompare': maxCompare !== '' ? maxCompare : null,
            'maxDays': maxDays !== '' ? maxDays : null,
            'lastSignInTime': lastSignInTime !== '' ? lastSignInTime : null,
            'type': type !== '' ? type : null,
            'compare': compare !== '' ? compare : null,
            'count': count !== '' ? count : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/analyse/data/signin',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            data: JSON.stringify(data),
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    signAnalysisList(resp.data.list, page, size);
                    signAnalysisCount = resp.data.totalCounts;
                    $('#sign-analysis-totalCounts').find('span').html(signAnalysisCount);
                    var total = (signAnalysisCount / $('#sign-analysis-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#sign-analysis-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".sign-analysis-body").empty();
                            addSignAnalysisList(page, size, sortField, sortDirection, userName, totalCompare, totalCount, maxCompare, maxDays, lastSignInTime, type, compare, count);
                        }
                    });
                }
            }
        });
    }

    $('#sign-analysis-searchbtn').click(function () {
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var userName = $('#sign-analysis-user').val(),
            totalCompare = $('#sign-frequency-compare').val(),
            totalCount = $('#sign-frequency-count').val(),
            maxCompare = $('#sign-continuous-compare').val(),
            maxDays = $('#sign-continuous-count').val(),
            lastSignInTime = $('#sign-lately-count').val() !== '' ? (new Date().getTime() - Number($('#sign-lately-count').val()) * 24 * 60 * 60 * 1000) : '',
            type = $('#sign-frequency-lately-type').val(),
            compare = $('#sign-frequency-lately-compare').val(),
            count = $('#sign-frequency-lately-count').val(),
            page = 1,
            size = Number($('#sign-analysis-size').val());
        addSignAnalysisList(page, size, sortField, sortDirection, userName, totalCompare, totalCount, maxCompare, maxDays, lastSignInTime, type, compare, count);
    });
    $('#sign-analysis-size').change(function () {
        $('#sign-analysis-searchbtn').trigger('click');
    });
    $('#btn-sign-analysis-export').click(function () {
        var data;
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        if ($('#sign-analysis-export-page').val() === '0') {
            data = {
                'userName': $('#sign-analysis-user').val(),
                'totalCompare': $('#sign-frequency-compare').val(),
                'totalCount': $('#sign-frequency-count').val(),
                'maxCompare': $('#sign-continuous-compare').val(),
                'maxDays': $('#sign-continuous-count').val(),
                'lastSignInTime': $('#sign-lately-count').val() !== '' ? unixToDate(new Date().getTime() - Number($('#sign-lately-count').val()) * 24 * 60 * 60 * 1000) : '',
                'type': $('#sign-frequency-lately-type').val(),
                'compare': $('#sign-frequency-lately-compare').val(),
                'count': $('#sign-frequency-lately-count').val(),
                'page': isNaN(Number($('#sign-analysis-pages ul li.active a').html())) ? 0 : Number($('#sign-analysis-pages ul li.active a').html()),
                'size': Number($('#sign-analysis-size').val())
            };
        } else {
            data = {
                'userName': $('#sign-analysis-user').val(),
                'totalCompare': $('#sign-frequency-compare').val(),
                'totalCount': $('#sign-frequency-count').val(),
                'maxCompare': $('#sign-continuous-compare').val(),
                'maxDays': $('#sign-continuous-count').val(),
                'lastSignInTime': $('#sign-lately-count').val() !== '' ? unixToDate(new Date().getTime() - Number($('#sign-lately-count').val()) * 24 * 60 * 60 * 1000) : '',
                'type': $('#sign-frequency-lately-type').val(),
                'compare': $('#sign-frequency-lately-compare').val(),
                'count': $('#sign-frequency-lately-count').val()
            };
        }
        if (sortField !== '') {
            data.sortField = sortField;
            data.sortDirection = sortDirection;
        }
        var inputs = '';
        for (var key in data) {
            inputs += '<input type="hidden" name="'

                + key + '" value="' + data[key] + '" />';
        }
        ;
        $('<form action="/APP-admin/analyse/data/signin/export" accept-charset="UTF-8" method="GET">'
            + inputs + '</form>').appendTo('body').submit().remove();

    })

    //邀请码查询模块
    function codedataList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].userName + '</td>'
                + '<td>' + list[i].todayCount + '</td>'
                + '<td>' + list[i].totalCount + '</td>'
                + '<td>' + list[i].totalReward + '</td>'
                + '<td>' + list[i].successCount + '</td>'
                + '</tr>';
        }
        $(".codedata-body").html(li_html);
    }

    function addCodedataList(page, size, userName, totalCompare, totalCount, rewardCompare, rewardCount, todayCompare, todayCount, sortField, sortDirection) {
        var data = {
            'userName': userName !== '' ? userName : null,
            'totalCompare': totalCompare !== '' ? totalCompare : null,
            'totalCount': totalCount !== '' ? totalCount : null,
            'rewardCompare': rewardCompare !== '' ? rewardCompare : null,
            'rewardCount': rewardCount !== '' ? rewardCount : null,
            'todayCompare': todayCompare !== '' ? todayCompare : null,
            'todayCount': todayCount !== '' ? todayCount : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/analyse/data/inviteCode',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    codedataList(resp.data.list, page, size);
                    codedataCount = resp.data.totalCounts;
                    $('#codedata-totalCounts').find('span').html(codedataCount);
                    var total = (codedataCount / $('#codedata-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#codedata-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".codedata-body").empty();
                            addCodedataList(page, size, userName, totalCompare, totalCount, rewardCompare, rewardCount, todayCompare, todayCount, sortField, sortDirection);
                        }
                    });
                }
            }
        });
    }

    $('#codedata-searchbtn').click(function () {
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var userName = $('#codedata-user').val(),
            totalCompare = $('#codedata-totalCompare').val(),
            totalCount = $('#codedata-totalCount').val(),
            rewardCompare = $('#codedata-rewardCompare').val(),
            rewardCount = $('#codedata-rewardCount').val(),
            todayCompare = $('#codedata-todayCompare').val(),
            todayCount = $('#codedata-todayCount').val(),
            page = 1,
            size = $('#codedata-size').val();
        addCodedataList(page, size, userName, totalCompare, totalCount, rewardCompare, rewardCount, todayCompare, todayCount, sortField, sortDirection);
    });
    $('#codedata-size').change(function () {
        $('#codedata-searchbtn').trigger('click');
    });
    $('#btn-codedata-export').click(function () {
        var data;
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        if ($('#codedata-export-page').val() === '0') {
            data = {
                'userName': $('#codedata-user').val(),
                'totalCompare': $('#codedata-totalCompare').val(),
                'totalCount': $('#codedata-totalCount').val(),
                'rewardCompare': $('#codedata-rewardCompare').val(),
                'rewardCount': $('#codedata-rewardCount').val(),
                'todayCompare': $('#codedata-todayCompare').val(),
                'todayCount': $('#codedata-todayCount').val(),
                'page': isNaN(Number($('#codedata-pages ul li.active a').html())) ? 0 : Number($('#codedata-pages ul li.active a').html()),
                'size': Number($('#codedata-size').val())
            };
        } else {
            data = {
                'userName': $('#codedata-user').val(),
                'totalCompare': $('#codedata-totalCompare').val(),
                'totalCount': $('#codedata-totalCount').val(),
                'rewardCompare': $('#codedata-rewardCompare').val(),
                'rewardCount': $('#codedata-rewardCount').val(),
                'todayCompare': $('#codedata-todayCompare').val(),
                'todayCount': $('#codedata-todayCount').val()
            };
        }
        if (sortField !== '') {
            data.sortField = sortField;
            data.sortDirection = sortDirection;
        }
        var inputs = '';
        for (var key in data) {
            inputs += '<input type="hidden" name="'

                + key + '" value="' + data[key] + '" />';
        }
        ;
        $('<form action="/APP-admin/analyse/data/inviteCode/export" accept-charset="UTF-8" method="GET">'
            + inputs + '</form>').appendTo('body').submit().remove();

    })

    //策略发布管理新增
    function discountedPrice() {
        var op = $('#bookprice').val();
        var pp = $('#discountPrice').val();
        var pd;
        if (op === '' || pp === '' || Number(op) === 0 || Number(pp) > Number(op)) {
            $('.preferential-discount').html('');
            return;
        } else {
            pd = Number(pp) / Number(op) * 10;
            if (pd > 10 || pd < 0) {
                $('.preferential-discount').html('');
            } else {
                $('.preferential-discount').html(pd.toFixed(1));
            }
        }
    }

    $('body').on('change', '#bookprice,#discountPrice', function () {
        discountedPrice();
    });
    var $body = $('body');

    // //策略总资产及可用资金查询
    // function capitalSearch(id) {
    //     $.ajax({
    //         type: "GET",
    //         url: '/APP-admin/model/runtime/data?id=' + id,
    //         contentType: "application/json;charset=UTF-8",
    //         dataType: "json",
    //         async: false,
    //         success: function (resp) {
    //             if (resp.success) {
    //                 if (resp.data !== null) {
    //                     $('.total-capital').html(resp.data.totalCapital !== null ? resp.data.totalCapital.toFixed(2) : '');
    //                     $('.available-capital').html(resp.data.availableCapital !== null ? resp.data.availableCapital.toFixed(2) : '');
    //                 } else {
    //                     $('.total-capital').html('');
    //                     $('.available-capital').html('');
    //                 }
    //             }
    //         }
    //     });
    // }

    //优化数值
    //获取优化数值配置列表
    function getArticleConfigList() {
        $.ajax({
            type: "GET",
            url: '/APP-admin/config/list?type=0',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    var html, data = resp.data, num = 1;
                    $('.numOptimization-article-body').empty();
                    for (var i = 0, len = data.length; i < len; i++) {
                        html += '<tr>'
                            + '<td>' + num + '</td>'
                            + '<td>' + data[i].name + '</td>'
                            + '<td><input class="form-control" name="multiple" value="' + data[i].multiple + '" disabled></td>'
                            + '<td><input class="form-control" name="random" value="' + data[i].random + '" disabled></td>'
                            + '<td>'
                            + '<button class="btn btn-info btn-sm numOptimization-edit" data-id="' + data[i].id + '">编辑</button>'
                            + '<button class="btn btn-success btn-sm numOptimization-save hide" data-id="' + data[i].id + '">提交</button>'
                            + '</td>'
                            + '</tr>';
                        num++;
                    }
                    $('.numOptimization-article-body').html(html);
                }
            }
        });

    }

    function getTacticsConfigList(mid) {
        var url;
        if (mid) {
            url = '/APP-admin/config/list?type=1&mid=' + mid;
        } else {
            url = '/APP-admin/config/list?type=1';
        }
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    var html, data = resp.data, num = 1;
                    $('.numOptimization-tactics-body').empty();
                    for (var i = 0, len = data.length; i < len; i++) {
                        html += '<tr>'
                            + '<td>' + num + '</td>'
                            + '<td>' + data[i].name + '</td>'
                            + '<td>' + data[i].modelName + '</td>'
                            + '<td>' + data[i].val + '</td>'
                            + '<td><input class="form-control" name="multiple" value="' + data[i].multiple + '" disabled></td>'
                            + '<td><input class="form-control" name="random" value="' + data[i].random + '" disabled></td>'
                            + '<td>' + data[i].optVal + '</td>'
                            + '<td>'
                            + '<button class="btn btn-info btn-sm numOptimization-edit" data-id="' + data[i].id + '">编辑</button>'
                            + '<button class="btn btn-success btn-sm numOptimization-save hide" data-id="' + data[i].id + '">提交</button>'
                            + '</td>'
                            + '</tr>';
                        num++;
                    }
                    $('.numOptimization-tactics-body').html(html);
                }
            }
        });

    }

    $('#numOptimization').on('click', '.numOptimization-edit', function () {
        $(this).parents('tr').find('input').removeAttr('disabled');
        $(this).addClass('hide').siblings('.numOptimization-save').removeClass('hide');
    })
    $('#numOptimization').on('click', '.numOptimization-save', function () {
        var id = $(this).data('id'),
            that = this,
            multiple = $(this).parents('tr').find('input[name="multiple"]').val(),
            random = $(this).parents('tr').find('input[name="random"]').val();
        var reg1 = /^[1-9]\d*$/g;
        var reg2 = /^\d+$/g;
        if (!reg1.test(multiple)) {
            Lobibox.alert('warning', {
                msg: '放大倍数必须是大于0的整数!'
            })
            return;
        } else if (!reg2.test(random)) {
            Lobibox.alert('warning', {
                msg: '随机数必须是大于或等于0的整数!'
            })
            return;
        }
        $.ajax({
            type: "PUT",
            url: '/APP-admin/config/update',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify({
                'id': id,
                'multiple': multiple,
                'random': random
            }),
            success: function (resp) {
                if (resp.success) {
                    $(that).parents('tr').find('input').attr('disabled', true);
                    $(that).addClass('hide').siblings('.numOptimization-edit').removeClass('hide');
                    Lobibox.notify('success', {
                        msg: "修改成功!",
                        width: 400,
                        sound: false,
                        delay: 1000
                    });
                } else {
                    Lobibox.notify('error', {
                        msg: resp.msg,
                        sound: false,
                        width: 400,
                        delay: 1000
                    });
                }
            }
        });
    })
    $('#numOptimization-searchbtn').click(function () {
        var id = $('#tactics-numOptimization-name').val();
        if (id) {
            getTacticsConfigList(id);
        } else {
            getTacticsConfigList();
        }
    })

    //列表排序功能

    $body.on('click', '.table-sorting', function () {
        $(this).removeClass('table-sorting').addClass('table-sorting-asc').attr('data-sort', '0');
        $(this).siblings('.table-sorting-asc').removeClass('table-sorting-asc').addClass('table-sorting').attr('data-sort', '');
        $(this).siblings('.table-sorting-desc').removeClass('table-sorting-desc').addClass('table-sorting').attr('data-sort', '');
        tableSort(this);
    }).on('click', '.table-sorting-asc', function () {
        $(this).removeClass('table-sorting-asc').addClass('table-sorting-desc').attr('data-sort', '1');
        $(this).siblings('.table-sorting-asc').removeClass('table-sorting-asc').addClass('table-sorting').attr('data-sort', '');
        $(this).siblings('.table-sorting-desc').removeClass('table-sorting-desc').addClass('table-sorting').attr('data-sort', '');
        tableSort(this);
    }).on('click', '.table-sorting-desc', function () {
        $(this).removeClass('table-sorting-desc').addClass('table-sorting-asc').attr('data-sort', '0');
        $(this).siblings('.table-sorting-asc').removeClass('table-sorting-asc').addClass('table-sorting').attr('data-ort', '');
        $(this).siblings('.table-sorting-desc').removeClass('table-sorting-desc').addClass('table-sorting').attr('data-sort', '');
        tableSort(this);
    });

    function tableSort(e) {
        $(e).parents('.table-responsive').siblings('form').find('button').trigger('click');
    }

    //获取当前页排序的项及值
    function operationAnalyzeSort(e) {
        var $ele1, $ele2;
        if ($.trim($(e).text()) === '查询') {
            $ele1 = $(e).parents('form').siblings('.table-responsive').find('.table-sorting-desc');
            $ele2 = $(e).parents('form').siblings('.table-responsive').find('.table-sorting-asc');
        } else if ($.trim($(e).text()) === '导出') {
            $ele1 = $(e).parents('.table-responsive').find('.table-sorting-desc');
            $ele2 = $(e).parents('.table-responsive').find('.table-sorting-asc');
        }
        if ($ele1.length) {
            return {
                'prop': $ele1.attr('data-prop'),
                'sort': $ele1.attr('data-sort')
            }
        } else if ($ele2.length) {
            return {
                'prop': $ele2.attr('data-prop'),
                'sort': $ele2.attr('data-sort')
            }
        } else {
            return;
        }
    }

    /*********************代理管理模块**************************/
    //加载代理人表格
    function agencyInfoList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].userName + '</td>'
                + '<td>' + list[i].createTime + '</td>'
                + '<td>' + list[i].startAgentTime + '</td>'
                + '<td class="word-break">' + (list[i].zhifubaoNum !== null ? list[i].zhifubaoNum : '') + '</td>'
                + '<td>' + (list[i].zhifubaoName !== null ? list[i].zhifubaoName : '') + '</td>'
                // + '<td>' + list[i].thisMonthInvite + '</td>'
                // + '<td>' + list[i].lastMonthInvite + '</td>'
                + '<td>' + list[i].totalMoneyAmount + '</td>'
                + '<td>' + list[i].totalInvite + '</td>'
                + '<td>' + list[i].validInvite + '</td>'
                + '<td>'
                + '<button class="btn btn-info btn-sm agency-info-show" data-id="' + list[i].userId + '" data-name="' + list[i].userName + '">查看</button>'
                + '</td>'
                + '<td>';
            if (list[i].howAgent === 1) {
                li_html += '<button class="btn btn-danger btn-sm agency-info-appclose" data-id="' + list[i].userId + '">关闭</button>';
            } else {
                li_html += '<button class="btn btn-success btn-sm agency-info-appshow" data-id="' + list[i].userId + '">打开</button>';
            }
            li_html += '</td></tr>';
        }
        $(".agency-info-body").html(li_html);
    }

    function addagencyInfoList(page, size, sortField, sortDirection, userName, startTime, endTime, payAccount, payName) {
        var data = {
            'userName': userName !== '' ? userName : null,
            'startTime': startTime !== '' ? startTime : null,
            'endTime': endTime !== '' ? endTime : null,
            'payAccount': payAccount !== '' ? payAccount : null,
            'payName': payName !== '' ? payName : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/agent/data/login',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    agencyInfoList(resp.data.list, page, size);
                    agencyInfoCount = resp.data.totalCounts;
                    $('#agency-info-totalCounts').find('span').html(agencyInfoCount);
                    var total = (agencyInfoCount / $('#agency-info-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#agency-info-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".agency-info-body").empty();
                            addagencyInfoList(page, size, sortField, sortDirection, userName, startTime, endTime, payAccount, payName);
                        }
                    });
                }
            }
        });
    }

    function agencyCheckTime() {
        var startTime = $("#agency-start-time").val();
        var endTime = $("#agency-end-time").val();
        if (startTime > endTime) {
            $('.agency-checktime').removeClass('hiddens');
        } else {
            $('.agency-checktime').addClass('hiddens');
        }
        if (startTime === '' || endTime === '') {
            $(".agency-checktime").addClass("hiddens");
        }
    }

    $('#agency-searchbtn').click(function () {
        agencyCheckTime();
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var userName = $('#agency-user').val(),
            startTime = $('#agency-start-time').val(),
            endTime = $('#agency-end-time').val(),
            payAccount = $('#alipay-id').val(),
            payName = $('#alipay-name').val(),
            page = 1,
            size = Number($('#agency-info-size').val());
        addagencyInfoList(page, size, sortField, sortDirection, userName, startTime, endTime, payAccount, payName);
    });
    $('#agency-info-size').change(function () {
        $('#agency-searchbtn').trigger('click');
    });
    //代理信息
    $('.agency-info-body').on('click', '.agency-info-show', function () {
        var id = $(this).data('id');
        $('.agency-modal-user').html($(this).parents('tr').find('td:nth-child(2)').html());
        $('.agency-modal-alipayid').html($(this).parents('tr').find('td:nth-child(5)').html());
        $('.agency-modal-alipayname').html($(this).parents('tr').find('td:nth-child(6)').html());
        $('.agency-modal-userId').val(id);
        $('#agency-modal-search').find('input').val('');
        $('#lately-agency-modal').val('');
        $('#login-agency-modal').val('');
        $('#agency-modal-export-page').val('0');
        $('#agency-modal-size').val('10');
        $('#agency-modal-table').find('.table-sorting-asc').removeClass('table-sorting-asc').addClass('table-sorting').attr('data-sort', '');
        $('#agency-modal-table').find('.table-sorting-desc').removeClass('table-sorting-desc').addClass('table-sorting').attr('data-sort', '');
        $('#agency-modal-table').find('th[data-prop="0"]').removeClass('table-sorting').addClass('table-sorting-desc').attr('data-sort', '1');
        $('#agency-modal-searchbtn').trigger('click');
        $('#agency-info-modal').modal();
    }).on('click', '.agency-info-appclose', function () {
        var id = $(this).data('id');
        Lobibox.confirm({
            msg: '确认要关闭该用户app中"我的佣金"显示吗？',
            buttons: {
                yes: {
                    text: '确定',
                    class: 'btn btn-info'
                },
                no: {
                    text: '取消',
                    class: 'btn btn-default'
                }
            },
            callback: function ($this, type, ev) {
                if (type === 'yes') {
                    $.ajax({
                        type: 'GET',
                        url: '/APP-admin/agent/agentTransUser?userId=' + id,
                        dataType: 'json',
                        success: function (resp) {
                            if (resp.success) {
                                $('#agency-searchbtn').trigger('click');
                                $('#brokerage-searchbtn').trigger('click');
                                Lobibox.notify('success', {
                                    msg: '关闭成功',
                                    delay: 1000,
                                    sound: false
                                });
                            } else {
                                Lobibox.notify('error', {
                                    msg: resp.msg,
                                    sound: false
                                });
                            }
                        }
                    });
                }
            }
        });
    }).on('click', '.agency-info-appshow', function () {
        var id = $(this).data('id');
        Lobibox.confirm({
            msg: '确认要打开该用户app中"我的佣金"显示吗？',
            buttons: {
                yes: {
                    text: '确定',
                    class: 'btn btn-info'
                },
                no: {
                    text: '取消',
                    class: 'btn btn-default'
                }
            },
            callback: function ($this, type, ev) {
                if (type === 'yes') {
                    $.ajax({
                        type: 'GET',
                        url: '/APP-admin/agent/userTransAgentAgain?userId=' + id,
                        dataType: 'json',
                        success: function (resp) {
                            if (resp.success) {
                                $('#agency-searchbtn').trigger('click');
                                $('#brokerage-searchbtn').trigger('click');
                                Lobibox.notify('success', {
                                    msg: '打开成功',
                                    delay: 1000,
                                    sound: false
                                });
                            } else {
                                Lobibox.notify('error', {
                                    msg: resp.msg,
                                    sound: false
                                });
                            }
                        }
                    });
                }
            }
        });
    });

    //代理详情加载
    function agencyInfoModalList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            var createTime = unixToDate(list[i].createTime);
            var firstLoginTime = list[i].firstLoginTime !== null ? unixToDate(list[i].firstLoginTime) : '';
            var lastLoginTime = list[i].lastLoginTime !== null ? unixToDate(list[i].lastLoginTime) : '';
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].userName + '</td>'
                + '<td>' + createTime + '</td>'
                + '<td>' + firstLoginTime + '</td>'
                + '<td>' + lastLoginTime + '</td>'
                + '<td>' + list[i].weekCount + '</td>'
                + '<td>' + list[i].monthCount + '</td>'
                + '<td>' + list[i].seasonCount + '</td>'
                + '<td class="word-break">' + (list[i].firstMachinId !== null ? list[i].firstMachinId : '') + '</td>'
                + '</tr>';
        }
        $(".agency-modal-body").html(li_html);
    }

    function addagencyInfoModalList(agentId, page, size, sortField, sortDirection, howValid, userName, lastLoginTime, startTime, endTime, type, compare, count) {
        var data = {
            'agentId': Number(agentId),
            'userName': userName !== '' ? userName : null,
            'lastLoginTime': lastLoginTime !== '' ? lastLoginTime : null,
            'startTime': startTime !== '' ? startTime : null,
            'endTime': endTime !== '' ? endTime : null,
            'type': type !== '' ? type : null,
            'compare': compare !== '' ? compare : null,
            'count': count !== '' ? count : null,
            'howValid': howValid,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/agent/data/InviteUserQuery',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    agencyInfoModalList(resp.data.list, page, size);
                    agencyInfoModalCount = resp.data.totalCounts;
                    $('#agency-modal-totalCounts').find('span').html(agencyInfoModalCount);
                    var total = (agencyInfoModalCount / $('#agency-modal-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#agency-modal-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".agency-modal-body").empty();
                            addagencyInfoModalList(agentId, page, size, sortField, sortDirection, howValid, userName, lastLoginTime, startTime, endTime, type, compare, count);
                        }
                    });
                }
            }
        });
    }

    function agencyModalCheckTime() {
        var startTime = $("#agency-modal-start-time").val();
        var endTime = $("#agency-modal-end-time").val();
        if (startTime > endTime) {
            $('.agency-modal-checktime').removeClass('hiddens');
        } else {
            $('.agency-modal-checktime').addClass('hiddens');
        }
        if (startTime === '' || endTime === '') {
            $(".agency-modal-checktime").addClass("hiddens");
        }
    }

    $('#agency-modal-searchbtn').click(function () {
        agencyModalCheckTime();
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var agentId = $('.agency-modal-userId').val(),
            userName = $('#agency-modal-user').val(),
            lastLoginTime = $('#agency-modal-lastloading').val() !== '' ? (new Date().getTime() - Number($('#agency-modal-lastloading').val()) * 24 * 60 * 60 * 1000) : '',
            startTime = $('#agency-modal-start-time').val(),
            endTime = $('#agency-modal-end-time').val(),
            type = $('#lately-agency-modal').val(),
            compare = $('#login-agency-modal').val(),
            count = $('#agency-modal-count').val(),
            howValid = $('#login-agency-howValid').val(),
            page = 1,
            size = Number($('#agency-modal-size').val());
        addagencyInfoModalList(agentId, page, size, sortField, sortDirection, howValid, userName, lastLoginTime, startTime, endTime, type, compare, count);
    });
    $('#agency-modal-size').change(function () {
        $('#agency-modal-searchbtn').trigger('click');
    });
    $('#btn-agency-modal-export').click(function () {
        var data;
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        if ($('#agency-modal-export-page').val() === '0') {

            data = {
                'agentId': $('.agency-modal-userId').val(),
                'userName': $('#agency-modal-user').val(),
                'startTime': $('#agency-modal-start-time').val(),
                'endTime': $('#agency-modal-end-time').val(),
                'lastLoginTime': $('#agency-modal-lastloading').val() !== '' ? unixToDate(new Date().getTime() - Number($('#agency-modal-lastloading').val()) * 24 * 60 * 60 * 1000) : '',
                'type': $('#lately-agency-modal').val(),
                'compare': $('#login-agency-modal').val(),
                'count': $('#agency-modal-count').val(),
                'page': isNaN(Number($('#agency-modal-pages ul li.active a').html())) ? 1 : Number($('#agency-modal-pages ul li.active a').html()),
                'size': Number($('#agency-modal-size').val())
            };
        } else {
            data = {
                'agentId': $('.agency-modal-userId').val(),
                'userName': $('#agency-modal-user').val(),
                'startTime': $('#agency-modal-start-time').val(),
                'endTime': $('#agency-modal-end-time').val(),
                'lastLoginTime': $('#agency-modal-lastloading').val() !== '' ? unixToDate(new Date().getTime() - Number($('#agency-modal-lastloading').val()) * 24 * 60 * 60 * 1000) : '',
                'type': $('#lately-agency-modal').val(),
                'compare': $('#login-agency-modal').val(),
                'count': $('#agency-modal-count').val()
            };
        }
        if (sortField !== '') {
            data.sortField = sortField;
            data.sortDirection = sortDirection;
        }
        var inputs = '';
        for (var key in data) {
            inputs += '<input type="hidden" name="'

                + key + '" value="' + data[key] + '" />';
        }
        ;
        $('<form action="/APP-admin/agent/data/InviteUserQuery/export" accept-charset="UTF-8" method="GET">'
            + inputs + '</form>').appendTo('body').submit().remove();

    })


    ////////佣金结算///////////
    function brokerageList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            var createTime = unixToDate(list[i].createTime);
            var lastLoginTime = list[i].lastLoginTime !== null ? unixToDate(list[i].lastLoginTime) : '';
            var invitedNum = list[i].invitedNum !== null ? list[i].invitedNum : 0;
            var unitPrice = list[i].unitPrice !== null ? list[i].unitPrice : 0;
            var moneyAmount = list[i].moneyAmount !== null ? list[i].moneyAmount : 0;
            if (list[i].status === 0) {
                li_html += '<tr data-id="' + list[i].id + '">';
                if (list[i].howAgent === 2) {
                    li_html += '<td ></td>';
                } else {
                    li_html += '<td ><input type="checkbox" class="check-line" data-id="' + list[i].agentId + '"></td>';
                }
                li_html += '<td >' + (num++) + '</td>'
                    + '<td>' + list[i].timeMonth + '</td>'
                    + '<td>' + list[i].agentName + '</td>'
                    + '<td class="word-break">' + (list[i].zhifubaoNum !== null ? list[i].zhifubaoNum : '') + '</td>'
                    + '<td>' + (list[i].zhifubaoName !== null ? list[i].zhifubaoName : '') + '</td>'
                    + '<td>' + invitedNum + '</td>'
                    + '<td><input type="text" value="' + list[i].reduceNum + '" disabled class="deduction-count"></td>'
                    + '<td><input type="text" value="' + unitPrice + '" disabled class="brokerage-price"></td>'
                    + '<td>' + moneyAmount + '</td>'
                    + '<td>待支付</td>'
                    + '<td>';
                if (list[i].howAgent === 2) {
                    li_html += '<button class="btn btn-success btn-xs btn-brokerage-edit" data-id="' + list[i].id + '" data-month="' + list[i].timeMonth + '" disabled>编辑</button>'
                        + '<button class="btn btn-warning btn-xs btn-brokerage-pay" data-id="' + list[i].id + '" data-agentid="' + list[i].agentId + '" disabled>支付</button>';
                } else {
                    li_html += '<button class="btn btn-success btn-xs btn-brokerage-edit" data-id="' + list[i].id + '" data-month="' + list[i].timeMonth + '">编辑</button>'
                        + '<button class="btn btn-warning btn-xs btn-brokerage-pay" data-id="' + list[i].id + '" data-agentid="' + list[i].agentId + '">支付</button>';
                }
                li_html += '</td></tr>';
            } else {
                li_html += '<tr>'
                    + '<td ></td>'
                    + '<td >' + (num++) + '</td>'
                    + '<td>' + list[i].timeMonth + '</td>'
                    + '<td>' + list[i].agentName + '</td>'
                    + '<td class="word-break">' + (list[i].zhifubaoNum !== null ? list[i].zhifubaoNum : '') + '</td>'
                    + '<td>' + (list[i].zhifubaoName !== null ? list[i].zhifubaoName : '') + '</td>'
                    + '<td>' + invitedNum + '</td>'
                    + '<td>' + list[i].reduceNum + '</td>'
                    + '<td>' + unitPrice + '</td>'
                    + '<td>' + moneyAmount + '</td>'
                    + '<td>已支付</td>'
                    + '<td>';
                if (invitedNum !== 0) {
                    li_html += '<button class="btn btn-info btn-sm btn-brokerage-show" data-agentid="' + list[i].agentId + '"  data-id="' + list[i].id + '" data-month="' + list[i].timeMonth + '">查看</button>'
                }
                li_html += '</td></tr>';
            }
        }
        $(".brokerage-body").html(li_html);
        brokerageSum();
    }

    function addbrokerageList(page, size, sortField, sortDirection, status, agentStatus, agentName, zhifubaoNum, zhifubaoName, startTime, endtime) {
        $('.deselect-all').prop('checked', false).removeClass('deselect-all').addClass('check-all');
        var data = {
            'agentName': agentName !== '' ? agentName : null,
            'zhifubaoNum': zhifubaoNum !== '' ? zhifubaoNum : null,
            'zhifubaoName': zhifubaoName !== '' ? zhifubaoName : null,
            'startTime': startTime ? (startTime + '-01') : null,
            'endtime': endtime ? (endtime + '-01') : null,
            'status': status !== '' ? Number(status) : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'agentStatus': Number(agentStatus),
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/agent/data/commissionQuery',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    brokerageList(resp.data.list, page, size);
                    brokerageCount = resp.data.totalCounts;
                    $('#brokerage-totalCounts').find('span').html(brokerageCount);
                    var total = (brokerageCount / $('#brokerage-size').val());
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#brokerage-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".brokerage-body").empty();
                            addbrokerageList(page, size, sortField, sortDirection, status, agentStatus, agentName, zhifubaoNum, zhifubaoName, startTime, endtime);
                        }
                    });
                }
            }
        });
    }

    function brokerageCheckTime() {
        var startTime = $("#brokerage-start-time").val();
        var endTime = $("#brokerage-end-time").val();
        if (startTime > endTime) {
            $('.brokerage-checktime').removeClass('hiddens');
        } else {
            $('.brokerage-checktime').addClass('hiddens');
        }
        if (startTime === '' || endTime === '') {
            $(".brokerage-checktime").addClass("hiddens");
        }
    }

    $('#brokerage-searchbtn').click(function () {
        if ($('#brokerage-pay-status').val() === '1') {
            $('.hebing').addClass('hide');
        } else {
            $('.hebing').removeClass('hide');
        }
        brokerageCheckTime();
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var agentName = $('#brokerage-agency-user').val(),
            startTime = $('#brokerage-start-time').val(),
            endtime = $('#brokerage-end-time').val(),
            zhifubaoNum = $('#brokerage-alipay-id').val(),
            zhifubaoName = $('#brokerage-alipay-name').val(),
            status = $('#brokerage-pay-status').val(),
            agentStatus = $('#brokerage-pay-agentStatus').val(),
            page = 1,
            size = Number($('#brokerage-size').val());
        addbrokerageList(page, size, sortField, sortDirection, status, agentStatus, agentName, zhifubaoNum, zhifubaoName, startTime, endtime);
    });
    $('#brokerage-size').change(function () {
        $('#brokerage-searchbtn').trigger('click');
    });
    $('.brokerage-body').on('click', '.btn-brokerage-show', function () {
        var id = $(this).data('id');
        $.ajax({
            type: "GET",
            url: '/APP-admin/agent/data/queryPayment?id=' + id,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    $('#brokerage-show-payid').html(resp.data.list.paymentAccount);
                    $('#brokerage-show-payname').html(resp.data.list.paymentName);
                    $('#brokerage-show-receiptid').html(resp.data.list.zhifubaoNum);
                    $('#brokerage-show-receiptname').html(resp.data.list.zhifubaoName);
                    $('#brokerage-show-time').html(resp.data.list.payTime);
                    $('#brokerage-show-money').html(resp.data.list.actualPay);
                    if (resp.data.months) {
                        var m = resp.data.months;
                        var str = '';
                        for (var i = 0; i < m.length; i++) {
                            str += m[i];
                            str += ';';
                        }
                        str += ('共' + i + '个月');
                        $('#brokerage-show-months').html(str);
                        $('.brokerage-show-months').removeClass('hide');
                    } else {
                        $('.brokerage-show-months').addClass('hide');
                    }
                    $('#brokerage-show-img').attr('src', resp.data.list.payOrder);
                    $('#brokerage-show-a').attr('href', resp.data.list.payOrder);
                    $('#brokerage-show-comment').html(resp.data.list.comment);
                    $('#brokerage-show-modal').modal();
                }
            }
        });
    })
    $('.brokerage-body').on('click', '.btn-brokerage-edit', function () {
        $(this).parents('tr').find('input[type="text"]').removeAttr('disabled');
        $(this).removeClass('btn-brokerage-edit').addClass('btn-brokerage-save').html('保存');
        $(this).siblings('button').attr('disabled', 'disabled');

    })
    $('.brokerage-body').on('click', '.btn-brokerage-save', function () {
        var id = $(this).data('id'),
            agentName = $(this).parents('tr').find('td:nth-child(4)').html(),
            count = $(this).parents('tr').find('td:nth-child(7)').html(),
            discount = $(this).parents('tr').find('.deduction-count').val(),
            price = $(this).parents('tr').find('.brokerage-price').val(),
            that = this;
        var reg1 = /^\d+$/g;
        var reg2 = /^\d+(.\d)?$/g;
        if (!reg1.test(discount)) {
            Lobibox.alert('warning', {
                msg: '扣减人数须填写非负整数!'
            })
            return;
        } else if (Number(discount) > Number(count)) {
            Lobibox.alert('warning', {
                msg: '扣减人数不得大于邀请用户总数!'
            })
            return;
        } else if (!reg2.test(price)) {
            Lobibox.alert('warning', {
                msg: '单价须填写非负整数或一位小数的浮点数!'
            })
            return;
        }
        Lobibox.confirm({
            msg: '请确认您输入的扣减邀请人数（<span class="font-red">' + discount + '人</span>）和佣金单价（<span class="font-red">'
                + price + '元/人</span>）正确，并将按照得出的应付佣金<span class="font-red">' + (Number(count) - Number(discount)) * Number(price)
                + '元</span>交付给代理（<span class="fweight600">' + agentName + '</span>）。',
            buttons: {
                yes: {
                    class: 'btn btn-info',
                    text: '确认'
                },
                no: {
                    class: 'btn btn-default',
                    text: '取消'
                }
            },
            callback: function ($this, type, ev) {
                if (type === "yes") {
                    $.ajax({
                        type: "GET",
                        url: '/APP-admin/agent/data/saveReduceNumAndPrice?id='
                            + Number(id) + '&reducePeople=' + Number(discount) + '&utilPrice=' + Number(price),
                        dataType: "json",
                        success: function (resp) {
                            if (resp.success) {
                                $(that).parents('tr').find('input[type="text"]').attr('disabled', 'disabled');
                                $(that).removeClass('btn-brokerage-save').addClass('btn-brokerage-edit').html('编辑');
                                $(that).siblings('button').removeAttr('disabled');
                                $(that).parents('tr').find('td:nth-child(10)').html((Number(count) - Number(discount)) * Number(price));
                                brokerageSum();
                                Lobibox.notify('success', {
                                    msg: '编辑修改成功!',
                                    sound: false,
                                    delay: 1000
                                })
                            } else {
                                Lobibox.notify('error', {
                                    msg: resp.msg,
                                    sound: false,
                                    delay: 1000
                                })
                            }
                        }
                    });
                }
            }
        });
    })
    $('.brokerage-body').on('click', '.btn-brokerage-pay', function () {
        var id = $(this).data('id');
        $('.brokerage-pay-alipayid').val('');
        $('.brokerage-pay-alipayname').val('');
        $('.brokerage-pay-receiptid').html($(this).parents('tr').find('td:nth-child(5)').html());
        $('.brokerage-pay-receiptname').html($(this).parents('tr').find('td:nth-child(6)').html());
        $('.brokerage-pay-total').html($(this).parents('tr').find('td:nth-child(10)').html());
        $('.brokerage-pay-id').val($(this).data('id'));
        $('.brokerage-pay-agentid').val($(this).data('agentid'));
        $('#brokerage-pay-modal .brokerage-pay-img').val('');
        $('#brokerage-pay-modal .btn-brokerage-file').val('');
        $('#brokerage-pay-comment').val('');
        $('#brokerage-pay-modal').modal();

    })
    $('#btn-brokerage-pay').click(function () {
        var paymentAccount = $('#brokerage-pay-modal').find('.brokerage-pay-alipayid').val(),
            paymentName = $('#brokerage-pay-modal').find('.brokerage-pay-alipayname').val(),
            paymentImg = $('#brokerage-pay-modal').find('.brokerage-pay-img').val();
        if (paymentAccount === '' || paymentName === '' || paymentImg === '') {
            Lobibox.alert('warning', {
                msg: '*为必填项'
            })
            return;
        }

        var data = {
            'agentId': $('.brokerage-pay-agentid').val(),
            'paymentAccount': paymentAccount,
            'paymentName': paymentName,
            'zhifubaoNum': $('.brokerage-pay-receiptid').html(),
            'zhifubaoName': $('.brokerage-pay-receiptname').html(),
            'actualPay': $('.brokerage-pay-total').html(),
            'payOrder': paymentImg,
            'awardRecordids': [$('.brokerage-pay-id').val()],
            'comment': $('#brokerage-pay-comment').val()
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/agent/data/savePaymentCredent',
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    $('#brokerage-pay-modal').modal('hide');
                    $('#brokerage-searchbtn').trigger('click');
                    Lobibox.notify('success', {
                        msg: '支付记录保存成功！',
                        sound: false,
                        delay: 1000
                    })
                } else {
                    Lobibox.notify('error', {
                        msg: resp.msg,
                        sound: false,
                        delay: 1000
                    })
                }
            }
        });

    })
    $('.btn-brokerage-mergepay').on('click', function () {
        var list = $('.brokerage-body').find('input[type="checkbox"]:checked');
        if (list.length === 0 || list.length === 1) {
            Lobibox.alert('warning', {
                msg: '请选择要合并支付的数据!'
            })
            return;
        }
        for (var i = 0, len = list.length; i < len - 1; i++) {
            if ($(list[i]).data('id') !== $(list[i + 1]).data('id')) {
                Lobibox.alert('warning', {
                    msg: '请勾选同一代理用户的数据进行合并支付，多个代理数据结算请分开支付！'
                })
                return;
            }
        }
        for (var i = 0, len = list.length; i < len; i++) {
            if ($(list[i]).parents('tr').find('.btn-brokerage-edit').length === 0) {
                Lobibox.alert('warning', {
                    msg: '请保存正在编辑的选项！'
                })
                return;
            }
        }
        var month = '', monthcount = 0, totalmoney = 0, ids = '';
        for (var i = 0, len = list.length; i < len; i++) {
            month += $(list[i]).parents('tr').find('td:nth-child(3)').html();
            month += ';';
            totalmoney += Number($(list[i]).parents('tr').find('td:nth-child(10)').html());
            monthcount++;
            ids += $(list[i]).parents('tr').data('id');
            if (i < len - 1) {
                ids += ',';
            }
        }
        var that = list[0];
        $('.brokerage-mergepay-alipayid').val('');
        $('.brokerage-mergepay-alipayname').val('');
        $('.brokerage-mergepay-receiptid').html($(that).parents('tr').find('td:nth-child(5)').html());
        $('.brokerage-mergepay-receiptname').html($(that).parents('tr').find('td:nth-child(6)').html());
        $('.brokerage-mergepay-total').html(totalmoney);
        $('#brokerage-mergepay-modal .brokerage-pay-img').val('');
        $('#brokerage-mergepay-modal .btn-brokerage-file').val('');
        $('#brokerage-mergepay-comment').val('');
        $('.brokerage-mergepay-months').html(month);
        $('.brokerage-mergepay-ids').val(ids);
        $('.brokerage-mergepay-id').val($(that).parents('tr').find('.btn-brokerage-pay').data('agentid'));
        $('.brokerage-mergepay-monthscount').html(monthcount);
        $('#brokerage-mergepay-modal').modal();

    })
    $('#btn-brokerage-mergepay').click(function () {
        var paymentAccount = $('#brokerage-mergepay-modal').find('.brokerage-mergepay-alipayid').val(),
            paymentName = $('#brokerage-mergepay-modal').find('.brokerage-mergepay-alipayname').val(),
            paymentImg = $('#brokerage-mergepay-modal').find('.brokerage-pay-img').val();
        if (paymentAccount === '' || paymentName === '' || paymentImg === '') {
            Lobibox.alert('warning', {
                msg: '*为必填项'
            })
            return;
        }
        var ids = $('.brokerage-mergepay-ids').val().split(',');
        var data = {
            'agentId': $('.brokerage-mergepay-id').val(),
            'paymentAccount': paymentAccount,
            'paymentName': paymentName,
            'zhifubaoNum': $('.brokerage-mergepay-receiptid').html(),
            'zhifubaoName': $('.brokerage-mergepay-receiptname').html(),
            'actualPay': $('.brokerage-mergepay-total').html(),
            'payOrder': paymentImg,
            'awardRecordids': ids,
            'comment': $('#brokerage-mergepay-comment').val()
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/agent/data/savePaymentCredent',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    $('#brokerage-mergepay-modal').modal('hide');
                    $('#brokerage-searchbtn').trigger('click');
                    Lobibox.notify('success', {
                        msg: '合并支付记录保存成功！',
                        sound: false,
                        delay: 1000
                    })
                } else {
                    Lobibox.notify('error', {
                        msg: resp.msg,
                        sound: false,
                        delay: 1000
                    })
                }
            }
        });

    })
    $('.brokerage-foot').on('click', '.check-all', function () {
        $(this).removeClass('check-all').addClass('deselect-all');
        $('.brokerage-body').find('.check-line').prop('checked', true);
    })
    $('.brokerage-foot').on('click', '.deselect-all', function () {
        $(this).removeClass('deselect-all').addClass('check-all');
        $('.brokerage-body').find('.check-line').prop('checked', false);
    })
    $('.brokerage-body').on('click', '.check-line', function () {
        if ($('.deselect-all')) {
            $('.deselect-all').prop('checked', false).removeClass('deselect-all').addClass('check-all');

        }

    })
    // 上传支付凭证
    $('.btn-brokerage-file').on('change', function () {
        var _self = this;
        var file = this.files[0];
        //判断是否是图片类型
        if (!/image\/\w+/.test(file.type)) {
            Lobibox.alert("warning", {
                msg: '只能选择图片'
            });
            return false;
        } else if (file.size > 5242880) {
            Lobibox.alert("warning", {
                msg: '上传图片须小于5M'
            });
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = new Image,
                canvas = document.createElement("canvas"),
                drawer = canvas.getContext("2d");
            img.src = this.result;
            var image_base64 = img.src.split(",")[1];
            image_base64 = image_base64.replace("data:image/png;base64,", "");
            var pictureindex = img.src.indexOf(',');
            var picture = img.src.substring(pictureindex + 1);
            var parameter = {name: file.name, picture: picture}
            $.ajax({
                type: "POST",
                url: imageServer + "/upload/pic",
                cache: false,
                data: parameter,
                async: true,
                success: function (url) {
                    $(_self).parent().prev().find('input').val(url.data);

                }
            });
        }
    })

    //合计栏统计
    function brokerageSum() {
        var totalcount = discount = brokerage = 0;
        $('.brokerage-body').find('tr td:nth-child(7)').each(function (i, v) {
            totalcount += Number($(v).html());
        })
        $('.brokerage-body').find('tr td:nth-child(8)').each(function (i, v) {
            if ($(v).find('input').length === 0) {
                discount += Number($(v).html());
            } else {
                discount += Number($(v).find('input').val());
            }

        })
        $('.brokerage-body').find('tr td:nth-child(10)').each(function (i, v) {
            brokerage += Number($(v).html());
        })
        $('.foot-invite-total').html(totalcount);
        $('.foot-discount').html(discount);
        $('.foot-brokerage').html(brokerage);
    }

    /*****************推送消息改版*******************/
    //获取管理员列表
    function getUserList() {
        var url = "/APP-admin/user/admin/list";
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    var list = resp.data;
                    var li_html = "<option value=''>--请选择--</option>";
                    for (var i = 0; i < list.length; i++) {
                        var groupId = list[i].id;
                        var groupName = list[i].userName;
                        var status = list[i].userType;
                        if (status === '1' || status === '2') {
                            li_html += "<option value='" + groupId
                                + "'>" + groupName
                                + "</option>";
                        }
                    }
                    $("#push-message-user").html(li_html);
                }
            }
        });
    }

    //加载推送消息列表
    function loadPutList(list) {
        var li_html = "";
        var pushType = {
            '1': '个人',
            '2': '多人',
            '3': '用户组',
            '4': '全部',
            '5': '策略'
        };
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr><td>' + list[i].id + '</td>'
                + '<td>' + list[i].createTime + '</td>'
                + '<td>' + pushType[list[i].type] + '</td>'
                + '<td>' + list[i].pushUserName + '</td>'
                + '<td>'
                + '<button data-id="' + list[i].id + '" data-type="' + list[i].type + '" data-save="' + list[i].saveMessage + '" data-linktype="' + list[i].categoryId + '" '
                + 'class="btn btn-sm btn-primary push-message-show">详情</button>'
                + '</td></tr>';
        }
        $(".push-message-body").html(li_html);
    }

    // 获取推送消息列表
    function getPutList(page, size, messageId, pushUserId, type, startTime, endTime) {
        var data = {
            'messageId': messageId !== '' ? Number(messageId) : null,
            'pushUserId': pushUserId !== '' ? Number(pushUserId) : null,
            'type': type !== '' ? Number(type) : null,
            'startTime': startTime !== '' ? startTime : null,
            'endTime': endTime !== '' ? endTime : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/push/data/pushMessage',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    loadPutList(resp.data.list);
                    pushTotalCount = resp.data.totalCounts;
                    $('#push-message-totalCounts').find('span').html(pushTotalCount);
                    var total = (pushTotalCount / Number(size));
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#push-message-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".push-message-body").empty();
                            getPutList(page, size, messageId, pushUserId, type, startTime, endTime);
                        }
                    });
                }
            }
        });
    }

    function checkPushTime() {
        var startTime = $('#push-start-time').val();
        var endTime = $('#push-end-time').val();
        if (startTime > endTime) {
            $('.push-checktime').removeClass('hiddens');
        } else {
            $('.push-checktime').addClass('hiddens');
        }
        if (startTime === '' || endTime === '') {
            $('.push-checktime').addClass('hiddens');
        }
    }

    //查询推送消息列表
    $('#push-message-searchbtn').click(function () {
        checkPushTime();
        $(".push-message-body").empty();
        var messageId = $('#push-message-num').val(),
            pushUserId = $('#push-message-user').val(),
            type = $('#push-message-type').val(),
            startTime = $('#push-start-time').val(),
            endTime = $('#push-end-time').val(),
            page = 1,
            size = $('#push-message-size').val();
        getPutList(page, size, messageId, pushUserId, type, startTime, endTime);
    });
    $('#push-message-size').on('change', function () {
        $('#push-message-searchbtn').trigger('click');
    })
    // 查看推送消息详情
    $('.push-message-body').on('click', '.push-message-show', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');
        var save = $(this).data('save');
        var linktype = $(this).data('linktype');
        var pushType = {
            '1': '个人',
            '2': '多人',
            '3': '用户组',
            '4': '全部',
            '5': '策略'
        };
        $.ajax({
            type: 'GET',
            url: '/APP-admin/push/data/pushMessageDetails?id=' + id,
            dataType: 'json',
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    $('#push-detail-batch-id').html(data.id);
                    $('#push-detail-type').html(pushType[data.type]);
                    $('#push-detail-sendtime').html(data.createTime);
                    $('#push-detail-creater').html(data.pushUserName);
                    $('#push-detail-count').html(data.userCount);
                    $('#push-detail-usergroup').html(data.userGroupName);
                    $('#push-detail-strategy').html("");
                    $('#push-detail-userlist').html(data.userNameList.toString());
                    $('#push-detail-saveMessage').html(data.saveMessage === 1 ? '保存' : '不保存');
                    $('#push-detail-categoryId').html(data.categoryId === 8 ? '策略消息' : '系统消息');
                    $('#push-detail-lookMessage').html(data.lookMessage === 0 ? '是' : '否');
                    $('#push-detail-modelName').html(data.modelName !== null ? data.modelName : '跳转至首页');
                    $('#push-detail-uri').html(data.uri !== null ? data.uri : '跳转至首页');
                    $('#push-detail-title').html(data.title);
                    $('#push-detail-content').html(data.content);
                }
            }
        });
        if (type == '1') {
            $('.detailtype1').addClass('hide');
            $('.detailtype2').addClass('hide');
            $('.detailtype3').addClass('hide');
            $('.detailtype0').removeClass('hide');
        } else if (type == '2') {
            $('.detailtype0').addClass('hide');
            $('.detailtype2').addClass('hide');
            $('.detailtype3').addClass('hide');
            $('.detailtype1').removeClass('hide');
        } else if (type == '3') {
            $('.detailtype0').addClass('hide');
            $('.detailtype1').addClass('hide');
            $('.detailtype3').addClass('hide');
            $('.detailtype2').removeClass('hide');
        } else if (type == '4') {
            $('.detailtype0').addClass('hide');
            $('.detailtype2').addClass('hide');
            $('.detailtype1').addClass('hide');
            $('.detailtype3').addClass('hide');
        } else if (type == '5') {
            $('.detailtype0').addClass('hide');
            $('.detailtype1').addClass('hide');
            $('.detailtype2').addClass('hide');
            $('.detailtype3').removeClass('hide');
        }
        if (save == '1') {
            $('.yesall').removeClass('hide');
        } else {
            $('.yesall').addClass('hide');
        }
        if (linktype == '8') {
            $('.yes1').addClass('hide');
            $('.yes0').removeClass('hide');
        } else if (linktype == '6') {
            $('.yes0').addClass('hide');
            $('.yes1').removeClass('hide');
        } else {
            $('.yes0').addClass('hide');
            $('.yes1').removeClass('hide');
        }
        $('#push-detail-modal').modal();
    })
    // 添增消息推送modal
    $('#push-message-addbtn').click(function () {
        $('#add-push-modal').find('input[type="text"]').val('');
        $('#add-push-modal').find('textarea').val('');
        $('.add-push-type').find('input:first-child').trigger('click');
        $('.add-push-savelist').find('input:first-child').trigger('click');
        $('.add-push-msgtype').find('input:first-child').trigger('click');
        $('.isjump-home').prop('checked', false)
        $('.add-push-showdetail').find('input:first-child').trigger('click');
        $('#add-push-modal').modal();
    });
    $('.add-push-type').on('click', 'input', function () {
        var val = $(this).val();
        $('#add-push-selper').empty();
        if (val === '1') {
            $('.type1').addClass('hide');
            $('.type2').addClass('hide');
            $('.type3').addClass('hide');
            $('.type0').removeClass('hide');
            $('#add-push-percount').html('0');
        } else if (val === '2') {
            $('.type0').addClass('hide');
            $('.type2').addClass('hide');
            $('.type3').addClass('hide');
            $('.type1').removeClass('hide');
            $('#add-push-percount').html('0');
            $('#btn-addpush-file').val('');
        } else if (val === '3') {
            $('.type0').addClass('hide');
            $('.type1').addClass('hide');
            $('.type3').addClass('hide');
            $('.type2').removeClass('hide');
            $('#add-push-percount').html('0');
        } else if (val === '5') {
            $('.type0').addClass('hide');
            $('.type1').addClass('hide');
            $('.type2').addClass('hide');
            $('.type3').removeClass('hide');
            $('#add-push-percount').html('0');
            $('#add-push-strategy1').html(modelsHtml);
        } else if (val === '4') {
            $('.type1').addClass('hide');
            $('.type2').addClass('hide');
            $('.type0').addClass('hide');
            $('.type3').addClass('hide');
            $.ajax({
                url: '/APP-admin/user/count',
                type: 'GET',
                dataType: 'json',
                timeout: 8000,
                success: function (resp) {
                    if (resp.success) {
                        $('#add-push-percount').html(resp.data);
                    }
                }
            })
        }
    })
    $('.add-push-savelist').on('click', 'input', function () {
        var val = $(this).val();
        if (val === '1') {
            $('.savelist1').addClass('hide');
            $('.savelist0').removeClass('hide');
        } else if (val === '0') {
            $('.savelist0').addClass('hide');
            $('.savelist1').removeClass('hide');
        }
    })
    $('.add-push-msgtype').on('click', 'input', function () {
        var val = $(this).val();
        if (!$('.isjump-home')[0].checked) {
            $('#jump-link').removeAttr('disabled');
            if (val === '8') {
                $('.msgtype1').addClass('hide');
                $('.msgtype0').removeClass('hide');
            } else if (val === '6') {
                $('.msgtype0').addClass('hide');
                $('.msgtype1').removeClass('hide');
            }
        } else {
            $('.msgtype0').addClass('hide');
            $('.msgtype1').removeClass('hide');
            $('#jump-link').attr('disabled', 'disabled');
        }
    })
    $('.isjump-home').click(function () {
        if ($(this)[0].checked) {
            $('#jump-link').val('').attr('disabled', 'disabled');
            $('.msgtype0').addClass('hide');
            $('.msgtype1').removeClass('hide');
        } else {
            $('#jump-link').removeAttr('disabled');
            if ($('.add-push-msgtype').find('input:checked').val() === '8') {
                $('.msgtype1').addClass('hide');
                $('.msgtype0').removeClass('hide');
            }
        }
    })
    // 补全用户名
    $('#add-push-per').typeahead({
        source: function (query, process) {
            var arr = [["userName", query], ["startTime", ''],
                ["endTime", ''], ["recordType", ''],
                ["operator", ''], ["loginTimes", '']];
            var urls = getUrl(arr);
            var url = '/APP-admin/user/getUserList?' + urls + '&'
                + Math.random();
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                timeout: 8000,
                success: function (data) {
                    var list = data.data.list;
                    var users = [];
                    if (list.length === 0) {
                        users.push('');
                        $('#add-push-per').val('');
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
    //添加用户
    $('.btn-add-pushuser').click(function () {
        var coinPer = $('#add-push-per').val();
        var coinuser = $('#add-push-selper').html();
        var userArray = coinuser.split(',');
        var mobile = /^\d+$/;
        var isExist = false;
        var type = $('.add-push-type').find('input[type="radio"]:checked').val();
        var num = userArray.length;
        if ($.trim(coinPer) !== '') {
            if (type === '1') {
                $('#add-push-selper').html(coinPer);
                $('#add-push-percount').html(1);
            } else if (type === '2') {
                for (var i = 0; i < userArray.length; i++) {
                    if (coinPer === $(userArray[i]).text()) {
                        isExist = true;
                        break;
                    }
                }
                if ($.trim(coinuser) === '') {
                    $('#add-push-selper').html('<span class="del-user">' + coinPer + '<i class="glyphicon glyphicon-remove"></i></span>');
                    $('#add-push-percount').html(1);
                } else if (!isExist) {
                    $('#add-push-selper').html(coinuser + '<span>,</span>' + '<span class="del-user">' + coinPer + '<i class="glyphicon glyphicon-remove"></i></span>');
                    $('#add-push-percount').html(num + 1);
                } else {
                    Lobibox.alert('error', {
                        'msg': '已添加，不需要再添加'
                    });
                }
            }

        }
        $('#add-push-per').val('');
    });
    //添加用户组
    $('.add-push-usergroup-btn').click(function () {
        var coinPer = $('#add-push-usergroup').val();
        var coinuser = $('#add-push-selper').html();
        if ($.trim(coinuser) === '') {
            $('#add-push-usergroup-hide').val(coinPer);
            $('#add-push-usergroup-hide').data('name', $('#add-push-usergroup option:selected').text());
            getUserByGroupId(coinPer);
        } else {
            Lobibox.alert('error', {
                'msg': '只能添加一组用户组'
            })
        }
        $('#add-push-percount').html($('#add-push-selper').html().split(',').length);
    });
    //添加策略中用户组
    $('.add-push-strategy-btn1').click(function () {
        $.ajax({
            type: 'GET',
            url: '/APP-admin/user/getUserByModelSubScribe?modelId=' + $('#add-push-strategy1').val(),
            dataType: 'json',
            success: function (resp) {
                if (resp.data && resp.data.length > 0) {
                    var groupUserHtml = "";
                    resp.data.forEach((ele, i) => {
                        groupUserHtml += ele + ','
                    })
                    groupUserHtml = groupUserHtml.slice(0, groupUserHtml.length - 1);
                    $("#add-push-selper").html(groupUserHtml);
                    $("#add-push-percount").html(resp.data.length);
                } else {
                    Lobibox.alert('error', {
                        'msg': '该策略下无用户'
                    });
                }
            },
            error: function (err) {
                Lobibox.alert('error', {
                    'msg': err.message
                });
            }
        })
    })

    //获取用户组中的用户
    function getUserByGroupId(groupId) {
        var page = 0;
        var size = 100000;
        var htmll = '';
        $.ajax({
            type: "GET",
            url: '/APP-admin/user/getUserByGroupId?groupId='
                + groupId + '&page=' + page + '&size=' + size
                + '&rnd=' + Math.random(),
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            timeout: 8000,
            success: function (resp) {
                if (resp.success) {
                    var list = resp.data.list;
                    var len = list.length;
                    if (resp.data.totalCount === 0) {
                        return;
                    }
                    $.each(list, function (i, v) {
                        htmll = htmll + '' + v.userName;
                        if (i < len - 1) {
                            htmll += ',';
                        }
                    });
                    $('#add-push-selper').html(htmll);
                }
            }
        });
    }

    //批量上传筛选已添加的用户
    function addPushBatchfilter(user) {
        var userlist = $.trim($('#add-push-selper').html());
        var msg = true;
        if (userlist !== '') {
            var userArr = userlist.split(',');
            $.each(userArr, function (i, v) {
                if (user === $(v).text()) {
                    msg = false;
                    return;
                }
            })
            return msg;
        } else {
            return true;
        }
    }

    //批量上传
    $('#btn-addpush-file').on('change', function () {
        var that = this;
        var files = this.files[0];
        if (files.name.indexOf('.csv') === -1) {
            Lobibox.alert('error', {
                'msg': '请上传csv格式文件'
            })
        } else {
            var form = new FormData();
            form.append('csvFile', files);
            $.ajax({
                url: '/APP-admin/data/import/csv/phone',
                data: form,
                method: 'POST',
                contentType: false,
                processData: false,
                success: function (resp) {
                    if (resp.success) {
                        var list = resp.data;
                        var len = list.length;
                        var phone = '';
                        var slen = 0;
                        $.each(list, function (i, v) {
                            if (addPushBatchfilter(v)) {
                                phone = phone + '' + '<span class="del-user">' + v + '<i class="glyphicon glyphicon-remove"></i></span>';
                                if (i < len - 1) {
                                    phone += '<span>,</span>';
                                }
                                slen++;
                            }
                        })
                        if (phone === '') {
                            return;
                        } else if (phone.lastIndexOf(',') === phone.length - 8) {
                            phone = phone.substring(0, phone.length - 14);
                        }

                        if ($.trim($('#add-push-selper').html()) === '') {
                            $('#add-push-selper').html(phone);
                        } else {
                            phone = '<span>,</span>' + phone;
                            $('#add-push-selper').append(phone);
                        }
                        $('#add-push-percount').html(Number($('#add-push-percount').html()) + slen);
                        $('#btn-addpush-file').val('');
                    }
                }
            });
        }
    });
    //多选时单用户删除功能
    $('#add-push-selper').on('click', '.del-user i', function (e) {
        if ($(e.target).parent('.del-user').next().text() === ',') {
            $(e.target).parent('.del-user').next().remove();
        } else if ($(e.target).parent('.del-user').prev().text() === ',') {
            $(e.target).parent('.del-user').prev().remove();
        }
        $(e.target).parent('.del-user').remove();
        $('#add-push-percount').html(Number($('#add-push-percount').html()) - 1);
    });

    //字数统计功能
    function wordCount(element, n) {
        var num = element.val().length;
        var leftNum = n - num < 0 ? 0 : n - num;
        element.siblings('p').find('span').html(leftNum);
    }

    $('#add-push-content1').on('keyup', function () {
        wordCount($(this), 100);
    })
    $('#add-push-content2').on('keyup', function () {
        wordCount($(this), 30);
    })

    //获取多人推送发送人列表
    function getPushReceivers(list) {
        var rec = [];
        var len = list.length;
        for (var i = 0; i < len; i++) {
            rec.push($(list[i]).text());
        }
        return rec;
    }

    //推送按钮
    $('#add-push-btn').click(function (e) {
        e.preventDefault();
        $('#add-push-btn').attr("disabled", true);
        var type = $('.add-push-type').find('input:checked').val(),
            selectedUsers = $('#add-push-selper').html(),
            saveMessage = $('.add-push-savelist').find('input:checked').val(),
            title = $('#add-push-title').val(),
            content1 = $('#add-push-content1').val(),
            content2 = $('#add-push-content2').val(),
            categoryId = $('.add-push-msgtype').find('input:checked').val(),
            modelId = $('#add-push-strategy').val(),
            uri = $('#jump-link').val(),
            lookMessage = $('.add-push-showdetail').find('input:checked').val(),
            isJumpHome = $('.isjump-home:checked').length !== 0 ? true : false;
        var data = {
            pushUserId: Number(id),
            type: Number(type),
            categoryId: Number(categoryId),
            saveMessage: Number(saveMessage)
        };
        var url;
        if (saveMessage === '1') {
            if ($.trim(title) === '') {
                Lobibox.alert('warning', {
                    msg: '推送标题不能为空！'
                });
                return;
            } else if ($.trim(content1) === '') {
                Lobibox.alert('warning', {
                    msg: '推送内容不能为空！'
                });
                return;
            } else if (!isJumpHome && categoryId === '6' && $.trim(uri) === '') {
                Lobibox.alert('warning', {
                    msg: '跳转链接不能为空！'
                });
                return;
            }
            data.title = title;
            data.content = content1;
            data.lookMessage = Number(lookMessage);
        } else {
            if ($.trim(content2) === '') {
                Lobibox.alert('warning', {
                    msg: '推送内容不能为空！'
                });
                return;
            } else if (!isJumpHome && categoryId === '6' && $.trim(uri) === '') {
                Lobibox.alert('warning', {
                    msg: '跳转链接不能为空！'
                });
                return;
            }
            data.title = null;
            data.content = content2;
            data.lookMessage = 1;
        }
        if (!isJumpHome) {
            if (categoryId === '6') {
                data.modelId = 0;
                data.uri = uri;
            } else {
                data.modelId = Number(modelId);
                data.uri = null;
            }
        } else {
            data.modelId = 0;
            data.uri = null;
        }
        if (type === '1' || type === '2') {
            if ($.trim(selectedUsers) === '') {
                Lobibox.alert('warning', {
                    msg: '请选择要推送的用户！'
                });
                return;
            }
            if (type === '1') {
                data.uids = [$('#add-push-selper').html()];
            } else {
                data.uids = getPushReceivers($('#add-push-selper').find('.del-user'));
            }
            url = '/APP-admin/push/users';
        } else if (type === '3') {
            if ($.trim(selectedUsers) === '') {
                Lobibox.alert('warning', {
                    msg: '请选择要推送的用户！'
                });
                return;
            }
            data.gid = Number($('#add-push-usergroup-hide').val());
            data.userGroupName = $('#add-push-usergroup-hide').data('name');
            url = '/APP-admin/push/group';
        } else if (type === '4') {
            url = '/APP-admin/push/all';
        } else if (type === '5') {
            if ($.trim(selectedUsers) === '') {
                Lobibox.alert('warning', {
                    msg: '请选择要推送的用户！'
                });
                return;
            }
            if (selectedUsers.indexOf(',') > -1) {
                data.userIds = selectedUsers.split(',');
            } else {
                data.userIds = [selectedUsers];
            }
            url = '/APP-admin/push/modelSubScribeUsers';
        }
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    $('#add-push-modal').modal('hide');
                    $('#push-message-searchbtn').trigger('click');
                    Lobibox.notify('success', {
                        msg: '消息推送成功',
                        sound: false,
                        delay: 1000
                    });
                    $('#add-push-btn').attr("disabled", false);
                } else {
                    Lobibox.notify('error', {
                        msg: resp.msg,
                        sound: false
                    });
                    $('#add-push-btn').attr("disabled", false);
                }
            }
        });
    });
    // 推送消息导出
    $('#btn-push-message-export').click(function () {
        var data;
        if ($('#push-message-page').val() === '0') {
            data = {
                'messageId': $('#push-message-num').val(),
                'startTime': $('#push-start-time').val(),
                'endTime': $('#push-end-time').val(),
                'type': $('#push-message-type').val(),
                'pushUserId': $('#push-message-user').val(),
                'page': isNaN(Number($('#push-message-pages ul li.active a').html())) ? 1 : Number($('#push-message-pages ul li.active a').html()),
                'size': Number($('#push-message-size').val())
            };
        } else {
            data = {
                'messageId': $('#push-message-num').val(),
                'startTime': $('#push-start-time').val(),
                'endTime': $('#push-end-time').val(),
                'type': $('#push-message-type').val(),
                'pushUserId': $('#push-message-user').val()
            };
        }
        var inputs = '';
        for (var key in data) {
            inputs += '<input type="hidden" name="' + key + '" value="' + data[key] + '" />';
        }
        ;
        $('<form action="/APP-admin/push/data/pushMessage/export" accept-charset="UTF-8" method="GET">'
            + inputs + '</form>').appendTo('body').submit().remove();
    })

    /*************************大屏广告****************************/
    // 获取大屏广告列表
    function addBigAdtable(list, page) {
        var li_html = "";
        var startStatus = {
            '0': '禁用',
            '1': '启用'
        };
        var userOrVisitor = {
            '0': '游客',
            '1': '登录用户',
            '2': '全部用户'
        };
        var num = (page - 1) * 10 + 1;
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td>' + (num++) + '</td>'
                + '<td>' + list[i].title + '</td>'
                + '<td class="word-break">' + list[i].photoUrl.slice(0, 18) + '<span class="big-ad-show">...</span><span class="hide">' + list[i].photoUrl.slice(18) + '</span></td>'
                + '<td>' + list[i].typeName + '</td>';
            if (list[i].returnUrl && list[i].returnUrl.length > 10) {
                li_html += '<td class="word-break">' + list[i].returnUrl.slice(0, 18) + '<span class="big-ad-show">...</span><span class="hide">' + list[i].returnUrl.slice(18) + '</span></td>';
            } else if (list[i].returnUrl !== null) {
                li_html += '<td>' + list[i].returnUrl + '</td>';
            } else {
                li_html += '<td></td>';
            }
            // 弹出规则
            if(list[i].days === -1){
                var rule = '每次打开APP均弹出';
            }else if(list[i].days === 1){
                var rule = '当天首次打开APP弹出';
            }else if(list[i].days > 1){
                var rule = '用户连续'+ list[i].days +'天及以上未登录APP弹出';
            }
            li_html += '<td>'
                + '	<span class="big-ad-span" data-val="' + list[i].status + '">' + startStatus[list[i].status] + '</span>'
                + '	<select name="" id="" class="hide custom-select big-ad-input big-ad-status">'
                + '		<option value="0">禁用</option>'
                + '		<option value="1">启用</option>'
                + '	</select>'
                + '</td>'
                + '<td>'
                + '	<span class="big-ad-span" data-val="' + list[i].userOrVisitor + '">' + userOrVisitor[list[i].userOrVisitor] + '</span>'
                + '	<select name="" id="" class="hide custom-select big-ad-input big-ad-people">'
                + '		<option value="0">游客</option>'
                + '		<option value="1">登录用户</option>'
                + '    <option value="2">全部用户</option>'
                + '	</select>'
                + '</td>'
                + '<td>'
                + '	<span class="big-ad-span" data-val="' + list[i].days + '">' + rule + '</span>'
                + '	<input type="number" class="hide form-control big-ad-input big-ad-day">'
                + '</td>'
                + '<td>'
                + '	<button class="btn btn-primary btn-sm big-ad-edit" data-id="' + list[i].id + '">编辑</button>';
            if (list[i].status === 0) {
                li_html += ' 	<button class="btn btn-danger btn-sm big-ad-delete" data-id="' + list[i].id + '">删除</button>';
            }
            li_html += '</td></tr>';
        }
        $(".big-ad-tbody").html(li_html);
    }

    function getBigAdList(page, size) {
        $.ajax({
            type: "POST",
            url: '/APP-admin/advert/data/login',
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                page: Number(page),
                size: Number(size)
            }),
            success: function (resp) {
                if (resp.success) {
                    addBigAdtable(resp.data.list, page);
                    bigAdCount = resp.data.totalCounts;
                    $('#big-ad-totalCounts').find('span').html(bigAdCount);
                    var total = (bigAdCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#big-ad-page").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".big-ad-tbody").empty();
                            getBigAdList(page, 10);
                        }
                    });
                }
            }
        });
    }

    //大屏广告表格操作
    $('.big-ad-tbody').on('click', '.big-ad-show', function () {
        $(this).addClass('hide').next().removeClass('hide');
    }).on('click', '.big-ad-edit', function () {
        $(this).parents('tr').find('.big-ad-span').addClass('hide');
        $(this).parents('tr').find('.big-ad-input').each(function (i, v) {
            $(this).val($(this).siblings('span').data('val'));
        });
        $(this).parents('tr').find('.big-ad-input').removeClass('hide');
        $(this).removeClass('big-ad-edit btn-primary').addClass('big-ad-save btn-success').text('保存');
    }).on('click', '.big-ad-save', function () {
        var that = this;
        var id = $(this).data('id');
        var status = $(this).parents('tr').find('.big-ad-status').val();
        var people = $(this).parents('tr').find('.big-ad-people').val();
        var day = $(this).parents('tr').find('.big-ad-day').val();
        var updateObj = {
            id: id,
            status: Number(status),
            userOrVisitor: Number(people),
            days: Number(day)
        };
        $.ajax({
            type: 'POST',
            url: '/APP-admin/advert/data/update',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(updateObj),
            success: function (resp) {
                if (resp.success) {
                    if (resp.data === '1') {
                        getBigAdList(1, 10);
                        Lobibox.notify('success', {
                            msg: "编辑成功!",
                            width: 400,
                            sound: false,
                            delay: 1000
                        });
                    } else if (resp.data === '0') {
                        Lobibox.confirm({
                            msg: "本主题状态与其他主题状态有冲突，请禁用相关主题状态后启用本主题",
                            buttons: {
                                yes: {
                                    class: 'btn btn-primary',
                                    text: '禁用其他并启用本主题'
                                },
                                no: {
                                    class: 'btn btn-default',
                                    text: '取消操作'
                                }
                            },
                            callback: function ($this, type, ev) {
                                if (type === "yes") {
                                    $.ajax({
                                        type: 'POST',
                                        url: '/APP-admin/advert/data/disableForUpdate',
                                        dataType: 'json',
                                        contentType: 'application/json;charset=utf-8',
                                        data: JSON.stringify(updateObj),
                                        success: function (resp) {
                                            if (resp.success) {
                                                getBigAdList(1, 10);
                                                Lobibox.notify('success', {
                                                    msg: "编辑成功!",
                                                    width: 400,
                                                    sound: false,
                                                    delay: 1000
                                                });
                                            } else {
                                                Lobibox.notify('error', {
                                                    msg: resp.msg,
                                                    width: 400,
                                                    sound: false
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    getBigAdList(1, 10);
                                }
                            }
                        });
                    }
                } else {
                    Lobibox.notify('error', {
                        msg: data.msg,
                        width: 400,
                        sound: false
                    });
                }
            }
        });
    }).on('click', '.big-ad-delete', function () {
        var id = $(this).data('id');
        Lobibox.confirm({
            msg: "确认删除本主题相关内容吗?",
            buttons: {
                yes: {
                    class: 'btn btn-primary',
                    text: '确定'
                },
                no: {
                    class: 'btn btn-default',
                    text: '取消'
                }
            },
            callback: function ($this, type, ev) {
                if (type === "yes") {
                    $.ajax({
                        url: '/APP-admin/advert/data/delete?id=' + Number(id),
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            if (data.success) {
                                getBigAdList(1, 10);
                                Lobibox.notify('success', {
                                    msg: "删除成功!",
                                    width: 400,
                                    sound: false,
                                    delay: 1000
                                });
                            } else {
                                Lobibox.notify('error', {
                                    msg: data.msg,
                                    width: 400,
                                    sound: false
                                });
                            }
                        }
                    });
                }
            }
        });
    })
    //新增大屏广告
    // 上传图片
    $('.btn-addbigad-file').on('change', function () {
        var _self = this;
        var file = this.files[0];
        if (!/image\/\w+/.test(file.type)) {
            alert("只能选择图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = new Image,
                canvas = document.createElement("canvas"),
                drawer = canvas.getContext("2d");
            img.src = this.result;
            var image_base64 = img.src.split(",")[1];
            image_base64 = image_base64.replace("data:image/png;base64,", "");
            var pictureindex = img.src.indexOf(',');
            var picture = img.src.substring(pictureindex + 1);
            var parameter = {name: file.name, picture: picture}
            $.ajax({
                type: "POST",
                url: imageServer + "/upload/pic",
                cache: false,
                data: parameter,
                async: true,
                success: function (url) {
                    $(_self).parent().prev().find('input').val(url.data);
                }
            });
        }
    })

    //获取跳转链接类型
    // function getLinkType() {
    //     $.ajax({
    //         type: "GET",
    //         url: '/APP-admin/advert/data/returnType',
    //         dataType: "json",
    //         success: function (resp) {
    //             if (resp.success) {
    //                 var html = '';
    //                 var list = resp.data;
    //                 for (var i = 0; i < list.length; i++) {
    //                     html += '<option value="' + list[i].id + '">' + list[i].name + '</option>'
    //                 }
    //                 $('#add-bigad-linktype').html(html);
    //             }
    //         }
    //     });
    // }

    // $('#add-bigad-linktype').on('change', function () {
    //     var val = $(this).val();
    //     if (val === '3') {
    //         $('#add-bigad-outurl').addClass('hide');
    //         $('#add-bigad-strategy').removeClass('hide');
    //     } else if (val === '1') {
    //         $('#add-bigad-strategy').addClass('hide');
    //         $('#add-bigad-outurl').val('').removeClass('hide').attr('disabled', true);
    //     } else if (val === '2') {
    //         $('#add-bigad-strategy').addClass('hide');
    //         $('#add-bigad-outurl').val('').removeClass('hide').attr('disabled', false);
    //     } else {
    //         $('#add-bigad-strategy').addClass('hide');
    //         $('#add-bigad-outurl').val($('#add-bigad-linktype option:selected').text()).removeClass('hide').attr('disabled', true);
    //     }
    // })
    $('#add-bigad-submit').on('click', 'button', function () {
        var that = this;
        var title = $('#add-bigad-title').val();
        var photoUrl = $('.add-bigad-img').val();
        // var type = $('#add-bigad-linktype').val();
        // var returnUrl = $('#add-bigad-outurl').val();
        // var linkStrategy = $('#add-bigad-strategy').val();
        var userOrVisitor = $('#add-bigad-people').val();
        var pushType = $('#bigAdpushType').val();
        if(!pushType){
            var pushParam = null;
            pushType = null;
        }else{
            var pushParam = '{';
            var selectParam = JSON.parse(bigSelectNavigation[0].param);
            Object.keys(selectParam).forEach(item => {
                pushParam += '"' + item + '":"' + $('#bigAdPushParams'+item).val() + '",';
            })
            pushParam = pushParam.slice(0,-1);
            pushParam += '}';
        }
        // var days = $('#add-bigad-day').val();
        // 弹出规则
        if(!$("input[name='bigadday']:checked").val()){
            Lobibox.alert('warning', {
                msg: '请选择弹出规则！'
            })
            return;
        }
        // if(!$('.bigadday:checked')[0].defaultValue){
        //     Lobibox.alert('warning', {
        //         msg: '请选择弹出规则！'
        //     })
        //     return;
        // }
        if($('.bigadday:checked')[0].defaultValue === '-1'){
            var days = -1;
        }else if($('.bigadday:checked')[0].defaultValue === '1'){
            var days = 1;
        }else if($('.bigadday:checked')[0].defaultValue === '2'){
            var days = $('#add-bigad-day').val();
        }
        // if (type !== '1' && type !== '3') {
        //     if (!(title && photoUrl && returnUrl && days)) {
        //         Lobibox.alert('warning', {
        //             msg: '请填写完整！'
        //         })
        //         return;
        //     }
        // } else {
        //     if (!(title && photoUrl && days)) {
        //         Lobibox.alert('warning', {
        //             msg: '请填写完整！'
        //         })
        //         return;
        //     }
        // }
        if (!(title && photoUrl && days)) {
            Lobibox.alert('warning', {
                msg: '请填写完整！'
            })
            return;
        }
        if($('.bigadday:checked')[0].defaultValue === '2' && days <= 1){
            Lobibox.alert('warning', {
                msg: '此种规则适用于用户连续未登录两天以上！'
            })
            return;
        }
        // if (type === '1' || type === '3') {
        //     returnUrl = null;
        // }
        // if (type === '3') {
        //     returnUrl = linkStrategy;
        // }
        var adObj = {
            title: title,
            photoUrl: photoUrl,
            // type: Number(type),
            // returnUrl: returnUrl,
            userOrVisitor: Number(userOrVisitor),
            status: 1,
            days: Number(days),
            pushType: pushType,
            pushParam: pushParam
        };
        if ($(this).hasClass('saveandstart')) {
            $.ajax({
                type: 'POST',
                url: '/APP-admin/advert/data/save',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(adObj),
                success: function (resp) {
                    if (resp.success) {
                        if (resp.data === '1') {
                            $('#add-bigad-title').val('');
                            $('#add-bigad-form .add-bigad-img').val('');
                            $('#bigAdPushParams').find('input').val('');
                            // $('#add-bigad-form').find('input').val('');
                            // $('#add-bigad-linktype').val('1');
                            // $('#add-bigad-strategy').addClass('hide');
                            // $('#add-bigad-outurl').removeClass('hide').attr('disabled', true);
                            getBigAdList(1, 10);
                            Lobibox.notify('success', {
                                msg: "新增广告成功!",
                                width: 400,
                                sound: false,
                                delay: 1000
                            });
                        } else if (resp.data === '0') {
                            Lobibox.confirm({
                                msg: "本主题状态与其他主题状态有冲突，请禁用相关主题状态后启用本主题",
                                buttons: {
                                    yes: {
                                        class: 'btn btn-primary',
                                        text: '禁用其他并启用本主题'
                                    },
                                    no: {
                                        class: 'btn btn-default',
                                        text: '取消操作'
                                    }
                                },
                                callback: function ($this, type, ev) {
                                    if (type === "yes") {
                                        $.ajax({
                                            type: 'POST',
                                            url: '/APP-admin/advert/data/disableForSave',
                                            dataType: 'json',
                                            contentType: 'application/json;charset=utf-8',
                                            data: JSON.stringify(adObj),
                                            success: function (resp) {
                                                if (resp.success) {
                                                    $('#add-bigad-title').val('');
                                                    $('#add-bigad-form .add-bigad-img').val('');
                                                    $('#bigAdPushParams').find('input').val('');
                                                    // $('#add-bigad-form').find('input').val('');
                                                    // $('#add-bigad-linktype').val('1');
                                                    // $('#add-bigad-strategy').addClass('hide');
                                                    // $('#add-bigad-outurl').removeClass('hide').attr('disabled', true);
                                                    getBigAdList(1, 10);
                                                    Lobibox.notify('success', {
                                                        msg: "新增广告成功并启用!",
                                                        width: 400,
                                                        sound: false,
                                                        delay: 1000
                                                    });
                                                } else {
                                                    Lobibox.notify('error', {
                                                        msg: data.msg,
                                                        width: 400,
                                                        sound: false
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    } else {
                        Lobibox.notify('error', {
                            msg: data.msg,
                            width: 400,
                            sound: false
                        });
                    }
                }
            });
        } else {
            adObj.status = 0;
            $.ajax({
                type: 'POST',
                url: '/APP-admin/advert/data/saveAndNotUse',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(adObj),
                success: function (resp) {
                    if (resp.success) {
                        $('#add-bigad-form').find('input').val('');
                        $('#add-bigad-linktype').val('1');
                        $('#add-bigad-strategy').addClass('hide');
                        $('#add-bigad-outurl').removeClass('hide').attr('disabled', true);
                        getBigAdList(1, 10);
                        Lobibox.notify('success', {
                            msg: "编辑成功!",
                            width: 400,
                            sound: false,
                            delay: 1000
                        });
                    } else {
                        Lobibox.notify('error', {
                            msg: data.msg,
                            width: 400,
                            sound: false
                        });
                    }
                }
            });
        }
    });

    /*****************信号管理*****************/
    function poolAdd() {
        $("#pop1-stocktype").val("");
        $("#pop1-stockname").val("");
        $("#pop1-modeltype").val("0");
        $("#pricepool").val("0.01");
        $("input[name='buytypepool']").eq(0).prop("checked", "checked");
        $('#poolAdd').modal('show');
    };
    $("#pop1-sendconfrimbtn").click(function () {
        $('#poolAdd').modal('hide');
    });
    $("#pool-addbtn").click(poolAdd);

    $("#pop1-select").click(function () {
        $(".pop2-login-body").html("");
        $("#pop2-text").val("");
        $('#pool-select').modal('show');
        getAllStock();
    });
    $("#pop1-savenoticebtn").on("click", function () {
        var poolobj = {
            "stockCode": $("#pop1-stocktype").val().substring(0, 6),
            "stockName": $("#pop1-stockname").val(),
            "modelCode": $("#pop1-modeltype").val(),
            "modelName": $("#pop1-modeltype").find("option:selected").html(),
            "type": $("input[name='buytypepool']:checked").val(),
            "price": $("#pricepool").val(),
            "operatorId": id
        };
        $.ajax({
            type: "post",
            url: "/APP-admin/signal/stockPoolSignal",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(poolobj),
            success: function (result) {
                if (result.data) {
                    Lobibox.confirm({
                        msg: result.data,
                        buttons: {
                            yes: {
                                class: 'btn btn-primary',
                                text: '推送'
                            },
                            no: {
                                class: 'btn btn-default',
                                text: '取消'
                            }
                        },
                        callback: function ($this, type, ev) {
                            if (type === "yes") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/APP-admin/signal/addPoolSignal',
                                    dataType: 'json',
                                    contentType: 'application/json;charset=utf-8',
                                    data: JSON.stringify(poolobj),
                                    success: function (resp) {
                                        if (resp.success) {
                                            $('#poolAdd').modal('hide');
                                            Lobibox.notify('success', {
                                                msg: "操作成功!",
                                                width: 400,
                                                sound: false,
                                                delay: 1000
                                            });
                                            queryPoolInfoList(1, 10);
                                        } else {
                                            Lobibox.notify('error', {
                                                msg: resp.msg,
                                                width: 400,
                                                sound: false
                                            });
                                        }
                                    }
                                });
                            } else {
                            }
                        }
                    });
                } else {
                    $('#poolAdd').modal('hide');
                    Lobibox.notify('error', {
                        msg: result.msg,
                        width: 400,
                        sound: false,
                        delay: 2000
                    });

                }
            }

        });
    });


    $("#singal-addbtn").click(function () {
        $('#autostockadd').modal('show');
        $("#pop3-stocktype").val("");
        $("#pop3-stockname").val("");
        $("#pop3-modeltype").val("0");
        $("#handNumber").val("1");
        $("#priceModel").val("0.01");
        $("input[name='buytype']").eq(0).prop("checked", "checked");

    });
    $("#pop3-sendconfrimbtn").click(function () {
        $('#autostockadd').modal('hide');
    });
    $("#pop3-select").click(function () {
        $("#pop2-text").val("");
        $(".pop2-login-body").html("");
        $('#pool-select').modal('show');
        getAllStock();
    });
    $("#pop3-savenoticebtn").on("click", function () {
        var autoStockobj = {
            "stockCode": $("#pop3-stocktype").val(),
            "stockName": $("#pop3-stockname").val(),
            "modelCode": $("#pop3-modeltype").val(),
            "modelName": $("#pop3-modeltype").find("option:selected").html(),
            "type": $("input[name='buytype']:checked").val(),
            "quantity": $("#handNumber").val(),
            "price": $("#priceModel").val(),
            "operatorId": id
        };
        $.ajax({
            type: "post",
            url: "/APP-admin/signal/modelSignal",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(autoStockobj),
            success: function (result) {
                if (result.data) {
                    Lobibox.confirm({
                        msg: result.data,
                        buttons: {
                            yes: {
                                class: 'btn btn-primary',
                                text: '推送'
                            },
                            no: {
                                class: 'btn btn-default',
                                text: '取消'
                            }
                        },
                        callback: function ($this, type, ev) {
                            if (type === "yes") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/APP-admin/signal/addTraderSignal',
                                    dataType: 'json',
                                    contentType: 'application/json;charset=utf-8',
                                    data: JSON.stringify(autoStockobj),
                                    success: function (resp) {
                                        if (resp.success) {
                                            $('#autostockadd').modal('hide');
                                            Lobibox.notify('success', {
                                                msg: "操作成功!",
                                                width: 400,
                                                sound: false,
                                                delay: 1000
                                            });
                                            querySmartInfoList(1, 10);
                                        } else {
                                            Lobibox.notify('error', {
                                                msg: resp.msg,
                                                width: 400,
                                                sound: false
                                            });
                                        }
                                    }
                                });
                            } else {
                            }
                        }
                    });
                } else {
                    $('#autostockadd').modal('hide');
                    Lobibox.notify('error', {
                        msg: result.msg,
                        width: 400,
                        sound: false,
                        delay: 2000
                    });

                }
            }

        });

    });
    $("#pop4-select").click(function () {
        $("#pop2-text").val("");
        $(".pop2-login-body").html("");
        $('#pool-select').modal('show');
        getAllStock();
    });
    $("#weight-addbtn").click(function () {
        $("#pop4-modeltype").val("");
        $("#pop4-stockname").val("");
        $("input[name='pop4-checkbox1']").prop("checked", false);
        $("input[name='pop4-checkbox2']").prop("checked", false);
        $("input[name='pop4-checkbox3']").prop("checked", false);
        $("input[name='pop4-checkbox4']").prop("checked", false);
        $("#pop4-weight1").val("0.000"),
            $("#pop4-weight2").val("0"),
            $("#pop4-weight3").val("0"),
            $("#pop4-weight4").val("0"),
            $("#pop4-weight5").val("0.000"),
            $('#weight-start-time1').val(""),
            $('#counterweightadd').modal('show');
    });
    $("#pop4-sendconfrimbtn").on("click", function () {
        $('#counterweightadd').modal('hide');
    })
    $("#pop4-savenoticebtn").on("click", function () {
        var str = $('#weight-start-time1').val().replace(/-/g, "/");
        var time = $('#weight-start-time1').val();
        var f = $("input[name='pop4-checkbox1']:checked").length;
        var s = $("input[name='pop4-checkbox2']:checked").length;
        var z = $("input[name='pop4-checkbox3']:checked").length;
        var p = $("input[name='pop4-checkbox4']:checked").length;
        var fuquanobj = {
            "stockCode": $("#pop4-modeltype").val().substring(0, 6),
            "stockName": $("#pop4-stockname").val(),
            "fenHongChecked": f,
            "songGuChecked": s,
            "zhuanGuChecked": z,
            "peiGuChencked": p,
            "fenhongPrice": $("#pop4-weight1").val(),
            "songGuNumber": $("#pop4-weight2").val(),
            "zhuanGuNumber": $("#pop4-weight3").val(),
            "peiGuNumber": $("#pop4-weight4").val(),
            "peiGuPrice": $("#pop4-weight5").val(),
            "time": time,
            "operatorId": id
        };
        $.ajax({
            type: "post",
            url: "/APP-admin/signal/fuquanSignal",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(fuquanobj),
            success: function (result) {
                if (result.data) {
                    Lobibox.confirm({
                        msg: result.data,
                        buttons: {
                            yes: {
                                class: 'btn btn-primary',
                                text: '推送'
                            },
                            no: {
                                class: 'btn btn-default',
                                text: '取消'
                            }
                        },
                        callback: function ($this, type, ev) {
                            if (type === "yes") {
                                $.ajax({
                                    type: 'POST',
                                    url: '/APP-admin/signal/addFuquanSignal',
                                    dataType: 'json',
                                    contentType: 'application/json;charset=utf-8',
                                    data: JSON.stringify(fuquanobj),
                                    success: function (resp) {
                                        if (resp.success) {
                                            $('#counterweightadd').modal('hide');
                                            Lobibox.notify('success', {
                                                msg: "操作成功!",
                                                width: 400,
                                                sound: false,
                                                delay: 1000
                                            });
                                            queryFuquanInfoList(1, 10);
                                        } else {
                                            Lobibox.notify('error', {
                                                msg: resp.msg,
                                                width: 400,
                                                sound: false
                                            });
                                        }
                                    }
                                });
                            } else {
                            }
                        }
                    });
                } else {
                    $('#counterweightadd').modal('hide');
                    Lobibox.notify('error', {
                        msg: result.msg,
                        width: 400,
                        sound: false,
                        delay: 2000
                    });

                }
            }

        });
    });

    //获得所有的智能策略
    function getAllSmartModel() {
        var url = "/APP-admin/model/getAllShelfSmartModel?type=3&status=1";
        $.ajax({
            type: "get",
            url: url,
            success: function (data) {
                $("#automodelTab").html("");
                var data = data.data;
                for (var i = 0, len = data.length; i < len; i++) {
                    $("#automodelTab").append('<li><a href="#automodel" id="' + data[i].id + '" style="color:red" data-toggle="tab">' + data[i].displayName + '</a></li>');
                }
                $("#automodelTab").find("li").eq(0).addClass("active");
                $("#auto_displayName").html($("#automodelTab li[class='active'] a").html());
                var id = $("#automodelTab li[class='active'] a").attr("id");
                $.ajax({
                    type: "get",
                    url: "/APP-admin/model/getModleRunData",
                    data: {id: id},
                    success: function (data) {
                        if (data.data != null) {
                            var realtime = data.data.realtimeReturnRatio * 100;
                            var position = data.data.totalCapital * 100;
                            $("#auto_realTime").html(isNaN(realtime) ? 0 : realtime.toFixed(2));
                            $("#auto_postition").html(isNaN(position) ? 0 : position.toFixed(2));
                        } else {
                            $("#auto_realTime").html(0);
                            $("#auto_postition").html(0);
                        }
                    }
                })
                getAutoTable(id, 1, 10);
            }
        })
    }

    //得到所有的操作人员的信息
    function getAllOperation() {
        var url = "/APP-admin/user/admin/list";
        $.ajax({
            type: "get",
            url: url,
            success: function (data) {
                var data = data.data;
                $("#singal-operationpeople").html("<option value=" + 0 + ">" + "全部" + "</option>");
                $("#pool-operationpeople").html("<option value=" + 0 + ">" + "全部" + "</option>");
                $("#weight-operationpeople").html("<option value=" + 0 + ">" + "全部" + "</option>");
                $.each(data, function (i, obj) {
                    $("#singal-operationpeople").append("<option value=" + obj.id + ">" + obj.userName + "</option>");
                    $("#pool-operationpeople").append("<option value=" + obj.id + ">" + obj.userName + "</option>");
                    $("#weight-operationpeople").append("<option value=" + obj.id + ">" + obj.userName + "</option>");
                })
            }
        })
    }

    //获得所有的智能策略
    function getAllPoolModel() {
        var url = "/APP-admin/model/getAllShelfSmartModel?type=3&status=1";
        $.ajax({
            type: "get",
            url: url,
            success: function (data) {
                var data = data.data;
                $("#pool-modeltype").html("<option value=" + 0 + ">" + "全部" + "</option>");
                $("#pop1-modeltype").html("<option value=" + 0 + ">" + "全部" + "</option>");
                for (var i = 0, len = data.length; i < len; i++) {
                    $("#pool-modeltype").append("<option value=" + data[i].id + ">" + data[i].displayName + "</option>");
                    $("#pop1-modeltype").append("<option value=" + data[i].id + ">" + data[i].displayName + "</option>");
                }
            }
        })
    }

    function getAllStock() {
        $.ajax({
            type: "get",
            cache: true,
            url: "/APP-admin/model/getAllStock",
            success: function (data) {
                var data = data.data;
//							$("#pop4-modeltype").html("<option value="+0+">"+"请输入代码"+"</option>");
//							$("#pop3-stocktype").html("<option value="+0+">"+"请输入代码"+"</option>");
//							$("#pop1-stocktype").html("<option value="+0+">"+"请输入代码"+"</option>");
                var li_html = "";
                $.each(data, function (i, obj) {
//								$("#pop4-modeltype").append("<option value="+obj.stockcode+">"+obj.name+"</option>");
//								$("#pop3-stocktype").append("<option value="+obj.stockcode+">"+obj.name+"</option>");
//								$("#pop1-stocktype").append("<option value="+obj.stockcode+">"+obj.name+"</option>");
                    li_html += '<tr>'
                        + '<td style="text-align:center">' + '<input type="radio" name="stockRadio"></td>'
                        + '<td>' + obj.stockcode + '</td>'
                        + '<td>' + obj.name + '</td>'
                        + '</tr>';
                });
                $(".pop2-login-body").append(li_html);
//							$(".pop2-login-body").html(li_html);
            }
        })
    }

    signalStockQuery();

    function signalStockQuery() {
        $("#pop2-text").bind("keyup", function () {
            var stockName = $("#pop2-text").val();
            $.ajax({
                type: "get",
                url: "/APP-admin/model/getStockByName",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {"stockName": stockName.substring(0, 6)},
                success: function (data) {
                    var li_html = "";
                    var data = data.data;
                    $.each(data, function (i, obj) {
                        li_html += '<tr>'
                            + '<td style="text-align:center">' + '<input type="radio" name="stockRadio"></td>'
                            + '<td>' + obj.stockcode + '</td>'
                            + '<td>' + obj.name + '</td>'
                            + '</tr>';
                    })
                    $(".pop2-login-body").html(li_html);
                }
            })
        })

    }

    $("#pop2-confirm").click(function () {
        var checks = $('input[name="stockRadio"]:checked');
        if (checks.length == 0) {
            Lobibox.notify('error', {
                msg: "未进行选择",
                width: 400,
                sound: false
            });
        } else {
            var stockCode = checks.parent().siblings().eq(0).html();
            $("#pop3-stocktype").val(stockCode);
            $("#pop3-stockname").val(checks.parent().siblings().eq(1).html());
            $("#pop1-stocktype").val(stockCode);
            $("#pop1-stockname").val(checks.parent().siblings().eq(1).html());
            $("#pop4-modeltype").val(stockCode);
            $("#pop4-stockname").val(checks.parent().siblings().eq(1).html());
        }

    })
    $("#pop3-stocktype").on('change', function () {
        if ($("#pop3-stocktype").find("option:selected").val() == 0) {
            $("#pop3-stockname").val("");
        } else {
            $("#pop3-stockname").val($("#pop3-stocktype").find("option:selected").attr("sName"));
        }
    })

    $("#singal-searchbtn").click(function () {
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var startTime = $('#singal-start-time').val(),
            endTime = $('#singal-end-time').val(),
            modelCode = $("#singal-modeltype").val(),
            modelName = $("#singal-modeltype").find("option:selected").html(),
            stockCode = $("#singal-stockcode").val(),
            stockName = $("#singal-stockname").val(),
            buyType = $("#singal-buytype").val(),
            operaorId = $("#singal-operationpeople").val(),
            page = 1,
            size = 10;
        querySmartInfoList(page, size, sortField, sortDirection, startTime, endTime, modelCode, modelName,
            stockCode, stockName, buyType, operaorId);
    })

    function querySmartInfoList(page, size, sortField, sortDirection, startTime, endTime, modelCode, modelName,
                                stockCode, stockName, buyType, operaorId) {
        var data = {
            'modelCode': modelCode !== '0' ? modelCode : null,
            'startTime': startTime !== '' ? startTime : null,
            'endTime': endTime !== '' ? endTime : null,
            'modelName': modelName !== '全部' ? modelName : null,
            'stockCode': stockCode !== '' ? stockCode : null,
            'stockName': stockName !== '' ? stockName : null,
            'buyType': buyType !== '' ? buyType : null,
            'operaorId': operaorId !== '0' ? operaorId : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/signal/data/smartQuery',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    singalInfoList(resp.data.list, page, size);
                    signalInfoCount = resp.data.totalCounts;
                    $('#singal-login-totalCounts').find('span').html(signalInfoCount);
                    var total = (signalInfoCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#singal-login-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".singal-login-body").empty();
                            querySmartInfoList(page, size, sortField, sortDirection, startTime, endTime, modelCode, stockName,
                                stockCode, stockName, buyType, operaorId);
                        }
                    });
                }
            }
        });
    }

    //智能策略信息展示的表格
    function singalInfoList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].modelName + '</td>'
                + '<td>' + list[i].code + '</td>'
                + '<td>' + list[i].stockName + '</td>'
                + '<td>' + (list[i].type == 1 ? '买入' : '卖出') + '</td>'
                + '<td>' + list[i].price + '</td>'
                + '<td>' + list[i].quantity + '</td>'
                + '<td>' + list[i].time + '</td>'
                + '<td>' + list[i].operatorName + '</td>';
            li_html += '</tr>';
        }
        $(".singal-login-body").html(li_html);
    }

    $("#pool-searchbtn").click(function () {
        poolcheckTime();
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var startTime = $('#pool-start-time').val(),
            endTime = $('#pool-end-time').val(),
            modelCode = $("#pool-modeltype").val(),
            modelName = $("#pool-modeltype").find("option:selected").html(),
            stockCode = $("#pool-stockcode").val(),
            stockName = $("#pool-stockname").val(),
            buyType = $("#pool-buytype").val(),
            operaorId = $("#pool-operationpeople").val(),
            page = 1,
            size = 10;
        queryPoolInfoList(page, size, sortField, sortDirection, startTime, endTime, modelCode, modelName,
            stockCode, stockName, buyType, operaorId);
    })

    function queryPoolInfoList(page, size, sortField, sortDirection, startTime, endTime, modelCode, modelName,
                               stockCode, stockName, buyType, operaorId) {
        var data = {
            'modelCode': modelCode !== '0' ? modelCode : null,
            'startTime': startTime !== '' ? startTime : null,
            'endTime': endTime !== '' ? endTime : null,
            'modelName': modelName !== '全部' ? modelName : null,
            'stockCode': stockCode !== '' ? stockCode : null,
            'stockName': stockName !== '' ? stockName : null,
            'buyType': buyType !== '' ? buyType : null,
            'operaorId': operaorId !== '0' ? operaorId : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/signal/data/poolQuery',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    stockPoolInfoList(resp.data.list, page, size);
                    signalInfoCount = resp.data.totalCounts;
                    $('#pool-login-totalCounts').find('span').html(signalInfoCount);
                    var total = (signalInfoCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#pool-login-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".pool-login-body").empty();
                            queryPoolInfoList(page, size, sortField, sortDirection, startTime, endTime, modelCode, modelName,
                                stockCode, stockName, buyType, operaorId);
                        }
                    });
                }
            }
        });
    }

    //股票池展示的表格
    function stockPoolInfoList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].modelName + '</td>'
                + '<td>' + list[i].stockCode + '</td>'
                + '<td>' + list[i].stockName + '</td>'
                + '<td>' + (list[i].type == 0 ? '调入' : '调出') + '</td>'
                + '<td>' + list[i].price + '</td>'
                + '<td>' + list[i].time + '</td>'
                + '<td>' + list[i].operatorName + '</td>';
            li_html += '</tr>';
        }
        $(".pool-login-body").html(li_html);
    }

    $("#weight-searchbtn").click(function () {
        weightcodetime();
        var sortObj = operationAnalyzeSort(this);
        var sortField, sortDirection;
        if (sortObj) {
            sortField = sortObj.prop;
            sortDirection = sortObj.sort;
        } else {
            sortField = '';
            sortDirection = '';
        }
        var startTime = $('#weight-start-time').val(),
            endTime = $('#weight-end-time').val(),
            stockCode = $("#weight-stockcode").val(),
            stockName = $("#weight-stockname").val(),
            operaorId = $("#weight-operationpeople").val(),
            page = 1,
            size = 10;
        queryFuquanInfoList(page, size, sortField, sortDirection, startTime, endTime,
            stockCode, stockName, operaorId);
    })

    function queryFuquanInfoList(page, size, sortField, sortDirection, startTime, endTime,
                                 stockCode, stockName, operaorId) {
        var data = {
            'startTime': startTime !== '' ? startTime : null,
            'endTime': endTime !== '' ? endTime : null,
            'stockCode': stockCode !== '' ? stockCode : null,
            'stockName': stockName !== '' ? stockName : null,
            'operaorId': operaorId !== '0' ? operaorId : null,
            'sortField': sortField !== '' ? sortField : null,
            'sortDirection': sortDirection !== '' ? sortDirection : null,
            'page': Number(page),
            'size': Number(size)
        };
        $.ajax({
            type: "POST",
            url: '/APP-admin/signal/data/fuquanQuery',
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    fuquanInfoList(resp.data.list, page, size);
                    signalInfoCount = resp.data.totalCounts;
                    $('#weight-login-totalCounts').find('span').html(signalInfoCount);
                    var total = (signalInfoCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#weight-login-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".weight-login-body").empty();
                            queryFuquanInfoList(page, size, sortField, sortDirection, startTime, endTime,
                                stockCode, stockName, operaorId);
                        }
                    });
                }
            }
        });
    }

    //复权信息展示的表格
    function fuquanInfoList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + list[i].code + '</td>'
                + '<td>' + list[i].stockName + '</td>'
                + '<td>' + list[i].typeAll + '</td>'
                + '<td>' + list[i].signalDescription + '</td>'
                + '<td>' + list[i].time + '</td>'
                + '<td>' + list[i].operatorName + '</td>';
            li_html += '</tr>';
        }
        $(".weight-login-body").html(li_html);
    }

    $(".bt1_sub").click(function () {
        var num = $(this).parent().find(".btn_number").val();
        if (num > 1) {
            $(this).parent().find(".btn_number").val(Number(num) - 1);
        }
    })
    $(".bt1_add").click(function () {
        var num = $(this).parent().find(".btn_number").val();
        if (num > 0) {
            $(this).parent().find(".btn_number").val(Number(num) + 1);
        }
    })
    $(".bt2_sub").click(function () {
        var num = $(this).parent().find(".btn_price").val();
        if (num > 0.01) {
            $(this).parent().find(".btn_price").val((Number(num) - 0.01).toFixed(2));
        }
    })
    $(".bt2_add").click(function () {
        var num = $(this).parent().find(".btn_price").val();
        if (num >= 0) {
            $(this).parent().find(".btn_price").val((Number(num) + 0.01).toFixed(2));
        }
    })
    $(".bt3_sub").click(function () {
        var num = $(this).parent().find("#pop4-weight2").val();
        if (num >= 1) {
            $(this).parent().find("#pop4-weight2").val(Number(num) - 1);
        }
    })
    $(".bt3_add").click(function () {
        var num = $(this).parent().find("#pop4-weight2").val();
        if (num >= 0) {
            $(this).parent().find("#pop4-weight2").val(Number(num) + 1);
        }
    })
    $(".bt4_sub").click(function () {
        var num = $(this).parent().find("#pop4-weight3").val();
        if (num >= 1) {
            $(this).parent().find("#pop4-weight3").val(Number(num) - 1);
        }
    })
    $(".bt4_add").click(function () {
        var num = $(this).parent().find("#pop4-weight3").val();
        if (num >= 0) {
            $(this).parent().find("#pop4-weight3").val(Number(num) + 1);
        }
    })
    $(".bt5_sub").click(function () {
        var num = $(this).parent().find("#pop4-weight4").val();
        if (num >= 1) {
            $(this).parent().find("#pop4-weight4").val(Number(num) - 1);
        }
    })
    $(".bt5_add").click(function () {
        var num = $(this).parent().find("#pop4-weight4").val();
        if (num >= 0) {
            $(this).parent().find("#pop4-weight4").val(Number(num) + 1);
        }
    })
    $(".bt6_sub").click(function () {
        var num = $(this).parent().find("#pop4-weight1").val();
        if (num >= 0.001) {
            $(this).parent().find("#pop4-weight1").val((Number(num) - 0.001).toFixed(3));
        }
    })
    $(".bt6_add").click(function () {
        var num = $(this).parent().find("#pop4-weight1").val();
        if (num >= 0) {
            $(this).parent().find("#pop4-weight1").val((Number(num) + 0.001).toFixed(3));
        }
    })
    $(".bt7_sub").click(function () {
        var num = $(this).parent().find("#pop4-weight5").val();
        if (num >= 0.001) {
            $(this).parent().find("#pop4-weight5").val((Number(num) - 0.001).toFixed(3));
        }
    })
    $(".bt7_add").click(function () {
        var num = $(this).parent().find("#pop4-weight5").val();
        if (num >= 0) {
            $(this).parent().find("#pop4-weight5").val((Number(num) + 0.001).toFixed(3));
        }
    })
    $("#pop1-stocktype").bind("keyup click", function () {
        var stockName = $("#pop1-stocktype").val();
        var regex = /^(\d{1,6})/;
        var arr = stockName.match(regex);
        if (stockName == "" || arr != null) {
            $.ajax({
                type: "get",
                url: "/APP-admin/model/getStockByName",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {"stockName": stockName == "" ? "" : arr[0]},
                success: function (data) {
                    var li_html = "";
                    var data = data.data;
                    $("#typenum").html("");
                    $.each(data, function (i, obj) {
                        $("#typenum").append('<option value="' + obj.name + '">' + obj.stockcode + "(" + obj.name + ")" + '</option>');
                    })
                    /*$("#typenum").append('<option value="">q</option>');*/
                }
            })
        }
        $("#typenum").css("display", "");
    })
    $("#pop1-stocktype").bind("focus", function () {
        $("#typenum").css("display", "");
    });
    $("#poolAdd").bind('click', function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.id && (elem.id == 'typenum' || elem.id == "pop1-stocktype")) {
                return;
            }
            elem = elem.parentNode;
        }
        $('#typenum').css('display', 'none');
    });

    $("#typenum").bind("click", function () {
        var stock = $("#typenum").find("option:selected").text();
        $("#typenum").prev("input").val(stock);
        $.ajax({
            type: "get",
            url: "/APP-admin/model/getStockNameByCode",
            data: {code: stock.substring(0, 6)},
            success: function (data) {
                $("#typenum").next("input").val(data.data);
            }
        })

        $("#typenum").css({"display": "none"});
    })

    $("#pop4-modeltype").bind("keyup click", function () {
        var stockName = $("#pop4-modeltype").val();
        var regex = /^(\d{1,6})/;
        var arr = stockName.match(regex);
        if (stockName == "" || arr != null) {
            $.ajax({
                type: "get",
                url: "/APP-admin/model/getStockByName",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {"stockName": stockName == "" ? "" : arr[0]},
                success: function (data) {
                    var li_html = "";
                    var data = data.data;
                    $("#typenum1").html("");
                    $.each(data, function (i, obj) {
                        $("#typenum1").append('<option value="' + obj.name + '">' + obj.stockcode + "(" + obj.name + ")" + '</option>');
                    })
                    /*$("#typenum").append('<option value="">q</option>');*/
                }
            })
        }
        $("#typenum1").css("display", "");
    })
    $("#pop4-modeltype").bind("focus", function () {
        $("#typenum1").css("display", "");
    });
    $("#counterweightadd").bind('click', function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.id && (elem.id == 'typenum1' || elem.id == "pop4-modeltype")) {
                return;
            }
            elem = elem.parentNode;
        }
        $('#typenum1').css('display', 'none');
    });

    $("#typenum1").bind("click", function () {
        var stock = $("#typenum1").find("option:selected").text();
        $("#typenum1").prev("input").val(stock);
        $.ajax({
            type: "get",
            url: "/APP-admin/model/getStockNameByCode",
            data: {code: stock.substring(0, 6)},
            success: function (data) {
                $("#typenum1").next("input").val(data.data);
            }
        })

        $("#typenum1").css({"display": "none"});
    })
    $("#automodelTab").click(function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var id = elem.id;
        var displayName = $(elem).html();
        if (id == "automodelTab") {
            return;
        }
        $("#auto_displayName").html(displayName);
        $.ajax({
            type: "get",
            url: "/APP-admin/model/getModleRunData",
            data: {id: id},
            success: function (data) {
                if (data.data != null) {
                    var realtime = data.data.realtimeReturnRatio * 100;
                    var position = data.data.totalCapital * 100;
                    $("#auto_realTime").html(isNaN(realtime) ? 0 : realtime.toFixed(2));
                    $("#auto_postition").html(isNaN(position) ? 0 : position.toFixed(2));
                } else {
                    $("#auto_realTime").html(0);
                    $("#auto_postition").html(0);
                }
            }
        })
        $("#addPostion-percent").val("");
        $("#addPostion-stockName").val("");
        $("#addPostion-price").val("");
        getAutoTable(id, 1, 10);
    })

    function getAutoTable(id, page, size) {
        $.ajax({
            type: "get",
            url: "/APP-admin/model/getModleSummeryHoldInfo",
            data: {id: id, page: page, size: 10},
            success: function (resp) {
                autoNewInfoList(resp.data.list, 1, 10);
                signalInfoCount = resp.data.totalCount;
                $('#auto_model_totalCounts').find('span').html(signalInfoCount);
                var total = (signalInfoCount / 10);
                if (total % 1 !== 0) {
                    total = parseInt(total) + 1;
                }
                $("#auto_model_pages").createPage({
                    total: total,
                    page: page,
                    callback: function (page) {
                        $(".auto_model_body").empty();
                        getAutoTable(id, page, size);
                    }
                });
            }
        })
    }

    //智能策略信息展示的表格
    function autoNewInfoList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        for (var i = 0; i < list.length; i++) {
            li_html += '<tr>'
                + '<td style="width: 150px">' + (list[i].stockName + "\r\n" + list[i].stockCode) + '</td>'
                + '<td style="width: 120px">' + list[i].quantity + '</td>'
                + '<td style="width: 120px">' + (list[i].holdingPositionratio * 100).toFixed(2) + '%</td>'
                + '<td style="width: 120px">' + (list[i].returnRatio * 100).toFixed(2) + '%</td>'
                + '<td style="word-wrap:break-word;word-break:break-all;">' +/*"<button class='btn btn-danger btn-xs'>&nbsp;买&nbsp;</button>"+*/"&nbsp;&nbsp;" +
                "<button class='btn btn-danger btn-xs' type='buyer'>1/4</button>" + "&nbsp;&nbsp;" +
                "<button class='btn btn-danger btn-xs' type='buyer'>1/3</button>" + "&nbsp;&nbsp;" +
                "<button class='btn btn-danger btn-xs' type='buyer'>1/2</button>" + "&nbsp;&nbsp;" +
                "<button class='btn btn-danger btn-xs'>&nbsp;1&nbsp;</button>"
                + "<span style='display:block;margin-top:2px;'>"/*<button class='btn btn-success btn-xs'>&nbsp;卖&nbsp;</button>*/ + "&nbsp;&nbsp;" +
                "<button class='btn btn-success btn-xs' type='seller'>清仓</button>" + "&nbsp;&nbsp;" +
                "<button class='btn btn-success btn-xs' type='seller'>1/2</button>" + "&nbsp;&nbsp;" +
                "<button class='btn btn-success btn-xs' type='seller'>1/3</button>" + "&nbsp;&nbsp;" +
                "<button class='btn btn-success btn-xs' type='seller'>1/4</button></span>"
                + '</td>'
            li_html += '</tr>';
        }
        $(".auto_model_body").html(li_html);
    }

    $("#autoTable").bind("click", function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var content = $(elem).html();
        var regex = /买/;
        var regex1 = /卖/;
        var regex2 = /&nbsp;1&nbsp;/;
        var regex3 = /button/;
        var type = 0; //0表示买入  1表示卖出
        var quantity = 0;
        if (regex3.test(content)) {
            return;
        }
        /*if(regex.test(content)){
                $('#autoModelBuyer').modal('show');
            }
            if(regex1.test(content)){
                $("#autoModelSeller").modal("show");
            }*/
        if ($.trim(content) == '1/4') {
            quantity = 4;
            if ($(elem).attr("type") == "seller") {
                type = 1;
            } else {
                type = 0;
            }
        }
        if ($.trim(content) == '1/3') {
            quantity = 3;
            if ($(elem).attr("type") == "seller") {
                type = 1;
            } else {
                type = 0;
            }
        }
        if ($.trim(content) == '1/2') {
            quantity = 2;
            if ($(elem).attr("type") == "seller") {
                type = 1;
            } else {
                type = 0;
            }
        }
        if ($.trim(content) == '清仓') {
            quantity = 1;
            type = 1;
        }
        if (regex2.test(content)) {
            quantity = 1;
            type = 0;
        }

        if (quantity != 0) {
            var hold = {
                "stockCode": $(elem).parents("td").siblings().eq(0).html(),
                "modelCode": $("#automodelTab li[class='active'] a").attr("id"),
                "type": type,
                "quantity": quantity
            };
            $.ajax({
                type: "post",
                url: "signal/postionCalculate",
                contentType: "application/json",
                async: false,
                data: JSON.stringify(hold),
                success: function (resp) {
                    if (resp.success) {
                        var data = resp.data;
                        $("#auto-stockCode").html(data.stockCode.substring(0, 6) + "(" + data.stockName + ")");
                        $("#auto-type").html(data.type == 0 ? "买入" : "卖出");
                        $("#auto-newquantity").val(data.quantity);
                        $("#auto-newprice").val(data.price);
                        $("#auto-oldposition").html((data.oldPostion * 100).toFixed(2));
                        $("#auto-newposition").html((data.newPostion * 100).toFixed(2));
                        if (data.type == 0) {
                            $("#auto-modalBody").css("color", "red");
                        } else {
                            $("#auto-modalBody").css("color", "green");
                        }
                        $("#stockCode_hidden").val(data.stockCode);
                        $("#stockName_hidden").val(data.stockName);
                        $("#modelCode_hidden").val(data.modelCode);
                        $("#modelName_hidden").val(data.modelName);
                        $("#type_hidden").val(data.type);
                        $("#quantity_hidden").val(data.quantity);
                        $("#price_hidden").val(data.price);
                        $("#autoModelBuyer").modal("show");
                    } else {
                        Lobibox.confirm({
                            msg: "<span style='color:red'>股票实时价格获取失败,推送信号会导致持仓存在一定偏差！<br/>点击确定继续推送</span>",
                            buttons: {
                                yes: {
                                    class: 'btn btn-primary',
                                    text: '确定'
                                },
                                no: {
                                    class: 'btn btn-default',
                                    text: '取消'
                                }
                            },
                            callback: function ($this, type, ev) {
                                if (type === "yes") {
                                    var data = resp.data;
                                    $("#auto-stockCode").html(data.stockCode.substring(0, 6) + "(" + data.stockName + ")");
                                    $("#auto-type").html(data.type == 0 ? "买入" : "卖出");
                                    $("#auto-newquantity").val(0);
                                    $("#auto-newprice").val(0);
                                    $("#auto-oldposition").html((data.oldPostion * 100).toFixed(2));
                                    $("#auto-newposition").html((data.newPostion * 100).toFixed(2));
                                    if (data.type != 0) {
                                        $("#auto-modalBody").css("color", "green");
                                    } else {
                                        $("#auto-modalBody").css("color", "red");
                                    }
                                    $("#stockCode_hidden").val(data.stockCode);
                                    $("#stockName_hidden").val(data.stockName);
                                    $("#modelCode_hidden").val(data.modelCode);
                                    $("#modelName_hidden").val(data.modelName);
                                    $("#type_hidden").val(data.type);
                                    $("#addPosition").modal("hide");
                                    $("#autoModelBuyer").modal("show");
                                }
                            }
                        })
                    }
                }
            })
        }
    })

    $("#auto-newquantity,#auto-newprice").bind("blur", function () {
        var f1 = $("#auto-newquantity").val();
        var regex1 = /^[1-9][0-9]*$/;
        var judge1 = regex1.test(f1);
        var regex2 = /^([1-9]\d*\.\d{1,2}|0\.\d{1,2}|[1-9][0-9]*)$/;
        var f2 = $("#auto-newprice").val();
        var judge2 = regex2.test(f2);
        if (!judge1 || !judge2) {
            Lobibox.notify('error', {
                msg: "手数和价格都不能为空！手数为整数！价格小数不能超过2位！",
                width: 400,
                sound: false,
                delay: 2000
            });
            return;
        }
        var typeDescript = $("#auto-type").html();
        var type = 1;
        if (typeDescript == "买入") {
            type = 0;
        }
        var obj = {
            "quantity": f1,
            "price": f2,
            "modelCode": $("#automodelTab li[class='active'] a").attr("id"),
            "type": type,
            "stockCode": $("#stockCode_hidden").val()
        }
        $.ajax({
            type: "post",
            url: "signal/realPostionChange",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(obj),
            success: function (result) {
                $("#auto-newposition").html(result.data);
            }
        });
    })


    $("#buy-confirm").on("click", function () {
        var f1 = $("#auto-newquantity").val();
        var f2 = $("#auto-newprice").val();
        var regex1 = /^[1-9][0-9]*$/;
        var judge1 = regex1.test(f1);
        var regex2 = /^([1-9]\d*\.\d{1,2}|0\.\d{1,2}|[1-9][0-9]*)$/;
        var judge2 = regex2.test(f2);
        if (f1 == 0 || f2 == 0 || !judge1 || !judge2) {
            Lobibox.notify('error', {
                msg: "手数和价格都不能为空！手数为整数！价格小数不能超过2位！",
                width: 400,
                sound: false,
                delay: 2000
            });
            return;
        }
        var autoStockobj = {
            "stockCode": $("#stockCode_hidden").val(),
            "stockName": $("#stockName_hidden").val(),
            "modelCode": $("#modelCode_hidden").val(),
            "modelName": $("#modelName_hidden").val(),
            "type": $("#type_hidden").val(),
            "quantity": $("#auto-newquantity").val(),
            "price": $("#auto-newprice").val(),
            "operatorId": id
        };
        $.ajax({
            type: "post",
            url: "signal/modelSignal",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(autoStockobj),
            success: function (result) {
                if (result.data) {
                    Lobibox.confirm({
                        msg: result.data,
                        buttons: {
                            yes: {
                                class: 'btn btn-primary',
                                text: '推送'
                            },
                            no: {
                                class: 'btn btn-default',
                                text: '取消'
                            }
                        },
                        callback: function ($this, type, ev) {
                            if (type === "yes") {
                                $("#buy-confirm").attr("disabled", "true");
                                $.ajax({
                                    type: 'POST',
                                    url: '/APP-admin/signal/addTraderSignal',
                                    dataType: 'json',
                                    contentType: 'application/json;charset=utf-8',
                                    data: JSON.stringify(autoStockobj),
                                    success: function (resp) {
                                        $("#buy-confirm").removeAttr("disabled");
                                        if (resp.success) {
                                            $('#autoModelBuyer').modal('hide');
                                            Lobibox.notify('success', {
                                                msg: "操作成功!",
                                                width: 400,
                                                sound: false,
                                                delay: 1000
                                            });
                                            $.ajax({
                                                type: "get",
                                                url: "/APP-admin/model/getModleRunData",
                                                data: {id: $("#modelCode_hidden").val()},
                                                success: function (data) {
                                                    if (data.data != null) {
                                                        var realtime = data.data.realtimeReturnRatio * 100;
                                                        var position = data.data.totalCapital * 100;
                                                        $("#auto_realTime").html(isNaN(realtime) ? 0 : realtime.toFixed(2));
                                                        $("#auto_postition").html(isNaN(position) ? 0 : position.toFixed(2));
                                                    } else {
                                                        $("#auto_realTime").html(0);
                                                        $("#auto_postition").html(0);
                                                    }
                                                }
                                            })
                                            getAutoTable($("#modelCode_hidden").val(), 1, 10);
                                        } else {
                                            Lobibox.notify('error', {
                                                msg: resp.msg,
                                                width: 400,
                                                sound: false
                                            });
                                        }
                                    }
                                });
                            } else {
                            }
                        }
                    });
                } else {
                    $('#autoModelBuyer').modal('hide');
                    Lobibox.notify('error', {
                        msg: result.msg,
                        width: 400,
                        sound: false,
                        delay: 2000
                    });

                }
            }

        });
    });

    $("#auto_addPostion").bind("click", function (e) {
        $("#addPostion-percent").val("");
        $("#addPostion-stockName").val("");
        $("#addPostion-price").val("");
        $("#notience").css("display", "none");
        $("#notience1").css("display", "none");
        $('#addPosition').modal('show');
    })

    $("#addPostion-stockName").bind("keyup click", function () {
        var stockName = $("#addPostion-stockName").val();
        var regex = /^(\d{1,6})/;
        var arr = stockName.match(regex);
        if (stockName == "" || arr != null) {
            $.ajax({
                type: "get",
                url: "/APP-admin/model/getStockByName",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {"stockName": stockName == "" ? "" : arr[0]},
                success: function (data) {
                    var li_html = "";
                    var data = data.data;
                    $("#typenum2").html("");
                    $.each(data, function (i, obj) {
                        $("#typenum2").append('<option value="' + obj.name + '">' + obj.stockcode + "(" + obj.name + ")" + '</option>');
                    })
                    /*$("#typenum").append('<option value="">q</option>');*/
                }
            })
        }
        $("#typenum2").css("display", "");
    })
    $("addPostion-stockName").bind("focus", function () {
        $("#typenum2").css("display", "");
    });
    $("#addPosition").bind('click', function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.id && (elem.id == 'typenum2' || elem.id == "addPostion-stockName")) {
                return;
            }
            elem = elem.parentNode;
        }
        $('#typenum2').css('display', 'none');
    });

    $("#typenum2").bind("click", function () {
        var stock = $("#typenum2").find("option:selected").text();
        if (stock != "") {
            $("#typenum2").prev("input").val(stock);
            $.ajax({
                type: "get",
                url: "/APP-admin/signal/getNewPriceByStockCode",
                data: {stockCode: stock.substring(0, 6)},
                success: function (data) {
                    if (data.success) {
                        $("#typenum2").next("input").val(data.data);
                    } else {
                        $("#typenum2").next("input").val(0);
                        Lobibox.notify('error', {
                            msg: "获取最新价格失败,请重试！",
                            width: 400,
                            sound: false,
                            delay: 2000
                        });
                    }
                }
            })
        }
        $("#typenum2").css({"display": "none"});
    })
    $("#addPostion-price").bind("click", function () {
        var stock = $("#addPostion-stockName").val().substring(0, 6);
        if (stock != "") {
            $.ajax({
                type: "get",
                url: "/APP-admin/signal/getNewPriceByStockCode",
                data: {stockCode: stock},
                success: function (data) {
                    if (data.success) {
                        $("#addPostion-price").val(data.data);
                    } else {
                        $("#addPostion-price").val(0);
                        Lobibox.notify('error', {
                            msg: "获取最新价格失败,请重试！",
                            width: 400,
                            sound: false,
                            delay: 2000
                        });
                    }
                }
            })
        } else {
            $("#addPostion-price").val("");
        }
    })

    $("#addPostion-bt1").click(function () {
        var dto = {
            "modelCode": $("#automodelTab li[class='active'] a").attr("id"),
            "quantity": 1
        };
        $.ajax({
            type: "POST",
            url: "/APP-admin/signal/addPostionCalculate",
            contentType: "application/json",
            data: JSON.stringify(dto),
            success: function (data) {
                $("#addPostion-percent").val(Math.floor(data.data * 100));
            }
        })
    })
    $("#addPostion-bt2").click(function () {
        var dto = {
            "modelCode": $("#automodelTab li[class='active'] a").attr("id"),
            "quantity": 2
        };
        $.ajax({
            type: "POST",
            url: "/APP-admin/signal/addPostionCalculate",
            contentType: "application/json",
            data: JSON.stringify(dto),
            success: function (data) {
                $("#addPostion-percent").val(Math.floor(data.data * 100));
            }
        })
    })
    $("#addPostion-bt3").click(function () {
        var dto = {
            "modelCode": $("#automodelTab li[class='active'] a").attr("id"),
            "quantity": 3
        };
        $.ajax({
            type: "POST",
            url:"/APP-admin/signal/addPostionCalculate",
            contentType: "application/json",
            data: JSON.stringify(dto),
            success: function (data) {
                $("#addPostion-percent").val(Math.floor(data.data * 100));
            }
        })
    })
    $("#addPostion-bt4").click(function () {
        var dto = {
            "modelCode": $("#automodelTab li[class='active'] a").attr("id"),
            "quantity": 4
        };
        $.ajax({
            type: "POST",
            url: "/APP-admin/signal/addPostionCalculate",
            contentType: "application/json",
            data: JSON.stringify(dto),
            success: function (data) {
                $("#addPostion-percent").val(Math.floor(data.data * 100));
            }
        })
    })

    $("#addPosition-confirm").bind("click", function () {
        var percent = $("#addPostion-percent").val();
        var stockName = $("#addPostion-stockName").val().substring(0, 6);
        var price = $("#addPostion-price").val();
        if (percent == "" || stockName == "" || price == "") {
            $("#notience").css("display", "block");
            return;
        }
        ;
        var regex = /^([1-9][0-9]?|100)$/;
        if (!regex.test(percent)) {
            $("#notience1").css("display", "block");
            return;
        }
        ;
        $("#notience1").css("display", "none");
        var hold = {
            "stockCode": stockName,
            "modelCode": $("#automodelTab li[class='active'] a").attr("id"),
            "type": 0,
            "percent": percent
        };
        $.ajax({
            type: "post",
            url: "signal/postionCalculate",
            contentType: "application/json",
            async: false,
            data: JSON.stringify(hold),
            success: function (resp) {
                if (resp.success) {
                    var data = resp.data;
                    $("#auto-stockCode").html(data.stockCode.substring(0, 6) + "(" + data.stockName + ")");
                    $("#auto-type").html(data.type == 0 ? "买入" : "卖出");
                    $("#auto-newquantity").val(data.quantity);
                    $("#auto-newprice").val(data.price);
                    $("#auto-oldposition").html((data.oldPostion * 100).toFixed(2));
                    $("#auto-newposition").html((data.newPostion * 100).toFixed(2));
                    if (data.type != 0) {
                        $("#auto-modalBody").css("color", "green");
                    } else {
                        $("#auto-modalBody").css("color", "red");
                    }
                    $("#stockCode_hidden").val(data.stockCode);
                    $("#stockName_hidden").val(data.stockName);
                    $("#modelCode_hidden").val(data.modelCode);
                    $("#modelName_hidden").val(data.modelName);
                    $("#type_hidden").val(data.type);
                    $("#quantity_hidden").val(data.quantity);
                    $("#price_hidden").val(data.price);
                    $("#addPosition").modal("hide");
                    $("#autoModelBuyer").modal("show");
                } else {
                    Lobibox.confirm({
                        msg: "<span style='color:red'>股票实时价格获取失败,推送信号会导致持仓存在一定偏差！<br/>点击确定继续推送</span>",
                        buttons: {
                            yes: {
                                class: 'btn btn-primary',
                                text: '确定'
                            },
                            no: {
                                class: 'btn btn-default',
                                text: '取消'
                            }
                        },
                        callback: function ($this, type, ev) {
                            if (type === "yes") {
                                var data = resp.data;
                                $("#auto-stockCode").html(data.stockCode.substring(0, 6) + "(" + data.stockName + ")");
                                $("#auto-type").html(data.type == 0 ? "买入" : "卖出");
                                $("#auto-newquantity").val(0);
                                $("#auto-newprice").val(0);
                                $("#auto-oldposition").html((data.oldPostion * 100).toFixed(2));
                                $("#auto-newposition").html((data.newPostion * 100).toFixed(2));
                                if (data.type != 0) {
                                    $("#auto-modalBody").css("color", "green");
                                } else {
                                    $("#auto-modalBody").css("color", "red");
                                }
                                $("#stockCode_hidden").val(data.stockCode);
                                $("#stockName_hidden").val(data.stockName);
                                $("#modelCode_hidden").val(data.modelCode);
                                $("#modelName_hidden").val(data.modelName);
                                $("#type_hidden").val(data.type);
                                $("#addPosition").modal("hide");
                                $("#autoModelBuyer").modal("show");
                            }
                        }
                    })
                }
            }
        })

    })

    function poolcheckTime() {
        var startTime = $("#pool-start-time").val();
        var endTime = $("#pool-end-time").val();
        if (startTime > endTime) {
            $(".poolcodetime").removeClass("hiddens");
        } else {
            $(".poolcodetime").addClass("hiddens");
        }
        if (endTime === '' || startTime === '') {
            $(".poolcodetime").addClass("hiddens");
        }
    }

    function weightcodetime() {
        var startTime = $("#weight-start-time").val();
        var endTime = $("#weight-end-time").val();
        if (startTime > endTime) {
            $(".weightcodetime").removeClass("hiddens");
        } else {
            $(".weightcodetime").addClass("hiddens");
        }
        if (endTime === '' || startTime === '') {
            $(".weightcodetime").addClass("hiddens");
        }
    }

    function getIndicesByPage(page, size) {
        var data = {
            'page': Number(page),
            'size': Number(size)
        };
        var url = "/APP-admin/indices/data/query";
        $.ajax({
            type: "post",
            url: url,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (resp) {
                if (resp.success) {
                    indicesInfoList(resp.data.list, page, size);
                    signalInfoCount = resp.data.totalCounts;
                    $('#add-indices-totalCounts').find('span').html(signalInfoCount);
                    var total = (signalInfoCount / 10);
                    if (total % 1 !== 0) {
                        total = parseInt(total) + 1;
                    }
                    $("#add-indices-pages").createPage({
                        total: total,
                        page: page,
                        callback: function (page) {
                            $(".add-indices-body").empty();
                            getIndicesByPage(page, size);
                        }
                    });
                }
            }
        });
    }

    function indicesInfoList(list, page, size) {
        var li_html = "";
        var num = (page - 1) * size + 1;
        $.each(list, function (idx, obj) {
            li_html += '<tr>'
                + '<td >' + (num++) + '</td>'
                + '<td>' + obj.stockCode + '</td>'
                + '<td>' + obj.marketCode + '</td>'
                + '<td>' + obj.indicesName + '</td>'
                + '<td>' + (obj.status == 0 ? "停用" : "启用") + '</td>'
                + '<td>' + '<button id="usedindices" class="btn btn-primary indices-show" name="' + obj.status + '">' + (obj.status == 0 ? "启用" : "停用") + '</button>' + '</td>'
            li_html += '</tr>';
        });
        $(".add-indices-body").html(li_html);
    }

    $("#add_indices").click(function () {
        $("#addIndices-market").val("");
        $("#addIndices-name").val("");
        $("#addIndices-code").val("");
        $("#addModal").modal("show");
    })

    $("#addIndices-code").bind("keyup click", function () {
        var stockName = $("#addIndices-code").val();
        var regex = /^(\d{1,6})/;
        var arr = stockName.match(regex);
        if (stockName == "" || arr != null) {
            $.ajax({
                type: "get",
                url: "/APP-admin/indices/getIndexByName",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {"stockName": stockName == "" ? "" : arr[0]},
                success: function (data) {
                    var li_html = "";
                    var data = data.data;
                    $("#typenum-indices").html("");
                    $.each(data, function (i, obj) {
                        $("#typenum-indices").append('<option value="' + obj.name + '">' + obj.stockcode + "(" + obj.name + ")" + '</option>');
                    })
                    /*$("#typenum").append('<option value="">q</option>');*/
                }
            })
        }
        $("#typenum-indices").css("display", "");
    })
    $("#typenum-indices").bind("click", function () {
        var stock = $("#typenum-indices").find("option:selected").text();
        if (stock != "") {
            $("#typenum-indices").prev("input").val(stock.substring(0, 6));
            $.ajax({
                type: "get",
                url: "/APP-admin/indices/getIndexByCode",
                data: {stock: stock.substring(0, 6)},
                success: function (data) {
                    if (data.success) {
                        $("#addIndices-market").val(data.data.exchange);
                        $("#addIndices-name").val(data.data.name);
                        $("#addIndices-code").val(data.data.stockcode);
                    }
                }
            })
        }
        $("#typenum-indices").css({"display": "none"});
    })

    $("#addModal").bind('click', function (e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.id && (elem.id == 'typenum-indices' || elem.id == "addIndices-code")) {
                return;
            }
            elem = elem.parentNode;
        }
        $('#typenum-indices').css('display', 'none');
    })
    $("#add_confirm").click(function () {
        var obj = {
            "marketCode": $("#addIndices-market").val(),
            "indicesName": $("#addIndices-name").val(),
            "stockCode": $("#addIndices-code").val()
        };
        $("#add_confirm").attr("disabled", "true");
        $.ajax({
            type: "post",
            url: "indices/add",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(obj),
            success: function (data) {
                $("#add_confirm").removeAttr("disabled");
                if (data.success) {
                    getIndicesByPage(1, 10);
                    Lobibox.notify('success', {
                        msg: "添加成功!",
                        width: 400,
                        sound: false,
                        delay: 1000
                    });
                } else {
                    Lobibox.notify('error', {
                        msg: "添加失败!",
                        width: 400,
                        sound: false,
                        delay: 1000
                    });
                }
                $("#addModal").modal("hide");
            }

        })

    })

    $('.add-indices-body').on('click', '.indices-show', function () {
        var code = $(this).parent().parent().find('td').eq(1).html();
        var status = $(this).attr('name');
        $.ajax({
            type: "get",
            url: "indices/updateStatus",
            data: {"code": code, "status": status},
            success: function (data) {
                getIndicesByPage(1, 10);
            }
        })
    })

    // function indexSelect(indexSelectName) {
    //     $.ajax({
    //         type: "get",
    //         url: 'APP-admin/indices/data/queryAll',
    //         async: false,
    //         contentType: "application/json;charset=UTF-8",
    //         dataType: "json",
    //         success: function (resp) {
    //             if (resp.success) {
    //                 $(indexSelectName).html("");
    //                 $.each(resp.data, function (i, obj) {
    //                     $(indexSelectName).append('<option value="' + obj.id + '">' + obj.indicesName + '</option>');
    //                 })
    //             }
    //         }
    //     });
    // }

    // function indexReturn() {
    //     $.ajax({
    //         type: "get",
    //         url: 'APP-admin/indices/data/queryAll',
    //         contentType: "application/json;charset=UTF-8",
    //         async: false,
    //         dataType: "json",
    //         success: function (resp) {
    //             if (resp.success) {
    //                 $("#indexReturn").html("");
    //                 $("#indexReturn").append("<li class='col-sm-3 col-md-3'><span>实盘收益率:</span> <span class='rate ifcontent col-sm-12'></span></li>");
    //                 $.each(resp.data, function (i, obj) {
    //                     $("#indexReturn").append("<li class='col-sm-3 col-md-3'><span>" + obj.indicesName + "收益率:</span><span id='index_" + obj.id + "' class='ifcontent col-sm-12' style='color: red;'></span></li>");
    //                 })
    //             }
    //         }
    //     });
    // }

    // login.js
    function validateForm() {
        return $("#loginform").validate({
            rules : {
                username : {
                    required : true
                    ,

                },
                password : {
                    required : true,
                    minlength : 6,
                    maxlength : 10
                }
            },
            messages : {
                username : {
                    required : "请输入用户名"
                    ,

                },
                password : {
                    required : "请输入密码",
                    minlength : "密码不能小于6位",
                    maxlength : "密码不能大于10位"
                }

            }
        });
    }
    $("body").keydown(function(event) {
        /* Act on the event */
        if (event.keyCode === 13) {
            $("#login").click();
        }
    });
    $("#login").click(function(event) {
        var username = $("#username").val();
        var password = $("#password").val();
        var key = "/insigmahengtiansofthtawill!$#$%%$%&^%*<";
        var passwordM = $.md5(password + key);

        var check = validateForm().form();
        if (check) {
            $.ajax({
                url : '/APP-admin/user/login?userName='
                    + username + '&password=' + passwordM,
                type : 'POST',
                dataType : 'json',
                contentType : 'application/json',
                success : function(data) {
                    if (data.success) {
                        var idDES = encryptByDES((data.data.id)
                                .toString(),
                            "insigmahengtiansofthta!$#$%%$%&^%*<");
                        $.cookie("alphagu_user_id", idDES, {
                            path : '/'
                        });
                        $.cookie("alphaguUserType",
                            data.data.userType);
                        $.cookie("alphaguUserName",
                            data.data.userName);
                        if(data.data.userType==='0'){
                            window.location.href = "/APP-admin/analyser";
                        }
                        if(data.data.userType==='1'){
                            // window.location.href = "/APP-admin/manage";
                            window.location.href = "/usermanage.html";
                        }
                        if(data.data.userType==='2'){
                            window.location.href = "/APP-admin/opetation";
                        }
                    } else {
                        $("#error").text(data.msg);
                    }
                },
                error : function(jqXHR, testStatus, errorThrow) {
                    console.log(jqXHR);
                }
            });
        }
    });
    // 加密
    function encryptByDES(message, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }

    // usermanage.js
    $("#addUser").click(function(event) {
        /* Act on the event */
        $('#addUserModal').find('label.error').hide();
        $("#addUserModal").modal("show");
        $('.modal-title').text('添加用户')
        $('#name').val("");
        $("#password").val("");
        $("#email").val("");
        $("#phonenum").val("");

    });
    $("#addUserModal").on('click', '#add', function(event) {
        var name = $("#name").val();
        var userType = $(".usertype:checked").val();
        var email = $("#email").val();
        var phonenum = $("#phonenum").val();
        var user = {
            "userName" : name,
            "userType" : userType,
            "email" : email,
            "phone" : phonenum
        }
        var check = validAddForm().form();
        if (check) {

            $.ajax({
                url : "/APP-admin/user/add",
                type : 'POST',
                dataType : 'json',
                contentType : 'application/json',
                processData : false,
                crossDomain : true,
                data : JSON.stringify(user),
                success : function(data) {
                    if (data.success) {

                        $("#addUserModal").modal("hide");
                        Lobibox.notify('success', {
                            msg : "用户添加成功!用户名和密码已发送到对应邮箱",
                            width : 400,
                            sound:false,
                            delay : 1000

                        });

                        $("#usertable tbody tr").remove();
                        getUsers(1);

                    } else {
                        Lobibox.alert('error', {
                            msg : "用户添加失败!",
                            width : 400,
                            delay : 1000

                        });
                    }
                },
                error : function(jqXHR, testStatus,
                                 errorThrow) {
                    console.log(jqXHR);

                }
            });

        }
    });
    $("#usertable").on('click', '.reset', function(event) {
        var userId = $(this).parents("tr").attr("data-id");
        Lobibox.confirm({
            msg:'确认该账户要重置密码吗？',
            callback:function($this,type,ev){
                if(type==='yes'){
                    $.ajax({
                        url : '/APP-admin/user/resetpwd?userId='
                            + userId,
                        type : 'PUT',
                        dataType : 'json',
                        success : function(resp) {
                            if(resp.success){
                                Lobibox.notify('success', {
                                    msg : "密码已重置,新密码已发送到对应邮箱",
                                    width : 400,
                                    sound:false,
                                    delay : 1000
                                });
                            }else{
                                Lobibox.notify('error', {
                                    msg : resp.msg,
                                    width : 400,
                                    sound:false,
                                    delay : 1000
                                });
                            }
                        }
                    });
                }
            }
        });
    });
    $("#usertable").on('click', '.update', function(event) {
        var userName=$.cookie('alphaguUserName'),
            userId = $(this).parents("tr").attr("data-id"),
            typeName=$(this).parents('tr').find('td:nth-child(3)').text(),
            type;
        if(typeName==='管理员'){
            type='1';
        }else if(typeName==='分析师'){
            type='0';
        }else if(typeName==='运营管理员'){
            type='2';
        }
        $('.update-usertype[value="'+type+'"]').prop('checked',true);
        $('#update-name').html($(this).parents('tr').find('td:nth-child(1)').text()).attr('data-id',userId);
        $('#update-email').val($(this).parents('tr').find('td:nth-child(4)').text());
        $('#update-phonenum').val($(this).parents('tr').find('td:nth-child(5)').text());
        if(userName!=='admin'){
            $('.update-admin').addClass('hide');
        }else{
            $('.update-admin').removeClass('hide');
        }
        $('#updateUserModal').find('label.error').hide();
        $('#updateUserModal').modal();
    });
    $('#update-submit').click(function(){
        var id=$('#update-name').attr('data-id'),
            type=$('.update-usertype:checked').val(),
            email=$('#update-email').val(),
            phonenum=$('#update-phonenum').val();
        var check=validUpdateForm().form();
        if(check){
            $.ajax({
                url:'/APP-admin/user/updateUserInformation',
                type:'PUT',
                dataType:'json',
                contentType:'application/json;charset=utf-8',
                data:JSON.stringify({
                    "id" : id,
                    "userType" : type,
                    "email" : email,
                    "phone" : phonenum
                }),
                success:function(resp){
                    if(resp.success){
                        $('#updateUserModal').modal('hide');
                        $("#usertable tbody tr").remove();
                        getUsers(1);
                        Lobibox.notify('success',{
                            msg:'信息变更成功',
                            sound:false,
                            delay:1000
                        });
                    }
                }
            });
        }
    });
    jQuery.validator.addMethod("isPhonenumer", function(value,
                                                        element) {
        var mobile = /^1[3|4|5|7|8]\d{9}$/;

        return this.optional(element) || mobile.test(value);

    }, '请输入正确手机号');
    function validAddForm() {
        return $("#adduserform").validate({
            rules : {
                name : {
                    required : true
                },
                email : {
                    required : true,
                    email : true
                },
                phonenum : {

                    isPhonenumer : true
                }

            },
            messages : {
                name : {
                    required : "请输入用户名"
                },

                email : {
                    required : "请输入邮箱",
                    email : "请输入正确邮箱"
                }

            }

        });
    };
    function validUpdateForm() {
        return $("#updateuserform").validate({
            rules : {
                email : {
                    required : true,
                    email : true
                },
                phonenum : {
                    isPhonenumer : true
                }
            },
            messages : {
                email : {
                    required : "请输入邮箱",
                    email : "请输入正确邮箱"
                }
            }
        });
    };
    $("#usertable").on('click', '.delete', function(event) {
        var userId = $(this).parents("tr").attr("data-id");
        Lobibox.confirm({
            msg : "确定要删除这个用户吗?",
            callback : function($this, type, ev) {
                // Your code goes here
                if (type === "yes") {
                    $.ajax({
                        url : '/APP-admin/user/delete?userId='
                            + userId,
                        type : 'DELETE',
                        dataType : 'json',
                        success : function(data) {
                            if (data.success) {
                                $("#usertable tbody tr").remove();
                                getUsers(1);
                                Lobibox.notify('success', {
                                    msg : "删除成功!",
                                    width : 400,
                                    sound :false,
                                    delay : 1000
                                });
                            } else {
                                Lobibox.notify('error', {
                                    msg : "删除失败!",
                                    width : 400,
                                    sound:false,
                                    delay : 1000
                                });
                            }
                        },
                        error : function(jqXHR, testStatus, errorThrow) {
                            console.log(jqXHR)
                        }
                    });
                }
            }
        });
    });
    
    // export.js
    $('#export').click(function() {
		var pdf = new jsPDF('p', 'pt', 'a4');
		var options = {
			pagesplit : true
		};
		var clenth = document.getElementById('exportcontaner')[1];
		pdf.setFillColor(255, 255, 255);
		pdf.setDrawColor(255, 255, 255);
		pdf.addHTML(document.getElementById('exportcontaner'), options,
			function() {
				pdf.setFillColor(255, 255, 255);
				pdf.setDrawColor(255, 255, 255);
				pdf.save("test" + new Date().getTime() + "pdf");
			}
		);
	})


})

    // });
// });
