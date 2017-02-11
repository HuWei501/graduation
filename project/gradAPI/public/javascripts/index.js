+function($,w,d){
	$(function(){
		$('#btn-login').on('click',function(){
			var account = $('.account').val();
			var password = $('.password').val();
			if(account && password){		
				$.ajax({
					url: '/login',
					type: 'post',
					dataType: 'json',
					data: {
						account: account,
						pwd: password
					},
				})
				.done(function(data) {
					console.log(data);
				})
				.fail(function() {
					console.log("error");
				})
			}else{
				alert('用户名或密码不能为空');
			}
			
		})
	});
}(jQuery,window,document);