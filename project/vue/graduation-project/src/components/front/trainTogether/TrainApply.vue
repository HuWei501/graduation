<template>
  <div id="trainApply">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>课程编号</th>
          <th>课程</th>
          <th>学时</th>
          <th>课程开始时间</th>
          <th>课程结束日期</th>
          <th>地点</th>
          <th>老师</th>
          <th>上课时间</th>
          <th>限制人数</th>
          <th>当前报名</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in applyCourse">
          <td v-for="object in item">{{object}}</td>
          <td><a class="btn btn-info" @click="courseApply(item.gcourseid)">报名</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'trainApply',
  data () {
    return {
      applyCourse: [],
      userid: this.$store.state.loginMes.gid,
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  methods: {
    getCourseList () {
      this.$http.post(this.houtai_url + 'selectApplyCourse', {gid: this.userid})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.applyCourse = res.data.courseList
        }
      }, (res) => {
        console.log(res)
      })
    },
    courseApply (courseid) {
      this.$http.post(this.houtai_url + 'courseApply', {gid: this.userid, gcourseid: courseid})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          alert(res.data.msg)
          this.getCourseList()
        } else {
          alert(res.data.msg)
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  created () {
    this.getCourseList()
  }
}
</script>

<style scoped>
#trainApply{
	width: 100%;
}
#trainApply .table{
	width: 90%;
	margin: 60px 0 0 60px;
}
#trainApply .table td .btn{
	width: 100px;
}
#trainApply .table th:last-child{
	width: 150px;
}
#trainApply .table td{
  line-height: 31px;
}
#trainApply .table th:last-child,
#trainApply .table td:last-child{
	text-align: center;
}
</style>
