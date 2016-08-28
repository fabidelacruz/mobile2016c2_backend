var express = require('express');
var router = express.Router();

router.get('/product', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
