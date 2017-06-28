const mysql=require("mysql");
const qs=require('querystring');
const fs = require("fs");
var pool=mysql.createPool({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,
    connectionLimit:5
});
function mysqlCoon(req,res,newsType){
    var sql = "SELECT a.uname,b.pic,c.img,c.title,c.detail FROM t_login a,t_user b,t_news c WHERE a.id=b.id AND b.uid=c.uid AND newsType="+newsType+"";
    pool.getConnection(function (err, conn) {
        conn.query(sql, function (err, result) {
            res.json(result);
            conn.release();
        });
    });
}
module.exports= {
    geekTechnology:function(req,res){
        mysqlCoon(req,res,1);
    },
    lifeWay:function(req,res){
        mysqlCoon(req,res,2);
    },
    art:function(req,res){
        mysqlCoon(req,res,3);
    },
    design:function(req,res){
        mysqlCoon(req,res,4);
    },
    play:function(req,res){
        mysqlCoon(req,res,5);
    },
    happy:function(req,res){
        mysqlCoon(req,res,6);
    },
    other:function(req,res){
        mysqlCoon(req,res,7);
    },
    addNews:function(req,res){
        req.on('data', function(buf){
            var obj = qs.parse(buf.toString());
            console.log(obj);
        });
    },
    uploadImage:function(req,res,next){
        var output = {};
        req.on('data', function(buf){
            var obj = qs.parse(buf.toString());
            var imgData =String(obj.imgC);
            //过滤data:URL
            var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64Data, 'base64');
            console.log('./public/img/'+obj.imgName);
            fs.writeFile('./public/img/'+obj.imgName,dataBuffer,function(err) {
                if(err){
                    output.code=2;
                    output.msg='保存失败';
                    res.json(output);
                }else{
                    output.code=1;
                    output.msg='保存成功';
                    res.json(output);
                    return next();
                }
            });
        });
    }
};