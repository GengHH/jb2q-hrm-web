/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:45:12
 * @LastEditors: GengHH
 * @LastEditTime: 2021-02-26 11:07:41
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\config\prod.conf.js
 */
/**
 * Created by GengHH on 2020/11/25.
 */

const config = {
  mock: false, // 生产环境关闭mock
  apiUrl: '//localhost:8081',
  uploadUrl: '//localhost:8085',
  socketUrl: 'https://socket.sndraw.com',
  defaultImgUrl: '//localhost:8085/static/default.jpg',
  personBasePath: '/pers-api',
  corpBasePath: '/corp-api'
};

export default config;
