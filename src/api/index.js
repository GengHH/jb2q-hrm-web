import { postAction } from './allActionManage';

/**
 * Created by GengHH on 2020/11/29
 * 配置各个页面上需要调用后台的接口的action
 */

//示例
const queryTable = params => postAction('recruitment/person/queryTable', params);

//TODO 根据业务自行添加

export { queryTable };