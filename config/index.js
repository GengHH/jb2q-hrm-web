/*
 * @Author: GengHH
 * @Date: 2020-11-25 10:46:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-19 17:52:08
 * @Description: 各个环境的相关配置
 * @FilePath: \jb2q-hrm-web\config\index.js
 */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/ggzp-shrs/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'svg'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8089,
    autoOpenBrowser: true,
    assetsRoot: path.resolve(__dirname, '../dev'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/ggzp-shrs',
    proxyTable: {
      //本地开发机器（开发机器同时启动前后台项目）
      '/api': {
        target: 'http://localhost:8080/ggzp-sjapp-shrs',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      //本地开发的后台机器（nginx指向单独的一台测试机）
      '/new-common-api': {
        target: 'http://localhost:8080/new-common-api',
        //target: '10.5.102.154:8080/new-pers-api',
        changeOrigin: true,
        pathRewrite: {
          '^/new-common-api': '' 
        }
      },
      '/new-pers-api': {
        target: 'http://localhost:8099/new-pers-api',
        //target: '10.5.102.154:8080/new-pers-api',
        changeOrigin: true,
        pathRewrite: {
          '^/new-pers-api': ''
        }
      },
      '/new-corp-api': {
        target: 'http://localhost:8099/new-corp-api',
        //target: process.env.VUE_APP_BASE_URL + '/new-corp-api',
        changeOrigin: true,
        pathRewrite: {
          '^/new-corp-api': ''
        }
      },
      '/new-admin-api': {
        target: 'http://localhost:8080/ggzp-ywjb-shrs',
        //target: process.env.VUE_APP_BASE_URL + '/new-corp-api',
        changeOrigin: true,
        pathRewrite: {
          '^/new-admin-api': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
