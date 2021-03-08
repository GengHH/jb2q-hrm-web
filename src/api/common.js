/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-08 18:36:45
 * @Description: 各模块都可调用的功能接口，如：获取字典表
 * @FilePath: \jb2q-hrm-web\src\api\common.js
 */
import apiUrlConfig from '../config';
import { getAction } from './allActionManage';

const basePath = apiUrlConfig.commonBasePath;
/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//通用（根据字典表类型）的查询字典表信息
const queryDicData = params => getAction(basePath + '/dic/getDicJson', params);

//获取工作性质字典表
const getGzxz = () => getAction(basePath + '/common/dic/getGzxz');
//获取区县字典表
const getQx = () => getAction(basePath + '/common/dic/getQx');
//语种字典表
const getLanguageType = () =>
  getAction(basePath + '/common/dic/getLanguageType');
//语言等级
const getLanguageLevel = () =>
  getAction(basePath + '/common/dic/getLanguageLevel');
//学历
const getRecruitEdu = () => getAction(basePath + '/common/dic/getRecruitEdu');
//证件类型
//const getRecruitEdu = () => getAction(basePath + '/common/dic/getRecruitEdu');

const getPsnlResume = params =>
  getAction(basePath + '/person/resume/loadPsnlResume', params);

export {
  queryDicData,
  getGzxz,
  getQx,
  getLanguageType,
  getLanguageLevel,
  getRecruitEdu,
  getPsnlResume
};
