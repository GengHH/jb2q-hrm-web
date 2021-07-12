/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-06-11 10:59:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/admin/';
//专家管理-------------------------------------------
//综合查询
const resume_add = (params, fn, fnErr) =>
  postAction(path + 'resumeparameter/addParameterConfig', params, fn, fnErr);
export { resume_add };
