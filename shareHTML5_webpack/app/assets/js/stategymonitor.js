$(function() {
    var $selectMenu = JSON.parse(window.sessionStorage.getItem('selectMenu'));
    var $childMenu = $selectMenu.childList[0];
    var type,name,modelId;
    type = $childMenu.dataType;
    name = $childMenu.name;
    modelId = $childMenu.dataId;
    if($selectMenu.menuClass === 'stragety-monitor'){
        if(type === 1){
            $('.intelligent-strategy').removeClass('hide');
            $('.optimization-stock').addClass('hide');
            $('#strategy-tab2').text('持仓信息');
            $("#strategymonitorcontent").show().siblings().hide();
            indexReturn();
            indexSelect('#indexMonitorSelect');
            $("#monitor-modalid-hide").val(modelId);
            modelInfo(name);
            capitalSearch(modelId);
            type = $("#commonconratetainer").parent().find('select').val();
            earningsProfiles(name,type);
            $("#commonconratetainer").parent().find('.list-3').addClass('disabled').removeClass('press');
            $("#commonconratetainer").parent().find('.list-12').addClass('disabled').removeClass('press');
            $("#commonconratetainer").parent().find('.list-all').addClass('press');
            rateLineInfo(name,'commonconratetainer', type);
            rateLineTableInfo(name,type,1);
            $('#ratelinetable').find('.common-th').text($("#commonconratetainer").parent().find('select').find("option:selected").html()+"收益率");
            selectChange('commonconratetainer',name);
            selectTime("commonconratetainer",name);
            holdInInfo(name, 1);
            tradePoolInfo(name,modelId, 1,0,0);
            sortTrades();
            pageShow("#holdinpage", 4, name);
            $("#holdinpage .previous").addClass('disabled');
            pageShow("#tradepoolpage", 5, name);
            $("#tradepoolpage .previous").addClass('disabled');
            getBullMsgs(1,modelId);
        }else{
            $('.intelligent-strategy').addClass('hide');
            $('.optimization-stock').removeClass('hide');
            $('#strategy-tab2').text('当前股池');
            $("#strategymonitorcontent").show().siblings().hide();
            $("#opt-modalid-hide").val(modelId);
            $('#opt-stock-size').val('10');
            modelInfo(name);
            optStockInfo(1,10);
            optStockPresent(1,10,1,1);
            optStockTradeInfo(1,10,0,1);
            getBullMsgs(1,modelId);
        }
        $("#myTablist").find("li:eq(0)").addClass('active').siblings().removeClass('active');
        $("#commonInfo").addClass('in active').siblings().removeClass('in active');
        $("title").text('AlphaGu后台管理-策略监控');
    }else if($selectMenu.menuClass === 'stragety-anaysis'){
        $("#strategycontent").show().siblings().hide();
        $('.out').hide();
        $('.in-s').show();
        name = $childMenu.name;
        modelId = $childMenu.dataId;
        indexSelect('#indexTabSelect');
        $("#analysispage").hide();
        $("#analysispage .previous").addClass('disabled');
        type = $("#ratecontainer").parent().find('select').val();
        earningsProfiles(name, type);
        getAnnualRateList(modelId);
        $("#ratecontainer").parent().find('.list-3').addClass('disabled').removeClass('press');
        $("#ratecontainer").parent().find('.list-12').addClass('disabled').removeClass('press');
        $("#ratecontainer").parent().find('.list-all').addClass('press');
        $("#myTab").find("li:eq(0)").addClass('active').siblings().removeClass('active');
        $("#earningsprofiles").addClass('in active').siblings().removeClass('in active');
        rateLineInfo(name,"ratecontainer",type);
        selectChange("ratecontainer", name);
        selectTime("ratecontainer", name);
        $('#searchdateform').hide();
        modelAnalysis(name, 1);
        $("title").text('AlphaGu后台管理-策略分析');
    }
    

    function indexReturn() {
        var url = "/APP-admin/indices/data/queryAll";
        $.ajax({
            type: "get",
            url: url,
            contentType: "application/json;charset=UTF-8",
            async: false,
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    $("#indexReturn").html("");
                    $("#indexReturn").append("<li class='col-sm-3 col-md-3'><span>实盘收益率:</span> <span class='rate ifcontent col-sm-12'></span></li>");
                    $.each(resp.data, function (i, obj) {
                        $("#indexReturn").append("<li class='col-sm-3 col-md-3'><span>" + obj.indicesName + "收益率:</span><span id='index_" + obj.id + "' class='ifcontent col-sm-12' style='color: red;'></span></li>");
                    })
                }
            }
        });
    }
    function indexSelect(indexSelectName) {
        var url = "/APP-admin/indices/data/queryAll";
        $.ajax({
            type: "get",
            url: url,
            async: false,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    $(indexSelectName).html("");
                    $.each(resp.data, function (i, obj) {
                        $(indexSelectName).append('<option value="' + obj.id + '">' + obj.indicesName + '</option>');
                    })
                }
            }
        });
    }
    function modelInfo(name) {
        $.ajax({
            url: '/APP-admin/model/' + name,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.success) {
                    var model = data.data;
                    var annualizedReturnRate, realTimeReturnRatio;
                    $(".modelDisName").text(model.modelDisplayName);
                    var startTime = model.onLineTime;
                    var startDate = toDate(startTime);
                    $(".realStarttime").text(startDate);
                    $(".realDate").text(model.firmTime);
                }
            },
            error: function (jqXHR, testStatus, errorThrow) {
                //console.log(jqXHR);
            }
        });
    }
    //策略总资产及可用资金查询
    function capitalSearch(id) {
        $.ajax({
            type: "GET",
            url: '/APP-admin/model/runtime/data?id=' + id,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            success: function (resp) {
                if (resp.success) {
                    if (resp.data !== null) {
                        $('.total-capital').html(resp.data.totalCapital !== null ? resp.data.totalCapital.toFixed(2) : '');
                        $('.available-capital').html(resp.data.availableCapital !== null ? resp.data.availableCapital.toFixed(2) : '');
                    } else {
                        $('.total-capital').html('');
                        $('.available-capital').html('');
                    }
                }
            }
        });
    }
    // 策略概况
    function earningsProfiles(name, type) {
        $.ajax({
            url: '/APP-admin/model/summary/' + name,
            type: 'GET',
            data: {"indicesId": type},
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.success && data.data !== null) {
                    var model = data.data;
                    var annualizedReturnRate, realTimeReturnRatio, biggestAssetRetreatRatio,
                        csi300rate, csi500rate, benchmark, alpha, beta, zhongxiaorate;
                    var sharpe, volatility, benchmarkvolatility, enchmarkannualrate,
                        earnRatio, dateRatio, earnLossRatio, earnCount, loseCount;
                    realTimeReturnRatio = dataFix(
                        model.realtimeReturnRatio,
                        '.rate');

                    $(".rate").text(
                        (realTimeReturnRatio * 100)
                            .toFixed(2)
                        + "%");

                    annualizedReturnRate = dataFix(
                        model.annualizedReturnRatio,
                        '#annualrate');

                    $("#annualrate").text(
                        (annualizedReturnRate * 100)
                            .toFixed(2)
                        + "%");

                    biggestAssetRetreatRatio = dataFix(
                        model.biggestAssetretreatRatio,
                        '#maximumRetracement');
                    $("#maximumRetracement")
                        .text(
                            (biggestAssetRetreatRatio * 100)
                                .toFixed(2)
                            + "%");
                    var indexModelDataList = model.indexModelDataList;
                    if (indexModelDataList.length != 0) {
                        for (var i = 0; i < indexModelDataList.length; i++) {
                            var obj = indexModelDataList[i];
                            var elementId = "#index_" + obj.referenceIndicesId;
                            var indexRate = dataFix(obj.indexReturnRatio, elementId);
                            $(elementId).text((indexRate * 100)
                                    .toFixed(2)
                                + "%");
                        }
                    }

                    benchmark = dataFix(
                        model.indexReturnRatio,
                        '#benchmark');
                    benchmarkvolatility = dataFix(
                        model.indexBenchmakVotality,
                        '#benchmarkvolatility');
                    enchmarkannualrate = dataFix(
                        model.indexAnnualizedReturnRatio,
                        '#enchmarkannualrate');
                    dateRatio = dataFix(
                        model.indexEarnDaysRatio,
                        '#dayodds');
                    alpha = dataFix(model.indexAlpha,
                        '#alpha');
                    beta = dataFix(model.indexBeta,
                        '#beta');


                    $('#benchmark').text(
                        (benchmark * 100).toFixed(2)
                        + "%");
                    $("#benchmarkvolatility").text(
                        benchmarkvolatility);
                    if (enchmarkannualrate === 'N/A') {
                        $("#enchmarkannualrate").text(
                            enchmarkannualrate);
                    } else {
                        $("#enchmarkannualrate").text(
                            (enchmarkannualrate * 100)
                                .toFixed(2)
                            + '%');
                    }

                    $("#dayodds").text(dateRatio);

                    $("#alpha").text(alpha);

                    $("#beta").text(beta);
                    sharpe = dataFix(model.sharpe,
                        '#sharpe');
                    $("#sharpe").text(sharpe);
                    volatility = dataFix(model.volatility,
                        '#volatility');
                    $("#volatility").text(volatility);
                    earnRatio = dataFix(model.earnRatio,
                        '#odds');
                    $("#odds").text(earnRatio);
                    earnLossRatio = dataFix(
                        model.earnLossRatio,
                        '#profitlossrate');
                    $("#profitlossrate")
                        .text(earnLossRatio);
                    earnCount = dataFix(model.earnCount,
                        '#profitnum');
                    $('#profitnum').text(earnCount);
                    loseCount = dataFix(model.loseCount,
                        '#loss');
                    $('#loss').text(loseCount);

                    if (model.averageTransactionFrequency > 0) {
                        $("#aveTransactionFrequency").css(
                            "color", "red");
                    } else if (model.averageTransactionFrequency < 0) {
                        $("#aveTransactionFrequency").css(
                            "color", "green");
                    } else {
                        $("#aveTransactionFrequency").css(
                            "color", "black");
                    }
                    if (model.averageTransactionFrequency === null) {
                        aveTransactionFrequency = 'N/A';
                    } else {
                        aveTransactionFrequency = (model.averageTransactionFrequency * 100)
                                .toFixed(2)
                            + "%";
                    }
                    $("#aveTransactionFrequency").text(
                        aveTransactionFrequency);
                    $('#averageHoldingTime').text(
                        model.averageHoldingTime + '天');
                } else {
                    $(".ifcontent").text('');
                }
            },
            error: function (jqXHR, testStatus, errorThrow) {
                console.log(jqXHR);
            }
        });
    }
    function selectChange(container, name) {
        var $select = $("#" + container).parent().find('select');
        $select.unbind('change');
        $select.change(function () {
            var type = $(this).val();
            var timeSelect = $("#" + container).parent().find(
                '.press span').text();

            rateLineInfo(name, container, type, timeSelect);
            earningsProfiles(name, type);
            rateLineTableInfo(name, type, 1);
            $('#ratelinetable').find('.common-th').text($(this).find("option:selected").html() + "收益率");
        });
    }
    function rateLineInfo(name, container, type, timeSelect) {
        var modelList = {
            "modelNameList": [name],
            indicesId: type
        };
        var jsonmodel = JSON.stringify(modelList);
        $("#" + container).find('div').remove();
        // 收益率折线图
        $.ajax({
            url: '/APP-admin/model/graph',
            type: "POST",
            timeout: 3000, // 超时时间设置，单位毫秒
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(modelList),
            success: function (data) {
                var modelname = name;
                var result = data.data;
                var list = result[modelname];
                var dates = [];
                var rates = [];
                var csi300ReturnRatios = [];
                var csi500ReturnRatios = [];
                var zxbzTodayReturnRatios = [];
                var overRates = [];
                var startMDate;
                var startYDate;
                var date, realtimeReturnRatio, csi300ReturnRatio, csi500ReturnRatio, zxbzTodayReturnRatio;
                if (data.success && list.length > 0) {

                    var startDate = list[0].createDate;
                    startMDate = list[list.length - 1].createDate
                        - 3 * 30 * 24 * 60 * 60 * 1000;
                    startYDate = list[list.length - 1].createDate
                        - 365 * 24 * 60 * 60 * 1000;
                    if (startDate <= startMDate) {
                        $("#" + container).parent().find(
                            '.list-3').removeClass(
                            "disabled");

                    } else {
                        $("#" + container).parent().find(
                            '.list-3').addClass(
                            'disabled');
                    }
                    if (startDate <= startYDate) {
                        $("#" + container).parent().find(
                            '.list-12').removeClass(
                            'disabled');

                    } else {
                        $("#" + container).parent().find(
                            '.list-12').addClass(
                            'disabled');
                    }
                    for (var i = 0; i < list.length; i++) {
                        if (timeSelect === '近3个月') {
                            if (list[i].createDate >= startMDate) {
                                date = list[i].createDate;
                                realtimeReturnRatio = list[i].realtimeReturnRatio;
                                zxbzTodayReturnRatio = list[i].indexReturnRatio;

                            }
                        } else if (timeSelect === '最近一年') {
                            if (list[i].createDate >= startYDate) {
                                date = list[i].createDate;
                                realtimeReturnRatio = list[i].realtimeReturnRatio;
                                zxbzTodayReturnRatio = list[i].indexReturnRatio;
                            }
                        } else {
                            date = list[i].createDate;
                            realtimeReturnRatio = list[i].realtimeReturnRatio;
                            zxbzTodayReturnRatio = list[i].indexReturnRatio;
                        }
                        if (date) {

                            dates.push(toDate(date));
                            rates
                                .push((realtimeReturnRatio * 100)
                                    .toFixed(2));

                            zxbzTodayReturnRatios
                                .push((zxbzTodayReturnRatio * 100)
                                    .toFixed(2));

                            overRates
                                .push(((realtimeReturnRatio - zxbzTodayReturnRatio) * 100)
                                    .toFixed(2));
                        }
                    }
                    $("#" + container).parent().show();
                    lineChart(container, dates, rates,
                        result.indicesName,
                        csi500ReturnRatios,
                        zxbzTodayReturnRatios,
                        overRates, type);
                } else {
                    $("#" + container).parent().hide();

                }
            }
        });
    }
    function selectTime(container, name) {
        var $select = $("#" + container).parent().find(
            '.switch-liist');
        $select.unbind('click');
        $select.click(function (event) {
            if ($(this).hasClass('disabled')) {
                event.preventDefault();
            } else {
                var timeSelect = $(this).find('span').text();
                $(this).addClass('press').siblings().removeClass(
                    'press');
                var type = $("#" + container).parent().find(
                    'select').val();
                rateLineInfo(name, container, type, timeSelect);
            }
        });
    }
    function rateLineTableInfo(name, type, page) {
        var modelList = {
            "modelNameList": [name],
            "indicesId": type
        };
        var jsonmodel = JSON.stringify(modelList);
        $.ajax({
            url: '/APP-admin/model/graph',
            type: "POST",
            timeout: 3000, // 超时时间设置，单位毫秒
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(modelList),
            success: function (data) {
                var modelname = name;
                var result = data.data;
                var list = result[modelname];
                var maxPage = Math.ceil(list.length / 50)
                msgRateLineTable(list, type);
            }
        })
    }
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
    function sortTrades() {
        var i = 1;
        var table = $('#tradetables').DataTable();
        $('#tradetables').on('click', 'th', function () {
            // This will show: "Ordering on column 1 (asc)", for example
            if (!$(this).hasClass('nosort')) {
                var mid = $("#tradetables tbody").attr('data-mpdelId');
                var name = $("#tradetables tbody").attr('data-modelName');
                var order = table.order();
                var whichColumn, whichPattern;
                var column = order[0][0];
                var pattern = order[0][1];
                if (column === 3) {
                    whichColumn = 2;
                } else {
                    whichColumn = column;
                }
                if (pattern === 'asc') {
                    whichPattern = 1;
                } else {
                    whichPattern = 0;
                }
                tradePoolInfo(name, mid, 1, whichColumn, whichPattern)
                console.log(i);
                i++;
                return false;
            }
        })
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
    function lineChart(container, dates, rates, indicesName, csi500s,zxbzs, overRates, type) {
        var mychart = echarts.init(document.getElementById(container));
        var option = {
            title: {
                text: '收益率走势',
                top:'3%',
                padding: [0,95]
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                align: 'right',
                top:'10%',
                data: ['实盘收益率'],
                selectedMode: false,
                selected: {
                    '实盘收益率': true,
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
                name: '收益率',
                splitNumber: 10,
                axisLabel: {
                    formatter: '{value} %'
                }
            }],
            series: [{
                name: '实盘收益率',
                type: 'line',
                data: rates,
            }]
        };
        option.legend.data.push(indicesName + "收益率");
        option.series.push({
            name: indicesName + "收益率",
            type: "line",
            data: zxbzs
        });
        if (overRates.length > 0 && container === 'ratecontainer') {
            option.legend.data.push("超额收益率");
            option.series.push({
                name: '超额收益率',
                type: "line",
                data: overRates
            });
        }
        mychart.setOption(option);
    }
    function msgRateLineTable(list, type) {
        var table = $('#ratelinetable').dataTable();
        var oSettings = table.fnSettings();
        var $tbody = $("#ratelinetable tbody");
        table.fnClearTable(this);
        var dataResult = list;
        var date;
        if (dataResult.length > 0) {
            for (var i = 0; i < dataResult.length; i++) {
                date = toDate(dataResult[i].createDate);
                var realtimeReturnRatio = (dataResult[i].realtimeReturnRatio * 100).toFixed(2);
                var indexReturnRatio = (dataResult[i].indexReturnRatio * 100).toFixed(2);
                var ss;
                ss = [date, realtimeReturnRatio, indexReturnRatio];
                table.oApi
                    ._fnAddData(oSettings, ss);
            }
            oSettings.aiDisplay = oSettings.aiDisplayMaster
                .slice();
            table.fnDraw();
            $tbody.show();

        } else {
            $tbody.hide();
        }
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
    //各年度收益率
    function getAnnualRateList(modelId) {
        $.ajax({
            url: '/APP-admin/model/annualizedreturns/' + modelId,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var list = data.data;
                var $select = $('#annualratelist');
                $select.find('option').remove();
                if (data.success && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var $option = $('<option>').attr('value', list[i].year).attr('data-rate', list[i]['return']).appendTo($select).text(list[i].year);

                    }
                    $select.val(list[list.length - 1].year);
                    var rate = dataFix(list[list.length - 1]['return'], '.annaul-span');
                    $('.annaul-span').text((rate * 100)
                            .toFixed(2)
                        + "%");
                } else {
                    $('.annaul-span').text('');
                }
            }
        })
    }
    function modelAnalysis(modelName, page) {
        var url = '/APP-admin/model/holdPositionInfo?modelName=' + modelName;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var table = $(".anaysis-table").dataTable();
                var oSettings = table.fnSettings();
                var temp = [];
                var $tbody = $(".anaysis-table tbody");
                table.fnClearTable(this);
                var maxPage;
                if (data.success && data.data.list.length > 0) {
                    var list = data.data.list;
                    maxPage = Math.ceil(data.data.totalCount / 20);
                    for (var i = 0; i < list.length; i++) {
                        var returnRatio;
                        var holdingPositionRatio = "0";
                        if (list[i].returnRatio === null) {
                            returnRatio = "N/A";
                        } else {
                            returnRatio = (list[i].returnRatio * 100).toFixed(2);
                        }
                        if (list[i].holdingPositionratio === null) {
                            holdingPositionRatio = "0";
                        } else {
                            holdingPositionRatio = list[i].holdingPositionratio;
                        }
                        var ss = [
                            toDateTime(list[i].lastBuyTime),
                            list[i].stockName + "(" + list[i].stockCode
                            + ")", returnRatio, holdingPositionRatio];
                        temp.push(ss);

                        var newline = table.oApi._fnAddData(oSettings, ss);
                        $(oSettings.aoData[newline].nTr)
                            .attr("data-id", list[i].stockCode)
                            .attr("name", modelName)
                            .attr('stockName', list[i].stockName);
                    }
                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    table.fnDraw();
                    $tbody.show();
                } else {
                    $tbody.hide();
                    $("#analysispagenum").text("0");
                }
            },
            error: function (jqXHR, testStatus, errorThrow) {
                // console.log(jqXHR);
            }
        });
    }
})