/*
 * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-09 10:38:33
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\admin\admin.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import Vue from 'vue';
import App from './admin.vue';
import router from './router';
import store from '@/storeAdmin';
import ElementUI from '@/config/eleComponents';
// import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import { VueAxios } from '@/utils/httpService';
import Print from '@/utils/print';
import { isEmptyObject } from '@/utils/index';
//import htmlToPdf from '@/utils/htmlToPdf';
import '@/auth/permission';
import config from '@/config';
//import 'assets/sass/index.scss';
import '@/utils/placeholderPolyfill';
import _ from 'lodash';
import PlTable from '@/components/common/table/BaseTable.vue';
import PlConfig from '@/config/plComponents';

import $ from 'jquery';
window.$ = $;
import 'jquery.nicescroll';

Vue.config.productionTip = false;
//按需使用Element组件
Vue.use(ElementUI);
//安装vue-axios插件
Vue.use(VueAxios, router);
//安装print插件
Vue.use(Print);
//安装htmlToPdf插件
//Vue.use(htmlToPdf);
// 直接绑定原型来按安装lodash插件
Vue.prototype._ = _;
//安装二次封装组件
Vue.component(PlTable.name, PlTable);
Vue.use(PlConfig, {});

// 引入mock配置
if (config.mock) {
  require('@/mock/admin/index.js');
  //console.log('++++++++++成功引入mock数据+++++++');
}

// 开发环境使用mock时候，模拟管理员登录
if (config.mock) {
  store.dispatch('admin/do_login');
}

//路由拦截(检验管理员是否已经登录)
router.beforeEach((to, from, next) => {
  let userInfo = store.state.admin.userInfo.logonUser;
  if (!isEmptyObject(userInfo)) {
    if (userInfo.userName && userInfo.userIdStr && userInfo.roles.length > 0) {
      next();
    } else {
      window.history.go(-1);
    }
  } else {
    window.history.go(-1);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  //render: h => h(App)
  template: '<App/>',
  components: { App }
});
