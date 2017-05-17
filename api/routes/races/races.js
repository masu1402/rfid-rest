/**
 * races.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-17
 * 
 * In this file there is defined a RESTful routes for the databse object races.
 * Route is /api/races/ and is made to enable CRUD-operations like
 * Create, Read, Update and Delete.
 */

var express = require('express')
var router = express.Router()
var Race = require("/home/ubuntu/workspace/api/models/Race");
// routes =============================================================== routes

/**
 * @api {get} ../api/races/ Read a list of races
 * @apiName GetRaces
 * @apiGroup Races
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a JSON-Array with races
 * 
 * @apiUse GetRacesSuccess
 * @apiSuccessExample {JSON-array} Successful response:
 * HTTP/1.1 200 OK
[
  {
    "_id": "591a5133e08aa61f8b6dafd9",
    "name": "Bergeforsen Obstacle Race",
    "length": 5,
    "start": "2017-06-12T08:00:00.363Z",
    "__v": 0,
    "competitors": [
      "591a50f4e08aa61f8b6dafd6"
    ],
    "created": "2017-05-16T01:09:07.557Z"
  },
  {
    "_id": "591a5137e08aa61f8b6dafda",
    "name": "Kravallen",
    "length": 3,
    "start": "2017-05-09T12:13:00.811Z",
    "__v": 0,
    "competitors": [],
    "created": "2017-05-16T01:09:11.193Z"
  }
]
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.get('/', function(req, res) {

    Race.find(function(err, races) {
        if (err) res.status(500).json(err);
        res.json(races);
    });
})

/**
 * @api {get} ../api/races/:_id Read a single race
 * @apiName GetRace
 * @apiGroup Races
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a JSON object with specified race
 * 
 * @apiUse GetRacesSuccess
 * @apiSuccessExample {JSON-array} Successful response:
 * HTTP/1.1 200 OK
  {
    "_id": "591a5133e08aa61f8b6dafd9",
    "name": "Bergeforsen Obstacle Race",
    "length": 5,
    "start": "2017-06-12T08:00:00.363Z",
    "__v": 0,
    "competitors": [
      "591a50f4e08aa61f8b6dafd6"
    ],
    "created": "2017-05-16T01:09:07.557Z"
  }
 * 
 * @apiError (404 Not Found) {text/plain} NotFound A race with 
 * <code>_id</code> was not found.
 * @apiErrorExample {JSON} Error-Not found:
 * HTTP/1.1 404 Not Found
 * {
 *      Not Found
 * }
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.get('/:_id', function(req, res) {

    Race.findOne({
            _id: req.params._id
        },
        function(err, race){
            if (err){
                res.status(500).json(err);
            }
            else if (race == null) {
                res.sendStatus(404);
            }
            else {
                res.json(race);
            }
        }
    );
})

/**
 * @api {post} ../api/races/ Create a new race
 * @apiName PostRace
 * @apiGroup Races
 * @apiPermission Digest authentication
 * 
 * @apiDescription Creates a new race
 * 
 * @apiParam {String{..70}} name The name of the race.
 * @apiParam {Date} [date] The date of the race.
 * @apiParam {Number} length The length of the race in nodes.
 * @apiParam {Date} start The time the race starts.
 * @apiParam {Date} [finish] The time the race ends.
 * @apiParam {JSON-array} [competitors] A list of ObjectId references to 
 * competitors that are signed up to the race.
 * 
 * @apiSuccess (201 Created) {text/plain} Created A new race was created.
 * A redirections header is sent back so that the client can find it.
 * @apiSuccessExample {text/plain} Successful response:
 * HTTP/1.1 201 Created
 * Created. Redirecting to /api/races/591a50fae08aa61f8b6dafd7
 *
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.post('/', function(req, res) {
    // create a new race model and save to database
    new Race({
        name: req.query.name,
        date: req.query.date,
        length: req.query.length,
        start: req.query.start,
        finish: req.query.finish,
        competitors: req.query.competitors
    }).save(function(err, result) {

        if (err) {
            res.status(500).json(err);
        }
        else {
            // if no errors set status to 201 and send location header
            res.redirect(201, "/api/races/" + result._id);
        }
    });
})

/**
 * @api {put} ../api/races/:_id Update existing or Create a new race
 * @apiName PutRace
 * @apiGroup Races
 * @apiPermission Digest authentication
 * 
 * @apiDescription Updates an exisiting race. Creates one if none 
 * is found.
 * 
 * @apiParam {String{..70}} name The name of the race.
 * @apiParam {Date} [date] The date of the race.
 * @apiParam {Number} length The length of the race in nodes.
 * @apiParam {Date} start The time the race starts.
 * @apiParam {Date} [finish] The time the race ends.
 * @apiParam {JSON-array} [competitors] A list of ObjectId references to 
 * competitors that are signed up to the race.
 * 
 * @apiSuccess (201 Created) {text/plain} Created A new race was created.
 * A redirections header is sent back so that the client can find it.
 * @apiSuccessExample {text/plain} Created:
 * HTTP/1.1 201 Created
 * Created. Redirecting to /api/races/591a50fae08aa61f8b6dafd7
 * 
 * @apiSuccess (204 No Content) {text/plain} NoContent A competitor with 
 * <code>_id</code> was updated.
 * @apiSuccessExample {String} No Content:
 * HTTP/1.1 204 No Content
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.put('/:_id', function(req, res) {
    
    Race.findOneAndUpdate({
            _id: req.params._id
        },
        req.query,
        function(err, race) {
            if (err) {
                res.status(500).json(err);
            }
            else if (race == null)
                new Race({
                    name: req.query.name,
                    date: req.query.date,
                    length: req.query.length,
                    start: req.query.start,
                    finish: req.query.finish,
                    competitors: req.query.competitors
                }).save(function(err, race) {
                    // if there is a conflict
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        // otherwise set status to 201 and send location header
                        res.redirect(201, "/api/races/" + race._id);
                    }
                });
            else {
                res.sendStatus(204);
            }
        }
    );
})

/**
 * @api {patch} ../api/races/:_id Modify an existing competitor
 * @apiName PatchRace
 * @apiGroup Races
 * @apiPermission Digest authentication
 * 
 * @apiDescription Modifies an exisiting race
 * 
 * @apiParam {String{..70}} name The name of the race.
 * @apiParam {Date} [date] The date of the race.
 * @apiParam {Number} length The length of the race in nodes.
 * @apiParam {Date} start The time the race starts.
 * @apiParam {Date} [finish] The time the race ends.
 * @apiParam {JSON-array} [competitors] A list of ObjectId references to 
 * competitors that are signed up to the race.
 * 
 * @apiSuccess (204 No Content) {String} NoContent The race with 
 * <code>_id</code> was updated.
 * @apiSuccessExample {text/plain} No Content:
 * HTTP/1.1 204 No Content
 * 
 * @apiError (404 Not Found) {text/plain} NotFound The race with 
 * <code>_id</code> was not found.
 * @apiErrorExample {text/plain} 404 Not Found:
 * HTTP/1.1 404 Not Found
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.patch('/:_id', function(req, res) {
    Race.findOneAndUpdate({
            _id: req.params._id
        },
        req.query,
        function(err, race) {
            if (err) {
                res.status(500).json(err);
            }
            else if (race == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(204);
            }
        }
    );
})

/**
 * @api {delete} ../api/races/:_id Delete an existing race
 * @apiName DeleteRace
 * @apiGroup Races
 * @apiPermission Digest authentication
 * 
 * @apiDescription Deletes an exisiting race
 * 
 * @apiParam {ObjectId} _id The races unique identifier.
 * 
 * @apiSuccess (200 Success) {text/plain} Success Race with 
 * <code>_id</code> was deleted.
 * @apiSuccessExample {String} Success:
 * HTTP/1.1 200 Success
 * 
 * @apiError (Error 404) {text/plain} NotFound The race with 
 * <code>_id</code> was not found.
 * @apiErrorExample {text/plain} Not Found:
 * HTTP/1.1 404 Not Found
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.delete('/:_id', function(req, res) {
    Race.findOneAndRemove({
            _id: req.params._id
        },
        function(err, race) {
            if (err) {
                res.status(500).json(err);
            }
            else if (race == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(200);
            }
        }
    );
})

module.exports = router;

// apiDoc definitions ======================================= apiDoc definitions

/**
 * @apiDefine GetRacesSuccess
 * @apiSuccess {Schema.Types.ObjectId} _id Unique identifier of database object.
 * @apiSuccess {Date} created Date of creation of Race.
 * @apiSuccess {String{..70}} name The name of the Race.
 * @apiSuccess {Date} date The date of the Race.
 * @apiSuccess {Number} length The length of the race in nodes.
 * @apiSuccess {Date} start The time the race starts.
 * @apiSuccess {Date} finish The time the race ends.
 * @apiSuccess {JSON-array} competitors A list of ObjectId references to 
 * competitors that are signed up to the race.
 */