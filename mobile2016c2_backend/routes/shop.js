var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/products', function(req, res, next) {
	helpers.processService(res, function(db){

		// TODO validate input params presence and format

		/*
		db.collection("shops").find({ _id: new mongo.ObjectID(req.query.id_shop) },{_id:0, products:1}).toArray(function(err, docs){
			if (err) {
				helpers.replyError(res);
			} else {
				res.json(helpers.emptyArrayOrProperty(docs, "products"));
			}
			helpers.finishService(db);
		});
		*/

		db.collection("shops").aggregate([
		  { $match: { _id: new mongo.ObjectID(req.query.id_shop) } },
		  { $project: {_id:0, products:1} },
		  { $unwind: "$products" },
		  { $lookup: {
		  from: "products",
		  localField: "products",
		  foreignField: "_id",
		  as: "products"
		  } }
		]).toArray(function(err, docs){
			if (err) {
				helpers.replyError(res);
			} else {
				var products = [];
				docs.forEach(function(prod){
					products.push(prod.products[0]);
				});
				res.json(products);
			}
			helpers.finishService(db);
		});;


	});
});

router.get('/discounts', function(req, res, next) {
	helpers.processService(res, function(db){

		// TODO validate input params presence and format

		db.collection("shops").find({ _id: new mongo.ObjectID(req.query.id_shop) },{_id:0, discounts:1}).toArray(function(err, docs){
			if (err) {
				helpers.replyError(res);
			} else {
				res.json(helpers.emptyArrayOrProperty(docs, "discounts"));
			}
			helpers.finishService(db);
		});

	});
});

module.exports = router;
