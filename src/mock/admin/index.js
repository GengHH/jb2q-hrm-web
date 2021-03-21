/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:49:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-19 17:46:36
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\mock\index\index.js
 */
/**
 * Created by GengHH on 2020/11/25.
 * 定义Mock.mock()的请求拦截
 */
import Mock from 'mockjs';
import '../commonMock';

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

export default Mock;
