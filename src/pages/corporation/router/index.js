import Vue from 'vue';
import Router from 'vue-router';
import NotFoundPage from '@/views/404';
//import Test from '@/components/Test';

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
// const BlankComponent = {
//   template:'<div>暂时空白</div>'
// }

export default new Router({
  mode: 'hash',
  //mode: 'history',
  //base: 'recruitment',
  routes: [
    {
      path: '/',
      //name: '单位首页',
      redirect: '/corpInfo',
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
            corpNavMenu: () => import('@/components/corporation/CorpNavMenu')
          }
        },
        {
          path: '/jobMgr/unpublishJobQuery',
          name: '未发布职位',
          components: {
            default: () =>
              import('@/views/corporation/jobMgr/JobQueryUnpublished'),
            corpNavMenu: () => import('@/components/corporation/CorpNavMenu')
          }
        },
        {
          path: '/jobMgr/publishJobQuery',
          name: '已发布职位',
          components: {
            default: () =>
              import('@/views/corporation/jobMgr/JobQueryPublished'),
            corpNavMenu: () => import('@/components/corporation/CorpNavMenu')
          }
        },
        {
          path: '/jobMgr/overdueJobQuery',
          name: '已过期职位',
          components: {
            default: () =>
              import('@/views/corporation/jobMgr/JobQueryOverdued'),
            corpNavMenu: () => import('@/components/corporation/CorpNavMenu')
          }
        },
        {
          path: '/jobMgr/offJobQuery',
          name: '已下架职位',
          components: {
            default: () => import('@/views/corporation/jobMgr/JobQueryOffline'),
            corpNavMenu: () => import('@/components/corporation/CorpNavMenu')
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
      component: () => import('@/views/corporation/employmentTrainee')
    },
    {
      path: '/jobFindMgr',
      name: '应聘管理',
      component: () => import('@/views/corporation/recruitment')
    },
    {
      path: '/jobFair',
      name: '招聘会',
      component: () => import('@/views/corporation/jobFair')
    }
    // {
    //   path: '*',
    //   component: NotFoundPage
    // }
  ]
});
