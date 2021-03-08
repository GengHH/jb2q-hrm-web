/*
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-04 16:58:19
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\corporation\corporation.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import Vue from 'vue';
import App from './corporation.vue';
import router from './router';
import store from '@/store';
import { VueAxios } from '@/utils/httpService';
import '@/auth/permission';
import config from '@/config';
// 按需引入Element组件
import ElementUI from '@/config/eleComponents';
//import { Button } from 'element-ui';
//import 'assets/sass/index.scss';

Vue.config.productionTip = false;
// 安装vue-axios插件
Vue.use(VueAxios, router);
// 使用Element组件
Vue.use(ElementUI);
// 引入mock配置
if (config.mock) {
  require('@/mock/index/index.js');
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  //render: h => h(App)
  template: '<App/>',
  components: { App }
});
