/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-02 17:45:53
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\person\index.js
 */

import Mock from 'mockjs';
import config from '../../config/mock.conf';
import '../commonMock';

const basePath = config.personBasePath;

const successData = {
  status: 200,
  message: '',
  result: {}
};

/**
 * 查询个人的基本信息
 * @param {*} pid
 */
const getPersonbaseInfo = pid => {
  console.log('options', pid);
  return {
    status: 200,
    message: '',
    result: {
      data: {
        pid: '201906186258910',
        zjlxId: '01',
        zjhm: '370283199506142214',
        xm: 'genghonghui',
        sexId: '1',
        birthDate: '19960613',
        contactPhone: '13122272095',
        livingArea: '01',
        livingStreet: '1310',
        livingAddress: '宝山淞南镇新梅松南苑11号楼1201'
      }
    }
  };
};

// Mock.mock(RegExp('/person/info/loadPersonInfo' + '.*'), 'get', function(
//   options
// ) {
//   return getPersonbaseInfo(options);
// });

Mock.mock(basePath + '/loginController/getLogonUser', 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      logonUser: {
        userId: 309307,
        userIdStr: '0000309307',
        userName: '开发人员',
        loginName: 'user',
        userType: 'user',
        organId: '',
        organIdStr: '-2',
        organName: '维护',
        organType: '',
        domainId: 1,
        domainIdStr: '',
        domainName: '',
        roleKey: 'SC:R:1_c4ca4238a0b923820dcc509a6f75849b',
        userKey:
          'a3db4e507c72aa47c99b9c8bacf16da7f98dd24fcc62795fb79ebd65fe2260eb',
        expire: -1,
        extInfo: '',
        areaInfo: '',
        roles: [{ roleId: '1', roleName: '普通角色' }],
        readOnly: false,
        organIdKey: '-2',
        domainIdKey: '1',
        userIdKey: '0000309307'
      }
    }
  };
});
Mock.mock(basePath + '/person/info/loadPersonInfo', 'get', function(options) {
  return getPersonbaseInfo(options);
});

Mock.mock(basePath + '/person/info/savePersonInfo', 'post', function(options) {
  return successData;
});

export default Mock;
