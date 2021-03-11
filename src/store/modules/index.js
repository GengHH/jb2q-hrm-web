/*
 * @Author: GengHH
 * @Date: 2021-03-02 16:52:39
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-11 11:25:39
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\store\modules\index.js
 */

const state = {
  //每个模块（首页，单位，个人，管理员）实时选中的一级菜单
  activeMenuIndex: '/'
};

const mutations = {
  SET_ACTIVE_MENU_INDEX: (state, activeMenuIndex) => {
    state.activeMenuIndex = activeMenuIndex;
  }
};

// const actions = {
//   setMenuIndex({commit},menuIndex){
//     commit('',menuIndex);
//   }
// }

export default {
  namsapaces: true,
  state,
  mutations
};
