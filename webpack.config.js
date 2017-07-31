var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'build.js',
    library: 'Vue'
  },
  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  }
}