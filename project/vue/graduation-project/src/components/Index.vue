<template>
  <div id="main">
    <header>
      <h2>企业培训管理系统</h2>
      <button class="btn btn-danger" v-on:click="loginOut">退出</button>
    </header>
    <div class="container-box">
      <div class="sidebar">
        <ul class="nav-list">
          <li class="nav">
            <a href="javascript:;" class="nav-link" v-on:click="activeList.two = !activeList.two">统一培训</a>
            <transition name="fade">
              <ul class="sub-nav" v-show="activeList.two">
                <li class="sub"><router-link to="/index/train/trainapply" active-class="active">培训报名</router-link></li>
                <li class="sub"><router-link to="/index/train/mytrain" active-class="active">我的培训</router-link></li>
              </ul>
            </transition>
          </li>

          <li class="nav">
            <a href="javascript:;" class="nav-link" v-on:click="activeList.three = !activeList.three">自主学习</a>
            <transition name="fade">
              <ul class="sub-nav" v-show="activeList.three">
                <li class="sub"><router-link to="/index/study/applyforlearn" active-class="active">课程列表</router-link></li>
                <li class="sub"><router-link to="/index/study/learnsummarize" active-class="active">我的课程</router-link></li>
              </ul>
            </transition>
          </li>

          <li class="nav">
            <a href="javascript:;" class="nav-link" v-on:click="activeList.one = !activeList.one">个人中心</a>
            <transition name="fade"> 
              <ul class="sub-nav" v-show="activeList.one">
                <li class="sub"><router-link to="/index/personal/message" active-class="active">个人信息</router-link></li>
                <li class="sub"><router-link to="/index/personal/studycourse" active-class="active">学习历程</router-link></li>
                <li class="sub"><router-link to="/index/personal/alterpassword" active-class="active">修改密码</router-link></li>
              </ul>
            </transition>
          </li>

          <li class="nav"><router-link to="/index/summary" active-class="active">总结</router-link></li>
        </ul>
      </div>
      <div class="context">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      activeList: {
        one: false,
        two: true,
        three: false
      }
    }
  },
  methods: {
    loginOut: function (event) {
      window.location.href = '/'
    }
  }
}
</script>

<style>
#main{
  height: 100%;
  overflow: hidden;
}
header{
  height: 80px;
  width: 100%;
  background-color: #75B3E8;
  display: flex;
  justify-content: space-between;

}
header h2{
  display: inline-block;
  height: 80px;
  line-height: 80px;
  margin-left: 30px;
  color: #fff;
}
header .btn-danger{
  height: 40px;
  width: 80px;
  margin:20px 30px 0 0;
}
.container-box{
  height: 100%;
  text-align: left;
}
.container-box .sidebar{
  text-align: center;
  display: inline-block;
  background-color: #515151;
  width: 250px;
  height: 100%;
}
.container-box .sidebar .active{
  background-color: #357EBD;
}
.container-box .context{
  display: inline-block;
  vertical-align: top;
}
.nav-list a{
  display: block;
  color:#fff;
}
.sub-nav a:hover {
  background-color: #414141;
}

.nav-list .nav {
  line-height: 60px;
  border-bottom: 1px solid #717171;
}

.nav-list .nav .nav-link {
  color: #fff;
  font-size: 
}

.nav-list .nav .sub-nav {
  background-color: #616161;
}
.nav-list .nav .sub-nav .sub{
  border-bottom: 1px solid #717171;
}
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateY(-10px);
  opacity: 0;
}
.context {
  width: 85%;
}
</style>
