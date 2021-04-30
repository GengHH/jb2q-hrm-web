/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-21 17:58:35
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\api\indexApi.js
 */
import apiUrlConfig from '../config';
import { postAction } from './allActionManage';

const adminBasePath = apiUrlConfig.adminBasePath;
//示例
const queryTable = params => postAction('ggzp-shrs/person/queryTable', params);
//查询特色活动
const queryActivies = params =>
  postAction(adminBasePath + '/guide/special/activity/query', params);

//TODO 根据业务自行添加

export { queryTable, queryActivies };
