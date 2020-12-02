const getters = {
  // sidebar: state => state.app.sidebar,
  // iframe: state => state.app.iframe,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  city: state => state.user.city,
  region: state => state.user.region,
  college_city: state => state.user.college_city,
  college_region: state => state.user.college_region,
  loginType: state => state.user.login_type,
  center: state => state.user.center,
  loginStatus: state => state.user.login_status,
  loginTime: state => state.user.login_time,
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
  occupation: state => state.dataDictionary.occupation
};
export default getters;
