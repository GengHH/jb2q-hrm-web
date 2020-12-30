// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import axios from 'axios';
import { VueAxios } from './vueAxios';

/**
 * Created by GengHH on 2020/11/29
 * 创建一些常用的vue服务插件，如:Axios
 * 1.定制axios的基础配置；eg:baseURL 主要映射后端的域名
 * 2.导出VueAxios安装器(vue插件)
 * 3.导出原生的Axios
 */

let apiBaseUrl = '';

// 创建 axios 实例
const service = axios.create({
  //baseURL: '/hrm',
  baseURL: apiBaseUrl, // api base_url
  timeout: 90000 // 请求超时时间
});

// common error function
const err = error => {
  if (error.response) {
    // let data = error.response.data;
    // const data = JSON.parse(sessionStorage.vuex);
    var token = null;
    let data = sessionStorage.vuex;
    if (data && data != 'null' && data != '' && data.length > 0) {
      data = JSON.parse(data);
      if (data.webuser) {
        token = data.webuser.token;
      }
    }
    console.log('------异常响应------', data);
    console.log('------异常响应------', error.response.status);
    switch (error.response.status) {
      //   case 403:
      //     notification.error({
      //       message: '系统提示',
      //       description: '拒绝访问',
      //       duration: 4
      //     });
      //     break;
      case 500:
        this.$notify.error({
          message: '系统提示',
          description: '系统繁忙，请稍后再试!',
          duration: 4
        });
        break;
      case 404:
        this.$notify.error({
          message: '系统提示',
          description: '很抱歉，资源未找到!',
          duration: 4
        });
        break;
      //   case 504:
      //     notification.error({ message: '系统提示', description: '网络超时' });
      //     break;
      case 401:
        this.$notify.error({
          message: '系统提示',
          description: '未授权，请重新登录',
          duration: 4
        });
        if (token) {
          //TODO
          console.log('this token is:' + token);
          // store.dispatch('user/logout').then(() => {
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 1500);
          // });
        }
        break;
      default:
        this.$notify.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        });
        break;
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(
  config => {
    console.log('------------------begin request interceptor----------');
    var token = null;
    let data = sessionStorage.vuex;
    if (data && data != 'null' && data != '' && data.length > 0) {
      data = JSON.parse(data);
      if (data.webuser) {
        token = data.webuser.token;
      }
    }
    // const token = JSON.parse(sessionStorage.vuex).user.token;
    if (token) {
      config.headers['Access-Token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }

    // 容许跨域请求
    //config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8"
    config.headers['Access-Control-Allow-Origin'] = '*';
    //config.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type';
    //config.headers['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(response => {
  return response.data;
}, err);

// 封装成VueAxios安装器
const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service);
  }
};

export { installer as VueAxios, service as axios };
