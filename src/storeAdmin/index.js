/*
 * @Author: GengHH
 * @Date: 2020-12-02 10:48:20
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-09 10:38:04
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\storeAdmin\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import dictionary from '@/store/modules/dataDictionary';
import admin from './modules/admin';
import createPersistedState from 'vuex-persistedstate';
/**
 * Create By GengHH On 2020/12/02
 * 初始化全局数据管理对象
 */
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dictionary,
    admin
  },
  plugins: [createPersistedState({ key: 'a-vuex' })]
  //plugins: [createPersistedState({ storage: window.sessionStorage })]
});

export default store;
