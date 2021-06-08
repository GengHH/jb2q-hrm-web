<!--
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-08 16:50:31
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\index\index.vue
-->
<template>
  <div id="indexApp" class="index-scroll">
    <!-- Header -->
    <HeaderIndex :nav-list="navList"></HeaderIndex>
    <!-- <transition name="fade"> -->
    <router-view></router-view>
    <!-- </transition> -->
    <el-backtop target=".index-scroll"></el-backtop>
  </div>
</template>

<script>
import HeaderIndex from '@/components/index/HeaderIndex.vue';
import { niceScroll } from '@/utils';
import { testData } from '@pub/mockTestData';

export default {
  name: 'app',
  components: {
    HeaderIndex
  },
  data: () => {
    return {
      path: require('@/assets/logo.png'),
      list: testData.list,
      obj: {},
      jobActiveName: 'jobRecommended',
      corpActiveName: 'corpRecommended',
      navList: [
        { id: '7', path: '/about', nvaText: '关于我们' },
        { id: '6', path: '/activity', nvaText: '特色活动' },
        { id: '5', path: '/employmentTrainee', nvaText: '就业见习' },
        { id: '4', path: '/jobFair', nvaText: '招聘会' },
        { id: '3', path: '/recruitment', nvaText: '我要招聘' },
        { id: '2', path: '/jobSearch', nvaText: '我要求职' },
        { id: '1', path: '/', nvaText: '首页' }
      ]
    };
  },
  methods: {
    test() {
      this.axios
        .get('http://api.wpbom.com/api/neran.php')
        .then(res => {
          this.$set(this.obj, 'siet', res.data);
          console.log(this.$data);
        })
        .catch(err => {
          throw new Error('调用API失败' + err);
        });
    },
    jobHandleClick() {}
  },
  mounted() {
    niceScroll('#indexApp');
  }
};
</script>

<style lang="scss" scoped>
#indexApp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
  background-color: #f6f6f6;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
.index-scroll {
  overflow-x: hidden;
  overflow-y: scroll;
}
::v-deep .el-breadcrumb__inner {
  color: #fff !important;
}
</style>
