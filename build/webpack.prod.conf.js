var path = require("path");
var utils = require("./utils");
//var webpack = require('webpack')
//var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require("../config");
var merge = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.conf");
var CopyWebpackPlugin = require("copy-webpack-plugin");
//清理输入文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//vue-loavder15,必须使用次插件才能运行
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// css、js压缩、优化插件
var TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

var webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: false
    }),
  },
  devtool: config.build.productionSourceMap ? "#source-map" : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath, //静态文件目录，如果网站路径直接指到dist目录，请注意改为/
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[name].[chunkhash].js"),
  },
  plugins: [
    //清空老的dist文件夹
    new CleanWebpackPlugin(),

    //分离css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: utils.assetsPath('css/[name].[hash:7].css'),
      //filename: utils.assetsPath('css/[name].[contenthash].css')
      //chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order

    }),

    // keep module.id stable when vendor modules does not change
    //new webpack.HashedModuleIdsPlugin(),

    //拷贝静态文件
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"],
      },
    ]),

    // vue-loader15.x需要配合这个 webpack 插件才能正确使用
    new VueLoaderPlugin(),
  ].concat(utils.htmlPlugin()),
  //webpack4自带的优化属性
  optimization: {
    minimize: true, //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle。即true代表默认使用TerserPlugin插件
    // minimizer:  [new UglifyJsPlugin()], 用TerserPlugin替换，来解决UglifyJsPlugin压缩js报错的问题
    minimizer: [
      new TerserPlugin({ // 压缩js
        cache: true,
        parallel: true,
        sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
        extractComments: false //不提取注释，即生成LICENSE.txt文件
      }),
      new OptimizeCSSPlugin({ // 压缩css
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
    runtimeChunk: {
      //name: (entrypoint) => `runtime~${entrypoint.name}`,
      name: "manifest"
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
});

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
