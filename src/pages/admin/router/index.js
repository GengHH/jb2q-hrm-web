/*
 * @Author: your name
 * @Date: 2021-03-04 11:10:20
 * @LastEditTime: 2021-03-05 14:37:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\pages\admin\router\index.js
 */
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
      name: '账号管理',
      component: () => import('@/views/admin/index/index')
    },
    {
      path: '/serviceManagement',
      name: '重点人群就业服务管理',
      component: () => import('@/views/admin/serviceManagement/serviceManagement')
    },
    // 专家管理technocracy
    {
      path: '/technocracy/management',
      name: '专家库管理',
      component: () => import('@/views/admin/technocracy/management')
    },
    {
      path: '/technocracy/record',
      name: '专家结对记录',
      component: () => import('@/views/admin/technocracy/record')
    },
    {
      path: '/technocracy/activity',
      name: '专家活动情况',
      component: () => import('@/views/admin/technocracy/activity')
    },
    {
      path: '/technocracy/summary',
      name: '专家研讨会议纪要',
      component: () => import('@/views/admin/technocracy/summary')
    },
    {
      path: '/technocracy/statistics',
      name: '报表统计',
      component: () => import('@/views/admin/technocracy/statistics')
    },
    // 职业指导profession
    {
      path: '/profession/makeAnAppointment',
      name: '职业指导预约',
      component: () => import('@/views/admin/profession/makeAnAppointment')
    },
    {
      path: '/profession/audit',
      name: '职业指导预约审核',
      component: () => import('@/views/admin/profession/audit')
    },
    {
      path: '/profession/management',
      name: '特色活动管理',
      component: () => import('@/views/admin/profession/management')
    },
    {
      path: '/profession/feedback',
      name: '职业指导回馈',
      component: () => import('@/views/admin/profession/feedback')
    },
    // 单位管理unitManagement
    {
      path: '/unitManagement/message',
      name: '查询单位信息',
      component: () => import('@/views/admin/unitManagement/message')
    },
    {
      path: '/unitManagement/recruitment',
      name: '代理招聘',
      component: () => import('@/views/admin/unitManagement/recruitment')
    },
    {
      path: '/unitManagement/management',
      name: '单位账号管理',
      component: () => import('@/views/admin/unitManagement/management')
    },
    // 招聘会管理recruitmentManagement
    {
      path: '/recruitmentManagement/feedback',
      name: '招聘会管理报告反馈',
      component: () => import('@/views/admin/recruitmentManagement/feedback')
    },
    {
      path: '/recruitmentManagement/management',
      name: '招聘会排片表管理',
      component: () => import('@/views/admin/recruitmentManagement/management')
    },
    {
      path: '/recruitmentManagement/result',
      name: '招聘会反馈结果',
      component: () => import('@/views/admin/recruitmentManagement/result')
    },
    // 职位评价查看
    {
      path: '/JobEvaluationReview/JobEvaluationReview',
      name: '职位评价查看',
      component: () => import('@/views/admin/JobEvaluationReview/JobEvaluationReview')
    },
    // 敏感词管理
    {
      path: '/sensitiveWordManagement/sensitiveWordManagement',
      name: '敏感词管理',
      component: () => import('@/views/admin/sensitiveWordManagement/sensitiveWordManagement')
    },
    // 单位简历参数设置 
    {
      path: '/unitResumeParameterSetting/unitResumeParameterSetting',
      name: '单位简历参数设置',
      component: () => import('@/views/admin/unitResumeParameterSetting/unitResumeParameterSetting')
    },
    {
      path: '/*',
      component: NotFoundPage
    }
  ]
});
