var express = require('express');
var router = express.Router({mergeParams: true});
var Race = require("/home/ubuntu/workspace/api/models/Race");
var Competitor = require("/home/ubuntu/workspace/api/models/Competitor");

// middleware ======================================================= middleware
router.use(function timeLog(req, res, next) {
    console.log('..calling /races/:_id/competitors/:rfid/readings: ', Date.now())
    next()
})

router.get('/', function(req, res) {
    Race.findOne({
        _id: req.params._id,
        competitors: {
            "$elemMatch": {
                "$eq": req.params.rfid
            }
        }
    },
    function(err, race) {
        if (err) {
            res.json(err);
        }
        else if (race == null) {
            res.sendStatus(404);
        }
        else {
            
        }
    });
    
})

router.patch('/:nid', function(req, res) {
    Race.findOne({
            _id: req.params._id,
            competitors: {
                "$elemMatch": {
                    "$eq": req.params.rfid
                }
            }
        },
        function(err, race) {
            if (err) {
                res.json(err);
            }
            else if (race == null) {
                console.log("no races")
                res.sendStatus(404);
            }
            else {
                Competitor.findOneAndUpdate({
                    _id: req.params.rfid
                }, {
                    races : {
                        "$push": {
                            readings: {
                                node: req.params.nid,
                                reading: req.query.reading
                            }
                        } }
                }, function(err, competitor) {
                    if (err) {
                        res.json(err);
                    }
                    else if (competitor == null) {
                        res.sendStatus(404);
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
            }
        }
    );
})

module.exports = router;