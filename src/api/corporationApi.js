/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-07 16:32:50
 * @Description: 单位模块需要调用后台的api
 * @FilePath: \jb2q-hrm-web\src\api\corporationApi.js
 */

import apiUrlConfig from '../config';
import { getAction, postAction, putAction } from './allActionManage';

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
//检验该单位是不是首次进入系统
const checkCorpInit = params =>
  getAction(basePath + '/corp/info/isCorpInit', params);
//获取单位的基本信息
const loadCorpInfo = params =>
  getAction(basePath + '/corp/info/loadCorpInfo', params);
//修改单位基本信息
const saveCorpInfo = params =>
  postAction(basePath + '/corp/info/saveCorpInfo', params);
//变更转移区申请
const updateDistrictCode = params =>
  postAction(basePath + '/corp/info/updateDistrictCode', params);

//保存职位信息
const savePosition = params =>
  postAction(basePath + '/corp/position/save', params);
//首次发布职位信息
const releasePosition = params =>
  postAction(basePath + '/corp/position/release', params);

//单位查询职位信息
const findPosition = params =>
  postAction(basePath + '/corp/position/find', params);
const findPositionDetail = params =>
  postAction(basePath + '/corp/position/detail', params);
// 删除职位信息
const doDeletePosition = params =>
  postAction(basePath + '/corp/position/delete', params);
// 置顶职位信息
const doTopPosition = params =>
  postAction(basePath + '/corp/position/top', params);
// 下架职位信息
const doOffPosition = params =>
  postAction(basePath + '/corp/position/off', params);
// 重新发布职位
const doReleaseAgainPosition = params =>
  postAction(basePath + '/corp/position/released-again', params);

export {
  doCorporationLogout,
  getLogonUser,
  checkCorpInit,
  loadCorpInfo,
  saveCorpInfo,
  releasePosition,
  findPosition,
  findPositionDetail,
  savePosition,
  updateDistrictCode,
  doDeletePosition,
  doTopPosition,
  doOffPosition,
  doReleaseAgainPosition
};
