const buildCssLoader = require('./loaders/buildCssLoader');
const buildBabelLoader = require('./loaders/buildBabelLoader');
/**
 *
 * @param options : BuildOptions
 * @returns {[{test: RegExp, type: string},{test: RegExp, use: string},{test: RegExp, use: {loader: string, options: {presets: string[], plugins: ([string,{isTsx}]|string)[]}}, exclude: RegExp},{test: RegExp, use: {loader: string, options: {presets: string[], plugins: ([string,{isTsx}]|string)[]}}, exclude: RegExp},{test: RegExp, use: [string,{loader: string, options: {modules: {auto: (function(string): boolean), localIdentName: string}}},{loader: string}]}]}
 */
module.exports = (options) => {
    const {isDev} = options;
    const cssLoader = buildCssLoader(isDev);
    const codeBabelLoader = buildBabelLoader({...options, isTsx: false});
    const tsxBabelLoader = buildBabelLoader({...options, isTsx: true});
    const fileLoader = {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|json)$/,
        type: 'asset/resource',
    };
    const svgLoaderURL = {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
    };
    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: {not: [/url/]}, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
    }

    return [fileLoader, svgLoader, svgLoaderURL, codeBabelLoader, tsxBabelLoader, cssLoader];
};
