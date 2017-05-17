/**
 * Race.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-16
 * 
 * In this file there is defined a data model for races. The model is exp-
 * orted and can be instantiated in other files to call mongoose queries onto a
 * MongoDB database. Created as a proof of concept during the final independent 
 * project in Computer Science.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * raceSchema
 * 
 * Defines how the Race Model/Document should look and what data it can contain.
 */
var raceSchema = new Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, maxlength: 70, required: true },
    date: { type: Date },
    length: { type: Number, required: true},
    start: { type: Date, required: true },
    finish: { type: Date },
    competitors: [ { type: Schema.Types.ObjectId, ref: 'Competitor' } ],
    
})

var Race = mongoose.model('Race', raceSchema);
module.exports = Race;