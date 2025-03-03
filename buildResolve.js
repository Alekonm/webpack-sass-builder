const path = require('path');
/**
 *
 * @param buildOptions : BuildOptions
 * @returns {{extensions: string[], preferAbsolute: boolean, alias: {cldr$: string, globalize$: string, cldr: string, globalize: string}, mainFiles: string[], modules: (*|string)[]}}
 */
module.exports = (buildOptions) => {
  return {
    extensions: ['.js', '.ts', '.tsx'],
    preferAbsolute: true,
    modules: [buildOptions.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
    /*  globalize$: path.resolve(buildOptions.paths.nodeModules, 'globalize/dist/globalize.js'),
      globalize: path.resolve(buildOptions.paths.nodeModules, 'globalize/dist/globalize'),
      cldr$: path.resolve(buildOptions.paths.nodeModules, 'cldrjs/dist/cldr.js'),
      cldr: path.resolve(buildOptions.paths.nodeModules, 'cldrjs/dist/cldr'),*/
    },
  };
};
