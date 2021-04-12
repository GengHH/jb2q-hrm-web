/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-01 15:10:02
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\api\index.js
 */
//import apiUrlConfig from '../config';
import { postAction } from './allActionManage';

/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//示例
const queryTable = params => postAction('ggzp-shrs/person/queryTable', params);

//TODO 根据业务自行添加

export { queryTable };
