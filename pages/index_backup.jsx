import React from 'react';

export default class Page extends React.Component {
  static async getInitialProps(props) {
    const { pathname, query, isServer, res } = props;
    if (res) {
      res.writeHead(302, {
        Location: '/home',
      });
      res.end();
    }
    return {
      pathname,
      query,
      isServer,
    };
  }

  state = {};

  componentDidMount() {}

  render() {
    return <div>index</div>;
  }
}
