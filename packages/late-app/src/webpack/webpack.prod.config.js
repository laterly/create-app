const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
process.env.NODE_ENV = 'production';
const baseConfig = require('./webpack.base.config');
const profile = require(path.resolve(process.cwd(), `late.config`));
const config = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(process.cwd(), `${profile.outputDir}`),
    publicPath: profile.publicPath,
    clean: true,
  },
  devtool: false, //eval-source-map
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new JsonMinimizerPlugin(),
      new TerserWebpackPlugin({
        parallel: 4,
        extractComments: false, //设为 false 就可以去除所有注释。
        terserOptions: {
          compress: process.env.IS_LOCAL
            ? {
                drop_console: true, // 删除所有调式带有console的
                drop_debugger: true,
                pure_funcs: ['console.log'],
              }
            : {}, //可以设置我们想要去除的函数，将代码中所有 console.log 去除
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          priority: -20, //优先级，权限更高，优先抽离
          name: 'vendors', //chunk命名
          test: /[\\/]node_modules[\\/]/, //匹配正则
          chunks: 'all',
          minSize: 0, //公共模块的大小限制,以 bytes 为单位
          minChunks: 1, //公共模块最少复用几次
        },
        //分割不经常改变而且比较大的包的第三方库
        defaultVendors: {
          priority: -10,
          name: 'default-vendors',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|styled-components|classnames|react-i18next|i18next|mobx-react|mobx|mqtt|antd|moment|lodash)[\\/]/,
          chunks: 'all',
          minSize: 0,
          minChunks: 1,
        },
        //分割公共模块包
        commons: {
          priority: 0,
          name: 'commons',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minSize: 100,
          minChunks: 2,
        },
      },
    },
  },
  // cache: {
  //   type: 'filesystem',
  //   allowCollectingMemory: true,
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash:8].css`,
    }),
  ],
};
//用于打包分析优化
if (process.env.IS_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}
if (process.env.IS_LOCAL) {
  config.cache = {
    type: 'filesystem',
    allowCollectingMemory: true,
  };
}

module.exports = merge(baseConfig, config);
