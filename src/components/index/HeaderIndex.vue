<!--
 * @Author: your name
 * @Date: 2020-12-03 10:04:12
 * @LastEditTime: 2021-07-14 14:30:38
 * @LastEditors: GengHH
 * @Description: 首页herder
 * @FilePath: \jb2q-hrm-web\src\components\index\HeaderIndex.vue
-->
<template>
  <div id="indexHeader">
    <div class="float-log">
      <img class="logo2" src="@/assets/img/logo2-1.png" alt="" />
    </div>
    <div id="indexPageHeader">
      <el-row id="index-title">
        <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" class="text-left">
          上海市人力资源和社会保障局 | 公共服务平台
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="16" :xl="16" class="text-right">
          <!-- <i class="el-icon-user"></i>
          登录 | 注册 -->
        </el-col>
      </el-row>
    </div>
    <div id="indexMenuHeader">
      <el-row>
        <el-col :xs="20" :sm="20" :md="6" :lg="8" :xl="8" class="bg-purple">
          <img src="@/assets/img/logo.png" alt="" @click="goIndex" />
          <!-- <img class="logo2" src="@/assets/img/logo2.png" alt=""> -->
          <img
            class="logo3"
            src="@/assets/img/logo3.png"
            alt=""
            @click="goIndex"
          />
        </el-col>
        <el-col :xs="4" :sm="4" :md="18" :lg="16" :xl="16" class="bg-purple">
          <!-- 小屏幕下显示的菜单 -->
          <el-dropdown v-if="showIconMenu" id="showIconMenu" trigger="click">
            <span class="el-dropdown-link">
              <el-icon class="el-icon-s-fold"></el-icon>
            </span>
            <el-dropdown-menu id="dropdownMenu" slot="dropdown">
              <el-dropdown-item
                v-for="nvaIndex in navListReverse"
                :key="nvaIndex.id"
                :icon="nvaIndex.iconName"
              >
                <router-link :to="nvaIndex.path">
                  {{ nvaIndex.nvaText }}
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 大屏幕下显示的菜单 -->
          <el-menu
            v-else
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#fff"
            text-color="#333"
            @select="handleSelect"
          >
            <el-menu-item
              v-for="nvaIndex in navList"
              :key="nvaIndex.id"
              :index="nvaIndex.path"
              class="bottom-inOutSpread"
              @click="jump(nvaIndex.path)"
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
      showIconMenu: false,
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
    navListReverse() {
      return [...this.navList].reverse();
    }
  },
  created() {
    this.changeMenuStyle();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        'resize',
        //监听浏览器窗口大小改变
        //浏览器变化执行动作
        this._.debounce(this.changeMenuStyle, 500)
      );
    });
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
    jump(val) {
      if (val === '/recruitment') {
        //直接跳转单位登录界面
        this.$store.commit('index/set_PRIORITY_LOGIN_TYPE', 'corporation');
        window.location.href = '/ggzp-shrs/login.html';
      } else {
        //跳转相应的路由地址
        this.$router.push(val);
      }
    },
    changeMenuStyle() {
      if (window.innerWidth < 992) {
        this.showIconMenu = true;
      } else {
        this.showIconMenu = false;
      }
    },
    handleSelect(index) {
      console.log(this.$route.path);
      this.$store.commit('index/SET_ACTIVE_MENU_INDEX', index);
    },
    /**
     *点击logo回到首页
     */
    goIndex() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
#indexHeader {
  position: fixed;
  height: 90px;
  width: 100%;
  z-index: 2001;
  background-color: $g-white-color;
  box-shadow: 2px 2px 5px #eee;
  //color: $g-white-color !important;
  #showIconMenu {
    font-size: 24px;
    float: right;
    margin-top: 18px;
    color: #fc6f3d;
  }
  .float-log {
    position: absolute;
    width: 5%;
    left: 0;
    top: 0;
    height: 100%;
    img {
      /* width: 90%; */
      margin: 0 auto;
      /* vertical-align: middle; */
      /* height: 44px; */
      margin-top: 8px;
      width: 80%;
    }
  }
  #indexPageHeader {
    height: 30px;
    width: 100%;
    padding: 0 5%;
    background-color: $g-mian-color;
  }
  #index-title {
    font-size: 12px;
    line-height: 30px;
    color: $g-white-color;
  }
  #indexMenuHeader {
    padding: 0 5%;
  }
  .el-row {
    width: 100%;
    //height: 100%;
    img {
      float: left;
      width: 24px;
      height: 24px;
      position: relative;
      top: 14px;
      display: block;
    }
    img:last-child {
      width: 160px;
      height: 24px;
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
ul.el-dropdown-menu {
  li {
    a {
      color: #606266;
    }
  }
}
</style>
