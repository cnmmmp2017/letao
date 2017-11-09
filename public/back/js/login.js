$(function(){
    //获取表单
    var $form = $("form");
    //调用bootstrapValidator
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
                    message:"密码长度是6-12位"
                },
            }
        }
    }


    });


})