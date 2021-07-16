/*
 * @Author: GengHH
 * @Date: 2020-11-30 11:50:54
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-16 13:23:56
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\utils\vueAxios.js
 */
/**
 * Created by GengHH on 2020/11/29
 * 定制axios的安装器(vue插件)，将axios绑定到vue的属性上
 */
const VueAxios = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install(Vue, router = {}, instance) {
    // console.log('--------------------------begin install--------------------');
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install axios');
      return;
    }

    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get() {
          return instance;
        }
      },
      $http: {
        get: function get() {
          return instance;
        }
      }
    });

    Vue.axios = instance;
    Vue.$http = instance;
  }
};

export {
  VueAxios
  // eslint-disable-next-line no-undef
  //instance as axios
};
