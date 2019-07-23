const path = require('path')
;
const HWP = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
;

const App = __dirname
module.exports = {
    entry:
        {
            build: path.resolve(App, 'src/index.js')
        },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(App, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ]
            }
            ,
            {test: /\.gif$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name]/[hash].[ext]"
            },
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.gif$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
            {test: /\.png$/, loader: "url-loader?limit=1&name=[name]/[hash].[ext]"},
        ]
    },
    devServer:{
      proxy:{
          "/api":"http://192.168.86.28:9000"
      },
        port: 8080
    },
    plugins: [
        new HWP(
            {
                template: path.join(App, '/public/index.html')
            }
        ),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        }),
    ]
}