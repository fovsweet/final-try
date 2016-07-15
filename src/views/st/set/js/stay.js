/*******页面时间控件******/
(function($){
    stay = {
        start:$('#startDate'),
        end:$('#endDate'),
        today:(new Date()),
        init:function(){
            //stay.inputVal();
            stay.endFun();
            stay.startFun();
        },
        startFun:function(){
            stay.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,
              	onSelect:function(dateText,inst){
                    stay.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 1)));
                    stay.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 360)));
                  	var strDay =  stay.compare($(this));
                    /*stay.start.datepicker('option', 'appendText', strDay);
                    if((new Date(stay.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        stay.end.datepicker('option', 'appendText', stay.compare(stay.end));
                    }*/
                }

            });
        },
        endFun:function(){
            stay.end.datepicker('refresh');
            stay.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,               
               	/*onSelect:function(){
                    stay.end.datepicker('option', 'appendText', stay.compare($(this)));
                }*/
            });
        },
        transformStr:function(day,strDay){
            switch (day){
                    case 1:
                        strDay  = '星期一';
                        break;
                    case 2:
                        strDay  = '星期二';
                        break;
                    case 3:
                        strDay  = '星期三';
                        break;
                    case 4:
                        strDay  = '星期四';
                        break;
                    case 5:
                        strDay  = '星期五';
                        break;
                    case 6:
                        strDay  = '星期六';
                        break;
                    case 0:
                        strDay  = '星期日';
                        break;
                }
            return strDay;
        },
        compare:function(obj){
            var strDay = '今天';
            var myDate = new Date(stay.today.getFullYear(),stay.today.getMonth(),stay.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stay.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stay.inputTimes(stay.start,1);
            stay.inputTimes(stay.end,2);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stay.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stay.addZero((m.getMonth()+1)) + "-" + stay.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    },
    stayTwo = {
        start:$('#startDateTwo'),
        end:$('#endDateTwo'),
        today:(new Date()),
        init:function(){
            //stayTwo.inputVal();
            stayTwo.endFun();
            stayTwo.startFun();
        },
        startFun:function(){
            stayTwo.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,
              	onSelect:function(dateText,inst){
                    stayTwo.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 1)));
                    stayTwo.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 360)));
                  	var strDay =  stayTwo.compare($(this));
                    /*stayTwo.start.datepicker('option', 'appendText', strDay);
                    if((new Date(stayTwo.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        stayTwo.end.datepicker('option', 'appendText', stayTwo.compare(stayTwo.end));
                    }*/
                }

            });
        },
        endFun:function(){
            stayTwo.end.datepicker('refresh');
            stayTwo.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,               
               	/*onSelect:function(){
                    stayTwo.end.datepicker('option', 'appendText', stayTwo.compare($(this)));
                }*/
            });
        },
        transformStr:function(day,strDay){
            switch (day){
                    case 1:
                        strDay  = '星期一';
                        break;
                    case 2:
                        strDay  = '星期二';
                        break;
                    case 3:
                        strDay  = '星期三';
                        break;
                    case 4:
                        strDay  = '星期四';
                        break;
                    case 5:
                        strDay  = '星期五';
                        break;
                    case 6:
                        strDay  = '星期六';
                        break;
                    case 0:
                        strDay  = '星期日';
                        break;
                }
            return strDay;
        },
        compare:function(obj){
            var strDay = '今天';
            var myDate = new Date(stayTwo.today.getFullYear(),stayTwo.today.getMonth(),stayTwo.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stayTwo.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stayTwo.inputTimes(stayTwo.start,1);
            stayTwo.inputTimes(stayTwo.end,2);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stayTwo.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stayTwo.addZero((m.getMonth()+1)) + "-" + stayTwo.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    },
    stayThree = {
        start:$('#startDateThree'),
        end:$('#endDateThree'),
        today:(new Date()),
        init:function(){
            stayThree.inputVal();
            stayThree.endFun();
            stayThree.startFun();
        },
        startFun:function(){
            stayThree.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,
                onSelect:function(dateText,inst){
                    stayThree.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days')));
                    var strDay =  stayThree.compare($(this));
                    /*stayThree.start.datepicker('option', 'appendText', strDay);
                     if((new Date(stayThree.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                     stayThree.end.datepicker('option', 'appendText', stayThree.compare(stayThree.end));
                     }*/
                }

            });
        },
        endFun:function(){
            stayThree.end.datepicker('refresh');
            stayThree.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,
                onSelect:function(dateText,inst){
                    stayThree.start.datepicker('option', 'maxDate', new Date(moment(dateText).add('days')));
                 }
            });
        },
        transformStr:function(day,strDay){
            switch (day){
                case 1:
                    strDay  = '星期一';
                    break;
                case 2:
                    strDay  = '星期二';
                    break;
                case 3:
                    strDay  = '星期三';
                    break;
                case 4:
                    strDay  = '星期四';
                    break;
                case 5:
                    strDay  = '星期五';
                    break;
                case 6:
                    strDay  = '星期六';
                    break;
                case 0:
                    strDay  = '星期日';
                    break;
            }
            return strDay;
        },
        compare:function(obj){
            var strDay = '今天';
            var myDate = new Date(stayThree.today.getFullYear(),stayThree.today.getMonth(),stayThree.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stayThree.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stayThree.inputTimes(stayThree.start,-6);
            stayThree.inputTimes(stayThree.end,0);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stayThree.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stayThree.addZero((m.getMonth()+1)) + "-" + stayThree.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    stay.init();
    stayTwo.init();
    stayThree.init();
})(jQuery);

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}