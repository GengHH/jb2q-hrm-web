<!--
 * @Author: your name
 * @Date: 2021-03-17 09:54:08
 * @LastEditTime: 2021-03-17 11:16:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\components\person\remindMenu.vue
-->
<template>
  <el-menu
    default-active="3"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link to="/remind">
      <el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">
          系统消息
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/remind">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          推送消息
        </span>
      </el-menu-item>
    </router-link>
    <router-link to="/remind/remind">
      <el-menu-item index="3">
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
  name: 'remindMenu',
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

<style lang="scss" scoped></style>
