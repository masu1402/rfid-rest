/**
 * readings.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-17
 * 
 * In this file there is defined RESTful routes for the databse objects 
 * races and competitors to be able to create readings made from rfid devices.
 * Route is /api/races/:_id/competitors/:rfid/readings/ and operations are
 * reading lists of readings, creating readings and removing readings.
 */

var express = require('express');
var router = express.Router({ mergeParams: true });
var Race = require("/home/ubuntu/workspace/api/models/Race");
var Competitor = require("/home/ubuntu/workspace/api/models/Competitor");
// routes =============================================================== routes

/**
 * @api {get} ../api/races/:_id/competitors/:rfid/readings/
 * Read a list of readings from a specified race and specified competitor
 * @apiName GetReadingsFromRaceFromCompetitor
 * @apiGroup Readings
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a JSON-Array with readings with time, race reference
 * and node identifiers.
 * 
 * @apiSuccess {Number} node The node identifier.
 * @apiSuccess {Date} time The read time that user tagged onto node.
 * @apiSuccess {Schema.Types.ObjectId} race Reference to in what race the readings was done.
 * @apiSuccessExample {JSON-array} Success:
 * HTTP/1.1 200 OK
[
  {
    "time": "2017-06-12T08:00:00.363Z",
    "node": 1,
    "race": "591a5133e08aa61f8b6dafd9"
  },
  {
    "time": "2017-06-12T08:03:18.363Z",
    "node": 2,
    "race": "591a5133e08aa61f8b6dafd9"
  }
]
 * @apiError (404 Not Found) {text/plain} NotFound A competitor or race 
 * was not found.
 * @apiErrorExample {text/plain} Not Found:
 * HTTP/1.1 404 Not Found
 * {
 *      Not Found
 * }
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.get('/', function(req, res) {
    // find a competitor with unique identifier from rfid device that is signed up to race
    Competitor.findOne({
            rfid: req.params.rfid,
            "races": req.params._id
        },
        function(err, competitor) {
            if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null) {
                res.sendStatus(404);
            }
            else {
                // filter the response to only show readings from specified race
                res.json(competitor.readings.filter(function(object) {
                    return object.race == req.params._id
                }));
            }
        });
})

/**
 * @api {get} ../api/races/:_id/competitors/:rfid/readings/:nid
 * Read a list of readings from a specified race and specified competitor with specified node identifier
 * @apiName GetReadingFromRaceFromCompetitor
 * @apiGroup Readings
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a JSON-Array with readings with time, race reference
 * and node identifiers.
 * 
 * @apiSuccess {Number} node The node identifier.
 * @apiSuccess {Date} time The read time that user tagged onto node.
 * @apiSuccess {Schema.Types.ObjectId} race Reference to in what race the readings was done.
 * @apiSuccessExample {JSON-array} Success:
 * HTTP/1.1 200 OK
[
  {
    "time": "2017-06-12T08:00:00.363Z",
    "node": 1,
    "race": "591a5133e08aa61f8b6dafd9"
  },
  {
    "time": "2017-06-12T08:03:18.363Z",
    "node": 1,
    "race": "591a5133e08aa61f8b6dafd9"
  }
]
 * @apiError (404 Not Found) {text/plain} NotFound A competior or race 
 * was not found.
 * @apiErrorExample {JSON} Not Found:
 * HTTP/1.1 404 Not Found
 * {
 *      Not Found
 * }
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.get('/:nid', function(req, res) {
    // find a competitor with unique identifier from rfid device that is signed up to race
    Competitor.findOne({
            rfid: req.params.rfid,
            "races": req.params._id
        },
        function(err, competitor) {
            if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null) {
                res.sendStatus(404);
            }
            else {
                // filter the response to only show readings from specified race with specified node identifier
                res.json(competitor.readings.filter(function(object) {
                    return ((object.race == req.params._id) &&
                        (object.node == req.params.nid))
                }));
            }
        });
})

/**
 * @api {post} ../api/races/:_id/competitors/:rfid/readings/:nid
 * Add new reading to specified competitor in specified race
 * @apiName PostReadingsToCompetitorToRace
 * @apiGroup Readings
 * @apiPermission Digest authentication
 * 
 * @apiDescription Adds new reading with time, race reference
 * and node identifier to competitor in race.
 * 
 * @apiSuccessExample {text/plain} Created:
 * HTTP/1.1 201 Created
{
    Created
}
 * @apiError (404 Not Found) {text/plain} NotFound A competitor or race 
 * was not found.
 * @apiErrorExample {text/plain} Not Found:
 * HTTP/1.1 404 Not Found
 * {
 *      Not Found
 * }
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.post('/:nid', function(req, res) {
    // find a competitor with unique identifier from rfid device that is signed up to race
    Competitor.findOneAndUpdate({
            rfid: req.params.rfid,
            "races": req.params._id
        }, {
            // adds new reading onto competitor
            "$push": {
                readings: {
                    race: req.params._id,
                    node: req.params.nid,
                    time: req.query.time
                }
            }
        },
        function(err, competitor) {
            if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(201);
            }
        });
})

/**
 * @api {delete} ../api/races/:_id/competitors/:rfid/readings/
 * Remove all readings from specified competitor in specified race
 * @apiName DeleteReadingsFromCompetitorInRace
 * @apiGroup Readings
 * @apiPermission Digest authentication
 * 
 * @apiDescription Removes all existing readings from competitor that is 
 * specified by the race identifier
 * 
 * @apiSuccessExample {text/plain} Success:
 * HTTP/1.1 200 Success
{
    OK
}
 * @apiError (404 Not Found) {text/plain} NotFound A competitor or race 
 * was not found.
 * @apiErrorExample {text/plain} Not Found:
 * HTTP/1.1 404 Not Found
 * {
 *      Not Found
 * }
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.delete('/', function(req, res) {
    // find a competitor with unique identifier from rfid device that is signed up to race
    Competitor.findOneAndUpdate({
            rfid: req.params.rfid,
            "races": req.params._id
        }, {
            // removes all readings with race identifier
            "$pull": {
                readings: {
                    race: req.params._id
                }
            }
        },
        function(err, competitor) {
            if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(200);
            }
        });
})

/**
 * @api {delete} ../api/races/:_id/competitors/:rfid/readings/:nid
 * Remove all readings from specified competitor in specified race with specified node identifier
 * @apiName RemoveReadingsFromCompetitorInRaceAndNode
 * @apiGroup Readings
 * @apiPermission Digest authentication
 * 
 * @apiDescription Removes all existing readings from competitor with that is 
 * specified by the race and node identifier
 * 
 * @apiSuccessExample {text/plain} Success:
 * HTTP/1.1 200 Success
{
    OK
}
 * @apiError (404 Not Found) {text/plain} NotFound A competitor or race 
 * was not found.
 * @apiErrorExample {text/plain} Not Found:
 * HTTP/1.1 404 Not Found
 * {
 *      Not Found
 * }
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.delete('/:nid', function(req, res) {
    // find a competitor with unique identifier from rfid device that is signed up to race
    Competitor.findOneAndUpdate({
            rfid: req.params.rfid,
            "races": req.params._id
        }, {
            // removes all readings with race and node identifier
            "$pull": {
                readings: {
                    race: req.params._id,
                    node: req.params.nid
                }
            }
        },
        function(err, competitor) {
            if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(200);
            }
        });
})

module.exports = router;