import Vue from 'vue';
import Router from 'vue-router';
import NotFoundPage from '@/views/404';
import Cell from '@/components/Cell';
import Test from '@/components/Test';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  //mode: 'history',
  base: 'recruitment',
  routes: [
    {
      path: '/',
      name: 'Cell',
      component: Cell
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
});
