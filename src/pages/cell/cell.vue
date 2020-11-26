<template>
  <div id="cellApp">
    <router-view></router-view>
    <!-- <cells></cells> -->
  </div>
</template>

<script>
//import cells from "@/components/cell.vue";
export default {
  name: "Cell",
  //components: { cells },
  data: () => {
    return {
      path: "",
    };
  },
};
</script>

<style>
#cellApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
