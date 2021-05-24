<!--
 * @Author: GengHH
 * @Date: 2020-12-30 11:28:50
 * @LastEditTime: 2021-05-24 14:55:46
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
    :collapse="isCollapse"
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
        <i class="el-icon-edit-outline"></i>
        <span slot="title">
          未发布职位
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobMgr/publishJobQuery">
      <el-menu-item index="/jobMgr/publishJobQuery">
        <i class="el-icon-menu"></i>
        <span slot="title">
          已发布职位
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobMgr/overdueJobQuery">
      <el-menu-item index="/jobMgr/overdueJobQuery">
        <i class="el-icon-folder-delete"></i>
        <span slot="title">
          已过期职位
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobMgr/offJobQuery">
      <el-menu-item index="/jobMgr/offJobQuery">
        <i class="el-icon-c-scale-to-original"></i>
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
        this._.debounce(
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

<style lang="scss" scoped></style>
