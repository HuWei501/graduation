<template>
	<div id="stafflist">
		<change-mes v-if="showpage===2">
			<div slot="top">	
				<a class="btn btn-info" v-on:click="showpage = 3">培训详情</a>
				<a class="btn btn-info" v-on:click="showpage = 4">自主学习详情</a>
				<a class="btn btn-info" v-on:click="showpage = 5">总结</a>
				<a class="btn btn-danger">重置密码</a>
			</div>
			<div slot="bottom">	
				<a class="btn btn-default" v-on:click="showpage = 1">返回</a>
				<a class="btn btn-primary">修改</a>
			</div>
		</change-mes>
		<learn-detail v-if="showpage===3">
			<a class="btn btn-default" v-on:click="showpage = 2">返回</a>
		</learn-detail>
		<auto-detail v-if="showpage===4">
			<a class="btn btn-default" v-on:click="showpage = 2">返回</a>
		</auto-detail>
		<self-summary v-if="showpage===5">
			<a class="btn btn-default" v-on:click="showpage =2">返回</a>
		</self-summary>
		<table class="table table-bordered table-hover" v-if="showpage===1">
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
				<tr>
					<td>1</td>
					<td>胡伟</td>
					<td>男</td>
					<td>15068232038</td>
					<td>WEB前端开发</td>
					<td>595256187@qq.com</td>
					<td>
						<a class="btn btn-info" v-on:click="showpage = 2">详情</a>
						<a class="btn btn-danger">删除</a>
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
export default {
  data () {
    return {
      showpage: 1
    }
  },
  components: {
    'change-mes': newstaff,
    'learn-detail': learndetail,
    'auto-detail': autodetail,
    'self-summary': summary
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
