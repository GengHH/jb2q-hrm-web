/*
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-09 14:31:12
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\pages\index\router\index.js
 */
import Vue from 'vue';
import Router from 'vue-router';
import NotFoundPage from '@/views/404';
import Test from '@/components/Test';

//解决 vue-router3.x重复点击路由，导致提示避免到当前位置的冗余导航问题
//使用时：this.$router.push(...).catch(err => err)要有后面的catch
try {
  const originalPush = Router.prototype.push;
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
  };
} catch (e) {
  console.log(e);
}

Vue.use(Router);

//默认空白的局部组件
// const blankComponent = {
//   template:'<div></div>'
// }

export default new Router({
  mode: 'hash',
  //mode: 'history',
  base: 'ggzp-shrs',
  routes: [
    {
      path: '/',
      name: '首页',
      //redirect: '',
      component: () => import('@/views/index/index')
      // children: [
      //   {
      //     path: '/hhh',
      //     name: '更多',
      //     meta: {
      //       notNeedUser: true
      //     },
      //     component: () => import('@/views/index/more')
      //   }
      // ]
    },
    {
      path: '/jobSearch',
      name: '我要求职',
      component: () => import('@/views/index/jobSearch')
    },
    {
      path: '/recruitment',
      name: '我要招聘',
      component: () => import('@/views/index/recruitment')
    },
    {
      path: '/jobFair',
      name: '招聘会',
      component: () => import('@/views/index/jobFair')
    },
    {
      path: '/fairDetails',
      name: '招聘会详情',
      component: () => import('@/views/index/jobFair/fairDetails')
    },
    {
      path: '/employmentTrainee',
      name: '就业见习',
      component: () => import('@/views/index/employmentTrainee')
    },
    {
      path: '/activity',
      name: '特色活动',
      component: () => import('@/views/index/activity')
    },
    {
      path: '/activityDetails',
      name: '特色活动详情',
      component: () => import('@/views/index/activity/ActivityInfoDetails')
    },
    {
      path: '/corpDetails',
      name: '单位详情',
      component: () => import('@/views/index/corpDetails')
    },
    {
      path: '/jobDetails',
      name: '职位详情',
      component: () => import('@/views/index/jobDetails')
    },
    {
      path: '/empsurpluslack',
      name: '用工余缺',
      component: () => import('@/views/index/empsurpluslack')
    },
    {
      path: '/corpSearch',
      name: '单位查询',
      component: () => import('@/views/index/corpSearch')
    },
    {
      path: '/about',
      name: '关于我们',
      component: () => import('@/views/index/about')
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
});
