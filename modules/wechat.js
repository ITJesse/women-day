var express = require('express');
var router = express.Router();
var request = require('request');

var config = require('../configs/config');

function wechat(){
    this.accessToken = "";
    this.accessTokenUpdateTime = "";
    this.jsapiTicket = "";
    this.jsapiTicketUpdateTime = "";
}

module.exports = wechat;

wechat.prototype.updateAccessToken = function(callback) {
    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + config.wechat.appId + "&secret=" + config.wechat.appSecret;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var token = json.access_token;

            this.accessToken = token;
            this.accessTokenUpdateTime = new Date();
            callback(null, token);
        }else{
            console.log(error);
            callback(error);
        }
    });
}

wechat.prototype.getAccessToken = function(callback){
    var now = new Date();
    if(now - this.accessTokenUpdateTime > 7000 * 1000){
        this.updateAccessToken(function(err, token){
            if(err) return callback(err);
            return callback(null, token);
        });
    }else{
        return callback(null, this.accessToken);
    }
}

wechat.prototype.updateJsapiTicket = function(callback) {
    this.getAccessToken(function(err, token){
        if(err) return callback(err);
        var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + token + "&type=jsapi";
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                var token = json.ticket;

                this.jsapiTicket = token;
                this.jsapiTicketUpdateTime = new Date();
                callback(null, token);
            }else{
                console.log(error);
                callback(error);
            }
        });
    });
}

wechat.prototype.getJsapiTicket = function(callback){
    var now = new Date();
    if(now - this.jsapiTicketUpdateTime > 7000 * 1000){
        this.updateJsapiTicket(function(err, token){
            if(err) return callback(err);
            return callback(null, token);
        });
    }else{
        return callback(null, this.jsapiTicket);
    }
}
