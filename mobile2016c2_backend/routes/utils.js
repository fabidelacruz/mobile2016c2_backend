var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/locations', function(req, res, next) {
	helpers.processService(res, function(db){
		
		switch (req.query.query) {
			
			// TODO validate input params presence and format
			
			case "get_continents":
				db.collection("continents_and_countries").find({},{name:1}).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
				});
				break;
				
			case "get_countries":
				db.collection("continents_and_countries").find({_id:new mongo.ObjectID(req.query.id_continent)},{_id:0,countries:1}).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(helpers.emptyArrayOrProperty(docs, "countries"));
					}
				});
				break;
				
			case "get_states":
				db.collection("countries_and_states").find({_id:new mongo.ObjectID(req.query.id_country)},{_id:0,states:1}).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(helpers.emptyArrayOrProperty(docs, "states"));
					}
				});
				break;
				
			case "get_cities":
				db.collection("states_and_cities").find({_id:new mongo.ObjectID(req.query.id_state)},{_id:0,cities:1}).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(helpers.emptyArrayOrProperty(docs, "cities"));
					}
				});
				break;
				
			default:
				helpers.replyError(res);
				
		}
		
	});
});

module.exports = router;
