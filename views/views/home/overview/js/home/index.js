/**
 * Created by Administrator on 2016/2/19.
 */

$(function(){
    var path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)) + "/home/overview";
    var _path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)) + "/nomenu/overview";
    // 基于准备好的dom，初始化echarts实例
    var couponChart = echarts.init(document.getElementById('coupon-info'));
    // 指定图表的配置项和数据
    var couponOption = {
        title : {
            text: '运营数据',
            textStyle: {
                color:'#666',
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        borderWidth:1,
        color:['#2fcdd0','#bca7e5','#ec8413','#84e6f1','#dddddd'],
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            top: '0',
            right: '30px',
            data:['领取量','使用量'],
            textStyle: {
                color: '#888'
            }
        },
        grid: {
            left: '0',
            right: '20px',
            bottom: '10px',
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                }
            },
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis:[
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    lineStyle:{
                        color:'#81d0fd'
                    }
                },
                splitLine: {
                    lineStyle:{color:'#f6f6f6'}
                },
                data : []
            }
        ],
        yAxis:[
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color:'#81d0fd'
                    }
                },
                splitLine: {
                    lineStyle:{color:'#f6f6f6'}
                }
            }
        ],
        series:[]
    };

    //客流图表business-data
    var cusomerChart = echarts.init(document.getElementById('customer-data'));
    var option = {
        color:['#81d0fd'],
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            left: '0%',
            right: '0',
            bottom: '20px',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,1)',
            itemStyle: {
                normal: {
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowBlur: 10
                }
            },
            containLabel: true
        },
        legend: {
            data:['净增客户（人）数'],
            textStyle: {
                color: '#888'
            }
        },
        xAxis : [
            {
                type : 'category',
                data : [],
                axisLine:{
                    lineStyle:{
                        color:'#81d0fd'
                    }
                },
                splitLine: {
                    lineStyle:{color:'#f6f6f6'}
                }

            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color:'#81d0fd'
                    }
                },
                splitLine: {
                    lineStyle:{color:'#f6f6f6'}
                }
            }
        ],
        series : []
    };
    cusomerChart.setOption(option);



    //电商数据图表
    var businessChart = echarts.init(document.getElementById('business-data'));
    var busOption = {
        color:['#81c0fd','#81d0fd'],
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            left: '0%',
            right: '0',
            bottom: '20px',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,1)',
            itemStyle: {
                normal: {
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowBlur: 10
                }
            },
            containLabel: true
        },
        legend: {
            data:['订单','交易额(元)'],
            textStyle: {
                color: '#888'
            }
        },
        xAxis : [
            {
                type : 'category',
                data : ["00:00","06:00","12:00","18:00","21:00","24:00"],
                axisLine:{
                    lineStyle:{
                        color:'#81d0fd'
                    }
                },
                splitLine: {
                    lineStyle:{color:'#f6f6f6'}
                }

            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color:'#81d0fd'
                    }
                },
                splitLine: {
                    lineStyle:{color:'#f6f6f6'}
                }
            }
        ],
        series : []
    };
    businessChart.setOption(busOption);

    window.onresize = function(){
        var w = $('#customer-data').parent().outerWidth();
        $('#customer-data,#customer-data > div,#customer-data canvas').css('width',w -60+'px');
        var w = $('#business-data').parent().outerWidth();
        $('#business-data,#business-data > div,#business-data canvas').css('width',w -60+'px');
        var w = $('#coupon-info').parent().outerWidth();
        $('#coupon-info,#coupon-info > div,#coupon-info canvas').css('width',w*0.7 -30+'px');
    }
    // 使用刚指定的配置项和数据显示图表。
     couponChart.showLoading();
    couponChart.setOption(couponOption);

    showOperationData(-1);

    $(".datelist").find("span").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        var dayNum;
        var desc = $(this).text();
        if(desc == "昨天") dayNum = -1;
        if(desc == "最近7天") dayNum = -7;
        if(desc == "最近30天") dayNum = -30;
        showOperationData(dayNum);
    });

    function showOperationData(dayNum){
        $.post(""+path+"/getdata",
            {dayNum:dayNum},
            function(data){
                //字段显示
                $("#userCount").text(data.userCount);
                $("#ccReceiveCount").text(data.ccReceiveCount);
                $("#ccUsedCount").text(data.ccUsedCount);
                $("#payableAmount").text("￥" + data.payableAmount);
                $("#newCustomerCount").text(data.newCustomerCount);
                $("#storeCount").text(data.storeCount);
                $("#staffCount").text(data.staffCount);
                if(dayNum == -1){
                    $("#statsDate").text("统计时间：" + data.yesterday);
                }else{
                    $("#statsDate").text("统计时间：" + data.startTime + " 至 " +data.endTime);
                }

                $("#noticeTime").text(data.notice.createTimeStr);
                $("#noticeTitle").text(data.notice.title);
                $("#noticeContent").text(data.notice.abstracts);
                $("#sysinfo").attr("href",""+_path+"/notice/"+data.notice.id+"");
                //运营数据
                showOptChart(data.receiveVos, data.useCountVos, data.optDates);
                //客流数据
                showPfChart(data.pfData, data.pfTime);
                //电商数据
                showBusinessChart(null, null, data.pfTime);

            },"json"
        );
    }

    //显示运营数据图表
    function showOptChart(receiveVos, useCountVos, optDates){
        couponChart.hideLoading();
        couponChart.setOption({
            xAxis:[
                {
                    data : optDates
                }
            ],
            series:[
                {
                    name:'领取量',
                    type:'line',
                    smooth: true,
                    data:receiveVos
                },{
                    name:'使用量',
                    type:'line',
                    smooth: true,
                    data:useCountVos
                }
            ]
        });

    }

    //显示客流数据图表
    function showPfChart(pfData, pfTime){
        cusomerChart.hideLoading();
        cusomerChart.setOption({
            xAxis:[
                {
                    data : pfTime
                }
            ],
            series:[
                {
                    "name":"净增客户（人）数",
                    "type":"bar",
                    "barWidth": 20,
                    "data":pfData
                }

            ]

        });
    }

    //显示电商数据图表
    function showBusinessChart(bsData, jyData, bsTime){
        businessChart.hideLoading();
        bsData = [];
        jyData = [];
        for(var i = 0; i < bsTime.length; i++){
            bsData.push("0");
            jyData.push("0");
        }

        businessChart.setOption({
            xAxis:[
                {
                    data : bsTime
                }
            ],
            series : [
                {
                    "name":"订单",
                    "type":"bar",
                    "barWidth": 20,
                    "data":bsData
                },
                {
                    "name":"交易额(元)",
                    "type":"bar",
                    "barWidth": 20,
                    "data":jyData
                }
            ]

        });
    }


});
