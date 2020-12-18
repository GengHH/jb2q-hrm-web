var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';
//根据环境来获取相应的productionSourceMap或者cssSourceMap
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

module.exports = {
  loaders: utils.cssLoaders({
    //是否开始sourceMap 用来调试
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    //是否单独提取抽离css
    extract: isProduction
  }),
  //记录压缩的代码，用来找到源码位置
  cssSourceMap: sourceMapEnabled,
  //是否缓存破坏
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
