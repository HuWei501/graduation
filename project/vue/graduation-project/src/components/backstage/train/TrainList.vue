<template>
	<div id="trainlist">
		<new-train v-if="showchange">
			<a class="btn btn-default" v-on:click="showchange = !showchange">返回</a>
			<a class="btn btn-primary">修改</a>
		</new-train>
		<table class="table table-bordered table-hover" v-if="!showchange">
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
				<tr>
					<td>1</td>
					<td>web入门</td>
					<td>30</td>
					<td>2017-01-02</td>
					<td>2017-03-05</td>
					<td>求知楼102</td>
					<td>小新</td>
					<td>每周三下午3-5点</td>
					<td>100</td>
					<td><a href="#">50</a></td>
					<td>
						<a class="btn btn-info" v-on:click="showchange = !showchange">修改</a>
						<a class="btn btn-danger">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import newtrain from './NewTrain'
export default {
  data () {
    return {
      showchange: false
    }
  },
  components: {
    'new-train': newtrain
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
