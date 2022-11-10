import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {
  state = {
    response:{}
  }
  async componentDidMount () {
    const token = localStorage.getItem('token');
    const getAPI = await triviaAPI(token);
    this.setState({ response:getAPI });
  }

  componentDidUpdate () {
    const { response: { response_code } } = this.state;
    const { history } = this.props;
    const THREE = 3;
    if (response_code === THREE) {
      history.push('/');
      localStorage.removeItem('token');
    }    
  }

  render() {
    return (
      <Header />
    );
  }
}

export default connect()(Game);
