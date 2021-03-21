/*
 * @Author: your name
 * @Date: 2021-03-15 10:31:29
 * @LastEditTime: 2021-03-19 16:25:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\api\adminApi.js
 */
import apiUrlConfig from '../config';
import { Notification } from 'element-ui';
// import { getAction, postAction } from './allActionManage';
import axios from 'axios';
//const basePath = apiUrlConfig.personBasePath;
const ywBasePath = apiUrlConfig.adminBasePath;

const urlStr = '/admin/keypoint/';
function errors(response){
    if(response.status >= 500){
        Notification({
            title: '系统提示',
            message: '系统繁忙，请稍后再试!',
            //duration: 4500,
            type: 'error'
          });
    }else if(response.status == 404){
        Notification({
            title: '系统提示',
            message: '很抱歉，资源未找到!',
            //duration: 4500,
            type: 'error'
          });
    }else{
        Notification({
            title: '系统提示',
            message: '很抱歉，系统出来点故障，请联系管理员!',
            //duration: 4500,
            type: 'error'
          });
    }
}
function postAction(url,params,fn,fnErr){
    axios.post(url, params)
      .then(function (response) {
        if(response.status == 200){
            fn(response.data);
        }
        errors(response) ;
        
        //console.log(response);
      })
      .catch(function (error) {
        Notification({
            title: '系统提示',
            message: '很抱歉，系统出来点故障，请联系管理员!',
            //duration: 4500,
            type: 'error'
          });
        fnErr(error);
        //console.log(error);
      });
}
function getAction(url,params,fn,fnErr){
    axios.get(url, params)
      .then(function (response) {
        if(response.status == 200){
            fn(response.data);
        }
        errors(response) ;
        //console.log(response);
      })
      .catch(function (error) {
        Notification({
            title: '系统提示',
            message: '很抱歉，系统出来点故障，请联系管理员!',
            //duration: 4500,
            type: 'error'
          });
        fnErr(error);
        //console.log(error);
      });
}




//登陆接口
const queryLogin = (params,fn,fnErr) => postAction(ywBasePath + '/loginController/ywjbIndex', params,fn,fnErr);
//重点人群接口----------------------------------------------------------------------
//查询重点人员信息
const emphasis_keypoint = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'find/keypoint', params,fn,fnErr);
//显示个人劳动经历信息
const emphasis_labor = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'show/labor', params,fn,fnErr);
//查询收藏职位列表信息
const emphasis_favor = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'show/favor', params,fn,fnErr);
//查询个人简历详细信息
const emphasis_resume = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'show/resume', params,fn,fnErr);
//查询就业服务信息
const emphasis_employ = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'show/employ', params,fn,fnErr);
//显示个人社保缴费信息
const emphasis_insur = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'show/insur', params,fn,fnErr);
//显示个人就业见习记录
const emphasis_trainee = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'show/trainee', params,fn,fnErr);
//显示职位评价信息
const emphasis_evaluation = (params,fn,fnErr) => getAction(ywBasePath + urlStr + 'show/evaluation', params,fn,fnErr);


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