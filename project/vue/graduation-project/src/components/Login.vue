<template>
  <div class="hello">
    <h2 class="title">企业培训管理系统</h2>
    <div class="login-container">
      <h5>登 录</h5>
      <form id="login-form"> 
        <p>帐号</p>
        <input type="text" name="username" v-model.trim="username" v-on:keyup.13="login">
        <p class="input-reminder">请输入用户名</p>
        <p>密码</p>
        <input type="password" name="password" v-model="password" v-on:keyup.13="login">
        <p class="input-reminder">请输入密码</p>
        <a class="btn btn-primary" v-on:click="login">登 录</a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function (event) {
      if (this.username && this.password) {
        window.location.href = 'index/train/trainapply'
        // this.$http.post('http://localhost:3000/user_login', {
        //   account: this.username,
        //   pwd: this.password
        // }).then((response) => {
        //   console.log(response.data)
        //   if (response.data.success) {
        //     // window.location.href = 'index/train/trainapply'
        //   } else {
        //     alert(response.data.msg)
        //   }
        // }, (response) => {
        //   console.log(response)
        // })
      } else {
        alert('帐号密码不能为空')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background: url(../assets/loginbackground.jpg) 0 0 no-repeat;
  background-size: cover;
  width: 100%;
  height: 915px;
  position: relative;
}
.title{
  position: absolute;
  font-size: 35px;
  top: 50px;
  left: 50px;
  color:#fff;
}
.login-container{
  width: 300px;
  height: 420px;
  background-color: rgba(255,255,255,.6);
  position: absolute;
  top: 200px;
  right: 250px;
  text-align: left;
  padding-left: 40px;
  border: 1px solid transparent;
  border-color: #ddd;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  border-radius: 3px;
}
.login-container h5{
  color: #333;
  font-size: 25px;
  margin:45px 0 15px;
  font-weight: 500;
}
.login-container p{
  margin-top:30px;
  font-size: 13px;
  color: #333;
  font-weight: 700;
  margin-bottom: 5px;
}
.login-container .input-reminder{
  margin-top: 5px;
  margin-bottom: 10px;
  color: #737373;
  font-weight: normal;
}
.login-container input{
  display: block;
  width: 225px;
  height: 27px;
  padding: 3px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: rgba(255,255,255,.6);
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}
.login-container .btn-primary{
  width: 225px;
  height: 35px;
  font-size: 16px;
  margin-top: 30px;
}

</style>
