$('button:contains("注册")').click(function(){
    $('.login')[0].style.display='none';
    $('.register')[0].style.display='block';
});
$('button:contains("登录")').click(function(){
    $('.register')[0].style.display='none';
    $('.login')[0].style.display='block';
});
$('a:contains("用户中心")').mouseenter(function(){
    $(this).addClass('active').next().show();
}).mouseleave(function(){
    $(this).removeClass('active').next().hide();
});
$('a:contains("还未注册？")').click(function(){
    $('.login')[0].style.display='none';
    $('.register')[0].style.display='block';
});
$('a:contains("已有账户？")').click(function(){
    $('.register')[0].style.display='none';
    $('.login')[0].style.display='block';
});
$('.submit:contains("登录")').click(
    function(e){
        e.preventDefault();
        login();
    }
);
$('.submit:contains("注册")').click(
    function(e){
        console.log("e");
        e.preventDefault();
        register();
    }
);
function register(){
    var unameObj=$('.register [type=text]');
    var upwdObj=$('.register [type=password]');
    $('.register input').keyup(function(){
        $('.modal-shade>div p').css({'display':'none'});
    });
    unameObj.blur(function(){
        console.log(1);
        var name=unameObj.val();
        $.ajax({
            type:'GET',
            url:'/name/'+name,
            success:function(data){
                if(data.code==1){
                    $('.modal-shade>div p').html(data.msg).css({'display':'block'});
                }
            },
            error:function(){
                console.log('请求错误');
            }
        });
    });
    isRequired(unameObj,upwdObj,'/register');
}
function isRequired(unameObj,upwdObj,url){
    if(unameObj.val()!=''&&upwdObj.val()!=''){
        $.ajax({
            type:'post',
            url:url,
            data:{
                uname:unameObj.val(),
                upwd:upwdObj.val()
            },
            success:function(data){
                if(data.code==1){
                    window.location.href="/";
                }else if(data.code===2){
                    $('.modal-shade>div p').html(data.msg).css({'display':'block'});
                }
            },
            error:function(){
                console.log('请求错误');
            }
        });
    }else{
        $('.modal-shade>div p').css({'display':'block'});
        if(unameObj.val()==''){
            unameObj.focus();
        }else if(upwdObj.val()==''){
            upwdObj.focus();
        }
    }
}
function login(){
    var unameObj=$('.login [type=text]');
    var upwdObj=$('.login [type=password]');
    $('.login input').keyup(function(){
        $('.modal-shade>div p').css({'display':'none'});
    });
    isRequired(unameObj,upwdObj,'/login');
}
