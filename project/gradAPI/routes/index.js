var express = require('express');
var router = express.Router();
var db = require('../dao/dbConnect');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});
router.post('/user_login',function(req,res,next) {
	db.getuser(req,res,next);
});
router.post('/new_user',function(req,res,next) {
	db.newuser(req,res,next);
});
router.post('/change_user',function(req,res,next) {
	db.changeuser(req,res,next);
});
router.post('/reset_password',function(req,res,next) {
	db.resetpassword(req,res,next);
})
router.post('/delete_user',function(req,res,next) {
	db.deleteuser(req,res,next);
})
router.post('/new_course',function(req,res,next) {
	db.newcourse(req,res,next);
})
module.exports = router;
