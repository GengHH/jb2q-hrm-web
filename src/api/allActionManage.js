// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import { axios } from '@/utils/service';

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
        data: parameter
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

