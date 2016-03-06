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
            var data = [];
            for(var i in results.posts){
                var flowerName;
                switch (results.posts[i].flowerId) {
                    case 1:
                        flowerName = "百合";
                        break;
                    case 2:
                        flowerName = "康乃馨";
                        break;
                    case 3:
                        flowerName = "满天星";
                        break;
                    case 4:
                        flowerName = "玫瑰"
                        break;
                    case 5:
                        flowerName = "牡丹";
                        break;
                    case 6:
                        flowerName = "郁金香";
                        break;
                    default:
                        flowerName = "百合";
                        break;
                }
                data.push({
                    content: results.posts[i].content,
                    flowerName: flowerName,
                    to: results.posts[i].to,
                    from: results.posts[i].from
                })
            }
            // console.log(data);
            res.render('index', {
                title: '您收到了一份节日祝福',
                count: results.count * 2 + 1024,
                list: data
            });
        }
    });

});

module.exports = router;
