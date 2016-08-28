var express = require('express');
var router = express.Router();
var helpers = require('./helpers');

router.get('/locations', function(req, res, next) {
	helpers.processService(res, function(db){
		res.json({success:true});
	});
});

module.exports = router;
