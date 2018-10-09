const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const perfil = 'concessionaire'

const extractStyles = new ExtractTextPlugin('[name].css')

process.noDeprecation = true

module.exports = {
  entry: {
    main: './src/main.ts',
    vendor1: ['vue', 'vuex', 'vue-router', 'axios']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
//    publicPath: `<?php echo dirname($this->staticUrl)?>/dashboard/concessionaire/`,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractStyles.extract({
          use: ['css-loader'],
          fallback: 'style-loader',
          allChunks: true
        })
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: 'vue-style-loader!css-loader!stylus-loader?paths=src/'
          },
          esModule: true
        }
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.(js)$/,
                // loaders: ['eslint-loader'],
        loader: 'standard-loader',
        exclude: /node_modules/,
        options: {
                    // Emit errors instead of warnings (default = false)
          error: false,
                    // other config options to be passed through to standard e.g.
          parser: 'babel-eslint'
        }
      },
      {
        test: /(fonts|img)\/.*\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /icons\/.*\.svg$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
                { removeDimensions: true }
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.json', '.ts', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        default: {
          use: [require('rupture')()]
        }
      }
    }),
    //new CleanWebpackPlugin([`*`], {root: `${neoautoWebUrl}/public/neoauto3/public/static/dashboard/${perfil}/`}),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      //filename: `${neoautoWebUrl}/application/modules/micuenta/views/scripts/index/index.phtml`
    }),
    new FriendlyErrorsPlugin(),
    extractStyles,
    new CopyWebpackPlugin([
      {from: './src/static/fonts', to: 'static/fonts'}
    ])
  ]
}

// module.exports.plugins = (module.exports.plugins || []).concat([
//   new webpack.DefinePlugin({
//     'process.env': {
//       // NODE_ENV: (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'pre') ? '"production"' : `"${process.env.NODE_ENV}"`,
//       // NODE_PATHS: `'${JSON.stringify(paths[process.env.NODE_ENV])}'`
//     }
//   })
// ])

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'pre') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
