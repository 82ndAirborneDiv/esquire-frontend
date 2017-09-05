'use strict';

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = function makeConfig(env) {
  return {
    devtool: 'cheap-module-source-map',
    entry: {
      app: paths.appIndexJs
    },

    output: {
      path: paths.appBuild,
      filename: 'bundle.js',
      chunkFilename: '[name].chunk.js',
      publicPath: paths.publicPath
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        paths.appNodeModules,
        paths.appSrc
      ]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: paths.appSrc
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'dist/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.jsx?$/,
              include: paths.appSrc,
              loader: 'react-hot-loader!babel-loader',
              exclude: /node_modules/
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      autoprefixer({
                        browsers: [
                          'last 2 versions'
                        ],
                      }),
                    ],
                  },
                },
              ],
            },
            {
              test: /\.scss$/,
              loader: 'sass-loader'
            },
            {
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              loader: 'file-loader',
              options: {
                name: 'dist/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
      }),

      new webpack.HotModuleReplacementPlugin(),

      new webpack.DefinePlugin(env)
    ],

    devServer: {
      compress: true,
      contentBase: paths.appPublic,
      watchContentBase: true,
      hot: true,
      host: '0.0.0.0',
      publicPath: paths.publicPath,
      overlay: false,
      historyApiFallback: true
    }
  }
};
