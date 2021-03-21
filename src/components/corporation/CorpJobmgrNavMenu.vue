<!--
 * @Author: GengHH
 * @Date: 2020-12-30 11:28:50
 * @LastEditTime: 2021-03-18 11:23:10
 * @LastEditors: GengHH
 * @Description: 单位模块子菜单
 * @FilePath: \jb2q-hrm-web\src\components\corporation\CorpJobmgrNavMenu.vue
-->
<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link to="/jobMgr/jobAdd">
      <el-menu-item index="/jobMgr/jobAdd">
        <i class="el-icon-user"></i>
        <span slot="title">
          发布职位
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobMgr/unpublishJobQuery">
      <el-menu-item index="/jobMgr/unpublishJobQuery">
        <i class="el-icon-menu"></i>
        <span slot="title">
          未发布职位
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobMgr/publishJobQuery">
      <el-menu-item index="/jobMgr/publishJobQuery">
        <i class="el-icon-document"></i>
        <span slot="title">
          已发布职位
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobMgr/overdueJobQuery">
      <el-menu-item index="/jobMgr/overdueJobQuery">
        <i class="el-icon-document"></i>
        <span slot="title">
          已过期职位
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobMgr/offJobQuery">
      <el-menu-item index="/jobMgr/offJobQuery">
        <i class="el-icon-document"></i>
        <span slot="title">
          已下架职位
        </span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
/**
 * 单位职位管理-子菜单显示组件
 */
export default {
  name: 'CorpJobmgrNavMenu',
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
