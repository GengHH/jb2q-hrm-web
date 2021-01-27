<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-27 18:16:29
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\corporation\corporation.vue
-->
<template>
  <div id="indexApp">
    <!-- Header -->
    <HeaderIndex :nav-list="navList"></HeaderIndex>
    <!-- <transition name="fade">
      <router-view></router-view>
    </transition> -->
    <router-view></router-view>
  </div>
</template>

<script>
/**
 * 公司管理系统入口界面
 */
import HeaderIndex from '@/components/index/HeaderIndex.vue';
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
        { id: '5', path: '/jobFair', nvaText: '招聘会' },
        { id: '4', path: '/jobFindMgr', nvaText: '应聘管理' },
        { id: '3', path: '/resumeSearch', nvaText: '简历搜索' },
        { id: '2', path: '/jobMgr', nvaText: '职位管理' },
        { id: '1', path: '/', nvaText: '单位信息维护' }
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
    testRoute() {}
  },
  created() {
    // console.log("index begin creating");
    // console.log(this);
    // console.log(this.$data);
    // this.axios.get('/admin/index').then(res =>{
    //   this.$set(this.obj,'siet',res.data)
    // }).catch( err=>{
    //   console.log(err)
    // });
  }
};
</script>

<style lang="scss" scoped>
#indexApp {
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  // text-align: center;
  //color: #2c3e50;
  height: 100%;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
