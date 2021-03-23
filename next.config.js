const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const webpack = require('webpack');
const serverConfig = require('./utils/config');
const {ANALYZE} = process.env;

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {};
  require.extensions['.less'] = (file) => {};
}

const config = withCss({
  ...withLess({
    serverRuntimeConfig: {
    },
    publicRuntimeConfig: {
    },
    crossOrigin: 'anonymous',
    cssModules: true,
    distDir: 'dist',
    generateEtags: false,
    cssLoaderOptions: {
      modules: true,
      camelCase: 'only',
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      plugins: [
        require('less-plugin-functions')
      ],
    },
    webpack(config, {isServer}) {
      if (ANALYZE) {
        const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
  
        config.plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }));
      }
  
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      });
      let envConfig = {
        B_API: '"/f/api"',
      };
      if (isServer) {
        Object.keys(envConfig).forEach((key) => {
          envConfig[key] = JSON.stringify(serverConfig[key]);
        });
      }
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            ...envConfig,
            API_ENV: JSON.stringify(process.env.API_ENV),
          },
        })
      );
      return config;
    },
  }),
  cssLoaderOptions: {
    modules: false,
  },
});
module.exports = config;
