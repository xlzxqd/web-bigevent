$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nikename:function(value){
            if(value.length > 6){
                return '长度需要在1-6个字符之间'
            }
        }
    })
    initUserinfo()


function initUserinfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success: function(res){
            if(res.status !==0){
                return layer.msg(res.message)
            }
            // 调用form.val()快速给表单赋值
            form.val('formUserinfo',res.data)
        }
    })
}
// 重置表单的数据
$('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserinfo()
})
// 更改用户基本信息
$('.layui-form').on('submit',function(e) {
    e.preventDefault()
    // 表单提交的数据
    console.log($(this).serialize())
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('更改成功')
            window.parent.getUserinfo()
        }
    })
})
})
