var sql = {
	login:'select id,password,name,sex,tel,position,date from g_user where account = ? ',
	newUser: 'insert into g_user (account, password, name, sex, tel, position, date) values (?, 123456, ?, ?, ?, ?, ?)',
	changeUser: 'update g_user set name=?, sex=?, tel=?, position=?, date=? where id=?',
	resetPassword: 'update g_user set password=123456 where id=?',
	deleteUser: 'delete from g_user where id=?',
	newCourse: 'insert into g_course (name, period, begintime, endtime, classroom, teacher, time) values (?, ?, ?, ?, ?, ?, ?)'
};

module.exports = sql;