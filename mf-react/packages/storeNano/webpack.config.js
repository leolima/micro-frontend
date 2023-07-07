const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require('./package.json').dependencies;

module.exports = () => {
    return {
      entry: "./src/index.js",
      mode: "development",
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "http://localhost:9006/",
      },
      devServer: {
        static: {
          directory: path.join(__dirname, "./dist"),
        },
        compress: true,
        port: 9006,
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
          name: "StoreNanoApp",
          filename: 'remoteEntry.js',
          exposes: {
            './store': './src/store'
          },
        }),
      ],
    };
  };