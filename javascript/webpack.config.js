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
        filename: '[name].js',
        path: path.resolve(App, '../public/react')
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
            {test: /\.gif$/, loader: "url-loader?limit=1&name=[name]/.[ext]"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[name].[ext]"},
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name]/[name].[ext]"
            },
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[name].[ext]"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[name].[ext]"},
            {test: /\.gif$/, loader: "url-loader?limit=1&name=[name]/[name].[ext]"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=1&name=[name]/[name].[ext]"},
            {test: /\.png$/, loader: "url-loader?limit=1&name=[name]/[name].[ext]"},
        ]
    },
    devServer:{
      proxy:{
          "/api":"http://localhost:9000"
      },
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
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
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ]
}