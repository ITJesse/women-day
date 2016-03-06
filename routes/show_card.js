var express = require('express');
var router = express.Router();

var card = require('../configs/mongodb').card;

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.query.cardId && /\d+/.test(req.query.cardId)) {
        var cardId = req.query.cardId;
        card.findOne({
            _id: cardId
        }, 'from to content flowerId', function(err, row) {
            if (err) {
                console.error(err);
                var result = {
                    err: -1
                }
                return res.send(result);
            } else {
                console.log(row);
                console.log("Get card info by id: " + cardId);
                return res.render('show_card', {
                    title: row.from + "送给你一份祝福",
                    fromName: row.from,
                    toName: row.to,
                    content: row.content,
                    flowerId: row.flowerId
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
