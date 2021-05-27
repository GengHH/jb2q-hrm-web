/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-27 17:23:29
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
//更新工作年限
Mock.mock(basePath + '/person/resume/save/workyear', 'post', function(options) {
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
              'tranBaseSymbol|1': ['0', '1'],
              'agencyRecruit|1': ['0', '1'],
              entrustCorpName: '上海新移力自动化科技有限公司',
              releaseUserId: '0000941012',
              type: '1',
              'favor|+1': [false, true],
              'recruitType|1': ['1', '2'],
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
//查询求职信息列表
// Mock.mock(RegExp(basePath + '/person/feedback/.*/findRecord'), 'get', function(
//   options
// ) {
//   return {
//     status: 200,
//     message: '',
//     result: Mock.mock({
//       'data|1-10': [
//         {
//           'applyforId|+1': '@string("number", 5)', //'49',
//           resumeId: '@string("number", 1)', //'1',
//           source: '01',
//           positionName: 'JAVA架构工程师',
//           tranBaseSymbol: '',
//           laborYear: '',
//           xm: '',
//           contactPhone: '',
//           pid: '',
//           age: '',
//           edu: '',
//           graduateSchool: '',
//           'sex|+1': ['1', '2'],
//           corpName: '上海新移力自动化科技有限公司',
//           'positionId|+1': '@string("number", 5)',
//           releaseUserId: '0000941012',
//           salaryScope: '10000-50000',
//           workArea: '06',
//           interviewDate: '',
//           reply: '1',
//           evaluateLevel: '',
//           evaluateContent: '',
//           createTime: '@datetime', //'2020-12-23 16:23:15',
//           recId: '',
//           meetId: ''
//         }
//       ]
//     })
//   };
// });
// 根据不同状态获取简历投递记录
Mock.mock(basePath + '/person/feedback/find/applyfor', 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        // 'total|1-10': 1,
        // 'data|1-10': [
        total: 30,
        'data|10': [
          {
            applyforId: '@string("number", 5)',
            corpName: '上海市数字证书认证中心有限公司',
            positionName: 'UI绘图',
            salaryScope: '1000-5000',
            workArea: '05',
            createTime: '2021-05-07 13:35:02',
            source: '01',
            'reply|1': ['', '0', '1'],
            cid: '200008010219711',
            feedbackStatus: '05',
            feedbackTime: '2021-05-11 16:14:42',
            feedbackSource: '1',
            reason: '1234512341234',
            noticeInterview: '2021-05-11 16:13:37',
            interviewDate: '20210511',
            interviewTime: '181200',
            interviewContactName: '1111111111111111111',
            interviewContactPhone: '13800009999',
            interviewAddress: '111111111',
            interviewRemarks: '111',
            reportDate: '20210512',
            reportTime: '161237',
            reportContactName: '888',
            reportContactPhone: '13899990000',
            reportAddress: 'address',
            reportRemarks: '77777',
            'evaluationLevel|1': [null, 0, 1, 2, 3, 4, 5],
            evaluationContent: '评价内容',
            'evaluationTime|1': ['', '2021-05-10 18:08:07'],
            'notReadCount|1': ['0', '1', '2', '13', '4', '125', '99']
          }
        ]
      })
    }
  };
});

// TODO 评价职位
Mock.mock(basePath + '/person/feedback/do-evaluate', 'post', function(options) {
  return successData;
});
// 查询职位评价信息列表
Mock.mock(basePath + '/person/feedback/query-evaluation', 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        'total|1-10': 1,
        'data|1-10': [
          {
            // applyforId: '@string("number", 5)',
            corpName: '上海市数字证书认证中心有限公司',
            cid: '22222222',
            positionName: 'UI绘图',
            evaluationLevel: 1,
            evaluationContent:
              'asdfasdfasddfqerwtqwetqwetqwertqwertwertwertwertwer',
            evaluationTime: '2021-05-07 13:35:02'
          }
        ]
      })
    }
  };
});
//发送验证码
Mock.mock(basePath + '/person/info/sendSms', 'post', function(options) {
  return successData;
});

//更新手机号
Mock.mock(basePath + '/person/info/updatePhoneNum', 'post', function(options) {
  return successData;
});

//个人反馈
Mock.mock(basePath + '/person/feedback/do-interView', 'post', function(
  options
) {
  return successData;
});

/*********招聘会**********/
// 查询招聘会list
Mock.mock(basePath + '/person/meeting/queryMeetingList', 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: {
        total: 3,
        data: [
          {
            meetId: '3',
            meetName: '招聘会名称测试',
            meetIntroduce: '招聘会名称',
            meetType: '1',
            startTime: '2021-04-25 00:00:00',
            endTime: '2021-04-30 00:00:00',
            address: '天山路1800号',
            boothCount: '60',
            traffic: '地铁2，3，4，15号线',
            mainCorpName: '万达信息',
            contactName: '令狐冲',
            contactPhone: '123123122312',
            propagandaImage:
              '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',
            districtCode: '06,09',
            districtCodeList: ['06', '09'],
            onTop: '1',
            releaseStatus: '1',
            applyStatus: '1',
            userId: '-1        ',
            releaseTime: '2021-04-28 15:13:27',
            endApplyTime: '',
            meetIdList: []
          },
          {
            meetId: '6',
            meetName: '测试111111',
            meetIntroduce: '测试测试0000',
            meetType: '1',
            startTime: '2021-04-01 00:00:00',
            endTime: '2021-04-30 00:00:00',
            address: '测试111',
            boothCount: '12',
            traffic: '附近',
            mainCorpName: '测试123',
            contactName: '武器大师',
            contactPhone: '18910570087',
            propagandaImage: '',
            districtCode: '00,01,02,03',
            districtCodeList: ['00', '01', '02', '03'],
            onTop: '0',
            releaseStatus: '1',
            applyStatus: '1',
            userId: '0000309307',
            releaseTime: '2021-04-29 14:06:27',
            endApplyTime: '',
            meetIdList: []
          },
          {
            meetId: '22',
            meetName: 'wert',
            meetIntroduce: '23411',
            meetType: '1',
            startTime: '2021-05-11 00:00:00',
            endTime: '2021-05-29 00:00:00',
            address: '1234',
            boothCount: '1234',
            traffic: '123',
            mainCorpName: '1234',
            contactName: '12341',
            contactPhone: '18818881888',
            propagandaImage: 'MQ==',
            districtCode: '05',
            districtCodeList: ['05'],
            onTop: '0',
            releaseStatus: '1',
            applyStatus: '1',
            userId: '9000003910',
            releaseTime: '2021-05-05 15:55:58',
            endApplyTime: '',
            meetIdList: []
          }
        ]
      }
    }
  };
});

//个人投递招聘会下的职位
Mock.mock(basePath + '/person/meeting/queryMeetingSchedule', 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      data: {
        meetId: 1,
        meetName: '测试',
        meetIntroduce: '测试测试',
        meetType: '1',
        startTime: '2021-05-01 00:00:00',
        endTime: '2021-05-12 00:00:00',
        address: '测试2',
        boothCount: '22',
        traffic: '吃的啥的方式',
        mainCorpName: '测试1',
        contactName: '而且',
        contactPhone: '18910570087',
        propagandaImage:
          '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',
        districtCode: '01,00',
        districtCodeList: ['01', '00'],
        onTop: '0',
        releaseStatus: '1',
        applyStatus: '1',
        userId: '0001564698',
        releaseTime: '2021-05-20 17:38:51',
        endApplyTime: '',
        propagandaImageBase64: '',
        meetIdList: []
      }
    }
  };
});

//招聘会下所有的单位信息
Mock.mock(
  basePath + '/person/meeting/queryMeetingCorporationList',
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: [
          {
            cid: '200008010784151',
            corpName: '万达信息股份有限公司',
            unitResidence:
              '上海市桂平路481号20号楼5层                                                      ',
            corpNature: '15',
            industryType: '01',
            districtCode: '05',
            contactAddress: '联航路',
            positionCount: 2
          }
        ]
      }
    };
  }
);

//招聘会下所有的职位信息
Mock.mock(
  basePath + '/person/meeting/queryMeetingPositionList',
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: [
          {
            positionId: 1,
            positionCode: '20210400000001',
            positionName: '软件测试',
            recruitType: '1',
            tranBaseSymbol: '0',
            tranPositionCode: '',
            tranCorpId: '',
            tranCorpName: '',
            agencyRecruit: '0',
            entrustTyshxym: '',
            entrustCorpName: '',
            corpId: '200008010784151',
            positionType: '15  ',
            workNature: '01',
            ageMax: 40,
            ageMin: 25,
            workArea: '05',
            workAddress: '天山路1800号',
            workHour: '005',
            workYearNeed: '03',
            eduRequire: '07',
            salaryMax: 10000,
            salaryMin: 5000,
            salaryPayType: '04',
            recruitNum: 2,
            special: '',
            describe: '测试',
            workStreet: '0501,0502',
            onTop: '0',
            endDate: '20210531',
            statusId: '',
            verifyUserId: '',
            verifyTime: '',
            verifyMemo: '',
            releaseStatusId: '',
            releaseUserId: '',
            releaseTime: '',
            offShelf: '',
            offTime: '',
            offReason: '',
            offUserId: '',
            editTime: '',
            specialList: [],
            workStreetList: ['0501', '0502']
          },
          {
            positionId: 2,
            positionCode: '20210500000002',
            positionName: '软件开发',
            recruitType: '2',
            tranBaseSymbol: '0',
            tranPositionCode: '',
            tranCorpId: '',
            tranCorpName: '',
            agencyRecruit: '0',
            entrustTyshxym: '',
            entrustCorpName: '',
            corpId: '200008010784151',
            positionType: '15  ',
            workNature: '01',
            ageMax: 40,
            ageMin: 25,
            workArea: '05',
            workAddress: '延安西路',
            workHour: '005',
            workYearNeed: '01',
            eduRequire: '06',
            salaryMax: 12000,
            salaryMin: 5000,
            salaryPayType: '04',
            recruitNum: 2,
            special: '01,03',
            describe: '代理招聘测试数据',
            workStreet: '0501,0502',
            onTop: '0',
            endDate: '20210531',
            statusId: '',
            verifyUserId: '',
            verifyTime: '',
            verifyMemo: '',
            releaseStatusId: '',
            releaseUserId: '',
            releaseTime: '',
            offShelf: '',
            offTime: '',
            offReason: '',
            offUserId: '',
            editTime: '',
            specialList: ['01', '03'],
            workStreetList: ['0501', '0502']
          }
        ]
      }
    };
  }
);

//查询招聘会职位明细信息
Mock.mock(
  basePath + '/person/meeting/queryCorporationPositionInfo',
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: {
          positionId: 4,
          positionCode: '20213000000004',
          positionName: '中级审计师',
          recruitType: '1',
          tranBaseSymbol: '0',
          tranPositionCode: '',
          tranCorpId: '',
          tranCorpName: '',
          agencyRecruit: '0',
          entrustTyshxym: '',
          entrustCorpName: '',
          corpId: '200008010049481',
          positionType: '10  ',
          workNature: '01',
          ageMax: 40,
          ageMin: 20,
          workArea: '05',
          workAddress: '福禄娃路999号',
          workHour: '005',
          workYearNeed: '04',
          eduRequire: '07',
          salaryMax: 99999,
          salaryMin: 50000,
          salaryPayType: '04',
          recruitNum: 5,
          special: '',
          describe:
            '初级审计师，要厉害的那种。\n有建筑工程项目审计经验的优先。\n熟悉建筑工程法律法规的优先。',
          workStreet: '0501',
          onTop: '0',
          endDate: '20210531',
          statusId: '',
          verifyUserId: '',
          verifyTime: '',
          verifyMemo: '',
          releaseStatusId: '2',
          releaseUserId: '0001564639',
          releaseTime: '2021-05-20 18:16:04',
          offShelf: '0',
          offTime: '',
          offReason: '',
          offUserId: '',
          editTime: '',
          specialList: [],
          workStreetList: ['0501']
        }
      }
    };
  }
);

//个人投递招聘会下的职位
Mock.mock(basePath + '/person/meeting/doApplyFor', 'post', function(options) {
  return successData;
});

export default Mock;
