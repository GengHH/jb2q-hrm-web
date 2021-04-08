/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-08 18:03:38
 * @Description: 单位模块需要调用后台的api
 * @FilePath: \jb2q-hrm-web\src\api\corporationApi.js
 */

import apiUrlConfig from '../config';
import { getAction, postAction } from './allActionManage';

const basePath = apiUrlConfig.corpBasePath;
/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//退出
const doCorporationLogout = params =>
  postAction(basePath + '/loginController/logout', params);
//获取的登录的基本信息
const getLogonUser = params =>
  postAction(basePath + '/loginController/getLogonUser', params);
//获取单位的基本信息
const loadCorpInfo = params =>
  getAction(basePath + '/corp/info/loadCorpInfo', params);
//修改单位基本信息
const saveCorpInfo = params =>
  postAction(basePath + '/corp/info/saveCorpInfo', params);

//保存或者发布职位信息
const savePosition = params =>
  postAction(basePath + '/corp/position/saveposition', params);

//单位查询个人简历信息
const findPosition = (status, type, params) =>
  getAction(
    basePath + '/corp/position/find-position/' + status + '/' + type,
    params
  );

export {
  doCorporationLogout,
  getLogonUser,
  loadCorpInfo,
  saveCorpInfo,
  findPosition,
  savePosition
};
