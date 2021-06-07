/*
 * @Author: GengHH
 * @Date: 2021-03-02 16:47:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-04 17:16:31
 * @Description: 管理员模块的全局key信息
 * @FilePath: \jb2q-hrm-web\src\store\modules\admin.js
 */
import { isEmptyObject } from '@/utils/index';
const state = {
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
      commit('SET_USERINFO', {});
      commit('SET_TOKEN', 'login');
      commit('SET_LOGINTYPE', '');
      commit('SET_CENTER', '');
      commit('SET_LOGINSTATUS', 0);
      commit('SET_LOGIN_TIME', 0);
      //sessionStorage.setItem('vuex', null);
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
      commit('SET_USERINFO', {});
      commit('SET_TOKEN', '');
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
