/*
 * @Author: your name
 * @Date: 2020-11-30 11:50:54
 * @LastEditTime: 2021-03-08 19:15:15
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
Vue.use(PlConfig, {});
// 引入mock配置
if (config.mock) {
  require('@/mock/person/index.js');
  //console.log('++++++++++成功引入mock数据+++++++');
}
//判断是不是已经登录
let isEmpty = function(obj) {
  if (obj === null || obj === undefined || obj.length === 0) {
    return true;
  }
};
// 开发环境使用mock时候，模拟登录
if (config.mock) {
  store.dispatch('person/do_login');
}
if (isEmpty(store.getters.zjhm)) {
  //获取个人登录信息
  store.dispatch('person/get_personInfo');
}
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

window.setTimeout(function() {
  //console.log('定时器-模拟能获取人员的登录信息');
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router,
    //render: h => h(App)
    template: '<App/>',
    components: { App }
  });
}, 1000);
