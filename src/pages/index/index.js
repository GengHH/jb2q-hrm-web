// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./index.vue";
import router from "./router";
import { Button } from 'element-ui';
//import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(Button);

// mock配置引入
import config from '@/config'
if (config.mock) {
  require('@/mock/index/index.js')
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
});
