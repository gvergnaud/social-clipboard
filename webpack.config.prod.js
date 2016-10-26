const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const baseConfig = require('./webpack.config.base.js')

module.exports = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  entry: [
    './src/app/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('main.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.resolve('src')
      },
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[hash:base64:5]!postcss-loader!sass?includePaths[]='
          + encodeURIComponent(path.resolve('src')))
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.gif$/, loader: 'file-loader' },
      { test: /\.(ttf|eot|woff)(\?[a-z0-9]+)?$/, loader: 'url-loader' },
    ]
  },
  postcss: () => [autoprefixer]
})
