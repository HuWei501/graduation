<template>
  <div id="applyforlearn">
  	<div class="tabs">
  		<ul class="tablist">
  			<li class="is-flex" v-bind:class="{active: select[1]}" v-on:click="changeState(1)"><a><span>推荐</span></a></li
  			><li class="is-flex" v-bind:class="{active: select[2]}" v-on:click="changeState(2)"><a><span>全部</span></a></li>
  		</ul>
  	</div>
	<div class="tab-content">
		<div class="course-wrap" v-for="item in dataList">
			<a v-on:click="onClick(item.id)">
				<div class="course-box">
					<img src="../assets/cousebackgournd.jpg">
					<div class="course-intro">
						<h3>{{item.title}}</h3>
						<p>{{item.introduction}}</p>
					</div>
					<div class="course-bottom">
						<p>{{item.learnNumber}}在学</p>
						<p class="continue" v-if="item.state">继续学习</p>
					</div>
				</div>
			</a>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'applyforlearn',
  data () {
    return {
      select: {
        1: true,
        2: false
      },
      dataList: data
    }
  },
  methods: {
    changeState: function (j) {
      for (let i = 1; i <= 2; i++) {
        i === j ? this.select[i] = true : this.select[i] = false
      }
    },
    onClick: function (id) {
      console.log(id)
    }
  }
}

var data = [
  {
    id: 1,
    imgurl: '../assets/cousebackgournd.jpg',
    title: 'WEB前端',
    introduction: '前端是一门新技术',
    learnNumber: '123',
    state: false
  },
  {
    id: 2,
    imgurl: '../assets/cousebackgournd.jpg',
    title: 'JAVA进阶',
    introduction: '该资料主要讲解了JAVA的一些进阶内容',
    learnNumber: '99',
    state: true
  }
]
</script>

<style scoped>
#applyforlearn .tabs{
	margin: 30px;
	width: 50%;
}
#applyforlearn .tablist{
	border-bottom: 1px solid #dbdbdb;
}
#applyforlearn .tablist .is-flex{
	display: inline-block;
	vertical-align: top;
	height: 36px;
}
#applyforlearn .tablist .is-flex a{
	display: block;
	width: 72px;
	height: 37px;
	padding:6px 12px;
	text-align: center;
	border-bottom: 1px solid #dbdbdb;
	color: #4a4a4a;
	font-size: 16px;
	cursor: pointer;
}
#applyforlearn .tablist .active a{
	border-bottom: 1px solid #00d1b2;
	color: #00d1b2;
}
#applyforlearn .tab-content{
	margin:0 30px;
}
#applyforlearn .tab-content .course-wrap{
	display: inline-block;
	vertical-align: top;
	margin: 10px;
	box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
	cursor: pointer;
}
#applyforlearn .tab-content .course-box{
	width: 224px;
    height: 172px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
}
#applyforlearn .tab-content .course-box img{
	height: 124px;
	width: 100%;
}
#applyforlearn .tab-content .course-box .course-intro{
	box-sizing: border-box;
    position: absolute;
    padding: 0 20px;
    transition: top .5s;
    top: 65px;
    height: 144px;
    width: 100%;
    background-color: rgba(255,255,255,.9);
}
#applyforlearn .tab-content .course-box:hover{
	box-shadow: 0 5px 20px rgba(0,0,0,0.3) !important;
}
#applyforlearn .tab-content .course-box:hover .course-intro{
	top: 30px;
}
#applyforlearn .tab-content .course-box .course-intro h3{
    padding: 16px 0 6px;
    font-size: 14px;
    max-height: 40px;
    overflow: hidden;
    color: #07111b;
    line-height: 21px;
}
#applyforlearn .tab-content .course-box .course-intro p{
	color: #93999f;
    font-size: 12px;
    height: 40px;
    overflow: hidden;
    line-height: 21px;
}
#applyforlearn .tab-content .course-bottom{
	position: absolute;
    padding: 0 20px;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    height: 42px;
    background-color: #fff;
    color: #93999f;
    font-size: 12px;
    line-height: 36px;
}
#applyforlearn .tab-content .course-bottom p{
	display: inline-block;
	vertical-align: top;
}
#applyforlearn .tab-content .course-bottom p.continue{
    color: #33CC00;
    font-weight: bold;
    margin-left: 85px;
}
</style>
