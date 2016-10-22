const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const baseConfig = require('./webpack.config.base.js')

const port = 3000

module.exports = Object.assign({}, baseConfig, {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'eval',
  entry: [
    `react-hot-loader/patch`,
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    `webpack/hot/only-dev-server`,
    './src/app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: `http://localhost:${port}/dist/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, path.join('src'))
      },
      { test: /\.scss$/,
        loader: 'style!css?module&localIdentName=[local]__[hash:base64:5]' +
          '&sourceMap!postcss-loader!sass?sourceMap&outputStyle=expanded' +
          '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, path.join('src')))
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
