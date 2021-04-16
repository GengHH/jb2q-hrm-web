/*
 * @Author: GengHH
 * @Date: 2021-03-02 16:47:36
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-16 19:14:01
 * @Description: 单位模块基本信息
 * @FilePath: \jb2q-hrm-web\src\store\modules\corporation.js
 */
import { getLogonUser, checkCorpInit } from '@/api/corporationApi';
import router from '@/pages/corporation/router';
const state = {
  //用户token
  token: '',
  //是否首次进入系统
  first_login: true,
  //证件号码
  tyshxym: '',
  //单位标识
  cid: '',
  //用户名
  dwmc: '',
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
  //登录中心:单位登录：person，单位登录：unit，高校登录：college，商户登录：merchant
  center: '',
  //登录状态:1:登录中，0：未登录
  login_status: 0,
  //登录时间，超出半个小时即登录失效
  login_time: 0
};

const mutations = {
  SET_CORPORATIONINOF: (state, value) => {
    //state.tyshxym = value.logonUser.tyshxym || '91310107667812584X';
    state.cid = value.logonUser.organIdStr || '200008010546251';
    state.dwmc = value.logonUser.organName || '集团';
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_FIRST_LOGIN: (state, first_login) => {
    state.first_login = first_login;
  },
  SET_DWMC: (state, name) => {
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
const getters = {
  // username(state) {
  //   return state.name;
  // }
  token: state => state.token,
  first_login: state => state.first_login,
  username: state => state.dwmc,
  cid: state => state.cid
};
const actions = {
  //用户登录
  // login({ commit }, userInfo) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       if (userInfo.loginType.length > 0 && userInfo.center.length > 0) {
  //         let data = sessionStorage.vuex;
  //         let token;
  //         if (data && data != 'null' && data != '' && data.length > 0) {
  //           data = JSON.parse(data);
  //           if (data.webuser) {
  //             token = data.webuser.token;
  //           }
  //         } else {
  //           reject('登陆失败：未获取到sessionSrorage用户');
  //         }
  //         commit('SET_TOKEN', token);
  //         commit('SET_LOGINTYPE', userInfo.loginType);
  //         commit('SET_CENTER', userInfo.center);
  //         commit('SET_LOGINSTATUS', 1);
  //         commit('SET_LOGIN_TIME', new Date().getTime());
  //         resolve();
  //       } else {
  //         reject('登陆失败：解析loginType和center字段出错');
  //       }
  //     } catch (error) {
  //       reject('登陆失败：解析loginType和center字段出错');
  //     }
  //   });
  // },
  //用户登录（开发发环境使用）
  do_login({ commit }) {
    return new Promise(resolve => {
      commit('SET_CORPORATIONINOF', {
        logonUser: {
          //tyshxym: '91310107667812584X',
          organIdStr: '200008010546251',
          organName: '万达信息股份有限公司'
        }
      });
      commit('SET_TOKEN', 'login');
      commit('SET_FIRST_LOGIN', false);
      commit('SET_LOGINTYPE', '');
      commit('SET_CENTER', '');
      commit('SET_LOGINSTATUS', 0);
      commit('SET_LOGIN_TIME', 0);
      //sessionStorage.setItem('vuex', null);
      resolve();
    });
  },
  //用户退出
  do_logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_CORPORATIONINOF', { logonUser: {} });
      commit('SET_TOKEN', '');
      commit('SET_FIRST_LOGIN', true);
      commit('SET_LOGINTYPE', '');
      commit('SET_CENTER', '');
      commit('SET_LOGINSTATUS', 0);
      commit('SET_LOGIN_TIME', 0);
      localStorage.setItem('vuex', null);
      resolve();
    });
  },

  get_corporationInfo({ commit }) {
    getLogonUser()
      .then(async res => {
        console.log('单位登录信息', res);
        if (res.status == 200 && res.result.logonUser?.organIdStr) {
          commit('SET_CORPORATIONINOF', res.result);
          commit('SET_TOKEN', 'login');
          // let checkRes = await checkCorpInit({
          //   cid: res.result.logonUser?.organIdStr
          // }).catch(() => {
          //   // 检验单位信息失败，显示系统异常界面
          //   router.push('/error');
          // });
          // //判断是不是首次进入系统
          // if (
          //   checkRes.status === 200 &&
          //   checkRes.result.data &&
          //   checkRes.result.data.isInit === '1'
          // ) {
          //   commit('SET_FIRST_LOGIN', false);
          // }
          //commit('SET_FIRST_LOGIN', true);
        } else {
          // 登录成功但是获取人员进本信息失败，显示系统异常界面
          router.push('/error');
          console.log('加载单位登录信息失败：' + res.message);
        }
      })
      .catch(e => {
        console.log('加载单位登录信息出错：' + e);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
