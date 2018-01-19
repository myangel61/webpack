const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractSCSS = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 5000
  },
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
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
              sourceMap: true,
              outputPath: 'dist/'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputPath: 'dist/'
            }
          }]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractSCSS({
      filename: 'css/[name].[hash].css',
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname,'src','fonts'),
      to: 'fonts'
    }])
  ],
}


