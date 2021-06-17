/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:49:29
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-17 14:46:46
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
export default Mock;
