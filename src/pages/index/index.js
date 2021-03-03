/*
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-03 16:52:10
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

//测试获取字典表
var isEmpty = function(obj) {
  if (obj === null || obj === undefined || obj.length === 0) {
    return true;
  }
};
if (isEmpty(store.getters['dictionary/yesno'])) {
  store.dispatch('dictionary/init_Dictionary', 'YESNO');
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
