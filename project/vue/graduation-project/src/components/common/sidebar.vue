<template>
  <div class="sidebar">
    <ul class="nav-list">
      <li class="nav" v-for="item in barmes">
        <div v-if="item.child">
          <img src="../../assets/arrow.png" v-bind:class="{rotate_90:!item.flag}">
          <a href="javascript:;" class="nav-link" v-on:click="item.flag = !item.flag">{{item.stairTitle}}</a>
          <transition name="fade">
            <ul class="sub-nav" v-show="item.flag">
              <li class="sub" v-for="second in item.child">
                <router-link :to="second.url" active-class="active">{{second.secondTitle}}</router-link>
              </li>
            </ul>
          </transition>
        </div>
        <div v-if="!item.child">
          <router-link :to="item.url" class="nav-link" active-class="active">{{item.stairTitle}}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['barmes']
}
</script>

<style scoped>
.sidebar{
  display: inline-block;
  width: 180px;
  height: 100%;
  box-shadow: 2px 0 6px #eee;
  padding-top: 10px;
}
.sidebar .active{
  background-color: #75B3E8 !important;
  color: #fff !important;
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
.nav-list .nav>div>a:hover{
  background-color: #f1f1f1;
}
.nav-list .nav>div>a.active:hover{
  background-color: #75B3E8;
}
.nav-list .nav>div>img{
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
</style>
