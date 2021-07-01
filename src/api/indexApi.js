/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-01 17:34:40
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
  queryHRFlagshipStoreInfoAll
};
