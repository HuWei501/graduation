<template>
	<div id="newstaff">
		<div class="btn-box" v-if="fromlist">
			<slot name="btnbox"></slot>
			<a class="btn btn-danger" @click="resetPassword">重置密码</a>
		</div>
		<table class="table">
			<tbody>
				<tr>
					<td>帐号<span>*</span>：</td>
					<td>
						<slot name="account">
							<input type="text" v-model="myChangeMes.gaccount">
						</slot>
					</td>
					<td>姓名<span>*</span>：</td>
					<td>
						<input type="text" v-model="myChangeMes.gname">
					</td>
				</tr>
				<tr>
					<td>性别<span>*</span>：</td>
					<td>
						<select v-model="myChangeMes.gsex">
							<option value="1">男</option>
							<option value="0">女</option>
						</select>
					</td>
					<td>职位<span>*</span>：</td>
					<td>
						<select v-model="myChangeMes.gposition">
							<option v-bind:value="item.id" v-for="item in positionList">{{item.name}}</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>出生年月<span>*</span>：</td>
					<td><input type="date" v-model="myChangeMes.gborthdate"></td>
					<td>入职日期<span>*</span>：</td>
					<td><input type="date" v-model="myChangeMes.gworkdate"></td>
				</tr>
				<tr>
					<td>身份证<span>*</span>：</td>
					<td><input type="text" v-model="myChangeMes.gidentity" maxlength="18"></td>
					<td>政治面貌<span>*</span>：</td>
					<td><input type="text" v-model="myChangeMes.gpolitics"></td>
				</tr>
				<tr>
					<td>民族<span>*</span>：</td>
					<td>
						<input type="text" v-model="myChangeMes.gnation">
					</td>
					<td>电话<span>*</span>：</td>
					<td>
						<input type="text" v-model="myChangeMes.gtel" maxlength="11">
					</td>
				</tr>
				<tr>
					<td>电子邮箱<span>*</span>：</td>
					<td><input type="text" v-model="myChangeMes.gemail"></td>
					<td>学校：</td>
					<td><input type="text" v-model="myChangeMes.gschool"></td>
				</tr>
				<tr>
					<td>籍贯：</td>
					<td><input type="text" v-model="myChangeMes.gnative"></td>
					<td>学历：</td>
					<td><input type="text" v-model="myChangeMes.geducation"></td>
				</tr>
				<tr>
					<td>邮政编码：</td>
					<td><input type="text" v-model="myChangeMes.gzipcode"></td>
					<td>家庭地址：</td>
					<td><input type="text" v-model="myChangeMes.gadress"></td>
				</tr>
				<tr>
					<td>父亲姓名：</td>
					<td><input type="text" v-model="myChangeMes.gfather"></td>
					<td>母亲姓名：</td>
					<td><input type="text" v-model="myChangeMes.gmother"></td>
				</tr>
			</tbody>
		</table>
		<div v-if="fromlist">	
			<a class="btn btn-default" @click="changestate(1)">返回</a>
			<a class="btn btn-primary" @click="postChangeMes">修改</a>
		</div>
		<a class="btn btn-info" @click="addNewStaff" v-if="!fromlist">添加</a>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      positionList: [],
      myChangeMes: this.changeMes ? this.changeMes : {},
      houtai_url: this.$store.state.ajaxUrl
    }
  },
  props: ['fromlist', 'changeMes'],
  watch: {
    changeMes: {
      handler: (newVal, oldVal) => {
        this.myChangeMes = newVal // 监听外部对props属性changeMes的变更，并同步到组件内的data属性myChangeMes中
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'changeStaffListState'
    ]),
    addNewStaff () {
      this.$http.post(this.houtai_url + 'new_user', this.myChangeMes)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.newstaff = {}
          this.$router.push('/admin/stafflist')
        }
      }, (res) => {
        console.log(res)
      })
    },
    postChangeMes () {
      this.$http.post(this.houtai_url + 'change_user', this.myChangeMes)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          alert(res.data.msg)
          this.changestate(1)
        }
      }, (res) => {
        console.log(res)
      })
    },
    resetPassword () {
      this.$http.post(this.houtai_url + 'reset_password', {
        gid: this.changeMes.gid
      }).then((res) => {
        alert(res.data.msg)
      }, (res) => {
        console.log(res)
      })
    },
    changestate (num) {
      this.changeStaffListState(num)
    }
  },
  created () {
    this.$http.get(this.houtai_url + 'get_allposition')
    .then((res) => {
      console.log(res.data)
      this.positionList = res.data.position
    }, (res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
#newstaff{
	padding: 60px;
}
span{
	color: red;
	padding-left: 2px;
}
.table{
	width: 90%;
}
.table td p{
	margin:0;
}
.btn-box{
	margin-bottom: 20px;
}
input{
	width: 155px;
}
.btn{
	margin: 20px 20px 20px 0;
	width: 150px;
}

</style>
