const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
 
module.exports = {
    mode: 'production',
    output :{
        clean: true,
        filename: 'main.[contenthash].js',
    },
    module: {
        rules: [
        {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {
            // Disables attributes processing
            minimize: false,
            sources: false,
            },
        },
        {
            test: /\.css$/i,
            exclude: /styles.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /styles.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                  loader: 'file-loader',
                  options: {
                    esModule: false,
                    name: 'assets/[name].[ext]'
                  }
                },
            ],
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              },
            },
        },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },



    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'},
            ],
        },
        ),
    ]
}


