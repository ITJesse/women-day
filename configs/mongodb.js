/*
 * Connect to MongoDB
 */

var config = require('./config');
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error);

if(config.mongodb.uri){
    mongoose.connect(config.mongodb.uri);
}else{
    mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database);
}

var cardSchema = new Schema({
    cardId: Schema.Types.ObjectId,
    from: String,
    to: String,
    flowerId: Number,
    content: String,
    addTime: {
        type: Date,
        default: Date.now
    }
});

var wechatSchema = new Schema({
    type: String,
    content: String,
    addTime: {
        type: Date,
        default: Date.now
    }
});

exports.card = mongoose.model('Card', cardSchema);
exports.wechat = mongoose.model('Wechat', wechatSchema);
