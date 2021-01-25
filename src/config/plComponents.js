/*
 * @Author: GegnHH
 * @Date: 2020-12-02 18:23:36
 * @LastEditTime: 2021-01-25 18:03:18
 * @LastEditors: GengHH
 * @Description: 自定义的pl-table（源于el-table的二次封装）以及其他的组件参数配置
 * @FilePath: \jb2q-hrm-web\src\config\plComponents.js
 */

//将需要使用的UI组件，绑定成一个vue插件，在每个入口js文件进行引入和安装

export default {
  install: function(Vue, opts = {}) {
    Vue.prototype.$PlElement = {
      tableConfig: opts.tableConfig || {},
      pageConfig: opts.pageConfig || {},
      selectConfig: opts.selectConfig || {},
      inputConfig: opts.inputConfig || {},
      dateConfig: opts.dateConfig || {},
      formConfig: opts.formConfig || {}
    };
  }
};
