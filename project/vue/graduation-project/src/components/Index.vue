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
            <img src="../assets/arrow.png" v-bind:class="{rotate_90:!activeList.two}">
            <a href="javascript:;" class="nav-link" v-on:click="activeList.two = !activeList.two">统一培训</a>
            <transition name="fade">
              <ul class="sub-nav" v-show="activeList.two">
                <li class="sub"><router-link to="/index/train/trainapply" active-class="active">培训报名</router-link></li>
                <li class="sub"><router-link to="/index/train/mytrain" active-class="active">我的培训</router-link></li>
              </ul>
            </transition>
          </li>

          <li class="nav">
            <img src="../assets/arrow.png" v-bind:class="{rotate_90:!activeList.three}">
            <a href="javascript:;" class="nav-link" v-on:click="activeList.three = !activeList.three">自主学习</a>
            <transition name="fade">
              <ul class="sub-nav" v-show="activeList.three">
                <li class="sub"><router-link to="/index/study/applyforlearn" active-class="active">课程列表</router-link></li>
                <li class="sub"><router-link to="/index/study/learnsummarize" active-class="active">我的课程</router-link></li>
              </ul>
            </transition>
          </li>

          <li class="nav">
            <img src="../assets/arrow.png" v-bind:class="{rotate_90:!activeList.one}">
            <a href="javascript:;" class="nav-link" v-on:click="activeList.one = !activeList.one">个人中心</a>
            <transition name="fade"> 
              <ul class="sub-nav" v-show="activeList.one">
                <li class="sub"><router-link to="/index/personal/message" active-class="active">个人信息</router-link></li>
<!--                 <li class="sub"><router-link to="/index/personal/studycourse" active-class="active">学习历程</router-link></li> -->
                <li class="sub"><router-link to="/index/personal/alterpassword" active-class="active">修改密码</router-link></li>
              </ul>
            </transition>
          </li>

          <li class="nav"><router-link to="/index/summary" class="nav-link" active-class="active">总结</router-link></li>
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

<style scoped>
#main{
  height: 100%;
  overflow: hidden;
}
header{
  height: 70px;
  width: 100%;
  background-color: #75B3E8;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 2px #75B3E8;

}
header h2{
  display: inline-block;
  height: 70px;
  line-height: 70px;
  margin-left: 30px;
  font-size: 22px;
  color: #fff;
}
header .btn-danger{
  height: 30px;
  width: 90px;
  margin:20px 30px 0 0;
  line-height: 14px;
}
.container-box{
  height: 100%;
  text-align: left;
}
.container-box .sidebar{
  display: inline-block;
  width: 180px;
  height: 100%;
  box-shadow: 2px 0 6px #eee;
  padding-top: 10px;
}
.container-box .sidebar .active{
  background-color: #75B3E8;
  color: #fff !important;
}
.container-box .context{
  display: inline-block;
  vertical-align: top;
}
.sub-nav a{
  margin-left: 40px;
  text-indent: 1em;
  color: #000;
  display: block;
}
.sub-nav a:hover {
  background-color: #f1f1f1;
  color: #75B3E8;
}

.nav-list .nav {
  line-height: 40px;
}
.nav-list .nav>a:hover{
  background-color: #f1f1f1;
}
.nav-list .nav>a.active:hover{
  background-color: #75B3E8;
}
.nav-list .nav>img{
  width: 16px;
  height: 16px;
  float: right;
  margin: 13px 15px 0 0;
  transition: transform .377s linear;
}
.rotate_90{
  transform: rotate(90deg);
}
.nav-list .nav .nav-link {
  color: #000;
  display: block;
  padding-left: 20px;
  font-size: 15px;
}
.fade-enter-active {
  transition: all .377s linear;
}
.fade-leave-active {
  transition: all .377s linear;
}
.fade-enter, .fade-leave-active {
  transform: translateY(0px);
  opacity: 0;
}
.context {
  width: 85%;
}
</style>
