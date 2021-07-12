/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-06-24 11:23:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/admin/complaint/';
//账号管理-------------------------------------------
//用户
const user_update = (params, fn, fnErr) =>
  postAction(path + 'updateComplaintInfo', params, fn, fnErr);
const user_query = (params, fn, fnErr) =>
  postAction(path + 'queryComplaintList', params, fn, fnErr);

export { user_query, user_update };
