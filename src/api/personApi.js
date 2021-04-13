/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-12 19:46:51
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
//个人收藏单位or职位
const doFavorJobs = (type, params) =>
  postAction(basePath + '/person/manage/find/do-favor/' + type, params);
//个人取消收藏单位or职位
const doUnfavorJobs = params =>
  postAction(basePath + '/person/manage/find/cancle-favor', params);

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
  getAction(basePath + '/person/feedback/corp/findFavorRecord', params);
//获取个人收藏职位列表
const queryPositionStarList = params =>
  getAction(basePath + '/person/feedback/position/findFavorRecord', params);

//根据不同状态获取简历投递记录
const findRecord = (type, params) =>
  getAction(basePath + '/person/feedback/' + type + '/findRecord', params);
//评价职位
const doEvaluateJob = params =>
  putAction(basePath + '/person/feedback/do-evaluate', params);

//发送验证码
const sendSms = params => postAction(basePath + '/person/info/sendSms', params);
//修改手机号
const updatePhoneNum = params =>
  postAction(basePath + '/person/info/updatePhoneNum', params);

export {
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
  updatePersonalPermissions,
  doFavorJobs,
  doUnfavorJobs,
  doDeliveryResume,
  queryShieldList,
  doShieldCorp,
  doCancelShield,
  queryCorpStarList,
  queryPositionStarList,
  findRecord,
  doEvaluateJob,
  updatePhoneNum,
  sendSms
};
