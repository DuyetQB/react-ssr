const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    client: './src/index.js',
    bundle: './assets/bundle.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js"
  },
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
 }
}
