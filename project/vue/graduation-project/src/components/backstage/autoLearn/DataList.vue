<template>
	<div id="datalist">
		<change-data v-if="showchange">
			<a class="btn btn-default" v-on:click="showchange = !showchange">返回</a>
			<a class="btn btn-primary">修改</a>
		</change-data>
		<table class="table table-bordered table-hover" v-if="!showchange">
			<thead>
				<tr>
					<th>编号</th>
					<th>资料名称</th>
					<th>页数</th>
					<th>学习人数</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>web入门</td>
					<td>30</td>
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
import changedata from './NewData'
export default {
  data () {
    return {
      showchange: false
    }
  },
  components: {
    'change-data': changedata
  }
}
</script>

<style scoped>
.table{
	width: 60%;
	margin: 60px;
}
.table th:last-child{
	text-align: center;
	width: 220px;
}
.table td:last-child{
	display: flex;
	justify-content: space-around;
}
.table .btn{
	width: 80px;
}
</style>
