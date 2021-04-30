<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:45:20
 * @LastEditTime: 2021-04-09 15:13:10
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\index\recruitment\index.vue
-->
<template>
  <div id="indexBody"></div>
</template>

<script>
export default {
  name: 'recruitment',
  data() {
    return {};
  },
  computed: {},
  methods: {
    test() {
      this.$store.commit('index/set_PRIORITY_LOGIN_TYPE', 'corporation');
      window.location.href = '/ggzp-shrs/login.html';
    }
  },
  created() {
    this.test();
  }
};
</script>

<style lang="scss" scoped></style>
