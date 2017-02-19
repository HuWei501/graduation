<template>
	<div id="headernav">
		<header>
			<h2>企业培训管理系统</h2>
			<div>
				<p><span>{{ username }}</span>,欢迎您</p>
				<button class="btn btn-danger" v-on:click="loginOut">退出</button>
			</div>
		</header>
	</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['username'],
  methods: {
    loginOut: function (event) {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>
header{
  height: 70px;
  width: 100%;
  background-color: #75B3E8;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 2px #75B3E8;

}
header h2{
  display: inline-block;
  height: 70px;
  line-height: 70px;
  margin-left: 30px;
  font-size: 22px;
  color: #fff;
}
header div{
  padding: 20px 20px 0 0;
}
header p{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin-right: 20px;
}
header .btn-danger{
  display: inline-block;
  height: 30px;
  width: 90px;
  line-height: 14px;
}
</style>

