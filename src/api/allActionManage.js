/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-07 16:38:05
 * @Description: 将axios封装成通用的restful的接口
 * @FilePath: \jb2q-hrm-web\src\api\allActionManage.js
 */
// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { axios } from '@/utils/httpService';

/**
 * Created by GengHH on 2020/11/29
 * 利用axios来封装成所需的post,get,put,delete等通用请求
 */

//post
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  });
}

//get
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  });
}

//put
export function putAction(url, parameter) {
  return axios({
    url: url,
    method: 'put',
    data: parameter
  });
}

//delete
export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    data: parameter
  });
}
