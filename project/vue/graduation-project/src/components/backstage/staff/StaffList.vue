<template>
	<div id="stafflist">
		<change-mes v-if="$store.state.staffListState===2" :fromlist="true" :changeMes="changeStaffMes">
			<p slot="account">{{ changeStaffMes.gaccount }}</p>
			<label slot="btnbox">
				<a class="btn btn-info" @click="changeStaffListState(3)">培训详情</a>
				<a class="btn btn-info" @click="changeStaffListState(4)">自主学习详情</a>
				<a class="btn btn-info" @click="changeStaffListState(5)">总结</a>
			</label>
		</change-mes>
		<learn-detail v-if="$store.state.staffListState===3" :fromlist="true" :fuserid="changeStaffMes.gid"></learn-detail>
		<auto-detail v-if="$store.state.staffListState===4" :fromlist="true"></auto-detail>
		<self-summary v-if="$store.state.staffListState===5" :fromlist="true" :fuserid="changeStaffMes.gid">
		</self-summary>
		<delete-staff v-if="delState">
			<h5>确认删除该员工？</h5>
			<a class="btn btn-default" @click="delState=!delState">取消</a>
			<a class="btn btn-danger" @click="delstaff">删除</a>
		</delete-staff>
		<table class="table table-bordered table-hover" v-if="$store.state.staffListState === 1">
			<thead>
				<tr>
					<th>员工编号</th>
					<th>姓名</th>
					<th>性别</th>
					<th>电话</th>
					<th>职位</th>
					<th>邮箱</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in userList">
					<td>{{item.gid}}</td>
					<td>{{item.gname}}</td>
					<td>{{item.gsex === 1 ? '男' : '女'}}</td>
					<td>{{item.gtel}}</td>
					<td>{{item.gpositionname}}</td>
					<td>{{item.gemail}}</td>
					<td>
						<a class="btn btn-info" @click="changeStaffListState(2);changeStaffMes=item">详情</a>
						<a class="btn btn-danger" @click="delState=!delState;delstaffid=item.gid">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import newstaff from './NewStaff'
import learndetail from '../../front/trainTogether/MyTrain'
import autodetail from './AutoDetail'
import summary from '../../front/Summary.vue'
import deleteStaff from '../../common/deleteAlter'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      userList: [],
      changeStaffMes: {},
      delState: false,
      delstaffid: 0
    }
  },
  methods: {
    ...mapActions([
      'changeStaffListState'
    ]),
    delstaff () {
      this.$http.post('http://localhost:3000/delete_user', {gid: this.delstaffid})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.delState = !this.delState
          this.getstafflist()
        }
      }, (res) => {
        console.log(res)
      })
    },
    getstafflist () {
      this.$http.get('http://localhost:3000/get_allstaff')
      .then((res) => {
        console.log(res.data)
        this.userList = res.data.stafflist
      }, (res) => {
        console.log(res)
      })
    }
  },
  components: {
    'change-mes': newstaff,
    'learn-detail': learndetail,
    'auto-detail': autodetail,
    'self-summary': summary,
    'delete-staff': deleteStaff
  },
  created () {
    this.getstafflist()
    this.changeStaffListState(1)
  }
}
</script>

<style scoped>
.table{
	margin: 60px;
	width: 90%;
}
.table th,
.table td{
	padding-left: 10px;
}
.table th:last-child{
	text-align: center;
	width: 250px;
}
.table td:last-child{
	display: flex;
	justify-content: space-around;
}
.table td .btn{
	width: 80px;
}
</style>
