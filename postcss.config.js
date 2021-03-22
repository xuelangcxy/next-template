/* eslint-disable */
module.exports = {
  plugins: [
    require('./lib/postcss-px-to-vh')(),
    require('./lib/postcss-px-to-viewport')({
      viewportWidth: 375,
      viewportUnit: 'vmin',
      // propertyBlacklist: [],
      minPixelValue: 2,
      mediaQuery: false,
      selectorBlackList:['.ignore-px'],
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    }),
  ],
};
