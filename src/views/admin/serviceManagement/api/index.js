/*
 * @Author: your name
 * @Date: 2021-03-26 14:41:47
 * @LastEditTime: 2021-03-26 15:25:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
import axios from 'axios';
const urlStr = '/admin/keypoint/';
//重点人群接口----------------------------------------------------------------------
//查询重点人员信息
const emphasis_keypoint = (params,fn,fnErr) => postAction( urlStr + 'find/keypoint', params,fn,fnErr);
//显示个人劳动经历信息
const emphasis_labor = (params,fn,fnErr) => postAction( urlStr + 'show/labor', params,fn,fnErr);
//查询收藏职位列表信息
const emphasis_favor = (params,fn,fnErr) => postAction( urlStr + 'show/favor', params,fn,fnErr);
//查询个人简历详细信息
const emphasis_resume = (params,fn,fnErr) => postAction( urlStr + 'show/resume', params,fn,fnErr);
//查询就业服务信息
const emphasis_employ = (params,fn,fnErr) => postAction( urlStr + 'show/employ', params,fn,fnErr);
//显示个人社保缴费信息
const emphasis_insur = (params,fn,fnErr) => postAction( urlStr + 'show/insur', params,fn,fnErr);
//显示个人就业见习记录
const emphasis_trainee = (params,fn,fnErr) => postAction( urlStr + 'show/trainee', params,fn,fnErr);
//显示职位评价信息
const emphasis_evaluation = (params,fn,fnErr) => getAction( urlStr + 'show/evaluation', params,fn,fnErr);



export { 
    emphasis_keypoint,
    emphasis_labor,
    emphasis_favor,
    emphasis_resume,
    emphasis_employ,
    emphasis_insur,
    emphasis_trainee,
    emphasis_evaluation,
};