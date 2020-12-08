<template>
  <div id="noRouter">
    <h1>不好意思，你迷路啦!</h1>
  </div>
</template>

<script>
export default {
  name: "Page404",
};
</script>

<style lang="scss" scoped>
#noRouter{
  position: absolute;
  width: 100%;
  top:40%;
  h1{
    font-size: 30px;
  }
}
</style>
