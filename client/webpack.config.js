const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const extensions = [".js", ".jsx"];

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.jsx",
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build"),
  },
  resolve: { extensions },
  devServer: {
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-react", { runtime: "automatic" }]],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path:'./.env'
    }),
    new EslintWebpackPlugin({ extensions }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/logo192.png",
      filename:'./index.html'
    }),
  ],
  stats: "minimal",
};
