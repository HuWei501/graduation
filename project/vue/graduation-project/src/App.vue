<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body,h1,h2,h3,h4,h5,h6,ul,li{
  margin: 0;
  padding: 0;
}
body,html,#app{
  height: 100%;
}
ul{
  list-style-type: none;
}
a{
  text-decoration: none !important;
}
#app {
  font-family:'Microsoft YaHei', Arial,'Avenir', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
