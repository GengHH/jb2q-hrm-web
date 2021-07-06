/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-06 15:47:16
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
        logoBase64:
          'PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTMwNC4xMjggNDU2LjE5MmM0OC42NCAwIDg4LjA2NC0zOS40MjQgODguMDY0LTg4LjA2NHMtMzkuNDI0LTg4LjA2NC04OC4wNjQtODguMDY0LTg4LjA2NCAzOS40MjQtODguMDY0IDg4LjA2NCAzOS40MjQgODguMDY0IDg4LjA2NCA4OC4wNjR6bTAtMTE2LjIyNGMxNS4zNiAwIDI4LjE2IDEyLjI4OCAyOC4xNiAyOC4xNnMtMTIuMjg4IDI4LjE2LTI4LjE2IDI4LjE2LTI4LjE2LTEyLjI4OC0yOC4xNi0yOC4xNiAxMi4yODgtMjguMTYgMjguMTYtMjguMTZ6IiBmaWxsPSIjZTZlNmU2Ii8+PHBhdGggZD0iTTg4Ny4yOTYgMTU5Ljc0NEgxMzYuNzA0Qzk2Ljc2OCAxNTkuNzQ0IDY0IDE5MiA2NCAyMzIuNDQ4djU1OS4xMDRjMCAzOS45MzYgMzIuMjU2IDcyLjcwNCA3Mi43MDQgNzIuNzA0aDE5OC4xNDRMNTAwLjIyNCA2ODguNjRsLTM2LjM1Mi0yMjIuNzIgMTYyLjMwNC0xMzAuNTYtNjEuNDQgMTQzLjg3MiA5Mi42NzIgMjE0LjAxNi0xMDUuNDcyIDE3MS4wMDhoMzM1LjM2QzkyNy4yMzIgODY0LjI1NiA5NjAgODMyIDk2MCA3OTEuNTUyVjIzMi40NDhjMC0zOS45MzYtMzIuMjU2LTcyLjcwNC03Mi43MDQtNzIuNzA0em0tMTM4Ljc1MiA3MS42OHYuNTEySDg1Ny42YzE2LjM4NCAwIDMwLjIwOCAxMy4zMTIgMzAuMjA4IDMwLjIwOHYzOTkuODcyTDY3My4yOCA0MDguMDY0bDc1LjI2NC0xNzYuNjR6TTMwNC42NCA3OTIuMDY0SDE2NS44ODhjLTE2LjM4NCAwLTMwLjIwOC0xMy4zMTItMzAuMjA4LTMwLjIwOHYtOS43MjhsMTM4Ljc1Mi0xNjQuMzUyIDEwNC45NiAxMjQuNDE2LTc0Ljc1MiA3OS44NzJ6bTgxLjkyLTM1NS44NGwzNy4zNzYgMjI4Ljg2NC0uNTEyLjUxMi0xNDIuODQ4LTE2OS45ODRjLTMuMDcyLTMuNTg0LTkuMjE2LTMuNTg0LTEyLjI4OCAwTDEzNS42OCA2NTIuOFYyNjIuMTQ0YzAtMTYuMzg0IDEzLjMxMi0zMC4yMDggMzAuMjA4LTMwLjIwOGg0NzQuNjI0TDM4Ni41NiA0MzYuMjI0em01MDEuMjQ4IDMyNS42MzJjMCAxNi44OTYtMTMuMzEyIDMwLjIwOC0yOS42OTYgMzAuMjA4SDY4MC45Nmw1Ny4zNDQtOTMuMTg0LTg3LjU1Mi0yMDIuMjQgNy4xNjgtNy42OCAyMjkuODg4IDI3Mi44OTZ6IiBmaWxsPSIjZTZlNmU2Ii8+PC9zdmc+',
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
//查询各种类型（下架等）的单位职位信息用于编辑后重新发布
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
        // positionTypeOne: '01',
        positionType: '0510',
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
        workStreetList: ['0101', '0102'],
        isComplaint: true
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
            'source|1': ['01', '04'],
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

//获取已经收藏的简历列表
Mock.mock(basePath + '/corp/resume/findFavorList', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        'total|1-10': 1,
        'data|1-10': [
          {
            favorId: '@string("number", 1)',
            resumeId: '@string("number", 5)',
            pid: '40',
            xm: 'GHH',
            age: 28,
            eduLevel: '02',
            workYear: '1',
            positionName: '先最接',
            updateTime: '2010-02-01 09:29:02',
            loginTime: '1979-06-07 21:47:52',
            favorStartTime: '1988-10-08 15:26:01',
            birthDate: '2008-03-22',
            positionList: [
              'est culpa',
              'eu',
              'dolore laboris fugiat Excepteur dolor',
              'id et',
              'sunt minim'
            ]
          }
        ]
      })
    }
  };
});

/*********招聘会**********/
// 查询招聘会list
Mock.mock(basePath + '/corp/meeting/find/list', 'post', function(options) {
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
            contactPhone: '123123122312', //data:image/jpg;base64,
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
          positionName: '职位名称',
          endDate: '20200630'
        },
        {
          positionId: '16',
          positionName: '职位名称',
          endDate: '20210424'
        },
        {
          positionId: '21',
          positionName: '职位名称',
          endDate: '20210425'
        },
        {
          positionId: '22',
          positionName: 'CEO',
          endDate: '20210426'
        },
        {
          positionId: '23',
          positionName: 'CEO',
          endDate: '20210630'
        },
        {
          positionId: '33',
          positionName: 'test2',
          endDate: '20210630'
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

//获取已经收到的简历信息
Mock.mock(basePath + '/corp/meeting/find/resume', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        'total|1-10': 1,
        'data|1-10': [
          {
            meetName: '测试',
            applyforId: '@string("number", 1)',
            pid: '200709138518590',
            xm: '张三',
            positionName: '软件开发',
            age: 36,
            createTime: '2021-05-20 17:48:46',
            'notReadCount|1': ['0', '1', '2', '13', '4', '125', '99']
          }
        ]
      })
    }
  };
});
//查询招聘会反馈结果
Mock.mock(basePath + '/corp/signup/query', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        'total|1-10': 1,
        'data|1-10': [
          {
            meetId: '@string("number", 1)',
            applyId: '1',
            meetName: '上海市浦东电工职业招聘会',
            meetType: '2',
            corpName: '丽颖传媒有限公司',
            applyContactName: '赵丽颖',
            applyContactPhone: '13512112112',
            memo: 'emm',
            applyTime: '2021-04-13 00:00:00',
            feedbackTime: '2021-04-13 00:00:00',
            'applyResult|1': ['', '0', '1'],
            applyMemo: '123412341'
          }
        ]
      })
    }
  };
});
//简历搜素
Mock.mock(basePath + '/corp/resume/find', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageresult: Mock.mock({
        'total|1-10': 1,
        'data|1-10': [
          {
            resumeId: '@string("number", 1)',
            pid: '200507136765230',
            xm: '王强',
            positionName:
              '销售主管|客户经理、主管|区域销售经理、主管|业务拓展(BD)经理',
            industryName: '互联网/电子商务',
            workYear: '',
            age: 38,
            salaryMax: 5000,
            salaryMin: 3000,
            workNature: '01',
            workArea: '00',
            updateTime: '2021-05-06 09:37:44',
            loginTime: '2021-05-06 09:37:44',
            'favor|1': [false, true],
            positionList: ['0103', '0104', '0105', '0107'],
            industryList: ['04'],
            birthDate: '19821125',
            eduLevel: '03'
          }
        ]
      })
    }
  };
});
/****在线开店****/
Mock.mock(basePath + '/corp/shop/query/list', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      data: [
        {
          applyId: 3,
          cid: '200008010001941',
          corpName: '上海市客运轮船有限公司',
          tyshxydm: '91310113133445783N',
          applyDistrict: '05',
          contactName: '李小姐',
          contactPhone: '15921900607',
          applyMemo: '申请开店',
          applyUserId: '0001564801',
          applyTime: '2021-06-02 14:03:57',
          verifyUserId: '0000002039',
          verifyResult: '0',
          verifyTime: '2021-06-02 13:59:04',
          verifyMemo: '不同意',
          channelNo: '',
          deleteStatus: '',
          deleteTime: '',
          deleteUserId: '',
          deleteMemo: ''
        }
        // {
        //   applyId: 1,
        //   cid: '200008010784151',
        //   corpName: '万达信息股份有限公司',
        //   tyshxydm: '91310000132653687M',
        //   contactName: '福禄娃一号',
        //   contactPhone: '18321460953',
        //   applyMemo: '其他说明',
        //   applyUserId: '0001564698',
        //   applyTime: '2021-05-20 17:49:45',
        //   verifyUserId: '0001564698',
        //   verifyResult: '',
        //   verifyTime: '2021-05-21 13:33:43',
        //   verifyMemo: '测试',
        //   channelNo: '',
        //   deleteStatus: '1',
        //   deleteTime: '',
        //   deleteUserId: '',
        //   deleteMemo: ''
        // },
        // {
        //   applyId: 1,
        //   cid: '200008010784151',
        //   corpName: '万达信息股份有限公司',
        //   tyshxydm: '91310000132653687M',
        //   contactName: '福禄娃一号',
        //   contactPhone: '18321460953',
        //   applyMemo: '其他说明',
        //   applyUserId: '0001564698',
        //   applyTime: '2021-05-20 17:49:45',
        //   verifyUserId: '0001564698',
        //   verifyResult: '',
        //   verifyTime: '2021-05-21 13:33:43',
        //   verifyMemo: '测试',
        //   channelNo: '',
        //   deleteStatus: '1',
        //   deleteTime: '',
        //   deleteUserId: '',
        //   deleteMemo: ''
        // }
      ]
    }
  };
});

Mock.mock(basePath + '/corp/shop/save', 'post', function(options) {
  return successData;
});

Mock.mock(basePath + '/corp/shop/update', 'post', function(options) {
  return successData;
});

Mock.mock(basePath + '/corp/shop/delete', 'post', function(options) {
  return successData;
});

//查询就业见习职位列表

Mock.mock(
  basePath + '/corp/position/query-jyjxJdInfo-positionPublishing',
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: {
          pageSize: 10,
          pageIndex: 0,
          total: 1,
          summary: {
            total: 1
          },
          data: [
            {
              jdlx: '2',
              jdmc: '上海庆圆投资有限公司',
              jdbh: '2017D10232',
              isTrial: '0',
              dwlx: '有限责任公司(自然人投资或控股)',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [
                {
                  dwmc: '上海兴国宾馆',
                  cid: '200101010041021',
                  positionDataList: [
                    {
                      gwbh: '1912023415',
                      positionId: '',
                      gwbm: '酒店管理专员',
                      gwzs: '5',
                      zgrs: '0',
                      isHiring: '',
                      zprs: '5'
                    }
                  ]
                },
                {
                  dwmc: '上海噢开新媒体科技有限公司',
                  cid: '201911273972621',
                  positionDataList: []
                },
                {
                  dwmc: '上海艾佩克文化传播有限公司',
                  cid: '201911213957661',
                  positionDataList: []
                },
                {
                  dwmc: '上海志松国际物流有限公司',
                  cid: '201807102259781',
                  positionDataList: []
                },
                {
                  dwmc: '上海大自鸣钟房地产开发有限公司',
                  cid: '201306287885951',
                  positionDataList: []
                },
                {
                  dwmc: '上海东冠通信建设有限公司',
                  cid: '200301230676591',
                  positionDataList: []
                },
                {
                  dwmc: '上海易贝电脑科技有限公司',
                  cid: '200008010717921',
                  positionDataList: []
                },
                {
                  dwmc: '柏佩欧（上海）网络科技有限公司',
                  cid: '201411198943321',
                  positionDataList: []
                },
                {
                  dwmc: '上海通政通讯科技发展有限公司',
                  cid: '200404191224741',
                  positionDataList: []
                },
                {
                  dwmc: '上海松江民生村镇银行股份有限公司',
                  cid: '201003045656911',
                  positionDataList: []
                },
                {
                  dwmc: '上海全满国际商贸有限公司',
                  cid: '201511059702591',
                  positionDataList: []
                },
                {
                  dwmc: '上海天保健康管理有限公司',
                  cid: '202006054529171',
                  positionDataList: []
                },
                {
                  dwmc: '上海弓迈新材料科技有限公司',
                  cid: '201808222407331',
                  positionDataList: []
                },
                {
                  dwmc: '上海皇桥教育科技有限公司',
                  cid: '201603240056971',
                  positionDataList: []
                },
                {
                  dwmc: '上海大新华运通国际旅行社有限公司',
                  cid: '200511082606411',
                  positionDataList: []
                },
                {
                  dwmc: '宁波革力物流有限公司上海分公司',
                  cid: '201912053977291',
                  positionDataList: []
                },
                {
                  dwmc: '耀沃生物科技（上海）有限公司',
                  cid: '202008114813891',
                  positionDataList: []
                },
                {
                  dwmc: '上海昱仪网络科技有限公司',
                  cid: '201908063609651',
                  positionDataList: []
                },
                {
                  dwmc: '臻惠网络科技（上海）有限公司',
                  cid: '201412199017361',
                  positionDataList: []
                },
                {
                  dwmc: '上海细流文化传媒有限公司',
                  cid: '201903083106921',
                  positionDataList: []
                },
                {
                  dwmc: '上海沐丞教育科技有限公司',
                  cid: '201803151920921',
                  positionDataList: []
                },
                {
                  dwmc: '上海瑾缘商务咨询有限公司',
                  cid: '201901172963991',
                  positionDataList: []
                },
                {
                  dwmc: '上海绪飞工程项目管理有限公司',
                  cid: '201709081428491',
                  positionDataList: []
                },
                {
                  dwmc: '上海瑾拓企业管理咨询有限公司',
                  cid: '201701060778481',
                  positionDataList: []
                },
                {
                  dwmc: '不老莓（上海）商务服务有限公司',
                  cid: '202004074282951',
                  positionDataList: []
                },
                {
                  dwmc: '上海满好日用品有限公司',
                  cid: '200008010435071',
                  positionDataList: []
                },
                {
                  dwmc: '上海昊海生物科技股份有限公司',
                  cid: '200706283778501',
                  positionDataList: []
                },
                {
                  dwmc: '上海亚盛汽车销售服务有限公司',
                  cid: '201204097053341',
                  positionDataList: []
                },
                {
                  dwmc: '上海超越汽车销售服务有限公司',
                  cid: '200908315380011',
                  positionDataList: []
                },
                {
                  dwmc: '上海珏趣文化传播有限公司',
                  cid: '201908083625211',
                  positionDataList: []
                },
                {
                  dwmc: '文兮（上海）广告文化传播有限责任公司',
                  cid: '201908143644481',
                  positionDataList: []
                },
                {
                  dwmc: '上海隆古建筑装饰工程有限公司',
                  cid: '200408111446881',
                  positionDataList: []
                },
                {
                  dwmc: '上海润迅商凯电话商务有限公司',
                  cid: '201012176187051',
                  positionDataList: []
                },
                {
                  dwmc: '上海希映文化传播有限公司',
                  cid: '201602059915761',
                  positionDataList: []
                },
                {
                  dwmc: '上海俊儒文化传媒有限公司',
                  cid: '201802231842961',
                  positionDataList: []
                },
                {
                  dwmc: '上海昉晅电子商务有限公司',
                  cid: '201911083899961',
                  positionDataList: []
                },
                {
                  dwmc: '上海露森信息科技有限公司',
                  cid: '202008104808981',
                  positionDataList: []
                },
                {
                  dwmc: '富悦（上海）酒店管理有限公司',
                  cid: '201509239619811',
                  positionDataList: []
                },
                {
                  dwmc: '上海沪腾文化传媒有限公司',
                  cid: '201909253799051',
                  positionDataList: []
                },
                {
                  dwmc: '上海漠狐信息科技有限公司',
                  cid: '201909243787961',
                  positionDataList: []
                },
                {
                  dwmc: '上海蔚宁实业有限公司',
                  cid: '201809062439841',
                  positionDataList: []
                },
                {
                  dwmc: '上海劲橙商贸有限公司',
                  cid: '201804262052271',
                  positionDataList: []
                },
                {
                  dwmc: '上海慧卡智贸易有限公司',
                  cid: '201903263191501',
                  positionDataList: []
                },
                {
                  dwmc: '群思科技（北京）有限公司上海分公司',
                  cid: '201408138728501',
                  positionDataList: []
                },
                {
                  dwmc: '瑞必科净化设备（上海）有限公司',
                  cid: '200806034641361',
                  positionDataList: []
                },
                {
                  dwmc: '仕程卫教信息科技（上海）有限公司',
                  cid: '201710191531001',
                  positionDataList: []
                },
                {
                  dwmc: '上海仁彩印务有限公司',
                  cid: '200212040611971',
                  positionDataList: []
                },
                {
                  dwmc: '上海佰程建设项目管理有限公司',
                  cid: '201806142196351',
                  positionDataList: []
                },
                {
                  dwmc: '上海竹源水业有限公司',
                  cid: '201909203774341',
                  positionDataList: []
                },
                {
                  dwmc: '上海清赞数据科技有限公司',
                  cid: '201808162382801',
                  positionDataList: []
                },
                {
                  dwmc: '上海冉逊环境科技有限公司',
                  cid: '201710091493731',
                  positionDataList: []
                },
                {
                  dwmc: '上海捷鹰实业发展有限公司',
                  cid: '200801084327271',
                  positionDataList: []
                },
                {
                  dwmc: '上海天莫企业咨询服务有限公司',
                  cid: '201702090842281',
                  positionDataList: []
                },
                {
                  dwmc: '上海铂立营销策划有限公司',
                  cid: '201007205912181',
                  positionDataList: []
                },
                {
                  dwmc: '上海松江区博音雅艺文化艺术专修学校',
                  cid: '201903263190461',
                  positionDataList: []
                },
                {
                  dwmc: '上海启跳体育管理咨询有限公司',
                  cid: '201609140517621',
                  positionDataList: []
                },
                {
                  dwmc: '上海松江开天教育培训中心',
                  cid: '201804192025821',
                  positionDataList: []
                },
                {
                  dwmc: '伍之舍（上海）文化传播有限公司',
                  cid: '201611250694211',
                  positionDataList: []
                },
                {
                  dwmc: '上海东联北松汽车销售服务有限公司',
                  cid: '201302167611391',
                  positionDataList: []
                },
                {
                  dwmc: '上海东联松奥汽车销售服务有限公司',
                  cid: '201207237251111',
                  positionDataList: []
                },
                {
                  dwmc: '上海徐汇区成功管理进修学校',
                  cid: '201009085999581',
                  positionDataList: []
                },
                {
                  dwmc: '上海先丰工程建设发展有限公司',
                  cid: '200707133804821',
                  positionDataList: []
                },
                {
                  dwmc: '上海庆圆投资有限公司',
                  cid: '201005125781301',
                  positionDataList: []
                },
                {
                  dwmc: '上海云集培训学校有限公司',
                  cid: '202003164219801',
                  positionDataList: []
                },
                {
                  dwmc: '上海小玖影视传媒有限公司',
                  cid: '202006194605711',
                  positionDataList: []
                },
                {
                  dwmc: '上海龙之梦酒店管理有限公司龙之梦万丽酒店',
                  cid: '200710114013851',
                  positionDataList: []
                },
                {
                  dwmc: '上海优游国际旅行社有限公司',
                  cid: '200908195364601',
                  positionDataList: []
                },
                {
                  dwmc: '上海振渠腾通信科技发展有限公司',
                  cid: '200709073913651',
                  positionDataList: []
                },
                {
                  dwmc: '上海禾燕实业有限公司',
                  cid: '201408228753651',
                  positionDataList: []
                }
              ],
              positionDataList: []
            }
          ],
          size: 1,
          pageCount: 1
        }
      }
    };
  }
);

const resumeMockData = function(req) {
  return {
    status: 200,
    message: '',
    result: {
      data: {
        applyForId: '',
        resumeId: '1',
        pid: '201906186258910',
        xm: '哈哈哈',
        age: 24,
        sex: '男',
        contactPhone: '13122272095',
        workYear: 0,
        eduLevel: '03',
        eduId: '05',
        livingAddress: '宝山淞南镇新梅松南苑11号楼1201',
        workNature: '01',
        industryLike: '15',
        salaryScope: '10000-50000',
        workArea: '05',
        positionLike: '1501-1502',
        laborExp: [
          {
            expId: '1',
            pid: '',
            corpName: '万达信息股份有限公司',
            positionName: '开发',
            entryDate: '20190611',
            quitDate: '',
            workDescribe: '搬砖'
          },
          {
            expId: '2',
            pid: '',
            corpName: '北京电影学院',
            positionName: '表演',
            entryDate: '20110601',
            quitDate: '20080101',
            workDescribe: '表演\n唱歌\n跳舞'
          }
        ],
        eduExp: [
          {
            eduId: '3',
            pid: '',
            collegesName: '复旦大学',
            majorName: '英语',
            eduLevel: '01',
            admissionDate: '20140910',
            graduateDate: '20180630',
            sourceOuter: '1',
            certNum: ''
          }
        ],
        psnlLanguage: [
          {
            languageId: '1',
            pid: '',
            languageType: '01',
            languageLevel: '1'
          },
          {
            languageId: '2',
            pid: '',
            languageType: '02',
            languageLevel: '2'
          },
          {
            languageId: '3',
            pid: '',
            languageType: '03',
            languageLevel: '3'
          }
        ],
        psnlSkillcert: [
          {
            certId: '1',
            pid: '',
            certName: '信息系统项目管理师证书',
            certLevel: '一级',
            receiveTime: '2020-10-11'
          },
          {
            certId: '2',
            pid: '',
            certName: '计算机二级国家证书',
            certLevel: '二级',
            receiveTime: '2019-05-09'
          },
          {
            certId: '3',
            pid: '',
            certName: 'CISP注册信息安全专业人员',
            certLevel: '三级',
            receiveTime: '2020-01-01'
          },
          {
            certId: '4',
            pid: '',
            certName: '英语专业等级证书',
            certLevel: '六级',
            receiveTime: '2018-09-19'
          }
        ],
        evaluate: '本人就是搬砖厉害！'
      }
    }
  };
};
//获取个人的基本简历信息
Mock.mock(
  RegExp(basePath + '/corp/resume/detail' + '.*'),
  'post',
  resumeMockData
);
//获取个人的基本简历信息
Mock.mock(RegExp(basePath + '/corp/resume/favor'), 'post', function(options) {
  return successData;
});
//根据统一社会信用码获取单位名称
Mock.mock(
  RegExp(basePath + '/corp/position/queryEntrustCorp'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        pageresult: {
          pageSize: 10,
          pageIndex: 0,
          total: 1,
          data: [
            {
              entrustTyshxym: '92310230MA1M55HM8T',
              entrustCorpName: '上海市崇明区珺鑫苗木经营部'
            }
          ],
          size: 1,
          pageCount: 1
        }
      }
    };
  }
);

//邀约时获取职位信息

Mock.mock(
  RegExp(basePath + '/corp/resume/queryPositionListNoPage'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: [
          {
            positionId: 9,
            positionCode: '20211700000009',
            positionName: '文员',
            recruitType: '1',
            tranBaseSymbol: '1',
            tranPositionCode: '2007144038',
            tranCorpId: '200511082606411',
            tranCorpName: '上海大新华运通国际旅行社有限公司',
            agencyRecruit: '0',
            entrustTyshxym: '',
            entrustCorpName: '',
            corpId: '201005125781301',
            positionType: '09  ',
            workNature: '03',
            ageMax: 30,
            ageMin: 20,
            workArea: '05',
            workAddress: '江苏路',
            workHour: '025',
            workYearNeed: '01',
            eduRequire: '05',
            salaryMax: 6000,
            salaryMin: 3000,
            salaryPayType: '04',
            recruitNum: 1,
            special: '',
            describe: '综合类基地，见习岗位测试',
            workStreet: '0502',
            onTop: '0',
            endDate: '20210531',
            statusId: '',
            verifyUserId: '',
            verifyTime: '',
            verifyMemo: '',
            releaseStatusId: '2',
            releaseUserId: '0001564640',
            releaseTime: '2021-05-26 16:31:43',
            offShelf: '0',
            offTime: '',
            offReason: '',
            offUserId: '',
            editTime: '',
            specialList: [],
            workStreetList: ['0502']
          }
        ]
      }
    };
  }
);

//邀约
Mock.mock(RegExp(basePath + '/corp/resume/invite'), 'post', function(options) {
  return successData;
});

/*********用工余缺**********/
Mock.mock(basePath + '/corp/empsurpluslack/surplus/save', 'post', function(
  options
) {
  return successData;
});

Mock.mock(basePath + '/corp/empsurpluslack/lack/save', 'post', function(
  options
) {
  return successData;
});

//单位查询用工缺失申请信息
Mock.mock(
  RegExp(basePath + '/corp/empsurpluslack/lack/query'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        pageresult: {
          pageSize: 10,
          pageIndex: 0,
          total: 1,
          data: [
            {
              contactPhone: '18631735637',
              lackId: 37,
              content: 'quis',
              pageParam: 'anim dolor fugiat do',
              verifyStatus: 'sed incididunt',
              eduRequire: 'veniam tempor',
              positionType: 'sed non dolor',
              dockResult: 'dolor laborum quis non',
              districtCode: '35',
              salaryMax: 43,
              borrowPeriod: 'et ut reprehenderit minim',
              verifyTime: '1987-05-16 16:54:35',
              tyshxym: 'commodo cillum do',
              corpName: '种其委科',
              recruitNum: 20,
              verifyUserId: '95',
              memo: 'veniam cillum culpa cupidatat',
              cid: '38',
              workNature: 'in',
              validDate: '92',
              contactName: '只据体极主边着',
              salaryMin: 99
            }
          ],
          size: 1,
          pageCount: 1
        }
      }
    };
  }
);
//单位查询用工剩余申请信息
Mock.mock(
  RegExp(basePath + '/corp/empsurpluslack/surplus/query'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        pageresult: {
          pageSize: 10,
          pageIndex: 0,
          total: 1,
          data: [
            {
              cid: '24',
              contactName: '改县名统',
              memo: 'laborum nostrud aliquip culpa Ut',
              salaryMin: 100,
              validDate: '7',
              corpName: '特深华原四',
              positionType: 'nostrud irure ullamco dolore',
              content: 'eu sed',
              tyshxym: 'ut dolor',
              pageParam: 'quis',
              lackId: 97,
              verifyTime: '1981-02-16 23:40:28',
              eduRequire: 'consequat laborum mollit',
              verifyUserId: '79',
              salaryMax: 68,
              workNature: 'magna labore aliquip sunt',
              dockResult: 'Ut occaecat voluptate incididunt dolor',
              contactPhone: '18112957344',
              borrowPeriod: 'et quis',
              districtCode: '13',
              recruitNum: 33,
              verifyStatus: 'elit velit'
            }
          ],
          size: 1,
          pageCount: 1
        }
      }
    };
  }
);
export default Mock;
