import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import Webpackbar from "webpackbar";
import Happypack from "happypack";
import { commonCssLoader } from "./utils/index";
const profile = require(path.resolve(process.cwd(), `late.config`));
const env = process.env.NODE_ENV;

export default {
  entry: {
    app: [path.resolve(process.cwd(), `src/main.tsx`)],
  },
  target: "web",
  resolve: profile.resolve || {},
  stats: "errors-warnings",
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: "happypack/loader",
        },
      },
      {
        oneOf: [
          {
            test: /\.s[ca]ss$/,
            use: [
              ...commonCssLoader,
              {
                loader: "sass-loader",
                options: profile.sass || {},
              },
            ],
          },
          {
            test: /\.less$/i,
            use: [
              ...commonCssLoader,
              {
                loader: "less-loader",
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
            loader: "html-loader",
            options: {
              minimize: false,
            },
          },
          {
            test: /\.json$/i,
            type: "asset/resource",
          },
          {
            test: /\.(png|jpeg|jpg|gif|webm|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename:
                env == "development"
                  ? `images/[name].[ext]`
                  : `images/[name][contenthash:8].[ext]`,
            },
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aa)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename:
                env == "development"
                  ? `media/[name].[ext]`
                  : `media/[name][contenthash:8].[ext]`,
            },
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
            generator: {
              filename:
                env == "development"
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
      name: "Client",
    }),
    new Happypack({
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(profile.env),
    }),
    // 忽略 moment 下的 /locale 目录
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(process.cwd(), `public/index.html`),
      inject: true,
      minify: true,
    }),
  ],
};
