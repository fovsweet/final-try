

var addFormValidate = function(){
	$('#dealerForm').validate({
		rules: {
            mchName: {
				required: true,
                minlength: 2,
                maxlength: 40
			},
            mchFirstClassification: {
				required: true
			},
            mchSecondClassification: {
                required: function(){return !($("#secondLevelClassify").val()!=="" || ($("#secondLevelClassify").val()==="" && $("#secondLevelClassify option").length<=1));}
            },
            mchProvinceId: {
				required: true
			},
            mchCityId: {
                required: function(){
                    if($("#city").val()!==""){
                        return false;
                    }
                    if($("#city option").length<=1){
                        return false;
                    }
                    return true;
                    //return !($("#city").val()!=="" || ($("#city").val()==="" && $("#city option").length<=1));
                }
			},
            mchAreaId: {
                required: function() {
                    if ($("#area").val() !== "") {
                        return false;
                    }
                    if ($("#area option").length <= 1) {
                        return false;
                    }
                    return true;
                }
                    //return !($("#area").val()!=="" || ($("#area").val()==="" && $("#area option").length<=1));}
            },
            mchStreetId: {
                required: function(){
                    if($("#street").val()!==""){
                        return false;
                    }
                    if($("#street option").length<=1){
                        return false;
                    }
                    return true;
                    //return !($("#street").val()!=="" || ($("#street").val()==="" && $("#street option").length<=1));
                }
            },
            mchAddress: {
                required: true
            },
			dealerPic: {
				checkImg: true
			}
		},
		 messages: {
             mchName: {
				required: '请输入商家名称',
                minlength:'商家名称不能小于2个字符',
                maxlength:'商家名称不能大于41个字符'
			},
            mchFirstClassification: {
				required: '请选择商家一级分类'
			},
            mchSecondClassification: {
                required: '请选择商家二级分类'
             },
             mchProvinceId: {
                 required: '请选择省份'
			},
             mchCityId: {
                 required: '请选择城市'
             },
             mchAreaId: {
                 required: '请选择地区'
             },
             mchStreetId: {
                 required: '请选择街道'
             },
             mchAddress: {
                 required: '请输入商家地址'
			},
			dealerPic: {
				checkImg: '请上传图片logo'
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


function upSellerLogo(){
        $(".img-error").text('');
        var that = this;
        var upImgBoxId = 'upSellerLogo';
        var logoBoxSize = {boxWidth:530,maxWidth:290,maxHeight:200,minWidth:210,minHeight:140,boxId:upImgBoxId+'Dia'};
        var res = upImgBox(logoBoxSize,upImgBoxId,'更换图片',[{
            value: '取消',
            className: 'dia-close cancel-button'
        },{
            value: '确认',
            className: 'bright-button',
            callbackFun: function() {
                var filePath = $(':file').val();
                if(filePath.length === 0){
                    $(".img-error").text('请选择图片');
                    return;
                }
                var files = $(':file').files;
                if(!/.(jpg|jpeg|png)$/.test(filePath)){
                    $(".img-error").text('仅支持图片类型jpg、jpeg、png');
                    return;
                }

                var imgPreDom = $('#' + logoBoxSize.boxId).find('.js-imgpre')[0];
                var cropData = {imgTop: parseFloat(imgPreDom.style.marginTop),
                    imgLeft: parseFloat(imgPreDom.style.marginLeft),
                    imgWidth: parseFloat(imgPreDom.style.width),
                    imgHeight: parseFloat(imgPreDom.style.height),
                    cutWidth: logoBoxSize.minWidth,
                    cutHeight: logoBoxSize.minHeight
                };
                var handleObj = {
                    url : 'ntpl/utils/uploadImg',
                    secureuri : false,
                    type:'post',
                    fileElementId : 'upSellerLogoFilepath',
                    data:cropData,
                    dataType : 'json',
                    success : function(data) {
                        var json = $.parseJSON(data);
                        if(typeof(json.error) !== "undefined"){
                            $("em.img-error").text(json.error);
                        }else{
                            $("#ImgUrl").attr("src",json.imgUrl);//
                            $("#mchLogo").val(json.imgUrl);//
                            $.lightBox.closeALL();
                            $('.js-imgDragContainer').html('<p class="p1">（建议尺寸：900×500，建议大小：2M以下）</p>');
                            $("em.img-error").text("");
                        }
                    },
                    error : function(data, status, e) {
                        alert(e);
                    }
                };
                $.ajaxFileUpload(handleObj);

            }
        }]);


    $('.dia-close').on('click',function(e){
        e.stopImmediatePropagation();
        $('#upSellerLogoFilepath').val('');
        $('#'+ upImgBoxId +'Dia').find('.js-imgDragContainer').html('<p class="p1">（建议尺寸：900×500，建议大小：2M以下）</p>');
        $("em.img-error").text("");
    });
}
function initOneLevelClassify(){
    $.ajax({
        url: "ntpl/utils/getclasschilds",    //请求的url地址
        data:{parentId:"top"},
        dataType: "json",   //返回格式为json
        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        success: function(data) {
            if(data.length > 0){
                $("#oneLevelClassify").empty();
                var opt = "<option value=''>请选择</option>";
                for(var i = 0; i < data.length; i++){
                    opt += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                }
                $("#oneLevelClassify").html(opt);
            }
        }
    });
}
function initProvince(){
    $.ajax({
        url: "ntpl/utils/getregionchilds",    //请求的url地址
        data:{parentId:"top"},
        dataType: "json",   //返回格式为json
        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        success: function(data) {
            if(data.length > 0){
                $("#province").empty();
                var opt = "<option value=''>请选择</option>";
                for(var i = 0; i < data.length; i++){
                    opt += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                }
                $("#province").html(opt);
            }
        }
    });

}

var main = {
	init: function(){
		addFormValidate();
        initOneLevelClassify();
        initProvince();

        $("#oneLevelClassify").change(function(){
            var id = $(this).val();
            var opt = "<option value=''>请选择</option>";
            if(id == ""){
                $("#secondLevelClassify").empty();
                $("#secondLevelClassify").html(opt);
                return;
            }
            $.ajax({
                url: "ntpl/utils/getclasschilds",    //请求的url地址
                data:{parentId:id},
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "GET",   //请求方式
                success: function(data) {
                    if(data.length > 0){
                        $("#secondLevelClassify").empty();
                        for(var i = 0; i < data.length; i++){
                            opt += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                        }
                        $("#secondLevelClassify").html(opt);
                    }
                }
            });

        });

        $("#province").change(function(){
            var id = $(this).val();
            var opt = "<option value=''>请选择</option>";

            $("#area").empty();
            $("#area").html(opt);
            $("#street").empty();
            $("#street").html(opt);
            if(id == ""){
                $("#city").empty();
                $("#city").html(opt);
                return;
            }
            $("#city").val("");


            $.ajax({
                url: "ntpl/utils/getregionchilds",    //请求的url地址
                data:{parentId:id},
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "GET",   //请求方式
                success: function(data) {
                    if(data.length > 0){
                        $("#city").empty();
                        for(var i = 0; i < data.length; i++){
                            opt += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                        }
                        $("#city").html(opt);
                    }
                }
            });

        });

        $("#city").change(function(){
            var id = $(this).val();
            var opt = "<option value=''>请选择</option>";

            $("#street").empty();
            $("#street").html(opt);
            if(id == ""){
                $("#area").empty();
                $("#area").html(opt);
                return;
            }
            $("#area").val("");

            $.ajax({
                url: "ntpl/utils/getregionchilds",    //请求的url地址
                data:{parentId:id},
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "GET",   //请求方式
                success: function(data) {
                    if(data.length > 0){
                        $("#area").empty();
                        for(var i = 0; i < data.length; i++){
                            opt += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                        }
                        $("#area").html(opt);
                    }
                }
            });

        });

        $("#area").change(function(){
            var id = $(this).val();
            var opt = "<option value=''>请选择</option>";
            if(id == ""){
                $("#street").empty();
                $("#street").html(opt);
                return;
            }
            $("#street").val("");

            $.ajax({
                url: "ntpl/utils/getregionchilds",    //请求的url地址
                data:{parentId:id},
                dataType: "json",   //返回格式为json
                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                type: "GET",   //请求方式
                success: function(data) {
                    if(data.length > 0){
                        $("#street").empty();
                        for(var i = 0; i < data.length; i++){
                            opt += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
                        }
                        $("#street").html(opt);
                    }
                }
            });

        });


        $.get("ntpl/merchant/getmchinfo",
            {userId:$("#userId").val()},
            function(data){
                $("#mchUuid").val(data.mchUuid);
                $("#mchName").val(data.mchName);
                $("#address").val(data.mchAddress);
                $("#oneLevelClassify").val(data.mchFirstClassification);
                $("#oneLevelClassify").change();
                $("#secondLevelClassify").val(data.mchSecondClassification);
                $("#province").val(data.mchProvinceId);
                $("#province").change();
                $("#city").val(data.mchCityId);
                $("#city").change();
                $("#area").val(data.mchAreaId);
                $("#area").change();
                $("#street").val(data.mchStreetId);
                $("#mchLogo").val(data.mchLogo);
                $("#ImgUrl").attr("src",data.mchLogo);
            }
        );


	}
}

main.init();
jQuery.validator.addMethod("checkImg", function(value, element, param) {
    if($("#mchLogo").val() === ""){
        return false;
    }
    return true;
}, $.validator.format("请上传logo"));


