const path = require('path');

const { defineConfig } = require('./packages/late-app/src/define');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = defineConfig({
  publicPath: isDevelopment ? '/' : './', //开发或生产环境服务的公共基础路径
  outputDir: 'dist', //生成的生产环境构建文件的目录
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
    extensions: [
      '.ts',
      '.tsx',
      '.json',
      '.js',
      '.vue',
      '.sass',
      '.scss',
      '.less',
    ],
    modules: [
      // 优化模块查找路径
      path.resolve('src'),
      path.resolve('node_modules'), // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
    ],
  },
  //设置环境变量
  env: {},
  devServer: {},
  //less-laoder配置
  less: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  //sass-loader配置
  sass: {},
});
