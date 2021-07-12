/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-06-24 15:22:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/admin/hotPosition/';

const position_query = (params, fn, fnErr) =>
  postAction(path + 'queryAll', params, fn, fnErr);
const position_add = (params, fn, fnErr) =>
  postAction(path + 'add', params, fn, fnErr);
export { position_query, position_add };
