/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-06-25 14:29:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/admin/empsurpluslack/';
//用工余缺-------------------------------------------
const lack_approver = (params, fn, fnErr) =>
  postAction(path + 'lack/approver', params, fn, fnErr);
const lack_query = (params, fn, fnErr) =>
  postAction(path + 'lack/query', params, fn, fnErr);
const lack_result = (params, fn, fnErr) =>
  postAction(path + 'lack/result', params, fn, fnErr);
const surplus_approver = (params, fn, fnErr) =>
  postAction(path + 'surplus/approver', params, fn, fnErr);
const surplus_query = (params, fn, fnErr) =>
  postAction(path + 'surplus/query', params, fn, fnErr);
const surplus_result = (params, fn, fnErr) =>
  postAction(path + 'surplus/result', params, fn, fnErr);

export {
  lack_approver,
  lack_query,
  lack_result,
  surplus_approver,
  surplus_query,
  surplus_result
};
