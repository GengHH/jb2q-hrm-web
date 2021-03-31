/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-24 09:37:21
 * @Description: mock拦截公共调用的接口，模拟数据
 * @FilePath: \jb2q-hrm-web\src\mock\commonMock.js
 */

import Mock from 'mockjs';
import dic from './dataDictionary';
import config from '../config/mock.conf';

const basePath = config.commonBasePath;

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
    return {
      //dicData: dic[code]
      status: 200,
      message: '',
      result: {
        data: JSON.stringify(dic[code])
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
    return {
      status: 200,
      message: '',
      result: {
        data: JSON.stringify(dic[code])
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
            eduLevel: '大学本科',
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

export default Mock;
