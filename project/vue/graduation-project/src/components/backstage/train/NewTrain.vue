<template>
	<div id="newtrain">
		<table class="table">
			<tbody>
				<tr>
					<td>课程名称：</td>
					<td>
						<input type="text">
					</td>
					<td>学时：</td>
					<td>
						<input type="text">
					</td>
				</tr>
				<tr>
					<td>开课日期：</td>
					<td>
						<input type="date">
					</td>
					<td>结束日期：</td>
					<td>
						<input type="date">
					</td>
				</tr>
				<tr>
					<td>地点：</td>
					<td>
						<input type="text">
					</td>
					<td>授课老师：</td>
					<td>
						<input type="text">
					</td>
				</tr>
				<tr>
					<td>上课时间：</td>
					<td>
						<input type="text">
					</td>
				</tr>
			</tbody>
		</table>
		<slot>
			<a class="btn btn-info">添加</a>
		</slot>
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
