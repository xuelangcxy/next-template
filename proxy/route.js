/* eslint-disable max-depth */
/* eslint-disable no-restricted-syntax */
import httpProxy from 'http-proxy-middleware';
import k2c from 'koa2-connect';
import pathToRegexp from 'path-to-regexp';
import options from './options';
import { NO_PERMISSION } from '../utils/constant';

const whiteListMap = {
  '/f/api': [],
};

const finalWhiteList = [];
Object.keys(whiteListMap).forEach(prefix => {
  finalWhiteList.push(...whiteListMap[prefix].map(path => prefix + path));
});
const prefixList = Object.keys(whiteListMap);

export default async function(ctx, next) {
  const { targets = {} } = options;
  const { path } = ctx;
  for (const route of Object.keys(targets)) {
    if (pathToRegexp(route).test(path)) {
      if (prefixList.some(prefix => path.startsWith(prefix))) {
        if (finalWhiteList.indexOf(path) === -1) {
          ctx.body = {
            code: NO_PERMISSION,
            msg: '没有权限访问此接口',
          };
          return;
        }
        if (ctx.request.url.indexOf('?') === -1) {
          ctx.request.url += '?';
        }
        if (!ctx.request.url.endsWith('&') && !ctx.request.url.endsWith('?')) {
          ctx.request.url += '&';
        }
        if (ctx.request.url.indexOf('platform=node') === -1) {
          ctx.request.url += 'platform=node';
        }
        console.log(ctx.request.url);
      }
      // eslint-disable-next-line no-await-in-loop
      await k2c(httpProxy(targets[route]))(ctx, next);
      return;
    }
  }
  await next();
}
