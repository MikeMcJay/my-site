const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        'pages/config': './src/config.js',
        'pages/homepage': './src/homepage.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/bundles'),
        chunkFilename: '[id].[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    'css-loader'
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./styles/[name].css"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        })
    ],
}