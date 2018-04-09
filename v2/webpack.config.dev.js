var webpack = require('webpack');

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var htmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //分离css


module.exports = {
    entry: {
        build: './app/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.css', '.less', '.vue'],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                loaders: ['vue-loader'],
                exclude: '/node_modules/'
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader'],
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/version/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    devServer: {},
    context: path.resolve('./'),
    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        }),

        new CopyWebpackPlugin([{
            from: path.resolve('./static'),
            ignore: ['.*']
        }]),

        new ExtractTextPlugin("[name].css"),

        new htmlWebpackPlugin({
            title: '自诊工具',
            chunks: ['build'],
            template: './index.html',
        })
    ]
}