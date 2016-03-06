var express = require('express');
var router = express.Router();

var wechat = require('../modules/wechat');
var config = require('../configs/config');
var sign = require('../modules/sign');

var W = new wechat();

router.get('/', function(req, res, next) {
    W.getJsapiTicket(function(err, ticket) {
        if (err) {
            console.error(err);
            var result = {
                err: -1
            }
            return res.send(result);
        } else {
            if(req.query.url){
                var url = req.query.url;
            }else{
                var url = req.headers['referer'].replace(/\/$/, '');
            }
            console.log(url);
            var ret = sign(ticket, url);

            res.render('wechat', {
                appId: config.wechat.appId,
                timestamp: ret.timestamp,
                nonceStr: ret.nonceStr,
                signature: ret.signature
            })
        }
    });
});

module.exports = router;
