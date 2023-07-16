import { type Configuration } from "webpack";
import { merge } from "webpack-merge";
import path from "path";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import os from "os";
//@ts-ignore
process.env.NODE_ENV = "development";
import baseConfig from "./base.config";
const profile = require(path.resolve(process.cwd(), `late.config`));

const config: Configuration = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), `${profile.outputDir}`),
    publicPath: profile.publicPath,
  },
  devtool: "eval-source-map",
  // ignoreWarnings: [/default\-exporting/], // 过滤json命名导出警告
  // infrastructureLogging: {
  //   level: "error",
  // },
  cache: {
    type: "memory",
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096,
      },
    }),
    new ESLintPlugin({
      fix: true,
      context: path.resolve(process.cwd(), `src`),
      lintDirtyModulesOnly: true,
      extensions: [".ts", ".tsx"],
      threads: os.cpus().length,
    }),
  ],
};
//@ts-ignore
export default merge(baseConfig, config);
