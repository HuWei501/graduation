<template>
  <div id="trainApply">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>课程编号</th>
          <th>课程</th>
          <th>学时</th>
          <th>上课时间</th>
          <th>地点</th>
          <th>老师</th>
          <th>课程开始时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in applyCourse">
          <td v-for="object in item">{{object}}</td>
          <td><a class="btn btn-info" v-on:click="signup(item.id)">报名</a></td>
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
      applyCourse: trainMes1
    }
  },
  methods: {
    signup: function (id) {
      alert('报名成功' + id)
    }
  }
}

var trainMes1 = [
  {
    id: 100007,
    className: 'WEB前端',
    period: 20,
    time: '周三下午4点-6点',
    adress: '求知楼102',
    author: '小新',
    startTime: '2016-03-04'
  },
  {
    id: 100008,
    className: 'Java基础教学',
    period: 25,
    time: '周一上午10点-11点',
    adress: '求是楼302',
    author: '七条香蕉',
    startTime: '2016-03-04'
  }
]
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
