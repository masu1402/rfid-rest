/**
 * Competitor.js
 * Author: Mattias Sundling, masu1402@student.miun.se
 * Latest update: 2017-05-16
 * 
 * In this file there is defined a data model for competitors. The model is exp-
 * orted and can be instantiated in other files to call mongoose queries onto a
 * MongoDB database. Created as a proof of concept during the final independent 
 * project in Computer Science.
 */
 
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * competitorSchema
 * 
 * Defines how the Competitor Model/Document should look and what data 
 * it can contain.
 */
var competitorSchema = new Schema({
    created: { type: Date, default: Date.now },
    rfid: { type: String, maxlength: 50, unique: true, sparse: true },
    name: { type: String, maxlength: 70 },
    nickname: { type: String, maxlength: 50 },
    company: { type: String, maxlength: 50 },
    sponsors: [ { type: String, maxlength: 50 } ],
    races: [ { type: Schema.Types.ObjectId, ref: 'Race' } ],
    readings: [ {
        _id: { turnOn: false },
        race : { type: Schema.Types.ObjectId, ref: 'Race' },
        node : { type: Number },
        time : { type: Date }
    } ]
});

var Competitor = mongoose.model('Competitor', competitorSchema);
module.exports = Competitor;