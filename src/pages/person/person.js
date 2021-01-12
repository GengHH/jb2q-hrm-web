/*
 * @Author: your name
 * @Date: 2020-11-30 11:50:54
 * @LastEditTime: 2021-01-12 10:14:56
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\pages\person\person.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import Vue from 'vue';
import App from './person.vue';
import router from './router';
import store from '@/store';
import ElementUI from '@/config/eleComponents';
import { VueAxios } from '@/utils/httpService';
import Print from '@/utils/print';
//import htmlToPdf from '@/utils/htmlToPdf';
import '@/auth/permission';
import config from '@/config';
//import 'assets/sass/index.scss';

Vue.config.productionTip = false;
//按需使用Element组件
Vue.use(ElementUI);
//安装vue-axios插件
Vue.use(VueAxios, router);
//安装print插件
Vue.use(Print);
//安装htmlToPdf插件
//Vue.use(htmlToPdf);
// 引入mock配置
if (config.mock) {
  require('@/mock/person/index.js');
  console.log('++++++++++成功引入mock数据+++++++');
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
