/*
 * @Author: your name
 * @Date: 2020-11-30 11:50:54
 * @LastEditTime: 2021-01-25 16:16:52
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
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import { VueAxios } from '@/utils/httpService';
import Print from '@/utils/print';
//import htmlToPdf from '@/utils/htmlToPdf';
import '@/auth/permission';
import config from '@/config';
//import 'assets/sass/index.scss';
import '@/utils/placeholderPolyfill';
import _ from 'lodash';
import PlTable from '@/components/common/table/BaseTable.vue';
import PlConfig from '@/config/plComponents';
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
Vue.use(PlConfig, {
  tableConfig: {
    stripe: true,
    border: true,
    highlightCurrentRow: true
  },
  selectConfig: {
    filterable: true,
    clearable: true,
    'default-first-option': true
  },
  inputConfig: {
    clearable: true,
    trim: true
  },
  pageConfig: {
    background: true,
    layout: 'total, sizes, prev, pager, next, jumper',
    'page-sizes': [10, 50, 100, 400],
    pageSize: 50
  }
});
// 引入mock配置
if (config.mock) {
  require('@/mock/person/index.js');
  //console.log('++++++++++成功引入mock数据+++++++');
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
