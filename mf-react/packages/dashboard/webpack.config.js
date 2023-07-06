const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:9005/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                } 
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new ModuleFederationPlugin({
            name: 'DashboardApp',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardPage': './src/bootstrap'
            },
            remotes: {
                StoreApp: "StoreApp@http://localhost:9004/remoteEntry.js",
            },
            shared: {
                ...deps,
                vue: {
                  eager: true,
                  singleton: true,
                  requiredVersion: deps.vue,
                  strictVersion: true,
                },
            },
        })
    ],
    resolve: {
        alias: {
            'vue': '@vue/runtime-dom'
        },
        extensions: ['.*', '.js', '.vue', '.json']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist")
        },
        compress: true,
        port: 9005,
        historyApiFallback: true
    }
}