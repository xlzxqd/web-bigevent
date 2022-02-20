if(!(localStorage.getItem('token'))){
    location.href='./login.html'
}
$(function () {

    getUserinfo()
    var layer = layui.layer

    $('#btnLogout').on('click',function(){
        layer.confirm('确认退出吗',{icon:3,title:'提示'},function(){
            localStorage.removeItem('token')
            location.href = './login.html'  
        })
    })
})


// 获取用户的基本信息
function getUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 请求头配置对象
        success: function (res) {
            if(res.status !== 0){
                 layui.layer.msg(res.message)
                location.href = './login.html'
            }
            // 调用渲染用户头像的方法
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nikename || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;&nbsp;'+name)
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}