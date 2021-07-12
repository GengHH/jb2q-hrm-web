/*
 * @Author: your name
 * @Date: 2021-03-26 14:41:47
 * @LastEditTime: 2021-07-01 09:46:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\api\index.js
 */
import { getAction, postAction, allAction } from '@/api/adminApi';
const urlStr = '/admin/keypoint/';

//重点人群接口----------------------------------------------------------------------
//查询重点人员信息
const emphasis_keypoint = (params, fn, fnErr) =>
  postAction(urlStr + 'find/keypoint', params, fn, fnErr);
const emphasis_query = (params, fn, fnErr) =>
  postAction('/admin/corp/position/recommend/query', params, fn, fnErr);

//--------求职档案
//个人基本信息
const job_psnlInfo = (params, fn, fnErr) =>
  postAction(urlStr + 'show/psnlInfo', params, fn, fnErr);
//简历信息
const job_resume = (params, fn, fnErr) =>
  postAction(urlStr + 'show/resume', params, fn, fnErr);
//劳动经历
const job_labor = (params, fn, fnErr) =>
  postAction(urlStr + 'show/labor', params, fn, fnErr);
//社保缴费记录
const job_insur = (params, fn, fnErr) =>
  postAction(urlStr + 'show/insur', params, fn, fnErr);
//就业见习记录
const job_jyjxRecordInfo = (params, fn, fnErr) =>
  postAction(urlStr + 'show/trainee', params, fn, fnErr);
//简历投递及反馈记录
const job_queryApplyForFeedbackList = (params, fn, fnErr) =>
  postAction(urlStr + 'queryApplyForFeedbackList', params, fn, fnErr);
//职位评价记录
const job_evaluation = (params, fn, fnErr) =>
  postAction(urlStr + 'queryPositionEvaluationList', params, fn, fnErr);
//职位收藏记录
const job_favor = (params, fn, fnErr) =>
  postAction(urlStr + 'queryFavorPositionList', params, fn, fnErr);
//服务记录
//就业服务记录
const job_trainee = (params, fn, fnErr) =>
  postAction(urlStr + 'queryGuideRecodeList', params, fn, fnErr);
const job_queryRecommendList = (params, fn, fnErr) =>
  postAction(urlStr + 'queryRecommendList', params, fn, fnErr);

const job_queryTrainList = (params, fn, fnErr) =>
  postAction(urlStr + 'queryTrainList', params, fn, fnErr);

export {
  emphasis_keypoint,
  emphasis_query,
  job_psnlInfo,
  job_resume,
  job_labor,
  job_insur,
  job_jyjxRecordInfo,
  job_queryApplyForFeedbackList,
  job_evaluation,
  job_favor,
  job_trainee,
  job_queryRecommendList,
  job_queryTrainList
};
