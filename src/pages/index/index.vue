<template>
  <div id="indexApp">
    <!-- <img src="../../assets/logo.png" /> -->
    <img :src="path" />
    <router-view></router-view>
    <el-button @click.native="test()"> 默认按钮</el-button>
    <span class="test">gdfgdfg </span>
    <a href="#/test">test</a>
    <a href="/cell.html">cell 页面</a>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => {
    return {
      path: require("@/assets/logo.png"),
    };
  },
  methods: {
    test: () => {
      console.log(this.$route);
      alert(123);
    },
  },
};
</script>

<style>
#indexApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.test {
  color: #000000;
}
</style>
