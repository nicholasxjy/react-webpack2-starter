const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (options = {}) => {
  return {
    entry: {
      vendor: './src/vendor',
      index: './src/index'
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: options.dev ? '[name].js' : '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.scss$/,
          use: [{ loader: 'style-loader'}, { loader: 'css-loader'}, { loader: 'sass-loader'}]
        }
      ]
    },
    resolve: {
      alias: {
        'react$': resolve(__dirname, './node_modules/react/dist/react.min.js'),
        'react-dom$': resolve(__dirname, './node_modules/react-dom/dist/react-dom.min.js'),
        '~': resolve(__dirname, 'src'),
        'sass': resolve(__dirname, 'src', 'sass')
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html')
      })
    ],
    devServer: {
      port: 9000
    }
  }
}
