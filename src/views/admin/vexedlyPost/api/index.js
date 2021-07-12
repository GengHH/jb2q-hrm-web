/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-06-21 16:07:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/admin/urgencyrecruitposition/';

const saveUrg = (params, fn, fnErr) =>
  postAction(path + 'saveUrgRecPosition', params, fn, fnErr);
const deleteUrg = (params, fn, fnErr) =>
  postAction(path + 'deleteUrgRecPosition', params, fn, fnErr);
const queryAll = (params, fn, fnErr) =>
  postAction(path + 'queryAllPositionList', params, fn, fnErr);
const queryUrg = (params, fn, fnErr) =>
  postAction(path + 'queryUrgRecPositionList', params, fn, fnErr);
export { saveUrg, deleteUrg, queryAll, queryUrg };
