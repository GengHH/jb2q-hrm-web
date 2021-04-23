<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:41:00
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-23 17:00:12
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\components\person\PerFindJobBackNavMenu.vue
-->
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <router-link to="/jobFindFeedback/jobFindRecord">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">求职记录</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>关注收藏列表</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <router-link to="/jobFindFeedback/corporationAttention">
          <el-menu-item index="2-1"
            ><i class="el-icon-view"></i>单位关注</el-menu-item
          >
        </router-link>
        <router-link to="/jobFindFeedback/jobStarList">
          <el-menu-item index="2-2"
            ><i class="el-icon-star-off"></i>职位收藏列表</el-menu-item
          >
        </router-link>
      </el-menu-item-group>
    </el-submenu>
    <router-link to="/jobFindFeedback/jobEvaluation">
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">职位评价</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
/**
 * 个人求职反馈-子菜单显示组件
 */
export default {
  name: 'PerFindJobBackNavMenu',
  data() {
    return {
      isCollapse: false
    };
  },
  created() {
    this.changeMenuStyle();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        'resize',
        this._.throttle(
          //监听浏览器窗口大小改变
          //浏览器变化执行动作
          this.changeMenuStyle,
          500
        )
      );
    });
  },
  methods: {
    changeMenuStyle() {
      if (window.innerWidth < 1350) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    handleOpen() {
      console.log(1);
    },
    handleClose() {
      console.log(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-submenu {
  .el-menu-item {
    padding-right: 0 !important;
    min-width: auto !important;
  }
}
</style>
