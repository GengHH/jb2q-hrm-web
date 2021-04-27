<!--
 * @Author: GengHH
 * @Date: 2020-12-30 11:28:50
 * @LastEditTime: 2021-04-27 14:47:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\components\person\PerCenterNavMenu.vue
-->
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <router-link to="/personalCenter/updatePhoneNum">
      <el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">
          修改手机号
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/personalCenter/shieldCorporation">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          屏蔽特定企业
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/personalCenter/permissionSettings">
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">
          权限设置
        </span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
/**
 * 个人中心界面-子菜单显示组件
 */
export default {
  name: 'PerCenterNavMenu',
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

<style lang="scss" scoped>
.el-submenu {
  .el-menu-item {
    padding-right: 0 !important;
    min-width: auto !important;
  }
}
</style>
