/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-17 18:12:10
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\corporation\index.js
 */

import Mock from 'mockjs';
import config from '../../config/mock.conf';
import '../commonMock';

const basePath = config.personBasePath;
/**
 * 通用的测试通过返回的结果
 */
const successData = {
  status: 200,
  message: '',
  result: {}
};

/**
 * 查询个人的基本信息
 * @param {*} pid
 */
const getCorpbaseInfo = pid => {
  console.log('options', pid);
  return {
    status: 200,
    message: '',
    result: {
      data: {
        cid: '201002025628331',
        tyshxym: '91310107667812584X',
        corpName: '上海新移力自动化科技有限公司',
        establishDate: '20171130',
        businessRange:
          '自动化设备开发、制造（限分支）、销售、技术服务。 【依法须经批准的项目，经相关部门批准后方可开展经营活动】',
        unitResidence: '上海市普陀区中江路889号804室',
        specific: '1',
        corpNature: '02',
        contactPhone: '13764565977',
        statusId: '1',
        industryType: '02',
        contactAddress: '中江路889号804室',
        tranBaseSymbol: '0',
        introduce:
          '自动化设备开发、制造（限分支）、销售、技术服务。 【依法须经批准的项目，经相关部门批准后方可开展经营活动】',
        humanResourceReg: '0',
        frozen: '0',
        keypointCorp: '0',
        specialCorp: '0',
        entrustStatus: '0',
        entrustValid: '2020-12-08 15:57:25',
        recruitChargeName: 'test',
        recruitChargePhone: '13322114512',
        recruitStaffName1: '刘德坡',
        recruitStaffPhone1: '13764565977',
        recruitStaffName2: '刘德坡',
        recruitStaffPhone2: '13764565977'
      }
    }
  };
};

// Mock.mock(RegExp('/person/info/loadPersonInfo' + '.*'), 'get', function(
//   options
// ) {
//   return getCorpbaseInfo(options);
// });
Mock.mock(basePath + '/loginController/logout', 'post', function(options) {
  return successData;
});
Mock.mock(basePath + '/loginController/getLogonUser', 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      cid: '123123123123'
    }
  };
});

Mock.mock(basePath + '/corp/info/loadCorpInfo', 'get', function(options) {
  return getCorpbaseInfo(options);
});
Mock.mock(basePath + '/person/info/saveCorpInfo', 'post', function(options) {
  return successData;
});

export default Mock;
