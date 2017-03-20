var sql = {
	//登录
	login: 'select g_user.*,g_position.name as pname from g_user,g_position where g_position.id = g_user.position and g_user.account = ?',
	//查询所有职位
	selectAllPosition: 'select * from g_position order by id',
	//添加新职位
	addNewPosition: 'insert into g_position (name) values (?)',
	//删除职位
	deletePosition: 'delete from g_position where id=?',
	//添加新员工
	newUser: 'insert into g_user (account, name, sex, tel, position, workdate, borthdate, politics, education, father, mother, adress, zipcode, nation, school, identity, email, native) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	//查询员工列表
	selectAllStaff: 'select g_user.*,g_position.name as pname from g_user,g_position where g_position.id = g_user.position and type = 1',
	//修改密码
	changePassword: 'update g_user set password=? where id=? and password = ?',
	//重置员工密码
	resetPassword: 'update g_user set password=123456 where id=?',
	//修改员工信息
	changeUser: 'update g_user set name=?, sex=?, tel=?, position=?, workdate=?,borthdate=?, politics=?, education=?, father=?, mother=?, adress=?, zipcode=?, nation=?, school=?, identity=?, email=?, native=? where id=?',
	//删除员工
	deleteUser: 'delete from g_user where id=?',
	//新建培训课程
	newCourse: 'insert into g_course (name, period, startdate, enddate, classroom, teacher, schooltime, limitperson) values (?, ?, ?, ?, ?, ?, ?, ?)',
	//查询培训课程列表
	selectAllCourse: 'select *, case when enddate > now() then 0 else 1 end state from g_course',
	//修改培训课程
	changeTrainCourse: 'update g_course set name=?, period=?, startdate=?, enddate=?, classroom=?, teacher=?, schooltime=?, limitperson=? where id=?',
	//删除课程
	deleteCourse: 'delete from g_course where id=?',
	//新增课程资料
	newCourseData: 'insert into g_coursedata (title, pages, intro, imgurl, PDFurl) values (?, ?, ?, ?, ?)',
	//查询课程资料列表
	selectAllCourseData: 'select * from g_coursedata',
	//修改课程资料
	changeCourseData: 'update g_coursedata set title=?, intro=?, imgurl=?, PDFurl=?, pages=? where id=?',
	//删除资料
	deleteCourseData: 'delete from g_coursedata where id = ?',
	//查询可报名的培训
	selectApplyCourse: 'select g_course.* from g_course where g_course.id not in (select courseid from g_user_course where userid = ?) and g_course.startdate > ?',
	//员工培训报名
	staffApplyCourse: 'insert into g_user_course (userid, courseid) values (?, ?)',
	//查询已经报名的培训
	applyedCourse: 'select g_course.*,g_user_course.grade from g_course,g_user_course where g_course.id=g_user_course.courseid and g_user_course.userid = ?',
	//新增自我评价
	newAssessment: 'insert into g_userassessment (userid, assessment, builddate) values (?, ?, ?)',
	//查询员工评价
	getSummaryList: ['select assessment , builddate , 1 as gtype from g_userassessment where userid = ?', 
	'select assessment, builddate, 0 as gtype from g_bossassessment where userid = ?'],
	//新增BOSS评价
	newBossAssessment: 'insert into g_bossassessment (userid, assessment, builddate) values (?, ?, ?)',
	//查询资料列表
	selectDataList: 'select a.*,' +
       	' case when b.userid is not null then 1 else 0 end state,' +
    	' case when b.userid is not null then b.learntime else 0 end learntime,' +
    	' case when b.userid is not null then b.learnedpage else 1 end learnedpage' +
		' from g_coursedata a left join g_user_data b on a.id = b.dataid and b.userid = ?',
	//员工开始学习资料
	stratLearn: 'insert into g_user_data (userid, dataid, startdate) values (?, ?, ?)',
	//修改PDF页数
	changePDFPages: 'update g_coursedata set pages = ? where id= ?',
	//结束学习时保存当前页数和学习时间
	updatePageTime: 'update g_user_data set learnedpage = ?, learntime = learntime + ? where (userid= ? and dataid = ?)',
	//我的记录列表
	myLearnedList: 'select a.*, b.learnedpage, b.learntime, b.startdate from g_coursedata a, g_user_data b where a.id = b.dataid and b.userid = ?',
	//查询已经报名的员工
	nowStaffList: 'select a.*, b.grade, c.name as positionName from g_user a, g_position c left join g_user_course b on b.courseid = ? where a.id = b.userid and c.id = a.position',
	//培训成绩录入
	changeGrade: 'update g_user_course set grade = ? where userid = ? and courseid = ?',
	//查询资料已学习的员工
	learnedStaffList: 'select a.*, b.learntime, c.name as positionName from g_user a, g_position c left join g_user_data b on b.dataid = ? where a.id = b.userid and c.id = a.position',
	//给职位添加推荐资料
	addRecommendData: 'insert into g_positiion_data (positionid, dataid) values (?, ?)',
	//查询资料并附加状态 1 已推荐 0 未推荐
	selectAllDataList: 'select a.*, case when b.positionid is not null then 1 else 0 end state from g_coursedata a left join g_positiion_data b on a.id = b.dataid and b.positionid = ?',
	//移除推荐资料
	deleteRecommendData: 'delete from g_positiion_data where positionid = ? and dataid = ?',
	//查询职位的推荐资料
	selectRecommendData: 'select a.*, case when b.userid is not null then 1 else 0 end state,'
		+ ' case when b.userid is not null then b.learntime else 0 end learntime,'
    	+ ' case when b.userid is not null then b.learnedpage else 1 end learnedpage'
		+ ' from g_coursedata a left join g_user_data b on a.id = b.dataid and b.userid = ?'
		+ ' where a.id in (select dataid from g_positiion_data where positionid = ?)'

};

module.exports = sql;