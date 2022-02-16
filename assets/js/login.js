
$(function () {
    // 点击去注册的连接
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录的连接
    $('#link_login').on('click',function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    var n=1
    $('#xlzs1').on('click',function() {
        if(n==1){
            $('#repwd1').attr('type','text')
            $('#xlzs1').attr('class','xlzs layui-icon layui-icon-star')
            n=0
        }else{
            $('#repwd1').attr('type','password')
            $('#xlzs1').attr('class','xlzs layui-icon layui-icon-face-smile-fine')
           n=1
        }
    })
    // 从layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '俩次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        // 2. 发起Ajax的POST请求
         $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) { 
                return layer.msg(res.message)
             } 
             layer.msg(res.message+'请登录')
             $('#link_login').click()
         })
        })

    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // console.log(res.token)
                localStorage.setItem('token',res.token)
                location.href = './index.html'
            }
        })
    })
 })