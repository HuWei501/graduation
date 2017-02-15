<template>
  <div id="alterpassword">
  	<div class="input_box">
		<label>旧密码：</label>
		<input type="password" class="old form-control">
  	</div>
  	<div class="input_box">
		<label>新密码：</label>
		<input type="password" class="new form-control">
  	</div>
  	<div class="input_box">
		<label>确认密码：</label>
		<input type="password" class="confirm form-control">
  	</div>
  	<a href="javascript:;" class="btn btn-default">修改</a>
  </div>
</template>

<script>
export default {
  name: 'alterpassword',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#alterpassword{
	width: 300px;
	margin: 50px auto;
}
.input_box{
	margin:20px 0px;
}
.btn-default{
	width: 100px;
	margin-left: 200px;
	margin-top: 20px;
}
</style>
