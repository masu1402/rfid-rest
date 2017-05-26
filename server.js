/**
 * server.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-17
 * 
 * This file is the main file for running the Node.js Express server that is a
 * proposed solution for a sports event where all data of the race, its competitors
 * and readings made from nodes out in the field can be modified or fetched
 * using a RESTful api that is declared as routes in the routes section of this file.
 * 
 * Created as a proof of concept during the final independent project in Computer Science.
 */

// node_modules =================================================== node_modules
var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var morgan = require("morgan");
var auth =  require("http-auth");
var mongoose = require('mongoose');

// require external files =============================== require external files
var config = require("./serverConfig");
var races = require("./api/routes/races/races");
var competitors = require("./api/routes/competitors/competitors");
var racesCompetitors = require("./api/routes/races/competitors");
var readings = require("./api/routes/races/readings");


// database connection ===================================== database connection
mongoose.connect(config.database.host + "/" + config.database.db,
                config.database.options );

mongoose.connection.on("error", function(err){
    console.error(err);
})

// api authentication setup =========================== api authentication setup
var digest = auth.digest(config.digest);

// middleware ======================================================= middleware
app.use(morgan('dev')); // remove when in production
app.use(bodyparser.json());
app.use("/api", auth.connect(digest));


// routes =============================================================== routes
app.use("/api", express.static(__dirname + '/api/doc'));
app.use("/api/races", races);
app.use("/api/competitors", competitors);
app.use("/api/races/:_id/competitors", racesCompetitors);
app.use("/api/races/:_id/competitors/:rfid/readings", readings);

// listener (start server with node server.js) ======================== listener
app.listen(config.server.port, config.server.host, function() {
    console.log("server listening on port " + config.server.port);
})

db.createUser({
    user: "superuser",
    pwd: "anypwd",
    roles: [ { role: "root", db: "admin" } ]
});

use bor;
db.createUser({
    user: "node",
    pwd: "anypwd",
    roles: [ { role: "readWrite", db: "bor" } ]
});

/* authenticate user */
mongo -u "sudo" -p "bor" --authenticationDatabase "admin”