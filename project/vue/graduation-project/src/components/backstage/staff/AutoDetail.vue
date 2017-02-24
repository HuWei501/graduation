<template>
	<div id="autodetail">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>资料编号</th>
					<th>资料名称</th>
					<th>学习进度</th>
					<th>学习用时</th>
					<th>资料总页数</th>
					<th>开始学习日期</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>锋利的jQery</td>
					<td>10%</td>
					<td>20分钟</td>
					<td>100页</td>
					<td>2017-02-02</td>
				</tr>
			</tbody>
		</table>
		<slot></slot>
	</div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.table{
	margin: 60px;
	width: 90%;
}
.btn{
	margin: 0 60px;
	width: 150px;
}
</style>
