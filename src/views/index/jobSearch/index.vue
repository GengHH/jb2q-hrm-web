<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "cell",
  data() {
    return {
      msg: "Test",
    };
  },
  // data: () => {
  //   msg : '箭头函数的使用'
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
