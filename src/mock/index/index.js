/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:49:29
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-21 17:42:34
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
          jdBaseDataList: {
            pageSize: 16,
            pageIndex: 40,
            total: 16,
            summary: {
              total: 3
            },
            data: [
              {
                jdbh: 'pariatur Excepteur adipisicing fugiat consequat',
                isTrial: 'cupidatat ut',
                dwlx: 'velit ut tempor',
                jdmc: 'elit irure dolore ullamco aute',
                positionDataList: [
                  'nisi minim consequat',
                  'sed Excepteur ipsum dolore aute',
                  'sint proident culpa'
                ],
                jdlx: 'Lorem do consequat quis laborum',
                slrq: 'in',
                baseComDataList: [
                  {
                    dwmc: 'laboris Duis amet',
                    cid: '79',
                    positionDataList: [
                      {
                        gwzs: 'anim Ut veniam fugiat',
                        zgrs: 'aliquip sed ea labore occaecat',
                        gwbm: 'ut do',
                        isHiring: 'commodo aute non',
                        gwbh: 'sed',
                        positionId: '56',
                        zprs: 'mollit'
                      },
                      {
                        positionId: '51',
                        gwbm: 'labore dolore velit est',
                        zgrs: 'magna nisi cupidatat',
                        zprs: 'Ut consequat qui fugiat',
                        gwbh: 'ipsum veniam',
                        gwzs: 'magna ad deserunt irure',
                        isHiring: 'Duis id'
                      }
                    ]
                  },
                  {
                    dwmc: 'quis laborum eiusmod voluptate culpa',
                    cid: '44',
                    positionDataList: [
                      {
                        isHiring: 'voluptate',
                        gwbm: 'quis ullamco incididunt aliqua',
                        zprs: 'eiusmod dolor',
                        gwzs: 'in laborum',
                        zgrs: 'in dolore ullamco elit qui',
                        positionId: '91',
                        gwbh: 'occaecat cillum Excepteur amet ea'
                      }
                    ]
                  }
                ],
                hylb: 'labore id'
              },
              {
                positionDataList: [
                  'aute Excepteur eu ut',
                  'magna nisi ut',
                  'et Ut'
                ],
                hylb: 'officia ut tempor mollit ullamco',
                isTrial: 'dolor id in enim Ut',
                jdmc: 'sed dolor',
                baseComDataList: [
                  {
                    dwmc: 'ex eu in esse aliquip',
                    cid: '65',
                    positionDataList: [
                      {
                        positionId: '72',
                        gwbh: 'consequat',
                        zgrs: 'dolor',
                        isHiring: 'sint anim incididunt sit mollit',
                        zprs: 'aliqua exercitation sint ipsum',
                        gwzs: 'nostrud qui et ea',
                        gwbm: 'officia amet'
                      },
                      {
                        gwbm: 'proident in',
                        gwbh: 'Excepteur Lorem proident adipisicing',
                        zgrs: 'anim',
                        isHiring: 'ipsum nulla',
                        zprs: 'id',
                        gwzs: 'ut cupidatat ullamco ex do',
                        positionId: '20'
                      },
                      {
                        gwbm: 'aliquip',
                        gwzs: 'cillum enim',
                        zgrs: 'minim ullamco Lorem occaecat',
                        positionId: '98',
                        zprs: 'sit ut',
                        isHiring: 'cupidatat nostrud',
                        gwbh: 'ullamco Lorem'
                      }
                    ]
                  }
                ],
                jdlx: 'sed enim anim',
                slrq: 'officia in adipisicing est',
                jdbh: 'Lorem culpa laboris ipsum anim',
                dwlx: 'dolore'
              },
              {
                slrq: 'eu',
                jdmc: 'occaecat',
                baseComDataList: [
                  {
                    dwmc: 'laborum ea nulla',
                    cid: '20',
                    positionDataList: [
                      {
                        gwbh: 'aliqua veniam exercitation cupidatat',
                        positionId: '95',
                        gwbm: 'sunt in',
                        gwzs: 'occaecat qui sunt in',
                        isHiring: 'cillum commodo dolor',
                        zprs: 'do',
                        zgrs: 'mollit consectetur nisi dolor dolore'
                      },
                      {
                        zgrs: 'nisi eiusmod',
                        isHiring: 'mollit',
                        positionId: '27',
                        gwzs: 'sit aliquip quis',
                        gwbm: 'amet commodo',
                        gwbh: 'enim ad aute mollit Excepteur',
                        zprs: 'deserunt fugiat'
                      },
                      {
                        zgrs: 'commodo ullamco sit',
                        gwzs: 'reprehenderit Lorem',
                        zprs: 'esse nostrud commodo sunt in',
                        gwbh: 'ex labore',
                        gwbm: 'exercitation',
                        isHiring: 'dolore eiusmod Excepteur sed',
                        positionId: '18'
                      },
                      {
                        gwzs: 'ea tempor Duis in',
                        zprs: 'aliqua',
                        isHiring: 'minim consectetur',
                        zgrs: 'velit amet consequat dolore',
                        gwbh: 'fugiat officia amet cillum',
                        positionId: '98',
                        gwbm: 'eu quis'
                      },
                      {
                        gwbm: 'nisi',
                        positionId: '67',
                        isHiring: 'consequat tempor cupidatat consectetur Duis',
                        gwbh: 'incididunt ex culpa nisi',
                        zprs: 'sint',
                        zgrs: 'ut aliqua dolor',
                        gwzs: 'reprehenderit do dolore amet'
                      }
                    ]
                  },
                  {
                    dwmc: 'in',
                    cid: '83',
                    positionDataList: [
                      {
                        gwbm: 'deserunt in laboris',
                        gwzs: 'qui officia pariatur Ut elit',
                        positionId: '93',
                        zprs: 'non',
                        gwbh: 'elit est',
                        zgrs: 'ad eu commodo cillum sit',
                        isHiring: 'nulla aliquip deserunt'
                      },
                      {
                        zgrs: 'do',
                        gwzs: 'cupidatat exercitation eiusmod',
                        positionId: '89',
                        gwbh: 'ut est Excepteur ea',
                        isHiring: 'est Duis incididunt nostrud',
                        gwbm: 'ut consequat',
                        zprs: 'officia non enim'
                      },
                      {
                        isHiring: 'ad aliqua',
                        gwzs: 'dolor dolore voluptate',
                        zprs: 'id sit fugiat',
                        gwbh: 'eiusmod pariatur veniam incididunt velit',
                        positionId: '84',
                        zgrs: 'eu elit deserunt',
                        gwbm: 'velit consequat adipisicing'
                      },
                      {
                        zprs: 'occaecat quis est cillum',
                        gwzs: 'ullamco Lorem sunt in',
                        isHiring: 'velit Lorem',
                        positionId: '97',
                        gwbh: 'consequat fugiat',
                        zgrs: 'nulla nisi qui',
                        gwbm: 'pariatur nulla commodo et'
                      },
                      {
                        positionId: '74',
                        gwbm: 'velit labore elit dolore',
                        isHiring: 'aute',
                        zgrs: 'exercitation',
                        zprs: 'magna adipisicing',
                        gwbh: 'Duis adipisicing esse enim sed',
                        gwzs: 'Duis aliqua anim sed'
                      }
                    ]
                  },
                  {
                    dwmc: 'ut anim nulla',
                    cid: '100',
                    positionDataList: [
                      {
                        zgrs: 'ut id consequat',
                        gwbh: 'eiusmod',
                        positionId: '44',
                        gwbm: 'cillum dolore ad officia sit',
                        zprs: 'reprehenderit',
                        isHiring: 'veniam aliquip proident consectetur',
                        gwzs: 'pariatur dolore consequat'
                      },
                      {
                        isHiring: 'laborum',
                        positionId: '83',
                        zprs: 'dolore',
                        gwbm: 'consectetur ipsum culpa id nulla',
                        gwzs: 'commodo',
                        gwbh: 'eu magna',
                        zgrs: 'sunt'
                      }
                    ]
                  },
                  {
                    dwmc: 'Ut ipsum sit deserunt est',
                    cid: '79',
                    positionDataList: [
                      {
                        zgrs: 'dolore esse incididunt eu adipisicing',
                        gwbh: 'officia',
                        gwzs: 'id',
                        positionId: '91',
                        isHiring: 'dolor occaecat',
                        gwbm: 'amet',
                        zprs: 'amet irure Ut dolore dolor'
                      },
                      {
                        positionId: '78',
                        gwzs: 'reprehenderit',
                        zprs: 'ullamco enim ut exercitation amet',
                        zgrs: 'dolore minim laboris',
                        gwbm: 'deserunt',
                        isHiring: 'dolor tempor laborum veniam',
                        gwbh: 'sed minim tempor'
                      },
                      {
                        gwzs: 'cillum',
                        isHiring: 'deserunt dolor Lorem Duis',
                        gwbh: 'amet sit consectetur nostrud est',
                        gwbm: 'reprehenderit in',
                        positionId: '62',
                        zprs: 'sit sed fugiat',
                        zgrs: 'sed enim minim aute'
                      },
                      {
                        gwbh: 'Duis',
                        isHiring: 'aliqua fugiat',
                        positionId: '77',
                        zgrs: 'irure nisi aliqua adipisicing eu',
                        zprs: 'Lorem veniam in',
                        gwbm: 'eu eiusmod',
                        gwzs: 'qui Duis ad do'
                      }
                    ]
                  },
                  {
                    dwmc: 'minim anim magna officia consectetur',
                    cid: '46',
                    positionDataList: [
                      {
                        gwzs: 'in',
                        zgrs: 'consequat sed',
                        gwbm: 'et dolore esse',
                        isHiring: 'cillum mollit',
                        positionId: '31',
                        gwbh: 'do consequat proident magna',
                        zprs: 'irure aliquip'
                      },
                      {
                        zgrs: 'labore cupidatat amet tempor',
                        gwbh: 'in',
                        gwzs: 'laboris',
                        isHiring: 'aute sit culpa veniam',
                        positionId: '48',
                        zprs: 'consectetur magna non cillum',
                        gwbm: 'dolor eu amet'
                      },
                      {
                        gwbm: 'ipsum ullamco quis',
                        gwbh: 'sint cupidatat amet proident',
                        gwzs: 'veniam sit',
                        isHiring: 'ut elit occaecat et nostrud',
                        positionId: '7',
                        zprs: 'in',
                        zgrs: 'proident sit ex in'
                      },
                      {
                        gwbh: 'veniam quis',
                        gwbm: 'dolor',
                        gwzs: 'aliqua',
                        zgrs: 'officia id enim ullamco Ut',
                        zprs: 'Ut laboris',
                        isHiring: 'ad qui',
                        positionId: '90'
                      },
                      {
                        isHiring: 'ullamco eiusmod dolor incididunt',
                        gwbh: 'ex dolore',
                        positionId: '28',
                        zprs: 'do reprehenderit deserunt qui nostrud',
                        gwzs: 'magna fugiat officia adipisicing labore',
                        gwbm: 'enim ullamco',
                        zgrs: 'cillum ad minim officia cupidatat'
                      }
                    ]
                  }
                ],
                dwlx: 'sit',
                positionDataList: ['consequat in sunt id exercitation', 'in'],
                hylb: 'non sunt tempor dolor dolore',
                jdlx: 'adipisicing elit',
                isTrial: 'culpa',
                jdbh: 'Excepteur proident est aliqua reprehenderit'
              },
              {
                slrq: 'cupidatat qui aute officia',
                jdmc: 'tempor anim sed ad ex',
                isTrial: 'dolor',
                hylb: 'labore Lorem eiusmod',
                jdlx: 'quis',
                jdbh: 'eu elit nulla',
                dwlx: 'magna dolore ut',
                baseComDataList: [
                  {
                    dwmc: 'tempor commodo culpa',
                    cid: '84',
                    positionDataList: [
                      {
                        gwbh: 'aute culpa',
                        gwzs: 'eu sint tempor adipisicing minim',
                        isHiring: 'cillum mollit incididunt ipsum qui',
                        zgrs: 'esse',
                        positionId: '73',
                        zprs: 'mollit Excepteur cupidatat elit ex',
                        gwbm: 'et adipisicing eiusmod'
                      },
                      {
                        gwbm: 'pariatur magna ut',
                        zgrs: 'aliquip aliqua dolore eiusmod',
                        gwbh: 'Duis dolore Ut',
                        isHiring: 'ex nostrud',
                        gwzs: 'reprehenderit laborum',
                        zprs: 'aute anim cupidatat incididunt Lorem',
                        positionId: '24'
                      },
                      {
                        isHiring: 'ad',
                        zprs: 'velit pariatur amet non incididunt',
                        zgrs: 'anim qui laborum adipisicing',
                        gwzs: 'aliquip',
                        gwbm: 'consectetur Excepteur et in',
                        positionId: '61',
                        gwbh: 'proident'
                      }
                    ]
                  },
                  {
                    dwmc: 'velit',
                    cid: '52',
                    positionDataList: [
                      {
                        zprs: 'eiusmod reprehenderit in sunt velit',
                        gwbh: 'id pariatur Duis fugiat',
                        isHiring: 'eu ut aute voluptate irure',
                        gwbm: 'Duis sunt laborum elit aute',
                        gwzs: 'tempor aute magna',
                        positionId: '81',
                        zgrs: 'ullamco enim voluptate laboris occaecat'
                      },
                      {
                        positionId: '1',
                        zgrs: 'deserunt in adipisicing consectetur Lorem',
                        isHiring: 'voluptate consectetur quis dolore cupidatat',
                        gwbh: 'Duis occaecat velit proident',
                        gwbm: 'dolore minim ex Ut elit',
                        gwzs: 'ut culpa magna ut',
                        zprs: 'ea'
                      },
                      {
                        zgrs: 'minim Duis',
                        gwbh: 'consectetur aliqua labore commodo',
                        gwzs: 'aliqua sunt magna ipsum aliquip',
                        positionId: '41',
                        gwbm: 'dolore irure sint minim reprehenderit',
                        isHiring: 'quis velit deserunt et',
                        zprs: 'do adipisicing commodo esse et'
                      },
                      {
                        zprs: 'dolor laborum',
                        isHiring: 'consequat voluptate sit Ut esse',
                        zgrs: 'ullamco reprehenderit Duis sit',
                        gwzs: 'elit anim nisi',
                        positionId: '17',
                        gwbm: 'Ut culpa velit in labore',
                        gwbh: 'incididunt qui mollit labore'
                      }
                    ]
                  },
                  {
                    dwmc: 'Duis ut',
                    cid: '12',
                    positionDataList: [
                      {
                        positionId: '55',
                        gwbh: 'aliqua Excepteur labore fugiat',
                        zgrs: 'amet pariatur et Ut',
                        zprs: 'dolor eu ipsum cupidatat sunt',
                        gwbm: 'esse aute in',
                        isHiring: 'nostrud ad consectetur',
                        gwzs: 'sit culpa Duis do'
                      },
                      {
                        positionId: '89',
                        gwbm: 'cupidatat',
                        isHiring: 'in cillum ut',
                        zgrs: 'sit anim in magna',
                        zprs: 'elit commodo',
                        gwzs: 'laboris sint',
                        gwbh: 'velit'
                      },
                      {
                        zprs: 'qui magna',
                        gwbh: 'ad',
                        zgrs: 'in ex',
                        gwzs: 'magna Lorem ad fugiat elit',
                        positionId: '40',
                        gwbm: 'voluptate velit dolor eiusmod',
                        isHiring: 'consequat officia non'
                      },
                      {
                        zprs: 'sit in do proident',
                        isHiring: 'in exercitation quis dolore',
                        positionId: '82',
                        gwzs: 'dolore occaecat',
                        zgrs: 'in amet sunt veniam in',
                        gwbh: 'ex laborum',
                        gwbm: 'sunt ut tempor'
                      }
                    ]
                  },
                  {
                    dwmc: 'dolor Excepteur',
                    cid: '2',
                    positionDataList: [
                      {
                        gwbm: 'incididunt ea Lorem',
                        isHiring: 'aliquip nulla minim nostrud',
                        positionId: '8',
                        gwbh: 'consequat sint eu esse eiusmod',
                        zgrs: 'quis amet',
                        zprs: 'in aute anim elit exercitation',
                        gwzs: 'Lorem magna dolore anim'
                      },
                      {
                        zgrs: 'ullamco ut Lorem enim ipsum',
                        gwbh: 'in ullamco velit do ipsum',
                        isHiring: 'quis',
                        positionId: '59',
                        zprs: 'Lorem minim cupidatat aute ut',
                        gwbm: 'do',
                        gwzs: 'sint non sed'
                      },
                      {
                        zgrs: 'quis ullamco',
                        zprs: 'proident ut officia consectetur in',
                        gwbm: 'proident culpa minim Duis sed',
                        gwzs: 'incididunt sunt in',
                        isHiring: 'dolore culpa sit enim',
                        positionId: '50',
                        gwbh: 'tempor'
                      }
                    ]
                  },
                  {
                    dwmc: 'ad nulla est Ut ullamco',
                    cid: '18',
                    positionDataList: [
                      {
                        isHiring: 'exercitation',
                        positionId: '87',
                        gwzs: 'enim proident ut aute cupidatat',
                        zprs: 'in',
                        gwbh: 'consectetur aliqua officia est',
                        zgrs: 'ut minim ullamco',
                        gwbm: 'Ut'
                      },
                      {
                        zgrs: 'enim',
                        gwbh: 'id',
                        isHiring: 'deserunt aute et incididunt',
                        positionId: '29',
                        gwzs: 'irure',
                        zprs: 'ut pariatur',
                        gwbm: 'ex pariatur occaecat ad'
                      },
                      {
                        gwzs: 'quis Ut occaecat consectetur eiusmod',
                        gwbm: 'deserunt esse veniam ea',
                        gwbh: 'dolor reprehenderit aliquip',
                        zgrs: 'qui adipisicing velit',
                        positionId: '36',
                        zprs: 'ea eu amet non',
                        isHiring: 'commodo enim Ut dolor'
                      },
                      {
                        gwbh: 'nostrud adipisicing in sint ex',
                        gwzs: 'dolor sed exercitation est',
                        zgrs: 'Lorem irure amet',
                        isHiring: 'nisi elit',
                        gwbm: 'ea ex labore pariatur elit',
                        zprs: 'labore',
                        positionId: '52'
                      },
                      {
                        gwzs: 'esse ut sit voluptate Lorem',
                        isHiring: 'est',
                        positionId: '63',
                        zprs: 'mollit',
                        gwbm: 'magna dolor dolor dolore',
                        zgrs: 'aute proident',
                        gwbh: 'laboris minim'
                      }
                    ]
                  }
                ],
                positionDataList: [
                  'aliquip non in laboris dolor',
                  'velit',
                  'veniam'
                ]
              }
            ],
            size: 77,
            pageCount: 42
          },
          errMsg: 'aute reprehenderit aliquip quis'
        }
      }
    };
  }
);
export default Mock;
