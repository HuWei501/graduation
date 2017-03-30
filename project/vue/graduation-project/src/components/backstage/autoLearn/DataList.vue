<template>
	<div id="datalist">
		<change-data v-if="showchange" :fromlist="true" :changeMes="changeDataMes" v-on:changeData="changeSuccess">
			<a class="btn btn-default" v-on:click="showchange = !showchange">返回</a>
		</change-data>
		<delete-data v-if="deleteflag">
			<h5>确认删除该资料？</h5>
			<a class="btn btn-default" @click="deleteflag=!deleteflag">取消</a>
			<a class="btn btn-danger" @click="deleteData">删除</a>
		</delete-data>
    <now-people v-if="nowflag" :fromdata="true" :fromCourseMes="dataMes">
      <a class="btn btn-default" @click="nowflag=!nowflag">返回</a>
    </now-people>
		<table class="table table-bordered table-hover" v-if="!showchange && !nowflag">
			<thead>
				<tr>
					<th>编号</th>
					<th>资料名称</th>
					<th>页数</th>
					<th>学习人数</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in dataList">
					<td>{{item.gid}}</td>
					<td>{{item.gtitle}}</td>
					<td>{{item.gpages}}</td>
					<td><a href="javascript:;" @click="showNowPeople(item.gid)">{{item.glearnNum}}</a></td>
					<td>
						<a class="btn btn-info" @click="showchange=!showchange;changeDataMes=item">修改</a>
						<a class="btn btn-danger" @click="deleteflag=!deleteflag;deleteID=item.gid">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import changedata from './NewData'
import deleteTrain from '../../common/deleteAlter'
import nowpeople from '../train/NowPeople'
export default {
  data () {
    return {
      showchange: false,
      dataList: [],
      deleteflag: false,
      deleteID: 0,
      changeDataMes: {},
      nowflag: false,
      dataMes: {},
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  components: {
    'change-data': changedata,
    'delete-data': deleteTrain,
    'now-people': nowpeople
  },
  methods: {
    getDataList () {
      this.$http.get(this.houtai_url + 'get_allCourseData')
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.dataList = res.data.datalist
        }
      }, (res) => {
        console.log(res)
      })
    },
    deleteData () {
      this.$http.post(this.houtai_url + 'delete_courseData', {gid: this.deleteID})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.deleteflag = !this.deleteflag
          this.getDataList()
        }
      }, (res) => {
        console.log(res)
      })
    },
    changeSuccess () {
      alert('修改成功')
      this.showchange = !this.showchange
      this.getDataList()
    },
    showNowPeople (dataid) {
      this.nowflag = !this.nowflag
      this.dataMes.dataid = dataid
      this.dataMes.ifEnd = 0
    }
  },
  created () {
    this.getDataList()
  }
}
</script>

<style scoped>
.table{
	width: 60%;
	margin: 60px;
}
.table th:last-child{
	text-align: center;
	width: 220px;
}
.table td:last-child{
	display: flex;
	justify-content: space-around;
}
.table .btn{
	width: 80px;
}
</style>
