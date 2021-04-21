/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:49:29
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-21 10:33:37
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\index\index.js
 */
/**
 * Created by GengHH on 2020/11/25.
 * 定义Mock.mock()的请求拦截
 */
import Mock from 'mockjs';
import config from '../../config/mock.conf';
import '../commonMock';

const adminBasePath = config.adminBasePath;
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
Mock.mock(adminBasePath + '/guide/special/activity/query', 'post', function(
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
              'http://dummyimage.com/400x400',
              'http://dummyimage.com/400x400'
            ],
            selfApplyMax: 4,
            content: 'anim ut',
            applyStartTime: '1982-02-07 22:53:01'
          }
        ]
      })
    }
  };
});

export default Mock;
