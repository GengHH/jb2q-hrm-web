/*
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: GengHH
 * @LastEditTime: 2021-01-07 11:25:43
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\config\dev.env.js
 */
var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
});
