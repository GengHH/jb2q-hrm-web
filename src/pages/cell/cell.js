import Vue from 'Vue'
import cell from './cell.vue'

// mock配置引入
import config from '@/config'
Vue.config.productionTip = false;
if (config.mock) {
  require('@/mock/cell/index.js')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(cell)
})
