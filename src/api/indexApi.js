/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-23 09:56:04
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

export {
  queryTable,
  // queryActivies,
  queryJyjxJdInfo,
  queryJobs,
  queryActivityList,
  querySpecialActivityDetail
};
