<!--
 * @Author: GengHH
 * @Date: 2020-12-21 17:18:03
 * @LastEditTime: 2021-04-23 17:00:20
 * @LastEditors: GengHH
 * @Description: 个人简历界面-子菜单显示组件
 * @FilePath: \jb2q-hrm-web\src\components\person\PerResumeNavMenu.vue
-->
<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <!-- <router-link
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
      <span slot="title" @click="anchorPoint('point')">锚点测试</span>
    </el-menu-item> -->

    <el-menu-item
      v-for="navIndex in navArray"
      :key="navIndex.id"
      :index="navIndex.id"
      @click="anchorPoint(navIndex.anchorPointId)"
    >
      <i :class="navIndex.incoName"></i>
      <span slot="title">{{ navIndex.name }}</span>
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
      isCollapse: false,
      navArray: [
        {
          id: '1',
          path: '/resumeMgr/baseInfo',
          name: '基本信息',
          incoName: 'el-icon-user',
          disabled: false,
          anchorPointId: 'baseInfo'
        },
        {
          id: '2',
          path: '/resumeMgr/jobIntention',
          name: '求职意向',
          incoName: 'el-icon-menu',
          disabled: false,
          anchorPointId: 'jobIntention'
        },
        {
          id: '3',
          path: '/resumeMgr/workExperience',
          name: '工作经历',
          incoName: 'el-icon-document',
          disabled: false,
          anchorPointId: 'workExperience'
        },
        {
          id: '4',
          path: '/resumeMgr/educationExperience',
          name: '教育经历',
          incoName: 'el-icon-school',
          disabled: false,
          anchorPointId: 'educationExperience'
        },
        {
          id: '5',
          path: '/resumeMgr/languageSkills',
          name: '外语能力',
          incoName: 'el-icon-reading',
          disabled: false,
          anchorPointId: 'languageSkills'
        },
        {
          id: '6',
          path: '/resumeMgr/skillsCertificate',
          name: '技能证书',
          incoName: 'el-icon-files',
          disabled: false,
          anchorPointId: 'skillsCertificate'
        },
        {
          id: '7',
          path: '/resumeMgr/selfEvaluation',
          name: '自我评价',
          incoName: 'el-icon-postcard',
          disabled: false,
          anchorPointId: 'selfEvaluation'
        }
      ]
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
    },
    anchorPoint(id) {
      console.log(id);
      $('#indexApp').animate({ scrollTop: $('#' + id).offset().top - 60 }, 500);
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
