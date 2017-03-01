<template>
	<div id="newstaff">
		<slot name="top"></slot>
		<table class="table">
			<tbody>
				<tr>
					<td>姓名：</td>
					<td>
						<input type="text">
					</td>
					<td>性别：</td>
					<td>
						<select>
							<option value="1">男</option>
							<option value="0">女</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>出生年月：</td>
					<td><input type="date"></td>
					<td>职位：</td>
					<td>
						<select>
							<option value="1">前端开发</option>
							<option value="0">JAVA</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>入职日期：</td>
					<td><input type="date"></td>
					<td>政治面貌：</td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td>学校：</td>
					<td><input type="text"></td>
					<td>民族：</td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td>电话：</td>
					<td><input type="text"></td>
					<td>电子邮箱：</td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td>身份证：</td>
					<td><input type="text"></td>
					<td>籍贯：</td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td>学历：</td>
					<td><input type="text"></td>
					<td>邮政编码：</td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td>家庭地址：</td>
					<td><input type="text"></td>
					<td>父亲姓名：</td>
					<td><input type="text"></td>
				</tr>
				<tr>
					<td>母亲姓名：</td>
					<td><input type="text"></td>
				</tr>
			</tbody>
		</table>
		<slot name="bottom">
			<a class="btn btn-info">添加</a>
		</slot>
	</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#newstaff{
	padding: 60px;
}
.table{
	width: 90%;
}
input{
	width: 155px;
}
.btn{
	margin: 20px 20px 20px 0;
	width: 150px;
}

</style>
