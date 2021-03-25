/*
 * @Author: your name
 * @Date: 2021-03-25 14:36:30
 * @LastEditTime: 2021-03-25 14:41:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\technocracy\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
//专家入团新增
const specialist_add = (params,fn,fnErr) => postAction('expert/join/apply', params,fn,fnErr);

export { 
    specialist_add
};