/*******页面时间控件******/
(function($){
    cardStay = {
        start:$('#cardStartDate'),
        end:$('#cardEndDate'),
        today:(new Date()),
        init:function(){
            cardStay.inputVal();
            cardStay.today = new Date($("#cardStartDate").val());
            cardStay.endFun();
            cardStay.startFun();
            cardStay.end.datepicker('option', 'minDate', new Date(moment(cardStay.today).add('days', 0)));
        },
        startFun:function(){
            cardStay.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -36000,
                maxDate:-1,
                onSelect:function(dateText,inst){
                    cardStay.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days',0)));
                    cardStay.end.datepicker('option', 'maxDate', new Date(moment(new Date()).add('days', -1)));
                }

            });
        },
        endFun:function(){
            cardStay.end.datepicker('refresh');
            cardStay.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate :0,
                maxDate:-1,
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
            var myDate = new Date(cardStay.today.getFullYear(),cardStay.today.getMonth(),cardStay.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = cardStay.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            cardStay.inputTimes(cardStay.start,-7);
            cardStay.inputTimes(cardStay.end,-1);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(cardStay.today).add('days', day));
            obj.val(m.getFullYear() + "-" + cardStay.addZero((m.getMonth()+1)) + "-" + cardStay.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    cardStay.init();

    personStay = {
        start:$('#personStartDate'),
        end:$('#personEndDate'),
        today:(new Date()),
        init:function(){
            personStay.inputVal();
            personStay.today = new Date($("#personStartDate").val());
            personStay.endFun();
            personStay.startFun();
            personStay.end.datepicker('option', 'minDate', new Date(moment(personStay.today).add('days', 0)));
        },
        startFun:function(){
            personStay.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -36000,
                maxDate:-1,
                onSelect:function(dateText,inst){
                    personStay.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 0)));
                    personStay.end.datepicker('option', 'maxDate', new Date(moment(new Date()).add('days', -1)));
                }

            });
        },
        endFun:function(){
            personStay.end.datepicker('refresh');
            personStay.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : 0,
                maxDate:-1,
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
            var myDate = new Date(personStay.today.getFullYear(),personStay.today.getMonth(),personStay.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = personStay.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            personStay.inputTimes(personStay.start,-7);
            personStay.inputTimes(personStay.end,-1);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(personStay.today).add('days', day));
            obj.val(m.getFullYear() + "-" + personStay.addZero((m.getMonth()+1)) + "-" + personStay.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    personStay.init();
})(jQuery);