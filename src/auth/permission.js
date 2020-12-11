//import router from '@/router';
import router from '@/pages/index/router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import Vue from 'vue';
// import { USER_TOKEN } from '@/store/mutation-types';

NProgress.configure({ showSpinner: true }); // NProgress 进度条配置

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 判断目标路由，是否需要用户权限
  // if (to.meta.notNeedUser !== true) {
  //   let data = sessionStorage.vuex;
  //   let token = router.app.$options.store.getters.token;
  //   if (
  //     data &&
  //     data != undefined &&
  //     data != 'null' &&
  //     data != '' &&
  //     data.length > 0
  //   ) {
  //     data = JSON.parse(data);
  //     if (data.webuser) {
  //       next();
  //     } else {
  //       alert('未登陆或登陆时限失效，请重新登陆！');
  //       if (to.fullPath.indexOf('college') >= 0) {
  //         next('/collegeGraduates/taobaoIndex');
  //       } else {
  //         next('/home');
  //       }
  //       NProgress.done(); // 页面出错可能导致NProgress运行中断
  //     }
  //   } else if (token != null && token.length > 0) {
  //     next();
  //   } else {
  //     alert('未登陆或登陆时限失效，请重新登陆！');
  //     if (to.fullPath.indexOf('college') >= 0) {
  //       next('/collegeGraduates/taobaoIndex');
  //     } else {
  //       next('/home');
  //     }
  //     NProgress.done(); // 页面出错可能导致NProgress运行中断
  //   }
  // } else {
  //   next();
  // }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
