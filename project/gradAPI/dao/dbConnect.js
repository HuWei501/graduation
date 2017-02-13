var mysql = require('mysql');
var $sql = require('./dbSQL.js');

var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'graduation'
});

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			msg: '操作失败',
			success: false
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	//登录并获取员工信息
	getuser: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.login,param.account,function(err,result){
				if(result === undefined){
					res.json({msg:'用户不存在',success:false});
				}else{
					if(result[0].password === param.pwd){
						res.json({msg:'登录成功',
							obj:{
								gid:result[0].id,
								gname:result[0].name,
								gsex:result[0].sex,
								gtel:result[0].tel,
								gposition:result[0].position,
								gdate:result[0].date
							},
							success:true});
					}else{
						res.json({msg:'密码错误',success:false});
					}
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//新建员工
	newuser: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.newUser, [param.account, param.gname, param.gsex, param.gtel, param.gposition, param.gdate], function (err, result) {
				if(result){
					res.json({msg:'添加成功',success:true});
				}else{
					if(err.errno == 1062){
						res.json({msg:'用户名已存在',success:false});
					}else{
						res.json({msg:'添加失败',success:false});
					}
				}
				// 释放连接 
				connection.release();
			})
		})
	},
	//修改员工信息
	changeuser: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.changeUser,[param.gname, param.gsex, param.gtel, param.gposition, param.gdate, param.gid],function(err,result){
				if(!result){
					res.json({msg:'修改失败',success:false});
				}else{
					res.json({msg:'修改成功',success:true});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//重置员工密码
	resetpassword: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.resetPassword,param.gid,function(err,result){
				if(result){
					res.json({msg:'重置成功',success:true});
				}else{
					res.json({msg:'重置失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//删除员工
	deleteuser: function(req, res, next){
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.deleteUser,param.gid,function(err,result){
				if(result){
					res.json({msg:'删除成功',success:true});
				}else{
					res.json({msg:'删除失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//新建培训
	newcourse: function(req, res, next){
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.newCourse,[param.gcoursename, param.gperiod, param.begintime, param.endtime, param.gclassroom, param.gteacher, param.gtime],function(err,result){
				console.log(err);
				console.log(result);
				if(result){
					res.json({msg:'添加成功',success:true});
				}else{
					res.json({msg:'添加失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	}
}