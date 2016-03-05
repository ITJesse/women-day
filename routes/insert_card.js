var express = require('express');
var router = express.Router();

var card = require('../modules/mongodb').card;

/* GET home page. */
router.post('/InsertCard', function(req, res, next) {
    console.log(/\W{1-10}/.test(req.body.to));
    console.log(/\W{1-10}/.test(req.body.flowerId));
    console.log(/\W{1-10}/.test(req.body.content));
    if (req.body.to &&
        req.body.flowerId && /\d+/.test(req.body.flowerId) &&
        req.body.content
    ) {
        var to = req.body.to;
        var flowerid = req.body.flowerId;
        var content = req.body.content;

        var newCard = new card({
            to: req.body.to,
            flowerid: req.body.flowerId,
            content: req.body.content
        });

        newCard.save(function(err, data){
            if(err) {
                console.error(err);
                var result = {
                    err: -1
                }
                return res.send(result);
            }else{
                console.log("Insert new card");
                var result = {
                    err: null,
                    cardId: data._id
                }
                return res.send(result);
            }
        });
    }else{
        console.log("Bad input.");
        var result = {
            err: -1
        }
        return res.send(result);
    }
});

module.exports = router;
