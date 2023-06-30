const { merge } = require('webpack-merge');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const os = require('os');
process.env.NODE_ENV = 'development';
const baseConfig = require('./webpack.base.config');
const profile = require(path.resolve(process.cwd(), `late.config`));
const config = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), `${profile.outputDir}`),
    publicPath: profile.publicPath,
  },
  devtool: 'eval-source-map',
  devServer: {
    ...profile.devServer,
  },
  cache: {
    type: 'memory',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096,
        async: false,
      },
    }),
    new ESLintPlugin({
      fix: true,
      context: path.resolve(process.cwd(), `src`),
      lintDirtyModulesOnly: true,
      extensions: ['.ts', '.tsx'],
      threads: os.cpus().length,
    }),
  ],
};

module.exports = merge(baseConfig, config);
