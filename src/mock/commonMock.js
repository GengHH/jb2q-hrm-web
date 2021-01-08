/* eslint-disable no-undef */
/*
 * @Author: GengHH
 * @Date: 2021-01-05 13:39:44
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-08 17:44:26
 * @Description: mock拦截公共调用的接口，模拟数据
 * @FilePath: \jb2q-hrm-web\src\mock\commonMock.js
 */

import Mock from 'mockjs';
import dic from './dataDictionary';

Mock.mock('/common/dic/getGzxz', 'get', {
  dicData: dic.RECRUIT_WORK_NATURE
});

export default Mock;
