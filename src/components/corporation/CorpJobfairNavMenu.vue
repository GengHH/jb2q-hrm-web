<!--
 * @Author: GengHH
 * @Date: 2020-12-30 11:28:50
 * @LastEditTime: 2021-04-12 18:39:08
 * @LastEditors: GengHH
 * @Description: 单位模块招聘会子菜单
 * @FilePath: \jb2q-hrm-web\src\components\corporation\CorpJobfairNavMenu.vue
-->
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link to="/jobFair/jobFairApply">
      <el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">
          单位招聘会报名
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobFair/jobFairReview">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          报名审核结果
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobFair/jobFairResume">
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">
          收到招聘会简历
        </span>
      </el-menu-item>
    </router-link>
    </router-link>
  </el-menu>
</template>

<script>
/**
 * 单位职位管理-子菜单显示组件
 */
export default {
  name: 'CorpNavMenu',
  data() {
    return {};
  },
  methods: {
    handleOpen() {
      console.log(1);
    },
    handleClose() {
      console.log(2);
    }
  }
};
</script>

<style lang="scss" scoped></style>
