<template>
	<div id="position">
		<div class="addArea" v-if="showAddBox">
	  		<div class="addContent">
	  			<h5>请输入新职位：</h5>
	  			<input type="text" name="position">
	  			<div class="btn-box">
		  			<a class="btn btn-default" v-on:click="showAddBox = !showAddBox">取消</a>
		  			<a class="btn btn-primary">确认</a>
	  			</div>
	  		</div>
	  	</div>
		<a class="btn btn-info" v-on:click="showAddBox = !showAddBox">添加</a>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>职位</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Web前端</td>
					<td><a class="btn btn-danger">删除</a></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
  data () {
    return {
      showAddBox: false
    }
  }
}
</script>

<style scoped>
.btn{
	width: 150px;
}
.btn-info{
	margin: 60px 60px 20px;
}
.table{
	margin: 0 60px;
	width: 50%;
}
.table th:last-child,
.table td:last-child{
	width: 250px;
	text-align: center;
}
.addArea{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	background-color: rgba(0,0,0,0.5);
}
.addContent{
	width: 300px;
	margin:100px auto;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 5px 15px rgba(0,0,0,.5);
}
.addContent h5{
	height: 60px;
	line-height: 60px;
	padding-left: 25px;
	font-size: 16px;
	font-weight: bold;
}
.addContent input{
	width: 250px;
	margin: 10px auto;
	margin-left: 25px;
	padding-left: 5px;
}
.addContent .btn-box{
	text-align: right;
}
.addContent .btn{
	margin: 30px 25px 15px 0;
	width: 70px;
}
</style>
