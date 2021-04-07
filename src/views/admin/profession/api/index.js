/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-04-07 17:21:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
let path = '/guide/special/';
//职业指导-------------------------------------------
//特色活动
const activity_query = (params, fn, fnErr) =>
  postAction(path + 'activity/query', params, fn, fnErr);
export { activity_query };
