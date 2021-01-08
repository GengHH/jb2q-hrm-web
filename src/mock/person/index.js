/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-08 17:47:08
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\person\index.js
 */

import Mock from 'mockjs';
import config from '../../config/mock.conf';
import '../commonMock';

const basePath = config.personBasePath;
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

Mock.mock(basePath + '/person/info/loadPersonInfo', 'get', function(options) {
  return getPersonbaseInfo(options);
});

export default Mock;
