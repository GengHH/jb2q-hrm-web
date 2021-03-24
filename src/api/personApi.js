/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-24 16:46:43
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
//查询岗位信息
const queryJobs = params =>
  getAction(basePath + '/person/manage/find/position', params);
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
  putAction(basePath + '/person/resume/savePsnlEvaluate', params);
//保存个人求职意向信息
const savePositionLike = params =>
  postAction(basePath + '/person/resume/savePositionLike', params);
//删除某种能力或经历信息
const deleteSomeResume = params =>
  deleteAction(basePath + '/person/resume/delete/', params, true);

//投递简历
const doDeliveryResume = params =>
  putAction(basePath + '/person/feedback/do-applyFor', params);

//屏蔽所选企业
const doShieldCorp = params =>
  putAction(basePath + '/person/info/shieldCorp', params);

//获取关注单位列表
const queryCorpStarList = params =>
  getAction(basePath + '/person/feedback/corp/findFavorRecord', params);
//获取个人收藏职位列表
const queryPositionStarList = params =>
  getAction(basePath + '/person/feedback/position/findFavorRecord', params);

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
  doDeliveryResume,
  doShieldCorp,
  queryCorpStarList,
  queryPositionStarList
};
