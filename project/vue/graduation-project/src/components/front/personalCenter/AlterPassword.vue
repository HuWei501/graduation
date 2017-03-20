<template>
  <div id="alterpassword">
  	<div class="input_box">
		<label>旧密码：</label>
		<input type="password" class="old form-control" v-model="oldpwd">
  	</div>
  	<div class="input_box">
		<label>新密码：</label>
		<input type="password" class="new form-control" v-model="newpwd">
  	</div>
  	<div class="input_box">
		<label>确认密码：</label>
		<input type="password" class="confirm form-control" v-model="affirmpwd">
  	</div>
  	<a href="javascript:;" class="btn btn-default" @click="changePassword">修改</a>
  </div>
</template>

<script>
export default {
  name: 'alterpassword',
  data () {
    return {
      oldpwd: '',
      newpwd: '',
      affirmpwd: ''
    }
  },
  methods: {
    changePassword () {
      if (this.newpwd === this.affirmpwd) {
        this.$http.post('http://localhost:3000/change_password', {
          gid: this.$store.state.loginMes.gid,
          gnewpwd: this.newpwd,
          goldpwd: this.oldpwd
        }).then((res) => {
          alert(res.data.msg)
          this.oldpwd = ''
          this.newpwd = ''
          this.affirmpwd = ''
        }, (res) => {
          console.log(res)
        })
      } else {
        alert('两次密码不一致')
      }
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
