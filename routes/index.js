var express = require('express');
var users = require('./users');
var posts = require('./posts');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports.router = router;
module.exports.users = users;
module.exports.posts = posts;
