
var addFormValidate = function(){
	$('#changeForm').validate({
		rules: {
			phoneNum: {
				required: true,
				telphoneValid: true,
                phoneNotExist:true
			},
			/*yanzheng: {
				required: true
			},*/
			userName: {
				required: true,
				minlength: 4,
				maxlength: 20,
                userNotExist:true,
                userNotMatchPhone:true
			},
			firstPsw: {
				required: true,
				minlength: 6,
				maxlength: 20
			},
			secondPsw: {
                required: true,
				equalTo: '#firstPsw'
			}
		},
		 messages: {
	       phoneNum: {
				required: '请输入手机号码',
				telphoneValid: '请输入正确手机号',
                phoneNotExist:'该手机号未注册'
			},
			/*yanzheng: {
				required: '请输入短信验证码'
			},*/
			userName: {
				required: '请输入用户名',
				minlength: '用户名不能少于4个字符',
				maxlength: '用户名不能多于20个字符',
                userNotExist:'用户名不存在',
                userNotMatchPhone:'用户名与手机不匹配'
			},
			firstPsw: {
				required: '请输入密码',
				minlength: '密码不能少于6个字符',
				maxlength: '密码不能多于20个字符'
			},
			secondPsw: {
                required: '请输入密码',
				equalTo: '两次密码不一致'
			}
	    },
		errorElement: 'em',
		errorPlacement:function(error,element) {  
	        error.appendTo(element.parents('.input-group'));
	   	},
	    submitHandler: function(form) {
	       form.submit();
	    	return false;
	    }
	});
	
};

function countTime(obj,n){
    obj.addClass('disabled');
    obj.attr({"disabled":"disabled"});
    var timers;
    var str = ''+n+'秒后重新获取';
    obj.html(str);

    if(n < 0){
        clearTimeout(timers);
        obj.removeClass('disabled');
        obj.html('获取验证码');
        obj.removeAttr('disabled');
    }else {
        n--;
        setTimeout(countTime,1000,obj,n);
    }
}

var main = {
	init: function(){
		addFormValidate();
        /*$("#getcaptcha").click(function(){
            var phoneElement = $("#_phoneNum");
            if(!$('#changeForm').validate().element(phoneElement)){
                return;
            }
            $.post("nptl/utils/getcaptcha",
                {phone:$(phoneElement).val()}
            );
            //js等待特效
            //js等待特效
            countTime($(this),60);
        });*/
	}
}

main.init();

jQuery.validator.addMethod("phoneNotExist", function(value, element, param) {
    var exist = false;
    $.ajax({
        async : false,
        cache:false,
        type: 'GET',
        url: "ntpl/utils/validatePhone",
        data:{phone:value},
        success:function(data){ //请求成功后处理函数。
            exist = data;
        }
    });
    return exist;
}, $.validator.format("该手机号未注册"));

jQuery.validator.addMethod("userNotExist", function(value, element, param) {
    var exist = false;
    $.ajax({
        async : false,
        cache:false,
        type: 'GET',
        url: "ntpl/utils/validateUserId",
        data:{userId:value},
        success:function(data){ //请求成功后处理函数。
            exist = data;
        }
    });
    return exist;
}, $.validator.format("用户名不存在"));

jQuery.validator.addMethod("userNotMatchPhone", function(value, element, param) {
    var exist = false;
    $.ajax({
        async : false,
        cache:false,
        type: 'GET',
        url: "ntpl/utils/validateUserIdAndPhone",
        data:{userId:value,phone:$("#_phoneNum").val()},
        success:function(data){ //请求成功后处理函数。
            exist = data;
        }
    });
    return exist;
}, $.validator.format("用户名与手机不匹配"));

