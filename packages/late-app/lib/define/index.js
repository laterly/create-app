const path = require("path");
const defaultConfig = {
  publicPath: "/", //开发或生产环境服务的公共基础路径
  outputDir: "dist", //生成的生产环境构建文件的目录
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), `src`),
    },
    extensions: [".ts", ".tsx", ".jsx", ".json", ".js", ".sass", ".scss"],
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
    host: "0.0.0.0",
    // https: true,
    client: {
      logging: "none",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  env: {},
  lessOptions: {},
  sassOptions: {},
};
/**
 * @param config  {Object} 配置对象config
 * @param config.publicPath {String}  部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致
 * @param config.outputDir {String} 生成的生产环境构建文件的目录
 * @param config.resolve {Object} webpack resolve配置
 * @param config.resolve.alias {Object} 使用文件系统路径的别名
 * @param config.resolve.extensions {Array} 导入时想要省略的扩展名列表
 * @param config.devServer {Object}  所有 webpack-dev-server 的选项都支持
 * @param config.lessOptions {Object} 同less-loader的lessOptions配置一样
 * @param config.sassOptions {Object} sass-loader的配置
 * @param config.env {Object} env的配置
 */
function defineConfig(config) {
  return {
    ...defaultConfig,
  };
}

module.exports = {
  defineConfig,
};
