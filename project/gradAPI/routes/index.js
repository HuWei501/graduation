var express = require('express');
var router = express.Router();
var db = require('../dao/dbConnect');

var multiparty = require('multiparty');
var fs = require('fs');

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});
//登录
router.post('/user_login', function (req, res, next) {
	db.getuser(req, res, next);
});
//职位列表
router.get('/get_allposition', function (req, res, next) {
	db.getallposition(req, res, next);
})
//新建职位
router.post('/new_position', function (req, res, next) {
	db.addnewposition(req, res, next);
})
//删除职位
router.post('/delete_position', function (req, res, next) {
	db.deleteposition(req, res, next);
})
//新建员工
router.post('/new_user', function (req, res, next) {
	db.newuser(req, res, next);
});
//员工列表
router.get('/get_allstaff', function (req, res, next) {
	db.getallstaff(req, res, next);
})
//修改密码
router.post('/change_password', function (req, res, next) {
	db.changepassword(req, res, next);
})
//重置密码
router.post('/reset_password', function (req, res, next) {
	db.resetpassword(req, res, next);
})
//修改员工信息
router.post('/change_user', function (req, res, next) {
	db.changeuser(req, res, next);
});
//删除员工
router.post('/delete_user', function (req, res, next) {
	db.deleteuser(req, res, next);
})
//新建培训课程
router.post('/new_course', function (req, res, next) {
	db.newcourse(req, res, next);
})
//查询培训列表
router.get('/get_allcourse', function (req, res, next) {
	db.selectallcourse(req, res, next);
})
//修改培训课程
router.post('/change_course', function (req, res, next) {
	db.changecourse(req, res, next);
})
//删除课程
router.post('/delete_course', function (req, res, next) {
	db.deletecourse(req, res, next);
})
//新增课程资料
router.post('/new_courseData', function(req, res, next) {
	db.newcoursedata(req, res, next);
})
//查询培训课程资料列表
router.get('/get_allCourseData', function (req, res, next) {
	db.selectallcoursedata(req, res, next);
})
//修改课程资料
router.post('/change_courseData', function (req, res, next) {
	db.changecoursedata(req, res, next);
})
//删除资料
router.post('/delete_courseData', function (req, res, next) {
	db.deletecoursedata(req, res, next);
})

//上传PDF
router.post('/pdf/uploading', function (req, res, next) {
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({uploadDir: './public/pdf/'});
	//上传完成后处理
	form.parse(req, function (err, fields, files) {
		var filesTmp = JSON.stringify(files,null,2);

		if(err){
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			var inputFile = files.file[0],
				uploadedPath = inputFile.path,
				dstPath = './public/pdf/' + inputFile.originalFilename;
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if(err){
					console.log('rename error: ' + err);
				} else {
					res.json({msg:'上传成功',path:inputFile.originalFilename,success:true});
				}
			});
		}

	});
})
//上传图片
router.post('/image/upload', function (req, res, next) {
	var form = new multiparty.Form({uploadDir: './public/images'});
	form.parse(req, function (err, fields, files) {
		var filesTmp = JSON.stringify(files,null,2);

		if(err){
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			var inputFile = files.image[0],
				uploadedPath = inputFile.path,
				//随机数防止重名
				rendomNum = new Date().getTime(),
				dstPath = './public/images/' + rendomNum + inputFile.originalFilename;
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if(err){
					console.log('rename error: ' + err);
				} else {
					res.json({msg:'上传成功',path:'images/'+ rendomNum + inputFile.originalFilename,success:true});
				}
			});
		}
	});
})

//前端接口
//查询可报名的培训
router.post('/selectApplyCourse', function (req, res, next) {
	db.applycourselist(req, res, next);
})
//员工培训报名
router.post('/courseApply', function (req, res, next) {
	db.staffapply(req, res, next);
})
//查询已经报名的培训
router.post('/applyedCourse', function (req, res, next) {
	db.applyedcourselist(req, res, next);
})
//新增自我评价
router.post('/newAssessment', function (req, res, next) {
	db.newassessment(req, res, next);
})
//获取员工评价信息
router.post('/getSummary', function (req, res, next) {
	db.getsummarylist(req, res, next);
})
//新增BOSS评价
router.post('/newBossAssessment', function (req, res, next) {
	db.bossassessment(req, res, next);
})
//查询资料列表
router.post('/selectDataList', function (req, res, next) {
	db.selectdata(req, res, next);
})
//员工开始学习资料
router.post('/startLearnData', function (req, res, next) {
	db.startlearndata(req, res, next);
})
//修改PDF页数
router.post('/changePDFPage', function (req, res, next) {
	db.changepdfpage(req, res, next);
})
//结束学习时保存当前页数和学习时间
router.post('/updatePageTime', function (req, res, next) {
	db.updatepagetime(req, res, next);
})
//我的记录列表
router.post('/myDataList', function (req, res, next) {
	db.mydatalist(req, res, next);
})
//查询已经报名的员工
router.post('/applyStaffList', function (req, res, next) {
	db.nowpeople(req, res, next);
})
//培训成绩录入
router.post('/changeStaffGrade', function (req, res, next) {
	db.staffgradechange(req, res, next);
})
//查询资料已学习的员工
router.post('/learnedStaffList', function (req, res, next) {
	db.datalearnedlist(req, res, next);
})
//给职位添加推荐资料
router.post('/addRecData', function (req, res, next) {
	db.recommenddata(req, res, next);
})
//查询资料并附加状态 1 已推荐 0 未推荐
router.post('/selectAllDataList', function (req, res, next) {
	db.selectalldatalist(req, res, next);
})
//移除推荐资料
router.post('/removeRecommend', function (req, res, next) {
	db.removerecommenddata(req, res, next);
})
//员工查询推荐资料列表
router.post('/recommendDataList', function (req, res, next) {
	db.selectrecommenddata(req, res, next);
})


module.exports = router;	
