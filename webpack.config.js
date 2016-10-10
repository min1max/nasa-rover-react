const webpack = require('webpack');
const path = require('path');



/*var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');*/
/*var config = {
  entry: APP_DIR + '/index',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  }

};*/


var config = {
  devtool: 'eval',

  // Step 1: Source Maps
  // devtool: 'cheap-module-source-map',

  entry: './index',

  output: {
    //path: path.join(__dirname, 'dist'),
    path: path.resolve(__dirname, "dist"),
    //promjeni u link za production
    publicPath: '/dist',
    filename: 'bundle.js',
  },

  // Step 2: Node environment
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production')
  //     }
  //   })
  // ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader' }
    ]
  }
};

module.exports = config;