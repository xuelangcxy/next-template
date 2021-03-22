var postcss = require('postcss');
module.exports = postcss.plugin('postcss-px-to-vh', function (options) {
  return function (css) {
    css.walkDecls(function (decl) {
      const match=decl.value.match(/px2vh\((.+)\)/)
      if (match) {
        decl.value = 100 * parseFloat(match[1]) / 667 + 'vh';
      }
    });
  };
})
