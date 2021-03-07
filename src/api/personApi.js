/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-07 22:13:54
 * @Description: 个人模块需要调用后台的api
 * @FilePath: \jb2q-hrm-web\src\api\personApi.js
 */

import apiUrlConfig from '../config';
import { getAction, postAction } from './allActionManage';

const basePath = apiUrlConfig.personBasePath;
/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//获取人员的登录的基本信息
const getLogonUser = params =>
  postAction(basePath + '/loginController/getLogonUser', params);
//获取人员的基本信息
const getPersonBaseInfo = params =>
  getAction(basePath + '/person/info/loadPersonInfo', params);
//修改个人基本信息
const updatePersonBaseInfo = params =>
  postAction(basePath + '/person/info/savePersonInfo', params);
//查询职位信息
const queryJobs = params =>
  postAction(basePath + '/person/info/queryJobs', params);

//加载个人权限信息
const loadPsnlPermissionsInfo = params =>
  postAction(basePath + '/person/info/loadPsnlPermissionsInfo', params);
//新增或修改个人技能证书信息
const saveSkillCert = params =>
  postAction(basePath + '/person/info/saveSkillCert', params);
//新增或修改个人语言能力信息
const saveLanguageLevel = params =>
  postAction(basePath + '/person/info/saveLanguageLevel', params);
//新增或修改个人劳动经历信息
const saveLaborExp = params =>
  postAction(basePath + '/person/info/saveLaborExp', params);

export {
  getLogonUser,
  getPersonBaseInfo,
  updatePersonBaseInfo,
  loadPsnlPermissionsInfo,
  saveSkillCert,
  saveLanguageLevel,
  saveLaborExp,
  queryJobs
};
