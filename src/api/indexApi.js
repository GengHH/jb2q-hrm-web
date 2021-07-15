/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-15 18:23:19
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\api\indexApi.js
 */
import apiUrlConfig from '../config';
import { postAction } from './allActionManage';

const basePath = apiUrlConfig.corpBasePath;
//示例
const queryTable = params => postAction('ggzp-shrs/person/queryTable', params);
//查询特色活动
// const queryActivies = params =>
//   postAction(basePath + '/guide/special/activity/query', params);

//查询就业见习数据
const queryJyjxJdInfo = params =>
  postAction(basePath + '/corp/position/query-jyjxJdInfo-positionshow', params);

/***不需要登录的接口***/
//我要求职
const queryJobs = params =>
  postAction(basePath + '/nologin/applyfor/queryPositionList', params);
//特色活动
const queryActivityList = params =>
  postAction(
    basePath + '/nologin/specialActivity/querySpecialActivityList',
    params
  );
//特色活动-详情信息
const querySpecialActivityDetail = params =>
  postAction(
    basePath + '/nologin/specialActivity/querySpecialActivityDetail',
    params
  );

//默认热招推荐类简历投递数倒序前9职位明细
const queryHotPositionInfo = params =>
  postAction(basePath + '/nologin/index/queryHotPositionInfo', params);
//分页查询所有热招职位
const queryHotPositionInfoAll = params =>
  postAction(basePath + '/nologin/index/queryHotPositionInfoAll', params);

//查询工资下限前九的急招职位
const querySortUrgRecPositionList = params =>
  postAction(basePath + '/nologin/index/querySortUrgRecPositionList', params);
//查询所有急招职位
const queryAllUrgRecPositionList = params =>
  postAction(basePath + '/nologin/index/queryAllUrgRecPositionList', params);

//人力资源旗舰店默认前九
const queryHRFlagshipStoreInfo = params =>
  postAction(basePath + '/nologin/index/queryHRFlagshipStoreInfo', params);
//查询所有人力资源旗舰店
const queryHRFlagshipStoreInfoAll = params =>
  postAction(basePath + '/nologin/index/queryHRFlagshipStoreInfoAll', params);

//查询招聘会列表
const queryMeetingList = params =>
  postAction(basePath + '/nologin/meeting/queryMeetingList', params);
//查询招聘会明细信息
const queryMeetingDetail = params =>
  postAction(basePath + '/nologin/meeting/queryMeetingDetail', params);
//查询招聘会中单位列表
const queryMeetingCorporationList = params =>
  postAction(basePath + '/nologin/meeting/queryMeetingCorporationList', params);
//查询招聘会职位列表
const queryMeetingPositionList = params =>
  postAction(basePath + '/nologin/meeting/queryMeetingPositionList', params);

//用工缺失调剂信息专区
const queryAllEmploymentLack = params =>
  postAction(basePath + '/nologin/index/queryAllEmploymentLack', params);
//用工剩余调剂信息专区
const queryAllEmploymentSurplus = params =>
  postAction(basePath + '/nologin/index/queryAllEmploymentSurplus', params);
//获取职位详细信息
const getPositionDetail = params =>
  postAction(basePath + '/nologin/index/getPositionDetail', params);
//获取公司详细信息
const getCorpDetail = params =>
  postAction(basePath + '/nologin/index/getCorpDetail', params);

//查询推荐企业（固定个数）
const getIndexRecCorp = params =>
  postAction(basePath + '/nologin/index/getIndexRecCorp', params);
//查询推荐企业列表（更多）
const getIndexRecCorpList = params =>
  postAction(basePath + '/nologin/index/getIndexRecCorpList', params);

export {
  queryTable,
  // queryActivies,
  queryJyjxJdInfo,
  queryJobs,
  queryActivityList,
  querySpecialActivityDetail,
  queryHotPositionInfo,
  queryHotPositionInfoAll,
  querySortUrgRecPositionList,
  queryAllUrgRecPositionList,
  queryHRFlagshipStoreInfo,
  queryHRFlagshipStoreInfoAll,
  queryMeetingList,
  queryMeetingDetail,
  queryMeetingCorporationList,
  queryMeetingPositionList,
  queryAllEmploymentLack,
  queryAllEmploymentSurplus,
  getPositionDetail,
  getCorpDetail,
  getIndexRecCorpList,
  getIndexRecCorp
};
