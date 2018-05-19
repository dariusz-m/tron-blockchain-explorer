const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "style-[md5:contenthash:hex:20].css",
            allChunks: true
        }),
        new UglifyJSPlugin(),
    ],
    output: {
        filename: '[name].bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    name: "vendors",
                    chunks: "all",
                },
            }
        }
    }
});
