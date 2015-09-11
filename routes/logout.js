var express = require('express');
var router = express.Router();
/** session 配置部分 开始  */
//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);
//var setting = require('.././setting');
//logout.use(session({
//    secret: setting.cookieSecret,
//    cookie: {maxAge: 80000 },
//    store: new MongoStore({
//        host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
//        port: 27017,          //数据库的端口号
//        db : setting.db
//    })
//}));
/** session 配置部分 结束  */


/*logout*/
router.get('/logout', function(req, res) {
//    if(!!req.session.user){
//        console.log("logout delete Session " + req.session.user.userid);
//        //清理session
//        req.session.user = null;
//    }
    res.render('index', { title: 'logout' });
});

module.exports = router;