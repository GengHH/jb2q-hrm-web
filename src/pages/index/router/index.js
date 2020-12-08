import Vue from 'vue'
import Router from 'vue-router'
import NotFoundPage from '@/views/404';
import Test from '@/components/Test'

Vue.use(Router)

//默认空白的局部组件
// const blankComponent = {
//   template:'<div></div>'
// }


export default new Router({
  mode: 'hash',
  //mode: 'history',
  //base: 'recruitment',
  routes: [
    {
      path: '/',
      name: '首页',
      //redirect:'home',
      component: () => import('@/views/index/index'),
      children: [
        {
          path: '/hhh',
          name: '更多',
          meta: {
            notNeedUser: true
          },
          component: () => import('@/views/index/more')
        }
      ]
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
      path: '/about',
      name: '关于我们',
      component: () => import('@/views/index/about')
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
