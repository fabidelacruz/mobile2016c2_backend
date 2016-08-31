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

router.patch('/config', function(req, res, next) {
  helpers.processService(res, function(db){

		// TODO validate input params presence and format

    var defaultLocation = {
      city: new mongo.ObjectID(req.query.id_default_city),
      state: new mongo.ObjectID(req.query.id_default_state),
      continent: new mongo.ObjectID(req.query.id_default_continent),
      country: new mongo.ObjectID(req.query.id_default_country)
    };
		db.collection("users").updateOne({ _id: new mongo.ObjectID(req.query.id_user) }, { $set: { defaultRadius: Number(req.query.default_radius), defaultExclusive: helpers.stringToBoolean(req.query.default_exclusive), defaultLocation: defaultLocation } }, function(err, resp){
			if (err) {
				helpers.replyError(res);
			} else {
				res.json(resp);
			}
			helpers.finishService(db);
		});

	});
});

module.exports = router;
