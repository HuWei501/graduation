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

	getuser:function(req, res, next){
		var param = req.body;
		pool.getConnection(function(err,connection){
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
			});
		})
	}
}