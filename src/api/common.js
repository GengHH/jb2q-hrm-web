/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-28 13:16:19
 * @Description: 各模块都可调用的功能接口，如：获取字典表
 * @FilePath: \jb2q-hrm-web\src\api\common.js
 */
import apiUrlConfig from '../config';
import { getAction, postAction } from './allActionManage';

const basePath = apiUrlConfig.commonBasePath;
/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//通用（根据字典表类型）的查询字典表信息
//const queryDicData = params => getAction(basePath + '/dic/getDicJson', params);
const queryDicData = params => postAction(basePath + '/dic/getDicJson', params);

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

// 获取个人简历信息
const getPsnlResume = params =>
  getAction(basePath + '/person/resume/loadPsnlResume', params);
// 获取个人简历信息（学信网）
const getEduExpFromChsi = params =>
  postAction(basePath + '/person/resume/getEduExpFromChsi', params);
// 获取个人证书信息（鉴定内网）
const getCertInfo = params =>
  postAction(basePath + '/common/person/query-certInfo', params);

/******聊天专用接口*********/
//查询未读信息的详细信息
const querySession = params => postAction(basePath + '/session/query', params);
//发送信息
const sendSession = params => postAction(basePath + '/session/send', params);
//打开回话页面查询聊天记录
const openSession = params => postAction(basePath + '/session/open', params);

/**********end*************/

export {
  queryDicData,
  getGzxz,
  getQx,
  getLanguageType,
  getLanguageLevel,
  getRecruitEdu,
  getPsnlResume,
  getEduExpFromChsi,
  querySession,
  sendSession,
  openSession,
  getCertInfo
};
