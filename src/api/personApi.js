/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-28 16:30:56
 * @Description: 个人模块需要调用后台的api
 * @FilePath: \jb2q-hrm-web\src\api\personApi.js
 */

import apiUrlConfig from '../config';
import {
  getAction,
  postAction,
  putAction,
  deleteAction
} from './allActionManage';

const basePath = apiUrlConfig.personBasePath;
/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */
//个人短息登录方式-发送验证码
const doSend = params => postAction(basePath + '/psnl/send', params);
//个人证件号码登录方式
const doLogin = params => postAction(basePath + '/psnl/login', params);
//获取人员的登录的基本信息
const doPersonLogout = params =>
  postAction(basePath + '/loginController/logout', params);
//获取人员的登录的基本信息
const getLogonUser = params =>
  postAction(basePath + '/loginController/getLogonUser', params);
//检验该人员是不是首次进入系统
const checkPsnlInit = params =>
  getAction(basePath + '/person/info/checkPsnlInit', params);
//获取人员的基本信息
const getPersonBaseInfo = params =>
  getAction(basePath + '/person/info/loadPersonInfo', params);
//修改个人基本信息
const updatePersonBaseInfo = params =>
  postAction(basePath + '/person/info/savePersonInfo', params);

//搜索数据库中的已经发布的职位列表信息
const queryJobs = params =>
  postAction(basePath + '/person/manage/find/position', params);
//查询管理员推荐职位
const queryRecommendJobs = params =>
  postAction(basePath + '/person/recommend/queryRecommendList', params);
//个人投递招聘会下的职位
const queryRecommendDetai = params =>
  postAction(basePath + '/person/recommend/doQueryRecommendDetail', params);

// 更新工作年限
const saveWorkYear = params =>
  postAction(basePath + '/person/resume/save/workyear', params);
//加载个人权限信息
const loadPsnlPermissionsInfo = params =>
  getAction(basePath + '/person/info/loadPsnlPermissionsInfo', params);
//修改个人权限信息
// const updatePersonalPermissions = params =>
// putAction(basePath + '/person/info/update/', params, true);
const updatePersonalPermissions = params =>
  postAction(basePath + '/person/info/updatePsnlPermissionsInfo', params);
//新增或修改个人技能证书信息
const saveSkillCert = params =>
  postAction(basePath + '/person/resume/saveSkillCert', params);
//新增或修改个人语言能力信息
const saveLanguageLevel = params =>
  postAction(basePath + '/person/resume/saveLanguageLevel', params);
//新增或修改个人劳动经历信息
const saveLaborExp = params =>
  postAction(basePath + '/person/resume/saveLaborExp', params);
//新增或修改个人教育经历信息
const saveEduExp = params =>
  postAction(basePath + '/person/resume/saveEduExp', params);
//修改个人评价（个人描述）
const savePsnlEvaluate = params =>
  postAction(basePath + '/person/resume/savePsnlEvaluate', params);
//保存个人求职意向信息
const savePositionLike = params =>
  postAction(basePath + '/person/resume/savePositionLike', params);
//删除某种能力或经历信息
const deleteSomeResume = params =>
  deleteAction(basePath + '/person/resume/delete/', params, true);

//个人投递简历
const doDeliveryResume = params =>
  postAction(basePath + '/person/feedback/do-applyFor', params);
//个人投递简历
const doDeliveryResumeRecommend = params =>
  postAction(basePath + '/person/recommend/doApplyFor', params);
//个人收藏单位or职位
// const doFavorJobs = (type, params) =>
//   postAction(basePath + '/person/manage/find/do-favor/' + type, params);
//个人取消收藏单位or职位
// const doUnfavorJobs = params =>
//   postAction(basePath + '/person/manage/find/cancle-favor', params);

//个人查询屏蔽信息列表
const queryShieldList = params =>
  getAction(basePath + '/person/info/queryShieldList', params);
//个人屏蔽单位
const doShieldCorp = params =>
  postAction(basePath + '/person/info/shieldCorp', params);
//个人取消屏蔽单位
const doCancelShield = params =>
  postAction(basePath + '/person/info/cancelShield', params);

//获取关注单位列表
const queryCorpStarList = params =>
  postAction(basePath + '/person/feedback/corp/findFavorRecord', params);
//获取个人收藏职位列表
const queryPositionStarList = params =>
  postAction(basePath + '/person/feedback/position/findFavorRecord', params);

//根据不同状态获取简历投递记录
// const findRecord = (type, params) =>
//   getAction(basePath + '/person/feedback/' + type + '/findRecord', params);
const findRecord = params =>
  postAction(basePath + '/person/feedback/find/applyfor', params);
//反馈
const doFeedBack = params =>
  postAction(basePath + '/person/feedback/do-interView', params);
//评价职位
const doEvaluateJob = params =>
  postAction(basePath + '/person/feedback/do-evaluate', params);
//查询职位评价内容
const queryEvaluateList = params =>
  postAction(basePath + '/person/feedback/query-evaluation', params);

//发送验证码
const sendSms = params => postAction(basePath + '/person/info/sendSms', params);
//修改手机号
const updatePhoneNum = params =>
  postAction(basePath + '/person/info/updatePhoneNum', params);

/*********招聘会**********/
// 查询招聘会list
const queryMeetingList = params =>
  postAction(basePath + '/person/meeting/queryMeetingList', params);
// 查询某个招聘会详细信息
const queryMeetingSchedule = params =>
  postAction(basePath + '/person/meeting/queryMeetingSchedule', params);
//招聘会下所有的单位信息
const queryMeetingCorporationList = params =>
  postAction(basePath + '/person/meeting/queryMeetingCorporationList', params);
//招聘会下单位的所有职位信息
const queryCorpPositionList = params =>
  postAction(basePath + '/person/meeting/doSearchCorpPositionList', params);
//招聘会下所有的职位信息
const queryMeetingPositionList = params =>
  postAction(basePath + '/person/meeting/queryMeetingPositionList', params);
//查询招聘会职位明细信息
const queryCorporationPositionInfo = params =>
  postAction(basePath + '/person/meeting/queryCorporationPositionInfo', params);
//个人投递招聘会下的职位
const doApplyFor = params =>
  postAction(basePath + '/person/meeting/doApplyFor', params);

/*********end**********/
/*********招聘会**********/
// 查询招聘会list
const queryActivityList = params =>
  postAction(
    basePath + '/person/activity/queryPersonSpecialActivityList',
    params
  );
//个人投递招聘会下的职位
const doApplyActivity = params =>
  postAction(basePath + '/person/activity/saveApplySpecialActivity', params);

/*********end**********/
//个人收藏或取消收藏职位和个人关注或取消关注单位 (type :1 关注单位 ；2 收藏职位)
const attentionOrFavor = (type, params) =>
  postAction(basePath + '/person/manage/do-favor/' + type, params);
//职位搜索后-个人投诉职位（短信验证码）
const sendComplaintSms = params =>
  postAction(basePath + '/person/manage/sendComplaintSms', params);
//职位搜索后-个人投诉职位
const doComplaint = params =>
  postAction(basePath + '/person/manage/complaint', params);

//个人查询职位明细信息
const queryPositionDetail = params =>
  postAction(basePath + '/person/manage/queryPositionDetail', params);

/*********个人消息**********/
//查询系统消息
const querySystemMsg = params =>
  postAction(basePath + '/person/notice/queryNoticeList/system', params);
//查询推送消息
const queryPushMsg = params =>
  postAction(basePath + '/person/notice/queryNoticeList/push', params);
//查询消息详细信息
const queryMsgDetails = params =>
  postAction(basePath + '/person/notice/queryNoticeDetail', params);

/*********end**********/

export {
  doSend,
  doLogin,
  doPersonLogout,
  getLogonUser,
  getPersonBaseInfo,
  checkPsnlInit,
  updatePersonBaseInfo,
  loadPsnlPermissionsInfo,
  savePositionLike,
  saveSkillCert,
  saveLanguageLevel,
  saveEduExp,
  saveLaborExp,
  savePsnlEvaluate,
  deleteSomeResume,
  queryJobs,
  queryRecommendJobs,
  queryRecommendDetai,
  updatePersonalPermissions,
  // doFavorJobs,
  // doUnfavorJobs,
  doDeliveryResume,
  doDeliveryResumeRecommend,
  queryShieldList,
  doShieldCorp,
  doCancelShield,
  queryCorpStarList,
  queryPositionStarList,
  findRecord,
  doFeedBack,
  doEvaluateJob,
  queryEvaluateList,
  updatePhoneNum,
  sendSms,
  saveWorkYear,
  queryMeetingList,
  queryMeetingSchedule,
  queryMeetingCorporationList,
  queryCorpPositionList,
  queryMeetingPositionList,
  queryCorporationPositionInfo,
  doApplyFor,
  queryActivityList,
  doApplyActivity,
  attentionOrFavor,
  sendComplaintSms,
  doComplaint,
  queryPositionDetail,
  querySystemMsg,
  queryPushMsg,
  queryMsgDetails
};
