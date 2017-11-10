$(function(){

    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data: {
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                var html = template("tpl",data);
                $("tbody").html(html);

                // 渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    size:"small",
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    render();

    // 禁用 启用
    // 需要注册委托事件
    $("tbody").on("click",".btn",function(){

        //弹出模态框
        $("#userModal").modal("show");

        // 获取当前按钮ID
        var id = $(this).parent().data("id");
        // 获取是禁用还是启用   禁用0  启用1
        var isDelete = $(this).hasClass("btn-danger")?0:1;

        $(".btn_edit").off().on("click",function(){
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                    if(data.success){
                        $("#userModal").modal("hide");
                        // 重新渲染
                        render();
                    }
                }
            })
        })
    })
})