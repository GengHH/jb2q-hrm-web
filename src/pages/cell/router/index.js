/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-06 10:56:07
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\cell\router\index.js
 */
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
    }
    // {
    //   path: '*',
    //   component: NotFoundPage
    // }
  ]
});
