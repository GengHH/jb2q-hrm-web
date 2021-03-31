/*
 * @Author: GengHH
 * @Date: 2021-03-02 16:52:39
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-31 19:21:45
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\store\modules\index.js
 */

const state = {
  //每个模块（首页，单位，个人，管理员）实时选中的一级菜单
  activeMenuIndex: '/',
  priorityLoginType: 'person' //person , corporation
};
// const getters = {
//   priorityLoginType: state => state.priorityLoginType
// };
const mutations = {
  SET_ACTIVE_MENU_INDEX: (state, activeMenuIndex) => {
    state.activeMenuIndex = activeMenuIndex;
  },
  set_priority_login_type: (state, priorityLoginType) => {
    state.priorityLoginType = priorityLoginType;
  }
};
const actions = {
  setPriorityLoginType({ commit }, priorityLoginType) {
    commit('set_priority_login_type', priorityLoginType);
  }
};

export default {
  namsapaces: true,
  state,
  //getters,
  mutations,
  actions
};
