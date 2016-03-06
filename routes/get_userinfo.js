var express = require('express');
var router = express.Router();

var config = require('../configs/config');
var request = require('request');

router.get('/GetUserInfo', function(req, res) {
    var code = req.query.code;
    if(!code){
        var result = {
            err: -1
        }
        return res.send(result);
    }
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + config.wechat.appId + "&secret=" + config.wechat.appSecret + "&code=" + code + "&grant_type=authorization_code";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var token = json.access_token;
            var openId = json.openid;

            var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + token + "&openid=" + openId + "&lang=zh_CN";
            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.send(body);
                }else{
                    var result = {
                        err: -1
                    }
                    return res.send(result);
                }
            });
        }else{
            console.log(error);
            callback(error);
        }
    });
});

module.exports = router;
