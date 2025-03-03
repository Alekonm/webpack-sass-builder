const buildPlugins = require('./buildPlugins');
const buildLoaders = require('./buildLoaders');
const buildDevServer = require('./buildDevServer');
const buildResolve = require('./buildResolve');
/**
 *
 * @param buildOptions : BuildOptions
 * @returns {{mode, devtool: (string|undefined), output: {path, filename: string}, devServer: ({proxy: {"/ui-api-web/": {changeOrigin: boolean, secure: boolean, target: string}}, historyApiFallback: boolean, port: number, hot: boolean, open: boolean}|undefined), entry: *, resolve: {extensions: string[], preferAbsolute: boolean, alias: {cldr$: string, globalize$: string, cldr: string, globalize: string}, mainFiles: string[], modules: (*|string)[]}, plugins: (HtmlWebpackPlugin|webpack.DefinePlugin|webpack.ProgressPlugin|MiniCssExtractPlugin|*)[], module: {rules: [{test: RegExp, type: string},{test: RegExp, use: string},{test: RegExp, use: {loader: string, options: {presets: string[], plugins: ([string,{isTsx}]|string)[]}}, exclude: RegExp},{test: RegExp, use: {loader: string, options: {presets: string[], plugins: ([string,{isTsx}]|string)[]}}, exclude: RegExp},{test: RegExp, use: [string,{loader: string, options: {modules: {auto: (function(string): boolean), localIdentName: string}}},{loader: string}]}]}}}
 */
module.exports = (buildOptions) => {
  const { mode, paths, isDev } = buildOptions;
  return {
    mode,
    entry: paths.entry,
    devtool: isDev ? 'inline-source-map' : undefined,
    optimization: {
      moduleIds: 'deterministic',
      usedExports: true,
      minimize: !isDev,
      removeAvailableModules: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 1024 * 1024,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          reactVendors: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-i18next)[\\/]/,
            name: 'reactVendors',
            chunks: 'all',
            reuseExistingChunk: true,
          },
          polyfillVendors: {
            test: /[\\/]node_modules[\\/](core-js)[\\/]/,
            name: 'polifillVendors',
            chunks: 'all',
            reuseExistingChunk: true,
          },
          designSystemVendors: {
            test: /[\\/]node_modules[\\/](@vtbhome)[\\/]/,
            name: 'designSystemVendors',
            chunks: 'all',
            reuseExistingChunk: true,
          },
          app: {
            test: /[\\/]src[\\/](app)[\\/]/,
            name: 'app',
            chunks: 'all',
          },
        },
      },
    },
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      publicPath: isDev ? '/' : 'auto',
    },
    plugins: buildPlugins(buildOptions),
    module: {
      rules: buildLoaders(buildOptions),
    },
    devServer: isDev ? buildDevServer(buildOptions) : undefined,
    resolve: buildResolve(buildOptions),
    infrastructureLogging: {
      level: mode === 'development' ? 'verbose' : 'info',
      debug: mode === 'development' ? [(name) => name.includes('webpack-dev-server')] : false,
    },
  };
};
