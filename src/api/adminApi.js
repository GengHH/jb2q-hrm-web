/*
 * @Author: your name
 * @Date: 2021-03-15 10:31:29
 * @LastEditTime: 2021-03-18 17:41:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\api\adminApi.js
 */
import apiUrlConfig from '../config';
import { getAction, postAction } from './allActionManage';
//const basePath = apiUrlConfig.personBasePath;
const ywBasePath = apiUrlConfig.adminBasePath;
const urlStr = '/admin/keypoint/';
//登陆接口
const queryLogin = params => postAction(ywBasePath + '/loginController/ywjbIndex', params);
//重点人群接口----------------------------------------------------------------------
//查询重点人员信息
const emphasis_keypoint = params => getAction(ywBasePath + urlStr + 'find/keypoint', params);
//显示个人劳动经历信息
const emphasis_labor = params => getAction(ywBasePath + urlStr + 'show/labor', params);
//查询收藏职位列表信息
const emphasis_favor = params => getAction(ywBasePath + urlStr + 'show/favor', params);
//查询个人简历详细信息
const emphasis_resume = params => getAction(ywBasePath + urlStr + 'show/resume', params);
//查询就业服务信息
const emphasis_employ = params => getAction(ywBasePath + urlStr + 'show/employ', params);
//显示个人社保缴费信息
const emphasis_insur = params => getAction(ywBasePath + urlStr + 'show/insur', params);
//显示个人就业见习记录
const emphasis_trainee = params => getAction(ywBasePath + urlStr + 'show/trainee', params);
//显示职位评价信息
const emphasis_evaluation = params => getAction(ywBasePath + urlStr + 'show/evaluation', params);


export { 
    queryLogin,
    emphasis_keypoint,
    emphasis_labor,
    emphasis_favor,
    emphasis_resume,
    emphasis_employ,
    emphasis_insur,
    emphasis_trainee,
    emphasis_evaluation
 };