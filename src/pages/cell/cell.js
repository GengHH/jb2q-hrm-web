// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import { Button } from 'element-ui';
import App from "./cell.vue";

Vue.config.productionTip = false;
Vue.use(Button);
// mock配置引入
import config from '@/config'
if (config.mock) {
  require('@/mock/cell/index.js')
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
