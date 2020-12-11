import Vue from 'vue'
import Router from 'vue-router'
import NotFoundPage from '@/views/404';
import Test from '@/components/Test'


try {
  const originalPush = Router.prototype.push;
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
  };
} catch (e) {
  console.log(e);
}

Vue.use(Router)

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
      name: '单位首页',
      redirect:'/home',
      component: () => import('@/views/corporation/index'),
      children: [
        {
          path: '/homes',
          name: '单位首页-单位管理',
          meta: {
            notNeedUser: true
          },
          component: {
            coprNavMenu : () => import('@/components/corporation/CorpNavMenu'),
            default: Test
          }
        }
      ]
    },
    // {
    //   path: '/jobSearch',
    //   name: '我要求职',
    //   component: () => import('@/views/index/jobSearch')
    // },
    // {
    //   path: '/recruitment',
    //   name: '我要招聘',
    //   component: () => import('@/views/index/recruitment')
    // },
    // {
    //   path: '/jobFair',
    //   name: '招聘会',
    //   component: () => import('@/views/index/jobFair')
    // },
    // {
    //   path: '/employmentTrainee',
    //   name: '就业见习',
    //   component: () => import('@/views/index/employmentTrainee')
    // },
    // {
    //   path: '/activity',
    //   name: '特色活动',
    //   component: () => import('@/views/index/activity')
    // },
    // {
    //   path: '/activityDetails',
    //   name: '特色活动详情',
    //   component: () => import('@/views/index/activity/ActivityInfoDetails')
    // },
    // {
    //   path: '/about',
    //   name: '关于我们',
    //   component: () => import('@/views/index/about')
    // },                    
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
