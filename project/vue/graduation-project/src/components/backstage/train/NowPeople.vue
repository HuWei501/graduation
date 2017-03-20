<template>
	<div class="nowpeople">
		<div class="btn-box">	
			<slot></slot>
		</div>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>员工编号</th>
					<th>姓名</th>
					<th>性别</th>
					<th>电话</th>
					<th>职位</th>
					<th>邮箱</th>
					<th v-if="fromCourseMes.ifEnd">成绩</th>
					<th v-if="fromCourseMes.ifEnd">操作</th>
					<th v-if="fromdata">学习时长</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in staffList">
					<td>{{item.guserid}}</td>
					<td>{{item.gname}}</td>
					<td>{{item.gsex === 1 ? '男' : '女'}}</td>
					<td>{{item.gtel}}</td>
					<td>{{item.gposition}}</td>
					<td>{{item.gemail}}</td>
					<td v-if="fromCourseMes.ifEnd"><input v-model.number="item.grade"></td>
					<td v-if="fromCourseMes.ifEnd">
						<a class="btn btn-info" @click="changeGrade(item.grade, item.guserid)">修改</a>
					</td>
					<td v-if="fromdata">{{Math.floor(item.glearntime/60)}}分钟</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
  data () {
    return {
      staffList: []
    }
  },
  props: ['fromCourseMes', 'fromdata'],
  methods: {
    selectApplyStaffList () {
      this.$http.post('http://localhost:3000/applyStaffList', {gcourseid: this.fromCourseMes.courseid})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.staffList = res.data.stafflist
        }
      }, (res) => {
        console.log(res)
      })
    },
    changeGrade (grade, userid) {
      if (typeof grade !== 'number') {
        alert('请输入数字')
      } else {
        this.$http.post('http://localhost:3000/changeStaffGrade', {
          grade: grade,
          guserid: userid,
          gcourseid: this.fromCourseMes.courseid
        }).then((res) => {
          console.log(res.data)
          if (res.data.success) {
            alert(res.data.msg)
            this.selectApplyStaffList()
          } else {
            alert(res.data.msg)
          }
        }, (res) => {
          console.log(res)
        })
      }
    },
    selectLearnedStaff () {
      this.$http.post('http://localhost:3000/learnedStaffList', {gdataid: this.fromCourseMes.dataid})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.staffList = res.data.stafflist
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  created () {
    if (this.fromdata) {
      this.selectLearnedStaff()
    } else {
      this.selectApplyStaffList()
    }
  }
}
</script>

<style scoped>
.btn-box{
	margin: 60px 0 30px 60px;
}
.btn{
	width: 150px;
}
.table{
	margin-left: 60px;
	width: 90%;
}
.table th,
.table td{
	padding-left: 10px;
}
.table th:last-child{
	text-align: center;
	width: 180px;
}
.table td:last-child{
	display: flex;
	justify-content: space-around;
}
.table td input{
	padding-left: 5px;
}
.table td .btn{
	width: 80px;
}
</style>
