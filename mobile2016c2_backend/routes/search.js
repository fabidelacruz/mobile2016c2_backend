var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/product', function(req, res, next) {
	helpers.processService(res, function(db){

		switch (req.query.query) {

			// TODO validate input params presence and format

			case "by_name":
				db.collection("products").find({ name: { $regex: '.*' + req.query.name + '.*', $options: 'i' } }).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;

			case "all":
				db.collection("products").find().toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;

			case "by_barcode":
				db.collection("products").find({ _id: req.query.barcode }).toArray(function(err, docs){
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

router.get('/shop', function(req, res, next) {
	helpers.processService(res, function(db){

		var filter = { exclusive: true };
		if (req.query.criteria === "all") {
			delete filter.exclusive;
		}

		switch (req.query.query) {

			// TODO validate input params presence and format

			case "by_name":
				db.collection("shops").find({ name: { $regex: '.*' + req.query.name + '.*', $options: 'i' } },{products:0}).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;

			case "all":
				db.collection("shops").find({},{products:0}).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;

			case "by_radius":
				filter.location = { $nearSphere: { $geometry: { type: "Point", coordinates: [ Number(req.query.long), Number(req.query.lat) ] }, $maxDistance: 1000 * Number(req.query.radiusKm) } };
				db.collection("shops").find(filter, {products:0}).toArray(function(err, docs){
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
				db.collection("shops").find(filter, {products:0}).toArray(function(err, docs){
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
				db.collection("shops").find(filter, {products:0}).toArray(function(err, docs){
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
				db.collection("shops").find(filter, {products:0}).toArray(function(err, docs){
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
				db.collection("shops").find(filter, {products:0}).toArray(function(err, docs){
					if (err) {
						helpers.replyError(res);
					} else {
						res.json(docs);
					}
					helpers.finishService(db);
				});
				break;

			case "by_id":
				db.collection("shops").find({ _id: new mongo.ObjectID(req.query.id_shop) }, {products:0}).toArray(function(err, docs){
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
