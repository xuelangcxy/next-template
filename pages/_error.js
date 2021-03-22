/* eslint-disable react/prop-types */
import React from 'react';

export default class Error extends React.Component {
  static async getInitialProps({ req, res, err }) {
    let statusCode = res && res.statusCode;
    if (!statusCode) {
      statusCode = err && err.statusCode;
    }
    if (statusCode > 400) {
      console.error(
        JSON.stringify(
          {
            url: req.url,
            statusCode,
            err: err && err.stack,
          },
          null,
          '\t',
        ),
      );
    }
    const errorMessage = err && err.stack;
    return { statusCode, errorMessage };
  }

  render() {
    const { statusCode, errorMessage } = this.props;
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server ${errorMessage}`
          : `An error ${errorMessage} occurred on client`}
      </p>
    );
  }
}
