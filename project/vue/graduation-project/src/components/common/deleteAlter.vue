<template>
	<div class="alter_background">
		<div class="alter_box">
			<p>提示</p>
			<slot>
				<h5>确认删除？</h5>
				<a class="btn btn-default">取消</a>
				<a class="btn btn-danger">删除</a>
			</slot>
		</div>
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
.alter_background{
	position: fixed;
	background-color: rgba(0,0,0,0.3);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 999;
}
.alter_box{
	width: 350px;
	height: 200px;
	margin: 10% 0 0 43%;
	background-color: #fff;
	box-shadow: 0 5px 10px rgba(0,0,0,.2);
	border: 1px solid #f1f1f1;
	border-radius: 5px;
	position: relative;
}
.alter_box p{
	padding: 15px;
	font-weight: bold;
}
.alter_box h5{
	font-size: 20px;
	text-align: center;
	margin: 20px 0;
}
.alter_box .btn{
	position: absolute;
	right: 15px;
	bottom: 15px;
	width: 100px;
}
.alter_box .btn-default{
	right: 125px;
}
</style>
