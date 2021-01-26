/*
 * @Author: GegnHH
 * @Date: 2020-12-02 18:23:36
 * @LastEditTime: 2021-01-26 10:40:18
 * @LastEditors: GengHH
 * @Description: 自定义的pl-table（源于el-table的二次封装）以及其他的组件参数配置
 * @FilePath: \jb2q-hrm-web\src\config\plComponents.js
 */

//将需要使用的UI组件，绑定成一个vue插件，在每个入口js文件进行引入和安装

export default {
  install: function(Vue, opts = {}) {
    Vue.prototype.$PlElement = {
      tableConfig: opts.tableConfig || {
        stripe: true,
        border: true,
        highlightCurrentRow: true
      },
      pageConfig: opts.pageConfig || {
        background: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        'page-sizes': [1, 10, 20, 50, 100],
        pageSize: 10
      },
      selectConfig: opts.selectConfig || {
        filterable: true,
        clearable: true,
        'default-first-option': true
      },
      inputConfig: opts.inputConfig || { clearable: true, trim: true },
      dateConfig: opts.dateConfig || {},
      formConfig: opts.formConfig || {}
    };
  }
};
