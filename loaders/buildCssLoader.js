const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (isDev) => {
  return {
    test: /\.s[ac]ss$/i,
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
          ]
        ],
        plugins: [isDev ? "babel-plugin-transform-scss" : MiniCssExtractPlugin.loader],
      },
    },
  };
};