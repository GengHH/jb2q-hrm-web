/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-18 11:10:06
 * @Description: 各模块都可调用的功能接口，如：获取字典表
 * @FilePath: \jb2q-hrm-web\src\api\common.js
 */

import { getAction } from './allActionManage';

/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//获取工作性质字典表
const getGzxz = () => getAction('/common/dic/getGzxz');
//获取区县字典表
const getQx = () => getAction('/common/dic/getQx');
//语种字典表
const getLanguageType = () => getAction('/common/dic/getLanguageType');
//语言等级
const getLanguageLevel = () => getAction('/common/dic/getLanguageLevel');
//学历
const getRecruitEdu = () => getAction('/common/dic/getRecruitEdu');

export { getGzxz, getQx, getLanguageType, getLanguageLevel, getRecruitEdu };
