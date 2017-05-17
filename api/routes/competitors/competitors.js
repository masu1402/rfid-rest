/**
 * competitors.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-17
 * 
 * In this file there is defined a RESTful routes for the databse object competitors.
 * Route is /api/competitors/ and is made to enable CRUD-operations like
 * Create, Read, Update and Delete.
 */

var express = require('express')
var router = express.Router()
var Competitor = require("/home/ubuntu/workspace/api/models/Competitor");
// routes =============================================================== routes
  
/**
 * @api {get} ../api/competitors/ Read a list of competitors
 * @apiName GetCompetitors
 * @apiGroup Competitors
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a JSON-Array with competitors
 * 
 * @apiUse GetCompetitorSuccess
 * @apiSuccessExample {JSON-array} Success-Response:
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
    "_id": "591a50fae08aa61f8b6dafd7",
    "name": "Mats Sundhagen",
    "company": "Mittuniversitetet",
    "__v": 0,
    "readings": [],
    "races": [],
    "sponsors": [
      "Grönborg på Hörnet",
      "Miun Innovation"
    ],
    "created": "2017-05-16T01:08:10.954Z"
  },
  {
    "_id": "591a5103e08aa61f8b6dafd8",
    "rfid": "80:9b:6f:85",
    "name": "Jonathan Ellström",
    "__v": 0,
    "readings": [],
    "races": [],
    "sponsors": [],
    "created": "2017-05-16T01:08:19.434Z"
  }
]
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.get('/', function(req, res) {

    Competitor.find( function(err, competitors) {
        if (err) res.status(500).json(err);
        res.json(competitors);
    });
})

/**
 * @api {get} ../api/competitors/:_id Read a single competitor
 * @apiName GetCompetitor
 * @apiGroup Competitors
 * @apiPermission Digest authentication
 * 
 * @apiDescription Returns a single competitor
 * 
 * @apiParam {Schema.Types.ObjectId} _id Looks for a single competitor with unique identifier
 * from database.
 * 
 * @apiUse GetCompetitorSuccess
 * @apiSuccessExample {JSON} Success-Response:
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
 * @apiError (404 Not Found) {text/plain} NotFound A competitor with 
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

    Competitor.findOne({
            _id: req.params._id
        },
        function(err, competitor) {
           if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null) {
                res.sendStatus(404);
            }
            else {
                // else return the list
                res.json(competitor);
            }
        }
    );
})

/**
 * @api {post} ../api/competitors/ Create a new competitor
 * @apiName PostCompetitor
 * @apiGroup Competitors
 * @apiPermission Digest authentication
 * 
 * @apiDescription Creates a new competitor
 * 
 * @apiParam {String{..50}} [rfid] Competitors unique identifier 
 * from RFID-device
 * @apiParam {String{..70}} name Fullname of Competitor.
 * @apiParam {String{..50}} [nickname] Nickname of Competitor.
 * @apiParam {String{..50}} [company] Competitors company.
 * @apiParam {String{..50}} [sponsors] Competitors sponsors.
 * 
 * @apiSuccess (201 Created) {text/plain} Created A new competitor was created.
 * A redirections header is sent back so that the client can find it.
 * @apiSuccessExample {text/plain} Success-Response:
 * HTTP/1.1 201 Created
 * Created. Redirecting to /api/competitors/591a50fae08aa61f8b6dafd7
 * 
 * @apiError (409 Conflict) {JSON} Conflict A competitor with <code>rfid</code> 
 * already exists. Remove rfid from existing user or use another identifier.
 * @apiErrorExample {JSON} Error-Response:
 * HTTP/1.1 409 Conflict
{
  "code": 11000,
  "index": 0,
  "errmsg": "E11000 duplicate key error collection: bor.competitors index: rfid_1 dup key: { : \"d5:1f:ae:75\" }",
  "op": {
    "rfid": "d5:1f:ae:75",
    "name": "Martin Karttunen",
    "nickname": "Martkart",
    "company": "Mittuniversitetet",
    "_id": "591a5cd77a120126f46ba83f",
    "readings": [],
    "races": [],
    "sponsors": [
      "Grönborg på Hörnet",
      "Miun Innovation"
    ],
    "created": "2017-05-16T01:58:47.789Z",
    "__v": 0
  }
}
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.post('/', function(req, res) {
    // create and save a new competitor
    new Competitor({
        rfid: req.query.rfid,
        name: req.query.name,
        nickname: req.query.nickname,
        company: req.query.company,
        sponsors: req.query.sponsors
    }).save(function(err, competitor) {

        // if there is a conflict
        if (err && err.code == "11000") {
            res.status(409).json(err);
        }
        else if (err){
            res.status(500).json(err);
        }
        else {
            // otherwise set status to 201 and send location header
            res.redirect(201, "/api/competitors/" + competitor._id);
        }
    });
})

/**
 * @api {put} ../api/competitors/:_id Update existing or Create a new competitor
 * @apiName putCompetitor
 * @apiGroup Competitors
 * @apiPermission Digest authentication
 * 
 * @apiDescription Updates an exisiting competitor. Creates one if none 
 * is found.
 * 
 * @apiParam {String{..50}} [rfid] Competitors unique identifier 
 * from RFID-device
 * @apiParam {String{..70}} name Fullname of Competitor.
 * @apiParam {String{..50}} [nickname] Nickname of Competitor.
 * @apiParam {String{..50}} [company] Competitors company.
 * @apiParam {String{..50}} [sponsors] Competitors sponsors.
 * 
 * @apiSuccess (201 Created) {text/plain} Created A new competitor was created.
 * A redirections header is sent back so that the client can find it.
 * @apiSuccessExample {text/plain} Success-Response:
 * HTTP/1.1 201 Created
 * Created. Redirecting to /api/competitors/591a50fae08aa61f8b6dafd7
 * 
 * @apiSuccess (204 No Content) {text/plain} NoContent A competitor with 
 * <code>_id</code> was updated.
 * @apiSuccessExample {String} Success-Response:
 * HTTP/1.1 204 No Content
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.put('/:_id', function(req, res) {
    
    Competitor.findOneAndUpdate({
            _id: req.params._id
        },
        req.query,
        function(err, competitor) {
            if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null)
                new Competitor({
                    rfid : req.query.rfid,
                    name: req.query.name,
                    nickname: req.query.nickname,
                    company: req.query.company,
                    sponsors: req.query.sponsors
                }).save(function(err, competitor) {
                    // if there is a conflict
                    if (err && err.code == "11000") {
                        res.status(409).json(err);
                    } else if (err){
                        res.status(500).json(err);
                    } else {
                        // otherwise set status to 201 and send location header
                        res.redirect(201, "/api/competitors/" + competitor._id);
                    }
                });
            else {
                res.sendStatus(204);
            }
        }
    );
})

/**
 * @api {patch} ../api/competitors/:_id Modify an existing competitor
 * @apiName patchCompetitor
 * @apiGroup Competitors
 * @apiPermission Digest authentication
 * 
 * @apiDescription Modifies an exisiting Competitor
 * 
 * @apiParam {String{..50}} [rfid] Competitors unique identifier from RFID-device
 * @apiParam {String{..70}} name Name of Competitor.
 * @apiParam {String{..50}} [nickname] Nickname of Competitor.
 * @apiParam {String{..50}} [company] Competitor's company.
 * @apiParam {String{..50}} [sponsors] Competitor's sponsors.
 * 
 * @apiSuccess (204 No Content) {String} NoContent Competitor with 
 * <code>_id</code> was updated.
 * @apiSuccessExample {text/plain} No Content:
 * HTTP/1.1 204 No Content
 * 
 * @apiError (404 Not Found) {text/plain} NotFound The Competitor with 
 * <code>_id</code> was not found.
 * @apiErrorExample {text/plain} 404 Not Found:
 * HTTP/1.1 404 Not Found
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.patch('/:_id', function(req, res) {
    Competitor.findOneAndUpdate({
            _id: req.params._id
        },
        req.query,
        function(err, competitor) {
            if (err) {
                res.status(500).json(err);
            }
            else if (competitor == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(204);
            }
        }
    );
})

/**
 * @api {delete} ../api/competitors/:_id Delete an existing competitor
 * @apiName deleteCompetitor
 * @apiGroup Competitors
 * @apiPermission Digest authentication
 * 
 * @apiDescription Deletes an exisiting Competitor
 * 
 * @apiParam {ObjectId} _id The competitors unique identifier
 * 
 * @apiSuccess (200 Success) {text/plain} Success Competitor with 
 * <code>_id</code> was deleted.
 * @apiSuccessExample {String} Success:
 * HTTP/1.1 200 Success
 * 
 * @apiError (Error 404) {text/plain} NotFound The competitor with 
 * <code>_id</code> was not found.
 * @apiErrorExample {text/plain} Not Found:
 * HTTP/1.1 404 Not Found
 * 
 * @apiError (500 Internal Server Error) {JSON} InternalServerError The server 
 * was unable to process the request by some reason. Returns the error if possible.
 */
router.delete('/:_id', function(req, res) {
    Competitor.findOneAndRemove({
            _id: req.params._id
        },
        function(err, competitor) {
            if (err) {
                res.json(err);
            }
            else if (competitor == null) {
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
 * @apiDefine GetCompetitorSuccess
 * @apiSuccess {Schema.Types.ObjectId} _id Unique identifier of database object.
 * @apiSuccess {Date} created Date of creation of Competitor.
 * @apiSuccess {String{..50}} rfid Unique identifier from assigned RFID-device
 * @apiSuccess {String{..70}} name Fullname of Competitor.
 * @apiSuccess {String{..50}} nickname Nickname of Competitor.
 * @apiSuccess {String{..50}} company Competitors company.
 * @apiSuccess {String{..50}} sponsors Competitors sponsors.
 * @apiSuccess {JSON-array} races An array of MongoDB ObjectID references to 
 * races that user is signed up to.
 * @apiSuccess {JSON-array} readings An array of readings, posted to database
 * to record time (Date), node (physical identifier) and race (reference). Can 
 * only be posted to if user is signed onto race. See 
 * ../api/races/:_id/competitors route
 */