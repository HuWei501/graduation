<template>
  <div id="learnsummarize">
        <ul class="courseOut">
            <li v-for="item in courselists">
                <div class="courseTime">
                    <label class="year">{{item.date.split('-')[0]}}</label><br>
                    <label class="date">{{item.date.split('-')[1]}}月{{item.date.split('-')[2]}}日</label>
                </div>
                <div class="circle"></div>
                <ul class="courseIn">
                    <li v-for="course in item.obj">
                        <a class="courseImg fl">
                            <img v-bind:src="'http://localhost:3000/' + course.gimgurl" alt="class">
                        </a>
                        <div class="courseContent fl">
                            <h3>{{course.gtitle}}</h3>
                            <p>
                                <span class="percent">已学<b>{{Math.floor(course.glearnedpage/course.gpages*1000)/10}}%</b></span>
                                <span class="page">学习至第<b>{{course.glearnedpage}}</b>页</span>
                                <span class="useTime">用时<b>{{Math.floor(course.glearntime/60)}}</b>分</span>
                            </p>
                            <a class="btn btn-success continueStudy" @click="continueStudy(course.gdataID)">继续学习</a>
                        </div>
                        <div style="clear: both"></div>
                    </li>
                </ul>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'learnsummarize',
  data () {
    return {
      courselists: []
    }
  },
  methods: {
    continueStudy (dataid) {
      this.$router.push('/pdf?dataid=' + dataid + '&state=1')
    }
  },
  created () {
    this.$http.post('http://localhost:3000/myDataList', {guserid: this.$store.state.loginMes.gid})
    .then((res) => {
      console.log(res.data)
      if (res.data.success) {
        this.courselists = res.data.dataList
      }
    }, (res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
#learnsummarize{margin-top: 30px;}
.courseOut{width:700px;height:auto;margin:20px auto;border-left:2px solid #eee;margin-bottom: 100px;}

.courseOut>li{position: relative;}
.courseTime{position: absolute;left: -80px;top:0;}
.courseTime>label{display: inline-block;width: 80px;text-align: left;}
.year{font-size: 20px;font-weight: bold;}
.date{line-height: 25px;font-family: '微软雅黑';font-size: 14px;}
.circle{width: 8px;height: 8px;background-color:#ccc; border-radius: 50%;position: absolute;left: -5px;top: 0;}

.courseIn{width: 100%;height: auto;margin-left: 20px;}
.courseIn>li{width:100%;height: 140px;margin: 10px auto 20px;border-bottom: 1px solid #eee; }
.courseImg{width:200px;height: 120px;border: 1px solid #eeeeee;display: inline-block;}
.courseImg>img{width: 100%;height: 100%;}

.courseContent{width: 400px;height: 140px;margin-left: 20px;display: inline-block;vertical-align: top;}
.courseContent>h3{height: 30px;line-height: 30px;font-size: 20px;font-weight: bold;}
.courseContent>p{margin-top: 10px;}
.courseContent>p span{margin-right: 20px;}
.percent{color: red;}
.continueStudy{margin-top: 10px;font-size: 16px;background: #33CC00;}
</style>
