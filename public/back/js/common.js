// 进度环
$(document).ajaxStart(function(){
    NProgress.start();
});


if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (data) {
        if(data.error === 400){
          location.href = "login.html";
        }
      }
    });
}

$(document).ajaxStart(function(){
    setTimeout(function() {
        NProgress.done();
    }, 500);        
});

// 二级菜单隐藏
$(".child").prev().on("click",function(){
    $(this).next().slideToggle();
})

// 侧边栏隐藏
$(".btn_menu").on("click",function(){
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
})

// 退出
$(".btn_logout").on("click", function () {
    $("#logoutModal").modal("show");
  
  
    //on注册事件不会覆盖
    //off()解绑所有的事件
    //off("click") 只解绑click事件
    //off("click", "**"); 解绑委托事件
    $(".btn_confirm").off().on("click", function () {
  
      //给服务器发送ajax请求，让服务器清除session
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function (data) {
  
          if(data.success){
            location.href = "login.html";
          }
        }
      });
  
    });
  });