var express = require('express');
var router = express.Router();
var db = require('../dao/dbConnect');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});
router.post('/login',function(req,res,next) {
	db.getuser(req,res,next);
});
module.exports = router;
