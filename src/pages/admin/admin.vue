<!--
 * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-05 18:13:24
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\admin\admin.vue
-->
<template>
  <div id="app" style="width:100%;height:100%">
    <div style="height:100%">
      <el-header height="60px" style="padding:0">
        <div id="indexHeader">
          <el-row>
            <el-col :sm="24" :md="6" :lg="8" :xl="8" class="bg-purple">
              <img src="@/assets/img/logo.png" alt="" />
              <!-- <img class="logo2" src="@/assets/img/logo2.png" alt=""> -->
              <img class="logo3" src="@/assets/img/logo3.png" alt="" />
            </el-col>
            <el-col :sm="24" :md="18" :lg="16" :xl="16" class="bg-purple">
              <div
                v-for="(v, k) in navList"
                :key="k"
                class="list listHover"
                @click="openList(v)"
              >
                <i class="nva-icon" :class="v.iconName"></i>
              </div>
              <div class="list">
                欢迎您！{{ $store.state.admin.userInfo.logonUser.userName }}（{{
                  $store.state.admin.userInfo.logonUser.organName
                }}）
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <div style="height:100%">
        <el-aside :style="{ width: (isCollapse ? '64' : '300') + 'px' }">
          <div style="text-align: center;margin-top:5px">
            <el-button
              size="mini"
              :icon="isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'"
              circle
              @click="isCollapse = !isCollapse"
            ></el-button>
          </div>
          <el-menu
            :collapse="isCollapse"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <template v-for="(v, k) in menuList">
              <el-submenu
                v-if="v.childs && v.childs.length != 0"
                :index="v.path"
                :key="k"
              >
                <template slot="title">
                  <i :class="v.iconName"></i>
                  <span slot="title">{{ v.text }}</span>
                </template>
                <el-menu-item
                  v-for="(value, key) in v.childs"
                  :key="key"
                  :index="value.path"
                  @click="menuClick(value)"
                >
                  <i :class="value.iconName"></i>
                  <span slot="title">{{ value.text }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="v.path"
                :key="k"
                @click="menuClick(v)"
              >
                <i :class="v.iconName"></i>
                <span slot="title">{{ v.text }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-container id="adminContainer">
          <el-main style="padding:5px">
            <div class="title-style">{{ $route.name }}</div>
            <div
              :style="{
                padding: '10px 5px',
                height: height + 'px',
                overflowX: 'hidden'
              }"
            >
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
    <el-drawer
      title="操作"
      size="350px"
      :visible="drawer"
      :before-close="drawerClose"
    >
      <div v-if="drawerType == 1" style="padding:15px">
        <el-button type="primary" style="width:100%" @click="logout"
          >退出登陆</el-button
        >
      </div>
      <div v-if="drawerType == 2" style="padding:15px">
        <span>历史</span>
      </div>
      <div v-if="drawerType == 3" style="padding:15px">
        <span>提醒</span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/**
 * 管理员系统入口界面
 */
import { loginControlle } from './api/index';
import apiUrlConfig from '@/config';
import { niceScroll } from '@/utils';
export default {
  name: 'app',
  components: {},
  data: () => {
    return {
      screenWidth: document.documentElement.clientWidth, //屏幕宽度
      isCollapse: false,
      drawerType: '0',
      drawer: false,
      menuList: [],
      navList: [
        {
          id: '1',
          path: '/blak1',
          nvaText: '时钟',
          icon: true,
          iconName: 'el-icon-s-operation'
        },
        {
          id: '2',
          path: '/blak2',
          nvaText: '时钟',
          icon: true,
          iconName: 'el-icon-time'
        },
        {
          id: '3',
          path: '',
          nvaText: '铃铛',
          icon: true,
          iconName: 'el-icon-bell'
        }
      ]
    };
  },
  methods: {
    logout() {
      loginControlle(
        res => {
          console.log(res);
          this.$store.dispatch('admin/logout');
          window.location.href = '/ggzp-shrs/adminLogin.html';
        },
        err => {
          console.log(err);
          this.$store.dispatch('admin/logout');
          window.location.href = '/ggzp-shrs/adminLogin.html';
        }
      );
    },
    drawerClose() {
      this.drawer = false;
    },
    openList(e) {
      console.log(e);
      this.drawerType = e.id;
      this.drawer = true;
    },
    menuClick(e) {
      this.$router.push(e.path);
    },
    treeDataformat(source, id, parentId, children) {
      let cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          child => father[id] == child[parentId]
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father[children] = branchArr) : ''; //给父级添加一个children属性，并赋值
        return father[parentId] == 1; // 如果第一层不是parentId=0，请自行修改
      });
    },
    handleOpen() {},
    handleClose() {}
  },
  computed: {
    height() {
      let h = document.documentElement.clientHeight;
      return h < 600 ? 600 : h - 112;
    },
    width() {
      let w = document.documentElement.clientWidth;
      return w < 1350 ? 64 : 300;
    }
  },
  mounted() {
    let dataList = this.$store.state.admin.userInfo.menus;
    dataList.map(e => {
      e.iconName = e.menuIcon;
      e.id = e.menuId;
      e.path = e.menuUrl;
      e.text = e.menuName;
      return e;
    });
    dataList.push({
      text: '父级',
      menuId: '',
      parentId: 1
    });
    let datas = this.treeDataformat(dataList, 'menuId', 'parentId', 'childs');
    this.menuList = datas[0].childs;
    niceScroll('.el-aside');
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#adminContainer {
  position: absolute;
  float: right;
  right: 0px;
  top: 0px;
  left: 300px;
  padding-top: 60px;
}
.el-aside {
  height: 100%;
}
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
}
.title-style::before {
  content: '';
  width: 4px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 13px;
  background: $g-mian-color;
}
#indexHeader {
  position: fixed;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  z-index: 999;
  background-color: $g-mian-color;
  color: $g-white-color !important;

  .el-row {
    width: 100%;
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
  .list {
    float: right;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
  }
  .listHover:hover {
    background-color: rgb(202, 89, 49);
    cursor: pointer;
  }
  .el-col {
    height: 100%;

    .nva-icon {
      color: #fff;
    }
  }
  ::v-deep .el-menu--horizontal {
    .el-menu-item {
      float: right;
    }
    .el-menu-item.is-active {
      border-bottom: 2px solid #ffc107;
      color: #ffc107;
    }
  }
}
</style>
