/*
 * @Author: your name
 * @Date: 2021-03-26 14:41:47
 * @LastEditTime: 2021-04-13 15:08:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
import axios from 'axios';
const urlStr = '/admin/signup/';
//招聘会报名反馈
const feedback_query = (params, fn, fnErr) =>
  postAction(urlStr + 'query', params, fn, fnErr);
const feedback_look = (params, fn, fnErr) =>
  postAction(urlStr + 'enrollment', params, fn, fnErr);
const feedback_info_query = (params, fn, fnErr) =>
  postAction(urlStr + 'post/release', params, fn, fnErr);
const feedback_update = (params, fn, fnErr) =>
  postAction(urlStr + 'feedback/update', params, fn, fnErr);
export { feedback_query, feedback_look, feedback_info_query, feedback_update };
