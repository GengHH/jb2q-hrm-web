/*
 * @Author: GengHH
 * @Date: 2021-03-02 16:47:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-02 18:33:39
 * @Description: 管理员模块的全局key信息
 * @FilePath: \jb2q-hrm-web\src\storeAdmin\modules\admin.js
 */
import { isEmptyObject } from '@/utils/index';
const state = {
  //用户标签
  label: [],
  //用户信息
  userInfo: {},
  //用户token
  token: '',
  //用户名
  name: '',
  //用户头像
  avatar: '',
  //用户选择城市，默认江苏省
  city: '江苏省_320000',
  //用户选择地区
  region: '',
  //高校用户选择城市
  college_city: '',
  //高校用户选择地区
  college_region: '',
  //登录专区。主页：pingtai,就业淘宝：jiuyetaobao,高校毕业生专区：gaoxiao
  login_type: '',
  //登录中心:个人登录：person，单位登录：unit，高校登录：college，商户登录：merchant
  center: '',
  //登录状态:1:登录中，0：未登录
  login_status: 0,
  //登录时间，超出半个小时即登录失效
  login_time: 0
};

const mutations = {
  SET_LABEL: (state, label) => {
    state.label = label;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_CITY: (state, city) => {
    state.city = city;
  },
  SET_REGION: (state, region) => {
    state.region = region;
  },
  SET_COLLEGE_CITY: (state, city) => {
    state.college_city = city;
  },
  SET_COLLEGE_REGION: (state, region) => {
    state.college_region = region;
  },
  SET_LOGINTYPE: (state, login_type) => {
    state.login_type = login_type;
  },
  SET_CENTER: (state, center) => {
    state.center = center;
  },
  SET_LOGINSTATUS: (state, login_status) => {
    state.login_status = login_status;
  },
  SET_LOGIN_TIME: (state, login_time) => {
    state.login_time = login_time;
  }
};

const actions = {
  //用户登录（开发发环境使用）
  do_login({ commit }) {
    return new Promise(resolve => {
      commit('SET_USERINFO', {
        logonUser: {
          areaInfo: {
            areaCode: '07',
            areaCode1: '0700',
            areaCode2: '073200',
            areaCode3: '',
            areaCode4: '',
            areaCode5: '',
            areaCode6: '',
            areaName: '普陀',
            areaName1: '普陀',
            areaName2: '上海市普陀区人民政府办公室',
            areaName3: '',
            areaName4: '',
            areaName5: '',
            areaName6: ''
          },
          domainId: 1,
          domainIdKey: '1',
          domainIdStr: '',
          domainName: '',
          expire: -1,
          extInfo: {
            communityCode: '',
            communityName: '',
            cookieToken: '',
            deptCode: '',
            deptId: '',
            deptName: '',
            deptType: '',
            deviceSN: '',
            districtCode: '07',
            districtName: '普陀',
            logid: '',
            loginCaType: '',
            loginName: 'c51ce410c124a10e',
            organCode: '',
            organId: '0732',
            organName: '上海市普陀区人民政府办公室',
            organStatus: '',
            organType: '',
            passBySb: false,
            pid: '',
            sbdwmc: '',
            sessionId: '',
            sfbz: 'TEST_310105650117281',
            streetCode: '0700',
            streetName: '普陀',
            tyshxym: '',
            userId: '9000003910',
            userKey: '310105196501172810',
            userName: '金铭华',
            userPhone: '',
            userType: '02',
            yxbz: '1'
          },
          loginName: 'c51ce410c124a10e',
          organId: '',
          organIdKey: '0732',
          organIdStr: '0732',
          organName: '上海市普陀区人民政府办公室',
          organType: '',
          readOnly: false,
          roleKey: 'SC:R:1_c4ca4238a0b923820dcc509a6f75849b',
          roles: [
            {
              roleId: '01',
              roleName: '普通角色'
            }
          ],
          userId: '',
          userIdKey: '9000003910',
          userIdStr: '9000003910',
          userKey:
            '1cf393ce8ce76d027c3ffc6a2db55b2048544254462e2dd2c86c8130389a1c65',
          userName: '金铭华',
          userType: '02'
        },
        menus: [
          {
            dispOrder: 1,
            menuCode: 'zhgl',
            menuIcon: 'el-icon-setting',
            menuId: '0100',
            menuName: '账号管理',
            menuUrl: '/',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 2,
            menuCode: 'zdrqjyfwgl',
            menuIcon: 'el-icon-setting',
            menuId: '0200',
            menuName: '重点人群就业服务管理',
            menuUrl: '/serviceManagement',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 3,
            menuCode: 'zjgl',
            menuIcon: 'el-icon-setting',
            menuId: '0300',
            menuName: '专家管理',
            menuUrl: 'technocracy',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 1,
            menuCode: 'zjkgl',
            menuIcon: 'el-icon-setting',
            menuId: '0301',
            menuName: '专家库管理',
            menuUrl: '/technocracy/management',
            parentId: '0300',
            statusId: '1'
          },
          {
            dispOrder: 1,
            menuCode: 'zjkgl',
            menuIcon: 'el-icon-setting',
            menuId: '0302',
            menuName: '专家库管理审核',
            menuUrl: '/technocracy/managementAudit',
            parentId: '0300',
            statusId: '1'
          },
          {
            dispOrder: 2,
            menuCode: 'zjjdjl',
            menuIcon: 'el-icon-setting',
            menuId: '0303',
            menuName: '专家结对记录',
            menuUrl: '/technocracy/record',
            parentId: '0300',
            statusId: '1'
          },
          {
            dispOrder: 3,
            menuCode: 'zjhdqk',
            menuIcon: 'el-icon-setting',
            menuId: '0304',
            menuName: '专家活动情况',
            menuUrl: '/technocracy/activity',
            parentId: '0300',
            statusId: '1'
          },
          {
            dispOrder: 4,
            menuCode: 'zjythyjy',
            menuIcon: 'el-icon-setting',
            menuId: '0305',
            menuName: '专家研讨会议纪要',
            menuUrl: '/technocracy/summary',
            parentId: '0300',
            statusId: '1'
          },
          {
            dispOrder: 5,
            menuCode: 'bbtj',
            menuIcon: 'el-icon-setting',
            menuId: '0306',
            menuName: '报表统计',
            menuUrl: '/technocracy/statistics',
            parentId: '0300',
            statusId: '1'
          },
          {
            dispOrder: 4,
            menuCode: 'zyzd',
            menuIcon: 'el-icon-setting',
            menuId: '0400',
            menuName: '职业指导',
            menuUrl: '/profession',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 3,
            menuCode: 'tshdgl',
            menuIcon: 'el-icon-setting',
            menuId: '0403',
            menuName: '特色活动管理',
            menuUrl: '/profession/management',
            parentId: '0400',
            statusId: '1'
          },
          {
            dispOrder: 4,
            menuCode: 'zyzdfk',
            menuIcon: 'el-icon-setting',
            menuId: '0404',
            menuName: '实施职业指导',
            menuUrl: '/profession/feedback',
            parentId: '0400',
            statusId: '1'
          },
          {
            dispOrder: 5,
            menuCode: 'dwgl',
            menuIcon: 'el-icon-setting',
            menuId: '0500',
            menuName: '单位管理',
            menuUrl: '/unitManagement',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 1,
            menuCode: 'cxdwxx',
            menuIcon: 'el-icon-setting',
            menuId: '0501',
            menuName: '查询单位信息',
            menuUrl: '/unitManagement/message',
            parentId: '0500',
            statusId: '1'
          },
          {
            dispOrder: 2,
            menuCode: 'dlzp',
            menuIcon: 'el-icon-setting',
            menuId: '0502',
            menuName: '代理招聘',
            menuUrl: '/unitManagement/recruitment',
            parentId: '0500',
            statusId: '1'
          },
          {
            dispOrder: 3,
            menuCode: 'dwzhgl',
            menuIcon: 'el-icon-setting',
            menuId: '0503',
            menuName: '单位账号管理',
            menuUrl: '/unitManagement/management',
            parentId: '0500',
            statusId: '1'
          },
          {
            dispOrder: 4,
            menuCode: 'zrzc',
            menuIcon: 'el-icon-setting',
            menuId: '0504',
            menuName: '转入转出',
            menuUrl: '/unitManagement/audit',
            parentId: '0500',
            statusId: '1'
          },
          {
            dispOrder: 6,
            menuCode: 'zphgl',
            menuIcon: 'el-icon-setting',
            menuId: '0600',
            menuName: '招聘会管理',
            menuUrl: '/recruitmentManagement',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 1,
            menuCode: 'ppbgl',
            menuIcon: 'el-icon-setting',
            menuId: '0601',
            menuName: '招聘会管理报告反馈',
            menuUrl: '/recruitmentManagement/feedback',
            parentId: '0600',
            statusId: '1'
          },
          {
            dispOrder: 2,
            menuCode: 'bbfk',
            menuIcon: 'el-icon-setting',
            menuId: '0602',
            menuName: '招聘会排片表管理',
            menuUrl: '/recruitmentManagement/management',
            parentId: '0600',
            statusId: '1'
          },
          {
            dispOrder: 3,
            menuCode: 'zphfkjg',
            menuIcon: 'el-icon-setting',
            menuId: '0603',
            menuName: '招聘会反馈结果',
            menuUrl: '/recruitmentManagement/result',
            parentId: '0600',
            statusId: '1'
          },
          {
            dispOrder: 7,
            menuCode: 'ckzypjjl',
            menuIcon: 'el-icon-setting',
            menuId: '0700',
            menuName: '职位评价查看',
            menuUrl: '/JobEvaluationReview/JobEvaluationReview',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 8,
            menuCode: 'mgcgl',
            menuIcon: 'el-icon-setting',
            menuId: '0800',
            menuName: '敏感词管理',
            menuUrl: '/sensitiveWordManagement/sensitiveWordManagement',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 9,
            menuCode: 'xtgl',
            menuIcon: 'el-icon-setting',
            menuId: '0900',
            menuName: '单位简历参数设置',
            menuUrl: '/unitResumeParameterSetting/unitResumeParameterSetting',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 10,
            menuCode: 'rzgw',
            menuIcon: 'el-icon-setting',
            menuId: '1000',
            menuName: '热招职位',
            menuUrl: '/hotPost/hotPost',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 11,
            menuCode: 'jzgw',
            menuIcon: 'el-icon-setting',
            menuId: '1000',
            menuName: '急招职位',
            menuUrl: '/vexedlyPost/vexedlyPost',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 11,
            menuCode: 'zwtsgl',
            menuIcon: 'el-icon-setting',
            menuId: '1100',
            menuName: '职位投诉管理',
            menuUrl: '/positionComplainManagement/positionComplainManagement',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 12,
            menuCode: 'zgyqtj',
            menuIcon: 'el-icon-setting',
            menuId: '1200',
            menuName: '用工余缺调剂',
            menuUrl: '/workManagement',
            parentId: '',
            statusId: '1'
          },
          {
            dispOrder: 13,
            menuCode: 'zjkgl',
            menuIcon: 'el-icon-setting',
            menuId: '1201',
            menuName: '用工缺口',
            menuUrl: '/workManagement/gap',
            parentId: '1200',
            statusId: '1'
          },
          {
            dispOrder: 13,
            menuCode: 'zjkgl',
            menuIcon: 'el-icon-setting',
            menuId: '1202',
            menuName: '用工剩余',
            menuUrl: '/workManagement/surplus',
            parentId: '1200',
            statusId: '1'
          }
        ],
        result: true
      });
      commit('SET_TOKEN', 'login123');
      commit('SET_NAME', 'name123');
      commit('SET_LOGINTYPE', '');
      commit('SET_CENTER', '');
      commit('SET_LOGINSTATUS', 0);
      commit('SET_LOGIN_TIME', 0);
      resolve();
    });
  },

  //用户登录
  setUserInfo({ commit }, userList) {
    let str = '登陆失败：未获取到用户信息';
    return new Promise((resolve, reject) => {
      let userInfo = userList.logonUser;
      try {
        if (!isEmptyObject(userInfo)) {
          if (
            userInfo.userName &&
            userInfo.userIdStr &&
            userInfo.roles.length > 0
          ) {
            console.log(123123412341234);
            commit('SET_USERINFO', userList);
            //默认加个login 后期替换token
            commit('SET_TOKEN', 'login');
            resolve();
          } else {
            reject(str);
          }
        } else {
          reject(str);
        }
      } catch (error) {
        reject(str);
      }
    });
  },
  //用户退出
  logout({ commit }) {
    return new Promise(resolve => {
      // commit('SET_USERINFO', {});
      // commit('SET_TOKEN', '');
      // commit('SET_NAME', '');
      localStorage.setItem('a-vuex', null);
      resolve();
    });
  },
  //set标签
  setLabel({ commit }, userList) {
    return new Promise((resolve, reject) => {
      commit('SET_LABEL', userList);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
