var express = require('express')
var router = express.Router({mergeParams: true})
var Competitor = require("/home/ubuntu/workspace/api/models/Competitor")

// middleware ======================================================= middleware
router.use(function timeLog(req, res, next) {
    console.log('..calling /node: ', Date.now())
    next()
})

// routes =============================================================== routes

router.get('/', function(req, res) {

    Competitor.findOne({
            uid: req.params.uid
        },
        function(err, competitor) {
            if (err) return err;

            if (competitor == null) {
                res.status(404).json({
                    error: "404 - Not found"
                });
            }
            else {
                // else return the list
                res.json(competitor.timing);
            }
        });
})

router.patch('/:id', function(req, res) {
    
    var reading = {
        node : req.params.id,
        time : req.body.time
    }
    
    Competitor.findOneAndUpdate({
            uid: req.params.uid
        },
        {
            "$push": { "timing.checkpoints": reading }
            
        },
        function(err, competitor) {
            if (err) {
                res.json(err);
            }
            else if (competitor == null) {
                res.status(404).json({
                    error: "404 - Not found"
                });
            }
            else {
                console.log(competitor);
                res.sendStatus(204);
            }
        }
    );
})

module.exports = router;