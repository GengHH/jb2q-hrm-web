<!--
 * @Author: your name
 * @Date: 2020-12-03 10:04:12
 * @LastEditTime: 2021-04-26 15:40:01
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\components\common\BaseHeader.vue
-->
<template>
  <div id="indexHeader" class="two-column-layout">
    <div class="left" @click="goHome">
      <img src="@/assets/img/logo.png" alt="" />
      <!-- <img class="logo2" src="@/assets/img/logo2.png" alt=""> -->
      <img class="logo3" src="@/assets/img/logo3.png" alt="" />
    </div>
    <div class="right">
      <el-row>
        <!-- <el-col :sm="24" :md="18" :lg="16" :xl="16" class="bg-purple"> -->
        <el-col :span="24" class="bg-purple">
          <!-- 小屏幕下显示的菜单 -->
          <el-dropdown v-if="showIconMenu" id="showIconMenu" trigger="click">
            <span class="el-dropdown-link">
              <el-icon class="el-icon-s-fold"></el-icon>
            </span>
            <el-dropdown-menu id="dropdownMenu" slot="dropdown">
              <!-- 个人或者单位名称 -->
              <el-dropdown-item command="e" divided>{{
                userLogInfo.nvaText
              }}</el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
              <el-dropdown-item
                v-for="nvaIndex in navListReverse"
                :key="nvaIndex.id"
                :icon="nvaIndex.iconName"
              >
                <router-link :to="nvaIndex.path">
                  {{ nvaIndex.nvaText }}
                </router-link>
              </el-dropdown-item>
              <!-- 二级子菜单 -->
              <template v-if="userLogInfo.subMenu.length > 0">
                <el-dropdown-item divided></el-dropdown-item>
                <el-dropdown-item
                  v-for="nvaIndex in userLogInfo.subMenu"
                  :key="nvaIndex.id"
                >
                  <router-link :to="nvaIndex.id">
                    {{ nvaIndex.nvaText }}
                  </router-link>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 大屏幕下显示的菜单 -->
          <el-menu
            v-else
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            router
            background-color="#fc6f3d"
            text-color="#fff"
            @select="handleSelect"
          >
            <!-- 个人or单位信息栏 -->
            <el-submenu index="otherInfo" v-if="userLogInfo.subMenu.length > 0">
              <template slot="title">{{ userLogInfo.nvaText }}</template>
              <el-menu-item
                v-for="nvaIndex in userLogInfo.subMenu"
                :key="nvaIndex.id"
                :index="nvaIndex.id"
                >{{ nvaIndex.nvaText }}</el-menu-item
              >
            </el-submenu>
            <!-- 其他正常菜单信息栏 -->
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
  </div>
</template>

<script>
import { doPersonLogout } from '@/api/personApi';
import { doCorporationLogout } from '@/api/corporationApi';
import { isNoBody, isPerson, isCorporation } from '@/utils';
export default {
  name: 'BaseHeader',
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
      showIconMenu: true,
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
    async $route(to, from) {
      //to:即将要跳转到的页面   from:即将离开的页面
      if (to.path === '/logout' && isNoBody(this)) {
        this.$alert('没有登录！无法退出');
        this.$router.push(from.path);
      } else if (to.path === '/logout') {
        if (isPerson(this)) {
          //个人退出
          let logoutResult = await doPersonLogout();
          if (logoutResult && logoutResult.status === 200) {
            let logout = this.$store.dispatch('person/do_logout');
            logout
              .then(res => {
                this.$alert('退出成功');
                window.setTimeout(function() {
                  window.location.href = '/ggzp-shrs/index.html';
                }, 2000);
                return;
              })
              .catch(err => {
                this.$alert('退出异常');
              });
          } else {
            this.$alert('退出失败');
          }
        } else if (isCorporation(this)) {
          //单位退出
          let logoutResult = await doCorporationLogout();
          if (logoutResult && logoutResult.status === 200) {
            this.$store
              .dispatch('corporation/do_logout')
              .then(res => {
                this.$alert('退出成功');
                window.setTimeout(function() {
                  window.location.href = '/ggzp-shrs/index.html';
                }, 2000);
                return;
              })
              .catch(err => {
                this.$alert('退出异常');
              });
          } else {
            this.$alert('退出失败');
          }
        }
        //this.$router.push('/')
        //this.$router.push(from.path);
      }
    }
  },
  methods: {
    changeMenuStyle() {
      if (
        (isPerson(this) && window.innerWidth < 992) ||
        (isCorporation(this) && window.innerWidth < 1200)
      ) {
        this.showIconMenu = true;
      } else {
        this.showIconMenu = false;
      }
    },
    goHome() {
      window.location.href = '/ggzp-shrs/index.html';
    },
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
  height: 60px;
  width: 100%;
  padding: 0 5%;
  z-index: 999;
  background-color: $g-mian-color;
  color: $g-white-color !important;
  .left {
    float: left;
    width: 230px;
    height: 100%;
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
  .right {
    margin-left: 230px;
    height: 100%;
  }

  #showIconMenu {
    font-size: 24px;
    float: right;
    margin-top: 18px;
    color: #fff;
  }
  .el-row {
    width: 100%;
    height: 100%;
    .el-col {
      height: 100%;
      .nva-icon {
        color: #fff;
      }
    }
  }

  ::v-deep .el-menu--horizontal {
    .el-submenu,
    .el-menu-item {
      float: right;
    }
    .el-menu-item.is-active {
      border-bottom: 2px solid #ffc107;
      color: #ffc107;
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
