/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-21 17:26:29
 * @Description: 将axios封装成通用的restful的接口
 * @FilePath: \jb2q-hrm-web\src\api\allActionManage.js
 */
// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { axios } from '@/utils/httpService';
import config from '@/config';
import { queryParams } from '@/utils/index';
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
  console.log('get' + url + '请求参数', parameter);
  //? TODO 本地开发使用mock时，采用axios.get(),否则mockjs无法拦截到；问题原因尚未知晓
  //return axios.get(url, { parameter: parameter }); //种情况mock可以拦截，但是获取不到传递的参数
  // console.log(config);
  if (config.mock) {
    let paramStr = queryParams(parameter);
    return axios.get(url + paramStr);
  } else {
    return axios({
      url: url,
      method: 'get',
      params: parameter
    });
  }
}

//put
export function putAction(url, parameter, isRestful = false) {
  if (isRestful) {
    console.log('restful', parameter);
    return axios({
      url: url + parameter,
      method: 'put'
    });
  }
  return axios({
    url: url,
    method: 'put',
    data: parameter
  });
}

//delete
export function deleteAction(url, parameter, isRestful = false) {
  if (isRestful) {
    return axios({
      url: url + parameter,
      method: 'delete',
      data: ''
    });
  }
  return axios({
    url: url,
    method: 'delete',
    data: parameter
  });
}
