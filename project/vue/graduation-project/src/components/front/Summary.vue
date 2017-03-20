<template>
  <div id="sunmmary">
  	<div class="addnew">
  		<a class="btn btn-default" v-if="fromlist" @click="changeStaffListState(2)">返回</a>
  		<a class="btn btn-primary" @click="showAddBox = !showAddBox">添加新评价</a>
  	</div>
  	<div class="addArea" v-if="showAddBox">
  		<div class="addContent">
  			<h5>请输入评价：</h5>
  			<textarea v-model="assessmentConent"></textarea>
  			<div class="btn-box">
	  			<a class="btn btn-default" @click="showAddBox = !showAddBox">关闭</a>
	  			<a class="btn btn-primary" v-if="!fromlist" @click="addAssessment">确认</a>
	  			<a class="btn btn-primary" v-if="fromlist" @click="addBossAssessment">确认</a>
  			</div>
  		</div>
  	</div>
    <ul class="self-assessment">
	    <h5 class="self_h5">自我评价</h5>
	    <h5 class="boss_h5">BOSS评价</h5>
    	<li v-for="item in assArr">	
	    	<p class="left_date" v-bind:class="item.gtype ? 'left_date' : 'right_date'">{{item.gbuilddate}}</p>
	    	<p class="left_content" v-bind:class="item.gtype ? 'left_content' : 'right_content'">{{item.gassessment}}</p>
    	</li>
    </ul>
  </div>
</template>

<script >
import { mapActions } from 'vuex'
export default {
  name: 'summary',
  data () {
    return {
      showAddBox: false,
      assessmentConent: '',
      assArr: [],
      userid: this.fuserid ? this.fuserid : this.$store.state.loginMes.gid
    }
  },
  props: ['fromlist', 'fuserid'],
  methods: {
    ...mapActions([
      'changeStaffListState'
    ]),
    addAssessment () {
      if (this.assessmentConent) {
        this.$http.post('http://localhost:3000/newAssessment', {
          gid: this.userid,
          gassessment: this.assessmentConent
        }).then((res) => {
          console.log(res.data)
          if (res.data.success) {
            this.assessmentConent = ''
            this.showAddBox = !this.showAddBox
            this.getAssessmentArr()
          } else {
            alert(res.data.msg)
          }
        }, (res) => {
          console.log(res)
        })
      } else {
        alert('内容不能为空')
      }
    },
    addBossAssessment () {
      if (this.assessmentConent) {
        this.$http.post('http://localhost:3000/newBossAssessment', {
          gid: this.userid,
          gassessment: this.assessmentConent
        }).then((res) => {
          console.log(res.data)
          if (res.data.success) {
            this.assessmentConent = ''
            this.showAddBox = !this.showAddBox
            this.getAssessmentArr()
          } else {
            alert(res.data.msg)
          }
        }, (res) => {
          console.log(res)
        })
      } else {
        alert('内容不能为空')
      }
    },
    getAssessmentArr () {
      this.$http.post('http://localhost:3000/getSummary', {guserid: this.userid})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.assArr = res.data.summaryList
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  created () {
    this.getAssessmentArr()
  }
}
</script>

<style scoped>
.addnew{
	margin:60px 0 0 60px;
}
.addnew .btn{
	width: 150px;
	margin-right: 20px;
}
.self-assessment{
	display: inline-block;
	vertical-align: top;
	width: 600px;
	margin:30px 60px 0px;
	padding-right: 60px;
	border-right: 1px solid #aaa;
	position: relative;
	padding-top: 50px;
}
.self-assessment .self_h5,
.self-assessment .boss_h5{
	position: absolute;
	top: 0;
	right: 10%;
	font-size: 16px;
	font-weight: bold;
}
.self-assessment .boss_h5{
	right: -23%;
}
.self-assessment .left_date{
	text-align: right;
	margin-right: -163px;
}
.self-assessment .left_date:before,
.self-assessment .right_date:before{
	content: '';
	display: block;
	width: 20px;
	height: 20px;
	background-color: #199ED8;
	border-radius: 50%;
	margin: 0px -84% -20px 84%;
}
.self-assessment .right_date{
	text-align: right;
	margin-right: -38px;
}
.self-assessment .right_date:before{
	margin: 0px -102% -20px 102%;
	background-color: #FF6600;
}
.self-assessment .left_content,
.self-assessment .right_content{
	margin: -30px 0 20px;
	border:1px solid #d1d1d1;
	padding:10px;
	border-radius: 5px;
}
.self-assessment .right_content{
    margin: -30px -122% 20px 122%;
}
.my-content{
	margin:20px 0;
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
	width: 600px;
	margin:30px auto;
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
.addContent textarea{
	width: 550px;
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
	margin: 15px 25px 15px 0;
	width: 70px;
}
</style>
