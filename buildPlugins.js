const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
/**
 *
 * @param options : BuildOptions
 * @returns {(HtmlWebpackPlugin|webpack.DefinePlugin|webpack.ProgressPlugin|MiniCssExtractPlugin|*)[]}
 */
module.exports = (options) => {
  const { mode, isDev, paths, version } = options;
  const plugins = [
    new HtmlWebpackPlugin({ template: paths.html }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __VERSION__: JSON.stringify(version),
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      runtime: isDev,
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/locales', to: 'locales' },
      ],
    }),
  ];
  if (mode === 'development') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshPlugin());
  }

  return plugins;
};
