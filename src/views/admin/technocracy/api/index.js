/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-03-31 19:36:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/expert/';
//专家管理-------------------------------------------
//综合查询
const synthesize_query = (params, fn, fnErr) =>
  postAction(path + 'query/all', params, fn, fnErr);
//专家入团
const joinTeam_add = (params, fn, fnErr) =>
  postAction(path + 'join/apply', params, fn, fnErr);
const joinTeam_query = (params, fn, fnErr) =>
  postAction(path + 'join/query', params, fn, fnErr);
const joinTeam_audit = (params, fn, fnErr) =>
  postAction(path + 'join/verify', params, fn, fnErr);
//续聘
const continue_add = (params, fn, fnErr) =>
  postAction(path + 'renew/apply', params, fn, fnErr);
const continue_query = (params, fn, fnErr) =>
  postAction(path + 'renew/query', params, fn, fnErr);
const continue_audit = (params, fn, fnErr) =>
  postAction(path + 'renew/verify', params, fn, fnErr);
const continue_more = (params, fn, fnErr) =>
  postAction(path + 'renew/applyMore', params, fn, fnErr);

//退团
const quit_add = (params, fn, fnErr) =>
  postAction(path + 'quit/apply', params, fn, fnErr);
const quit_query = (params, fn, fnErr) =>
  postAction(path + 'quit/query', params, fn, fnErr);
const quit_audit = (params, fn, fnErr) =>
  postAction(path + 'quit/verify', params, fn, fnErr);
//转移
const move_add = (params, fn, fnErr) =>
  postAction(path + 'move/apply', params, fn, fnErr);
const move_query = (params, fn, fnErr) =>
  postAction(path + 'move/query', params, fn, fnErr);
const move_audit = (params, fn, fnErr) =>
  postAction(path + 'move/confirm', params, fn, fnErr);
//专家结对记录-------------------------------------------
const record_add = (params, fn, fnErr) =>
  postAction(path + 'pair/add', params, fn, fnErr);
const record_remove = (params, fn, fnErr) =>
  postAction(path + 'pair/delete', params, fn, fnErr);
const record_query = (params, fn, fnErr) =>
  postAction(path + 'pair/query', params, fn, fnErr);
const record_edit = (params, fn, fnErr) =>
  postAction(path + 'pair/modify', params, fn, fnErr);

//专家活动情况-------------------------------------------
const activity_add = (params, fn, fnErr) =>
  postAction(path + 'activity/add', params, fn, fnErr);
const activity_edit = (params, fn, fnErr) =>
  postAction(path + 'activity/modify', params, fn, fnErr);
const activity_query = (params, fn, fnErr) =>
  postAction(path + 'activity/query', params, fn, fnErr);
//专家研讨会议纪要-------------------------------------------
const summary_add = (params, fn, fnErr) =>
  postAction(path + 'meeting/add', params, fn, fnErr);
const summary_edit = (params, fn, fnErr) =>
  postAction(path + 'meeting/modify', params, fn, fnErr);
const summary_query = (params, fn, fnErr) =>
  postAction(path + 'meeting/query', params, fn, fnErr);
const summary_remove = (params, fn, fnErr) =>
  postAction(path + 'meeting/delete', params, fn, fnErr);
//报表统计-------------------------------------------
const statistics_query = (params, fn, fnErr) =>
  postAction(path + 'pay/query', params, fn, fnErr);
export {
  summary_add,
  summary_edit,
  summary_query,
  summary_remove,
  activity_add,
  activity_query,
  activity_edit,
  record_edit,
  record_add,
  record_remove,
  record_query,
  synthesize_query,
  joinTeam_add,
  joinTeam_query,
  joinTeam_audit,
  continue_add,
  continue_query,
  continue_audit,
  continue_more,
  quit_add,
  quit_query,
  quit_audit,
  move_add,
  move_query,
  move_audit,
  statistics_query
};
