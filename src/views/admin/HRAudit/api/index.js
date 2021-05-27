/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-05-21 10:44:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/admin/shop/';

const hr_query = (params, fn, fnErr) =>
  postAction(path + 'query', params, fn, fnErr);
const hr_verify = (params, fn, fnErr) =>
  postAction(path + 'verify', params, fn, fnErr);
const hr_delete = (params, fn, fnErr) =>
  postAction(path + 'delete', params, fn, fnErr);
export { hr_query, hr_verify, hr_delete };
