var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'example/snabbdom/script.js'),
  output: {
    path: path.resolve(__dirname, 'example/snabbdom'),
    filename: 'build.js',
    library: 'pra'
  },
  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  }
}