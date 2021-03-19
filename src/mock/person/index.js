/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-19 15:20:17
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\person\index.js
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
        allowSearch: '1',
        allowArtificialReco: '1',
        allowAutoReco: '0'
      }
    }
  };
};

// Mock.mock(RegExp('/person/info/loadPersonInfo' + '.*'), 'get', function(
//   options
// ) {
//   return getPersonbaseInfo(options);
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
      data: {
        allowSearch: '0',
        allowArtificialReco: '1',
        allowAutoReco: '0'
      }
    }
  };
});

Mock.mock(
  RegExp(basePath + '/person/info/loadPersonInfo' + '.*'),
  'get',
  function(options) {
    return getPersonbaseInfo(options);
  }
);
// 权限控制
Mock.mock(
  RegExp(basePath + '/person/info/loadPsnlPermissionsInfo' + '.*'),
  'get',
  function(options) {
    return loadPsnlPermissionsInfo(options);
  }
);
Mock.mock(RegExp(basePath + '/person/info/update' + '.*'), 'put', function(
  options
) {
  return successData;
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
//获取职位信息
Mock.mock(
  RegExp(basePath + '/person/manage/find/position' + '.*'),
  'get',
  function(options) {
    return {
      status: 200,
      message: '',
      result: Mock.mock({
        'data|1-10': [
          {
            positionId: '4',
            positionName: 'JAVA架构工程师',
            salaryScope: '20-5004',
            workArea: '06',
            workNature: '01',
            eduRequire: '08',
            recruitNum: '3',
            corpName: '上海新移力自动化科技有限公司',
            cid: '201002025628331',
            workYearNeed: '05',
            releaseTime: '2021-12-10 10:44:36',
            tranBaseSymbol: '0',
            agencyRecruit: '0',
            entrustCorpName: '',
            favor: '0',
            releaseUserId: '0000941012',
            type: '1'
          }
        ]
      })
    };
  }
);
// TODO 投递简历
Mock.mock(basePath + '/person/feedback/do-applyFor', 'put', function(options) {
  return successData;
});
//修改个人评价
Mock.mock(basePath + '/person/resume/savePsnlEvaluate', 'put', function(
  options
) {
  return successData;
});
//修改个人描述
Mock.mock(basePath + '/person/resume/savePositionLike', 'post', function(
  options
) {
  return successData;
});
//新增或修改个人劳动经历信息
Mock.mock(basePath + '/person/info/saveEduExp', 'post', function(options) {
  return successData;
});
//屏蔽所选企业
Mock.mock(basePath + '/person/info/shieldCorp', 'put', function(options) {
  return successData;
});
export default Mock;
