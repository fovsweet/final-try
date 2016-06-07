/*
 option参数
 url: 请求的地址
 */

$.fn.extend({
    __IMGOBJ:{},
    currentPage:0,
    material:function(option,callback){
        var _ = this;
        $(_).html('');
        _.createBox(_);
        _.menuList(option,callback);
        $('.creative_center_right').append(
            '<div id="Fov" class="pageNav"></div>'
        );
        $('#search_image').on('click',function(){
            _.imgList(option.img_list_url,$('.creative_center .creative_center_left .haschecked').data('sys'),$('#search_Image_contnet').val(),callback)
        });
    },
    createBox:function(dom){
        var _ = this;
        var idom =
            '<div class="creative_center">'+
            '<div class="creative_center_left">'+
            '</div>'+
            '<div class="creative_center_right">'+
            '<div class="imgListContent">'+
            '</div>'+
            '</div>'+
            '</div>';
        $(dom).append(idom);
    },
    menuList:function(menuUrl,callback){
        var _ = this;
        $.post(menuUrl.menu_url,function(data){
            for(var i in data){
                $('.creative_center_left').append(
                    '<a class="creative_center_left_items" href="javascript:;" data-sys='+data[i].sysCode+'>'+
                    ''+data[i].sysName+'(<span>'+data[i].picTotal+'</span>)'
                )
            };
            $('.creative_center .creative_center_left .creative_center_left_items').on('click',function(){
                if($(this).hasClass('haschecked') === false){
                    $('.creative_center .creative_center_left .creative_center_left_items').removeClass('haschecked');
                    $(this).addClass('haschecked');
                    _.imgList(menuUrl.img_list_url,$(this).data('sys'),$('#search_Image_contnet').val(),callback);
                }
            });
            $('.creative_center .creative_center_left .creative_center_left_items:nth-of-type(1)').click()
        });
    },
    imgList:function(listUrl,sysCode,searchVal,callback){
        var _ = this;
        $('.creative_center_right .imgListContent').html('');
        $.post(listUrl,{sysCode:sysCode,fileName:searchVal,pageSize:'8',page: _.currentPage},function(data){
            _.__IMGOBJ = data.content;
            for(var i= 0;i<data.content.length;i++){
                $('.creative_center_right .imgListContent').append(
                    '<div class="creative_center_right_items">'+
                    '   <div data-pre='+i+' class="right_items_imgbox">'+
                    '      <img src='+data.content[i].url+' alt='+data.content[i].fileName+'/>'+
                    '   </div>'+
                    '   <div class="right_items_info">'+
                    '       <h2>'+data.content[i].width+'x'+data.content[i].height+'</h2>'+
                    '       <p>'+data.content[i].fileName+'</p>'+
                    '   </div>'+
                    '</div>'
                )
            };
            if(data.total>8){
                //分页
                function pageselectCallback(page_id, jq) {
                    _.currentPage = page_id;
                    _.imgList(listUrl,sysCode,searchVal,callback);
                    return false;
                }
                $("#Fov").pagination(data.total,{
                    callback: pageselectCallback,//PageCallback() 为翻页调用次函数。
                    prev_text: " 上一页",
                    next_text: "下一页 ",
                    items_per_page:8, //每页的数据个数
                    num_display_entries:2, //两侧首尾分页条目数
                    current_page: _.currentPage,   //当前页码
                    num_edge_entries: 2 //连续分页主体部分分页条目数
                });
            }else{
                $("#Fov").html('')
            };
            $('.right_items_imgbox').on('click',function(){
                if($(this).hasClass('haschecked') == false){
                    $('.right_items_imgbox').removeClass('haschecked');
                    $(this).addClass('haschecked');
                    var j = $(this).data('pre');
                    callback(_.__IMGOBJ[j])
                };
            });
            _.currentPage = 0;
        });
    }
});

!$(document).ready(function () {
    $.ajax({
        type: "post",
        url: durl,
        async: true,
        success: function (navigation) {
            //$('#sidebar').length > 0
            if ($("#content").hasClass("navigation")) {
                var data = navigation.menu;
                var menulis = "";
                var menuindex = "";
                //导航栏
                for(var i = 0; i < data.menus.length; i++){
                    var menus = data.menus[i];
                    menulis += "<li><a href='"+menus.href+"' id='current"+menus.id+"'>" +
                        "<span class='nav-icon "+menus.class+"'></span><span>"+menus.name+"</span></a></li>";

                    if(menuindex == ""){
                        for(var j = 0; j < menus.list.length; j++){
                            if(menus.list[j].links == menuKey){
                                menuindex = i;
                                break;
                            }
                        }
                    }
                }
                $("#topBar").append(menulis);

                if($('#sidebar').length > 0){
                    var sidediv = "<div class='avatar'><img src=''/></div>" +
                        "<div class='user-name'><span></span></div>";
                    var sideul = "<ul class='second-nav'>";

                    if(menuindex == "") menuindex = 0;
                    for(var i = 0; i < data.menus[menuindex].list.length; i++){
                        var list = data.menus[menuindex].list[i];
                        if(menuKey == list.links){
                            sideul += "<li><a href='"+list.href+"' class='current'><span class='light-dot'></span><span>"+list.name+"</span></a></li>";
                        }else{
                            sideul += "<li><a href='"+list.href+"' ><span class='light-dot'></span><span>"+list.name+"</span></a></li>";
                        }
                    }
                    sideul += "</ul>";
                    $("#sidebar").append(sidediv + sideul);

                    //商家信息
                    var mchData = navigation.mchInfo;
                    $("#sidebar").find("img").attr("src", mchData.mchLogo);
                    $("#sidebar").find(".user-name").find("span").text(mchData.mchName);

                    //标题高亮
                    $("#current" + data.menus[menuindex].id).attr("class","current");
                }

                //系统栏
                if(data.rightNav.length > 0){
                    var sysli = "<li><a href='"+data.rightNav[0].href+"'>" +
                        "<span class='setting-icon setting-ico-sys'></span><span>"+data.rightNav[0].name+"</span></a></li>";
                    $("#sysBar").append(sysli);
                }

            }else{
                var menu = new menuTree();
                menu.init({
                    "targetId": "sts_sidebar",
                    "data": navigation.menu.menus,
                    "menuKey": menuKey,
                    "action": "click",
                    "initCallBack": function () {
                        //setSectionLeft('#sidebar > ul > li.show >ul', 165, 165);
                        $('#sts_sidebar>ul').css('min-height', $(window).height() - 110);
                    }
                });
            }
        }
    });
});

/************************************华丽丽的分割线***************************/
/*
 * [data 数据结构]
 * @param  {object} array
 * [{
 * 	'name':'',    菜单名字
 *  'links':'',   添加的data-check字段，可用作判断当前项是否选中
 *  'class':'',   span样式名，可以更改菜单图标
 *  'href':'',    当前菜单超链接
 *  'list':[{...},{...},{...}]
 * },{...}]
 *
 *[menuTree 生成导航菜单]
 * @param  {object} setting
 *   {
 *     targetId: ID值,必须有
 * 	       data: 直接传入菜单数据，
 *          url： ajax请求数据的接口，
 *       action: 打开下级菜单的方式，默认'click'，滑动打开则是'hover',
 *clickCallBack: 点击菜单时的回调函数
 * initCallBack: 初始化完菜单的回调函数
 *   }
 */
function menuTree() {
    this.html = '';
    this.obj = null;
    this.config = {
        'data': '',
        'url': '',
        'menuKey': '',
        'action': 'click',
        'clickCallBack': null,
        'initCallBack': null
    }
}

menuTree.prototype.init = function (setting) {
    //合并config配置文件信息
    var _config = $.extend(this.config, setting);
    //选中目标元素
    this.obj = $('#' + _config.targetId);
    //判断是否设置异步请求数据地址，没有则是从配置的硬数所获取
    if (_config.url != '' && _config.url != null && _config.url != 'undefined') {
        this.getData(_config.url);
    } else {
        this.forTree(_config.data);
    }
    //生成ul,li列表树，添加节点到目标元素中
    this.obj.append(this.html);
    //添加一，二级菜单是点击事件，还是鼠标滑过，并执行回调函数
    _config.action == 'click' ? this.menuClick(_config.clickCallBack) : this.menuHover(_config.clickCallBack);

    //打开页面，选择某一元素为选中状态，通过回传的menuKey的值去判断
    if (_config.menuKey != null && _config.menuKey != 'undefined') {
        this.checkMenu(_config.menuKey);
    }
    //初始化完后执行的回调函数
    _config.initCallBack && _config.initCallBack();
}

menuTree.prototype.forTree = function (data) {
    this.html += '<ul><i></i>';
    for (var i = 0, ii = data.length; i < ii; i++) {
        if (typeof data[i].href == 'undefined' || $.trim(data[i].href) == '') {
            this.html += '<li data-check="' + data[i].links + '">' +
                '<a href="javascript:;">' +
                '<span class="' + data[i].class + '"></span>' +
                data[i].name +
                '<i class="arrow"></i>' +
                '</a>';
        } else {
            this.html += '<li data-check="' + data[i].links + '">' +
                '<a href="' + data[i].href + '">' +
                '<span class="' + data[i].class + '"></span>' +
                data[i].name +
                '<i class="arrow"></i>' +
                '</a>';
        }
        if (data[i].list != null && data[i].list.length > 0) {
            this.forTree(data[i].list);
        }
        this.html += '</li>';
    }
    this.html += '</ul>';
}

menuTree.prototype.getData = function (durl) {
    $.ajax({
        type: "post",
        url: durl,
        async: true,
        success: function (result) {
            var oresult = JSON.parse(result);
            this.forTree(oresult);
        }
    });
}

menuTree.prototype.menuClick = function (callback) {
    var menuEls = this.obj.find('li');
    for (var i = 0, ii = menuEls.length; i < ii; i++) {
        menuEls[i].onclick = function (e) {
            $(this).siblings('li').removeClass('show');
            //this.className =(this.className.length>0? "": "") + "show";
            $(this).addClass('show');
            //TODO
            callback && callback();
            e.stopPropagation();
        }
    }
}

menuTree.prototype.menuHover = function () {
    var menuEls = this.obj.find('li');
    for (var i = 0, ii = menuEls.length; i < ii; i++) {
        menuEls[i].onmouseover = function () {
            this.className += (this.className.length > 0 ? " " : "") + "show";
        }
        menuEls[i].onmouseout = function () {
            this.className = this.className.replace(new RegExp("( ?|^)show\\b"), "");
        }
    }
}

menuTree.prototype.setsideBarHeigh = function (obj, val) {
    var h = $(window).height() - val;
    var ch = $('#' + obj).height();
    if (ch < h) {
        $('#' + obj).css('height', h + 'px');
    }
}

menuTree.prototype.checkMenu = function (menuK) {
    $this = this.obj.find('li[data-check="'+ menuK +'"]');
    //看是否有相应的menuK值,如果没有则作其它操作
    if($this.length > 0){
        if($this.parents('li').length > 0){
            $this.addClass('show showhide').parents('li').addClass('show');
        }else{
            $this.addClass('show showhide');
        }
    }else{
        if(this.obj.children('ul').children('li').hasClass('show')==false){
            this.obj.find('ul>li').eq(0).addClass('show');
        }
    }
}


/*根据sideBar的宽度设置section的左边距*/
function setSectionLeft(obj, smallLeft, largeLeft) {
    if ($(obj).css('display') == 'block') {
        $('#section').css('margin-left', '' + largeLeft + 'px');
    } else {
        $('#section').css('margin-left', '' + smallLeft + 'px');
    }
}

/*cnzz网站数据统计代码*/
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258985760'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1258985760%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));
