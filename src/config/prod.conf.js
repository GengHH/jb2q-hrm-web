/*
 * @Author: GengHH
 * @Date: 2020-11-25 17:45:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-27 17:00:05
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
  commonBasePath: '/ggzp-zzjb-shrs',
  personBasePath: '/ggzp-zzjb-shrs',
  corpBasePath: '/ggzp-zzjb-shrs',
  adminBasePath: '/ggzp-ywjb-shrs',
  loginBasePath: 'https://j2testzzjb.rsj.sh.cegn.cn'
};

export default config;
