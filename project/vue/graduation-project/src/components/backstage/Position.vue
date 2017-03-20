<template>
	<div id="position">
		<div class="addArea" v-if="showAddBox">
	  		<div class="addContent">
	  			<h5>请输入新职位：</h5>
	  			<input type="text" name="position" v-model="addNewName" v-on:keyup.13="add_position">
	  			<div class="btn-box">
		  			<a class="btn btn-default" @click="showAddBox = !showAddBox">取消</a>
		  			<a class="btn btn-primary" @click="add_position">确认</a>
	  			</div>
	  		</div>
	  	</div>
	  	<delete-alter v-if="showDel">
	  		<h5>确认删除该职位？</h5>
		    <a class="btn btn-default" @click="showDel = !showDel">取消</a>
	  		<a class="btn btn-danger" @click="deletePositon">删除</a>
	  	</delete-alter>
	  	<recommend-list v-if="showRecommend" :positionid="pid">
	  		<a class="btn btn-default" @click="showRecommend = !showRecommend">返回</a>
	  	</recommend-list>
	  	<div v-if="!showRecommend">
			<a class="btn btn-info" @click="showAddBox = !showAddBox">添加职位</a>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>编号</th>
						<th>职位</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in positionList">
						<td>{{item.id}}</td>
						<td>{{item.name}}</td>
						<td>
							<a class="btn btn-primary" @click="addRecommend(item.id)">添加推荐</a>
							<a class="btn btn-danger" @click="deleteID=item.id;showDel=!showDel">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
	  	</div>
	</div>
</template>

<script>
import deleteAlter from '../common/deleteAlter'
import recommend from './RecommendList'
export default {
  data () {
    return {
      showAddBox: false,
      showDel: false,
      addNewName: '',
      positionList: [],
      deleteID: 0,
      showRecommend: false,
      pid: null
    }
  },
  methods: {
    add_position () {
      this.$http.post('http://localhost:3000/new_position', {
        gpositionname: this.addNewName
      }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.showAddBox = !this.showAddBox
          this.addNewName = ''
          this.getPositionList()
        } else {
          alert(res.data.msg)
        }
      }, (res) => {
        console.log(res)
      })
    },
    getPositionList () {
      this.$http.get('http://localhost:3000/get_allposition')
      .then((res) => {
        console.log(res.data)
        this.positionList = res.data.position
      }, (res) => {
        console.log(res)
      })
    },
    deletePositon () {
      this.$http.post('http://localhost:3000/delete_position', {
        gid: this.deleteID
      }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.showDel = !this.showDel
          this.getPositionList()
        }
      }, (res) => {
        console.log(res)
      })
    },
    addRecommend (positionid) {
      this.pid = positionid
      this.showRecommend = !this.showRecommend
    }
  },
  components: {
    'delete-alter': deleteAlter,
    'recommend-list': recommend
  },
  created () {
    this.getPositionList()
  }
}
</script>

<style scoped>
.btn{
	width: 100px;
}
.btn-info{
	margin: 60px 60px 20px;
}
.table{
	margin: 0 60px;
	width: 60%;
}
.table th:last-child{
	text-align: center;
	width: 300px;
}
.table td:last-child{
	display: flex;
	justify-content: space-around;
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
	width: 300px;
	margin:100px auto;
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
.addContent input{
	width: 250px;
	margin: 10px auto;
	margin-left: 25px;
	padding-left: 5px;
}
.addContent .btn-box{
	text-align: right;
}
.addContent .btn{
	margin: 30px 25px 15px 0;
	width: 70px;
}
</style>
