var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/product', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
	helpers.processService(res, function(db){
		
		var filter = { exclusive: true };
		if (req.query.criteria === "all") {
			delete filter.exclusive;
		}
			
		switch (req.query.query) {
			
			// TODO validate input params presence and format
			
			case "by_radius":
				filter.location = { $nearSphere: { $geometry: { type: "Point", coordinates: [ Number(req.query.long), Number(req.query.lat) ] }, $maxDistance: 1000 * Number(req.query.radiusKm) } };
				db.collection("shops").find(filter).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;
				
			case "by_city":
				filter.city = new mongo.ObjectID(req.query.id_city);
				db.collection("shops").find(filter).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;
				
			case "by_country":
				filter.country = new mongo.ObjectID(req.query.id_country);
				db.collection("shops").find(filter).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;
				
			case "by_state":
				filter.state = new mongo.ObjectID(req.query.id_state);
				db.collection("shops").find(filter).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;
				
			case "by_continent":
				filter.continent = new mongo.ObjectID(req.query.id_continent);
				db.collection("shops").find(filter).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;
				
			case "by_id":
				db.collection("shops").find({ _id: new mongo.ObjectID(req.query.id_shop) }).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;
				
			default:
				helpers.replyError(res);
				helpers.finishService(db);
				
		}
		
	});
});

module.exports = router;
