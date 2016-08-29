var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/products', function(req, res, next) {
	helpers.processService(res, function(db){
		
		// TODO validate input params presence and format
		
		db.collection("shops").find({ _id: new mongo.ObjectID(req.query.id_shop) },{_id:0, products:1}).toArray(function(err, docs){
			if (err) {
				helpers.replyError(res);
			} else {
				res.json(helpers.emptyArrayOrProperty(docs, "products"));
			}
			helpers.finishService(db);
		});
		
	});
});

module.exports = router;
