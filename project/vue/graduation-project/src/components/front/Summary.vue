<template>
  <div id="sunmmary">
  	<div class="addnew">
  		<a class="btn btn-primary" v-on:click="showAddBox = !showAddBox">添加新评价</a>
  	</div>
  	<div class="addArea" v-if="showAddBox">
  		<div class="addContent">
  			<h5>请输入评价：</h5>
  			<textarea></textarea>
  			<div class="btn-box">
	  			<a class="btn btn-default" v-on:click="showAddBox = !showAddBox">关闭</a>
	  			<a class="btn btn-primary">确认</a>
  			</div>
  		</div>
  	</div>
    <ul class="self-assessment">
	    <h5>自我评价：</h5>
    	<li>	
	    	<p class="my-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
	    	<p class="build-date">2016-04-05</p>
    	</li>
    	<li>	
	    	<p class="my-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
	    	<p class="build-date">2016-04-05</p>
    	</li>
    </ul>
    <ul class="boss-assessment">
	    <h5>BOSS评价：</h5>
    	<li>
	    	<p class="my-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
	    	<p class="build-date">2016-04-05</p>
    	</li>
    </ul>
  </div>
</template>

<script >
export default {
  name: 'summary',
  data () {
    return {
      showAddBox: false
    }
  }
}
</script>

<style scoped>
.addnew{
	margin:60px 0 0 60px;
}
.self-assessment{
	display: inline-block;
	vertical-align: top;
	width: 500px;
	margin:30px 60px 0px;
}
.boss-assessment{
	display: inline-block;
	width: 500px;
	vertical-align: top;
	margin-top: 30px;
}
.my-content{
	margin:20px 0;
}
.build-date{
	text-align: right;
	padding-right: 20px;
}
.addArea{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.5);
}
.addContent{
	width: 600px;
	margin:30px auto;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 5px 15px rgba(0,0,0,.5);
}
.addContent h5{
	height: 60px;
	line-height: 60px;
	padding-left: 15px;
	font-size: 16px;
	font-weight: bold;
}
.addContent textarea{
	width: 570px;
	height: 200px;
	resize: none;
	display: block;
	margin: 0 auto;
	padding: 5px 10px;
	border-radius: 5px;
}
.addContent .btn-box{
	text-align: right;
}
.addContent .btn{
	margin: 15px 15px 15px 0;
	width: 70px;
}
</style>
