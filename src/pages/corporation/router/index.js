import Vue from 'vue';
import Router from 'vue-router';
import NotFoundPage from '@/views/404';
import ErrorPage from '@/views/error';
import store from '@/store';
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
const BlankComponent = {
  template: '<div></div>'
};

let router = new Router({
  mode: 'hash',
  //mode: 'history',
  base: '/ggzp-shrs',
  routes: [
    {
      path: '/',
      //name: '单位首页',
      redirect: '/resumeSearch',
      component: () => import('@/views/corporation'),
      children: [
        {
          path: '/corpInfo',
          name: '单位信息管理',
          meta: {
            notNeedUser: true
          }
          //component: () => import('@/views/corporation')
        }
      ]
    },
    {
      path: '/jobMgr',
      name: '职位管理',
      redirect: '/jobMgr/jobAdd',
      component: () => import('@/views/corporation/corporationLayout'),
      children: [
        {
          path: '/jobMgr/jobAdd',
          name: '发布职位',
          components: {
            default: () => import('@/views/corporation/jobMgr/JobAdd'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobmgrNavMenu')
          }
        },
        {
          path: '/jobMgr/unpublishJobQuery',
          name: '未发布职位',
          components: {
            default: () =>
              import('@/views/corporation/jobMgr/JobQueryUnpublished'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobmgrNavMenu')
          }
        },
        {
          path: '/jobMgr/publishJobQuery',
          name: '已发布职位',
          components: {
            default: () =>
              import('@/views/corporation/jobMgr/JobQueryPublished'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobmgrNavMenu')
          }
        },
        {
          path: '/jobMgr/overdueJobQuery',
          name: '已过期职位',
          components: {
            default: () =>
              import('@/views/corporation/jobMgr/JobQueryOverdued'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobmgrNavMenu')
          }
        },
        {
          path: '/jobMgr/offJobQuery',
          name: '已下架职位',
          components: {
            default: () => import('@/views/corporation/jobMgr/JobQueryOffline'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobmgrNavMenu')
          }
        }
        // {
        //   path: '/jobMgr/jobRecycle',
        //   name: '回收站',
        //   component: () => import('@/views/corporation/jobMgr/JobRecycle')
        // }
      ]
    },
    {
      path: '/resumeSearch',
      name: '简历搜索',
      component: () => import('@/views/corporation/resumeSearch')
    },
    {
      path: '/jobFindMgr',
      name: '应聘管理',
      redirect: '/jobFindMgr/resumeReceived',
      component: () => import('@/views/corporation/corporationLayout'),
      children: [
        {
          path: '/jobFindMgr/resumeReceived',
          name: '收到的简历',
          components: {
            default: () =>
              import('@/views/corporation/jobFindMgr/resumeReceived'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobfindmgrNavMenu')
          }
        },
        {
          path: '/jobFindMgr/resumeCollected',
          name: '已收藏的简历',
          components: {
            default: () =>
              import('@/views/corporation/jobFindMgr/resumeCollected'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobfindmgrNavMenu')
          }
        }
      ]
    },
    {
      path: '/jobFair',
      name: '招聘会',
      redirect: '/jobFair/jobFairApply',
      //component: () => import('@/views/corporation/jobFair')
      component: () => import('@/views/corporation/corporationLayout'),
      children: [
        {
          path: '/jobFair/jobFairApply',
          name: '单位招聘会报名',
          components: {
            default: () => import('@/views/corporation/jobFair/jobFairApply'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobfairNavMenu')
          }
        },
        {
          path: '/jobFair/jobFairReview',
          name: '报名审核结果',
          components: {
            default: () => import('@/views/corporation/jobFair/jobFairReview'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobfairNavMenu')
          }
        },
        {
          path: '/jobFair/jobFairResume',
          name: '收到招聘会简历',
          components: {
            default: () => import('@/views/corporation/jobFair/jobFairResume'),
            corpNavMenu: () =>
              import('@/components/corporation/CorpJobfairNavMenu')
          }
        }
      ]
    },
    {
      path: '/remind',
      name: '提醒',
      redirect: '/remind/remind',
      component: () => import('@/views/corporation/corporationLayout'),
      children: [
        {
          path: '/remind/remind',
          name: '私信',
          components: {
            default: () => import('@/views/corporation/remind/remindCenter'),
            corpNavMenu: () => import('@/components/corporation/remindMenu')
          }
        }
      ]
    },
    {
      path: '/logout',
      component: BlankComponent
    },
    {
      path: '/error',
      component: ErrorPage
    },
    {
      path: '/*',
      component: NotFoundPage
    }
  ]
});

//全局路由钩子函数（根据用户的权限判断路由的跳转）
// router.beforeEach((to, from, next) => {
//   console.log(0);
//   //console.log(store.getters['corporation/first_login']);
//   if (!store.getters['corporation/token']) {
//     console.log(123);
//     next('/error');
//   } else if (
//     store.getters['corporation/first_login'] &&
//     to.name !== '单位信息维护' &&
//     to.name
//   ) {
//     if (!store.getters['corporation/cid']) {
//       console.log(456);
//       Vue.prototype.$alert(
//         '首次进入本系统，请先维护单位基本信息，以正常使用系统功能！'
//       );
//     }
//     console.log(7890000);
//     next();
//   } else {
//     console.log(789);
//     next();
//   }
// });

export default router;
