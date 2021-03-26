/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-24 09:36:50
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\login\index.js
 */

import Mock from 'mockjs';
import config from '../../config/mock.conf';
//import '../commonMock';

const basePath = config.personBasePath;
/**
 * 通用的测试通过返回的结果
 */
const successData = {
  status: 200,
  message: '',
  result: {
    data: true
  }
};

Mock.mock(basePath + '/psnl/login', 'post', function(options) {
  return successData;
});

export default Mock;
