/*
 * @Author: GengHH
 * @Date: 2021-03-02 16:52:39
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-14 16:50:36
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\store\modules\index.js
 */

const state = {
  //每个模块（首页，单位，个人，管理员）实时选中的一级菜单
  activeMenuIndex: '/',
  priorityLoginType: 'person' //预登陆哪个模块 person , corporation
};
// const getters = {
//   priorityLoginType: state => state.priorityLoginType
// };
const mutations = {
  SET_ACTIVE_MENU_INDEX: (state, activeMenuIndex) => {
    state.activeMenuIndex = activeMenuIndex;
  },
  set_PRIORITY_LOGIN_TYPE: (state, priorityLoginType) => {
    state.priorityLoginType = priorityLoginType;
  }
};
const actions = {
  setPriorityLoginType({ commit }, priorityLoginType) {
    commit('set_PRIORITY_LOGIN_TYPE', priorityLoginType);
  }
};

export default {
  namespaced: true,
  state,
  //getters,
  mutations,
  actions
};
