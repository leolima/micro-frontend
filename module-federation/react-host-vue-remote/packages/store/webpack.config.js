const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require('./package.json').dependencies;

module.exports = () => {
  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./dist"),
      publicPath: "http://localhost:9004/",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "./dist"),
      },
      compress: true,
      port: 9004,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js"],
    },
    module: {
      rules: [
          {
            test: /\.js?$/,
            loader: require.resolve('babel-loader'),
          },
      ]
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "StoreApp",
        filename: 'remoteEntry.js',
        exposes: {
          './store': './src/store'
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom']
          }
        }
      }),
    ],
  };
};
