<!--
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-16 13:48:50
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\person\person.vue
-->
<template>
  <div id="indexApp" class="nice-scroll">
    <!-- Header -->
    <BaseHeader :nav-list="navList" :user-log-info="userLogInfo"></BaseHeader>
    <!-- <transition name="fade"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
/**
 * 个人管理系统入口界面
 */
import { niceScroll, niceScrollUpdate } from '@/utils';
import BaseHeader from '@/components/common/BaseHeader.vue';
export default {
  name: 'app',
  components: {
    BaseHeader
  },
  data() {
    return {
      path: require('@/assets/logo.png'),
      obj: {},
      jobActiveName: 'jobRecommended',
      corpActiveName: 'corpRecommended',
      navList: [
        // {
        //   id: '8',
        //   path: '',
        //   nvaText: this.$store.getters.name || '临时工'
        // },
        {
          id: '9',
          path: '/blank',
          nvaText: '时钟',
          icon: true,
          iconName: 'el-icon-time'
        },
        {
          id: '8',
          path: '/remind',
          nvaText: '铃铛',
          icon: true,
          type: 'badge',
          iconName: 'el-icon-bell'
        },
        { id: '7', path: '/activity', nvaText: '特色活动' },
        { id: '6', path: '/jobFair', nvaText: '招聘会' },
        { id: '5', path: '/personInfo', nvaText: '个人信息维护' },
        { id: '4', path: '/jobFindFeedback', nvaText: '求职反馈' },
        { id: '3', path: '/personalCenter', nvaText: '个人中心' },
        { id: '2', path: '/resumeMgr', nvaText: '简历管理' },
        { id: '1', path: '/jobSearch', nvaText: '职位搜索' },
        { id: '0', path: '/home', nvaText: '首页' }
      ],
      userLogInfo: {
        id: 'user',
        path: '/user',
        nvaText: this.$store.getters['person/username'] || '临时工',
        subMenu: [
          {
            id: '/logout',
            path: '',
            nvaText: '退出'
          }
        ]
      }
    };
  },
  methods: {
    getUserName() {
      //console.log('++++++++++++++++');
      //console.log(this.$store.getters.name);
      // this.$set(
      //   this.navList[0],
      //   'nvaText',
      //   this.$store.getters['person/username']
      // );
    }
  },
  created() {
    let timer = setInterval(() => {
      if (this.$store.getters['person/username']) {
        this.userLogInfo.nvaText = this.$store.getters['person/username'];
        if (timer) {
          clearInterval(timer);
        }
      }
    }, 300);
  },
  mounted() {
    niceScroll('#indexApp');
  },
  updated() {
    this._.throttle(niceScrollUpdate, 500)();
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
.nice-scroll {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
