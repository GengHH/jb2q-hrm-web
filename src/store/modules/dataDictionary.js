/*
 * @Author: GengHH
 * @Date: 2020-11-05 11:38:28
 * @LastEditors: GengHH
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-30 09:49:35
 * @Description: 全局公用的字典表
 * @FilePath: \jb2q-hrm-web\src\store\modules\dataDictionary.js
 */
// import {
//   queryDataDictionary,
//   queryProvinceAreas,
//   queryIndustry,
//   queryOccupation
// } from '@/api/api';
// import { retCode_Success } from '@/config/systemSettings';
import { queryDicData } from '@/api/common';
const state = {
  //数据地点
  matterDictionary: [],
  //全省区县数据字典
  provinceAreas: [],
  //行业数据字典
  industry: [],
  //职业数据字典
  occupation: [],
  //是 or 否
  YESNO: [],
  //区县
  GGJBXX_QX: [],
  //区县
  GGJBXX_QX_3: [],
  //单位性质
  RECRUIT_CORP_NATURE: [],
  //行业分类
  RECRUIT_INDUSTRY_TYPE: [],
  //特定人群
  RECRUIT_SPECIAL_PEOPLE: [],
  //工作性质
  RECRUIT_WORK_NATURE: [],
  //工作班时
  RECRUIT_WORK_HOUR: [],
  //工作年限
  RECRUIT_WORK_YEAR: [],
  //工资支付方式
  RECRUIT_SALARY_PAY_TYPE: [],
  //招聘类型
  RECRUIT_TYPE: [],
  //审核状态
  RECRUIT_VERIFY_STATUS: [],
  //发布状态
  RECRUIT_RELEASE_STATUS: [],
  //通知类型
  RECRUIT_NOTICE_TYPE: [],
  //登录人类型
  RECRUIT_LOGIN_TYPE: [],
  //屏蔽类型
  RECRUIT_SHIELD_TYPE: [],
  //语种
  RECRUIT_LANGUAGE_TYPE: [],
  //语种
  RECRUIT_LANGUAGE_LEVEL: [],
  //职业一级分类
  RECRUIT_POSITION_F_TYPE: [],
  //职业二级分类
  RECRUIT_POSITION_S_TYPE: [],
  //反馈来源
  RECRUIT_FEEDBACK_SOURCE: [],
  //应聘反馈状态
  RECRUIT_FEEDBACK_STATUS: [],
  //学历
  RECRUIT_EDU: [],
  //应聘来源
  RECRUIT_APPLYFOR_SOURCE: [],
  //用户角色
  RECRUIT_USER_ROLE: [],
  //重点人员类型
  RECRUIT_POINT_TYPE: [],
  //专家状态
  RECRUIT_EXPERT_STATUS: [],
  //专家活动类型
  RECRUIT_ACT_TYPE: [],
  //专家活动日期类型
  RECRUIT_ACT_DATE_TYPE: [],
  //职业指导类型
  RECRUIT_GUIDE_TYPE: [],
  //特色活动类型
  RECRUIT_SPECIAL_ACTIVITY_TYPE: [],
  //实施举措类型
  RECRUIT_IMPLE_ACT_TYPE: [],
  //就业类型
  RECRUIT_EMPLOY_TYPE: [],
  //单位状态
  RECRUIT_CORP_STATUS: [],
  //招聘会类型
  RECRUIT_MEET_TYPE: [],
  //应聘类型
  RECRUIT_APPLYFOR_TYPE: [],
  //推荐类型
  RECRUIT_REC_TYPE: [],
  //页面按钮所属类型
  RECRUIT_BTN_TYPE: [],
  //敏感词类型
  RECRUIT_SEN_TYPE: [],
  //敏感词匹配规则
  RECRUIT_MATCH_RULE: [],
  //敏感词替换规则
  RECRUIT_REPLACE_RULE: [],
  //管理员发布内容详情类型
  RECRUIT_RELEASE_DETAIL_TYPE: [],
  //街镇
  GGJBXX_STREET: [],
  //系统中通用的静态字段
  COMMON_STARTEXT: ['差', '一般', '良', '好', '极好']
};
const getters = {
  common_startext: state => state.COMMON_STARTEXT,
  yesno: state => state.YESNO,
  ggjbxx_qx: state => state.GGJBXX_QX,
  'ggjbxx_qx@3': state => state.GGJBXX_QX_3,
  recruit_position_f_type: state => state.RECRUIT_POSITION_F_TYPE,
  recruit_position_s_type: state => state.RECRUIT_POSITION_S_TYPE,
  recruit_edu: state => state.RECRUIT_EDU,
  ggjbxx_street: state => state.GGJBXX_STREET,
  recruit_language_type: state => state.RECRUIT_LANGUAGE_TYPE,
  recruit_language_level: state => state.RECRUIT_LANGUAGE_LEVEL,
  recruit_work_nature: state => state.RECRUIT_WORK_NATURE,
  recruit_industry_type: state => state.RECRUIT_INDUSTRY_TYPE,
  ggjbxx_sex: state => state.GGJBXX_SEX,
  ggjbxx_nationality: state => state.GGJBXX_NATIONALITY,
  ggjbxx_zjlx: state => state.GGJBXX_ZJLX,
  sybx_jhh: state => state.SYBX_JHH,
  recruit_expert_curr_status: state => state.RECRUIT_EXPERT_CURR_STATUS,
  recruit_expert_status: state => state.RECRUIT_EXPERT_STATUS,
  recruit_work_hour: state => state.RECRUIT_WORK_HOUR,
  recruit_act_date_type: state => state.RECRUIT_ACT_DATE_TYPE,
  recruit_act_type: state => state.RECRUIT_ACT_TYPE,
  ggjbxx_jyzt: state => state.GGJBXX_JYZT,
  recruit_corp_nature: state => state.RECRUIT_CORP_NATURE,
  recruit_special_people: state => state.RECRUIT_SPECIAL_PEOPLE,
  recruit_special_activity_type: state => state.RECRUIT_SPECIAL_ACTIVITY_TYPE,
  recruit_salary_pay_type: state => state.RECRUIT_SALARY_PAY_TYPE,
  recruit_type: state => state.RECRUIT_TYPE,
  recruit_work_year: state => state.RECRUIT_WORK_YEAR,
  recruit_meet_type: state => state.RECRUIT_MEET_TYPE,
  recruit_user_role: state => state.RECRUIT_USER_ROLE,
  recruit_employ_type: state => state.RECRUIT_EMPLOY_TYPE,
  recruit_imple_act_type: state => state.RECRUIT_IMPLE_ACT_TYPE,
  recruit_point_type: state => state.RECRUIT_POINT_TYPE,
  recruit_applyfor_source: state => state.RECRUIT_APPLYFOR_SOURCE,
  recruit_feedback_status: state => state.RECRUIT_FEEDBACK_STATUS,
  recruit_feedback_source: state => state.RECRUIT_FEEDBACK_SOURCE,
  zyjs_zyzdzykh: state => state.ZYJS_ZYZDZYKH,

  recruit_expert_professional_type: state =>
    state.RECRUIT_EXPERT_PROFESSIONAL_TYPE,
  recruit_expert_industry_type: state => state.RECRUIT_EXPERT_INDUSTRY_TYPE,
  recruit_expert_service_content_type: state =>
    state.RECRUIT_EXPERT_SERVICE_CONTENT_TYPE,
  recruit_expert_approval_entry_type: state =>
    state.RECRUIT_EXPERT_APPROVAL_ENTRY_TYPE
};
const mutations = {
  set_RECRUIT_EXPERT_PROFESSIONAL_TYPE: (state, dictionary) => {
    state.RECRUIT_EXPERT_PROFESSIONAL_TYPE = dictionary;
  },
  set_RECRUIT_EXPERT_INDUSTRY_TYPE: (state, dictionary) => {
    state.RECRUIT_EXPERT_INDUSTRY_TYPE = dictionary;
  },
  set_RECRUIT_EXPERT_SERVICE_CONTENT_TYPE: (state, dictionary) => {
    state.RECRUIT_EXPERT_SERVICE_CONTENT_TYPE = dictionary;
  },
  set_RECRUIT_EXPERT_APPROVAL_ENTRY_TYPE: (state, dictionary) => {
    state.RECRUIT_EXPERT_APPROVAL_ENTRY_TYPE = dictionary;
  },
  set_ZYJS_ZYZDZYKH: (state, dictionary) => {
    state.ZYJS_ZYZDZYKH = dictionary;
  },
  set_RECRUIT_FEEDBACK_SOURCE: (state, dictionary) => {
    state.RECRUIT_FEEDBACK_SOURCE = dictionary;
  },
  set_RECRUIT_FEEDBACK_STATUS: (state, dictionary) => {
    state.RECRUIT_FEEDBACK_STATUS = dictionary;
  },
  set_RECRUIT_POINT_TYPE: (state, dictionary) => {
    state.RECRUIT_POINT_TYPE = dictionary;
  },
  set_RECRUIT_IMPLE_ACT_TYPE: (state, dictionary) => {
    state.RECRUIT_IMPLE_ACT_TYPE = dictionary;
  },
  set_RECRUIT_EMPLOY_TYPE: (state, dictionary) => {
    state.RECRUIT_EMPLOY_TYPE = dictionary;
  },
  set_RECRUIT_USER_ROLE: (state, dictionary) => {
    state.RECRUIT_USER_ROLE = dictionary;
  },
  set_RECRUIT_MEET_TYPE: (state, dictionary) => {
    state.RECRUIT_MEET_TYPE = dictionary;
  },
  set_RECRUIT_WORK_YEAR: (state, dictionary) => {
    state.RECRUIT_WORK_YEAR = dictionary;
  },
  set_RECRUIT_TYPE: (state, dictionary) => {
    state.RECRUIT_TYPE = dictionary;
  },
  set_RECRUIT_SPECIAL_ACTIVITY_TYPE: (state, dictionary) => {
    state.RECRUIT_SPECIAL_ACTIVITY_TYPE = dictionary;
  },
  set_GGJBXX_JYZT: (state, dictionary) => {
    state.GGJBXX_JYZT = dictionary;
  },
  set_RECRUIT_ACT_TYPE: (state, dictionary) => {
    state.RECRUIT_ACT_TYPE = dictionary;
  },
  set_RECRUIT_ACT_DATE_TYPE: (state, dictionary) => {
    state.RECRUIT_ACT_DATE_TYPE = dictionary;
  },
  set_RECRUIT_EXPERT_CURR_STATUS: (state, dictionary) => {
    state.RECRUIT_EXPERT_CURR_STATUS = dictionary;
  },
  set_RECRUIT_EXPERT_STATUS: (state, dictionary) => {
    state.RECRUIT_EXPERT_STATUS = dictionary;
  },
  set_SYBX_JHH: (state, dictionary) => {
    state.SYBX_JHH = dictionary;
  },
  set_GGJBXX_ZJLX: (state, dictionary) => {
    state.GGJBXX_ZJLX = dictionary;
  },
  set_GGJBXX_NATIONALITY: (state, dictionary) => {
    state.GGJBXX_NATIONALITY = dictionary;
  },
  set_GGJBXX_SEX: (state, dictionary) => {
    state.GGJBXX_SEX = dictionary;
  },
  set_YESNO: (state, dictionary) => {
    state.YESNO = dictionary;
  },

  set_GGJBXX_QX: (state, dictionary) => {
    state.GGJBXX_QX = dictionary;
  },

  set_GGJBXX_QX_3: (state, dictionary) => {
    state.GGJBXX_QX_3 = dictionary;
  },

  set_RECRUIT_POSITION_F_TYPE: (state, dictionary) => {
    state.RECRUIT_POSITION_F_TYPE = dictionary;
  },

  set_RECRUIT_POSITION_S_TYPE: (state, dictionary) => {
    state.RECRUIT_POSITION_S_TYPE = dictionary;
  },

  set_RECRUIT_EDU: (state, dictionary) => {
    state.RECRUIT_EDU = dictionary;
  },

  set_GGJBXX_STREET: (state, dictionary) => {
    state.GGJBXX_STREET = dictionary;
  },

  set_RECRUIT_LANGUAGE_TYPE: (state, dictionary) => {
    state.RECRUIT_LANGUAGE_TYPE = dictionary;
  },
  set_RECRUIT_LANGUAGE_LEVEL: (state, dictionary) => {
    state.RECRUIT_LANGUAGE_LEVEL = dictionary;
  },
  set_RECRUIT_WORK_NATURE: (state, dictionary) => {
    state.RECRUIT_WORK_NATURE = dictionary;
  },
  set_RECRUIT_INDUSTRY_TYPE: (state, dictionary) => {
    state.RECRUIT_INDUSTRY_TYPE = dictionary;
  },
  set_RECRUIT_WORK_HOUR: (state, dictionary) => {
    state.RECRUIT_WORK_HOUR = dictionary;
  },
  set_RECRUIT_CORP_NATURE: (state, dictionary) => {
    state.RECRUIT_CORP_NATURE = dictionary;
  },
  set_RECRUIT_SPECIAL_PEOPLE: (state, dictionary) => {
    state.RECRUIT_SPECIAL_PEOPLE = dictionary;
  },
  set_RECRUIT_SALARY_PAY_TYPE: (state, dictionary) => {
    state.RECRUIT_SALARY_PAY_TYPE = dictionary;
  },
  set_RECRUIT_APPLYFOR_SOURCE: (state, dictionary) => {
    state.RECRUIT_APPLYFOR_SOURCE = dictionary;
  }
};

const actions = {
  init_Dictionary({ commit }, dicTpye) {
    queryDicData(JSON.parse(JSON.stringify({ code: dicTpye })))
      .then(res => {
        console.log('获取的字典表', res);
        if (res.status == 200) {
          let objArray = dicTpye.split('@');
          let key = dicTpye.includes('@')
            ? 'set_' + objArray[0] + '_' + objArray[1]
            : 'set_' + objArray[0];
          commit(
            key,
            res.result.data && typeof res.result.data === 'string'
              ? JSON.parse(res.result.data)
              : res.result.data
          );
        } else {
          console.log('加载数据字典时出错：' + res.message);
        }
      })
      .catch(e => {
        console.log('加载数据字典时出错：' + e);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
