const http=require("http");
const express=require("express");
var qingdan=require("./qingdan");
var addOther=require("./addOther");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app=express();
var portId=5050;
http.createServer(app).listen(portId);

app.use(express.static('public'));

app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',
    resave: true,
    saveUninitialized:true
}));
app.get('/isLogin', function(req, res) {
    if(req.session.user){
        var user=req.session.user;
        var id=user.uid;
        var name=user.name;
        var output={
            code:1,
            uid:id,
            uname:name
        };
        res.json(output);
    }else{
        var output={
            code:2
        };
        res.json(output);
    }
});
app.get('/news/:start',qingdan.getNews);
app.post('/login',qingdan.login);
app.post('/register',qingdan.register);
app.get('/name/:name',qingdan.hasName);
app.get('/logout',qingdan.logout);
app.get('/geekTechnology',addOther.geekTechnology);
app.get('/lifeWay',addOther.lifeWay);
app.get('/art',addOther.art);
app.get('/design',addOther.design);
app.get('/play',addOther.play);
app.get('/happy',addOther.happy);
app.get('/other',addOther.other);
app.post('/addNews',addOther.addNews);
app.post('/uploadImage',addOther.uploadImage);