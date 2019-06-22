const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ 
      loader: 'babel-loader', 
      test: /\.jsx?$/,
      exclude: /node_modules/ 
    },
    {
      test: /\.s?a?c?ss$/,
      use: [
        MiniCssExtractPlugin.loader, 
        'css-loader', 
        'sass-loader'
      ] // multiple loaders using an array
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: undefined,
          },
        },
      ],
    },
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/dist/'
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({ 
      filename: "style.css"
    })
  ], 
};