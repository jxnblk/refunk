const path = require('path')

module.exports = {
  entry: './entry.js',

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  resolve: {
    alias: {
      'funcup': path.join(__dirname, '../src')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  devServer: {
    historyApiFallback: true
  }
}
