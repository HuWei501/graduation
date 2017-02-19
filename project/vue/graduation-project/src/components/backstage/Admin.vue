<template>
  <div id="main">
    <header-nav :username="name"></header-nav>
    <div class="container-box">
      <side-bar :barmes="sideList_admin"></side-bar>
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
  name: 'admin',
  data () {
    return {
      name: '管理员',
      sideList_admin: [
        {
          stairTitle: '员工管理',
          flag: true,
          child: [
            {
              secondTitle: '新建员工',
              url: '/admin/newstaff'
            },
            {
              secondTitle: '员工列表',
              url: '/admin/stafflist'
            }
          ]
        },
        {
          stairTitle: '培训管理',
          flag: false,
          child: [
            {
              secondTitle: '新建培训',
              url: '/admin/newtrain'
            },
            {
              secondTitle: '培训列表',
              url: '/admin/trainlist'
            }
          ]
        },
        {
          stairTitle: '自主学习管理',
          flag: false,
          child: [
            {
              secondTitle: '新建资料',
              url: '/admin/newdata'
            },
            {
              secondTitle: '资料列表',
              url: '/admin/datalist'
            }
          ]
        },
        {
          stairTitle: '职位管理',
          url: '/admin/position'
        }
      ]
    }
  },
  components: {
    'header-nav': headernav,
    'side-bar': sidebar
  }
}
</script>

<style scoped>
#main{
  height: 100%;
  overflow: hidden;
}
.container-box{
  height: 100%;
  text-align: left;
}
.context {
  width: 85%;
  display: inline-block;
  vertical-align: top;
}
</style>
