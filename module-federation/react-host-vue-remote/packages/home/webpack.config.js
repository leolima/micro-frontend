const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:9002/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist")
        },
        compress: true,
        port: 9002,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [require.resolve('@babel/preset-react')]
                }
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            title: 'App'
        }),
        new ModuleFederationPlugin({
            name: 'HomeApp',
            filename: 'remoteEntry.js',
            exposes: {
                './HomePage': './src/Home'
            },
            remotes: {
                //StoreApp: "StoreApp@http://localhost:9004/remoteEntry.js",
                StoreNanoApp: "StoreNanoApp@http://localhost:9006/remoteEntry.js",
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
                },
                '@nanostores/react': {
                    singleton: true,
                    requiredVersion: deps['@nanostores/react']
                }
              }
        })
    ]
}