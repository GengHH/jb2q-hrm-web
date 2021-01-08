/*
 * @Author: GengHH
 * @Date: 2021-01-07 11:12:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-08 17:40:58
 * @Description: 各模块都可调用的功能接口，如：获取字典表
 * @FilePath: \jb2q-hrm-web\src\api\common.js
 */

import { getAction } from './allActionManage';

/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//获取人员的基本信息
const getDic1 = () => getAction('/common/dic/getGzxz');

export { getDic1 };
