const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require('./package.json').dependencies;

module.exports = () => {
  function lazyLoadRemote(remoteUrl, appName) {
    return `promise new Promise(resolve => {
        const script = document.createElement('script')
        script.src = '${remoteUrl}'
    
        console.log('lazyLoadRemote', script.src);
        script.onload = () => {
          const proxy = {
            get: (request) => window.${appName}.get(request),
            init: (arg) => {
              try {
                return window.${appName}.init(arg)
              } catch(e) {
                console.log('remote container already initialized', e)
              }
            }
          }
          resolve(proxy)
        }

        document.head.appendChild(script);
      })`;
  }

  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./dist"),
      publicPath: "http://localhost:9001/",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "./dist"),
      },
      compress: true,
      port: 9001,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("@babel/preset-react")],
          },
        },
        {
          test: /\.css?$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
        title: "App",
      }),
      new ModuleFederationPlugin({
        name: "App",
        remotes: {
          // HomeApp: "HomeApp@http://localhost:9002/remoteEntry.js",
          // ContactApp: "ContactApp@http://localhost:9003/remoteEntry.js",
          // StoreApp: "StoreApp@http://localhost:9004/remoteEntry.js",
          HomeApp: lazyLoadRemote('http://localhost:9002/remoteEntry.js', 'HomeApp'),
          ContactApp: lazyLoadRemote('http://localhost:9003/remoteEntry.js', 'ContactApp'),
          StoreApp: lazyLoadRemote('http://localhost:9004/remoteEntry.js', 'StoreApp'),
          DashboardApp: lazyLoadRemote('http://localhost:9005/remoteEntry.js', 'DashboardApp'),
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
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: deps['react-router-dom']
          }
        }
      }),
    ],
  };
};
