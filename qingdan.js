const mysql=require("mysql");
const qs=require('querystring');
var pool=mysql.createPool({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,
    connectionLimit:5
});
module.exports= {
    getNews: function (req, res) {
        var start = req.params.start;
        var count = 4;
        var sql = "SELECT a.uname,b.pic,c.img,c.title,c.detail FROM t_login a,t_user b,t_news c WHERE a.id=b.id AND b.uid=c.uid LIMIT " + start + "," + count + "";
        pool.getConnection(function (err, conn) {
            conn.query(sql, function (err, result) {
                res.json(result);
                conn.release();
            });
        })
    },
    login: function(req, res){
        //从POST请求中读取数据：uname、upwd
        req.on('data', function(buf){
            var obj = qs.parse(buf.toString());
            pool.getConnection(function(err, conn){
                conn.query(
                    'SELECT id FROM t_login WHERE uname=? AND upwd=?',
                    [obj.uname, obj.upwd],
                    function(err, result){
                        if(result.length>0){ //查询到数据了
                            var user={
                                uid:result[0].id,
                                name:obj.uname
                            };
                            req.session.user=user;
                            var output = {
                                code: 1,
                                msg: '登录成功',
                                uid: result[0].id
                            };
                        }else {  //未查询到数据
                            var output = {
                                code: 2,
                                msg: '用户名或密码错误'
                            }
                        }
                        res.json(output); //把数据转化为JSON
                        conn.release();
                    })
            })
        })
    },
    register:function(req,res){
        req.on('data',function(data){
            //console.log(data.toString());
            var obj=qs.parse(data.toString());
            pool.getConnection(function(err,conn){
                conn.query('INSERT INTO t_login VALUES (?,?,?)',[null,obj.uname,obj.upwd],function(err,result){
                    if(err){
                        console.log(err);
                    }else{
                        var user={
                            uid:result.insertId,
                            name:obj.uname
                        };
                        req.session.user=user;
                        res.json({code: 1, msg: '注册成功', id: result.insertId});
                        conn.release();
                    }
                });
            });
        });
    },
    hasName:function (req, res) {
        var uname = req.params.name;
        pool.getConnection(function (err, conn) {
            conn.query(
                'SELECT id FROM t_login WHERE uname=?',
                [uname],
                function(err, result){
                    if(result.length>0){ //查询到数据了
                        var output = {
                            code: 1,
                            msg: '该用户名已经注册过了'
                        };
                    }else {  //未查询到数据
                        var output = {
                            code: 2,
                            msg: '该用户名可以用'
                        }
                    }
                    res.json(output); //把数据转化为JSON
                    conn.release();
                })
        })
    },
    logout:function(req,res){
        req.session.user=null;
        var output = {
            code: 1
        };
        res.json(output);
    }
};