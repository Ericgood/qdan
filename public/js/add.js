$('#header').load('header.html',function(e){
    $(this).children().children('.section-bg').remove();
    var name=pageName();
    $('[name="'+name+'"]').addClass('active').parent().siblings().children('.active').removeClass('active');
    if(name!="/add"){
        $.ajax({
            type:'GET',
            url:name,
            success:function(data){
                var html=loadList(data);
                $('#section').html(html);
            },
            error:function(){
                console.log('请求错误');
            }
        });
    }
});
function pageName(){
    var strUrl=location.href;
    strUrl=strUrl.substring(strUrl.lastIndexOf('/'),strUrl.lastIndexOf('.'));
    return strUrl;
}
function loadList(data){
    var html='';
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
var fileName='';
var files='';
$('#uploadCover').change(function(e){
    var path=$(this).val();
    var allowSuffixArr = ["jpg","png","jpeg","gif"];
    var suffixName=path.substr(path.lastIndexOf('.')+1);
    var isAllow=false;
    var that=this;
    for( v of allowSuffixArr){
        if(suffixName.toLowerCase()==v){
            isAllow=true;
            break;
        }
    }
    if(!isAllow){
        alert('您上传的图片不是'+allowSuffixArr.join(','));
        $(this).val('');
        return false;
    }
    files = this.files || [];
    if (files.length === 0) {
        return;
    }
    // 选中的文件，预览、上传
    proImage("image",that);
    fileName=path.substr(path.lastIndexOf('/')+1);
});

function proImage(id,obj){
    var $img = $("#"+id);
    var $file = $(obj);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var prevImgSrc=$img.attr('src');
    if (fileObj && fileObj.files && fileObj.files[0]) {
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src', dataURL);
    } else {
        dataURL = $file.val();
        var imgObj = document.getElementById(id);
        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
    }
    $img.height($img.width()*(300/640));
}

$('#uploadImg').click(function(e){
    e.preventDefault();
    $('#uploadCover').click();
});
function imgUpL(){

    if (files.length === 0) {
        return;
    }
    var filename = files[0].name || '';
    var fileSize = files[0].size || '';

    if(fileSize<=100000){
        var fr = new FileReader();
        // onload事件
        fr.onload = function (evt) {
            var base64 = evt.target.result || this.result;
            $.ajax({
                type:'POST',
                url:'/uploadImage',
                data:{imgC:base64,imgName:filename},
                success:function(data){
                    console.log('上传成功');
                },
                error:function(){
                    console.log('请求错误');
                }
            });
        };
        fr.readAsDataURL(files[0]);
    }
}
$('.add-new .form-group button').click(function(){
    var $img=$('#image');
    var imgUrl='';
    imgUpL();
    if(fileName){
        imgUrl='img/'+fileName;
    }else{
        var i=$img.attr('src').lastIndexOf('/');
        var imgName=$img.attr('src').slice(i);
        imgUrl='img'+imgName;
    }
    $('[name="img"]').val(imgUrl);
    var data=$('.add-new').serialize();
    console.log(data);
    $.ajax({
        type:'POST',
        url:'/addNews',
        data:data,
        success:function(data){
            console.log(data);
        },
        error:function(){
            console.log('请求错误');
        }
    });
});
var count=1;
$('#checkImg').click(function(){
    var $img=$('#image');
    count++;
    var i = $img.attr('src').lastIndexOf('.');
    var imgSrc= $img.attr('src').substring(0,i-1)+count+$img.attr('src').substr(i);
    console.log(imgSrc);
    $img.attr('src',imgSrc);
    if(count>=6){
        count=1;
    }
});
$('#footer').load('footer.html');
