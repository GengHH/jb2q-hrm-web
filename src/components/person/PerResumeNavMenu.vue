<!--
 * @Author: GengHH
 * @Date: 2020-12-21 17:18:03
 * @LastEditTime: 2020-12-31 17:17:26
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\components\person\PerResumeNavMenu.vue
-->
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link
      v-for="navIndex in navArray"
      :key="navIndex.id"
      :to="navIndex.path"
    >
      <el-menu-item :index="navIndex.id" v-if="navIndex.disabled" disabled>
        <i :class="navIndex.incoName"></i>
        <span slot="title">{{ navIndex.name }}</span>
      </el-menu-item>
      <el-menu-item :index="navIndex.id" v-else>
        <i :class="navIndex.incoName"></i>
        <span slot="title">{{ navIndex.name }}</span>
      </el-menu-item>
    </router-link>
    <el-menu-item index="8">
      <i class="el-icon-document"></i>
      <span slot="title" @click="anchorPoint()">锚点测试</span>
    </el-menu-item>
    <!-- <el-menu-item index="1">
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
    </el-menu-item> -->
  </el-menu>
</template>

<script>
/**
 * 个人简历界面-子菜单显示组件
 */
export default {
  name: 'PerResumeNavMenu',
  data() {
    return {
      navArray: [
        {
          id: '1',
          path: '/resumeMgr/baseInfo',
          name: '基本信息',
          incoName: 'el-icon-user',
          disabled: false
        },
        {
          id: '2',
          path: '/resumeMgr/jobIntention',
          name: '求职意向',
          incoName: 'el-icon-menu'
        },
        {
          id: '3',
          path: '/resumeMgr/workExperience',
          name: '工作经历',
          incoName: 'el-icon-document'
        },
        {
          id: '4',
          path: '/resumeMgr/educationExperience',
          name: '教育经历',
          incoName: 'el-icon-school'
        },
        {
          id: '5',
          path: '/resumeMgr/languageSkills',
          name: '外语能力',
          incoName: 'el-icon-reading'
        },
        {
          id: '6',
          path: '/resumeMgr/skillsCertificate',
          name: '技能证书',
          incoName: 'el-icon-files'
        },
        {
          id: '7',
          path: '/resumeMgr/selfEvaluation',
          name: '自我评价',
          incoName: 'el-icon-postcard'
        }
      ]
    };
  },
  methods: {
    handleOpen() {
      console.log(1);
    },
    handleClose() {
      console.log(2);
    },
    anchorPoint() {
      $('html, body').animate(
        { scrollTop: $('#point').offset().top - 60 },
        1000
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
