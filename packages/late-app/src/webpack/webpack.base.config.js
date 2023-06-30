const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Webpackbar = require('webpackbar');
const { commonCssLoader } = require('./utils/index');
const profile = require(path.resolve(process.cwd(), `late.config`));
const env = process.env.NODE_ENV;
module.exports = {
  entry: {
    app: [path.resolve(process.cwd(), `src/main.tsx`)],
  },
  target: 'web',
  resolve: profile.resolve || {},
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-spread',
            ],
          },
        },
      },
      {
        oneOf: [
          {
            test: /\.s[ca]ss$/,
            use: [
              ...commonCssLoader,
              {
                loader: 'sass-loader',
                options: profile.sass || {},
              },
            ],
          },
          {
            test: /\.less$/i,
            use: [
              ...commonCssLoader,
              {
                loader: 'less-loader',
                options: profile.less,
              },
            ],
          },
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          {
            test: /\.json$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(png|jpeg|jpg|gif|webm|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename:
                env == 'development'
                  ? `images/[name].[ext]`
                  : `images/[name][contenthash:8].[ext]`,
            },
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aa)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename:
                env == 'development'
                  ? `media/[name].[ext]`
                  : `media/[name][contenthash:8].[ext]`,
            },
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename:
                env == 'development'
                  ? `fonts/[name].[ext]`
                  : `fonts/[name][contenthash:8].[ext]`,
            },
          },
        ],
      },
    ],
    // noParse: /lodash/
  },
  plugins: [
    new Webpackbar({
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
    // new Happypack({
    //   loaders: [
    //     {
    //       loader: 'babel-loader'
    //     },
    //   ],
    // }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(profile.env),
    }),
    // 忽略 moment 下的 /locale 目录
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), `public/index.html`),
      inject: true,
      minify: true,
    }),
  ],
};
