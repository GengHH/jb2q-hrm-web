/*
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-01 09:32:25
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\index\index.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import Vue from 'vue';
import App from './index.vue';
import router from './router';
import store from '@/store';
import { VueAxios } from '@/utils/httpService';
import '@/auth/permission';
import config from '@/config';
import _ from 'lodash';
// 按需引入Element组件
import ElementUI from '@/config/eleComponents';
//import 'assets/sass/index.scss';

Vue.config.productionTip = false;
// 安装vue-axios插件
Vue.use(VueAxios, router);
// 使用Element组件
Vue.use(ElementUI);
// 直接绑定原型来按安装lodash插件
Vue.prototype._ = _;
// 使用Element组件
//Vue.use(Button);
// 引入mock配置
if (config.mock) {
  require('@/mock/index/index.js');
}
//sessionStorage.setItem('a', 'genghonghui');
//测试获取字典表;
var isEmpty = function(obj) {
  if (obj === null || obj === undefined || obj.length === 0) {
    return true;
  }
};

//初始化字典表;
if (isEmpty(store.getters['dictionary/yesno'])) {
  store.dispatch('dictionary/init_Dictionary', 'YESNO');
}
if (isEmpty(store.getters['dictionary/ggjbxx_qx'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_QX');
}
if (isEmpty(store.getters['dictionary/recruit_position_f_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_POSITION_F_TYPE');
}
if (isEmpty(store.getters['dictionary/recruit_position_s_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_POSITION_S_TYPE');
}
if (isEmpty(store.getters['dictionary/recruit_edu'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_EDU');
}
if (isEmpty(store.getters['dictionary/ggjbxx_street'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_STREET');
}
if (isEmpty(store.getters['dictionary/recruit_language_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_LANGUAGE_TYPE');
}
if (isEmpty(store.getters['dictionary/recruit_language_level'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_LANGUAGE_LEVEL');
}
if (isEmpty(store.getters['dictionary/recruit_work_nature'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_NATURE');
}
if (isEmpty(store.getters['dictionary/recruit_industry_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_INDUSTRY_TYPE');
}
if (isEmpty(store.getters['dictionary/recruit_work_hour'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_HOUR');
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
