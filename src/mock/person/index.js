/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-12 19:57:28
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
  // return `<!DOCTYPE html>
  //       <html lang="en">
  //       <head>
  //         <meta charset="UTF-8">
  //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>Document</title>
  //       </head>
  //       <body>
  //         hahahha
  //       </body>
  //       </html>`;
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
        allowSearch: '0',
        allowArtificialReco: '0',
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
//检验该人员是不是首次进入系统
Mock.mock(
  RegExp(basePath + '/person/info/checkPsnlInit' + '.*'),
  'get',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: {
          pid: '',
          zjlxId: '',
          zjhm: '',
          xm: '',
          sexId: '',
          birthDate: '',
          contactPhone: '',
          livingArea: '',
          livingStreet: '',
          livingAddress: '',
          houseArea: '',
          houseStreet: '',
          employStatus: '',
          eduId: '',
          type: '',
          isInit: '0'
        }
      }
    };
  }
);

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
// Mock.mock(RegExp(basePath + '/person/info/update' + '.*'), 'put', function(
//   options
// ) {
//   return successData;
// });
Mock.mock(basePath + '/person/info/updatePsnlPermissionsInfo', 'post', function(
  options
) {
  return successData;
});
//维护个人基本信息
Mock.mock(basePath + '/person/info/savePersonInfo', 'post', function(options) {
  return successData;
});
//新增或修改个人技能证书信息
Mock.mock(basePath + '/person/inresumeo/saveSkillCert', 'post', function(
  options
) {
  return successData;
});
//新增或修改个人语言能力信息
Mock.mock(basePath + '/person/resume/saveLanguageLevel', 'post', function(
  options
) {
  return successData;
});
//新增或修改个人劳动经历信息
Mock.mock(basePath + '/person/resume/saveLaborExp', 'post', function(options) {
  return successData;
});
//获取职位信息(分页)
Mock.mock(
  RegExp(basePath + '/person/manage/find/position' + '.*'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        pageresult: Mock.mock({
          'total|1-10': 1,
          'data|1-10': [
            {
              'positionId|+1': '@string("number", 5)',
              positionCode: '20210100000002',
              positionName: 'JAVA架构工程师',
              salaryScope: '20-5004',
              workArea: '06',
              workNature: '01',
              eduRequire: '08',
              recruitNum: '@string("number", 1,4)',
              corpName: '上海新移力自动化科技有限公司',
              cid: '201002025628331',
              workYearNeed: '05',
              releaseTime: '@datetime', //'2021-12-10 10:44:36',
              tranBaseSymbol: '0',
              agencyRecruit: '0',
              entrustCorpName: '',
              releaseUserId: '0000941012',
              type: '1',
              'favor|+1': [false, true],
              recruitType: '1',
              entrustTyshxym: '',
              corpId: '201002025628331',
              positionType: '0201',
              ageMax: '35',
              ageMin: '18',
              workAddress: '上海市普陀区中江路889号804室',
              workHour: '01',
              salaryMax: '20000',
              salaryMin: '6000',
              salaryPayType: '04',
              special: '0',
              describe: '嘴皮子溜，脸皮子厚',
              onTop: '0',
              releaseStatusId: '2'
            }
          ]
        })
      }
    };
  }
);
//个人收藏职位信息
Mock.mock(
  RegExp(basePath + '/person/manage/find/do-favor/' + '.*'),
  'post',
  function(options) {
    return successData;
  }
);
//个人取消收藏职位信息
Mock.mock(basePath + '/person/manage/find/cancle-favor', 'post', function(
  options
) {
  return successData;
});
//个人投递简历
Mock.mock(basePath + '/person/feedback/do-applyFor', 'post', function(options) {
  return successData;
});
//修改个人评价
Mock.mock(basePath + '/person/resume/savePsnlEvaluate', 'post', function(
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
//保存个人教育经历信息
Mock.mock(basePath + '/person/resume/saveEduExp', 'post', function(options) {
  return successData;
});
//删除某种能力或经历信息
Mock.mock(
  RegExp(basePath + '/person/resume/delete/' + '.*'),
  'delete',
  function(options) {
    return successData;
  }
);

//个人查询屏蔽信息列表
Mock.mock(
  RegExp(basePath + '/person/info/queryShieldList' + '.*'),
  'get',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: [
          {
            shieldId: '61',
            shieldType: '1',
            pid: '1',
            corpId: '11',
            corpName: '测试单位名称'
          },
          {
            shieldId: '62',
            shieldType: '1',
            pid: '1',
            corpId: '11',
            corpName: '测试单位名称'
          }
        ]
      }
    };
  }
);

//个人屏蔽单位
Mock.mock(basePath + '/person/info/queryShieldList', 'post', function(options) {
  return successData;
});
//个人屏蔽单位
Mock.mock(basePath + '/person/info/shieldCorp', 'post', function(options) {
  return successData;
});
//个人取消屏蔽单位
Mock.mock(basePath + '/person/info/cancelShield', 'post', function(options) {
  return successData;
});

//获取关注单位列表
Mock.mock(
  RegExp(basePath + '/person/feedback/corp/findFavorRecord' + '.*'),
  'get',
  function(options) {
    return {
      status: 200,
      message: '',
      result: Mock.mock({
        'data|1-10': [
          {
            corpName: '上海新移力自动化科技有限公司',
            industryType: '02',
            corpNature: '02',
            logo: '',
            positionId: '123',
            positionName: '软件开发工程师',
            salaryScope: '9999',
            eduRequire: '123',
            workNature: '123',
            workYearNeed: '5',
            recruitNum: '100',
            workArea: '01',
            favorTime: '2021-01-14 16:32:30',
            favorId: '30'
          }
        ]
      })
    };
  }
);

//获取个人收藏职位列表
Mock.mock(
  RegExp(basePath + '/person/feedback/position/findFavorRecord' + '.*'),
  'get',
  function(options) {
    return {
      status: 200,
      message: '',
      result: Mock.mock({
        'data|1-10': [
          {
            corpName: '上海新移力自动化科技有限公司',
            industryType: '02',
            corpNature: '02',
            logo: '',
            positionId: '123',
            positionName: '软件开发工程师',
            salaryScope: '9999',
            eduRequire: '123',
            workNature: '123',
            workYearNeed: '5',
            recruitNum: '100',
            workArea: '01',
            favorTime: '2021-01-14 16:32:30',
            favorId: '30'
          }
        ]
      })
    };
  }
);
//删除某种能力或经历信息
Mock.mock(RegExp(basePath + '/person/feedback/.*/findRecord'), 'get', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: Mock.mock({
      'data|1-10': [
        {
          'applyforId|+1': '@string("number", 5)', //'49',
          resumeId: '@string("number", 1)', //'1',
          source: '01',
          positionName: 'JAVA架构工程师',
          tranBaseSymbol: '',
          laborYear: '',
          xm: '',
          contactPhone: '',
          pid: '',
          age: '',
          edu: '',
          graduateSchool: '',
          'sex|+1': ['1', '2'],
          corpName: '上海新移力自动化科技有限公司',
          'positionId|+1': '@string("number", 5)',
          releaseUserId: '0000941012',
          salaryScope: '10000-50000',
          workArea: '06',
          interviewDate: '',
          reply: '1',
          evaluateLevel: '',
          evaluateContent: '',
          createTime: '@datetime', //'2020-12-23 16:23:15',
          recId: '',
          meetId: ''
        }
      ]
    })
  };
});

// TODO 评价职位
Mock.mock(basePath + '/person/feedback/do-evaluate', 'post', function(options) {
  return successData;
});

//发送验证码
Mock.mock(basePath + '/person/info/sendSms', 'post', function(options) {
  return successData;
});

//更新手机号
Mock.mock(basePath + '/person/info/updatePhoneNum', 'post', function(options) {
  return successData;
});
export default Mock;
