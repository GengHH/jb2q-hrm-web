/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:49:29
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-02 18:07:34
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\index\index.js
 */
/**
 * Created by GengHH on 2020/11/25.
 * 定义Mock.mock()的请求拦截
 */
import Mock from 'mockjs';
import apiUrlConfig from '../../config/mock.conf';
import '../commonMock';

const basePath = apiUrlConfig.corpBasePath;
const getSiteInfo = () => {
  return {
    code: 200,
    msg: '请求成功',
    data: {
      news: [
        {
          id: '1',
          title: 'Tom',
          content: 'Tom is working!'
        },
        {
          id: '2',
          title: 'Jerry',
          content: 'Jerry is fishing!'
        }
      ],
      title: 'vue个人网站',
      logo: '/static/logo.png'
    }
  };
};

Mock.mock('/admin/index', 'get', getSiteInfo());
Mock.mock(basePath + '/guide/special/activity/query', 'post', function(
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
            districtCode: '54',
            relTime: '2017-03-14 10:02:21',
            attendCount: 'Duis incididunt',
            actAddress: '贵州省海口市福海县',
            selfApply: 'minim ea',
            applyEndTime: '1998-08-08 14:27:52',
            release: 'officia cupidatat fugiat',
            actEndTime: '2002-01-26 07:24:45',
            actStartTime: '1991-10-02 03:53:33',
            actSituation: 'magna consectetur velit',
            expertJoin: 'amet mollit',
            actStatus: 'minim sunt officia et nulla',
            actType: 'velit',
            participants: 'cupidatat quis aliqua nisi dolore',
            userId: '42',
            actId: 14,
            actName: '线备开易观才每',
            recApplyMax: 70,
            systemRecSpecialGuide: '83',
            propagandaImage: [
              'http://dummyimage.com/400x200',
              'http://dummyimage.com/400x200'
            ],
            selfApplyMax: 4,
            content:
              '这次公司2020上海某银行校园招聘公告解读备考指导特别讲座邀请了某某专家、某某专家为我们讲解...',
            applyStartTime: '1982-02-07 22:53:01'
          }
        ]
      })
    }
  };
});
// 就业见习数据
Mock.mock(
  basePath + '/corp/position/query-jyjxJdInfo-positionshow',
  'post',
  function() {
    return {
      status: 200,
      message: '',
      result: {
        data: {
          pageSize: 10,
          pageIndex: 0,
          total: 2,
          summary: {
            total: 1
          },
          data: [
            // {
            //   jdlx: '2',
            //   jdmc: '上海庆圆投资有限公司',
            //   jdbh: '2017D10232',
            //   cid: '200211110579131',
            //   logo: '',
            //   cid: '200211110579131',
            //   isTrial: '1',
            //   dwlx: '有限责任公司(自然人投资或控股)',
            //   hylb: '投资与资产管理',
            //   slrq: '2009年',
            //   baseComDataList: [
            //     {
            //       dwmc: '上海兴国宾馆',
            //       cid: '200101010041021',
            //       positionDataList: [
            //         {
            //           gwbh: '1912023415',
            //           positionId: '',
            //           gwbm: '酒店管理专员',
            //           gwzs: '5',
            //           zgrs: '0',
            //           isHiring: '',
            //           zprs: '5'
            //         }
            //       ]
            //     },
            //     {
            //       dwmc: '上海噢开新媒体科技有限公司二级同色人家搜是大法官',
            //       cid: '201911273972621',
            //       logo: '',
            //       positionDataList: [
            //         {
            //           gwbh: '1912023415',
            //           positionId: '',
            //           gwbm: '京东方佛感受到',
            //           gwzs: '5',
            //           zgrs: '0',
            //           isHiring: '',
            //           zprs: '5'
            //         },
            //         {
            //           gwbh: '1912023415',
            //           positionId: '',
            //           gwbm: '士大夫撒多of老地方',
            //           gwzs: '5',
            //           zgrs: '0',
            //           isHiring: '',
            //           zprs: '5'
            //         },
            //         {
            //           gwbh: '1912023415',
            //           positionId: '',
            //           gwbm: '士大夫撒多of老地方',
            //           gwzs: '5',
            //           zgrs: '0',
            //           isHiring: '',
            //           zprs: '5'
            //         },
            //         {
            //           gwbh: '1912023415',
            //           positionId: '',
            //           gwbm: '士大夫撒多of老地方',
            //           gwzs: '5',
            //           zgrs: '0',
            //           isHiring: '',
            //           zprs: '5'
            //         },
            //         {
            //           gwbh: '1912023415',
            //           positionId: '',
            //           gwbm: '士大夫撒多of老地方',
            //           gwzs: '5',
            //           zgrs: '0',
            //           isHiring: '',
            //           zprs: '5'
            //         }
            //       ]
            //     }
            //   ],
            //   positionDataList: []
            // },
            {
              dwmc: '上海市宝山区红星幼儿园（上海市宝山区红星幼儿园分园）',
              cid: '200008010006541',
              jdlx: '2',
              jdmc: '上海宝山人力资源有限公司',
              jdbh: '2017D10597',
              jdCid: '200008010027061',
              dwlx: '有限责任公司(非自然人投资或控股的法人独资)',
              hylb: '劳务派遣服务',
              slrq: '2000年',
              isTrial: '1',
              positionDataList: [
                {
                  gwbh: '2009074204',
                  positionId: '',
                  gwbm: '幼儿教师',
                  gwzs: '10',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '10'
                },
                {
                  gwbh: '2009074204',
                  positionId: '',
                  gwbm: '幼儿教师',
                  gwzs: '10',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '10'
                },
                {
                  gwbh: '2009074204',
                  positionId: '',
                  gwbm: '幼儿教师',
                  gwzs: '10',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '10'
                },
                {
                  gwbh: '2009074204',
                  positionId: '',
                  gwbm: '幼儿教师',
                  gwzs: '10',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '10'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '200211110579131',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791311',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791312',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791313',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791314',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791315',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791316',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791317',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232111111',
              cid: '2002111105791318',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            },
            {
              jdlx: '1',
              jdmc: '上海万达股份有限公司',
              jdbh: '2017D10232',
              cid: '2002111105791319',
              logo: '',
              isTrial: '1',
              dwlx: '有限责任公司',
              hylb: '投资与资产管理',
              slrq: '2009年',
              baseComDataList: [],
              positionDataList: [
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员1',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                },
                {
                  gwbh: '1912023415',
                  positionId: '',
                  gwbm: '酒店管理专员2',
                  gwzs: '5',
                  zgrs: '0',
                  isHiring: '',
                  zprs: '5'
                }
              ]
            }
          ],
          size: 1,
          pageCount: 1
        }
      }
    };
  }
);

//特色活动(分页)
Mock.mock(
  RegExp(basePath + '/nologin/specialActivity/querySpecialActivityList' + '.*'),
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
              'actId|+1': '@string("number", 5)',
              districtCode: '09',
              actType: '01',
              actName: '测试测试',
              expertJoin: '0',
              actStartTime: '2021-05-31 00:00:00',
              actEndTime: '2021-07-30 00:00:00',
              actAddress: '测试4',
              content: '测试5',
              release: '1',
              applyStartTime: '2021-06-01 00:00:00',
              applyEndTime: '2021-07-28 00:00:00',
              selfApplyMax: '22',
              recApplyMax: '22',
              propagandaImage: [],
              relTime: '2021-06-07 19:22:31',
              userId: '0001564698',
              actSituation: '',
              participants: '',
              attendCount: '',
              selfApply: '',
              systemRecSpecialGuide: '',
              actStatus: '1',
              sceneImage: [],
              remainingPlaces: '22'
            }
          ]
        })
      }
    };
  }
);

//特色活动-详情信息
Mock.mock(
  RegExp(basePath + '/nologin/specialActivity/querySpecialActivityDetail'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: {
          actId: '2',
          districtCode: '07',
          actType: '01',
          actName: '测试123',
          expertJoin: '0',
          actStartTime: '2021-05-01 00:00:00',
          actEndTime: '2021-05-25 00:00:00',
          actAddress: '测试',
          content: '测试2',
          release: '1',
          applyStartTime: '2021-05-01 00:00:00',
          applyEndTime: '2021-08-01 00:00:00',
          selfApplyMax: '11',
          recApplyMax: '11',
          propagandaImage:
            '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',
          relTime: '2021-05-26 11:41:24',
          userId: '0001564698',
          actSituation: '',
          participants: '',
          attendCount: '',
          selfApply: '',
          systemRecSpecialGuide: '',
          actStatus: '1',
          sceneImage: []
        }
      }
    };
  }
);

//获取职位信息(分页)
Mock.mock(
  RegExp(basePath + '/nologin/applyfor/queryPositionList' + '.*'),
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
              'favor|1': [false, true],
              'applyFor|1': [false, true],
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
              releaseStatusId: '2',
              'corpNature|1': ['01', '02'],
              'industryType|1': ['01', '02']
            }
          ]
        })
      }
    };
  }
);

//默认热招推荐类简历投递数倒序前9职位明细
Mock.mock(
  RegExp(basePath + '/nologin/index/queryHotPositionInfo'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: Mock.mock({
        'data|1-10': [
          {
            'positionId|+1': '@string("number", 3)',
            positionCode: '20210400000032',
            positionName: '初级审计师4405',
            recruitType: '1',
            tranBaseSymbol: '0',
            agencyRecruit: '0',
            entrustTyshxym: '',
            entrustCorpName: '',
            corpId: '200008010000011',
            positionType: '10  ',
            workNature: '01',
            ageMax: '40',
            ageMin: '18',
            workArea: '04',
            workAddress: '工作详细地址',
            workHour: '05',
            workYearNeed: '04',
            eduRequire: '07',
            salaryMax: '99999',
            salaryMin: '50000',
            salaryPayType: '04',
            recruitNum: '3',
            special: '',
            describe: '初级审计师描述',
            onTop: '0',
            releaseStatusId: '2',
            releaseUserId: '0001564639',
            releaseTime: '2021-06-03 13:32:04',
            corpName: '中化资产管理（上海）有限公司',
            corpNature: '15',
            industryType: '09'
          }
        ]
      })
    };
  }
);
//分页查询所有热招职位
Mock.mock(
  RegExp(basePath + '/nologin/index/queryHotPositionInfoAll'),
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
              'positionId|+1': '@string("number", 3)',
              positionCode: '20210400000032',
              positionName: '初级审计师4405666',
              recruitType: '1',
              tranBaseSymbol: '0',
              agencyRecruit: '0',
              entrustTyshxym: '',
              entrustCorpName: '',
              corpId: '200008010000011',
              positionType: '10  ',
              workNature: '01',
              ageMax: '40',
              ageMin: '18',
              workArea: '04',
              workAddress: '工作详细地址',
              workHour: '05',
              workYearNeed: '04',
              eduRequire: '07',
              salaryMax: '99999',
              salaryMin: '50000',
              salaryPayType: '04',
              recruitNum: '3',
              special: '',
              describe: '初级审计师描述',
              onTop: '0',
              releaseStatusId: '2',
              releaseUserId: '0001564639',
              releaseTime: '2021-06-03 13:32:04',
              corpName: '中化资产管理（上海）有限公司',
              corpNature: '15',
              industryType: '09'
            }
          ]
        })
      }
    };
  }
);

//查询工资下限前九的急招职位
Mock.mock(
  RegExp(basePath + '/nologin/index/querySortUrgRecPositionList'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: Mock.mock({
        'data|1-10': [
          {
            'positionId|+1': '@string("number", 3)',
            positionCode: '20210400000032',
            positionName: '初级审计师4405',
            recruitType: '1',
            tranBaseSymbol: '0',
            agencyRecruit: '0',
            entrustTyshxym: '',
            entrustCorpName: '',
            corpId: '200008010000011',
            positionType: '10  ',
            workNature: '01',
            ageMax: '40',
            ageMin: '18',
            workArea: '04',
            workAddress: '工作详细地址',
            workHour: '05',
            workYearNeed: '04',
            eduRequire: '07',
            salaryMax: '99999',
            salaryMin: '50000',
            salaryPayType: '04',
            recruitNum: '3',
            special: '',
            describe: '初级审计师描述',
            onTop: '0',
            releaseStatusId: '2',
            releaseUserId: '0001564639',
            releaseTime: '2021-06-03 13:32:04',
            corpName: '中化资产管理（上海）有限公司',
            corpNature: '15',
            industryType: '09'
          }
        ]
      })
    };
  }
);
//查询所有急招职位
Mock.mock(
  RegExp(basePath + '/nologin/index/queryAllUrgRecPositionList'),
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
              'positionId|+1': '@string("number", 3)',
              positionCode: '20210400000032',
              positionName: '初级审计师4405',
              recruitType: '1',
              tranBaseSymbol: '0',
              agencyRecruit: '0',
              entrustTyshxym: '',
              entrustCorpName: '',
              corpId: '200008010000011',
              positionType: '10  ',
              workNature: '01',
              ageMax: '40',
              ageMin: '18',
              workArea: '04',
              workAddress: '工作详细地址',
              workHour: '05',
              workYearNeed: '04',
              eduRequire: '07',
              salaryMax: '99999',
              salaryMin: '50000',
              salaryPayType: '04',
              recruitNum: '3',
              special: '',
              describe: '初级审计师描述',
              onTop: '0',
              releaseStatusId: '2',
              releaseUserId: '0001564639',
              releaseTime: '2021-06-03 13:32:04',
              corpName: '中化资产管理（上海）有限公司',
              corpNature: '15',
              industryType: '09'
            }
          ]
        })
      }
    };
  }
);

//人力资源旗舰店默认前九
Mock.mock(
  RegExp(basePath + '/nologin/index/queryHRFlagshipStoreInfo'),
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
            tyshxydm: '91310000132653687M',
            corpNature: '15',
            industryType: '01'
          },
          {
            cid: '200008010784151',
            corpName: '万达信息股份有限公司',
            tyshxydm: '91310000132653687M',
            corpNature: '15',
            industryType: '01'
          },
          {
            cid: '200008010784151',
            corpName: '万达信息股份有限公司',
            tyshxydm: '91310000132653687M',
            corpNature: '15',
            industryType: '01'
          }
        ]
      }
    };
  }
);
//查询所有人力资源旗舰店(分页)
Mock.mock(
  RegExp(basePath + '/nologin/index/queryHRFlagshipStoreInfoAll'),
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
              'cid|+1': '@string("number", 12)',
              corpName: '万达信息股份有限公司',
              tyshxydm: '91310000132653687M',
              corpNature: '15',
              industryType: '01'
            }
          ]
        })
      }
    };
  }
);
//查询特色活动列表(分页)
Mock.mock(
  RegExp(basePath + '/nologin/meeting/queryMeetingList'),
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
              'meetId|+1': '@string("number", 3)',
              meetName: '招聘会名称测试12222',
              meetIntroduce: '招聘会名称',
              meetType: '1',
              startTime: '2021-04-25 00:00:00',
              endTime: '2021-04-30 00:00:00',
              address: '天山路1800号',
              boothCount: '9999',
              traffic: '地铁2，3，4，15号线',
              mainCorpName: '万达信息',
              contactName: '令狐冲',
              contactPhone: '123123122312',
              propagandaImage: 'iVBORw0KGgoAAAANSUhEUgAAA9EAAAGtCAYAAAART/',
              districtCode: '03,02',
              onTop: '0',
              releaseStatus: '1',
              applyStatus: '1',
              userId: '0001564698',
              releaseTime: '2021-05-22 13:43:15',
              endApplyTime: '2021-05-05 00:00:00',
              releaseDistrict: '00'
            }
          ]
        })
      }
    };
  }
);

//查询工资下限前九的急招职位
Mock.mock(
  RegExp(basePath + '/nologin/meeting/queryMeetingDetail'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: Mock.mock({
        'data|1-10': [
          {
            'meetId|+1': '@string("number", 3)',
            meetName: '招聘会名称测试12222',
            meetIntroduce: '招聘会名称',
            meetType: '1',
            startTime: '2021-04-25 00:00:00',
            endTime: '2021-04-30 00:00:00',
            address: '天山路1800号',
            boothCount: '9999',
            traffic: '地铁2，3，4，15号线',
            mainCorpName: '万达信息',
            contactName: '令狐冲',
            contactPhone: '123123122312',
            propagandaImage: 'iVBORw0KGgoAAAANSUhEUgAAA9EAAAGtCAYAAAART/',
            districtCode: '03,02',
            onTop: '0',
            releaseStatus: '1',
            applyStatus: '1',
            userId: '0001564698',
            releaseTime: '2021-05-22 13:43:15',
            endApplyTime: '2021-05-05 00:00:00',
            releaseDistrict: '00'
          }
        ]
      })
    };
  }
);
export default Mock;
