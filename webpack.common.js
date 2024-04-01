const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      index: './src/index.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Production',
        template: './src/index.html',
      }),
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'images/[name][ext]',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
  };