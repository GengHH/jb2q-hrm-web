<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-05 13:36:38
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\corporation\corporation.vue
-->
<template>
  <div id="indexApp" class="nice-scroll">
    <!-- Header -->
    <BaseHeader :nav-list="navList" :user-log-info="userLogInfo"></BaseHeader>
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
import BaseHeader from '@/components/common/BaseHeader.vue';
import { niceScroll, niceScrollUpdate } from '@/utils';
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
        { id: '7', path: '/empsurpluslack', nvaText: '用工余缺' },
        {
          id: '6',
          path: this.$store.getters['dictionary/human_resource_reg']
            ? '/blank'
            : '/onlineShop',
          nvaText: '在线开店'
        },
        { id: '5', path: '/jobFair', nvaText: '招聘会' },
        { id: '4', path: '/jobFindMgr', nvaText: '应聘管理' },
        {
          id: '3',
          path: this.$store.getters['corporation/special_corp']
            ? '/resumeSearch'
            : '/blank',
          nvaText: '简历搜索'
        },
        { id: '2', path: '/jobMgr', nvaText: '职位管理' },
        { id: '1', path: '/corpInfo', nvaText: '单位信息维护' }
      ],
      userLogInfo: {
        id: 'user',
        path: '/user',
        nvaText: this.$store.getters['corporation/username'] || '临时单位',
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
    //console.log(this.$store);
    // console.log(this.$data);
    // this.axios.get('/admin/index').then(res =>{
    //   this.$set(this.obj,'siet',res.data)
    // }).catch( err=>{
    //   console.log(err)
    // });
    //由于登录（是否首次进入系统接口）为异步，根据其返回的结来判断顶部菜单数据
    let timer = setInterval(() => {
      if (
        this.$store.getters['corporation/username'] ||
        this.$store.getters['corporation/first_check']
      ) {
        //是不是特定单位
        if (this.$store.getters['corporation/username']) {
          this.navList.forEach(i => {
            if (i.nvaText === '简历搜索') i.path = '/resumeSearch';
          });
        }
        //是不是人力资源单位
        if (this.$store.getters['dictionary/human_resource_reg']) {
          this.navList.forEach(i => {
            if (i.nvaText === '在线开店') i.path = '/onlineShop';
          });
        }
        //登录人名称
        this.userLogInfo.nvaText = this.$store.getters['corporation/username'];
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
    // 更新滚动条
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
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>
