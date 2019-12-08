const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/index.js',
    about: './src/pages/about/index.js',
    news: './src/pages/news/index.js',
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name].[chunkhash].js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // eslint-disable-next-line arrow-body-style
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? '[name].[hash].js' : '[name]/[name].[hash].js'
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // добавили минификацию CSS
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./src/images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true
            }
          },
        ],
      }

    ]
  },

  plugins: [
    new MiniCssExtractPlugin({ //
      filename: 'index.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/news/index.html',
      filename: 'news/index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/pages/about/index.html',
      filename: 'about/index.html',
    }),

    new WebpackMd5Hash()
  ]
};
