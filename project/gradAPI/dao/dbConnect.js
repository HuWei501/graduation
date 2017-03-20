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

//Date转化为YYYY-MM-DD
var transformDate = function (nowdate) {
	var sdate = nowdate.getFullYear() + '-';
	if (nowdate.getMonth() < 9) {
		sdate += '0' + (nowdate.getMonth() + 1) + '-';
	} else {
		sdate += (nowdate.getMonth() + 1) + '-';
	}
	if (nowdate.getDate() < 10) {
		sdate += '0' + nowdate.getDate()
	} else {
		sdate += nowdate.getDate()
	}
	return sdate
}

//数组排序
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

module.exports = {
	//登录并获取员工信息
	getuser: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.login,param.account,function(err,result){
				console.log(err)
				console.log(result)
				if(result[0] === undefined){
					res.json({msg:'用户不存在',success:false});
				}else{
					if(result[0].password === param.pwd){
						res.json({msg:'登录成功',
							obj:{
								gid:result[0].id,
								gaccount:result[0].account,
								gname:result[0].name,
								gsex:result[0].sex,
								gtel:result[0].tel,
								gpositionID:result[0].position,
								gposition:result[0].pname,
								gworkdate:transformDate(result[0].workdate),
								gborthdate:transformDate(result[0].borthdate),
								gpolitics:result[0].politics,
								geducation:result[0].education,
								gfather:result[0].father,
								gmother:result[0].mother,
								gadress:result[0].adress,
								gzipcode:result[0].zipcode,
								gnation:result[0].nation,
								gschool:result[0].school,
								gidentity:result[0].identity,
								gemail:result[0].email,
								gnative:result[0].native,
								gtype:result[0].type
							},
							success:true});
					}else{
						res.json({msg:'帐号或密码错误',success:false});
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
			connection.query($sql.newUser,
				[param.gaccount, param.gname, param.gsex, param.gtel, param.gposition, param.gworkdate, param.gborthdate, param.gpolitics, param.geducation, param.gfather, param.gmother, param.gadress, param.gzipcode, param.gnation, param.gschool, param.gidentity, param.gemail, param.gnative], 
				function (err, result) {
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
	//查询职位列表
	getallposition: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectAllPosition,function(err,result){
				if(!result){
					res.json({msg:'查询职位列表失败',success:false});
				}else{
					res.json({
						msg:'查询职位列表成功',
						position: result,
						success:true
					});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//查询员工列表
	getallstaff: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectAllStaff,function(err,result){
				if(!result){
					res.json({msg:'查询员工列表失败',success:false});
				}else{
					var list = [],
						i = 0;
					for (;i < result.length;i++) {
						list[i] = {
							gid:result[i].id,
							gaccount:result[i].account,
							gname:result[i].name,
							gsex:result[i].sex,
							gtel:result[i].tel,
							gposition:result[i].position,
							gpositionname:result[i].pname,
							gworkdate:transformDate(result[i].workdate),
							gborthdate:transformDate(result[i].borthdate),
							gpolitics:result[i].politics,
							geducation:result[i].education,
							gfather:result[i].father,
							gmother:result[i].mother,
							gadress:result[i].adress,
							gzipcode:result[i].zipcode,
							gnation:result[i].nation,
							gschool:result[i].school,
							gidentity:result[i].identity,
							gemail:result[i].email,
							gnative:result[i].native
						};
					}
					res.json({
						msg:'查询员工列表成功',
						stafflist: list,
						success:true
					});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//添加新职位
	addnewposition: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.addNewPosition,param.gpositionname,function(err,result){
				if(result.affectedRows){
					res.json({msg:'添加成功',success:true});
				}else{
					if(err.errno == 1062){
						res.json({msg:'该职位已存在',success:false});
					}else{
						res.json({msg:'添加失败',success:false});
					}
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//删除职位
	deleteposition: function(req, res, next){
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.deletePosition,param.gid,function(err,result){
				if(result.affectedRows){
					res.json({msg:'删除成功',success:true});
				}else{
					res.json({msg:'删除失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//修改员工信息
	changeuser: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.changeUser,
			[param.gname, param.gsex, param.gtel, param.gposition, param.gworkdate, param.gborthdate, param.gpolitics, param.geducation, param.gfather, param.gmother, param.gadress, param.gzipcode, param.gnation, param.gschool, param.gidentity, param.gemail, param.gnative, param.gid],
			function(err,result) {
				if(result.affectedRows){
					res.json({msg:'修改成功',success:true});
				}else{
					res.json({msg:'修改失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//修改密码
	changepassword: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.changePassword,[param.gnewpwd, param.gid, param.goldpwd],function(err,result){
				if(result.affectedRows){
					res.json({msg:'修改成功',success:true});
				}else{
					res.json({msg:'原密码错误',success:false});
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
				if(result.affectedRows){
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
				if(result.affectedRows){
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
			connection.query($sql.newCourse,[param.gname, +param.gperiod, param.gstartdate, param.genddate, param.gclassroom, param.gteacher, param.gschooltime, +param.glimitperson],function(err,result){
				if(result.affectedRows){
					res.json({msg:'添加成功',success:true});
				}else{
					res.json({msg:'添加失败',success:false});
				}
				connection.release();
			});
		})
	},
	//查询培训列表
	selectallcourse: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectAllCourse, function (err, result) {
				if(result){
					var list = [],
						i = 0;
					for (;i < result.length;i++) {
						list[i] = {
							gid:result[i].id,
							gname:result[i].name,
							gperiod:result[i].period,
							gstartdate:transformDate(result[i].startdate),
							genddate:transformDate(result[i].enddate),
							gclassroom:result[i].classroom,
							gteacher:result[i].teacher,
							gschooltime:result[i].schooltime,
							glimitperson:result[i].limitperson,
							gnowperson:result[i].nowperson,
							gstate:result[i].state
						};
					}
					res.json({
						msg:'查询培训列表成功',
						courselist: list,
						success:true
					});
				}else{
					res.json({msg:'查询培训列表失败',success:false});
				}
				connection.release();
			});
		})
	},
	//修改培训课程信息
	changecourse: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.changeTrainCourse,
			[param.gname, +param.gperiod, param.gstartdate, param.genddate, param.gclassroom, param.gteacher, param.gschooltime, +param.glimitperson, param.gid],
			function(err,result) {
				if(result.affectedRows){
					res.json({msg:'修改成功',success:true});
				}else{
					res.json({msg:'修改失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//删除课程
	deletecourse: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.deleteCourse,param.gid,function(err,result){
				if(result.affectedRows){
					res.json({msg:'删除成功',success:true});
				}else{
					res.json({msg:'删除失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//新增课程资料
	newcoursedata: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.newCourseData,[param.gtitle, +param.gpages, param.gintro, param.gimgurl, param.gPDFurl], function (err, result) {
				if(result.affectedRows){
					res.json({msg:'添加成功',success:true});
				}else{
					res.json({msg:'添加失败',success:false});
				}
				connection.release();
			});
		})
	},
	//查询培训课程资料列表
	selectallcoursedata: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectAllCourseData, function (err, result) {
				if(result){
					var list = [],
						i = 0;
					for (;i < result.length;i++) {
						list[i] = {
							gid:result[i].id,
							gtitle:result[i].title,
							gpages:result[i].pages,
							gstartdate:result[i].startdate,
							genddate:result[i].enddate,
							gPDFurl:result[i].PDFurl,
							glearnNum:result[i].learnNum,
							gintro:result[i].intro,
							gimgurl:result[i].imgurl
						};
					}
					res.json({
						msg:'查询培训课程资料列表成功',
						datalist: list,
						success:true
					});
				}else{
					res.json({msg:'查询培训课程资料列表失败',success:false});
				}
				connection.release();
			});
		})
	},
	//修改课程资料信息
	changecoursedata: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.changeCourseData,
			[param.gtitle, param.gintro, param.gimgurl, param.gPDFurl, +param.gpages, param.gid],
			function(err,result) {
				if(result.affectedRows){
					res.json({msg:'修改成功',success:true});
				}else{
					res.json({msg:'修改失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//删除资料
	deletecoursedata: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.deleteCourseData,param.gid,function(err,result){
				if(result.affectedRows){
					res.json({msg:'删除成功',success:true});
				}else{
					res.json({msg:'删除失败',success:false});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//查询可以报名的培训列表
	applycourselist: function (req, res, next) {
		var param = req.body;
		var nowdate = transformDate(new Date());
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectApplyCourse, [param.gid, nowdate], function (err, result) {
				if(err){
					console.log(err);
					res.json({msg:'查询培训列表失败',success:false});
				}else{
					var list = [],
						i = 0;
					for (;i < result.length;i++) {
						list[i] = {
							gcourseid:result[i].id,
							gname:result[i].name,
							gperiod:result[i].period,
							gstartdate:transformDate(result[i].startdate),
							genddate:transformDate(result[i].enddate),
							gclassroom:result[i].classroom,
							gteacher:result[i].teacher,
							gschooltime:result[i].schooltime,
							glimitperson:result[i].limitperson,
							gnowperson:result[i].nowperson
						};
					}
					res.json({
						msg:'查询培训列表成功',
						courseList: list,
						success:true
					});
				}
				connection.release();
			});
		})
	},
	//员工培训报名
	staffapply: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.staffApplyCourse, [param.gid, param.gcourseid], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'报名失败',success:false});
				} else {
					res.json({msg:'报名成功',success:true});
				}
				// 释放连接 
				connection.release();
			});
		})
	},
	//查询已经报名的培训
	applyedcourselist: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.applyedCourse, param.gid, function (err, result) {
				if(err){
					console.log(err);
					res.json({msg:'查询已报名培训列表失败',success:false});
				}else{
					var list = [],
						i = 0,
						nowtime = new Date();
					for (;i < result.length;i++) {
						list[i] = {
							gcourseid:result[i].id,
							gname:result[i].name,
							gperiod:result[i].period,
							gstartdate:transformDate(result[i].startdate),
							genddate:transformDate(result[i].enddate),
							gclassroom:result[i].classroom,
							gteacher:result[i].teacher,
							gschooltime:result[i].schooltime,
							grade:result[i].grade
						};
						if (nowtime < result[i].startdate) {
							list[i].gstate = 1;
						} else if (nowtime > result[i].enddate) {
							list[i].gstate = 3;
						} else {
							list[i].gstate = 2;
						}
					}
					res.json({
						msg:'查询已报名培训列表成功',
						applyedCourseList: list,
						success:true
					});
				}
				connection.release();
			});
		})
	},
	//新增自我评价
	newassessment: function (req, res, next) {
		var param = req.body;
		var nowtime = transformDate(new Date());
		pool.getConnection(function (err, connection) {
			connection.query($sql.newAssessment, [param.gid, param.gassessment, nowtime], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'添加失败',success:false});
				} else {
					res.json({msg:'添加成功',success:true});
				} 
				connection.release();
			});
		})
	},
	//新增BOSS评价
	bossassessment: function (req, res, next) {
		var param = req.body;
		var nowtime = transformDate(new Date());
		pool.getConnection(function (err, connection) {
			connection.query($sql.newBossAssessment, [param.gid, param.gassessment, nowtime], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'添加失败',success:false});
				} else {
					res.json({msg:'添加成功',success:true});
				} 
				connection.release();
			});
		})
	},
	//获取员工评价信息
	getsummarylist: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.getSummaryList[0], param.guserid, function (err0, result0) {
				if (err0) {
					console.log(err0);
					res.json({msg: '查询总结列表失败', success: false});
				} else {
					connection.query($sql.getSummaryList[1], param.guserid, function (err1, result1) {
						if (err1) {
							console.log(err1);
							res.json({msg: '查询总结列表失败', success: false});
						} else {
							var resList = result0.concat(result1);
							resList.sort(compare('builddate'));
							var arr = [],
								i = 0;
							for (;i < resList.length;i++) {
								arr[i] = {
									gassessment:resList[i].assessment,
									gbuilddate:transformDate(resList[i].builddate),
									gtype:resList[i].gtype
								};
							}
							res.json({msg: '查询总结列表成功', summaryList: arr, success: true});
						}
					})
				}
				connection.release();
			})
		})
	},
	//员工查询资料列表
	selectdata: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectDataList, param.guserid, function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg: '查询资料列表失败', success: false});
				} else {
					var arr = [],
						i = 0;
					for (;i < result.length;i++) {
						arr[i] = {
							gdataID: result[i].id,
							gtitle:result[i].title,
							gpages:result[i].pages,
							gintro:result[i].intro,
							gimgurl:result[i].imgurl,
							gPDFurl:result[i].PDFurl,
							glearnNum:result[i].learnNum,
							gstate:result[i].state,
							glearnedpage:result[i].learnedpage,
							glearntime:result[i].learntime
						};
					}
					res.json({msg: '查询资料列表成功', dataList: arr, success: true});
				}
			})
			connection.release();
		})
	},
	//员工开始学习资料
	startlearndata: function (req, res, next) {
		var param = req.body;
		var nowtime = transformDate(new Date());
		pool.getConnection(function (err, connection) {
			connection.query($sql.stratLearn, [param.guserid, param.gdataid, nowtime], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'添加失败',success:false});
				} else {
					res.json({msg:'添加成功',success:true});
				} 
				connection.release();
			});
		})
	},
	//改变PDF页数
	changepdfpage: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.changePDFPages, [param.pages, param.gdataid], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'修改失败',success:false});
				} else {
					res.json({msg:'修改成功',success:true});
				} 
				connection.release();
			});
		})
	},
	//结束学习时保存当前页数和学习时间
	updatepagetime: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.updatePageTime, [param.learnedpage, param.learntime, param.guserid, param.gdataid], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'更新失败',success:false});
				} else {
					res.json({msg:'更新成功',success:true});
				} 
				connection.release();
			});
		})
	},
	//我的记录列表
	mydatalist: function(req, res, next) {
		//数组去重
		function unique (arr) {
			var re=[arr[0]];
			for(var i = 1; i < arr.length; i++)
			{
				if( arr[i].date !== re[re.length-1].date)
				{
					re.push(arr[i]);
				}
			}
			return re;
		}
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.myLearnedList, param.guserid, function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg: '查询记录列表失败', success: false});
				} else {
					var arr1 = [];
					result.sort(compare('startdate'));
					for (var j = 0;j < result.length;j++) {
						arr1[j] = {
							date: transformDate(result[j].startdate),
							obj: []
						};
					}
					arr1 = unique(arr1)
					for (var k = 0;k < arr1.length;k++) {
						for (var i = 0;i < result.length;i++) {
							if (arr1[k].date == transformDate(result[i].startdate)) {
								arr1[k].obj.push({
									gdataID: result[i].id,
									gtitle:result[i].title,
									gpages:result[i].pages,
									gintro:result[i].intro,
									gimgurl:result[i].imgurl,
									gPDFurl:result[i].PDFurl,
									glearnNum:result[i].learnNum,
									glearntime:result[i].learntime,
									glearnedpage:result[i].learnedpage
								})
							}
						}
					}
					res.json({msg: '查询记录列表成功', dataList: arr1, success: true});
				}
			})
			connection.release();
		})
	},
	//查询已经报名的员工
	nowpeople: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.nowStaffList, param.gcourseid, function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg: '查询报名员工列表失败', success: false});
				} else {
					var arr = [],
						i = 0;
					for (;i < result.length;i++) {
						arr[i] = {
							guserid: result[i].id,
							gname:result[i].name,
							gsex:result[i].sex,
							gtel:result[i].tel,
							gposition:result[i].positionName,
							gemail:result[i].email,
							grade:result[i].grade
						};
					}
					res.json({msg: '查询报名员工列表成功', stafflist: arr, success: true});
				}
			})
			connection.release();
		})
	},
	//培训成绩录入
	staffgradechange: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.changeGrade, [param.grade, param.guserid, param.gcourseid], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'修改失败',success:false});
				} else {
					res.json({msg:'修改成功',success:true});
				} 
				connection.release();
			});
		})
	},
	//查询资料已学习的员工
	datalearnedlist: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.learnedStaffList, param.gdataid, function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg: '查询学习员工列表失败', success: false});
				} else {
					var arr = [],
						i = 0;
					for (;i < result.length;i++) {
						arr[i] = {
							guserid: result[i].id,
							gname:result[i].name,
							gsex:result[i].sex,
							gtel:result[i].tel,
							gposition:result[i].positionName,
							gemail:result[i].email,
							glearntime:result[i].learntime
						};
					}
					res.json({msg: '查询学习员工列表成功', stafflist: arr, success: true});
				}
			})
			connection.release();
		})
	},
	//给职位添加推荐资料
	recommenddata: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.addRecommendData, [param.gpositionid, param.gdataid], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'添加失败',success:false});
				} else {
					res.json({msg:'添加成功',success:true});
				}
				connection.release();
			});
		})
	},
	//查询资料并附加状态 1 已推荐 0 未推荐
	selectalldatalist: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectAllDataList, param.gpositionid, function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg: '查询资料列表失败', success: false});
				} else {
					var arr = [],
						i = 0;
					for (;i < result.length;i++) {
						arr[i] = {
							gdataid: result[i].id,
							gtitle:result[i].title,
							gintro:result[i].intro,
							gstate:result[i].state
						};
					}
					res.json({msg: '查询资料列表成功', datalist: arr, success: true});
				}
			})
			connection.release();
		})
	},
	//移除推荐资料
	removerecommenddata: function (req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.deleteRecommendData, [param.gpositionid, param.gdataid], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg:'移除失败',success:false});
				} else {
					res.json({msg:'移除成功',success:true});
				}
				connection.release();
			});
		})
	},
	//员工查询推荐资料列表
	selectrecommenddata: function(req, res, next) {
		var param = req.body;
		pool.getConnection(function (err, connection) {
			connection.query($sql.selectRecommendData, [param.guserid, param.gpositionid], function (err, result) {
				if (err) {
					console.log(err);
					res.json({msg: '查询推荐资料列表失败', success: false});
				} else {
					var arr = [],
						i = 0;
					for (;i < result.length;i++) {
						arr[i] = {
							gdataID: result[i].id,
							gtitle:result[i].title,
							gpages:result[i].pages,
							gintro:result[i].intro,
							gimgurl:result[i].imgurl,
							gPDFurl:result[i].PDFurl,
							glearnNum:result[i].learnNum,
							gstate:result[i].state,
							glearnedpage:result[i].learnedpage,
							glearntime:result[i].learntime
						};
					}
					res.json({msg: '查询推荐资料列表成功', dataList: arr, success: true});
				}
			})
			connection.release();
		})
	},
}