import React from 'react';
import Header from '../components/Header';

class Index extends React.Component {
  // static async getInitialProps(props) {
  //   console.log(props);
  //   return {};
  // }

  render() {
    return (
      <div>
        <Header></Header>
        <p>Hello , world!</p>
      </div>
    )
  }
}

export default Index;
