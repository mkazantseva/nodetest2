var express = require('express');
var users = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports.router = router;
module.exports.users = users;
