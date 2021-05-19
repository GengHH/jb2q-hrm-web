/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-04-16 15:46:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/admin/user/';
//账号管理-------------------------------------------
//用户
const user_query = (params, fn, fnErr) =>
  postAction(path + 'queryUser', params, fn, fnErr);
const user_querySysm = (params, fn, fnErr) =>
  postAction(path + 'querySysmUser', params, fn, fnErr);
const user_edit = (params, fn, fnErr) =>
  postAction(path + 'modify', params, fn, fnErr);
const user_remove = (params, fn, fnErr) =>
  postAction(path + 'power/del', params, fn, fnErr);
const user_add = (params, fn, fnErr) =>
  postAction(path + 'power/add', params, fn, fnErr);
const user_del = (params, fn, fnErr) =>
  postAction(path + 'delete', params, fn, fnErr);
const user_menu = (params, fn, fnErr) =>
  postAction(path + 'power/queryAll', params, fn, fnErr);
//权限查询
const queryRight = (params, fn, fnErr) =>
  postAction('/menu/queryAll', params, fn, fnErr);
//组
//查询
const queryGroup = (params, fn, fnErr) =>
  postAction('/admin/group/queryAll', params, fn, fnErr);
//新增成员
const group_add = (params, fn, fnErr) =>
  postAction('/admin/group/user/add', params, fn, fnErr);
//新增权限
const power_add = (params, fn, fnErr) =>
  postAction('/admin/user/power/add', params, fn, fnErr);

export {
  user_query,
  user_querySysm,
  user_edit,
  user_remove,
  user_add,
  user_del,
  user_menu,
  queryRight,
  queryGroup,
  group_add,
  power_add
};
