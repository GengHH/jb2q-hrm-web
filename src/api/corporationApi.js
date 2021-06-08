/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-28 17:47:04
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

//查询就业见习职位列表
const queryJyjxJdInfo = params =>
  postAction(
    basePath + '/corp/position/query-jyjxJdInfo-positionPublishing',
    params
  );
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

// 获取已经收到的简历信息
const queryReceiveResume = params =>
  postAction(basePath + '/corp/manage/find/receive', params);
// 获取已经收到的简历的详细信息
const queryResumeInfo = params =>
  postAction(basePath + '/corp/manage/resume/detail', params);
// 获取已经收到的简历的详细信息
const doFeedBack = params =>
  postAction(basePath + '/corp/manage/feedBack', params);

/*********招聘会**********/
// 查询招聘会listt
const queryJobFairList = params =>
  postAction(basePath + '/corp/meeting/find/list', params);
// 招聘会职位信息
const queryJobFairPositionInfo = params =>
  postAction(basePath + '/corp/meeting/find/positionInfo', params);
// 报名招聘会
const applyJobFair = params =>
  postAction(basePath + '/corp/meeting/save', params);
// 招聘会获取已经收到的简历信息
const queryMeetingReceiveResume = params =>
  postAction(basePath + '/corp/meeting/find/resume', params);

/**********end***********/
/*********招聘会反馈查询**********/
const queryFairResult = params =>
  postAction(basePath + '/corp/signup/query', params);
// 招聘会职位信息
// const queryJobFairPositionInfo = params =>
//   postAction(basePath + '/corp/meeting/find/positionInfo', params);
// // 报名招聘会
// const applyJobFair = params =>
//   postAction(basePath + '/corp/meeting/save', params);
/**********end***********/

/*********简历搜素**********/
const queryResumeList = params =>
  postAction(basePath + '/corp/resume/find', params);
//获取联系方式
const getPersonContact = params =>
  postAction(basePath + '/corp/resume/get/contact', params);
//邀约时获取职位信息
const queryPositionList = params =>
  postAction(basePath + '/corp/resume/queryPositionListNoPage', params);
//邀约
const doInvite = params => postAction(basePath + '/corp/resume/invite', params);

// 招聘会职位信息
// const queryJobFairPositionInfo = params =>
//   postAction(basePath + '/corp/meeting/find/positionInfo', params);
// // 报名招聘会
// const applyJobFair = params =>
//   postAction(basePath + '/corp/meeting/save', params);
/**********end***********/

/*********开店**********/
const queryShop = params =>
  postAction(basePath + '/corp/shop/query/list', params);

const saveShop = params => postAction(basePath + '/corp/shop/save', params);

const updateShop = params => postAction(basePath + '/corp/shop/update', params);

const deleteShop = params => postAction(basePath + '/corp/shop/delete', params);

/**********end***********/

export {
  doCorporationLogout,
  getLogonUser,
  checkCorpInit,
  loadCorpInfo,
  saveCorpInfo,
  releasePosition,
  findPosition,
  findPositionDetail,
  queryJyjxJdInfo,
  savePosition,
  updateDistrictCode,
  doDeletePosition,
  doTopPosition,
  doOffPosition,
  doReleaseAgainPosition,
  queryReceiveResume,
  queryResumeInfo,
  doFeedBack,
  queryJobFairList,
  queryJobFairPositionInfo,
  applyJobFair,
  queryFairResult,
  queryResumeList,
  queryMeetingReceiveResume,
  queryShop,
  saveShop,
  updateShop,
  deleteShop,
  getPersonContact,
  doInvite,
  queryPositionList
};
