var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var template = require('art-template');
var lessMiddleware = require('less-middleware');
var fs = require('fs');

var getCard = require('./routes/get_card');
var insertCard = require('./routes/insert_card');
var index = require('./routes/index');
var wechat = require('./routes/wechat');
var getUserInfo = require('./routes/get_userinfo.js');

var app = express();

// create a write stream (in append mode)
if (process.env.filesyspath) {
    var accessLogFileDir = process.env.accesslog_path;
} else {
    var accessLogFileDir = __dirname + '/access.log';
}
var accessLogStream = fs.createWriteStream(accessLogFileDir, {
    flags: 'a'
});


template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(lessMiddleware(path.join(__dirname, 'less'), {
    debug: true,
    dest: path.join(__dirname, 'public'),
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace(/(\/|\\)css(\/|\\)/, '/');
        }
    },
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(logger('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/test', function(req, res) {
    res.render('test');
});
app.use('/API', getCard);
app.use('/API', insertCard);
app.use('/API', getUserInfo);

app.use('/wechat', wechat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;
