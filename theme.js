const et = require('element-theme');

// 第一步生成样式变量文件 (注意：element-theme依赖的gulp版本是3.x,需要node<12才能运行；但是要根据node-sass版本选择合适的node.js版本)
//et.init('./src/theme.scss');
// 第二步根据实际需要修改该文件
// ...
// 第三步根据该文件编译出自定义的主题样式文件
et.run({
  config: './src/theme.scss',
  out: './src/theme',
  minimize: true, // 压缩文件
  browsers: ['ie >= 9', 'last 2 versions'] // 浏览器支持
});
