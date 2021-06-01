/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-06-01 09:56:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
//退出-------------------------------------------

const loginControlle = (fn, fnErr) =>
  postAction('/loginController/logout', '', fn, fnErr);
const label_query = (params, fn, fnErr) =>
  postAction('/label/query', params, fn, fnErr);
export { loginControlle, label_query };
