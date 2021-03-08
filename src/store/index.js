/*
 * @Author: GengHH
 * @Date: 2020-12-02 10:48:20
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-03 16:18:59
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import person from './modules/person';
import dictionary from './modules/dataDictionary';

/**
 * Create By GengHH On 2020/12/02
 * 初始化全局数据管理对象
 */
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    person,
    dictionary
  },
  getters
});

export default store;
