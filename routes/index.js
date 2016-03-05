var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {title: '某个标题'});
});

router.get('/page2', function(req, res, next) {
    res.render('page2', {title: '某个标题', count: 233333});
});

router.get('/page3', function(req, res, next) {
    res.render('page3', {title: '某个标题'});
});

router.get('/page4', function(req, res, next) {
    res.render('page4', {title: '某个标题', flowerId: 1, contentTitle: '战吼：', content: '我能吞下玻璃而不伤身体。'});
});

router.get('/page5', function(req, res, next) {
    res.render('page5', {title: '某个标题', flowerId: 1, content: '我能吞下玻璃而不伤身体。我能吞下玻璃而不伤身体。我能吞下玻璃而不伤身体。我能吞下玻璃而不伤身体。我能吞下玻璃而不伤身体。'});
});

module.exports = router;
