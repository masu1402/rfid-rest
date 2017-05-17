/**
 * competitors.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-17
 * 
 * In this file there is defined RESTful routes for the databse objects 
 * races and competitors. Route is /api/races/:_id/competitors/ and is made to 
 * enable read operations of competitors depending on race, and to add or 
 * remove competitors from races.
 */

var express = require('express');
var router = express.Router({ mergeParams: true });
var Race = require("/home/ubuntu/workspace/api/models/Race");
var Competitor = require("/home/ubuntu/workspace/api/models/Competitor");
// routes =============================================================== routes

/**
 * @api {get} ../api/races/:_id/competitors/ 
 * Read a list of competitors from a specified race
 * @apiName GetCompetitorsFromRace
 * @apiGroup Competitors in Race
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a JSON-Array with competitors that are signed up in
 * specified race
 * 
 * @apiUse GetCompetitorSuccess
 * @apiSuccessExample {JSON-array} Success:
 * HTTP/1.1 200 OK
[
  {
    "_id": "591a50f4e08aa61f8b6dafd6",
    "rfid": "d5:1f:ae:75",
    "name": "Martin Karttunen",
    "nickname": "Martkart",
    "company": "Mittuniversitetet",
    "__v": 0,
    "readings": [
      {
        "time": "2017-06-12T08:00:00.363Z",
        "node": 1,
        "race": "591a5133e08aa61f8b6dafd9"
      },
      {
        "time": "2017-06-12T08:15:13.363Z",
        "node": 2,
        "race": "591a5133e08aa61f8b6dafd9"
      }
    ],
    "races": [
      "591a5133e08aa61f8b6dafd9"
    ],
    "sponsors": [
      "Grönborg på Hörnet",
      "Miun Innovation"
    ],
    "created": "2017-05-16T01:08:04.925Z"
  },
  {
    "_id": "591a5103e08aa61f8b6dafd8",
    "rfid": "80:9b:6f:85",
    "name": "Jonathan Ellström",
    "__v": 0,
    "readings": [],
    "races": [
      "591a5133e08aa61f8b6dafd9"
    ],
    "sponsors": [],
    "created": "2017-05-16T01:08:19.434Z"
  }
]
 * @apiError (404 Not Found) {text/plain} RaceNotFound A race with 
 * <code>_id</code> was not found.
 * @apiErrorExample {JSON} Race Not Found:
 * HTTP/1.1 404 Not Found
 * {
 *      Race Not Found
 * }
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.get('/', function(req, res) {

    // find the race by unique identifier
    Race.findOne({
            _id: req.params._id
        },
        function(err, race) {
            if (err) {
                res.status(500).json(err);
            }
            else if (race == null) {
                res.status(404).send("Race Not Found");
            }
            else {
                // if there is no error and the race exists, find a list of its competitors
                Competitor.find({
                        _id: {
                            "$in": race.competitors
                        }
                    },
                    function(err, competitors) {
                        if (err) {
                            res.status(500).json(err);
                        }
                        else {
                            // return the list of competitors if no errors occurred
                            res.json(competitors);
                        }
                    });
            }
        });
})

/**
 * @api {get} ../api/races/:_id/competitors/:cid
 * Read a single competitor that is in a specified race
 * @apiName GetCompetitorFromRace
 * @apiGroup Competitors in Race
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a single competitor from a specified race
 * 
 * @apiParam {Schema.Types.ObjectId} _id Looks for a single race with unique identifier
 * from database.
 * @apiParam {Schema.Types.ObjectId} cid Looks for a single competitor with unique identifier
 * from database. Corresponds to a competitors _id.
 * 
 * @apiUse GetCompetitorSuccess
 * @apiSuccessExample {JSON} Success:
 * HTTP/1.1 200 OK
{
  "_id": "591a50f4e08aa61f8b6dafd6",
  "rfid": "d5:1f:ae:75",
  "name": "Martin Karttunen",
  "nickname": "Martkart",
  "company": "Mittuniversitetet",
  "__v": 0,
  "readings": [
    {
      "time": "2017-06-12T08:00:00.363Z",
      "node": 1,
      "race": "591a5133e08aa61f8b6dafd9"
    },
    {
      "time": "2017-06-12T08:15:13.363Z",
      "node": 2,
      "race": "591a5133e08aa61f8b6dafd9"
    }
  ],
  "races": [
    "591a5133e08aa61f8b6dafd9"
  ],
  "sponsors": [
    "Grönborg på Hörnet",
    "Miun Innovation"
  ],
  "created": "2017-05-16T01:08:04.925Z"
}
 * 
 * @apiError (404 Not Found) {text/plain} RaceNotFound A race with 
 * <code>_id</code> and signed up competitor was not found.
 * @apiErrorExample {JSON} Race Not found:
 * HTTP/1.1 404 Not Found
 * {
 *      Race (with competitor) Not Found
 * }
 * @apiError (404 Not Found) {text/plain} CompetitorNotFound A competitor with 
 * <code>cid</code> was not found.
 * @apiErrorExample {JSON} Competitor Not found:
 * HTTP/1.1 404 Not Found
 * {
 *      Competitor Not Found
 * }
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.get('/:cid', function(req, res) {

    // find a race by a unique identifier that has the competitor signed up
    Race.findOne({
            _id: req.params._id,
            competitors: req.params.cid
        },
        function(err, race) {
            if (err) {
                res.status(500).json(err);
            }
            else if (race == null) {
                res.status(404).send("Race (with competitor) Not found");
            }
            else {
                // if there is no error, find the information about the competitor
                Competitor.findOne({
                        _id: req.params.cid
                    },
                    function(err, competitor) {
                        if (err) {
                            res.status(500).json(err);
                        }
                        else if (competitor == null) {
                            res.status(404).send("Competitor Not found");
                        }
                        else {
                            res.json(competitor);
                        }
                    })

            }
        });
})

/**
 * @api {post} ../api/races/:_id/competitors/:cid
 * Add a competitor to a specified race
 * @apiName PostCompetitorToRace
 * @apiGroup Competitors in Race
 * @apiPermission Digest authentication
 * 
 * @apiDescription Adds a competitor to a races competitors reference and
 * competitors race references
 * 
 * @apiParam {Schema.Types.ObjectId} _id Looks for a single race with unique identifier
 * from database.
 * @apiParam {Schema.Types.ObjectId} cid Looks for a single competitor with unique identifier
 * from database. Corresponds to a competitors _id
 * 
 * @apiSuccessExample {text/plain} Success:
 * HTTP/1.1 200 OK
 * {
 *      OK
 * }
 * 
 * @apiError (404 Not Found) {text/plain} RaceNotFound A race with 
 * <code>_id</code> and signed up competitor was not found.
 * @apiErrorExample {JSON} Race Not found:
 * HTTP/1.1 404 Not Found
 * {
 *      Race Not Found
 * }
 * @apiError (404 Not Found) {text/plain} CompetitorNotFound A competitor with 
 * <code>cid</code> was not found.
 * @apiErrorExample {JSON} Competitor Not found:
 * HTTP/1.1 404 Not Found
 * {
 *      Competitor Not Found
 * }
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.post("/:cid", function(req, res) {
    //find the specified race by the unique identifier
    Race.findOneAndUpdate({
        _id: req.params._id
    }, {
        // adds competitor to reference list if competitor exists
        "$addToSet": {
            competitors: req.params.cid
        }

    }, function(err, race) {
        if (err) {
            res.status(500).json(err);
        }
        else if (race == null) {
            res.status(404).send("Race Not Found");
        }
        else {
            // find the competitor by the unique identifier
            Competitor.findOneAndUpdate({
                _id: req.params.cid
            }, {
                // adds race to reference list if race exists
                "$addToSet": {
                    races: req.params._id
                }

            }, function(err, competitor) {
                if (err) {
                    res.status(500).json(err);
                }
                else if (competitor == null) {
                    res.status(404).send("Competitor Not Found");
                }
                else {
                    res.sendStatus(200);
                }
            })

        }
    })
})

/**
 * @api {delete} ../api/races/:_id/competitors/:cid
 * Removes a competitor from a specified race
 * @apiName DeleteCompetitorFromRace
 * @apiGroup Competitors in Race
 * @apiPermission Digest authentication
 * 
 * @apiDescription Removes a competitor from a races competitors reference and
 * competitors race references
 * 
 * @apiParam {Schema.Types.ObjectId} _id Looks for a single race with unique identifier
 * from database.
 * @apiParam {Schema.Types.ObjectId} cid Looks for a single competitor with unique identifier
 * from database. Corresponds to a competitors _id
 * 
 * @apiSuccessExample {text/plain} Success:
 * HTTP/1.1 200 OK
 * {
 *      OK
 * }
 * 
 * @apiError (404 Not Found) {text/plain} RaceNotFound A race with 
 * <code>_id</code> and signed up competitor was not found.
 * @apiErrorExample {JSON} Race Not found:
 * HTTP/1.1 404 Not Found
 * {
 *      Race Not Found
 * }
 * @apiError (404 Not Found) {text/plain} CompetitorNotFound A competitor with 
 * <code>cid</code> was not found.
 * @apiErrorExample {JSON} Competitor Not found:
 * HTTP/1.1 404 Not Found
 * {
 *      Competitor Not Found
 * }
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.delete('/:cid', function(req, res) {
    // finds race with unique identifier
    Race.findOneAndUpdate({
            _id: req.params._id
        }, {
            // removes competitor from races competitors reference if one exists
            "$pull": {
                competitors: req.params.cid
            }

        },
        function(err, race) {
            if (err) {
                res.status(500).json(err);
            }
            else if (race == null) {
                res.status(404).send("Race Not found");
            }
            else {
                // finds competitor with unique identifier
                Competitor.findOneAndUpdate({
                    _id: req.params.cid
                }, {
                    // removes race from competitors races reference if one exists
                    "$pull": {
                        races: req.params._id
                    }
                }, function(err, competitor) {
                    if (err) {
                        res.json(err);
                    }
                    else if (competitor == null) {
                        res.status(404).send("Competitor Not found");
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
            }
        });
})

module.exports = router;