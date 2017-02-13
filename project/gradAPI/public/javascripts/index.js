+function($,w,d){
	$(function(){
		w.obj = {
			information: null
		};
		//登录
		$('#btn-login').on('click',function(){
			var account = $('.login_box .account').val();
			var password = $('.login_box .password').val();
			if(account && password){		
				$.ajax({
					url: '/user_login',
					type: 'post',
					dataType: 'json',
					data: {
						account: account,
						pwd: password
					},
				})
				.done(function(data) {
					console.log(data);
					if(data.success){
						obj.information = data.obj;
						$('.change_box .account').val(account);
						$('.change_box .username').val(data.obj.gname);
						$('.change_box .sex_select').val(data.obj.gsex);
						$('.change_box .telephone').val(data.obj.gtel);
						$('.change_box .position').val(data.obj.gposition);
						$('.change_box .workdate').val(data.obj.gdate.split('T')[0]);
					}
				})
				.fail(function() {
					console.log("error");
				})
			}else{
				alert('用户名或密码不能为空');
			}
		})
		//新建用户
		$('#btn-newuser').on('click',function(){
			var account = $('#account').val(),
				username = $('#username').val(),
				sex = $('.sex_select').val(),
				tel = $('#telephone').val(),
				position = $('#position').val(),
				workdate = $('#workdate').val();
			if(account && username && position && tel && workdate){
				$.ajax({
					url: '/new_user',
					type: 'post',
					dataType: 'json',
					data: {
						account: account,
						gname: username,
						gsex: sex,
						gtel: tel,
						gposition: position,
						gdate: workdate
					},
				})
				.done(function(data) {
					console.log(data);
				})
				.fail(function() {
					console.log("error");
				})
				
			}else{
				alert('所有信息都是必填项，不能为空')
			}
		})
		//修改用户资料
		$('#btn-change').on('click',function(){
			var username = $('.change_box .username').val(),
				sex = $('.change_box .sex_select').val(),
				tel = $('.change_box .telephone').val(),
				position = $('.change_box .position').val(),
				workdate = $('.change_box .workdate').val();
			if(username && tel && position && workdate){
				$.ajax({
					url: '/change_user',
					type: 'post',
					dataType: 'json',
					data: {
						gid: obj.information.gid,
						gname: username,
						gsex: sex,
						gtel: tel,
						gposition: position,
						gdate: workdate
					},
				})
				.done(function(data) {
					console.log(data);
				})
				.fail(function() {
					console.log("error");
				})
			}else{
				alert('不能为空');
			}
			
		})
		//重置密码
		$('#btn-resetpwd').on('click',function(){
			$.ajax({
				url: '/reset_password',
				type: 'post',
				dataType: 'json',
				data: {
					gid: obj.information.gid
				},
			})
			.done(function(data) {
				console.log(data);
			})
			.fail(function() {
				console.log("error");
			})			
		})
		//删除
		$('#btn-delete').on('click',function(){
			$.ajax({
				url: '/delete_user',
				type: 'post',
				dataType: 'json',
				data: {
					gid: obj.information.gid
				},
			})
			.done(function(data) {
				console.log(data);
				if(data.success){
					obj.information = null;
				}
			})
			.fail(function() {
				console.log("error");
			})	
		})
		//添加培训课程
		$('#btn-newCourse').on('click',function(){
			var coursename = $('.newcourse_box .coursename').val(),
				period = $('.newcourse_box .period').val(),
				begintime = $('.newcourse_box .begintime').val(),
				endtime = $('.newcourse_box .endtime').val(),
				classroom = $('.newcourse_box .classroom').val(),
				teacher = $('.newcourse_box .teacher').val(),
				time = $('.newcourse_box .time').val();
			if(coursename && period && begintime && endtime && classroom && teacher && time && endtime > begintime){
				$.ajax({
					url: '/new_course',
					type: 'post',
					dataType: 'json',
					data: {
						gcoursename:coursename,
						gperiod:period,
						begintime:begintime,
						endtime:endtime,
						gclassroom:classroom,
						gteacher:teacher,
						gtime:time
					},
				})
				.done(function(data) {
					console.log(data);
				})
				.fail(function() {
					console.log("error");
				})
				
			}else{
				alert('信息填写错误');
			}
		})
	});
}(jQuery,window,document);