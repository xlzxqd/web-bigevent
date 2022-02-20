$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
// 纵横比
aspectRatio: 1,
// 指定预览区域
preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)
$('#btnChooseImage').on('click',function(){
    $('#file').click()
})
$('#file').on('change',function(e){
    var filelist = e.target.files
    console.log(filelist)
    console.log(filelist.length )
    if(filelist.length === 0 ){
        console.log('111')
        return layer.msg('请选择文件')
        
    }
    //1 拿到用户选择的文件
    var file = e.target.files[0]
    //2 将文件转换为路径
    var newURL = URL.createObjectURL(file)
    //3 初始化裁剪区
    $image
        .cropper('destroy') //销毁旧的裁剪区
        .attr('src',newURL) //重新设置图片路径
        .cropper(options)  //重新定义裁剪区 

    })
    $('#btnUpload').on('click',function() {
        var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method:'post',
            url:'/my/update/avatar',
            data:{
                avatar: dataURL
            },
            success:function(res){
            if(res.status !== 0){
                return layer.msg('更换头像失败!')
            }
            layer.msg('更换头像成功!')
            window.parent.getUserinfo()
            }
        })
    })
})