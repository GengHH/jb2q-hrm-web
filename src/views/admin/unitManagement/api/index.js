/*
 * @Author: your name
 * @Date: 2021-03-26 14:41:47
 * @LastEditTime: 2021-07-02 10:47:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\unitManagement\api\index.js
 */
import { getAction, postAction } from '@/api/adminApi';
import axios from 'axios';
const urlStr = '/admin/corp/';
//查询单位信息
const unit_query = (params, fn, fnErr) =>
  postAction(urlStr + 'query/all', params, fn, fnErr);
const unit_query_agency = (params, fn, fnErr) =>
  postAction(urlStr + 'position/query', params, fn, fnErr);
const unit_query_resume = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/query', params, fn, fnErr);
const unit_edit = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/modify', params, fn, fnErr);
const unit_out = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/off', params, fn, fnErr);
//代理招聘
const agency_query = (params, fn, fnErr) =>
  postAction(urlStr + 'entrust/query', params, fn, fnErr);
const agency_add = (params, fn, fnErr) =>
  postAction(urlStr + 'entrust/add', params, fn, fnErr);
const agency_edit = (params, fn, fnErr) =>
  postAction(urlStr + 'entrust/modify', params, fn, fnErr);
const agency_cancel = (params, fn, fnErr) =>
  postAction(urlStr + 'entrust/cancel', params, fn, fnErr);
const agency_position_verify = (params, fn, fnErr) =>
  postAction(urlStr + 'position/verify', params, fn, fnErr);
const agency_resume = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/queryBycid', params, fn, fnErr);
const agency_resume_verify = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/verify', params, fn, fnErr);
const agency_resume_query = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/recommend/query', params, fn, fnErr);
const agency_resume_detail = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/detail', params, fn, fnErr);
const agency_rec = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/rec', params, fn, fnErr);
const agency_verify = (params, fn, fnErr) =>
  postAction(urlStr + 'position/resume/batch/verify', params, fn, fnErr);

//单位账号管理
const management_query = (params, fn, fnErr) =>
  postAction(urlStr + 'query/all', params, fn, fnErr);
const management_edit = (params, fn, fnErr) =>
  postAction(urlStr + 'modify', params, fn, fnErr);
const management_frozen = (params, fn, fnErr) =>
  postAction(urlStr + 'frozen', params, fn, fnErr);
//转出入审核
const move_query = (params, fn, fnErr) =>
  postAction(urlStr + 'transfer/query', params, fn, fnErr);
const move_audit = (params, fn, fnErr) =>
  postAction(urlStr + 'transfer/verify', params, fn, fnErr);
//精准查询
const accurate_info = (params, fn, fnErr) =>
  postAction('/admin/algorithm/user/getUserInfo', params, fn, fnErr);
export {
  agency_query,
  agency_add,
  agency_edit,
  agency_cancel,
  agency_position_verify,
  agency_resume_verify,
  agency_resume,
  agency_resume_query,
  agency_resume_detail,
  agency_rec,
  unit_query,
  unit_query_agency,
  unit_query_resume,
  unit_edit,
  unit_out,
  management_query,
  management_edit,
  management_frozen,
  move_query,
  move_audit,
  accurate_info,
  agency_verify
};
