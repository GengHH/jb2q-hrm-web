/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:49:29
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-12 16:00:23
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
  basePath + '/nologin/index/queryHRFlagshipStoreInfo',
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
  basePath + '/nologin/index/queryHRFlagshipStoreInfoAll',
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

//单位查询用工缺失申请信息
Mock.mock(
  RegExp(basePath + '/nologin/index/queryAllEmploymentLack'),
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
              verifyStatus: '1',
              eduRequire: 'veniam tempor',
              positionType: '1001',
              dockResult: 'dolor laborum quis non',
              districtCode: '01',
              salaryMax: 43,
              borrowPeriod: 'et ut reprehenderit minim',
              verifyTime: '1987-05-16 16:54:35',
              tyshxym: '123123123123123123',
              corpName: '种其委科',
              recruitNum: 20,
              verifyUserId: '95',
              memo: 'veniam cillum culpa cupidatat',
              cid: '38',
              workNature: '01',
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
  RegExp(basePath + '/nologin/index/queryAllEmploymentSurplus'),
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
              positionType: '0101',
              content: 'eu sed',
              tyshxym: '123123123123123123',
              pageParam: 'quis',
              surplusId: 97,
              verifyTime: '1981-02-16 23:40:28',
              eduRequire: '02',
              verifyUserId: '79',
              salaryMax: 68,
              workNature: '02',
              dockResult: 'Ut occaecat voluptate incididunt dolor',
              contactPhone: '18112957344',
              borrowPeriod: 'et quis',
              districtCode: '13',
              recruitNum: 33,
              verifyStatus: '2'
            }
          ],
          size: 1,
          pageCount: 1
        }
      }
    };
  }
);
//获取职位详细信息
Mock.mock(
  RegExp(basePath + '/nologin/index/getPositionDetail'),
  'post',
  function(options) {
    return {
      status: 200,
      message: '',
      result: {
        data: {
          positionId: '1',
          positionCode: '20210400000001',
          positionName: '软件测试',
          recruitType: '1',
          tranBaseSymbol: '0',
          agencyRecruit: '0',
          entrustTyshxym: '',
          entrustCorpName: '',
          corpId: '200008010784151',
          positionType: '15  ',
          workNature: '01',
          ageMax: '40',
          ageMin: '25',
          workArea: '05',
          workAddress: '天山路1800号',
          workHour: '005',
          workYearNeed: '03',
          eduRequire: '07',
          salaryMax: '10000',
          salaryMin: '5000',
          salaryPayType: '04',
          recruitNum: '2',
          special: '',
          describe: '测试',
          onTop: '0',
          releaseStatusId: '2',
          releaseUserId: '0001564640',
          releaseTime: '2021-05-20 17:06:39',
          corpName: '万达信息股份有限公司',
          favorTmp: '',
          applyForTmp: '',
          cid: '200008010784151',
          tyshxym: '91310000132653687M',
          establishDate: '19951109',
          businessRange:
            '计算机专业领域内的技术咨询、开发、转让、培训、承包、中介、入股及新产品的研制、试销，计算机及配件，普通机械及电器机械与器材，经济信息咨询服务，机械电器设备租赁，电子产品及通信设备销售，计算机信息系统集成，建筑智能化系统集成，（设计、施工），机场空管工程及航站楼弱电系统工程，医疗器械经营（详见医疗器械经营企业许可证），自营进出口，电信业务 。 【依法须经批准的项目，经相关部门批准后方可开展经营活动】',
          unitResidence:
            '上海市桂平路481号20号楼5层                                                      ',
          corpNature: '15',
          industryType: '01',
          humanResourceReg: '0',
          keypointCorp: '0',
          specialCorp: '1',
          entrustStatus: '1',
          entrustValid: '2021-07-15 00:00:00',
          frozen: '0',
          districtCode: '04',
          introduce:
            '万达信息的业务领域涵盖医疗卫生、智慧政务、市场监管、民生保障、城市安全、智慧教育、ICT信息科技创新以及健康管理和智慧城市公共平台的建设与运营。其中，卫生健康、民生保障、智慧城市公共平台等公司业务服务全国8亿人口。凭借在丰富行业实践中形成的自主创新核心技术，万达信息目前已拥有600余项具备自主知识产权的软件产品和软件著作权、19项国内外专利技术；承担着20余项国家各类标准及指南、近10项上海市及其他地方各类标准的制定工作；并先后获得2项国家科技进步二等奖、1项教育部科技进步一等奖、5项上海市科技进步一等奖，为企业的可持续创新能力提供了坚强动力。',
          contactAddress: '联航路',
          contactPhone: '李小姐',
          specific: '',
          recruitChargeName: '李珍',
          recruitChargePhone: '15921900607',
          recruitStaffName1: '',
          recruitStaffPhone1: '',
          recruitStaffName2: '',
          recruitStaffPhone2: '',
          logo:
            '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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4Afc+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==',
          publicityMovie: '',
          statusId: '',
          favor: false,
          applyFor: false,
          complaintTmp: '',
          complaint: false
        }
      }
    };
  }
);

export default Mock;
