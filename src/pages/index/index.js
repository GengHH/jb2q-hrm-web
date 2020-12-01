// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill';
import Vue from "vue";
import App from "./index.vue";
import router from "./router";
import { VueAxios } from "@/utils/httpService";
import { Button } from 'element-ui';
import config from '@/config';
import 'assets/css/reset.css';
import 'assets/sass/index.scss';

Vue.config.productionTip = false;
// 安装vue-axios插件
Vue.use(VueAxios,router);
// 使用Element组件
Vue.use(Button);
// 引入mock配置
if (config.mock) {
  //TODO:
  require('@/mock/index/index.js')
  const aaa = require('@/mock/index/index.js');
  console.log(aaa);
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
});
