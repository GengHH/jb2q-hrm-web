/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-06-29 14:25:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/guide/special/';
//职业指导-------------------------------------------
//特色活动
const act_query = (params, fn, fnErr) =>
  postAction(path + 'activity/query', params, fn, fnErr);
const act_add = (params, fn, fnErr) =>
  postAction(path + 'activity/add', params, fn, fnErr);
const act_delete = (params, fn, fnErr) =>
  postAction(path + 'activity/delete', params, fn, fnErr);
const act_release = (params, fn, fnErr) =>
  postAction(path + 'activity/release', params, fn, fnErr);
const act_modify = (params, fn, fnErr) =>
  postAction(path + 'activity/modify', params, fn, fnErr);
const act_apply_query = (params, fn, fnErr) =>
  postAction(path + 'activity/apply/query', params, fn, fnErr);
const act_apply_modify = (params, fn, fnErr) =>
  postAction(path + 'activity/apply/modify', params, fn, fnErr);

//实施职业指导
let guide = '/guide/record/';
const guide_query = (params, fn, fnErr) =>
  postAction(guide + 'query', params, fn, fnErr);
const guide_add = (params, fn, fnErr) =>
  postAction(guide + 'add', params, fn, fnErr);
const guide_queryPerson = (params, fn, fnErr) =>
  postAction(guide + 'queryPerson', params, fn, fnErr);
const guide_focus = (params, fn, fnErr) =>
  postAction(guide + 'focus', params, fn, fnErr);
const guide_delete_label = (params, fn, fnErr) =>
  postAction(guide + 'deleteLabel', params, fn, fnErr);
//预约职业指导服务
let serve = '/admin/vocational/appointment/';
const serve_info = (params, fn, fnErr) =>
  postAction(serve + 'query/info', params, fn, fnErr);
const serve_record = (params, fn, fnErr) =>
  postAction(serve + 'query/record', params, fn, fnErr);
const serve_save = (params, fn, fnErr) =>
  postAction(serve + 'save', params, fn, fnErr);
const serve_area = (params, fn, fnErr) =>
  postAction(serve + 'query/area', params, fn, fnErr);
const serve_check = (params, fn, fnErr) =>
  postAction(serve + 'check', params, fn, fnErr);
//职业指导预约记录
let order = '/admin/vocational/';
const order_query = (params, fn, fnErr) =>
  postAction(order + 'reservation/record/query', params, fn, fnErr);
const order_update = (params, fn, fnErr) =>
  postAction(order + 'appointment/updatezt', params, fn, fnErr);
export {
  guide_query,
  guide_add,
  act_query,
  act_add,
  act_delete,
  act_release,
  act_modify,
  act_apply_query,
  serve_info,
  serve_record,
  serve_save,
  serve_area,
  serve_check,
  act_apply_modify,
  guide_queryPerson,
  guide_delete_label,
  guide_focus,
  order_query,
  order_update
};
