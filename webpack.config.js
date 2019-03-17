const path = require('path')

module.exports = mode => ({
  mode,
  entry: './src',
  output: {
    filename: 'Bsale.js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'source-map'
})
