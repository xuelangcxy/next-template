import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      userAgent: ctx.req.headers['user-agent'],
      ...initialProps,
    }
  }

  render() {
    return (
      <html lang="zh">
        <Head>
          <style>{`body { margin: 20px } /* custom! */`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}