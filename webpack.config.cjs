const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
    let outputPath = path.resolve(__dirname, "public");

    let options = {
        mode: (env.production) ? 'development' : 'production',
        entry: path.resolve(__dirname, "src/js/main.js"),
        output: {
            path: outputPath,
            filename: "[name].bundle.js",
        },
        module:{
            rules: [
                {
                    test: /\.js$/,
                    use:  'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'src'),
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [new HtmlWebpackPlugin({
            template: 'src/index.html'
        })],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    }

    return options;
};
