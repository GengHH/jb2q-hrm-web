/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-04-15 10:53:49
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
export { user_query };
