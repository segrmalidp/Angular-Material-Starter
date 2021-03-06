var webpack = require('webpack');
var pluginHtml = require('html-webpack-plugin');
var pluginExtractText = require("extract-text-webpack-plugin");

var serverHost = '0.0.0.0';
var serverPort = 8888;
var __DEV__ = (process.env.NODE_ENV !== 'production');

module.exports = {
  devtool: __DEV__ ? 'eval-source-map' : 'eval',
  debug: __DEV__,
  context: __dirname + "/src",
  entry: {
    vendors: [
      'angular-material',
      'angular-material/angular-material.css',
      'animate.css'
    ],
    // Entry "src/app.js"
    app: [
      './app.js',
      'styles.css'
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "app.[chunkhash].js",
    hash: true
  },
  node: {
    fs: "empty"
  },
  devServer: {
    contentBase: __dirname + '/dist',
    info: true,
    inline: true,
    colors: true,
    host: serverHost,
    port: serverPort
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
      'node_modules',
      'src',
      'src/pages',
      'src/www/css',
      'src/www/js'
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['ng-annotate', 'babel-loader']
    },{
      test: /\.css$/,
      loader: pluginExtractText.extract("style-loader", "css-loader")
    },{
      test: /\.(eot|woff|ttf|svg|woff2)$/,
      loader: "file-loader"
    },{
      test: /\.html$/,
      loader: "ng-cache"
    },{
      test: /\.json$/,
      loader: "json-loader"
    },{
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
          'file?hash=sha512&digest=hex&name=[name].[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      chunks: ['vendors']
    }),

    new pluginHtml({
      title: 'Angular Material Starter',
      template: './src/index.html'
      // favicon: 'favicon.ico'
    }),

    new  pluginExtractText('[name].[chunkhash].css'),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ]
};
