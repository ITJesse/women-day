/*
 * Connect to MongoDB
 */

var config = require('./config');
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error);

if(config.mongodb.uri){
    mongoose.connect(uri);
}else{
    mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database);
}

var cardSchema = new Schema({
    cardId: Number,
    to: String,
    flowerId: Number,
    content: String,
    addTime: {
        type: Date,
        default: Date.now
    }
});

exports.card = mongoose.model('Card', cardSchema);
