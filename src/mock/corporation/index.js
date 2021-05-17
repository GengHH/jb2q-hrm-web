/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-17 17:37:08
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\corporation\index.js
 */

import Mock from 'mockjs';
import config from '../../config/mock.conf';
import '../commonMock';

const basePath = config.corpBasePath;
/**
 * 通用的测试通过返回的结果
 */
const successData = {
  status: 200,
  message: '',
  result: {}
};

/**
 * 查询单位的基本信息
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
        industryType: '02',
        tranBaseSymbol: '0',
        humanResourceReg: '0',
        keypointCorp: '0',
        specialCorp: '0',
        entrustStatus: '0',
        entrustValid: '2020-12-08 15:57:25',
        frozen: '0',
        districtCode: '01',
        introduce:
          '自动化设备开发、制造（限分支）、销售、技术服务。 【依法须经批准的项目，经相关部门批准后方可开展经营活动】',
        contactAddress: '中江路889号804室',
        contactPhone: '13764565977',
        specific: '1',
        corpNature: '02',
        //statusId: '1',
        recruitChargeName: 'test',
        recruitChargePhone: '13322114512',
        recruitStaffName1: '刘德坡',
        recruitStaffPhone1: '13764565977',
        recruitStaffName2: '刘德坡',
        recruitStaffPhone2: '13764565977',
        logo: '',
        publicityMovie: '',
        statusId: '1',
        resumeSearch: '1',
        searchTotal: 30,
        resumeDownload: '1',
        downloadTotal: '',
        resumeFavor: '1',
        favorTotal: 50,
        indexRec: '0',
        viewTotal: 100,
        updateOperator: '0000309307',
        updateTime: '2021-04-01 13:37:08'
      }
    }
  };
};

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
        userId: '',
        userIdStr: '0000785243',
        userName: 'srg',
        loginName: '6030@XY91310000631291289X',
        userType: '01',
        organId: '',
        organIdStr: '200008010546251',
        organName: '上海市数字证书认证中心有限公司',
        organType: '',
        domainId: 1,
        domainIdStr: '',
        domainName: '',
        roleKey: 'SC:R:1_c81e728d9d4c2f636f067f89cc14862c',
        userKey:
          '384e86e36b7a8fb4d3e700c2a177e39ceba04f93d9d5684c3dd569074a2d7c17',
        expire: -1,
        extInfo: {
          sessionId: 'bd369ffc-96c1-11eb-af7f-005056896dc3',
          logid: '',
          userType: '01',
          userId: '0000785243',
          userName: 'srg',
          userPhone: '11111111111',
          loginName: '6030@XY91310000631291289X',
          userKey: '111111111111111111',
          organId: '200008010546251',
          organCode: '00051499',
          organName: '上海市数字证书认证中心有限公司',
          organType: '159',
          organStatus: '',
          deptId: '',
          deptCode: '',
          deptType: '40',
          deptName: '上海市数字证书认证中心有限公司',
          districtCode: '09',
          districtName: '虹口',
          streetCode: '',
          streetName: '',
          communityCode: '',
          communityName: '',
          loginCaType: '01',
          cookieToken: '',
          pid: '',
          deviceSN: '',
          sfbz: '200008010546251',
          passBySb: true,
          yxbz: '1',
          sbdwmc: '',
          tyshxym: ''
        },
        areaInfo: {
          areaCode: '09',
          areaCode1: '',
          areaCode2: '200008010546251',
          areaCode3: '',
          areaCode4: '',
          areaCode5: '',
          areaCode6: '',
          areaName: '虹口',
          areaName1: '',
          areaName2: '上海市数字证书认证中心有限公司',
          areaName3: '',
          areaName4: '',
          areaName5: '',
          areaName6: ''
        },
        roles: [
          {
            roleId: '2',
            roleName: '普通角色'
          }
        ],
        readOnly: false,
        userIdKey: '0000785243',
        domainIdKey: '1',
        organIdKey: '200008010546251'
      }
    }
  };
});

//检验该单位是不是首次进入系统( data: true 非首次， data: false 首次)
Mock.mock(RegExp(basePath + '/corp/info/isCorpInit' + '.*'), 'get', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      data: true,
      humanResourceReg: false,
      tranBaseSymbol: false,
      entrustValid: false,
      keypointCorp: false,
      specialCorp: false,
      entrustStatus: false
    }
  };
});
//获取单位基本信息
Mock.mock(RegExp(basePath + '/corp/info/loadCorpInfo' + '.*'), 'get', function(
  options
) {
  return getCorpbaseInfo(options);
});
//修改单位基本信息
Mock.mock(basePath + '/corp/info/saveCorpInfo', 'post', function(options) {
  return successData;
});
//变更转移区申请
Mock.mock(basePath + '/corp/info/updateDistrictCode', 'post', function(
  options
) {
  return successData;
});
//保存职位信息
Mock.mock(basePath + '/corp/position/save', 'post', function(options) {
  return successData;
});
//首次发布职位信息
Mock.mock(basePath + '/corp/position/release', 'post', function(options) {
  return successData;
});

//查询各种类型（下架等）的单位职位信息
Mock.mock(basePath + '/corp/position/find', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        'total|1-10': 1,
        'data|1-10': [
          {
            positionId: '@string("number", 1)',
            editId: '', // '@datetime'
            positionCode: '123123',
            positionName: 'JAVA超高级工程师',
            workAddress: '上海市普陀区中江路889号804室',
            salaryScope: '20-50(04)',
            'statusId|+1': ['1', '2', '3'],
            describe: ''
          }
        ]
      })
    }
  };
});
//查询各种类型（下架等）的单位职位信息
Mock.mock(basePath + '/corp/position/detail', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      data: {
        editId: '',
        positionId: 15,
        positionCode: '2021null00000009',
        positionName: '职位名称',
        recruitType: '1',
        tranBaseSymbol: '0',
        agencyRecruit: '0',
        entrustTyshxym: '',
        entrustCorpName: '',
        corpId: '200008010546251',
        positionType: '1   ',
        workNature: '01',
        ageMax: 40,
        ageMin: 20,
        workArea: '01',
        workAddress: '上海市长宁区天山路100号',
        workHour: '',
        workYearNeed: '03',
        eduRequire: '07',
        salaryMax: 90000,
        salaryMin: 30000,
        salaryPayType: '',
        recruitNum: 10,
        special: '01,02,03',
        describe: '职位描述',
        workStreet: '01,02',
        onTop: '0',
        endDate: '20210605',
        statusId: '',
        verifyUserId: '',
        verifyTime: '',
        verifyMemo: '',
        releaseStatusId: '2',
        releaseUserId: '-1        ',
        releaseTime: '2021-05-06 10:31:51',
        offShelf: '0',
        offTime: '',
        offReason: '',
        offUserId: '',
        specialList: ['01', '02', '03'],
        workStreetList: ['0101', '0102']
      }
    }
  };
});
// 删除职位信息
Mock.mock(basePath + '/corp/position/delete', 'post', function(options) {
  return successData;
});
// 置顶职位信息
Mock.mock(basePath + '/corp/position/top', 'post', function(options) {
  return successData;
});
// 下架职位信息
Mock.mock(basePath + '/corp/position/off', 'post', function(options) {
  return successData;
});
// 重新发布职位
Mock.mock(basePath + '/corp/position/released-again', 'post', function(
  options
) {
  return successData;
});

//获取已经收到的简历信息
Mock.mock(basePath + '/corp/manage/find/receive', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        'total|1-10': 1,
        'data|1-10': [
          {
            applyforId: '@string("number", 1)',
            'workYear|1': ['01', '02', '03', '04', '05', '06'],
            pid: '200008000009380',
            xm: '张秀定',
            positionName: '前端开发工程师',
            tranBaseSymbol: '0',
            age: 18,
            'eduLevel|1': ['01', '02', '03', '04', '05', '06'],
            collegesName: '',
            createTime: '2021-04-30 18:04:07',
            'reply|1': ['0', '1'],
            reason: '123412341234123szdasdASDasdsafasdfggsadggdasgfas4',
            noticeInterview: '2021-05-10 20:51:02',
            interviewDate: '20210809',
            interviewTime: '130000',
            interviewContactName: '福禄娃',
            interviewContactPhone: '18536251258',
            interviewAddress: '面试地址',
            interviewRemarks: '面试备注',
            reportDate: '',
            reportTime: '',
            reportContactName: '',
            reportContactPhone: '',
            reportAddress: '',
            reportRemarks: '',
            'evaluationLevel|1': [0, 1, 2, 3, 4, 5],
            evaluationContent: '评价内容',
            evaluationTime: '2021-05-10 18:08:07',
            birthDate: '19370929',
            'notReadCount|1': ['0', '1', '2', '13', '4', '125', '99']
            //actions: ['action1']
          }
        ]
      })
    }
  };
});

//获取已经收到的简历详细信息
Mock.mock(basePath + '/corp/manage/resume/detail', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      data: {
        applyforId: 1,
        resumeId: 6,
        positionId: 6,
        source: '01',
        pid: '200008000009380',
        zjlxId: '01',
        zjhm: '310111193709290027',
        xm: '张秀定',
        sexId: '2',
        salaryMax: 99999,
        salaryMin: 50000,
        workNature: '01',
        likeArea: '00',
        evaluate: 'jcjcjcjcjc',
        verifyUserId: '',
        verifyTime: '',
        verifyResult: '',
        verifyMemo: '',
        recId: '',
        meetId: '',
        createTime: '2021-04-30 18:04:07',
        feedbackStatus: '03',
        feedbackTime: '2021-05-10 14:56:28',
        feedbackSource: '1',
        reply: '',
        reason: '',
        noticeInterview: '',
        interviewDate: '',
        interviewTime: '',
        interviewContactName: '',
        interviewContactPhone: '',
        interviewAddress: '',
        interviewRemarks: '',
        reportDate: '',
        reportTime: '',
        reportContactName: '',
        reportContactPhone: '',
        reportAddress: '',
        reportRemarks: '',
        evaluationLevel: '',
        evaluationContent: '',
        evaluationTime: '',
        eduExp: [
          {
            applyforEduId: 21,
            applyforId: 1,
            pid: '200709138518590',
            collegesName: '东华大学',
            majorName: '软件工程',
            eduLevel: '07',
            admissionDate: '20040901',
            graduateDate: '20080630',
            certNum: '',
            sourceOuter: ''
          },
          {
            applyforEduId: 22,
            applyforId: 1,
            pid: '200709138518590',
            collegesName: '东华大学',
            majorName: '软件工程',
            eduLevel: '07',
            admissionDate: '20040901',
            graduateDate: '20080630',
            certNum: '',
            sourceOuter: ''
          },
          {
            applyforEduId: 2,
            applyforId: 1,
            pid: '200008000009380',
            collegesName: 'jkcxjjc',
            majorName: 'xxx',
            eduLevel: '02',
            admissionDate: '20210331',
            graduateDate: '20210415',
            certNum: '',
            sourceOuter: ''
          },
          {
            applyforEduId: 3,
            applyforId: 1,
            pid: '200008000009380',
            collegesName: 'jkcxjjcxxx',
            majorName: 'xxxvv',
            eduLevel: '02',
            admissionDate: '20210331',
            graduateDate: '20210415',
            certNum: '',
            sourceOuter: ''
          }
        ],
        laborExp: [
          {
            applyforExpId: 22,
            applyforId: 1,
            pid: '200709138518590',
            corpName: '万达信息股份有限公司',
            positionName: '测试',
            entryDate: '20090701',
            quitDate: '20210425',
            workDescribe: '软件开发，项目管理'
          },
          {
            applyforExpId: 23,
            applyforId: 1,
            pid: '200709138518590',
            corpName: '万达信息股份有限公司',
            positionName: '测试',
            entryDate: '20090701',
            quitDate: '20210425',
            workDescribe: '软件开发，项目管理'
          },
          {
            applyforExpId: 2,
            applyforId: 1,
            pid: '200008000009380',
            corpName: 'djdjjd',
            positionName: 'lkzxlkz',
            entryDate: '20210405',
            quitDate: '20210408',
            workDescribe: 'jcjcjcjjc'
          }
        ],
        psnlLanguage: [
          {
            applyforLanguageId: 11,
            applyforId: 1,
            pid: '200008000009380',
            languageType: '02',
            languageLevel: '2'
          },
          {
            applyforLanguageId: 12,
            applyforId: 1,
            pid: '200008000009380',
            languageType: '03',
            languageLevel: '2'
          }
        ],
        psnlSkillcert: [
          {
            applyforCertId: 1,
            applyforId: 1,
            pid: '200709138518590',
            certName: '电工',
            certLevel: '初级',
            receiveTime: '202101'
          },
          {
            applyforCertId: 2,
            applyforId: 1,
            pid: '200709138518590',
            certName: '车工',
            certLevel: '高级',
            receiveTime: '202101'
          },
          {
            applyforCertId: 21,
            applyforId: 1,
            pid: '200709138518590',
            certName: '电工',
            certLevel: '初级',
            receiveTime: '202101'
          },
          {
            applyforCertId: 22,
            applyforId: 1,
            pid: '200709138518590',
            certName: '车工',
            certLevel: '高级',
            receiveTime: '202101'
          },
          {
            applyforCertId: 23,
            applyforId: 1,
            pid: '200709138518590',
            certName: '电工',
            certLevel: '初级',
            receiveTime: '202101'
          },
          {
            applyforCertId: 24,
            applyforId: 1,
            pid: '200709138518590',
            certName: '车工',
            certLevel: '高级',
            receiveTime: '202101'
          },
          {
            applyforCertId: 3,
            applyforId: 1,
            pid: '200008000009380',
            certName: 'drfeww',
            certLevel: 'ccc',
            receiveTime: '202102'
          },
          {
            applyforCertId: 4,
            applyforId: 1,
            pid: '200008000009380',
            certName: 'drfewwggbb',
            certLevel: 'ccccccc',
            receiveTime: '202107'
          }
        ],
        positionApplyforDataList: [
          {
            applyforLikeId: '',
            applyforId: 1,
            pid: '200709138518590',
            likeType: '',
            likeTarget: ''
          },
          {
            applyforLikeId: '',
            applyforId: 1,
            pid: '200709138518590',
            likeType: '',
            likeTarget: ''
          },
          {
            applyforLikeId: '',
            applyforId: 1,
            pid: '200008000009380',
            likeType: '',
            likeTarget: ''
          }
        ]
      }
    }
  };
});
// 单位反馈
Mock.mock(basePath + '/corp/manage/feedBack', 'post', function(options) {
  return successData;
});

/*********招聘会**********/
// 查询招聘会list
Mock.mock(basePath + '/corp/meeting/find/listk', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: {
        total: 3,
        data: [
          {
            meetId: '3',
            meetName: '招聘会名称测试12222',
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
            propagandaImage: 'MQ==',
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
            propagandaImage: 'MQ==',
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
// 招聘会职位信息
Mock.mock(basePath + '/corp/meeting/find/positionInfo', 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      data: [
        {
          positionId: '13',
          positionName: '职位名称'
        },
        {
          positionId: '16',
          positionName: '职位名称'
        },
        {
          positionId: '21',
          positionName: '职位名称'
        },
        {
          positionId: '22',
          positionName: 'CEO'
        },
        {
          positionId: '23',
          positionName: 'CEO'
        },
        {
          positionId: '33',
          positionName: 'test2'
        },
        {
          positionId: '12',
          positionName: '职位名称'
        },
        {
          positionId: '18',
          positionName: '职位名称'
        },
        {
          positionId: '19',
          positionName: '职位名称'
        },
        {
          positionId: '20',
          positionName: '职位名称'
        },
        {
          positionId: '14',
          positionName: '职位名称'
        },
        {
          positionId: '15',
          positionName: '职位名称'
        },
        {
          positionId: '17',
          positionName: '职位名称'
        }
      ]
    }
  };
});
// 报名招聘会
Mock.mock(basePath + '/corp/meeting/save', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      data: {
        result: true,
        msg: '已报名！'
      }
    }
  };
});

export default Mock;
