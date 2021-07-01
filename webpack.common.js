const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  target: "electron-renderer",
  devServer: {
    publicPath: "/build",
    port: 8080,
    proxy: {
      "/**": "http://localhost:3000",
    },
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
};
