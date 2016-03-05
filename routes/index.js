var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: '您收到了一份节日祝福',
        count: 233333,
        list: [{
            from: '张三',
            to: '李四',
            flower: '玫瑰花'
        }, {
            from: '张三',
            to: '李四',
            flower: '玫瑰花'
        }, {
            from: '张三',
            to: '李四',
            flower: '玫瑰花'
        }, {
            from: '张三',
            to: '李四',
            flower: '玫瑰花'
        }, {
            from: '张三',
            to: '李四',
            flower: '玫瑰花'
        }]
    });
});

module.exports = router;
