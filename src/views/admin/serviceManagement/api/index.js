/*
 * @Author: your name
 * @Date: 2021-03-26 14:41:47
 * @LastEditTime: 2021-04-27 16:51:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\api\index.js
 */
import { getAction, postAction, allAction } from '@/api/adminApi';
const urlStr = '/admin/keypoint/';

//重点人群接口----------------------------------------------------------------------
//查询重点人员信息
const emphasis_keypoint = (params, fn, fnErr) =>
  postAction(urlStr + 'find/keypoint', params, fn, fnErr);
export { emphasis_keypoint };
