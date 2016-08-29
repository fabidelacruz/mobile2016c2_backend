var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/shops', function(req, res, next) {
	helpers.processService(res, function(db){
		
		// TODO validate input params presence and format
		
		db.collection("shops").find({ products: req.query.barcode }).toArray(function(err, docs){
			if (err) {
				helpers.replyError(res);
			} else {
				res.json(docs);
			}
			helpers.finishService(db);
		});
		
	});
});

module.exports = router;
