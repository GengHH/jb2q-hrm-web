/*
 * @Author: TangQiang
 * @Date: 2020-03-04 11:50:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-02 18:33:16
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import Vue from 'vue';
import App from './adminLogin.vue';
import store from '@/storeAdmin';
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
import { isNoBody, isPerson, isCorporation } from '@/utils';
Vue.config.productionTip = false;
//按需使用Element组件
Vue.use(ElementUI);
//安装vue-axios插件
Vue.use(VueAxios);
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
let isEmpty = function(obj) {
  if (obj === null || obj === undefined || obj.length === 0) {
    return true;
  }
};
//性别
if (isEmpty(store.getters['dictionary/ggjbxx_sex'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_SEX');
}
//学历
if (isEmpty(store.getters['dictionary/recruit_edu'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_EDU');
}
//老学历
if (isEmpty(store.getters['dictionary/zyjs_xyjycd'])) {
  store.dispatch('dictionary/init_Dictionary', 'ZYJS_XYJYCD');
}

//民族
if (isEmpty(store.getters['dictionary/ggjbxx_nationality'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_NATIONALITY');
}
//街镇
if (isEmpty(store.getters['dictionary/ggjbxx_street'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_STREET');
}
//语言
if (isEmpty(store.getters['dictionary/recruit_language_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_LANGUAGE_TYPE');
}
//语言等级
if (isEmpty(store.getters['dictionary/recruit_language_level'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_LANGUAGE_LEVEL');
}
//工作性质
if (isEmpty(store.getters['dictionary/recruit_work_nature'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_NATURE');
}
//区县
if (isEmpty(store.getters['dictionary/ggjbxx_qx'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_QX');
}
//证件类型
if (isEmpty(store.getters['dictionary/ggjbxx_zjlx'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_ZJLX');
}
//银行

if (isEmpty(store.getters['dictionary/sybx_jhh'])) {
  store.dispatch('dictionary/init_Dictionary', 'SYBX_JHH');
}
//专家状态
if (isEmpty(store.getters['dictionary/recruit_expert_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_EXPERT_STATUS');
}
//专家当前状态
if (isEmpty(store.getters['dictionary/recruit_expert_curr_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_EXPERT_CURR_STATUS');
}
//专家活动类型
if (isEmpty(store.getters['dictionary/recruit_act_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_ACT_TYPE');
}
//专家活动日期类型
if (isEmpty(store.getters['dictionary/recruit_act_date_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_ACT_DATE_TYPE');
}
//就业状态
if (isEmpty(store.getters['dictionary/ggjbxx_jyzt'])) {
  store.dispatch('dictionary/init_Dictionary', 'GGJBXX_JYZT');
}
//特色活动状态
if (isEmpty(store.getters['dictionary/recruit_special_activity_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SPECIAL_ACTIVITY_TYPE');
}
//单位性质
if (isEmpty(store.getters['dictionary/recruit_corp_nature'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_CORP_NATURE');
}
//行业类别
if (isEmpty(store.getters['dictionary/recruit_industry_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_INDUSTRY_TYPE');
}
//招聘类型
if (isEmpty(store.getters['dictionary/recruit_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_TYPE');
}
//工作年限
if (isEmpty(store.getters['dictionary/recruit_work_year'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_WORK_YEAR');
}
//二级行业
if (isEmpty(store.getters['dictionary/recruit_position_s_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_POSITION_S_TYPE');
}
//招聘会类型
if (isEmpty(store.getters['dictionary/recruit_meet_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_MEET_TYPE');
}
//角色类型
if (isEmpty(store.getters['dictionary/recruit_user_role'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_USER_ROLE');
}
//就业类型
if (isEmpty(store.getters['dictionary/recruit_employ_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_EMPLOY_TYPE');
}
//实施举措
if (isEmpty(store.getters['dictionary/recruit_imple_act_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_IMPLE_ACT_TYPE');
}
//是或否
if (isEmpty(store.getters['dictionary/yesno'])) {
  store.dispatch('dictionary/init_Dictionary', 'YESNO');
}
//重点类型
if (isEmpty(store.getters['dictionary/recruit_point_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_POINT_TYPE');
}
//应聘反馈状态
if (isEmpty(store.getters['dictionary/recruit_feedback_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_FEEDBACK_STATUS');
}
//应聘反馈
if (isEmpty(store.getters['dictionary/recruit_feedback_source'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_FEEDBACK_SOURCE');
}
//困惑
if (isEmpty(store.getters['dictionary/zyjs_zyzdzykh'])) {
  store.dispatch('dictionary/init_Dictionary', 'ZYJS_ZYZDZYKH');
}
//专家准入条件
if (isEmpty(store.getters['dictionary/recruit_expert_approval_entry_type'])) {
  store.dispatch(
    'dictionary/init_Dictionary',
    'RECRUIT_EXPERT_APPROVAL_ENTRY_TYPE'
  );
}

//专家服务内容
if (isEmpty(store.getters['dictionary/recruit_expert_service_content_type'])) {
  store.dispatch(
    'dictionary/init_Dictionary',
    'RECRUIT_EXPERT_SERVICE_CONTENT_TYPE'
  );
}

//专家行业类型
if (isEmpty(store.getters['dictionary/recruit_expert_industry_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_EXPERT_INDUSTRY_TYPE');
}

//专家专业领域类型
if (isEmpty(store.getters['dictionary/recruit_expert_professional_type'])) {
  store.dispatch(
    'dictionary/init_Dictionary',
    'RECRUIT_EXPERT_PROFESSIONAL_TYPE'
  );
}
//年龄
if (isEmpty(store.getters['dictionary/recruit_age_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_AGE_TYPE');
}
//问题诊断一级
if (isEmpty(store.getters['dictionary/recruit_diagnosis_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_DIAGNOSIS_TYPE');
}
//二级
if (isEmpty(store.getters['dictionary/recruit_diagnosis_que_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_DIAGNOSIS_QUE_TYPE');
}
//指导状态
if (isEmpty(store.getters['dictionary/zyjs_zyzdzt'])) {
  store.dispatch('dictionary/init_Dictionary', 'ZYJS_ZYZDZT');
}
//一级职业类型
if (isEmpty(store.getters['dictionary/recruit_position_f_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_POSITION_F_TYPE');
}
//审核状态
if (isEmpty(store.getters['dictionary/recruit_surplus_verify_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_SURPLUS_VERIFY_STATUS');
}
//职业指导类型
if (isEmpty(store.getters['dictionary/recruit_guide_type'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_GUIDE_TYPE');
}
//审核状态

if (isEmpty(store.getters['dictionary/recruit_verify_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_VERIFY_STATUS');
}
//审核状态
if (isEmpty(store.getters['dictionary/recruit_release_status'])) {
  store.dispatch('dictionary/init_Dictionary', 'RECRUIT_RELEASE_STATUS');
}
// //投诉状态
// if (isEmpty(store.getters['dictionary/recruit_complaint_status'])) {
//   store.dispatch('dictionary/init_Dictionary', 'recruit_complaint_status');
// }

/* eslint-disable no-new */
const vm = new Vue({
  //el: '#app',
  store,
  //render: h => h(App)
  template: '<App/>',
  components: { App }
});
console.log(isNoBody());
if (isNoBody()) {
  vm.$mount('#app');
} else {
  if (isPerson()) {
    vm.$alert('已有个人登录本系统，请先退出登录');
  }
  if (isCorporation()) {
    vm.$alert('已有单位登录本系统，请先退出登录');
  }
  setTimeout(() => {
    window.location.href = '/ggzp-shrs/index.html';
  }, 2000);
}
