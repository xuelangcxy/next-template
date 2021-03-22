/** eslint no-console: 0 */
import Koa from 'koa';
import next from 'next';
import Router from 'koa-router';
import koaBody from 'koa-body';
import { SUCCESSFUL, ERROR } from './utils/constant';
import config from './utils/config';
import { isDev } from './utils/util';
import proxyRoute from './proxy/route';
import redirectList from './routes/redirect';
import routes from './routes';

Object.keys(config).forEach(key => {
  process.env[key] = config[key];
});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = isDev();
const app = next({ dev });
const handler = app.getRequestHandler(app);

app.prepare().then(() => {
  const server = new Koa();

  server.use(koaBody());

  server.use(async (ctx, next) => {
    // 微信签名需要用到原始路径
    ctx.req.originalUrl = ctx.originalUrl;
    ctx.req.host = ctx.headers.host;
    await next();
  });

  server.use(proxyRoute);

  server.use(async (ctx, next) => {
    let redirect = '';
    redirectList.some(item => {
      const match = ctx.url.match(item.pattern);
      if (match) {
        redirect = item.redirect;
        if (typeof item.redirect === 'function') {
          redirect = item.redirect(match);
        }
        return true;
      }
      return false;
    });
    if (redirect) {
      ctx.request.url = redirect;
    }
    await next();
  });

  server.use(async (ctx, next) => {
    if (ctx.url.startsWith('/api')) {
      ctx.res.statusCode = 200;
      try {
        ctx.request.url = ctx.request.url.replace('/api', '');
        await next();
        if (
          ctx.body &&
          ctx.body.code === undefined &&
          !ctx.body.disableWrapCode
        ) {
          ctx.body = {
            code: SUCCESSFUL,
            data: ctx.body,
          };
        }
      } catch (error) {
        let errorObj = {};
        try {
          errorObj = JSON.parse(error.message);
        } catch (e) {
          errorObj.message = error.message;
        }
        ctx.body = {
          code: ERROR,
          msg: errorObj.data || errorObj.message || errorObj.msg,
          raw: errorObj,
        };
      }
    } else {
      await next();
    }
  });

  routes.forEach(item => {
    server.use(item.routes());
  });

  const router = new Router();
  router.get('/static/activity/**', async (ctx, next) => {
    ctx.set({
      'Cache-Control': 'public, max-age=31536000, immutable',
    });
    await next();
  });

  router.get('*', async ctx => {
    await handler(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(router.routes());

  const httpServer = server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    // 通知pm2，此worker就绪
    process.send('ready');
  });

  process.on('SIGINT', () => {
    httpServer.close(() => {
      process.exit(0);
    });
  });
});
