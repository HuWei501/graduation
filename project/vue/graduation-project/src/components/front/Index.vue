<template>
  <div id="main">
    <header-nav :username="name"></header-nav>
    <div class="container-box">
      <side-bar :barmes="sideList_normal"></side-bar>
      <div class="context">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headernav from '../common/headernav'
import sidebar from '../common/sidebar'
export default {
  name: 'index',
  data () {
    return {
      name: '员工',
      sideList_normal: [
        {
          stairTitle: '统一培训',
          flag: true,
          child: [
            {
              secondTitle: '培训报名',
              url: '/index/train/trainapply'
            },
            {
              secondTitle: '我的培训',
              url: '/index/train/mytrain'
            }
          ]
        },
        {
          stairTitle: '自主学习',
          flag: false,
          child: [
            {
              secondTitle: '资料列表',
              url: '/index/study/applyforlearn'
            },
            {
              secondTitle: '我的记录',
              url: '/index/study/learnsummarize'
            }
          ]
        },
        {
          stairTitle: '个人中心',
          flag: false,
          child: [
            {
              secondTitle: '个人信息',
              url: '/index/personal/message'
            },
            {
              secondTitle: '修改密码',
              url: '/index/personal/alterpassword'
            }
          ]
        },
        {
          stairTitle: '总结',
          url: '/index/summary'
        }
      ]
    }
  },
  components: {
    'header-nav': headernav,
    'side-bar': sidebar
  },
  created () {
    if (this.$store.state.loginMes.gtype !== 1) {
      alert('请先登录')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
#main{
  height: 100%;
}
.container-box{
  text-align: left;
  padding: 70px 0 0 180px;
}
.context {
  width: 85%;
  display: inline-block;
  vertical-align: top;
}
</style>
