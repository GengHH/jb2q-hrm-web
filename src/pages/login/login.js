/*
 * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-16 16:59:18
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import Vue from 'vue';
import App from './login.vue';
import store from '@/store';
import ElementUI from '@/config/eleComponents';
import { VueAxios } from '@/utils/httpService';
import '@/auth/permission';
import '@/utils/placeholderPolyfill';
import _ from 'lodash';
import { isNoBody, isPerson, isCorporation, isAdmin } from '@/utils';
import config from '@/config';
import BaseLoadingButton from '@/components/common/BaseLoadingButton';
import BaseLabelInput from '@/components/common/BaseLabelInput.vue';
Vue.config.productionTip = false;
//按需使用Element组件
Vue.use(ElementUI);
//安装vue-axios插件
Vue.use(VueAxios);
// 直接绑定原型来按安装lodash插件
Vue.prototype._ = _;
Vue.component(BaseLoadingButton.name, BaseLoadingButton);
Vue.component(BaseLabelInput.name, BaseLabelInput);
//引入mock配置;
if (config.mock) {
  require('@/mock/login/index.js');
  //console.log('++++++++++成功引入mock数据+++++++');
}

//初始化字典表（index）;
if (isEmpty(store.getters['dictionary/recruit_corp_nature'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_CORP_NATURE');
}
//特色活动状态
if (isEmpty(store.getters['dictionary/recruit_special_activity_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SPECIAL_ACTIVITY_TYPE');
}

//初始化字典表（person）;
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
if (isEmpty(store.getters['dictionary/recruit_industry_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_INDUSTRY_TYPE');
}
if (isEmpty(store.getters['dictionary/recruit_work_hour'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_HOUR');
}
if (isEmpty(store.getters['dictionary/recruit_special_people'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SPECIAL_PEOPLE');
}
if (isEmpty(store.getters['dictionary/recruit_work_year'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_YEAR');
}
if (isEmpty(store.getters['dictionary/recruit_applyfor_source'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_APPLYFOR_SOURCE');
}
//工资支付方式
if (isEmpty(store.getters['dictionary/recruit_salary_pay_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SALARY_PAY_TYPE');
}

//初始化字典表（corp）;
if (isEmpty(store.getters['dictionary/recruit_surplus_verify_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SURPLUS_VERIFY_STATUS');
}

//判断是不是已经登录了
/* eslint-disable no-new */
const vm = new Vue({
  //el: '#app',
  store,
  //render: h => h(App)
  template: '<App/>',
  components: { App }
});

if (isAdmin()) {
  vm.$alert('已有管理员登录本系统，请先退出登录');
  setTimeout(() => {
    window.location.href = '/ggzp-shrs/index.html';
  }, 2000);
} else if (isNoBody(vm)) {
  vm.$mount('#app');
} else if (isPerson(vm) && store.getters.priorityLoginType !== 'corporation') {
  window.location.href = '/ggzp-shrs/person.html';
} else if (isCorporation(vm) && store.getters.priorityLoginType !== 'person') {
  window.location.href = '/ggzp-shrs/corporation.html';
} else {
  if (isPerson(vm)) {
    vm.$alert('已有个人登录本系统，请先退出登录');
  }
  if (isCorporation(vm)) {
    vm.$alert('已有单位登录本系统，请先退出登录');
  }
  setTimeout(() => {
    window.location.href = '/ggzp-shrs/index.html';
  }, 2000);
}
