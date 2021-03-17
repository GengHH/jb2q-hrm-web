/*
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-17 16:37:47
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
import '@/utils/placeholderPolyfill';
import _ from 'lodash';
import PlTable from '@/components/common/table/BaseTable.vue';
import PlConfig from '@/config/plComponents';

Vue.config.productionTip = false;
// 安装vue-axios插件
Vue.use(VueAxios, router);
// 使用Element组件
Vue.use(ElementUI);
// 直接绑定原型来按安装lodash插件
Vue.prototype._ = _;
// 安装二次封装组件
Vue.component(PlTable.name, PlTable);
Vue.use(PlConfig, {});
// 引入mock配置
if (config.mock) {
  require('@/mock/corporation/index.js');
}

//判断是不是已经登录
let isEmpty = function(obj) {
  if (obj === null || obj === undefined || obj.length === 0) {
    return true;
  }
};
if (isEmpty(store.getters['dictionary/ggjbxx_qx'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_QX');
}
if (isEmpty(store.getters['dictionary/recruit_work_nature'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_NATURE');
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
