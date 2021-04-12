<!--
 * @Author: your name
 * @Date: 2020-12-03 10:04:12
 * @LastEditTime: 2021-04-09 14:34:46
 * @LastEditors: GengHH
 * @Description: 首页herder
 * @FilePath: \jb2q-hrm-web\src\components\index\HeaderIndex.vue
-->
<template>
  <div id="indexHeader">
    <div class="float-log">
      <img class="logo2" src="@/assets/img/logo2.png" alt="" />
    </div>
    <div id="indexPageHeader">
      <el-row id="index-title">
        <el-col :sm="24" :md="6" :lg="8" :xl="8" class="text-left">
          上海市人力资源和社会保障局 | 公共服务平台
        </el-col>
        <el-col :sm="24" :md="18" :lg="16" :xl="16" class="text-right">
          <i class="el-icon-user"></i>
          登录 | 注册
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :sm="24" :md="6" :lg="8" :xl="8" class="bg-purple">
        <img src="@/assets/img/logo.png" alt="" />
        <!-- <img class="logo2" src="@/assets/img/logo2.png" alt=""> -->
        <img class="logo3" src="@/assets/img/logo3.png" alt="" />
      </el-col>
      <el-col :sm="24" :md="18" :lg="16" :xl="16" class="bg-purple">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          router
          background-color="#fff"
          text-color="#333"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="nvaIndex in navList"
            :key="nvaIndex.id"
            :index="nvaIndex.path"
          >
            <template v-if="nvaIndex.icon">
              <i class="nva-icon" :class="nvaIndex.iconName"></i>
            </template>
            <template v-else>
              {{ nvaIndex.nvaText }}
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { doPersonLogout } from '@/api/personApi';
// import { doCorporationLogout } from '@/api/corporationApi';
// import { isNoBody, isPerson, isCorporation } from '@/utils';
export default {
  name: 'HeaderIndex',
  props: {
    navList: Array,
    userLogInfo: {
      type: Object,
      default: () => ({
        id: 'user',
        path: '',
        nvaText: 'Anyone',
        subMenu: []
      })
    }
  },
  data() {
    return {
      // activeIndex:
      //   this.$route.path && this.$route.path.length > 1
      //     ? this.$route.path.substr(1)
      //     : this.$route.path,
      inco: true
    };
  },
  computed: {
    // path() {
    //   console.log(this.$route.path);
    //   var aa =
    //     this.$route.path && this.$route.path.length > 1
    //       ? this.$route.path.substr(1)
    //       : this.$route.path;
    //   console.log(this.$route.path.length);
    //   return aa;
    // }
  },
  watch: {
    // async $route(to, from) {
    //   //to:即将要跳转到的页面   from:即将离开的页面
    //   //console.log(this);
    //   if (to.path === '/logout' && isNoBody(this)) {
    //     this.$alert('没有登录！无法退出');
    //     this.$router.push(from.path);
    //   } else if (to.path === '/logout') {
    //     if (isPerson(this)) {
    //       //个人退出
    //       let logoutResult = await doPersonLogout();
    //       if (logoutResult && logoutResult.status === 200) {
    //         let logout = this.$store.dispatch('person/do_logout');
    //         logout
    //           .then(res => {
    //             this.$alert('退出成功');
    //             window.setTimeout(function() {
    //               window.location.href = '/ggzp-shrs/index.html';
    //             }, 2000);
    //             return;
    //           })
    //           .catch(err => {
    //             this.$alert('退出异常');
    //           });
    //       } else {
    //         this.$alert('退出失败');
    //       }
    //     } else if (isCorporation(this)) {
    //       //单位退出
    //       let logoutResult = await doCorporationLogout();
    //       if (logoutResult && logoutResult.status === 200) {
    //         this.$store
    //           .dispatch('corporation/do_logout')
    //           .then(res => {
    //             this.$alert('退出成功');
    //             window.setTimeout(function() {
    //               window.location.href = '/ggzp-shrs/index.html';
    //             }, 2000);
    //             return;
    //           })
    //           .catch(err => {
    //             this.$alert('退出异常');
    //           });
    //       } else {
    //         this.$alert('退出失败');
    //       }
    //     }
    //     //this.$router.push('/')
    //     this.$router.push(from.path);
    //   }
    // }
  },
  methods: {
    handleSelect(index) {
      console.log(this.$route.path);
      this.$store.commit('index/SET_ACTIVE_MENU_INDEX', index);
    }
  }
};
</script>

<style lang="scss" scoped>
#indexHeader {
  position: fixed;
  height: 90px;
  width: 100%;
  z-index: 999;
  background-color: $g-white-color;
  //color: $g-white-color !important;
  .float-log {
    position: absolute;
    width: 5%;
    left: 0;
    top: 0;
    height: 100%;
    img {
      /* width: 90%; */
      margin: 0 auto;
      vertical-align: middle;
      height: 50px;
      margin: 20px 0;
    }
  }
  #indexPageHeader {
    height: 30px;
    width: 100%;
    background-color: $g-mian-color;
  }
  #index-title {
    font-size: 12px;
    line-height: 30px;
    color: $g-white-color;
  }
  .el-row {
    width: 100%;
    padding: 0 5%;
    //height: 100%;
    img {
      float: left;
      width: 30px;
      height: 32px;
      position: relative;
      top: 14px;
      display: block;
    }
    img:last-child {
      width: 194px;
      height: 32px;
    }
  }

  .el-col {
    height: 100%;
    // .el-breadcrumb {
    //   line-height: 60px;
    //   height: 100%;
    // }

    // .el-breadcrumb__item {
    //   font {
    //     color: #333;
    //     size: 16px;
    //   }
    //   height: 60px;
    //   padding: 0 10px;
    //   float: right;
    //   text-align: right;
    // }
    // .el-breadcrumb__item:hover {
    //   border-bottom: 2px solid red;
    // }
    .nva-icon {
      color: #fff;
    }
  }
  ::v-deep .el-menu--horizontal {
    .el-submenu,
    .el-menu-item {
      float: right;
    }
    .el-menu-item.is-active {
      border-bottom: 2px solid $g-mian-color;
      color: $g-mian-color;
    }
  }
}
</style>
