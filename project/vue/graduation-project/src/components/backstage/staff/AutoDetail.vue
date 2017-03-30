<template>
	<div id="autodetail">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>资料编号</th>
					<th>资料名称</th>
					<th>学习进度</th>
					<th>学习用时</th>
					<th>资料总页数</th>
					<th>开始学习日期</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in datalist">
					<td>{{item.gdataID}}</td>
					<td>{{item.gtitle}}</td>
					<td>{{item.glearnedpage/item.gpages*100}}%</td>
					<td>{{Math.floor(item.glearntime/60)}}分钟</td>
					<td>{{item.gpages}}页</td>
					<td>{{item.startdate}}</td>
				</tr>
			</tbody>
		</table>
		<a class="btn btn-default" v-if="fromlist" @click="changeStaffListState(2)">返回</a>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      arrlength: 0,
      datalist: [],
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  props: ['fromlist', 'fuserid'],
  methods: {
    ...mapActions([
      'changeStaffListState'
    ])
  },
  created () {
    this.$http.post(this.houtai_url + 'myDataList', {guserid: this.fuserid})
    .then((res) => {
      console.log(res.data)
      for (var i = 0; i < res.data.dataList.length; i++) {
        for (var j = 0; j < res.data.dataList[i].obj.length; j++) {
          this.datalist.push(res.data.dataList[i].obj[j])
          this.datalist[this.arrlength++].startdate = res.data.dataList[i].date
        }
      }
      console.log(this.datalist)
    }, (res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
.table{
	margin: 60px;
	width: 90%;
}
.btn{
	margin: 0 60px;
	width: 150px;
}
</style>
