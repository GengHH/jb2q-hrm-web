<!--
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-29 10:58:05
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\cell\cell.vue
-->
<template>
  <div id="indexApp">
    <img :src="path" />
    <router-view></router-view>
    <div id="testjrCss"></div>
    <h1>{{ aa }}</h1>
    <h1>{{ bb }}</h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => {
    return {
      path: require('@/assets/logo.png'),
      aa: 1,
      bb: {
        cc: 2
      }
    };
  },
  beforeCreate() {
    console.log('beforeCreate', this.$data);
  },
  created() {
    console.log('created', this.$data);
  },
  beforeMount() {
    console.log('beforeMount', this.$data);
  },
  mounted() {
    console.log('mounted', this.$data);
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
