<template>
	<div id="trainlist">
		<new-train v-if="showchange" :fromlist="true" :changeMes="changeTrainMes" v-on:changeTrain="changeSuccess">
			<a class="btn btn-default" @click="showchange=!showchange">返回</a>
		</new-train>
		<delete-train v-if="deleteflag">
			<h5>确认删除该课程？</h5>
			<a class="btn btn-default" @click="deleteflag=!deleteflag">取消</a>
			<a class="btn btn-danger" @click="delTrain">删除</a>
		</delete-train>
		<now-people v-if="nowflag" :fromCourseMes="courseMes">
			<a class="btn btn-default" @click="nowflag=!nowflag">返回</a>
		</now-people>
		<table class="table table-bordered table-hover" v-if="!showchange && !nowflag">
			<thead>
				<tr>
					<th>编号</th>
					<th>课程名称</th>
					<th>学时</th>
					<th>开课日期</th>
					<th>结束日期</th>
					<th>地点</th>
					<th>授课老师</th>
					<th>上课时间</th>
					<th>名额</th>
					<th>当前人数</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in courseList">
					<td>{{item.gid}}</td>
					<td>{{item.gname}}</td>
					<td>{{item.gperiod}}</td>
					<td>{{item.gstartdate}}</td>
					<td>{{item.genddate}}</td>
					<td>{{item.gclassroom}}</td>
					<td>{{item.gteacher}}</td>
					<td>{{item.gschooltime}}</td>
					<td>{{item.glimitperson}}</td>
					<td><a href="javascript:;" @click="showNowPeople(item.gid, item.gstate)">{{item.gnowperson}}</a></td>
					<td>
						<a class="btn btn-info" @click="showchange=!showchange;changeTrainMes=item">修改</a>
						<a class="btn btn-danger" @click="deleteflag=!deleteflag;deleteID=item.gid">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import newtrain from './NewTrain'
import deleteTrain from '../../common/deleteAlter'
import nowpeople from './NowPeople'
export default {
  data () {
    return {
      showchange: false,
      courseList: [],
      deleteflag: false,
      deleteID: 0,
      changeTrainMes: {},
      nowflag: false,
      courseMes: {}
    }
  },
  components: {
    'new-train': newtrain,
    'delete-train': deleteTrain,
    'now-people': nowpeople
  },
  methods: {
    getcourselist () {
      this.$http.get('http://localhost:3000/get_allcourse')
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.courseList = res.data.courselist
        }
      }, (res) => {
        console.log(res)
      })
    },
    delTrain () {
      this.$http.post('http://localhost:3000/delete_course', {gid: this.deleteID})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.deleteflag = !this.deleteflag
          this.getcourselist()
        }
      }, (res) => {
        console.log(res)
      })
    },
    changeSuccess () {
      this.showchange = !this.showchange
      this.getcourselist()
    },
    showNowPeople (courseid, flag) {
      this.nowflag = !this.nowflag
      this.courseMes.ifEnd = flag
      this.courseMes.courseid = courseid
    }
  },
  created () {
    this.getcourselist()
  }
}
</script>

<style scoped>
.table{
	width: 100%;
	margin: 60px;
}
.table th:last-child{
	text-align: center;
	width: 200px;
}
.table td:last-child{
	display: flex;
	justify-content: space-around;
}
.table .btn{
	width: 80px;
}
</style>
