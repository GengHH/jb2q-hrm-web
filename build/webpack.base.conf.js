var path = require("path");
var utils = require("./utils");
var config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
//提取css
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  entry: utils.entries(),
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      pages: resolve("src/pages"),
      components: resolve("src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     process.env.NODE_ENV !== 'production'
      //       ? 'vue-style-loader'
      //       : MiniCssExtractPlugin.loader,
      //     'css-loader'
      //   ]
      // }, {
      //   test: /\.scss$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // },
      {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'audios/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      }, {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'videos/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")],
        exclude: /node_module/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
};
