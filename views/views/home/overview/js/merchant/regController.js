var addFormValidate = function(){
        $('#regForm').validate({
		rules: {
            mobilePhone: {
				required: true,
				telphoneValid: true,
                phoneExist:true
			},
			/*yanzheng: {
				required: true,
			},*/
            adminUserId: {
				required: true,
				minlength: 4,
				maxlength: 20,
                variableName:true,
                userExist:true
			},
            adminPwd: {
				required: true,
				minlength: 6,
				maxlength: 20
			},
			secondPsw: {
				required: true,
				equalTo: '#firstPsw'
			},
            email: {
				required: true,
				email:true,
                emailExist:true
			},
			xieyi: {
				required: true
			}
		},
		 messages: {
             mobilePhone: {
				required: '请输入手机号码',
				telphoneValid: '请输入正确手机号',
                phoneExist:'手机号已存在'
			},
			/*yanzheng: {
				required: '请输入短信验证码',
			},*/
            adminUserId: {
				required: '请输入用户名',
				minlength: '用户名不能少于4个字符',
				maxlength: '用户名不能多于20个字符',
                variableName:'需由字母、数字或下划线组成',
                userExist:'用户名已存在'
			},
            adminPwd: {
				required: '请输入密码',
				minlength: '密码不能少于6个字符',
				maxlength: '密码不能多于20个字符'
			},
			secondPsw: {
				required: '请输入密码',
				equalTo: '两次密码不一致'
			},
            email: {
				required: '请输入常用邮箱',
				email: '邮箱格式不正确',
                emailExist:'邮箱已存在'
			},
			xieyi: {
				required: '请勾选'
			}
	    },
		errorElement: 'em',
		errorPlacement:function(error,element) {  
	        error.appendTo(element.parents('.input-group'));
	   	},
	    submitHandler: function(form) {
	        form.submit();
	    	return false;
	    },
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
            if(!$('#regForm').validate().element(phoneElement)){
                return;
            }
            $.post("ntpl/utils/getcaptcha",
                {phone:$(phoneElement).val()}
            );
            //js等待特效
            countTime($(this),60);
        });*/
	}
}

main.init();

jQuery.validator.addMethod("phoneExist", function(value, element, param) {
    var exist = true;
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
    return !exist;
}, $.validator.format("手机号已存在"));

jQuery.validator.addMethod("emailExist", function(value, element, param) {
    var exist=true;
    $.ajax({
        async : false,
        cache:false,
        type: 'GET',
        url: "ntpl/utils/validateEmail",
        data:{email:value},
        success:function(data){ //请求成功后处理函数。
            exist = data;
        }
    });
    return !exist;
}, $.validator.format("邮箱已存在"));
jQuery.validator.addMethod("variableName", function(value, element, param) {

    return this.optional( element ) || /[a-zA-Z_][a-zA-Z_0-9]*/.test( value );

}, $.validator.format("需由字母、数字或下划线组成"));
jQuery.validator.addMethod("userExist", function(value, element, param) {
    var exist = true;
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
    return !exist;
}, $.validator.format("用户名已存在"));