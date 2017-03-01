<template>
	<div id="newdata">
		<div class="form_box">			
			<div class="form-group">
				<label for="data_name">资料名称</label>
				<input type="text" class="form-control" id="data_name">
			</div>
			<div class="form-group">
				<label for="cover_upload">封面上传</label>
				<input type="file" id="cover_upload" accept="image/*">
			</div>
			<div class="form-group">
				<label>简介</label>
				<textarea class="form-control" rows="10"></textarea>
			</div>
			<div class="form-group">
				<label for="pdf_upload">文件上传</label>
				<input type="file" id="pdf_upload" accept="application/pdf">
			</div>
		</div>
		<div class="btn-box">
			<slot>
	  			<a class="btn btn-info">添加</a>
			</slot>			
		</div>
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
textarea{
	resize: none;
}
.form_box{
	width: 30%;
	margin: 60px;
}
.btn-box{
	margin-left: 60px;
}
.btn{
	width: 100px;
	margin-right: 20px;
}
</style>
