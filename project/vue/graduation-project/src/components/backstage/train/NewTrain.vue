<template>
	<div id="newtrain">
		<table class="table">
			<tbody>
				<tr>
					<td>课程名称：</td>
					<td>
						<input type="text" v-model="myTrainMes.gname">
					</td>
					<td>学时：</td>
					<td>
						<input type="text" v-model="period" placeholder="只能输入数字" maxlength="3">
					</td>
				</tr>
				<tr>
					<td>开课日期：</td>
					<td>
						<input type="date" v-model="myTrainMes.gstartdate">
					</td>
					<td>结束日期：</td>
					<td>
						<input type="date" v-model="myTrainMes.genddate">
					</td>
				</tr>
				<tr>
					<td>教室：</td>
					<td>
						<input type="text" v-model="myTrainMes.gclassroom">
					</td>
					<td>授课老师：</td>
					<td>
						<input type="text" v-model="myTrainMes.gteacher">
					</td>
				</tr>
				<tr>
					<td>上课时间：</td>
					<td>
						<input type="text" v-model="myTrainMes.gschooltime">
					</td>
					<td>限制人数：</td>
					<td>
						<input type="text" v-model="maxPerson" placeholder="只能输入数字">
					</td>
				</tr>
			</tbody>
		</table>
		<slot>
			<a class="btn btn-info" @click="addnewcourse">添加</a>
		</slot>
		<a class="btn btn-primary" v-if="fromlist" @click="changeTrain">修改</a>
	</div>
</template>

<script>
export default {
  data () {
    return {
      myTrainMes: this.changeMes ? this.changeMes : {},
      maxPerson: this.changeMes ? this.changeMes.glimitperson : null,
      period: this.changeMes ? this.changeMes.gperiod : null,
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  props: ['fromlist', 'changeMes'],
  watch: {
    maxPerson (newVal) {
      this.maxPerson = newVal.replace(/[^\d]/g, '')
      this.myTrainMes.glimitperson = this.maxPerson
    },
    period (newVal) {
      this.period = newVal.replace(/[^\d]/g, '')
      this.myTrainMes.gperiod = this.period
    },
    changeMes: {
      handler: (newVal, oldVal) => {
        this.myTrainMes = newVal
        this.maxPerson = newVal.glimitperson
        this.period = newVal.gperiod
      },
      deep: true
    }
  },
  methods: {
    addnewcourse () {
      this.$http.post(this.houtai_url + 'new_course', this.myTrainMes)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.$router.push('/admin/trainlist')
        }
      }, (res) => {
        console.log(res)
      })
    },
    changeTrain () {
      this.$http.post(this.houtai_url + 'change_course', this.myTrainMes)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.$emit('changeTrain')
        }
      }, (res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
input{
	width: 155px;
}
.table{
	width: 90%;
	margin: 60px;
}
.btn{
	margin: 20px 20px 20px 60px;
	width: 150px;
}
</style>
