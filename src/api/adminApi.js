/*
 * @Author: your name
 * @Date: 2021-03-15 10:31:29
 * @LastEditTime: 2021-03-15 10:38:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\api\adminApi.js
 */
import apiUrlConfig from '../config';
import { getAction, postAction } from './allActionManage';

const queryLogonUser = params => postAction('/test/loginController/ywjbIndex', params);


export { queryLogonUser };