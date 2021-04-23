/*
 * @Author: your name
 * @Date: 2021-03-26 14:41:47
 * @LastEditTime: 2021-04-20 10:36:03
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
//招聘会反馈结果
const urlStr2 = '/result/recruit/';
const result_query = (params, fn, fnErr) =>
  postAction(urlStr2 + 'query', params, fn, fnErr);
const result_verification = (params, fn, fnErr) =>
  postAction(urlStr2 + 'verification', params, fn, fnErr);
const result_enrollment = (params, fn, fnErr) =>
  postAction(urlStr2 + 'enrollment', params, fn, fnErr);
const result_feedback = (params, fn, fnErr) =>
  postAction(urlStr2 + 'feedback', params, fn, fnErr);
const result_wanted = (params, fn, fnErr) =>
  postAction(urlStr2 + 'job/wanted', params, fn, fnErr);
const result_update = (params, fn, fnErr) =>
  postAction(urlStr2 + 'update', params, fn, fnErr);
const result_add = (params, fn, fnErr) =>
  postAction(urlStr2 + 'add', params, fn, fnErr);
export {
  feedback_query,
  feedback_look,
  feedback_info_query,
  feedback_update,
  result_query,
  result_verification,
  result_enrollment,
  result_feedback,
  result_wanted,
  result_update,
  result_add
};
