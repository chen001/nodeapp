var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
mongoose.connect('mongodb://localhost/chenTest');

/** session 配置部分 开始  */
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var setting = require('.././setting');
router.use(session({
    secret: setting.cookieSecret,
    cookie: {maxAge: 80000 },
    store: new MongoStore({
        host: '127.0.0.1',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: 27017,          //数据库的端口号
        db : setting.db
    })
}));
/** session 配置部分 结束  */

/* GET home page. */
router.get('/index', function(req, res) {
    res.render('index', { title: 'index' });
});

router.get('/', function(req, res) {
    res.render('index', { title: 'index' });
});

/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});


/*hompage*/
router.post('/homepage', function(req, res) {
    var query_doc = {userid: req.body.userid, password: req.body.password};
    console.log(query_doc);
    (function(){
        user.count(query_doc, function(err, doc){
            console.log("doc："+doc);
            if(doc == 1){   //登陆成功存入session
                console.log(query_doc.userid + ": login success in " + new Date());
                req.session.user = query_doc;
                res.render('homepage', { title: req.session.user.userid });
            }else{
                console.log(query_doc.userid + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});

module.exports = router;