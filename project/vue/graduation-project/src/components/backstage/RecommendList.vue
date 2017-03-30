<template>
	<div class="datalist">
		<slot></slot>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>编号</th>
					<th>资料名称</th>
					<th>简介</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in dataArr">
					<td>{{item.gdataid}}</td>
					<td>{{item.gtitle}}</td>
					<td class="intro">{{item.gintro}}</td>
					<td>
						<a class="btn btn-info" v-if="!item.gstate" @click="addRecommend(item.gdataid)">添加</a>
						<a class="btn btn-danger" v-if="item.gstate" @click="removeData(item.gdataid)">移除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
  data () {
    return {
      dataArr: [],
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  props: ['positionid'],
  methods: {
    getDataList () {
      this.$http.post(this.houtai_url + 'selectAllDataList', {gpositionid: this.positionid})
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.dataArr = res.data.datalist
        }
      }, (res) => {
        console.log(res)
      })
    },
    addRecommend (dataid) {
      this.$http.post(this.houtai_url + 'addRecData', {
        gpositionid: this.positionid,
        gdataid: dataid
      }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          alert(res.data.msg)
          this.getDataList()
        }
      }, (res) => {
        console.log(res)
      })
    },
    removeData (dataid) {
      this.$http.post(this.houtai_url + 'removeRecommend', {
        gpositionid: this.positionid,
        gdataid: dataid
      }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          alert(res.data.msg)
          this.getDataList()
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  created () {
    this.getDataList()
  }
}
</script>

<style scoped>
.datalist{
	padding: 60px 0 0 60px;
}
.btn-default{
	width: 150px;
	margin-bottom: 30px;
}
.table{
	width: 80%;
}
.table th:last-child,
.table td:last-child{
	text-align: center;
	width: 250px;
}
.table .btn{
	width: 150px;
}
</style>
