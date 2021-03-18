<!--
 * @Author: GengHH
 * @Date: 2020-12-30 11:28:50
 * @LastEditTime: 2021-01-27 18:43:46
 * @LastEditors: GengHH
 * @Description: 单位模块子菜单
 * @FilePath: \jb2q-hrm-web\src\components\corporation\CorpNavMenu.vue
-->
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link to="/jobFindMgr/resumeReceived">
      <el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">
          收到的简历
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobFindMgr/resumeCollected">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          已收藏的简历
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
