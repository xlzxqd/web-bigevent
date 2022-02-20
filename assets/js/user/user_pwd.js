$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
      samePwd:function(value){
        if(value === $('[name = oldPwd]').val()){
            return '新旧密码不能相同'
        }
      },
      repwd:function(value){
        var pwd = $('.reg-box [name=newPwd]').val()
        if(pwd !== value){
            return '俩次密码不一致'
        }
    }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})