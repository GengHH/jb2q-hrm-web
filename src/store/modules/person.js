/*
 * @Author: GengHH
 * @Date: 2021-03-02 16:47:21
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-16 13:46:01
 * @Description: 个人模块的全局个人信息
 * @FilePath: \jb2q-hrm-web\src\store\modules\person.js
 */
import { getLogonUser, checkPsnlInit } from '@/api/personApi';
import router from '@/pages/person/router';
const state = {
  //用户token
  token: '',
  //判断是不是首次进入系统的接口是不是已经调用完毕
  first_check: false,
  //是不是首次登录本系统
  first_login: true,
  //证件号码
  zjhm: '',
  //个人标识
  pid: '',
  //用户名
  name: '',
  //用户头像
  avatar: '',
  //用户性别 1：男,2:女
  sex: '1',
  //用户选择城市，默认江苏省
  city: '上海市',
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
  login_time: 0,
  // 未读信息数据数量
  message_count: 0
};

const mutations = {
  SET_PERSONINOF: (state, value) => {
    state.zjhm = value.logonUser.zjhm || '310111199901011234';
    state.pid = value.pid || '123123123123';
    state.name = value.logonUser.userName || '打工人';
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_FIRST_CHECK: (state, first_check) => {
    state.first_check = first_check;
  },
  SET_FIRST_LOGIN: (state, first_login) => {
    state.first_login = first_login;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_SEX: (state, sex) => {
    state.sex = sex;
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
  },
  SET_MESSAGE_COUNT: (state, message_count) => {
    state.message_count = message_count;
  }
};
const getters = {
  // username(state) {
  //   return state.name;
  // }
  token: state => state.token,
  first_check: state => state.first_check,
  first_login: state => state.first_login,
  username: state => state.name,
  pid: state => state.pid,
  sex: state => state.sex,
  message_count: state => state.message_count
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
  //用户登录（开发环境使用）
  do_login({ commit }) {
    return new Promise(resolve => {
      commit('SET_PERSONINOF', {
        logonUser: {
          zjhm: '310111199901011234',
          userName: '啊董'
        },
        pid: '201906186258910'
      });
      commit('SET_TOKEN', 'login');
      commit('SET_SEX', '1');
      commit('SET_FIRST_CHECK', true);
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
      commit('SET_PERSONINOF', { logonUser: {} });
      commit('SET_TOKEN', '');
      commit('SET_SEX', '1');
      commit('SET_FIRST_CHECK', false);
      commit('SET_FIRST_LOGIN', true);
      commit('SET_LOGINTYPE', '');
      commit('SET_CENTER', '');
      commit('SET_LOGINSTATUS', 0);
      commit('SET_LOGIN_TIME', 0);
      localStorage.setItem('vuex', null);
      resolve();
    });
  },

  get_personInfo({ commit }) {
    getLogonUser()
      .then(res => {
        console.log('个人登录信息', res);
        if (res.status == 200 && res.result.pid) {
          commit('SET_PERSONINOF', res.result);
          commit('SET_TOKEN', 'login');
          //判断是不是首次进入系统
          checkPsnlInit({ pid: res.result.pid })
            .then(checkRes => {
              //是不是首次进入系统
              if (
                checkRes.status === 200 &&
                checkRes.result.data &&
                checkRes.result.data.isInit === '1'
              ) {
                commit('SET_FIRST_LOGIN', false);
              } else {
                commit('SET_FIRST_LOGIN', true);
              }
              //人员性别 1：男， 2：女
              if (
                checkRes.status === 200 &&
                checkRes.result.data &&
                checkRes.result.data.sexId
              ) {
                commit('SET_SEX', checkRes.result.data.sexId);
              }
            })
            .catch(e => {
              // 检验人员信息失败，显示系统异常界面
              router.push('/error');
              console.log('校验个人信息失败：' + e);
            })
            .finally(() => {
              //确认初始化校验完毕
              commit('SET_FIRST_CHECK', true);
            });
        } else {
          // 登录成功但是获取人员进本信息失败，显示系统异常界面
          router.push('/error');
          console.log('加载个人登录信息失败：' + res.message);
        }
      })
      .catch(e => {
        router.push('/error');
        console.log('加载个人登录信息出错：' + e);
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
