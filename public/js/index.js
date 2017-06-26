
$('#header').load('header.html');
$('#footer').load('footer.html');
$(function(){
   var start=0;
   var listL=0;
   var htmlAll='';
   var i=0;
   function loadList(data){
       var html='';
       listL+=data.length;
       for(var i=0;i<data.length;i++){
           html+=`<div class="section-card"><div class="section-top">`;
           html+=`<img src="${data[i].pic}"/>`;
           html+=`<p>${data[i].uname}</p>`;
           html+=`<span>发布了一个轻单</span>`;
           html+=`</div>`;
           html+=`<img class="img-w" src="${data[i].img}"/>`;
           html+=`<div class="section-content">`;
           html+=`<h2><a href="#">${data[i].title}</a></h2>`;
           html+=`<p>${data[i].detail}</p></div></div>`;
       }
       return html;
   }
   $.ajax({
       type:'GET',
       url:'/news/'+start,
       success:function(data){
           i=data.length;
           htmlAll=loadList(data);
           $('#section').html(htmlAll);
       },
       error:function(){
           console.log('请求错误');
       }
   });
   function loadMore(){
        $.ajax({
            type:'GET',
            url:'/news/'+start+listL,
            success:function(data){
                if(i<4){
                    $('.alert').show();
                    return;
                }
                i=data.length;
                //console.log(i);
                var str=loadList(data);
                htmlAll+=str;
                $('#section').html(htmlAll);
            },
            error:function(){
                console.log('请求错误');
            }
        });
    }
    $(window).scroll(function(){
        //console.log($(document).height()-$(this).scrollTop()-$(this).height());
        if($(document).height()-$(this).scrollTop()-$(this).height()<10){
            loadMore();
        }
    });
});
