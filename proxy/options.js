import config from '../utils/config';
import { isDev } from '../utils/util';
// import { captureException } from '../utils/sentry';

const onError = (err, req, res) => {
  // captureException(err, {
  //   extra: {
  //     method: req.method,
  //     statusCode: res.statusCode,
  //     path: req.url,
  //   },
  // });
  // console.log(err, {
  //   extra: {
  //     method: req.method,
  //     statusCode: res.statusCode,
  //     path: req.url,
  //   },
  // });
};

const onProxyRes = (proxyRes, req) => {
  if (proxyRes.statusCode >= 400) {
    // captureException(`${proxyRes.req.path} onProxyRes`, {
    //   req,
    //   extra: {
    //     method: req.method,
    //     statusCode: proxyRes.statusCode,
    //     path: proxyRes.req.path,
    //   },
    // });
    // console.log(`${proxyRes.req.path} onProxyRes`, {
    //   req,
    //   extra: {
    //     method: req.method,
    //     statusCode: proxyRes.statusCode,
    //     path: proxyRes.req.path,
    //   },
    // });
  }
};

const proxyTimeout = isDev() ? 30000 : 15000;

const options = {
  targets: {
    '/f/api/(.*)': {
      target: config.MY_API,
      changeOrigin: true,
      proxyTimeout,
      onProxyRes,
      onError,
      pathRewrite: {
        '/f/api': '',
      },
    },
  },
};

export default options;
