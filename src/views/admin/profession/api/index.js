/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-04-08 15:48:23
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

export { act_query, act_add, act_delete, act_release, act_modify };
