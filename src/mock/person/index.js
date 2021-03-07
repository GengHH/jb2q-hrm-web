/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-07 22:47:25
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
/**
 *加载个人权限信息
 * @param {*} pid
 */
const loadPsnlPermissionsInfo = pid => {
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
      data: {
        allowSearch: '0',
        allowArtificialReco: '1',
        allowAutoReco: '0'
      }
    }
  };
});
Mock.mock(basePath + '/person/info/loadPersonInfo', 'get', function(options) {
  return getPersonbaseInfo(options);
});
Mock.mock(basePath + '/person/info/loadPsnlPermissionsInfo', 'get', function(
  options
) {
  return loadPsnlPermissionsInfo(options);
});

Mock.mock(basePath + '/person/info/savePersonInfo', 'post', function(options) {
  return successData;
});
Mock.mock(basePath + '/person/info/saveSkillCert', 'post', function(options) {
  return successData;
});
Mock.mock(basePath + '/person/info/saveLanguageLevel', 'post', function(
  options
) {
  return successData;
});
Mock.mock(basePath + '/person/info/saveLaborExp', 'post', function(options) {
  return successData;
});
export default Mock;
