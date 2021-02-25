/*
 * @Author: GengHH
 * @Date: 2020-12-02 10:48:20
 * @LastEditors: GengHH
 * @LastEditTime: 2021-02-25 15:16:44
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
/**
 * Create By GengHH On 2020/12/02
 * 初始化数据管理对象
 */
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    dataDictionary: {}
  },
  getters
});

export default store;
