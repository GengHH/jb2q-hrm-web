import Vue from 'Vue'
import router from './router'
import Cell from './cell.vue'

// mock配置引入
import config from '@/config'
Vue.config.productionTip = false;
if (config.mock) {
  require('@/mock/cell/index.js')
}

/**
 * cell 页面入口
 */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: "<Cell/>",
  components: { Cell },
})
