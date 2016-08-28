var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/product', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
	helpers.processService(res, function(db){
		
		switch (req.query.query) {
			
			// TODO validate input params presence and format
			
			case "by_radius":
				db.collection("shops").find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ Number(req.query.long), Number(req.query.lat) ] }, $maxDistance: 1000 * Number(req.query.radiusKm) } } }).toArray(function(err, docs){
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
