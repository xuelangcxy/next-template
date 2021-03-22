import App from 'next/app';
import React from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import Head from 'next/head';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '../styles/reset.less';
import '../styles/base.less';

moment.locale('zh-cn');

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    }
  }

  componentDidMount() {
    console.log(this.props);
    // Router.beforePopState(data => {
    //   console.log(data);
    //   return false;
    // })
    // Router.events.on('beforeHistoryChange', e => {
    //   console.log(e);
    // })
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });
    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
    });
    Router.events.on('routeChangeError', () => {
      NProgress.done();
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>test</title>
        </Head>
        <Component {...pageProps}></Component>
      </div>
    )
  }
}

export default MyApp;
