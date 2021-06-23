<!--
 * @Author: GengHH
 * @Date: 2020-12-30 11:28:50
 * @LastEditTime: 2021-06-23 14:29:45
 * @LastEditors: GengHH
 * @Description: 单位模块子菜单
 * @FilePath: \jb2q-hrm-web\src\components\corporation\CorpJobfindmgrNavMenu.vue
-->
<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <router-link to="/jobFindMgr/resumeReceived">
      <el-menu-item index="/jobFindMgr/resumeReceived">
        <i class="el-icon-user"></i>
        <span slot="title">
          收到的简历
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/jobFindMgr/resumeCollected">
      <el-menu-item index="/jobFindMgr/resumeCollected">
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
