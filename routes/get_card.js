var express = require('express');
var router = express.Router();

var card = require('../modules/mongodb').card;

/* GET home page. */
router.get('/GetCard', function(req, res, next) {
    if (req.query.cardid && /\d+/.test(req.query.cardid)) {
        var cardId = req.query.cardid;
        card.findOne({
            cardId: cardId
        }, 'to, flowerId, content', function(err, row) {
            if (err) {
                console.error(err);
                var result = {
                    err: -1
                }
                return res.send(result);
            } else {
                console.log("Get card info by id: " + cardId);
                var result = {
                    err: null,
                    to: row.to,
                    floweId: row.flowerId,
                    content: row.content
                }
                return res.send(result);
            }
        });
    }
});

module.exports = router;
