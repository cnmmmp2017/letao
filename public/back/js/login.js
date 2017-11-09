$(function(){
    //获取表单
    var $form = $("form");
    //调用bootstrapValidator 校验表单
    $form.bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

    //   规则
    fields: {
        username: {
            validators: {
                notEmpty: {
                    message: "用户名不能为空"
                },
                callback: {
                    message:"用户名错误"
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: "密码不能为空"
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: "密码长度是6-12位"
                },
                callback: {
                    message: "密码错误"
                }
            }
        }
    }
    });

    // 给表单注册一个校验成功事件
    $form.on("success.form.bv",function(e){
        // 阻止默认行为
        e.preventDefault();

        //console.log($form.serialize());

        //使用ajax发送登录请求
        $.ajax({
            type:"post",            
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    // 跳到首页
                    location.href = "index.html";
                }
                if(data.error === 1000){
                    // 第一个参数  字段名
                    // 第二个参数  校验失败
                    // 第三个参数  配置提示信息
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(data.error === 1001){
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
                console.log(data);
            }
        })
    });

    // 表单重置功能
    $("[type='reset']").on("click",function(){
        // 获取validator对象   调用resetForm方法
        $form.data("bootstrapValidator").resetForm();
    });
});