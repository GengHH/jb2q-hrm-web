/*
 * @Author: GengHH
 * @Date: 2020-11-05 11:38:28
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-03 16:22:46
 * @Description: 全局公用的字典表
 * @FilePath: \jb2q-hrm-web\src\mock\dataDictionary.js
 */
const dic = {
  //是否
  YESNO: [
    { value: '0', label: '否' },
    { value: '1', label: '是' }
  ],
  //区县
  GGJBXX_QX: [
    { value: '01', label: '黄浦' },
    { value: '04', label: '徐汇' },
    { value: '05', label: '长宁' },
    { value: '06', label: '静安' },
    { value: '07', label: '普陀' },
    { value: '09', label: '虹口' },
    { value: '10', label: '杨浦' },
    { value: '12', label: '闵行' },
    { value: '13', label: '宝山' },
    { value: '14', label: '嘉定' },
    { value: '15', label: '浦东' },
    { value: '16', label: '金山' },
    { value: '17', label: '松江' },
    { value: '18', label: '青浦' },
    { value: '26', label: '奉贤' },
    { value: '30', label: '崇明' }
  ],
  //单位性质
  RECRUIT_CORP_NATURE: [
    { value: '01', label: '外商投资企业' },
    { value: '02', label: '民营企业' },
    { value: '03', label: '国有企业' },
    { value: '04', label: '港澳台商投资企业' },
    { value: '05', label: '中外合资、合作经营企业' },
    { value: '06', label: '集体企业' },
    { value: '07', label: '股份合作企业' },
    { value: '08', label: '联营企业' },
    { value: '09', label: '有限责任公司' },
    { value: '10', label: '股份有限公司' },
    { value: '11', label: '个体经营' },
    { value: '12', label: '机关事业' },
    { value: '13', label: '社会组织' },
    { value: '14', label: '律师事务所' },
    { value: '15', label: '其他' }
  ],
  //行业分类
  RECRUIT_INDUSTRY_TYPE: [],
  //特定人群
  RECRUIT_SPECIAL_PEOPLE: [],
  //工作性质
  RECRUIT_WORK_NATURE: [
    { value: '01', label: '全职' },
    { value: '02', label: '兼职' },
    { value: '03', label: '就业见习' }
  ],
  //工作班时
  RECRUIT_WORK_HOUR: [
    { value: '005', label: '常日班' },
    { value: '010', label: '常夜班' },
    { value: '015', label: '常早班' },
    { value: '020', label: '常中班' },
    { value: '025', label: '三班制' },
    { value: '030', label: '两头班' },
    { value: '035', label: '两两制' },
    { value: '040', label: '早中班' },
    { value: '045', label: '中晚班' },
    { value: '050', label: '隔天班' },
    { value: '055', label: '轮班制' }
  ],
  //工作年限
  RECRUIT_WORK_YEAR: [
    { value: '01', label: '无要求' },
    { value: '02', label: '1年以下' },
    { value: '03', label: '1~2年' },
    { value: '04', label: '3~5年' },
    { value: '05', label: '6~9年' },
    { value: '06', label: '10年及以上' }
  ],
  //工资支付方式
  RECRUIT_SALARY_PAY_TYPE: [
    { value: '01', label: '小时' },
    { value: '02', label: '天' },
    { value: '03', label: '周' },
    { value: '04', label: '月' },
    { value: '05', label: '年' }
  ],
  //招聘类型
  RECRUIT_TYPE: [],
  //审核状态
  RECRUIT_VERIFY_STATUS: [],
  //发布状态
  RECRUIT_RELEASE_STATUS: [
    { value: '1', label: '待发布' },
    { value: '2', label: '已发布' }
  ],
  //通知类型
  RECRUIT_NOTICE_TYPE: [],
  //登录人类型
  RECRUIT_LOGIN_TYPE: [
    { value: '1', label: '个人' },
    { value: '2', label: '单位' },
    { value: '3', label: '管理员' }
  ],
  //屏蔽类型
  RECRUIT_SHIELD_TYPE: [],
  //语种
  RECRUIT_LANGUAGE_TYPE: [
    { value: '01', label: '英语' },
    { value: '02', label: '日语' },
    { value: '03', label: '法语' },
    { value: '04', label: '德语' },
    { value: '05', label: '俄语' },
    { value: '06', label: '韩语' },
    { value: '07', label: '西班牙语' },
    { value: '08', label: '葡萄牙语' },
    { value: '09', label: '阿拉伯语' },
    { value: '10', label: '意大利语' },
    { value: '11', label: '其他' }
  ],
  //语种等级
  RECRUIT_LANGUAGE_LEVEL: [
    { value: '1', label: '一般' },
    { value: '2', label: '良好' },
    { value: '3', label: '熟练' },
    { value: '4', label: '精通' }
  ],
  //职业一级分类
  RECRUIT_POSITION_F_TYPE: [],
  //职业二级分类
  RECRUIT_POSITION_S_TYPE: [],
  //反馈来源
  RECRUIT_FEEDBACK_SOURCE: [],
  //应聘反馈状态
  RECRUIT_FEEDBACK_STATUS: [],
  //学历
  RECRUIT_EDU: [
    { value: '01', label: '初中及以下' },
    { value: '02', label: '高中' },
    { value: '03', label: '职高' },
    { value: '04', label: '技校' },
    { value: '05', label: '中专' },
    { value: '06', label: '大专' },
    { value: '07', label: '本科' },
    { value: '08', label: '硕士' },
    { value: '09', label: '博士及以上' }
  ],
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
  RECRUIT_RELEASE_DETAIL_TYPE: []
};

export default dic;
