/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-21 17:48:09
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\api\indexApi.js
 */
import apiUrlConfig from '../config';
import { postAction } from './allActionManage';

const basePath = apiUrlConfig.corpBasePath;
//示例
const queryTable = params => postAction('ggzp-shrs/person/queryTable', params);
//查询特色活动
const queryActivies = params =>
  postAction(basePath + '/guide/special/activity/query', params);

//查询就业见习数据
const queryJyjxJdInfo = params =>
  postAction(basePath + '/corp/position/query-jyjxJdInfo-positionshow', params);

export { queryTable, queryActivies, queryJyjxJdInfo };
