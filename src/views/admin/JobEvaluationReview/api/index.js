/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-04-08 14:09:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
//职业指导-------------------------------------------
//特色活动
const query = (params, fn, fnErr) =>
  postAction('/evalute/query', params, fn, fnErr);
export { query };
