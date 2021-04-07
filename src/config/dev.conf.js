/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:45:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-06 14:22:36
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\config\dev.conf.js
 */
/**
 * Created by GengHH on 2020/11/25.
 */

const config = {
  // mock数据模拟，设置为true自动加载并合并mock.conf.js中的mock配置，api => /mock-pers-api/xxx/xxx 请求指向mock数据（默认指向src/mock文件夹）
  // 设置为false ,所有的api => /new-pers-api/xxx/xxx调用都是请求后台服务器
  mock: true,
  apiUrl: '//localhost:8089',
  uploadUrl: '//localhost:8085',
  socketUrl: '//localhost:9099',
  defaultImgUrl: '//localhost:8085/static/default.jpg',
  commonBasePath: '/new-common-api',
  personBasePath: '/new-pers-api',
  corpBasePath: '/new-corp-api',
  adminBasePath: '/new-admin-api',
  loginBasePath: 'http://localhost:8089'
};
export default config;
