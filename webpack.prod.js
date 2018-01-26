const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractSCSS = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractSCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              outputPath: 'dist/',
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              outputPath: 'dist/',
            },
          }],
        }),
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
    new OptimizeCssAssetsPlugin(),
    new HtmlCriticalPlugin({
      base: path.join(path.resolve(__dirname), 'dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
});
