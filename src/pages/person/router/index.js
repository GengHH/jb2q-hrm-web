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
      //name: '个人首页',
      redirect: '/personInfo',
      component: () => import('@/views/person'),
      children: [
        {
          path: '/personInfo',
          name: '个人信息维护',
          meta: {
            notNeedUser: true
          }
          //component: () => import('@/components/person/PerResumeNavMenu')
        }
      ]
    },
    {
      path: '/resumeMgr',
      name: '简历管理',
      redirect: '/resumeMgr/baseInfo',
      component: () => import('@/views/person/PersonLayout'),
      children: [
        {
          path: '/resumeMgr/baseInfo',
          name: '基本信息',
          components: {
            personNavMenu: () => import('@/components/person/PerResumeNavMenu'),
            default: () => import('@/components/common/BaseResumeInfo')
          }
        },
        {
          path: '/resumeMgr/jobIntention',
          name: '求职意向',
          components: {
            personNavMenu: () => import('@/components/person/PerResumeNavMenu'),
            default: () => import('@/views/person/resumeMgr/JobIntention')
          }
        },
        {
          path: '/resumeMgr/workExperience',
          name: '工作经历',
          components: {
            personNavMenu: () => import('@/components/person/PerResumeNavMenu'),
            default: () => import('@/views/person/resumeMgr/WorkExperience')
          }
        },
        {
          path: '/resumeMgr/educationExperience',
          name: '教育经历',
          components: {
            personNavMenu: () => import('@/components/person/PerResumeNavMenu'),
            default: () =>
              import('@/views/person/resumeMgr/EducationExperience')
          }
        },
        {
          path: '/resumeMgr/languageSkills',
          name: '外语能力',
          components: {
            personNavMenu: () => import('@/components/person/PerResumeNavMenu'),
            default: () => import('@/views/person/resumeMgr/LanguageSkills')
          }
        },
        {
          path: '/resumeMgr/skillsCertificate',
          name: '技能证书',
          components: {
            personNavMenu: () => import('@/components/person/PerResumeNavMenu'),
            default: () => import('@/views/person/resumeMgr/SkillsCertificate')
          }
        },
        {
          path: '/resumeMgr/selfEvaluation',
          name: '自我评价',
          components: {
            personNavMenu: () => import('@/components/person/PerResumeNavMenu'),
            default: () => import('@/views/person/resumeMgr/SelfEvaluation')
          }
        }
      ]
    },
    {
      path: '/jobSearch',
      name: '职位搜索',
      component: () => import('@/views/person/jobSearch')
    },
    {
      path: '/personalCenter',
      name: '个人中心',
      redirect: '/personalCenter/updatePhoneNum',
      component: () => import('@/views/person/PersonLayout'),
      children: [
        {
          path: '/personalCenter/updatePhoneNum',
          name: '修改手机号',
          components: {
            personNavMenu: () => import('@/components/person/PerCenterNavMenu'),
            default: () =>
              import('@/views/person/personalCenter/updatePhoneNumber')
          }
        },
        {
          path: '/personalCenter/shieldCorporation',
          name: '屏蔽特定企业',
          components: {
            personNavMenu: () => import('@/components/person/PerCenterNavMenu'),
            default: () =>
              import('@/views/person/personalCenter/shieldCorporation')
          }
        },
        {
          path: '/personalCenter/permissionSettings',
          name: '权限设置',
          components: {
            personNavMenu: () => import('@/components/person/PerCenterNavMenu'),
            default: () =>
              import('@/views/person/personalCenter/permissionSettings')
          }
        }
      ]
    },
    // {
    //   path: '/findJobFeedback',
    //   name: '求职反馈',
    //   component: () => import('@/views/person/jobFindFeedback')
    // },
    {
      path: '/jobFindFeedback',
      name: '求职反馈',
      redirect: '/jobFindFeedback/jobFindRecord',
      component: () => import('@/views/person/PersonLayout'),
      children: [
        {
          path: '/jobFindFeedback/jobFindRecord',
          name: '求职记录',
          components: {
            personNavMenu: () =>
              import('@/components/person/PerFindJobBackNavMenu'),
            default: () =>
              import('@/views/person/jobFindFeedback/jobFindRecord')
          }
        },
        {
          path: '/jobFindFeedback/corporationAttention',
          name: '单位关注',
          components: {
            personNavMenu: () =>
              import('@/components/person/PerFindJobBackNavMenu'),
            default: () =>
              import('@/views/person/jobFindFeedback/corporationAttention')
          }
        },

        {
          path: '/jobFindFeedback/jobStarList',
          name: '职位收藏列表',
          components: {
            personNavMenu: () =>
              import('@/components/person/PerFindJobBackNavMenu'),
            default: () => import('@/views/person/jobFindFeedback/jobStarList')
          }
        },
        {
          path: '/jobFindFeedback/jobEvaluation',
          name: '职位评价',
          components: {
            personNavMenu: () =>
              import('@/components/person/PerFindJobBackNavMenu'),
            default: () =>
              import('@/views/person/jobFindFeedback/jobEvaluation')
          }
        }
      ]
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
});
