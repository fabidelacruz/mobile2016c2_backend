var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/config', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
