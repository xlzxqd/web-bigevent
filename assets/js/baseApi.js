$.ajaxPrefilter(function(options){
    options.url = 'http://127.0.0.1:3030'+options.url
    // 判断url地址里面有没有/my/这个接口
    if(options.url.indexOf('/my/') !== -1){
        options.headers={
            Authorization:localStorage.getItem('token')|| ''
        }
        // console.log(options.url.indexOf('info'))
    }
    options.complete=function(res){
        // if(res.responseJSON.status !== 0){
        //     localStorage.removeItem('token')
        //     location.href = './login.html'
        // }
    }
    
})