var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');
// var favicon = require('serve-favicon');

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();
AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'OEKSm7LJElxeU640s5nkYJ1j-gzGzoHsz',
    appKey: process.env.LEANCLOUD_APP_KEY || 'NCEMV8RnquFsSxd4LTFRRkmi',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'RQ5iasqaIaEwBbQS1gjPo7OJ'
});

var app = express();
var mongoose = require('mongoose');
var MongoDB_Conf = require('./config');
mongoose.connect(MongoDB_Conf.database, {useMongoClient: true});

var index = require('./routes/index_routes');
var users = require('./routes/users_routes');
var videos = require('./routes/videos_routes');
var torrents = require('./routes/torrents_routes');
var categories = require('./routes/categories_routes');

//设置允许跨域
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//设置模板
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//设置静态文件目录
var STATIC_OPTIONS = {maxAge: 3600000, redirect: true};
app.use(express.static(path.join(__dirname, '../dist'), STATIC_OPTIONS));
app.use(express.static(path.join(__dirname, '../.tmp'), STATIC_OPTIONS));
app.use(express.static(path.join(__dirname, 'public'), STATIC_OPTIONS));
app.use(express.static(path.join(__dirname, 'app'), STATIC_OPTIONS));

//加载中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(timeout('15s'));// 设置默认超时时间
app.use(AV.express());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//设置路由
app.use('/', index);
app.use('/users', users);
app.use('/videos', videos);
app.use('/torrents', torrents);
app.use('/categories', categories);

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
