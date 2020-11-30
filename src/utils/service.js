// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import axios from 'axios';
import { VueAxios } from './vueAxios';
/**
 * Created by GengHH on 2020/11/29
 * 创建一些常用的vue服务插件，如axios
 * 1.定制axios的基础配置；eg:baseURL 主要映射后端的域名
 * 2.导出VueAxios安装器
 */

let apiBaseUrl = "";

// 创建 axios 实例
const service = axios.create({
    //baseURL: '/hrm',
    baseURL: apiBaseUrl, // api base_url
    timeout: 90000 // 请求超时时间
});
//  封装成VueAxios安装器
const installer = {
    vm: {},
    install(Vue, router = {}) {
        Vue.use(VueAxios, router, service);
    }
};

export { installer as VueAxios, service as axios }