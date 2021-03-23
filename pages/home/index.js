import React from 'react';
import Header from '../../components/Header';
import styles from './index.less';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;

const ADD = 'add';
const MINUS = 'minus';

class Index extends React.Component {
	static async getInitialProps(props) {
    const { pathname, query } = props;
	  return {
      pathname,
      query,
    };
	}

	state = {
		value: 1,
  };
  
  componentDidMount() {
    console.log(this.props);
  }

	handleClick = type => {
    alert('提示', `确认${type === ADD ? '增加' : '减少'}`, [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { text: 'Ok', onPress: () => {
        console.log('ok');
        this.setState(prevState => ({
          value: type === ADD ? prevState.value + 1 : prevState.value - 1,
        }));
      }},
    ])
	};

	render() {
    const { value } = this.state;
		return (
			<div>
				<style jsx>
					{`
						.content {
							text-align: center;
						}
					`}
				</style>
				<Header></Header>
				<p className="content">Hello , world!</p>
				<div className={styles.wrapper}>
					<p>Hello , world!</p>
          <div>{value}</div>
					<button onClick={() => this.handleClick(MINUS)}>减少</button>
					<button onClick={() => this.handleClick(ADD)}>增加</button>
				</div>
			</div>
		);
	}
}

export default Index;
