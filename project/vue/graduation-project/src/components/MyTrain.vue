<template>
  <div id="myTrain">
  	<div class="select-box">
  		<p>课程状态</p>
	    <select v-model="classState" class="stateSelect">
        <option value ="learning">进行中</option>
		    <option value ="applying">已报名</option>
		    <option value="end">已结束</option>
	    </select>
  	</div>
    <table class="table table-bordered">
    	<thead>
    		<tr>
          <th>课程编号</th>
    			<th>课程</th>
    			<th>学时</th>
    			<th>上课时间</th>
    			<th>地点</th>
    			<th>老师</th>
    			<th>课程开始时间</th>
    			<th>课程结束时间</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="item in trainMes">
    			<td v-for="object in item">{{object}}</td>
    		</tr>
    	</tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'myTrain',
  data () {
    return {
      trainMes: trainMes1,
      classState: 'learning'
    }
  },
  watch: {
    classState: function (result) {
      if (result === 'learning') {
        this.trainMes = trainMes1
      } else if (result === 'applying') {
        this.trainMes = trainMes2
      } else {
        this.trainMes = trainMes3
      }
    }
  }
}

var trainMes1 = [
  {
    id: 100001,
    className: 'WEB前端',
    period: 20,
    time: '周三下午4点-6点',
    adress: '求知楼102',
    author: '小新',
    startTime: '2016-03-04',
    endTime: ''
  },
  {
    id: 100002,
    className: 'Java基础教学',
    period: 25,
    time: '周一上午10点-11点',
    adress: '求是楼302',
    author: '七条香蕉',
    startTime: '2016-03-04',
    endTime: ''
  }
]
var trainMes2 = [
  {
    id: 100003,
    className: 'JavaScript高级编程',
    period: 30,
    time: '周五下午18点-19点',
    adress: '求新楼321',
    author: '天才小熊猫',
    startTime: '2016-03-04',
    endTime: ''
  },
  {
    id: 100004,
    className: 'WEB前端',
    period: 20,
    time: '周三下午4点-6点',
    adress: '求知楼102',
    author: '小新',
    startTime: '2016-03-04',
    endTime: ''
  }
]
var trainMes3 = [
  {
    id: 100005,
    className: 'Java基础教学',
    period: 25,
    time: '周一上午10点-11点',
    adress: '求是楼302',
    author: '七条香蕉',
    startTime: '2016-03-04',
    endTime: '2016-05-31'
  },
  {
    id: 100006,
    className: 'JavaScript高级编程',
    period: 30,
    time: '周五下午18点-19点',
    adress: '求新楼321',
    author: '天才小熊猫',
    startTime: '2016-03-04',
    endTime: '2016-05-31'
  }
]
</script>

<style scoped>
#myTrain .select-box{
	margin:60px;
}
#myTrain .select-box>p{
	display: inline-block;
	margin-right: 15px;
}
#myTrain .stateSelect{
    width: 150px;
    height: 40px;
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    padding-left: 10px;
    border-radius: 5px;
}
#myTrain .table{
	margin:0 60px;
	width: 90%;
}
#myTrain .table th:nth-child(2),
#myTrain .table th:nth-child(4){
	width: 280px;
}
#myTrain .table th:nth-child(5),
#myTrain .table th:nth-child(6){
	width: 180px;
}
#myTrain .table th:nth-child(9),
#myTrain .table th:nth-child(7),
#myTrain .table th:nth-child(8){
	width: 180px;
}
#myTrain .table th,
#myTrain .table td{
	padding-left: 15px;
}

</style>
