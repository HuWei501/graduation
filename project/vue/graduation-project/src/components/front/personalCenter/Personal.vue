<template>
  <div id="personal">
    <table class="table table-bordered">
	    <tbody>
	    	<tr>
	    		<td>员工编号:</td>
	    		<td>{{gmes.id}}</td>
	    		<td>电话:</td>
	    		<td>{{gmes.tel}}</td>
	    	</tr>
	    	<tr>
	    		<td>姓名:</td>
	    		<td>{{gmes.name}}</td>
	    		<td>电子邮箱:</td>
	    		<td>{{gmes.email}}</td>
	    	</tr>
			<tr>
	    		<td>性别:</td>
	    		<td>{{gmes.sex ? '男' : '女'}}</td>
	    		<td>身份证:</td>
	    		<td>{{gmes.identityCard}}</td>
	    	</tr>
	    	<tr>
	    		<td>出生年月:</td>
	    		<td>{{gmes.borthdate}}</td>
	    		<td>籍贯:</td>
	    		<td>{{gmes.nativePlace}}</td>
	    	</tr>
	    	<tr>
	    		<td>职位:</td>
	    		<td>{{gmes.position}}</td>
	    		<td>学历:</td>
	    		<td>{{gmes.education}}</td>
	    	</tr>
	    	<tr>
	    		<td>入职日期:</td>
	    		<td>{{gmes.workdate}}</td>
	    		<td>邮政编码:</td>
	    		<td>{{gmes.zipCode}}</td>
	    	</tr>
	    	<tr>
	    		<td>政治面貌:</td>
	    		<td>{{gmes.politics}}</td>
	    		<td>家庭地址:</td>
	    		<td>{{gmes.adress}}</td>
	    	</tr>
	    	<tr>
	    		<td>学校:</td>
	    		<td>{{gmes.school}}</td>
	    		<td>父亲姓名:</td>
	    		<td>{{gmes.father}}</td>
	    	</tr>
	    	<tr>
	    		<td>民族:</td>
	    		<td>{{gmes.nation}}</td>
	    		<td>母亲姓名:</td>
	    		<td>{{gmes.mother}}</td>
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
      gmes: message
    }
  }
}
var message = {
  id: 1,
  name: '胡伟',
  sex: 1,
  borthdate: '1995-01-04',
  position: 'Web前端',
  workdate: '2016-10-01',
  politics: '团员',
  school: '温州医科大学',
  nation: '汉',
  tel: '18258172071',
  email: '595256187@qq.com',
  identityCard: '33028119950107XXXX',
  nativePlace: '浙江余姚',
  education: '本科',
  zipCode: '315400',
  adress: '',
  father: '',
  mother: ''
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
