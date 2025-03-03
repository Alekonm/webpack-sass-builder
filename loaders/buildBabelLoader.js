/**
 *
 * @param isTsx : boolean
 * @param isDev : boolean
 * @returns {{test: RegExp, use: {loader: string, options: {presets: string[], plugins: ([string,{isTsx}]|string)[]}}, exclude: RegExp}}
 */
module.exports = ({ isTsx, isDev }) => {
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            {
              "runtime": "automatic"
            }
          ]],
        plugins: [
          [
            '@babel/plugin-transform-typescript',
            {
              isTsx,
            },
          ],
          '@babel/plugin-transform-runtime',
        ],
      },
    },
  };
};
