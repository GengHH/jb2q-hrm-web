/*
 * @Author: your name
 * @Date: 2021-03-15 10:31:29
 * @LastEditTime: 2021-05-28 14:55:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\api\adminApi.js
 */
import apiUrlConfig from '../config';
import { Notification, Loading } from 'element-ui';
// import { getAction, postAction } from './allActionManage';
import axios from 'axios';
import store from '@/store';
//const basePath = apiUrlConfig.personBasePath;
const ywBasePath = apiUrlConfig.adminBasePath;
let loading = null;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.5)'
  });
}

function endLoading() {
  loading.close();
}

function errors(response) {
  if (response.status >= 500) {
    Notification({
      title: '系统提示',
      message: '系统繁忙，请稍后再试!',
      //duration: 4500,
      type: 'error'
    });
  } else if (response.status == 404) {
    Notification({
      title: '系统提示',
      message: '很抱歉，资源未找到!',
      //duration: 4500,
      type: 'error'
    });
  } else {
    Notification({
      title: '系统提示',
      message: '很抱歉，系统出来点故障，请联系管理员!',
      //duration: 4500,
      type: 'error'
    });
  }
}
function postAction(url, params, fn, fnErr) {
  startLoading();
  axios
    .post(ywBasePath + url, params)
    .then(response => {
      endLoading();
      if (response.status == 200) {
        if (
          typeof response.data === 'string' &&
          response.data.indexOf('请重新登录') != -1
        ) {
          console.error('捕获登陆异常');
          Notification({
            title: '系统提示',
            message: '很抱歉，登陆超时请重新登录!',
            duration: 1500,
            type: 'error',
            onClose: () => {
              store.dispatch('admin/logout');
              window.location.href = '/ggzp-shrs/adminLogin.html';
            }
          });
          return;
        }
        fn(response.data);
      } else {
        errors(response);
      }
      console.log(response);
    })
    .catch(error => {
      endLoading();
      Notification({
        title: '系统提示',
        message: '很抱歉，系统出现故障，请联系管理员!',
        //duration: 4500,
        type: 'error'
      });
      fnErr(error);
      console.log(error);
    });
}
function getAction(url, params, fn, fnErr) {
  axios
    .get(url, params)
    .then(function(response) {
      if (response.status == 200) {
        fn(response.data);
      }
      errors(response);
      //console.log(response);
    })
    .catch(function(error) {
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
const queryLogin = (params, fn, fnErr) =>
  postAction('/loginController/ywjbIndex', params, fn, fnErr);

function initQuery(obj) {
  let type = 'post';
  return new Promise((reslove, reject) => {
    axios[type](obj.url, obj.data)
      .then(res => {
        reslove(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
function allAction(arr, fn, errFn) {
  let queryArr = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i].url = ywBasePath + arr[i].url;
    queryArr.push(initQuery(arr[i]));
  }
  let res = Promise.all(queryArr);
  res.then(
    arr => {
      fn(arr);
    },
    err => {
      errFn(err);
    }
  );
}
export { queryLogin, postAction, getAction, allAction };
