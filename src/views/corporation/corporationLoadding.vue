<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-08 15:35:55
 * @Description:
 * @FilePath: \jb2q-hrm-web\src\views\corporation\corporationLoadding.vue
-->
<template>
  <!-- <router-view></router-view> -->
  <div
    id="loaddingBody"
    v-loading="loading"
    element-loading-text="拼命加载中"
  ></div>
</template>

<script>
export default {
  name: 'corporationLoadding',
  data() {
    return {
      loading: true
    };
  },
  created() {
    this.initializePage();
  },
  methods: {
    // 登录成功首先跳转到本页面进行一些数据的初始化判断
    initializePage() {
      // let that = this;
      let timer = setInterval(() => {
        //轮询判断单位登录和获取登录单位信息的操作已经结束了
        if (this.$store.getters['corporation/first_check']) {
          if (timer) {
            clearInterval(timer);
          }
          if (this.$store.getters['corporation/first_login']) {
            //首次登录跳转到信息维护界面
            this.$alert(
              '首次进入本系统，请先维护单位基本信息，以正常使用系统功能！'
            );
            this.$router.push('/corpinfo');
          } else {
            //非首次登录跳转到查询界面
            this.$router.push('/resumeSearch');
          }
        }
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
#loaddingBody {
  width: 100%;
  min-height: 100%;
  padding-top: 60px;
}
</style>
