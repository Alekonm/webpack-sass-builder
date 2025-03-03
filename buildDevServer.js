/**
 *
 * @param options : BuildOptions
 *
 * @returns {{proxy: {"/ui-api-web/": {changeOrigin: boolean, secure: boolean, target: string}}, historyApiFallback: boolean, port: number, hot: boolean, open: boolean}}
 */
module.exports = (options) => {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
      /*   proxy: {
   /*      '/dictionary/': {
             target: 'https://upp.innodev.local',
             secure: false,
             changeOrigin: true,
           },
    },*/
  };
};
