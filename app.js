var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');
// var favicon = require('serve-favicon');

AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'OEKSm7LJElxeU640s5nkYJ1j-gzGzoHsz',
    appKey: process.env.LEANCLOUD_APP_KEY || 'NCEMV8RnquFsSxd4LTFRRkmi',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'RQ5iasqaIaEwBbQS1gjPo7OJ'
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var mongoose = require('mongoose');
var MongoDB_Conf = require('./config');

var index = require('./routes/index_routes');
var videos = require('./routes/videos_routes');
var categories = require('./routes/categories_routes');
var users = require('./routes/users_routes');

var app = express();
mongoose.connect(MongoDB_Conf.database, {useMongoClient: true});

//设置模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//加载中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(timeout('15s'));// 设置默认超时时间
app.use(AV.express());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//设置路由
app.use('/', index);
app.use('/videos', videos);
app.use('/categories', categories);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
