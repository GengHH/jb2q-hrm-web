// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入自定义全局样式
import 'assets/css/reset.css';
import 'assets/css/style.css';
import '@babel/polyfill';
import Vue from "vue";
import App from "./index.vue";
import router from "./router";
import store from '@/store';
import { VueAxios } from "@/utils/httpService";
import '@/auth/permission'
import config from '@/config';
// 按需引入Element组件
import '@/config/eleComponents';
//import { Button } from 'element-ui';
//import 'assets/sass/index.scss';

Vue.config.productionTip = false;
// 安装vue-axios插件
Vue.use(VueAxios,router);
// 使用Element组件
//Vue.use(Button);
// 引入mock配置
if (config.mock) {
  require('@/mock/index/index.js')
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: { App },
});
