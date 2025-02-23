const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path                 = require('node:path');

module.exports = (env) => {
  let outputPath = path.resolve(__dirname, "public");

  return {
    mode: (env.production) ? 'development' : 'production',
    entry: path.resolve(__dirname, "src/js/main.js"),
    watch: (!env.production),
    watchOptions: {
      ignored: '**/node_modules',
      aggregateTimeout: 400,
    },
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'src/'),
        three$: path.resolve('./src/js/three.js'),
        '../../../build/three.module.js': path.resolve('./src/js/three.js')
      }
    },
    output: {
      path: outputPath,
      filename: "assets/[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              defaultExport: true,
              publicPath: path.join(outputPath, 'assets')
            }
          }, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      // new BundleAnalyzerPlugin()
    ],
    optimization: {
      minimize: true,
      usedExports: true,
      sideEffects: true,
      providedExports: true,
      removeAvailableModules: true,
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          },
        }
      }
    }
  };
};
