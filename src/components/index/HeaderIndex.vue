<!--
 * @Author: your name
 * @Date: 2020-12-03 10:04:12
 * @LastEditTime: 2021-02-08 16:43:49
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\components\index\HeaderIndex.vue
-->
<template>
  <div id="indexHeader">
    <el-row>
      <el-col :sm="24" :md="6" :lg="8" :xl="8" class="bg-purple">
        <img src="@/assets/img/logo.png" alt="" />
        <!-- <img class="logo2" src="@/assets/img/logo2.png" alt=""> -->
        <img class="logo3" src="@/assets/img/logo3.png" alt="" />
      </el-col>
      <el-col :sm="24" :md="18" :lg="16" :xl="16" class="bg-purple">
        <!-- <el-breadcrumb separator="">
          <el-breadcrumb-item
            v-for="nvaIndex in navList"
            :key="nvaIndex.id"
            :to="{ path: nvaIndex.path }"
          >
            {{ nvaIndex.nvaText }}
          </el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          router
          background-color="#fc6f3d"
          text-color="#fff"
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
export default {
  name: 'HeaderIndex',
  props: {
    navList: Array
  },
  data() {
    return {
      activeIndex: '/',
      inco: true
    };
  },
  created() {
    console.log(this.$route);
    if (this.$route.path) {
      this.activeIndex = this.$route.path;
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

  .bg-purple {
    //background: #d3dce6;
  }
  .bg-purple-light {
    //background: #e5e9f2;
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
