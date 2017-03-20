<template>
  <div id="personal">
    <table class="table table-bordered">
	    <tbody>
	    	<tr>
	    		<td>员工编号:</td>
	    		<td>{{gmes.gid}}</td>
	    		<td>帐号:</td>
	    		<td>{{gmes.gaccount}}</td>
	    	</tr>
	    	<tr>
	    		<td>姓名:</td>
	    		<td>{{gmes.gname}}</td>
	    		<td>性别:</td>
	    		<td>{{gmes.gsex ? '男' : '女'}}</td>
	    	</tr>
			<tr>
	    		<td>职位:</td>
	    		<td>{{gmes.gposition}}</td>
	    		<td>身份证:</td>
	    		<td>{{gmes.gidentity}}</td>
	    	</tr>
	    	<tr>
	    		<td>电子邮箱:</td>
	    		<td>{{gmes.gemail}}</td>
	    		<td>电话:</td>
	    		<td>{{gmes.gtel}}</td>
	    	</tr>
	    	<tr>
	    		<td>出生年月:</td>
	    		<td>{{gmes.gborthdate}}</td>
	    		<td>入职日期:</td>
	    		<td>{{gmes.gworkdate}}</td>
	    	</tr>
	    	<tr>
	    		<td>政治面貌:</td>
	    		<td>{{gmes.gpolitics}}</td>
	    		<td>民族:</td>
	    		<td>{{gmes.gnation}}</td>
	    	</tr>
	    	<tr>
	    		<td>邮政编码:</td>
	    		<td>{{gmes.gzipcode}}</td>
	    		<td>家庭地址:</td>
	    		<td>{{gmes.gadress}}</td>
	    	</tr>
	    	<tr>
	    		<td>学历:</td>
	    		<td>{{gmes.geducation}}</td>
	    		<td>学校:</td>
	    		<td>{{gmes.gschool}}</td>
	    	</tr>
	    	<tr>
	    		<td>籍贯:</td>
	    		<td>{{gmes.gnative}}</td>
	    		<td>父亲姓名:</td>
	    		<td>{{gmes.gfather}}</td>
	    	</tr>
	    	<tr>    		
	    		<td>母亲姓名:</td>
	    		<td>{{gmes.gmother}}</td>
	    	</tr>
    	</tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'personal',
  data () {
    return {
      gmes: this.$store.state.loginMes
    }
  }
}
</script>

<style scoped>
#personal{
	margin:60px auto;
	width: 80%;
}
.table td{
	padding-left: 15px;
	font-size: 15px;
}
.table td:nth-child(1),
.table td:nth-child(3){
	width: 200px;
}
.table td:nth-child(2),
.table td:nth-child(4){
	width: 250px;
}
</style>
