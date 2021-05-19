<!--
 * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-19 10:18:24
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\admin\admin.vue
-->
<template>
  <div id="app" style="width:100%;height:100%">
    <div style="height:100%">
      <el-header height="60px" style="padding:0">
        <div id="indexHeader">
          <el-row>
            <el-col :sm="24" :md="6" :lg="8" :xl="8" class="bg-purple">
              <img src="@/assets/img/logo.png" alt="" />
              <!-- <img class="logo2" src="@/assets/img/logo2.png" alt=""> -->
              <img class="logo3" src="@/assets/img/logo3.png" alt="" />
            </el-col>
            <el-col :sm="24" :md="18" :lg="16" :xl="16" class="bg-purple">
              <div
                v-for="(v, k) in navList"
                :key="k"
                class="list listHover"
                @click="openList(v)"
              >
                <i class="nva-icon" :class="v.iconName"></i>
              </div>
              <div class="list">
                欢迎您！{{ $store.state.admin.userInfo.logonUser.userName }}（{{
                  $store.state.admin.userInfo.logonUser.organName
                }}）
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <div style="height:100%">
        <el-aside
          calss="menu-transition"
          :style="{ width: (isCollapseTemp ? '64' : '300') + 'px' }"
        >
          <div style="text-align: center;margin-top:5px">
            <el-button
              size="mini"
              :icon="isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'"
              circle
              @click="collapseMenu"
            ></el-button>
          </div>
          <el-menu
            :collapse="isCollapse"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <template v-for="(v, k) in menuList">
              <el-submenu
                v-if="v.childs && v.childs.length != 0"
                :index="v.path"
                :key="k"
              >
                <template slot="title">
                  <i :class="v.iconName"></i>
                  <span slot="title">{{ v.text }}</span>
                </template>
                <el-menu-item
                  v-for="(value, key) in v.childs"
                  :key="key"
                  :index="value.path"
                  @click="menuClick(value)"
                >
                  <i :class="value.iconName"></i>
                  <span slot="title">{{ value.text }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="v.path"
                :key="k"
                @click="menuClick(v)"
              >
                <i :class="v.iconName"></i>
                <span slot="title">{{ v.text }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-container
          id="adminContainer"
          :style="{ left: (isCollapse ? '64' : '300') + 'px' }"
        >
          <el-main style="padding:5px">
            <div class="title-style">{{ $route.name }}</div>
            <div
              :style="{
                padding: '10px 5px',
                height: height + 'px',
                overflowX: 'hidden'
              }"
            >
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
    <el-drawer
      title="操作"
      size="350px"
      :visible="drawer"
      :before-close="drawerClose"
    >
      <div v-if="drawerType == 1" style="padding:15px">
        <el-button type="primary" style="width:100%" @click="logout"
          >退出登陆</el-button
        >
      </div>
      <div v-if="drawerType == 2" style="padding:15px">
        <span>历史</span>
      </div>
      <div v-if="drawerType == 3" style="padding:15px">
        <span>提醒</span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/**
 * 管理员系统入口界面
 */
import { loginControlle } from './api/index';
import apiUrlConfig from '@/config';
import { niceScroll } from '@/utils';
import { removeWatermark, setWaterMark } from '@/utils/watermark';
export default {
  name: 'app',
  components: {},
  data: () => {
    return {
      screenWidth: document.documentElement.clientWidth, //屏幕宽度
      isCollapse: false,
      isCollapseTemp: false,
      drawerType: '0',
      drawer: false,
      menuList: [],
      navList: [
        {
          id: '1',
          path: '/blak1',
          nvaText: '时钟',
          icon: true,
          iconName: 'el-icon-s-operation'
        },
        {
          id: '2',
          path: '/blak2',
          nvaText: '时钟',
          icon: true,
          iconName: 'el-icon-time'
        },
        {
          id: '3',
          path: '',
          nvaText: '铃铛',
          icon: true,
          iconName: 'el-icon-bell'
        }
      ]
    };
  },
  methods: {
    logout() {
      loginControlle(
        res => {
          console.log(res);
          this.$store.dispatch('admin/logout');
          window.location.href = '/ggzp-shrs/adminLogin.html';
        },
        err => {
          console.log(err);
          this.$store.dispatch('admin/logout');
          window.location.href = '/ggzp-shrs/adminLogin.html';
        }
      );
    },
    drawerClose() {
      this.drawer = false;
    },
    openList(e) {
      console.log(e);
      this.drawerType = e.id;
      this.drawer = true;
    },
    menuClick(e) {
      this.$router.push(e.path);
    },
    treeDataformat(source, id, parentId, children) {
      let cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          child => father[id] == child[parentId]
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father[children] = branchArr) : ''; //给父级添加一个children属性，并赋值
        return father[parentId] == 1; // 如果第一层不是parentId=0，请自行修改
      });
    },
    handleOpen() {},
    handleClose() {},
    collapseMenu() {
      this.isCollapseTemp = !this.isCollapse;
      if (!this.isCollapse) {
        setTimeout(() => {
          this.isCollapse = !this.isCollapse;
        }, 500);
      } else {
        this.isCollapse = !this.isCollapse;
      }
    }
  },
  computed: {
    height() {
      let h = document.documentElement.clientHeight;
      return h < 600 ? 600 : h - 112;
    },
    width() {
      let w = document.documentElement.clientWidth;
      return w < 1350 ? 64 : 300;
    }
  },
  mounted() {
    let dataList = this.$store.state.admin.userInfo.menus;
    dataList.map(e => {
      e.iconName = e.menuIcon;
      e.id = e.menuId;
      e.path = e.menuUrl;
      e.text = e.menuName;
      return e;
    });
    dataList.push({
      text: '父级',
      menuId: '',
      parentId: 1
    });
    let datas = this.treeDataformat(dataList, 'menuId', 'parentId', 'childs');

    // datas = [
    //   {
    //     text: '父级',
    //     menuId: '',
    //     parentId: 1,
    //     childs: [
    //       {
    //         dispOrder: 1,
    //         menuCode: 'zhgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0100',
    //         menuName: '账号管理',
    //         menuUrl: '/',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0100',
    //         path: '/',
    //         text: '账号管理'
    //       },
    //       {
    //         dispOrder: 2,
    //         menuCode: 'zdrqjyfwgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0200',
    //         menuName: '重点人群就业服务管理',
    //         menuUrl: '/serviceManagement',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0200',
    //         path: '/serviceManagement',
    //         text: '重点人群就业服务管理'
    //       },
    //       {
    //         dispOrder: 3,
    //         menuCode: 'zjgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0300',
    //         menuName: '专家管理',
    //         menuUrl: 'technocracy',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0300',
    //         path: 'technocracy',
    //         text: '专家管理',
    //         childs: [
    //           {
    //             dispOrder: 1,
    //             menuCode: 'zjkgl',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0301',
    //             menuName: '专家库管理',
    //             menuUrl: '/technocracy/management',
    //             parentId: '0300',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0301',
    //             path: '/technocracy/management',
    //             text: '专家库管理'
    //           },
    //           {
    //             dispOrder: 1,
    //             menuCode: 'zjkgl',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0302',
    //             menuName: '专家库管理审核',
    //             menuUrl: '/technocracy/managementAudit',
    //             parentId: '0300',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0302',
    //             path: '/technocracy/managementAudit',
    //             text: '专家库管理审核'
    //           },
    //           {
    //             dispOrder: 2,
    //             menuCode: 'zjjdjl',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0303',
    //             menuName: '专家结对记录',
    //             menuUrl: '/technocracy/record',
    //             parentId: '0300',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0303',
    //             path: '/technocracy/record',
    //             text: '专家结对记录'
    //           },
    //           {
    //             dispOrder: 3,
    //             menuCode: 'zjhdqk',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0304',
    //             menuName: '专家活动情况',
    //             menuUrl: '/technocracy/activity',
    //             parentId: '0300',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0304',
    //             path: '/technocracy/activity',
    //             text: '专家活动情况'
    //           },
    //           {
    //             dispOrder: 4,
    //             menuCode: 'zjythyjy',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0305',
    //             menuName: '专家研讨会议纪要',
    //             menuUrl: '/technocracy/summary',
    //             parentId: '0300',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0305',
    //             path: '/technocracy/summary',
    //             text: '专家研讨会议纪要'
    //           },
    //           {
    //             dispOrder: 5,
    //             menuCode: 'bbtj',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0306',
    //             menuName: '报表统计',
    //             menuUrl: '/technocracy/statistics',
    //             parentId: '0300',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0306',
    //             path: '/technocracy/statistics',
    //             text: '报表统计'
    //           }
    //         ]
    //       },
    //       {
    //         dispOrder: 4,
    //         menuCode: 'zyzd',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0400',
    //         menuName: '职业指导',
    //         menuUrl: '/profession',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0400',
    //         path: '/profession',
    //         text: '职业指导',
    //         childs: [
    //           {
    //             dispOrder: 3,
    //             menuCode: 'tshdgl',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0403',
    //             menuName: '特色活动管理',
    //             menuUrl: '/profession/management',
    //             parentId: '0400',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0403',
    //             path: '/profession/management',
    //             text: '特色活动管理'
    //           },
    //           {
    //             dispOrder: 4,
    //             menuCode: 'zyzdfk',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0404',
    //             menuName: '实施职业指导',
    //             menuUrl: '/profession/feedback',
    //             parentId: '0400',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0404',
    //             path: '/profession/feedback',
    //             text: '实施职业指导'
    //           }
    //         ]
    //       },
    //       {
    //         dispOrder: 5,
    //         menuCode: 'dwgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0500',
    //         menuName: '单位管理',
    //         menuUrl: '/unitManagement',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0500',
    //         path: '/unitManagement',
    //         text: '单位管理',
    //         childs: [
    //           {
    //             dispOrder: 1,
    //             menuCode: 'cxdwxx',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0501',
    //             menuName: '查询单位信息',
    //             menuUrl: '/unitManagement/message',
    //             parentId: '0500',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0501',
    //             path: '/unitManagement/message',
    //             text: '查询单位信息'
    //           },
    //           {
    //             dispOrder: 2,
    //             menuCode: 'dlzp',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0502',
    //             menuName: '代理招聘',
    //             menuUrl: '/unitManagement/recruitment',
    //             parentId: '0500',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0502',
    //             path: '/unitManagement/recruitment',
    //             text: '代理招聘'
    //           },
    //           {
    //             dispOrder: 3,
    //             menuCode: 'dwzhgl',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0503',
    //             menuName: '单位账号管理',
    //             menuUrl: '/unitManagement/management',
    //             parentId: '0500',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0503',
    //             path: '/unitManagement/management',
    //             text: '单位账号管理'
    //           },
    //           {
    //             dispOrder: 4,
    //             menuCode: 'dwzhgl',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0504',
    //             menuName: '转出入审核',
    //             menuUrl: '/unitManagement/audit',
    //             parentId: '0500',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0504',
    //             path: '/unitManagement/audit',
    //             text: '转出入审核'
    //           }
    //         ]
    //       },
    //       {
    //         dispOrder: 6,
    //         menuCode: 'zphgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0600',
    //         menuName: '招聘会管理',
    //         menuUrl: '/recruitmentManagement',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0600',
    //         path: '/recruitmentManagement',
    //         text: '招聘会管理',
    //         childs: [
    //           {
    //             dispOrder: 1,
    //             menuCode: 'ppbgl',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0601',
    //             menuName: '招聘会管理报告反馈',
    //             menuUrl: '/recruitmentManagement/feedback',
    //             parentId: '0600',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0601',
    //             path: '/recruitmentManagement/feedback',
    //             text: '招聘会管理报告反馈'
    //           },
    //           {
    //             dispOrder: 2,
    //             menuCode: 'bbfk',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0602',
    //             menuName: '招聘会排片表管理',
    //             menuUrl: '/recruitmentManagement/management',
    //             parentId: '0600',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0602',
    //             path: '/recruitmentManagement/management',
    //             text: '招聘会排片表管理'
    //           },
    //           {
    //             dispOrder: 3,
    //             menuCode: 'zphfkjg',
    //             menuIcon: 'el-icon-setting',
    //             menuId: '0603',
    //             menuName: '招聘会反馈结果',
    //             menuUrl: '/recruitmentManagement/result',
    //             parentId: '0600',
    //             statusId: '1',
    //             iconName: 'el-icon-setting',
    //             id: '0603',
    //             path: '/recruitmentManagement/result',
    //             text: '招聘会反馈结果'
    //           }
    //         ]
    //       },
    //       {
    //         dispOrder: 7,
    //         menuCode: 'ckzypjjl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0700',
    //         menuName: '职位评价查看',
    //         menuUrl: '/JobEvaluationReview/JobEvaluationReview',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0700',
    //         path: '/JobEvaluationReview/JobEvaluationReview',
    //         text: '职位评价查看'
    //       },
    //       {
    //         dispOrder: 8,
    //         menuCode: 'mgcgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0800',
    //         menuName: '敏感词管理',
    //         menuUrl: '/sensitiveWordManagement/sensitiveWordManagement',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0800',
    //         path: '/sensitiveWordManagement/sensitiveWordManagement',
    //         text: '敏感词管理'
    //       },
    //       {
    //         dispOrder: 9,
    //         menuCode: 'xtgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '0900',
    //         menuName: '单位简历参数设置',
    //         menuUrl: '/unitResumeParameterSetting/unitResumeParameterSetting',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '0900',
    //         path: '/unitResumeParameterSetting/unitResumeParameterSetting',
    //         text: '单位简历参数设置'
    //       },
    //       {
    //         dispOrder: 10,
    //         menuCode: 'xtgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '1000',
    //         menuName: '人力资源旗舰店',
    //         menuUrl: '/HRAudit/HRAudit',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '1000',
    //         path: '/HRAudit/HRAudit',
    //         text: '人力资源旗舰店'
    //       },
    //       {
    //         dispOrder: 11,
    //         menuCode: 'xtgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '1100',
    //         menuName: '用工余缺调剂管理',
    //         menuUrl: '/workManagement',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '1100',
    //         path: '/workManagement',
    //         text: '用工余缺调剂管理',
    //         childs: [
    //           {
    //             iconName: 'el-icon-setting',
    //             id: '1101',
    //             path: '/workManagement/gap',
    //             text: '用工缺口'
    //           },
    //           {
    //             iconName: 'el-icon-setting',
    //             id: '1102',
    //             path: '/workManagement/surplus',
    //             text: '用工剩余'
    //           }
    //         ]
    //       },
    //       {
    //         dispOrder: 12,
    //         menuCode: 'xtgl',
    //         menuIcon: 'el-icon-setting',
    //         menuId: '1200',
    //         menuName: '职位投诉管理',
    //         menuUrl: '/positionComplainManagement/positionComplainManagement',
    //         parentId: '',
    //         statusId: '1',
    //         iconName: 'el-icon-setting',
    //         id: '1200',
    //         path: '/positionComplainManagement/positionComplainManagement',
    //         text: '职位投诉管理'
    //       }
    //     ]
    //   }
    // ];

    this.menuList = datas[0].childs;

    niceScroll('.el-aside');
    //添加水印
    setWaterMark(
      this.$store.state.admin.userInfo.logonUser.userIdStr,
      this.$store.state.admin.userInfo.logonUser.userName
    );
  },
  created() {},
  destroyed() {
    //消除水印
    removeWatermark();
  }
};
</script>

<style lang="scss" scoped>
#adminContainer {
  position: absolute;
  float: right;
  right: 0px;
  top: 0px;
  //left: 300px;
  padding-top: 60px;
}
.el-aside {
  height: 100%;
  transition: width 1s ease-out;
}
.title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 40px;
  border-bottom: 1px solid #e9eef3;
  text-align: left;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
  margin: 0 0 15px 0;
}
.title-style::before {
  content: '';
  width: 4px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 13px;
  background: $g-mian-color;
}
#indexHeader {
  position: fixed;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  z-index: 999;
  background-color: $g-mian-color;
  color: $g-white-color !important;

  .el-row {
    width: 100%;
    height: 100%;
    img {
      float: left;
      width: 30px;
      height: 32px;
      position: relative;
      top: 14px;
      display: block;
    }
    img:last-child {
      width: 194px;
      height: 32px;
    }
  }
  .list {
    float: right;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
  }
  .listHover:hover {
    background-color: rgb(202, 89, 49);
    cursor: pointer;
  }
  .el-col {
    height: 100%;

    .nva-icon {
      color: #fff;
    }
  }
  ::v-deep .el-menu--horizontal {
    .el-menu-item {
      float: right;
    }
    .el-menu-item.is-active {
      border-bottom: 2px solid #ffc107;
      color: #ffc107;
    }
  }
}
</style>
