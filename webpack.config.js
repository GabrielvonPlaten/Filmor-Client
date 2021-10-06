const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
    chunkFilename: 'bundle.chunk.js',
  },
  module: {
    rules: [
      {
        use: ['babel-loader', 'ts-loader'],
        test: /\.ts|\.tsx$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?a?c?ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // multiple loaders using an array
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: undefined,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new Dotenv(),
  ],
};
