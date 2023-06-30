const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const commonCssLoader = [
  env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          ['postcss-preset-env', {
            // 配置 postcss-preset-env 的选项
            stage: 3,
            autoprefixer: {
              grid: true
            }
            // 其他选项...
          }]
        ]
      }
    }
  }
];

module.exports = { commonCssLoader };
