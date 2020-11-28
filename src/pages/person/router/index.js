import Vue from 'vue'
import Router from 'vue-router'
import NotFoundPage from '@/views/404';
import Hello from '@/components/Hello'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  //mode: 'history',
  base: 'recruitment',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/person',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }, {
      path: '*',
      component: NotFoundPage
    }
  ]
})
