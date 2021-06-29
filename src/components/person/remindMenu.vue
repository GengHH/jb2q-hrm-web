<!--
 * @Author: your name
 * @Date: 2021-03-17 09:54:08
 * @LastEditTime: 2021-06-28 16:26:57
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\components\person\remindMenu.vue
-->
<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link to="/remind/systemMsg">
      <el-menu-item index="/remind/systemMsg">
        <i class="el-icon-user"></i>
        <span slot="title">
          系统消息
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/remind/pushMsg">
      <el-menu-item index="/remind/pushMsg">
        <i class="el-icon-menu"></i>
        <span slot="title">
          推送消息
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/remind/remindCenter">
      <el-menu-item index="/remind/remindCenter">
        <i class="el-icon-document"></i>
        <span slot="title">
          私信
        </span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
export default {
  name: 'personLayout',
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleOpen() {
      console.log(1);
    },
    handleClose() {
      console.log(2);
    }
  },
  created() {}
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
