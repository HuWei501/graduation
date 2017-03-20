<template>
  <div id="myTrain">
  	<div class="select-box">
  		<p>课程状态</p>
	    <select v-model="classState" class="stateSelect">
        <option value ="2">进行中</option>
		    <option value ="1">已报名</option>
		    <option value="3">已结束</option>
	    </select>
  	</div>
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
    			<th>课程结束时间</th>
          <th>成绩</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="item in trainMes" v-if="item.gstate === +classState">
    			<td>{{item.gcourseid}}</td>
          <td>{{item.gname}}</td>
          <td>{{item.gperiod}}</td>
          <td>{{item.gschooltime}}</td>
          <td>{{item.gclassroom}}</td>
          <td>{{item.gteacher}}</td>
          <td>{{item.gstartdate}}</td>
          <td>{{item.genddate}}</td>
          <td>{{item.grade === null ? '暂无' : item.grade}}</td>
    		</tr>
    	</tbody>
    </table>
    <a class="btn btn-default" v-if="fromlist" @click="changeStaffListState(2)">返回</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'myTrain',
  data () {
    return {
      trainMes: [],
      classState: 2,
      userid: this.fuserid ? this.fuserid : this.$store.state.loginMes.gid
    }
  },
  props: ['fromlist', 'fuserid'],
  methods: {
    ...mapActions([
      'changeStaffListState'
    ])
  },
  created () {
    this.$http.post('http://localhost:3000/applyedCourse', {gid: this.userid})
    .then((res) => {
      console.log(res.data)
      if (res.data.success) {
        this.trainMes = res.data.applyedCourseList
      } else {
        alert(res.data.msg)
      }
    }, (res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
#myTrain .select-box{
	margin:40px 60px;
}
#myTrain .select-box>p{
	display: inline-block;
	margin-right: 15px;
}
#myTrain .stateSelect{
  width: 135px;
  height: 35px;
  font-size: 16px;
  font-family: 'Microsoft YaHei';
  padding-left: 10px;
  border-radius: 5px;
}
#myTrain .table{
	margin:0 60px;
	width: 90%;
}
.btn{
  margin: 30px 60px;
  width: 150px;
}
/*#myTrain .table th:nth-child(2),
#myTrain .table th:nth-child(4){
	width: 280px;
}
#myTrain .table th:nth-child(5),
#myTrain .table th:nth-child(6){
	width: 180px;
}
#myTrain .table th:nth-child(9),
#myTrain .table th:nth-child(7),
#myTrain .table th:nth-child(8){
	width: 180px;
}*/
#myTrain .table th,
#myTrain .table td{
	padding-left: 15px;
}

</style>
