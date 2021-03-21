/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-18 10:12:33
 * @Description: 单位模块需要调用后台的api
 * @FilePath: \jb2q-hrm-web\src\api\corporationApi.js
 */

import apiUrlConfig from '../config';
import { getAction, postAction } from './allActionManage';

const basePath = apiUrlConfig.personBasePath;
/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//退出
const doCorporationLogout = params =>
  postAction(basePath + '/loginController/logout', params);
//获取人员的登录的基本信息
const getLogonUser = params =>
  postAction(basePath + '/loginController/getLogonUser', params);
//获取人员的基本信息
const loadCorpInfo = params =>
  getAction(basePath + '/corp/info/loadCorpInfo', params);
//修改个人基本信息
const saveCorpInfo = params =>
  postAction(basePath + '/corp/info/saveCorpInfo', params);

export { doCorporationLogout, getLogonUser, loadCorpInfo, saveCorpInfo };
