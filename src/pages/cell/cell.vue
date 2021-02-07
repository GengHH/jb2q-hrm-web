<!--
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: GengHH
 * @LastEditTime: 2021-02-07 18:00:17
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\cell\cell.vue
-->
<template>
  <div id="indexApp">
    <img :src="path" />
    <router-view></router-view>
    <div id="testjrCss">hahahhahhah</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => {
    return {
      path: require('@/assets/logo.png')
    };
  },
  methods: {
    test: () => {
      console.log(this.$route);
      alert(123);
    }
  }
};
</script>

<style>
#indexApp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
#testjrCss {
  color: rgb(236, 33, 186);
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
}
.test {
  color: #000000;
}
</style>
