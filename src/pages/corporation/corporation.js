/*
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-07 11:06:37
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\corporation\corporation.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import 'jquery.nicescroll';
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
import BaseLabelInput from '@/components/common/BaseLabelInput.vue';
import BaseLabelSelect from '@/components/common/BaseLabelSelect.vue';
import BaseLoadingButton from '@/components/common/BaseLoadingButton';
import BaseLabelDatepicker from '@/components/common/BaseLabelDatepicker';
import BaseWChat from '@/components/common/BaseWChat';
import PlConfig from '@/config/plComponents';
import Chat from 'jwchat';
import BaiduMap from 'vue-baidu-map';
import { isCorporation } from '@/utils';
Vue.config.productionTip = false;
//加载jwchat（基于element-ui）
Vue.use(Chat);
// 安装vue-axios插件
Vue.use(VueAxios, router);
// 使用Element组件
Vue.use(ElementUI);
// 直接绑定原型来按安装lodash插件
// 使用百度地图插件
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'GanPoYI5lBCc4rQ1hZbevgLyTE46ghkW'
});
Vue.prototype._ = _;
// 安装二次封装组件
Vue.component(PlTable.name, PlTable);
Vue.component(BaseLabelInput.name, BaseLabelInput);
Vue.component(BaseLabelSelect.name, BaseLabelSelect);
Vue.component(BaseLoadingButton.name, BaseLoadingButton);
Vue.component(BaseLabelDatepicker.name, BaseLabelDatepicker);
Vue.component(BaseWChat.name, BaseWChat);
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

// 开发环境使用mock时候，模拟登录
if (config.mock) {
  store.dispatch('corporation/do_login');
}
if (isEmpty(store.getters.cid)) {
  //获取单位登录信息并判断是不是首次登录
  // setTimeout(() => {
  store.dispatch('corporation/get_corporationInfo');
  // }, 4000);
}

//初始化字典表;
if (isEmpty(store.getters['dictionary/yesno'])) {
  store.dispatch('dictionary/init_Dictionary', 'YESNO');
}
if (isEmpty(store.getters['dictionary/ggjbxx_qx'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_QX');
}
if (isEmpty(store.getters['dictionary/ggjbxx_qx@3'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_QX@3');
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
if (isEmpty(store.getters['dictionary/recruit_special_people'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SPECIAL_PEOPLE');
}
if (isEmpty(store.getters['dictionary/recruit_salary_pay_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SALARY_PAY_TYPE');
}
if (isEmpty(store.getters['dictionary/recruit_work_year'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_YEAR');
}
if (isEmpty(store.getters['dictionary/recruit_work_hour'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_HOUR');
}
if (isEmpty(store.getters['dictionary/recruit_industry_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_INDUSTRY_TYPE');
}
if (isEmpty(store.getters['dictionary/recruit_applyfor_source'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_APPLYFOR_SOURCE');
}
if (isEmpty(store.getters['dictionary/recruit_surplus_verify_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SURPLUS_VERIFY_STATUS');
}
let vm = new Vue({
  el: '#app',
  store,
  router,
  //render: h => h(App)
  template: '<App/>',
  components: { App }
});
// setTimeout(() => {
//   if (isCorporation(vm)) {
//     window.setTimeout(function() {
//       vm.$mount('#app');
//     }, 500);
//   } else {
//     setTimeout(() => {
//       window.location.href = '/ggzp-shrs/index.html';
//     }, 2000);
//   }
// }, 1000);
