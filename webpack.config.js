const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, 'src-3d', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build', '3d')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build', '3d'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src-3d', 'index.html'), to: 'index.html' },
        { from: path.resolve(__dirname, 'src-3d', 'fonts'), to: 'fonts' }
      ]
    })
  ]
}
