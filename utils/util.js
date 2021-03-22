export function isDev() {
  return process.env.API_ENV === 'dev';
}

export function isProduction() {
  return process.env.API_ENV === 'production';
}

export function captureExceptionIfNeeded(ctx) {
  if (ctx.res.statusCode >= 400) {
    try {
      const error = new Error(
        `请求${ctx.originalUrl}错误${ctx.res.statusCode}：`,
      );
      console.log(error);
    } catch (error) {
      console.error(error);
    }
  }
}