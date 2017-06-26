var uid=null;
$.ajax({
    type:'GET',
    url:'/isLogin',
    success:function(data){
        console.log(data);
        if(data.code===1){
            uid=data.uid;
            $('#login-after').css({"display":"block"});
            $('#area-menu').css({"display":"none"});
        }
    },
    error:function(){
        console.log('请求错误');
    }
});
$('.list-cate li a,.popup-menu li a').click(function(){
    var index=$(this).attr('index');
    switch (index){
        case "1":
            window.location.href='index.html';
            break;
        case "2":
            window.location.href='geekTechnology.html';
            break;
        case "3":
            window.location.href='lifeWay.html';
            break;
        case "4":
            window.location.href='art.html';
            break;
        case "5":
            window.location.href='design.html';
            break;
        case "6":
            window.location.href='play.html';
            break;
        case "7":
            window.location.href='happy.html';
            break;
        case "8":
            window.location.href='other.html';
            break;
    }
});
$('.btn-login').click(function(){
    $('#modal').load('login_register.html',function(){
        ShowDiv('modal');
        $(document.body).css({"overflow-y":"hidden"});
        $('a.close').click(function(){
            CloseDiv('modal');
            $(document.body).css({"overflow-y":"auto"});
        });
    });
});
function ShowDiv(modalID){
    var modals=$('#'+modalID).children()[4];
    modals.style.display='block' ;
    $(modals).height($(document).height());
}
//关闭弹出层
function CloseDiv(modalID) {
    $('#'+modalID).children()[4].style.display='none';
}
$('a.btn-menu-toggle').click(function(){
    $(this).siblings('.popup').toggle();
    var isShow=$(this).siblings('.popup')[0].style.display;
    //console.log(isShow);
    if(isShow==='block'){
        $(this).html('△');
    }else if(isShow==='none'){
        $(this).html('▽');
    }
});
$('.user-central').click(function(){
    if(!$(this).hasClass('active')) {
        $(this).addClass('active').next('ul').toggle();
    }else{
        $(this).removeClass('active').next('ul').toggle();
    }
});
$('.logout').click(function(){
    $.ajax({
        type:'GET',
        url:'/logout',
        success:function(data){
            console.log(data);
            if(data.code===1){
                console.log(1);
                $('#area-menu').css({"display":"block"});
                $('#login-after').css({"display":"none"});
                window.location.href="/";
            }
        },
        error:function(){
            console.log('请求错误');
        }
    });
});