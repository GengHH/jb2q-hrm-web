<template>
  <div id="indexApp">
    <img :src="path" />
    <router-view></router-view>
    <div>hahahhahhah</div>
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
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.test {
  color: #000000;
}
</style>
