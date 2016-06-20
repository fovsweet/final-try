/**
 * Created by liuhui on 2016/2/15.
 */
stayThree.end.datepicker('option', 'minDate', $("#startDateThree").val());
stayThree.start.datepicker('option', 'maxDate', $("#endDateThree").val());
//图表
// 基于准备好的dom，初始化echarts实例
var couponChart = echarts.init(document.getElementById('coupon-info'));
// 指定图表的配置项和数据
var couponOption = {
    borderWidth:1,
    color:['#2fcdd0','#bca7e5','#ec8413','#84e6f1','#dddddd'],
    tooltip : {
        trigger: 'axis',
    },
    legend: {
        x:'center',
        y: 'bottom',
        data:['领取量','使用量']
    },
    grid: {
        x: '0%',
        y: '20px',
        x2: '20px',
        y2: '60px',
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
            data : [0]
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
// 使用刚指定的配置项和数据显示图表。
couponChart.showLoading();
couponChart.setOption(couponOption);
window.onresize = function(){
    var w = $('#customer-info').parent().outerWidth();
    $('#customer-info,#customer-info > div,#customer-info canvas').css('width',w -60+'px');
}


function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)) + "/home/operation";
}

var items_per_page = $("input[name='size']").val();
var page_index = $("input[name='currentPage']").val();
//分页
pageselectCallback(page_index, null);

function pageselectCallback(page_id, jq) {
    $("#tjStartDate").text($("#startDateThree").val());
    $("#tjEndDate").text($("#endDateThree").val());
    page_index = page_id;
    $("input[name='currentPage']").val(page_index);
    $("input[name='size']").val(items_per_page);
    $.post(""+getContextPath()+"/getcarddata",
        $("#form").serialize(),
        function(data){
            if(typeof(data.error) != "undefined"){
                alert(data.error);
                return;
            }

            var total = data.pageVo.total;
            initPage(total, jq);
            $("#tbody").empty();
            var trdata = "";
            for(var i = 0; i < data.pageVo.content.length; i++){
                trdata += "<tr>";
                trdata += "	<td>"+data.pageVo.content[i].ccName+"</td>";
                trdata += "	<td>"+data.pageVo.content[i].ccValidPeriod+"</td>";
                var ccType;
                switch (data.pageVo.content[i].ccType){
                    case "1": ccType = "折扣劵";break;
                    case "2": ccType = "代金劵";break;
                    case "3": ccType = "礼品劵";break;
                }
                trdata += "	<td>"+ccType+"</td>";
                var isValid;
                switch (data.pageVo.content[i].isValid){
                    case "0": isValid = "已过期";break;
                    case "1": isValid = "有效";break;
                }
                trdata += "	<td>"+isValid+"</td>";
                //trdata += "	<td>"+data.content[i].ccBrowseCount+"</td>";
                trdata += "	<td>"+data.pageVo.content[i].ccReceiveCount+"</td>";
                trdata += "	<td>"+data.pageVo.content[i].ccUsedCount+"</td>";
                var recovery = ((data.pageVo.content[i].ccUsedCount/data.pageVo.content[i].ccReceiveCount)*100).toFixed(2);
                if(isNaN(recovery)) recovery = "0.00";
                trdata += "	<td>"+recovery+"%</td>";
                trdata += "	<td>";
                trdata += "		<div class=\"operate-group\">";
                trdata += "			<a href=\"javascript:detail('"+data.pageVo.content[i].ccId+"','"+data.pageVo.content[i].ccType+"');\" >明细</a>";
                trdata += "		</div>";
                trdata += "	</td>";
                trdata += "</tr>";
            }
            $("#tbody").html(trdata);

            //图表
            showChart(data.receiveVos, data.useCountVos);

        }
        ,"json");
    return false;
}
function initPage(total, jq){
    if(total < 10){
        $("#Pagination").hide();
    }else{
        $("#Pagination").show();
    }
    if(jq == null){
        $("#Pagination").pagination(total , {
            callback: pageselectCallback,//PageCallback() 为翻页调用次函数。
            prev_text: " 上一页",
            next_text: "下一页 ",
            items_per_page: 10, //每页的数据个数
            num_display_entries: 4, //两侧首尾分页条目数
            current_page: 0,   //当前页码
            num_edge_entries: 2 //连续分页主体部分分页条目数
        });
    }
}

//查询
$("#search").click(function(){
    $("#sortField").val("");
    $("#sortType").val("");
    $("#tr1").find("span").each(function(){
        $(this).find("p").removeClass("active");
    });
    pageselectCallback(0, null);
});

//排序
function sort(sortField, sortType, obj){
    $(obj).parent().parent().parent().find("span").each(function(){
        $(this).find("p").removeClass("active");
    });
    $(obj).addClass("active");
    $("#sortField").val(sortField);
    $("#sortType").val(sortType);
    pageselectCallback(0, null);
}

//卡券详情
function detail(ccid, cctype){
    $.lightBox({
        width: 1095,
        boxID: 'verifyDetails',
        title: '明细列表',
        html: '',
        buttons: [{
            value: '关 闭',
            className: 'dia-close cancel-button'
        }]

    });
    $('#verifyDetailsDia').find('.dia-main').html(template('formTemplate'));
    //初始化日期插件
    stay.start = $('#startDate');
    stay.end = $('#endDate');
    stay.init();
    stayTwo.start = $('#startDateTwo');
    stayTwo.end = $('#endDateTwo');
    stayTwo.init();

    $("#ccId").val(ccid);
    items_per_page1 = $("input[name='pageSize']").val();
    page_index1 = $("input[name='pageNum']").val();
    $("#cardType").val(cctype);
    if(cctype == 3){
        $(".hidclas").hide();
    }else{
        $(".hidclas").show();
    }

    pageselectCallback1(0, null);

}

//查询卡券详细
function searchdetail(){
    pageselectCallback1(0, null);

}


//分页1
var items_per_page1;
var page_index1;
function pageselectCallback1(page_id, jq) {
    page_index1 = page_id;
    $("input[name='pageNum']").val(page_index1);
    $("input[name='pageSize']").val(items_per_page1);
    $("#startDateTwo").val($("#startDateThree").val());
    $("#endDateTwo").val($("#endDateThree").val());
    stayTwo.end.datepicker('option', 'minDate', $("#startDateThree").val());
    stayTwo.start.datepicker('option', 'maxDate', $("#endDateThree").val());
    $.post(""+getContextPath()+"/getcarddetial",
        $("#form1").serialize(),
        function(data){
            if(typeof(data.error) != "undefined"){
                alert(data.error);
                return;
            }
            var total = data.total;
            initPage1(total, jq);
            $("#tbody1").empty();
            var trdata = "";
            for(var i = 0; i < data.content.length; i++){
                trdata += "<tr>";
                trdata += "	<td>"+data.content[i].openUserNickName+"</td>";
                trdata += "	<td><div class=\"head-active\"><img src=\""+data.content[i].headImageUrl+"\"></div></td>";
                trdata += "	<td>"+data.content[i].cardno+"</td>";
                trdata += "	<td>"+new Date(data.content[i].receive_time).Format("yyyy-MM-dd hh:mm")+"</td>";
                trdata += "	<td>"+new Date(data.content[i].writeoff_time).Format("yyyy-MM-dd hh:mm")+"</td>";
                trdata += "	<td>"+data.content[i].shopName+"</td>";
                trdata += "	<td>"+data.content[i].clerkName+"</td>";
                if($("#cardType").val() != '3'){
                    trdata += "	<td>"+data.content[i].payable_amount+"</td>";
                    trdata += "	<td>"+data.content[i].writeoff_amount+"</td>";
                    trdata += "	<td>"+(data.content[i].payable_amount - data.content[i].writeoff_amount).toFixed(2)+"</td>";
                }
            }
            $("#tbody1").html(trdata);
        }
        ,"json");
    return false;
}
function initPage1(total, jq){
    if(total < 10){
        $("#Pagination1").hide();
    }else{
        $("#Pagination1").show();
    }
    if(jq == null){
        $("#Pagination1").pagination(total , {
            callback: pageselectCallback1,//PageCallback() 为翻页调用次函数。
            prev_text: " 上一页",
            next_text: "下一页 ",
            items_per_page: 10, //每页的数据个数
            num_display_entries: 4, //两侧首尾分页条目数
            current_page: 0,   //当前页码
            num_edge_entries: 2 //连续分页主体部分分页条目数
        });
    }
}

function exportdetail(){
    if($("#tbody1").find("tr").length == 0){
        alert("没有查询到数据");
        return;
    }
    $("#form1").attr("action",""+getContextPath()+"/exportcarddetail");
    $("#form1").submit();
}

//显示图表
var dateArr = [];
function showChart(receiveVos, useCountVos){
    couponChart.hideLoading();
    var startDate = $("#startDateThree").val();
    var endDate = $("#endDateThree").val();
    dateArr = dataScope(startDate, endDate);
    var receiveData = [];
    var useCountData = [];
    for(var i = 0; i < dateArr.length; i++){

        if(receiveVos.length == 0){
            receiveData[i] = 0;
        }else{
            for(var j = 0; j < receiveVos.length; j++){
                if(dateArr[i] == receiveVos[j].dateStr){
                    receiveData[i] = receiveVos[j].summation;
                    receiveVos.splice(j, 1);
                    j--;
                }else{
                    receiveData[i] = 0;
                }
                break;
            }
        }

        if(useCountVos.length == 0){
            useCountData[i] = 0;
        }else{
            for(var j = 0; j < useCountVos.length; j++){
                if(dateArr[i] == useCountVos[j].dateStr){
                    useCountData[i] = useCountVos[j].summation;
                    useCountVos.splice(j, 1);
                    j--;
                }else{
                    useCountData[i] = 0;
                }
                break;
            }
        }

    }

    for(var i = 0; i < dateArr.length; i++){
        var date = getDate(dateArr[i]);
        dateArr[i] = date.getMonth() + 1 + "." + date.getDate();
    }

    //console.log(receiveData);
    //console.log(useCountData);
    couponChart.setOption({
        xAxis:[
            {
                data : dateArr
            }
        ],
        series:[
            {
                name:'领取量',
                type:'line',
                smooth: true,
                data:receiveData
            },{
                name:'使用量',
                type:'line',
                smooth: true,
                data:useCountData
            }
        ]
    });

}

/*************************
 * 计算两个日期时间段内所有日期
 *
 * @param value1
 *            开始日期 YYYY-MM-DD
 * @param value2
 *            结束日期
 * return 日期数组
 */
function dataScope(value1, value2) {
    dateArr = [];

    var date1 = getDate(value1);
    var date2 = getDate(value2);
    if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }

    var nextDay = function(d){
        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        return d;

    }
    var date2 = nextDay(date2);
    var i = 0;
    while (date1.toString() != date2.toString()) {
        var dayStr =date1.getDate().toString();
        if(dayStr.length ==1){
            dayStr="0"+dayStr;
        }
        var monthStr = (date1.getMonth() + 1).toString();
        if(monthStr.length ==1){
            monthStr="0"+monthStr;
        }
        dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" + dayStr;
        i++;

        date1.setDate(date1.getDate() + 1);
        if(i > 1000){
            break;
        }
    }
    return dateArr;
}

function getDate(str){
    var tempDate = new Date();
    var list = str.split("-");
    tempDate.setFullYear(list[0]);
    tempDate.setMonth(list[1] - 1);
    tempDate.setDate(list[2]);
    return tempDate;
}

$(function(){
    document.onkeydown = hotkey;
    function hotkey() {
        if(event.keyCode==13){
            $("#search").click();
        }
    }

    $("#exportdata").click(function(){
        if($("#tbody").find("tr").length == 0){
            alert("没有查询到数据");
            return;
        }
        $("#form").attr("action",""+getContextPath()+"/exportcarddata");
        $("#form").submit();
    });


})