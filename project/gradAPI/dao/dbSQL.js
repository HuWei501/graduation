var sql = {
	login:'select id,password,name,sex,tel,position,date from g_user where account = ? '
};

module.exports = sql;