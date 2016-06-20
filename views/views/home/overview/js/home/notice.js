$(function(){

    var path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)) + "/home/overview";
    var _path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)) + "/nomenu/overview";
    //分页
    var items_per_page = 10;
    var page_index = 0;
    pageselectCallback(page_index, null);
    function pageselectCallback(page_id, jq) {
        page_index = page_id;
        $.post(""+path+"/getnoticedata",
            {"currentPage":page_index,"size":items_per_page},
            function(data){
                if(data.error != null){
                    alert(data.error);
                    return;
                }
                var total = data.obj.total;
                initPage(total, jq);
                var divdata = "";
                $("#notice").empty();
                for(var i = 0; i < data.obj.content.length; i++){
                    var createDate = new Date(data.obj.content[i].createTime);
                    var formatDate = createDate.getFullYear() + "." + (createDate.getMonth() + 1) + "." + createDate.getDate();
                    var warning = "";
                    if(data.obj.content[i].readCount == 0){
                        warning = "<span class=\"icon-tips\"></span>";
                    }
                    divdata += "<div  class=\"annou-list\"><span class=\"titels \"><a  style=\"color: #666\" onclick=\"showContent('"+_path+"/notice/"+data.obj.content[i].id+"', this);\" target='_blank' href='javascript:void(0);'>" +
                        ""+data.obj.content[i].title+"</a></span>"+warning+"<span class=\"fr\">"+formatDate+"</span></div>";
                }

                $("#notice").html(divdata);
            }
            ,"json");
        return false;
    }
    function initPage(total, jq){
        if(total < items_per_page){
            $("#Pagination").hide();
        }else{
            $("#Pagination").show();
        }
        if(jq == null){
            $("#Pagination").pagination(total , {
                callback: pageselectCallback,//PageCallback() 为翻页调用次函数。
                prev_text: " 上一页",
                next_text: "下一页 ",
                items_per_page: items_per_page, //每页的数据个数
                num_display_entries: 4, //两侧首尾分页条目数
                current_page: 0,   //当前页码
                num_edge_entries: 2 //连续分页主体部分分页条目数
            });
        }
    }

});

function showContent(path, obj){
    window.open(path);
    $(obj).parent().parent().find("span").eq(1).removeClass("icon-tips");
}
