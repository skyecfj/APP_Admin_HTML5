require([
        './assets/js/vendor/jquery.min',
        './assets/js/vendor/echarts',
        './assets/js/vendor/theme/shine',
    ],
function($, echarts, shine) {
    var tradePrices = [],
        trdes = [];
        var pairs = getUrlPara(),
        modelName = pairs.modelName,
        code = pairs.code;
    var klineChart, VOLChart, KPIChart, klineOption, VOLOption, KPIOption;
    var klineAjaxStart,klineAjaxEnd,handleKlineStart,handleKlineEnd;
    function init() {
        $.ajaxSettings.async = false;
        // $.getJSON('/APP-admin/host/host.json?' + Math.random(), function(
        //     data) {
        //     host = data.host;
        // });
        $.ajaxSettings.async = true;

        if (modelName) {
        // modelDetail('ShortTerm', '000001', 1);
        modelDetail(modelName, code, 1);
        }
        // if (modelId) {
        // outModelDetail(modelId, code, 0);
        // }
        bindTypeHandler();
    }

    function changeType() {
        $('.nav').bind('click',function () {
            type = $(this).data('type');
        })
    }

    function kline(stockCode, macdinitTime, endTime, ktrades, ktype,
        restorationtype) {

        var startTime, startT
        if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {
            startTime = '01/01/2000 00:00:00 AM';

        } else if (ktype === 'M5') {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24 * 60 * 5);

        } else if (ktype === 'M15') {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24 * 60 * 15);

        } else if (ktype === 'M30') {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24 * 60 * 30) + ' 9:00:00 PM';
            startT = macdinitTime - 60 * 60 * 1000 * 24 * 30
        } else {
            startTime = tokTime(macdinitTime - 60 * 60 * 1000 * 24 * 60 * 60) + ' 9:00:00 PM';
        }

        var tradePrices = [];
        var tradeObjects = [];
        var trdes = []
        var times = [];
        for (var i = 0; i < ktrades.length; i++) {
            tradePrices.push(ktrades[i].value);
            if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {
                var index = ktrades[i].xAxis.indexOf(' ');

                trdes.push({
                    name: ktrades[i].name,
                    value: ktrades[i].value,
                    xAxis: ktrades[i].xAxis.substring(0, index),
                    yAxis: ktrades[i].yAxis
                });

            }

        }

        var url = host + '/Klines?instrument=' + stockCode + '&kType=' + ktype + '&startTime=' + startTime + '&endTime=' + endTime + '&weightingType=' + restorationtype;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            beforeSend: function() {
                $(".loading").show();
                klineAjaxStart = new Date().valueOf()
            },
            complete: function() {
                $(".loading").hide();
            },
            timeout: 2000,
            success: function(data) {
                if(data.Code == '0'){
                    alert(data.Msg);
                    return;
                }
                klineAjaxEnd = new Date().valueOf()
                handleKlineStart = new Date().valueOf()

                var list = data.Data;
                var title = data.Data[0].InstrumentID;
                var data0 = splitData(list, '', ktype);

                $("#kcontainer").show();
                $("#kcontainer2").show();
                // $("#kcontainer3").show();
                if ($('.zibtype .press').hasClass('klist-macd')) {
                    $("#kcontainer3").show();
                } else {
                    $("#kcontainer4").show();
                }
                //TOD:delete
                // data0.categoryData.splice(10,data0.categoryData.length-10);
                if (data0.categoryData.length > 0) {

                    for (var i = 0; i < data0.categoryData.length; i++) {
                        tradePrices.push(data0.values[i][3]);
                        tradePrices.push(data0.values[i][2]);

                        for (var j = 0; j < trdes.length; j++) {
                            if (data0.categoryData[i] === trdes[j].xAxis) {
                                if (trdes[j].name.indexOf('买入') > 0) {

                                    tradeObjects.push({
                                        'name': '买入',
                                        'coord': [i,
                                            data0.values[i][3]
                                        ],
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
                                if (trdes[j].name.indexOf('卖出') > 0) {
                                    tradeObjects.push({
                                        'name': '卖出',
                                        'coord': [i,
                                            data0.values[i][2]
                                        ],
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
                    var maxvalue = Math.max.apply(null, tradePrices);
                    var minvalue = Math.min.apply(null, tradePrices);
                    var addPoint = (((maxvalue - minvalue) / 0.8) - (maxvalue - minvalue)) / 2

                    var MACDResults = calulateMACD(list, '');
                    var KDJResults = calculateKDJ(list, '', 9);

                    var myChart = echarts.init(document
                        .getElementById('klineContainer'), shine);
                    var myChart2 = echarts.init(document
                        .getElementById('VOLContainer'));
                    // var title = $('.modal-title').attr(
                    // 'data-stockname');
                    var option = {
                        // title : {
                        //  text : title
                        // },
                        color: ['#ff7f50', '#87cefa', '#40e0d0', '#c23531',
                            '#ff69b4', '#ba55d3', '#7b68ee', '#ffa500'
                        ],
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            axisPointer: {
                                type: 'line'
                            },
                            position: function(point, params, dom) {
                            },
                            formatter: function(params) {
                                var html = new Array();
                                if (params) {
                                    html.push('<div class="date">' + params[0].name.replace(/-/g, '/') + '</div>');
                                    var param = params[0];
                                    if (param.seriesName === 'k线') {
                                        html.push('开<span class="kvalue"  style="color:' + params[0].color + '">' + param.value[0] + '</span>');
                                        html.push('高<span class="kvalue"  style="color:' + params[0].color + '">' + param.value[3] + '</span>');
                                        html.push('收<span class="kvalue"  style="color:' + params[0].color + '">' + param.value[1] + '</span>');
                                        html.push('低<span class="kvalue"  style="color:' + params[0].color + '">' + param.value[2] + '</span>');
                                    }
                                    html.push('<div class="avenue">')
                                    for (var i = 1; i < params.length; i++) {
                                        param = params[i];
                                        if (param.seriesName == 'MA30' || param.seriesName == 'MA10' || param.seriesName == 'MA5') {
                                            html.push('<div class="MA" style="color:' + param.color + '">' + param.seriesName + '<span class="value">' + param.value + '</span></div>');
                                        }
                                    }
                                    html.push('</div>');
                                    $('.klineCurrent').html(html.join(''));
                                }
                                return '';
                            }
                        },
                        legend: {
                            show: false,
                            data: ['k线', 'MA5', 'MA10', 'MA30']
                        },
                        dataZoom: [{
                                type: 'inside',

                                start: 0,
                                end: 100
                            }
                            /*, {
                                                                type : 'slider',
                                                                show : false,
                                                                right : '15%',

                                                                start : 0,
                                                                end : 100
                                                            }*/
                        ],
                        grid: {
                            left: '15%',
                            right: '15%',
                            bottom: 25
                        },
                        xAxis: [{
                            type: 'category',
                            scale: true,
                            boundaryGap: true,
                            axisTick: {
                                onGap: true,
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#eee']
                                }
                            },
                            axisLine: {
                                show: false
                            },
                            data: data0.categoryData
                        }],
                        yAxis: [{
                            type: 'value',
                            scale: true,
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#eee']
                                }
                            },
                            axisLine: {
                                show: false
                            }
                        }],
                        series: [{
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
                                            // position : 'bottom',
                                            formatter: function(params) {
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
                                data: calculateMA(5, data0),
                                smooth: true,

                            }, {
                                name: 'MA10',
                                type: 'line',
                                data: calculateMA(10, data0),
                                smooth: true,

                            },

                            {
                                name: 'MA30',
                                type: 'line',
                                data: calculateMA(30, data0),
                                smooth: true,

                            },

                        ]
                    };

                    if (ktype !== 'D1' && ktype !== 'Week1' && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option.dataZoom = [{
                            type: 'inside',
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }, {
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
                            position: function(point, params, dom) {
                                // 固定在顶部
                                return [point[0], '10%'];
                            },
                            trigger: 'axis',
                            showDelay: 0,
                            axisPointer: {
                                type: 'line'
                            },
                            formatter: function(params) {
                                    if (params) {
                                        var text = new Array();
                                        params.forEach(function(o) {
                                            text.push('<div class="data" style="color:' + o.color + '">' + replaceStr(o.seriesName) + ':' + o.value + "</div>");
                                        })
                                        $('.VOLCurrent').html(text.join(''));
                                    }
                                    function replaceStr(str) {
                                        return str.replace('成交量','VOL').replace('5日均量','MA5');
                                    }
                                    return '';
                                }
                                // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        color: ['#c23531', '#ff69b4'],
                        legend: {
                            show: false,
                            data: ['VOL', 'MA5']
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
                            top: 30,
                            bottom: 10
                                // height : '60%'
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
                                show: true,
                                lineStyle: {
                                    color: ['#eee']
                                }
                            },
                            axisLine: {
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
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#eee']
                                }
                            },
                            axisLine: {
                                show: false
                            }
                        }],
                        series: [{
                            name: '成交量',
                            type: 'bar',

                            data: data0.volumns,
                            barWidth: 5,
                            itemStyle: {
                                normal: {
                                    color: function(params) {

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

                        }, {
                            name: '5日均量',
                            type: 'line',
                            data: calculateMavol(5, data0),
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#ff69b4',
                                }
                            }
                        }]
                    };
                    var mychart3 = echarts.init(document
                        .getElementById('KPIContainer'));
                    var option3 = {
                        tooltip: {
                            position: function(point, params, dom) {
                                // 固定在顶部
                                return [point[0], '10%'];
                            },
                            trigger: 'axis',
                            showDelay: 0,
                            axisPointer: {
                                type: 'line'
                            },
                            formatter: function(params) {
                                var text = new Array();
                                params.forEach(function(o) {
                                    text.push('<div class="data" style="color:' + o.color + '">' + o.seriesName + ':' + o.value + '</div>');
                                });
                                $('.KPICurrent').html(text.join(''));
                                return '';
                            },
                            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        color: ['#ba55d3', '#7b68ee', '#ffa500'],
                        legend: {
                            show: false,
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
                            bottom:-20,
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
                                show: true,
                                lineStyle: {
                                    color: ['#eee']
                                }
                            },
                            axisLine: {
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
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#eee']
                                }
                            },
                            axisLine: {
                                show: false
                            }
                        }],
                        series: [{
                            name: 'DEA',
                            type: 'line',
                            smooth: true,
                            data: MACDResults.DEA,

                        }, {
                            name: 'DIF',
                            type: 'line',
                            smooth: true,
                            data: MACDResults.DIF,

                        }, {
                            name: 'MACD',
                            type: 'bar',

                            data: MACDResults.MACD,
                            barWidth: 5,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
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
                    };
                    var mychart4 = echarts.init(document
                         .getElementById('kcontainer4'));
                    var option4 = {
                     tooltip : {
                         position : function(point, params, dom) {
                             // 固定在顶部

                             return '';
                         },
                         formatter:function (params) {
                            var text = new Array();
                            params.forEach(function(o) {
                                text.push('<div class="data" style="color:' + o.color + '">' + o.seriesName + ':' + o.value + '</div>');
                            });
                            $('.KDJCurrent').html(text.join(''));
                             return '';
                         },
                         trigger : 'axis',
                         showDelay : 0
                         // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                     },
                     color : ['#ffa500', '#0000ff', '#ff0000'],
                     legend : {
                        show:false,
                         right : '20%',
                         top : '-2%',
                         data : ['K', 'D', 'J']
                     },
                     toolbox : {
                         y : -40,
                         show : false,
                         feature : {
                             mark : {
                                 show : true
                             },
                             dataZoom : {
                                 show : true
                             },
                             dataView : {
                                 show : true,
                                 readOnly : false
                             },
                             magicType : {
                                 show : true,
                                 type : ['line', 'bar']
                             },
                             restore : {
                                 show : true
                             },
                             saveAsImage : {
                                 show : true
                             }
                         }
                     },
                     dataZoom : [{
                                 type : 'inside',
                                 show : true,

                                 start : 0,
                                 end : 100
                             }, {
                                 type : 'slider',
                                 right : '15%',
                                 left : '15%',
                                 bottom : 0,
                                 show : true,

                                 start : 0,
                                 end : 100
                             }],
                     grid : {
                          left: '15%',
                            right: '15%',
                            bottom: '18%',

                            height: '70%'
                     },
                     xAxis : [{
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
                            show: true,
                            lineStyle: {
                                color: ['#eee']
                            }
                        },
                        axisLine: {
                            show: false
                        },

                        data : data0.categoryData
                             }],
                     yAxis : [{
                                 type : 'value',
                                 scale : true,
                                 // inverse:true,

                                 splitNumber : 4,
                                 axisLabel : {
                                     show : true
                                 },
                                 axisLine : {
                                     show : false
                                 },
                                 axisTick : {
                                     show : false
                                 },
                                 splitLine : {
                                     show: true,
                                     lineStyle: {
                                         color: ['#eee']
                                     }
                                 }
                             }],
                     series : [{
                                 name : 'K',
                                 type : 'line',
                                 smooth : true,
                                 data : KDJResults.K
                                 ,

                             }, {
                                 name : 'D',
                                 type : 'line',
                                 smooth : true,
                                 data : KDJResults.D
                                 ,

                             }, {
                                 name : 'J',
                                 type : 'line',

                                 data : KDJResults.J
                                 ,

                             }]
                    }

                    if (ktype !== 'D1' && ktype !== 'Week1' && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option2.dataZoom = [{
                            type: 'inside',
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }, {
                            type: 'slider',
                            show: false,
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }]
                    }
                    myChart2.setOption(option2);
                    if (ktype !== 'D1' && ktype !== 'Week1' && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option3.dataZoom = [{
                            type: 'inside',
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }, {
                            type: 'slider',
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }]
                    }
                    resetType();
                    mychart3.setOption(option3);
                    mychart4.setOption(option4)
                    echarts.connect([myChart, myChart2, mychart3,mychart4]);
                handleKlineEnd = new Date().valueOf();
                $('.debuge').text('ajax:' + (klineAjaxEnd - klineAjaxStart)/1000 +'   handle:' + (handleKlineEnd - handleKlineStart)/1000 )
                }

            }

        });

    }

    function bindTypeHandler() {
        $('.nav-bottom .nav').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            resetType();
        });
    }
    function resetType() {
        var type = $('.nav-bottom .active').data('type') || 'MACD';
        switch(type){
            case 'KDJ':
                $('.KPI').hide();
                $('.KDJ').show();
            break;
            case 'MACD':
            default:
                $('.KDJ').hide();
                $('.KPI').show();
            break;
        }
    }
    function splitData(rawData, startT, ktype) {
        var categoryDatas;
        var categoryData = [];

        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
            var time = /\d+(?=\+)/.exec(rawData[i].KLineTime)[0];
            if (Number(time) >= startT || startT === '') {
                if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {
                    categoryData.push(jsonTimeToDate(rawData[i].KLineTime));
                } else {
                    categoryData.push(jsonTimeToDateTime(rawData[i].KLineTime));
                }

                volumns.push(rawData[i].Volume);
                values.push([Number(rawData[i].OpenPrice.toFixed(2)),
                    Number(rawData[i].ClosingPrice.toFixed(2)),
                    Number(rawData[i].LowestPrice.toFixed(2)),
                    Number(rawData[i].HighestPrice.toFixed(2))
                ]);
            }

        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    }

    function jsonTimeToDate(str) {

        var tmp = /\d+(?=\+)/.exec(str);

        var d = new Date(+tmp);
        var ymdhis = '';
        ymdhis += d.getFullYear() + "-";
        month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
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
        month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        ymdhis += month + "-";
        date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        ymdhis += date + ' ';
        hour = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
        ymdhis += hour + ":";
        minutes = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
        ymdhis += minutes + ":";
        second = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds();
        ymdhis += second;
        return ymdhis;

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
                    RSV = (list[i].ClosingPrice - L) / (H - L) * 100;
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

    function searchKline(stockCode, name, ktype, efunc1, efunc2,
        restorationtype) {
        var startTime;
        var endTime = tokTime(new Date().getTime()) + ' 9:00:00 PM';
        var startTime, startT
        if (ktype === 'D1' || ktype === 'Week1' || ktype === 'Month1') {
            startTime = '01/01/2000 00:00:00 AM';

        } else if (ktype === 'M5') {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24 * 60) + ' 9:00:00 PM';

        } else if (ktype === 'M15') {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24 * 60) + ' 9:00:00 PM';;

        } else if (ktype === 'M30') {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24 * 60) + ' 9:00:00 PM';

        } else {
            startTime = tokTime(new Date().getTime() - 60 * 60 * 1000 * 24 * 60) + ' 9:00:00 PM';
        }
        var tradePrices = [];
        var url = host + '/Klines?instrument=' + stockCode + '&kType=' + ktype + '&startTime=' + startTime + '&endTime=' + endTime + '&weightingType=' + restorationtype;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            beforeSend: function() {
                $("#klinecontainer2").hide();
                $("#klinecontainer").hide();
                $(".loading").show();
            },
            complete: function() {
                // $(".loading").hide();

            },

            success: function(data) {
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

                if (data0.categoryData.length > 0) {
                    for (var i = 0; i < data0.categoryData.length; i++) {
                        tradePrices.push(data0.values[i][3]);
                        tradePrices.push(data0.values[i][2]);
                    }
                    var maxvalue = Math.max.apply(null, tradePrices);
                    var minvalue = Math.min.apply(null, tradePrices);
                    var addPoint = (((maxvalue - minvalue) / 0.9) - (maxvalue - minvalue)) / 2;
                    var myChart = echarts.init(document
                        .getElementById('klinecontainer'), shine);
                    var myChart2 = echarts.init(document
                        .getElementById('klinecontainer2'));
                    var title = stockCode + '-' + name;
                    var option = {
                        title: {
                            // text : title
                            // ,

                        },
                        color: ['#ff7f50', '#87cefa', '#40e0d0', '#c23531',
                            '#ff69b4', '#ba55d3', '#7b68ee', '#ffa500'
                        ],
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                            alwaysShowContent: true,
                            position: function(point, params, dom) {
                                // 固定在顶部

                                if (point[0] > 300) {
                                    return ['0%', '10%'];
                                } else {
                                    return ['80%', '10%'];
                                }

                            },

                            formatter: function(params) {
                                if (params) {

                                    var res;

                                    if (params[0]) {
                                        res = params[0].name;
                                        res += '<br/>' + params[0].seriesName;
                                        res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[0].value[3];
                                        res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[0].value[2];
                                    }

                                    return res;
                                }
                            }
                        },
                        legend: {
                            data: ['k线'],

                        },
                        dataZoom: [{
                            type: 'inside',
                            throttle: 0,

                            start: 0,
                            end: 100
                        }, {
                            type: 'slider',
                            show: false,
                            right: '10%',
                            throttle: 0,

                            start: 0,
                            end: 100
                        }],
                        grid: {

                            left: '15%',
                            right: '10%',

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
                            // min:'dataMin',
                            // max:'dataMax',
                            // splitNumber:10,

                            axisLabel: {
                                formatter: function(value, index) {
                                    return value.toFixed(2);
                                }
                            },
                            axisLine: {
                                show: false
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
                            },

                        }]
                    };
                    if (efunc1) {
                        $("#klinecontainer2").show();
                    } else {
                        $("#klinecontainer2").hide();
                    }

                    if (ktype !== 'D1' && ktype !== 'Week1' && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option.dataZoom = [{
                            type: 'inside',
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }, {
                            type: 'slider',
                            show: false,
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }]
                    }
                    if (efunc1) {
                        option.dataZoom[1].show = false;
                    } else {
                        option.dataZoom[1].show = true;
                    }
                    myChart.setOption(option);

                    var option2 = {
                        tooltip: {
                            position: function(point, params, dom) {
                                // 固定在顶部
                                return [point[0], '10%'];
                            },
                            trigger: 'axis',
                            showDelay: 0
                                // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        color: ['#137f57'],
                        legend: {
                            show: true,

                            data: ['合并后的k线']
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function(params) {
                                return '';
                                // var result;
                                // var tar;

                                // if (params[1].value === '-') {
                                //  tar = params[1];
                                //  result = tar.name + '<br/>最低'
                                //          + params[0].value + '最高 :- ';
                                // } else {
                                //  tar = params[0];
                                //  result = tar.name
                                //          + '<br/>最低'
                                //          + params[0].value
                                //          + '最高 : '
                                //          + (Number(params[0].value) + Number(params[1].value))
                                //                  .toFixed(2)

                                // }

                                // return result;
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

                            left: '15%',
                            right: '10%',

                            height: '50%'
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
                                show: false
                            },
                            splitLine: {
                                show: false
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

                        }, {
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
                    if (ktype !== 'D1' && ktype !== 'Week1' && ktype !== 'Month1' || data0.categoryData.length > 100) {
                        option2.dataZoom = [{
                            type: 'inside',
                            zoomLock: false,

                            startValue: data0.categoryData.length - 100,
                            endValue: data0.categoryData.length - 1
                        }, {
                            type: 'slider',
                            show: true,
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
                    // echarts.connect([ myChart, myChart2]);
                    echarts.connect([myChart, myChart2, mychart3]);

                }
            }
        })
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
                EMA12 = (11 / 13) * EMA12 + (2 / 13) * list[i].ClosingPrice;
                EMA26 = (25 / 27) * EMA26 + (2 / 27) * list[i].ClosingPrice;
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

    function modelDetail(modelName, stockCode, page) {
        var tradeMap = {
            "1": "买入",
            "3": "卖出",
            "0": "无交易"
        };
        var url = '/APP-admin/model/modelTraderSignal?modelName=' + modelName + "&code=" + stockCode + "&whichColumn=0" + "&whichPattern=0" + "&page=" + page + "&size=10";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            timeout: 2000,
            success: function(data) {
                var tradeMap = {
                    "1": "买入",
                    "3": "卖出",
                    "0": "无交易"
                };

                if (data.success && data.data.list.length > 0) {
                    var list = data.data.list;

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

                    }
                    list.sort(compare('time'));
                    var ktype = $('.ktypes .press>a').attr('data-type') || 'D1';
                    var restorationtype = $('.ktypes  .restoration-type')
                        .attr('data-restoration')
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

                    switchKLine(stockCode, macdinitTime,
                    endTime, ktrades);

                    kline(stockCode, macdinitTime, endTime, ktrades, ktype,
                        restorationtype);

                }

            },
            error: function(jqXHR, testStatus, errorThrow) {
                console.log(jqXHR);

            }
        });

    }

    function switchKLine(stockCode, macdstartTime, endTime, ktrades) {
        var ktype;
        var restorationtype;
        trades = ktrades;
        $('.nav-list li').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            // restorationtype = $('.ktypes  .restoration-type')
            //     .attr('data-restoration');
            restorationtype = 'None';
            ktype = $('.nav-list .active').data('type') || 'D1';
            kline(stockCode, macdstartTime, endTime, trades, ktype,
                    restorationtype);
        })
    }

    function toDate(time) {
        var month, darte;

        var timeDate = new Date(time);
        var ymdhis = "";
        ymdhis += timeDate.getFullYear() + "-";
        month = (timeDate.getMonth() + 1) >= 10 ? (timeDate.getMonth() + 1) : "0" + (timeDate.getMonth() + 1);
        ymdhis += month + "-";
        date = timeDate.getDate() >= 10 ? timeDate.getDate() : "0" + timeDate.getDate();
        ymdhis += date;
        return ymdhis;
    }

    function toDateTime(unixTime) {

        var timeDate = new Date(unixTime);
        var ymdhis = "";
        var month, date, hour, minutes, second;
        ymdhis += timeDate.getFullYear() + "-";
        month = (timeDate.getMonth() + 1) >= 10 ? (timeDate.getMonth() + 1) : "0" + (timeDate.getMonth() + 1);
        ymdhis += month + "-";
        date = timeDate.getDate() >= 10 ? timeDate.getDate() : "0" + timeDate.getDate();
        ymdhis += date;
        hour = timeDate.getHours() >= 10 ? timeDate.getHours() : "0" + timeDate.getHours();
        ymdhis += " " + hour + ":";
        minutes = timeDate.getMinutes() >= 10 ? timeDate.getMinutes() : "0" + timeDate.getMinutes();
        ymdhis += minutes + ":";
        second = timeDate.getSeconds() >= 10 ? timeDate.getSeconds() : "0" + timeDate.getSeconds();
        ymdhis += second;

        return ymdhis;
    }

    function tokTime(unixTime) {
        var time = new Date(unixTime);
        var ymdhis = "";
        var month, date;

        month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (time.getMonth() + 1);
        ymdhis += month + "/";
        date = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
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

        month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (time.getMonth() + 1);
        ymdhis += month + "/";
        date = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
        ymdhis += date + '/';
        ymdhis += time.getFullYear();
        hour = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
        ymdhis += " " + hour + ":";
        minutes = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
        ymdhis += minutes + ":";
        second = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
        ymdhis += second;
        ap = time.getHours() > 12 ? 'PM' : 'AM';
        ymdhis += " " + ap;

        return ymdhis;
    }

    function toLastMonth(time) {
        var timeDate = new Date(time);
        var ymdhis = "";
        month = (timeDate.getMonth()) >= 10 ? (timeDate.getMonth()) : "0" + (timeDate.getMonth());
        ymdhis += month + "/";
        date = timeDate.getDate() >= 10 ? timeDate.getDate() : "0" + timeDate.getDate();
        ymdhis += date + '/';
        ymdhis += timeDate.getFullYear();

        return ymdhis;
    }

    function compare(property) {
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        };
    }
   function getUrlPara() {
       var search = location.search.substring(1);
       var keyValue = search.split('&'),
           pair, result = new Object();
       for (var i = 0; i < keyValue.length; i++) {
           pair = keyValue[i].split('=');
           result[pair[0].trim()] = pair[1].trim();
       }
       return result;
   }
    init();

});
