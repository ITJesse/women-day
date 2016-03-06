var express = require('express');
var router = express.Router();
var async = require('async');

var card = require('../configs/mongodb').card;

router.get('/', function(req, res, next) {
    async.parallel({
        count: function(callback) {
            card.count({}, function(err, count) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, count);
                }
            });
        },
        posts: function(callback) {
            card.find({})
                .sort({
                    'addTime': -1
                })
                .limit(20)
                .exec(function(err, posts) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, posts);
                    }
                });
        }
    }, function(err, results) {
        if (err) {
            console.error(err);
            var result = {
                err: -1
            }
            return res.send(result);
        } else {
            res.render('index', {
                title: '您收到了一份节日祝福',
                count: results.count + 1024,
                list: results.posts
            });
        }
    });

});

module.exports = router;
