const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/index.js',
    devServer: {
        port: 8090,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader:'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'collapsed',
                            prependData: '$env: ' + process.env.NODE_ENV + ';',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            limit: 8192
                        }
                    }
                ]
            }
            ,
            {
                // Load all icons
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: './index-auth.html',
            inject: true,
			filename: './index-auth.html'
        }),
        new HtmlWebpackPlugin({
            template: './index-auth-step-1.html',
            inject: true,
			filename: './index-auth-step-1.html'
        }),
        new HtmlWebpackPlugin({
            template: './index-auth-step-2.html',
            inject: true,
			filename: './index-auth-step-2.html'
        }),
        new HtmlWebpackPlugin({
            template: './index-auth-step-3.html',
            inject: true,
			filename: './index-auth-step-3.html'
        }),
        new HtmlWebpackPlugin({
            template: './forgot.html',
            inject: true,
			filename: './forgot.html'
        }),
        new HtmlWebpackPlugin({
            template: './auth-success.html',
            inject: true,
			filename: './auth-success.html'
        }),
        new HtmlWebpackPlugin({
            template: './personal-index.html',
            inject: true,
			filename: './personal-index.html'
        }),
        new HtmlWebpackPlugin({
            template: './reviews.html',
            inject: true,
			filename: './reviews.html'
        }),
        new HtmlWebpackPlugin({
            template: './photoes.html',
            inject: true,
			filename: './photoes.html'
        }),
        new HtmlWebpackPlugin({
            template: './404.html',
            inject: true,
			filename: './404.html'
        }),
        new HtmlWebpackPlugin({
            template: './favourites.html',
            inject: true,
			filename: './favourites.html'
        }),
        new HtmlWebpackPlugin({
            template: './wish-list.html',
            inject: true,
			filename: './wish-list.html'
        }),
        new HtmlWebpackPlugin({
            template: './tickets.html',
            inject: true,
			filename: './tickets.html'
        }),
        new HtmlWebpackPlugin({
            template: './orders.html',
            inject: true,
			filename: './orders.html'
        }),
        new HtmlWebpackPlugin({
            template: './bonuses.html',
            inject: true,
			filename: './bonuses.html'
        }),
        new HtmlWebpackPlugin({
            template: './settings.html',
            inject: true,
			filename: './settings.html'
        }),
        new HtmlWebpackPlugin({
            template: './upload.html',
            inject: true,
			filename: './upload.html'
        }),
        // new HtmlWebpackPlugin({
        //     template: './list.html',
        //     inject: true,
        //     filename: './list.html'
        // }),
    ]
};
