/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-19 14:54:28
 * @Description: 个人模块需要调用后台的api
 * @FilePath: \jb2q-hrm-web\src\api\personApi.js
 */

import apiUrlConfig from '../config';
import { getAction, postAction, putAction } from './allActionManage';

const basePath = apiUrlConfig.personBasePath;
/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//获取人员的登录的基本信息
const doPersonLogout = params =>
  postAction(basePath + '/loginController/logout', params);
//获取人员的登录的基本信息
const getLogonUser = params =>
  postAction(basePath + '/loginController/getLogonUser', params);
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
const updatePersonalPermissions = params =>
  putAction(basePath + '/person/info/update/', params, true);
//新增或修改个人技能证书信息
const saveSkillCert = params =>
  postAction(basePath + '/person/info/saveSkillCert', params);
//新增或修改个人语言能力信息
const saveLanguageLevel = params =>
  postAction(basePath + '/person/info/saveLanguageLevel', params);
//新增或修改个人劳动经历信息
const saveLaborExp = params =>
  postAction(basePath + '/person/info/saveLaborExp', params);
//新增或修改个人劳动经历信息
const saveEduExp = params =>
  postAction(basePath + '/person/info/saveEduExp', params);
//修改个人评价（个人描述）
const savePsnlEvaluate = params =>
  putAction(basePath + '/person/resume/savePsnlEvaluate', params);
//保存个人求职意向信息
const savePositionLike = params =>
  postAction(basePath + '/person/resume/savePositionLike', params);

//投递简历
const doDeliveryResume = params =>
  putAction(basePath + '/person/feedback/do-applyFor', params);

//屏蔽所选企业
const doShieldCorp = params =>
  putAction(basePath + '/person/feedback/shieldCorp', params);

export {
  doPersonLogout,
  getLogonUser,
  getPersonBaseInfo,
  updatePersonBaseInfo,
  loadPsnlPermissionsInfo,
  savePositionLike,
  saveSkillCert,
  saveLanguageLevel,
  saveEduExp,
  saveLaborExp,
  savePsnlEvaluate,
  queryJobs,
  updatePersonalPermissions,
  doDeliveryResume,
  doShieldCorp
};
