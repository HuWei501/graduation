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
				<tr>
					<td>1</td>
					<td>锋利的jQery</td>
					<td>10%</td>
					<td>20分钟</td>
					<td>100页</td>
					<td>2017-02-02</td>
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
    return {}
  },
  props: ['fromlist'],
  methods: {
    ...mapActions([
      'changeStaffListState'
    ])
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
