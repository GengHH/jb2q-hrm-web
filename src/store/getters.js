/*
 * @Author: GengHH
 * @Date: 2020-12-02 16:57:19
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-23 10:19:58
 * @Description: 获取登录人的基本信息
 * @FilePath: \jb2q-hrm-web\src\store\getters.js
 */
const getters = {
  // sidebar: state => state.app.sidebar,
  // iframe: state => state.app.iframe,
  token: state => state.person.token,
  avatar: state => state.person.avatar,
  zjhm: state => state.person.zjhm,
  pid: state => state.person.pid,
  name: state => state.person.name,
  city: state => state.person.city,
  region: state => state.person.region,
  college_city: state => state.person.college_city,
  college_region: state => state.person.college_region,
  loginType: state => state.person.login_type,
  center: state => state.person.center,
  loginStatus: state => state.person.login_status,
  loginTime: state => state.person.login_time,
  matterDictionary: state => index =>
    state.dataDictionary.matterDictionary.items[index],
  matterDictionary_init: state => {
    if (
      state.dataDictionary.matterDictionary === null ||
      state.dataDictionary.matterDictionary === undefined ||
      state.dataDictionary.matterDictionary.length === 0
    ) {
      return true;
    }
  },
  provinceAreas: state => state.dataDictionary.provinceAreas,
  industry: state => state.dataDictionary.industry,
  occupation: state => state.dataDictionary.occupation,
  activeMenuIndex: state => state.index.activeMenuIndex,
  corpToken: state => state.corporation.token,
  cid: state => state.corporation.cid,
  dwmc: state => state.corporation.dwmc,
  tyshxym: state => state.corporation.tyshxym
};
export default getters;
