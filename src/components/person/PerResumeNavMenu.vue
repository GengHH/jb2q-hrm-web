<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <i class="el-icon-user"></i>
      <span slot="title">基本信息</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">求职意向</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">工作经历</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-school"></i>
      <span slot="title">教育经历</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-reading"></i>
      <span slot="title">外语能力</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-files"></i>
      <span slot="title">技能证书</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-postcard"></i>
      <span slot="title">自我评价</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
/**
 * 个人简历界面-子菜单显示组件
 */
export default {
  name: 'PerResumeNavMenu',
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
