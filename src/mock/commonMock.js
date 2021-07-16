/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-16 18:13:43
 * @Description: mock拦截公共调用的接口，模拟数据
 * @FilePath: \jb2q-hrm-web\src\mock\commonMock.js
 */

import Mock from 'mockjs';
import dic from './dataDictionary';
import config from '../config/mock.conf';

const basePath = config.commonBasePath;

// Mock.setup({
//   timeout: 1000
// });

const successData = {
  status: 200,
  message: '',
  result: {}
};
//模拟字典表数据(post)
const dicMockDataPost = function(req) {
  //console.log(req);
  const { code } = JSON.parse(req.body);
  //const code = req.body;
  console.log('mock 拦截 dic参数', code);
  if (code) {
    let objArray = code.split('@');
    let key = code.includes('@')
      ? objArray[0] + '_' + objArray[1]
      : objArray[0];·
    return {
      //dicData: dic[code]
      status: 200,
      message: '',
      result: {
        data: JSON.stringify(dic[key])
      }
    };
  }
  return {
    status: 500,
    message: '',
    result: []
  };
};
//模拟字典表数据(get)
const dicMockData = function(options) {
  let url = options.url;
  let params = url.split('?').length > 1 ? url.split('?')[1] : '';
  let code = params.split('=')[1];
  console.log('mock 拦截 dic参数', code);
  if (code) {
    let objArray = code.split('@');
    let key = code.includes('@')
      ? objArray[0] + '_' + objArray[1]
      : objArray[0];
    return {
      status: 200,
      message: '',
      result: {
        data: JSON.stringify(dic[key])
      }
    };
  }
  return {
    status: 500,
    message: '',
    result: []
  };
};

const resumeMockData = function(req) {
  return {
    status: 200,
    message: '',
    result: {
      data: {
        applyForId: '',
        resumeId: '1',
        pid: '201906186258910',
        xm: '董晓鑫',
        age: 24,
        sex: '男',
        contactPhone: '13122272095',
        workYear: 0,
        eduLevel: '03',
        eduId: '05',
        livingAddress: '宝山淞南镇新梅松南苑11号楼1201',
        workNature: '01',
        industryLike: '04-15',
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

//模拟个人简历信息

//获取区县字典表
Mock.mock(basePath + '/common/dic/getQx', 'get', {
  dicData: dic.GGJBXX_QX
});
//获取工作性质字典表
Mock.mock(basePath + '/common/dic/getGzxz', 'get', {
  dicData: dic.RECRUIT_WORK_NATURE
});
//语种字典表
Mock.mock(basePath + '/common/dic/getLanguageType', 'get', {
  dicData: dic.RECRUIT_LANGUAGE_TYPE
});
//语言等级
Mock.mock(basePath + '/common/dic/getLanguageLevel', 'get', {
  dicData: dic.RECRUIT_LANGUAGE_LEVEL
});
//学历
Mock.mock(basePath + '/common/dic/getRecruitEdu', 'get', {
  dicData: dic.RECRUIT_EDU
});
//按需获取需要的字典表
//Mock.mock(RegExp(basePath + '/dic/getDicJson' + '.*'), 'get', dicMockData);
Mock.mock(basePath + '/dic/getDicJson', 'post', dicMockDataPost);

//获取个人的基本简历信息
Mock.mock(
  RegExp(basePath + '/person/resume/loadPsnlResume' + '.*'),
  'get',
  resumeMockData
);
//获取个人的基本简历信息(学信网)
Mock.mock(
  RegExp(basePath + '/person/resume/getEduExpFromChsi'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: [
          {
            eduId: '123',
            pid: '201608111877450',
            collegesName: '东北大学',
            majorName: '通信工程',
            eduLevel: '本科',
            admissionDate: '20120901',
            graduateDate: '20160620',
            sourceOuter: '1',
            certNum: '*'
          },
          {
            eduId: '456',
            pid: '201608111877450',
            collegesName: '山东大学',
            majorName: '通信工程',
            eduLevel: '本科',
            admissionDate: '20120901',
            graduateDate: '20160620',
            sourceOuter: '1',
            certNum: '*'
          }
        ]
      }
    };
  }
);
//获取个人的证书信息(鉴定内网)
Mock.mock(RegExp(basePath + '/common/person/query-certInfo'), 'post', function(
  options
) {
  return {
    status: 200,
    message: '',
    result: {
      data: [
        {
          pid: '201407075117900',
          certId: '201814630428685',
          certName: '电子商务应用',
          certLevel: '高级/三级',
          receiveTime: '20180716'
        },
        {
          pid: '201407075117900',
          certId: '2003000041460272',
          certName: '美容师',
          certLevel: '中级/四级',
          receiveTime: '20200110'
        },
        {
          pid: '201407075117900',
          certId: '1903000260561310',
          certName: '美容师',
          certLevel: '初级/五级',
          receiveTime: '20190812'
        },
        {
          pid: '201407075117900',
          certId: '1903000139960642',
          certName: '创业能力',
          certLevel: '专项能力',
          receiveTime: '20190415'
        },
        {
          pid: '201407075117900',
          certId: '2003000323960137',
          certName: '芳香美容',
          certLevel: '专项能力',
          receiveTime: '20201013'
        }
      ]
    }
  };
});

/************聊天信息**************/
Mock.mock(basePath + '/session/query', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      pageCount: 43,
      total: 67,
      pageIndex: 94,
      summary: {
        total: 57
      },
      pageSize: 78,
      size: 7,
      data: [
        {
          sendName: '山花交',
          content: 'esse voluptate',
          msgs: ['dolore dolor ut'],
          createType: 'tempor mollit Duis',
          sessionType: 'enim dolore consequat',
          createTime: '2009-10-23 09:00:34',
          sessionId: 79,
          deleteStatus: 'minim do'
        },
        {
          sendName: '方列部直',
          content: 'dolore non elit magna',
          deleteStatus: 'Ut',
          createType: 'sit in',
          createTime: '1976-10-11 18:43:59',
          msgs: [
            'pariatur consequat sit',
            'dolor commodo exercitation',
            'Ut enim pariatur esse sit'
          ],
          sessionId: 52,
          sessionType: 'deserunt nostrud'
        }
      ]
    }
  };
});
Mock.mock(basePath + '/session/send', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      data: {
        result: false,
        msg: 'dolor sed cupidatat'
      }
    }
  };
});
Mock.mock(basePath + '/session/open', 'post', function(options) {
  return {
    status: 200,
    message: '',
    result: {
      sessionInfo: {
        sessionId: 3,
        createType: 'sed voluptate',
        sessionType: 'minim et adipisicing irure',
        createTime: '1983-11-03 10:54:01',
        deleteStatus: 'fugiat eiusmod',
        msgs: [
          {
            msgId: 66,
            sessionId: 65,
            msgSeq: 77,
            createId: '31',
            mine: false,
            sendName: '斗现状易才料以',
            content: 'mollit ut amet adipisicing sed',
            createTime: '2020-04-12 11:58:24',
            readStatus: 'consectetur mollit irure exercitation'
          }
        ]
      }
    }
  };
});

/*********************************/
export default Mock;
