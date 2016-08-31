var express = require('express');
var router = express.Router();
var helpers = require('./helpers');
var mongo = require('mongodb');

router.get('/login', function(req, res, next) {
  helpers.processService(res, function(db){

		// TODO validate input params presence and format

		db.collection("users").find({ username: req.query.username, password: req.query.password },{_id:1}).toArray(function(err, docs){
			if (err) {
				helpers.replyError(res);
			} else {
				res.json(helpers.emptyArrayOrObject(docs));
			}
			helpers.finishService(db);
		});

	});
});

router.get('/config', function(req, res, next) {
  helpers.processService(res, function(db){

		// TODO validate input params presence and format

		db.collection("users").find({ _id: new mongo.ObjectID(req.query.id_user) },{password:0}).toArray(function(err, docs){
			if (err) {
				helpers.replyError(res);
			} else {
				res.json(helpers.emptyArrayOrObject(docs));
			}
			helpers.finishService(db);
		});

	});
});

module.exports = router;
